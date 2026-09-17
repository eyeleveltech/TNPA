/**
 * Live scoreboard feed — RizzFitt tournament API.
 *
 * The endpoint is a BROADCAST feed, not a results API: one POST returns the
 * single match currently on ONE court, plus the state of the other matches in
 * the same tie. There is no all-courts call, so the scoreboard fans out one
 * request per court and stitches the responses together.
 *
 * Verified against the live UAT server on 15 Sep 2026:
 *   - `Access-Control-Allow-Origin: *` on both POST and the OPTIONS preflight,
 *     so the browser can call it directly. No proxy, no key, nothing secret
 *     shipped in the bundle.
 *   - Success is HTTP **201**, not 200 — check `response.ok`, never `=== 200`.
 *   - An idle court still returns 201 with `data: null`. That is the normal
 *     empty state, NOT an error.
 *   - Unknown slug → 404; missing slug → 400.
 */

/* ─────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */

/**
 * Production scoring host. `VITE_LIVE_API_BASE` overrides it — point that at
 * `https://uattournament.rizzfitt.com` to work against the test server.
 */
export const API_BASE =
  import.meta.env.VITE_LIVE_API_BASE ?? "https://tournament.rizzfitt.com";

const LIVE_TV_PATH = "/rizzapi/pickleball/matches/fetch-league-live-tv";

/** Tournament slug. `tnppl-s2` resolves to "TNPPL Season 2" (tournament 76). */
export const TOURNAMENT_SLUG =
  import.meta.env.VITE_LIVE_API_SLUG ?? "tnppl-s2";

/**
 * Numeric tournament id, as sent in `data.tournament.id` by the live feed.
 *
 * Note the inconsistency: the live-tv endpoint is keyed by `slug`, but the
 * group/leaderboard endpoints are keyed by this id and IGNORE slug entirely —
 * passing a slug there silently returns a different tournament's data.
 */
export const TOURNAMENT_ID = Number(
  import.meta.env.VITE_LIVE_API_TOURNAMENT_ID ?? 76,
);

const LEAGUE_GROUPS_PATH = "/rizzapi/pickleball/matches/league-groups/fetchAll";

/**
 * Courts polled each cycle.
 *
 * Six is not a guess: the production tournament record reports
 * `noOfCourts: 6`, and the live-scoreboard-configuration endpoint agrees.
 * `discoverCourtIds()` still reads the real ids from the fixture data once
 * the draw exists, and can only widen this list, never narrow it.
 *
 * The risk is one-sided — an extra id costs one wasted request, a missing one
 * silently loses a match — so widening is always the safe direction.
 */
export const COURT_IDS = [1, 2, 3, 4, 5, 6] as const;

/**
 * The courts this tournament actually uses, read from the fixture data.
 *
 * Walks every group → tie → fixture → match and collects distinct `courtId`s.
 * This is the only reliable source: the live-tv endpoint returns the identical
 * "no live match" response for an idle court and for a court that does not
 * exist, so the court list cannot be probed.
 *
 * Returns null on any failure so the caller keeps its fallback list. Uses an
 * endpoint Rizzfitt have not formally given us (found in their own site's
 * bundles), which is exactly why failure must be non-fatal.
 */
export interface DrawState {
  /** Courts found in the fixtures, or null when there are no fixtures yet. */
  courtIds: number[] | null;
  /**
   * Whether the draw exists at all.
   *
   * Distinguishes two states that look identical on an empty scoreboard:
   * fixtures not published yet (say so), versus published but nothing on court
   * this minute (say that instead). `null` means we could not tell, so the UI
   * must not claim either.
   */
  hasFixtures: boolean | null;
}

/** Read the draw: whether it exists, and which courts it uses. */
export async function fetchDrawState(
  tournamentId: number = TOURNAMENT_ID,
  signal?: AbortSignal,
): Promise<DrawState> {
  try {
    const response = await fetch(`${API_BASE}${LEAGUE_GROUPS_PATH}/${tournamentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isleaderboard: false }),
      signal,
    });

    // The server answers "Groups not found" with 400 while the draw is unset.
    // That is a definite "not published yet", not an unknown.
    if (response.status === 400) return { courtIds: null, hasFixtures: false };
    if (!response.ok) return { courtIds: null, hasFixtures: null };

    const body = (await response.json()) as {
      data?: Array<{
        ties?: Array<{
          tieFixtures?: Array<{ matches?: Array<{ courtId?: number | null }> }>;
        }>;
      }>;
    };

    const groups = body?.data ?? [];
    const found = new Set<number>();
    for (const group of groups) {
      for (const tie of group?.ties ?? []) {
        for (const fixture of tie?.tieFixtures ?? []) {
          for (const match of fixture?.matches ?? []) {
            if (typeof match?.courtId === "number" && Number.isFinite(match.courtId)) {
              found.add(match.courtId);
            }
          }
        }
      }
    }

    return {
      courtIds: found.size > 0 ? [...found].sort((a, b) => a - b) : null,
      hasFixtures: groups.length > 0,
    };
  } catch {
    return { courtIds: null, hasFixtures: null };
  }
}

export async function discoverCourtIds(
  tournamentId: number = TOURNAMENT_ID,
  signal?: AbortSignal,
): Promise<number[] | null> {
  try {
    const response = await fetch(`${API_BASE}${LEAGUE_GROUPS_PATH}/${tournamentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isleaderboard: false }),
      signal,
    });
    if (!response.ok) return null;

    const body = (await response.json()) as {
      data?: Array<{
        ties?: Array<{
          tieFixtures?: Array<{ matches?: Array<{ courtId?: number | null }> }>;
        }>;
      }>;
    };

    const found = new Set<number>();
    for (const group of body?.data ?? []) {
      for (const tie of group?.ties ?? []) {
        for (const fixture of tie?.tieFixtures ?? []) {
          for (const match of fixture?.matches ?? []) {
            if (typeof match?.courtId === "number" && Number.isFinite(match.courtId)) {
              found.add(match.courtId);
            }
          }
        }
      }
    }

    return found.size > 0 ? [...found].sort((a, b) => a - b) : null;
  } catch {
    return null;
  }
}

/* ─────────────────────────────────────────────
   TOURNAMENT INFO + PHASE

   The scoreboard shows a different page before, during and after the event,
   and the dates come from the feed rather than being hardcoded — the same
   record the organisers edit drives our countdown, so the two cannot drift.
───────────────────────────────────────────── */

const GET_BY_SLUG_PATH = "/rizzapi/tournament/get-by-slug";

/**
 * Local start time on day one, as HH:mm.
 *
 * The tournament API carries dates only, no times, so this fills the gap.
 *
 * 08:00 is not a guess: both of the official day-one YouTube streams carry a
 * `scheduledStartTime` of 2026-09-17T08:00+05:30, and the /live page counts to
 * the same instant. Keeping this aligned matters — two countdowns on one site
 * showing different start times is worse than either being slightly off.
 *
 * Override with `VITE_LIVE_START_TIME` rather than editing this.
 */
export const START_TIME_LOCAL = import.meta.env.VITE_LIVE_START_TIME ?? "08:00";

/** IST. The venue is in Chennai, and the audience that cares is there too. */
const VENUE_UTC_OFFSET = "+05:30";

export interface TournamentInfo {
  id: number;
  name: string;
  /** YYYY-MM-DD, as sent. */
  startDate: string | null;
  endDate: string | null;
  placeName: string | null;
  location: string | null;
  noOfCourts: number | null;
}

/** Tournament record: dates, venue, court count. Null on any failure. */
export async function fetchTournamentInfo(
  slug: string = TOURNAMENT_SLUG,
  signal?: AbortSignal,
): Promise<TournamentInfo | null> {
  try {
    const response = await fetch(`${API_BASE}${GET_BY_SLUG_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
      signal,
    });
    if (!response.ok) return null;

    const body = (await response.json()) as { data?: { listData?: unknown } };
    const list = body?.data?.listData;
    const record = (Array.isArray(list) ? list[0] : list) as
      | Record<string, unknown>
      | undefined;
    if (!record || typeof record.id !== "number") return null;

    const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);
    return {
      id: record.id,
      name: str(record.name) ?? "Tournament",
      startDate: str(record.startDate),
      endDate: str(record.endDate),
      placeName: str(record.placeName),
      location: str(record.location),
      noOfCourts: typeof record.noOfCourts === "number" ? record.noOfCourts : null,
    };
  } catch {
    return null;
  }
}

/**
 * Exact kick-off instant, pinned to the venue's timezone.
 *
 * Built from an explicit offset rather than `new Date("2026-09-17")`, which
 * JavaScript parses as UTC midnight — 05:30 in Chennai — and would start the
 * countdown running five and a half hours early for the people at the venue.
 */
export function tournamentStartsAt(info: TournamentInfo | null): Date | null {
  if (!info?.startDate) return null;
  const time = /^\d{2}:\d{2}$/.test(START_TIME_LOCAL) ? START_TIME_LOCAL : "10:00";
  const parsed = new Date(`${info.startDate}T${time}:00${VENUE_UTC_OFFSET}`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/** End of the final day, so the board stays up all of the last evening. */
export function tournamentEndsAt(info: TournamentInfo | null): Date | null {
  if (!info?.endDate) return null;
  const parsed = new Date(`${info.endDate}T23:59:59${VENUE_UTC_OFFSET}`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export type TournamentPhase = "before" | "during" | "after" | "unknown";

/**
 * Which page to show. Falls back to "during" when the dates are unavailable:
 * if we cannot tell, showing the live board is the safe error, because a
 * countdown covering a match in progress would hide the very thing people came
 * for.
 */
export function derivePhase(
  info: TournamentInfo | null,
  now: Date = new Date(),
): TournamentPhase {
  const start = tournamentStartsAt(info);
  const end = tournamentEndsAt(info);
  if (!start || !end) return info ? "during" : "unknown";
  if (now < start) return "before";
  if (now > end) return "after";
  return "during";
}

/**
 * How often to re-poll while the tab is visible.
 *
 * This ONE number controls the whole page's freshness. Lower it and scores
 * arrive sooner; the cost is linear and lands on the scoring server, because
 * each cycle sends one request per court. At six courts, 5s means 72 requests
 * a minute from every open tab — around 1,200 a second across a thousand
 * spectators. Confirm the rate limit with the scoring provider before going
 * lower, and prefer a combined all-courts endpoint or the websocket over
 * shortening this further.
 */
export const POLL_INTERVAL_MS = 5_000;

/**
 * Polling cadence once the live socket is connected.
 *
 * With the socket pushing a "something changed" signal, polling stops being the
 * delivery mechanism and becomes a safety net — it only needs to catch anything
 * the socket missed. Backing off to 20s here cuts requests to a quarter of the
 * unconnected rate WHILE making updates faster, which is the rare change that
 * improves both sides at once.
 */
export const POLL_INTERVAL_SOCKET_MS = 20_000;

/**
 * Minimum gap between socket-triggered refetches.
 *
 * A rally can produce several events in quick succession. Without this, a burst
 * would fan out one request per court per event. 600ms still reads as instant
 * to a spectator while collapsing a burst into a single round trip.
 */
export const SOCKET_REFRESH_THROTTLE_MS = 600;

/* ─────────────────────────────────────────────
   RESPONSE TYPES
   Modelled on real payloads. Everything the server has been observed to send
   as null is typed nullable — the feed is generous with nulls.
───────────────────────────────────────────── */

export interface ApiPlayer {
  id: number;
  pickleballPlayerId: number;
  name: string;
  /** Often a single space rather than an empty string. Always trim. */
  middleName: string | null;
  lastName: string | null;
  /** Observed empty for every player so far — expect no photos. */
  image: string | null;
}

/** The pairing actually on court, named after its players ("Vishal,Sai"). */
export interface ApiSideTeam {
  id: number;
  name: string;
  capTeamName: string;
  /** Present on the A side only — links the pairing to its franchise. */
  teamAId?: number;
  teamAName?: string;
  /** Present on the B side only. */
  teamBId?: number;
  teamBName?: string;
  players: ApiPlayer[];
  lineupSlots: unknown[];
}

/** Franchise-level identity, including the logo the organisers uploaded. */
export interface ApiFixtureTeam {
  id: number;
  name: string;
  image: string | null;
  tieStage: string | null;
}

export interface ApiMatchPlayer {
  id: number;
  isServing: boolean;
  isReceiving: boolean;
  isRightSide: boolean;
  startingPosition: string | null;
  /** Pickleball's first/second server. Null between rallies. */
  serverNumber: number | null;
  servePlayer: ApiPlayer | null;
  nonServePlayer: ApiPlayer | null;
  team: { id: number; name: string } | null;
  capTeam: { id: number; name: string } | null;
}

export interface ApiSet {
  id: number;
  setNumber: number;
  teamAScore: number;
  teamBScore: number;
  isCompleted: boolean;
  hasEnded: boolean;
  winnerTeam: unknown | null;
  loserTeam: unknown | null;
}

export interface ApiTieMatch {
  matchNumber: number;
  teamAScore: number;
  teamBScore: number;
  isCompleted: boolean;
  hasStarted: boolean;
  hasEnded: boolean;
  isScheduled: boolean;
  winnerTeam: unknown | null;
}

export interface ApiLiveMatch {
  id: number;
  courtId: number;
  matchNo: number;
  aliasName: string | null;
  displayAlias: string | null;
  matchTypeName: string | null;
  formatName: string | null;
  skillName: string | null;
  gameType: string | null;
  /** Authoritative running score. The `sets` array lags behind it. */
  teamAScore: number;
  teamBScore: number;
  isCompleted: boolean;
  hasStarted: boolean;
  hasEnded: boolean;
  isScheduled: boolean;
  maxSets: number;
  currentSetNumber: number;
  matchStage: string | null;
  mapping: {
    category?: { id: number; name: string; participants: number } | null;
    subCategory?: { id: number; name: string } | null;
  } | null;
  teamA: ApiSideTeam | null;
  teamB: ApiSideTeam | null;
  /** `tossWinner` has been null in every observed response; `tossCapWinner`
      names the winning pairing, not the franchise. */
  toss: {
    id: number;
    tossWinner: { id: number; name: string } | null;
    tossCapWinner: { id: number; name: string } | null;
  } | null;
  matchPlayers: ApiMatchPlayer[] | null;
  winnerTeam: unknown | null;
  tournament: { id: number; name: string; image: string | null } | null;
  sets: ApiSet[] | null;
  group: { id: number; name: string } | null;
  tieFixture: { id: number; teamA: ApiFixtureTeam; teamB: ApiFixtureTeam } | null;
  tieScore: { teamA: number; teamB: number } | null;
  totalPoints: { teamA: number; teamB: number } | null;
  tournamentTotalPoints: { teamA: number; teamB: number } | null;
  groupName: string | null;
  tieName: string | null;
  tieFixtureMatches: ApiTieMatch[] | null;
}

export interface ApiEnvelope {
  message: string;
  data: ApiLiveMatch | null;
}

/* ─────────────────────────────────────────────
   FRANCHISE MAPPING

   The feed names franchises in caps and does not spell them the way this site
   does — it sends "CHENNAI'S TAMIZH TITANS" where the site says "Chennai
   Tamizh Titans". Matching on raw strings would fail silently and drop the
   logo, so names are normalised (uppercased, punctuation and spaces stripped)
   and every team carries alias spellings.

   This registry is deliberately a SEPARATE module rather than an import from
   Teams.tsx: that section is live, published content and is left untouched.
   The logo assets are the same files, so nothing can visually drift.
───────────────────────────────────────────── */

import logoChennai from "@/assets/Team_Logos-01.webp";
import logoCoimbatore from "@/assets/Team_Logos-02.webp";
import logoMadurai from "@/assets/Team_Logos-03.webp";
import logoNellai from "@/assets/Team_Logos-04.webp";
import logoOoty from "@/assets/Team_Logos-05.webp";
import logoKanchi from "@/assets/Team_Logos-06.webp";
import logoCuddalore from "@/assets/Team_Logos-07.webp";
import logoHosur from "@/assets/Team_Logos-08.webp";
import logoRockfort from "@/assets/Team_Logos-09.webp";
import logoRamnad from "@/assets/Team_Logos-10.webp";
import logoSalem from "@/assets/Team_Logos-11.webp";
import logoKodai from "@/assets/Team_Logos-12.webp";

export interface FranchiseBrand {
  /** Display name as this site writes it. */
  name: string;
  short: string;
  logo: string;
  /** HSL triple, matching the accents used by the Teams section. */
  accent: string;
  /**
   * Production franchise ids, once the draw exists.
   *
   * Deliberately empty. Ids are per-tournament: the test server issued 533-544
   * for its own tournament, and production (tournament 76) will issue its own
   * set. Carrying the test ids over is worse than having none — a production
   * id that happens to reuse one of those numbers for a DIFFERENT team would
   * silently show the wrong crest, and a wrong logo is worse than a slightly
   * lower-quality right one.
   *
   * Until then, name matching below resolves all twelve teams on its own
   * (verified against every spelling the feed sends). Fill these in from
   * `fetch-league-leaderboard` with `{tournamentId: 76}` once Rizzfitt load the
   * teams, and matching becomes exact and spelling-proof.
   */
  ids?: number[];
  /** Alternative spellings seen (or plausibly sent) by the feed. */
  aliases?: string[];
}

const FRANCHISES: FranchiseBrand[] = [
  {
    name: "Salem Super Smashers",
    short: "Salem",
    logo: logoSalem,
    accent: "195 85% 55%",
    aliases: ["Salem Super Smasher", "Salem Smashers"],
  },
  {
    name: "Chennai Tamizh Titans",
    short: "Chennai",
    logo: logoChennai,
    accent: "190 90% 62%",
    aliases: ["Chennai's Tamizh Titans", "Chennais Tamizh Titans", "Chennai Titans"],
  },
  {
    name: "Kanchi Blackbucks",
    short: "Kanchi",
    logo: logoKanchi,
    accent: "150 75% 52%",
    aliases: ["Kanchi Black Bucks", "Kanchipuram Blackbucks"],
  },
  {
    name: "Twin Eagles Hosur",
    short: "Hosur",
    logo: logoHosur,
    accent: "205 85% 62%",
    aliases: ["Hosur Twin Eagles", "Twin Eagles"],
  },
  {
    name: "Coimbatore Smashers",
    short: "Coimbatore",
    logo: logoCoimbatore,
    accent: "15 90% 60%",
    aliases: ["Kovai Smashers"],
  },
  {
    name: "Cuddalore Kings",
    short: "Cuddalore",
    logo: logoCuddalore,
    accent: "270 80% 65%",
  },
  {
    name: "Rockfort Terminatrz Trichy",
    short: "Trichy",
    logo: logoRockfort,
    accent: "22 85% 58%",
    aliases: [
      "Rockfort Terminators Trichy",
      "Trichy Rockfort Terminatrz",
      "Rockfort Terminatrz",
      "Trichy Rockfort",
    ],
  },
  {
    name: "Ooty Bisons",
    short: "Ooty",
    logo: logoOoty,
    accent: "128 70% 52%",
    aliases: ["Nilgiris Bisons"],
  },
  {
    name: "Ramnad Royals",
    short: "Ramnad",
    logo: logoRamnad,
    accent: "198 85% 58%",
    aliases: ["Ramanathapuram Royals"],
  },
  {
    name: "Nellai Superstars",
    short: "Nellai",
    logo: logoNellai,
    accent: "175 80% 55%",
    aliases: ["Tirunelveli Superstars", "Nellai Super Stars"],
  },
  {
    name: "Madurai All Stars",
    short: "Madurai",
    logo: logoMadurai,
    accent: "355 85% 58%",
    aliases: ["Madurai Allstars"],
  },
  {
    name: "Kodai Tigers",
    short: "Kodai",
    logo: logoKodai,
    accent: "32 95% 60%",
    aliases: ["Kodaikanal Tigers"],
  },
];

/** Uppercase, strip everything that is not a letter or digit. */
function normaliseName(value: string): string {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

const BY_ID = new Map<number, FranchiseBrand>();
const BY_NAME = new Map<string, FranchiseBrand>();

for (const franchise of FRANCHISES) {
  for (const id of franchise.ids ?? []) BY_ID.set(id, franchise);
  BY_NAME.set(normaliseName(franchise.name), franchise);
  for (const alias of franchise.aliases ?? []) {
    BY_NAME.set(normaliseName(alias), franchise);
  }
}

/**
 * Resolve a franchise to this site's branding. Falls back to `null` so callers
 * can use the logo the API supplies — an unrecognised team must still render,
 * never disappear.
 */
export function resolveFranchise(
  id: number | null | undefined,
  name: string | null | undefined,
): FranchiseBrand | null {
  if (typeof id === "number") {
    const byId = BY_ID.get(id);
    if (byId) return byId;
  }
  if (name) {
    const byName = BY_NAME.get(normaliseName(name));
    if (byName) return byName;
  }
  return null;
}

/* ─────────────────────────────────────────────
   NORMALISERS
───────────────────────────────────────────── */

/**
 * Capitalise names the feed sent in lower case.
 *
 * Surnames arrive inconsistently cased — "Premkumar" and "Saravanan" are
 * correct, but "muthukumar" and "swaroop" are not, and a public scoreboard
 * showing a player's name in lower case looks broken.
 *
 * The rule is deliberately narrow: only a run of letters that is entirely
 * lower case gets its first letter raised. Anything already carrying a capital
 * is left exactly as sent, so "McDonald" and "D'Souza" survive untouched. This
 * only ever changes presentation of third-party feed data; no name stored in
 * this repository is affected.
 */
export function titleCaseName(value: string): string {
  return value.replace(/[A-Za-zÀ-ɏ]+/g, (word) =>
    /[A-Z]/.test(word) ? word : word[0].toUpperCase() + word.slice(1),
  );
}

/**
 * Join a player's name parts. The feed pads `middleName` with a single space,
 * so parts are trimmed and blanks dropped rather than concatenated blindly.
 */
export function playerFullName(player: ApiPlayer | null | undefined): string {
  if (!player) return "";
  const joined = [player.name, player.middleName, player.lastName]
    .map((part) => (part ?? "").trim())
    .filter(Boolean)
    .join(" ");
  return titleCaseName(joined);
}

/** Compact label for score rows: first name plus last name only. */
export function playerShortName(player: ApiPlayer | null | undefined): string {
  if (!player) return "";
  const first = (player.name ?? "").trim();
  const last = (player.lastName ?? "").trim();
  return titleCaseName([first, last].filter(Boolean).join(" ") || first);
}

export function initialsOf(value: string): string {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export type MatchState = "live" | "final" | "upcoming";

/**
 * Derive a display state from the four status booleans.
 *
 * Deliberately conservative. In the UAT data these flags contradict each other
 * — matches sitting at 0-0 report `hasStarted: true`, and nothing is ever
 * flagged `isCompleted` — so "finished" is only claimed when the feed says so
 * explicitly, and anything the live endpoint returns otherwise is treated as
 * on court. Mislabelling a running match as finished is the worse error.
 */
export function deriveMatchState(match: ApiLiveMatch): MatchState {
  if (match.isCompleted || match.hasEnded) return "final";
  if (match.isScheduled && !match.hasStarted) return "upcoming";
  return "live";
}

/** Human label for the event, e.g. "Doubles - Men's Open". */
export function matchLabel(match: ApiLiveMatch): string {
  const alias = (match.displayAlias ?? match.aliasName ?? "").trim();
  if (alias) return alias;
  const category = match.mapping?.category?.name?.trim();
  const sub = match.mapping?.subCategory?.name?.trim();
  return [match.matchTypeName?.trim(), category, sub].filter(Boolean).join(" · ") || "Match";
}

/** The player currently serving, if the feed is reporting one. */
export function servingPlayer(match: ApiLiveMatch): {
  player: ApiPlayer;
  serverNumber: number | null;
  teamId: number | null;
} | null {
  const entry = (match.matchPlayers ?? []).find((p) => p.isServing && p.servePlayer);
  if (!entry?.servePlayer) return null;
  return {
    player: entry.servePlayer,
    serverNumber: entry.serverNumber,
    teamId: entry.team?.id ?? null,
  };
}

/* ─────────────────────────────────────────────
   FETCHING
───────────────────────────────────────────── */

export interface CourtResult {
  courtId: number;
  match: ApiLiveMatch | null;
  /** Server-supplied message, shown verbatim for empty courts. */
  message: string;
  error: string | null;
  /**
   * True when `match` is the last known score carried over because this
   * cycle's request failed, rather than something the server just told us.
   *
   * Set by the polling hook, never by the fetch layer. The card shows it so a
   * carried-over score is never passed off as current.
   */
  isStale?: boolean;
}

/**
 * Fetch one court. Never throws: a court that fails resolves to a result
 * carrying its error, so one bad court cannot blank the whole board.
 */
export async function fetchCourt(
  courtId: number,
  signal?: AbortSignal,
): Promise<CourtResult> {
  try {
    const response = await fetch(`${API_BASE}${LIVE_TV_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: TOURNAMENT_SLUG, courtId }),
      signal,
    });

    // Success is 201 here, so test `ok` rather than a specific status.
    if (!response.ok) {
      let detail = `HTTP ${response.status}`;
      try {
        const body = (await response.json()) as { message?: string };
        if (body?.message) detail = body.message;
      } catch {
        /* non-JSON error body — keep the status line */
      }
      return { courtId, match: null, message: "", error: detail };
    }

    const body = (await response.json()) as ApiEnvelope;
    return {
      courtId,
      // An idle court returns 201 with data: null. That is empty, not broken.
      match: body?.data ?? null,
      message: body?.message ?? "",
      error: null,
    };
  } catch (error) {
    if (signal?.aborted) throw error;
    const detail =
      error instanceof Error ? error.message : "Could not reach the scoring server";
    return { courtId, match: null, message: "", error: detail };
  }
}

/** Fetch every court in parallel, preserving court order in the result. */
export async function fetchAllCourts(
  courtIds: readonly number[] = COURT_IDS,
  signal?: AbortSignal,
): Promise<CourtResult[]> {
  return Promise.all(courtIds.map((id) => fetchCourt(id, signal)));
}
