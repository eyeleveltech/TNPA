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
 * How long one fetch of the group tree is reused.
 *
 * This endpoint is BY FAR the most expensive thing the page touches, and it
 * grows as the tournament runs: 72KB and under a second on day one, 353KB and
 * 9-21 seconds by the morning of day two, with two of four days still to play.
 *
 * Three separate callers need it — court discovery, the draw-published check,
 * and the results list — and without sharing they each fetched it
 * independently, pulling the same payload two or three times a minute per
 * viewer. One request now serves all three.
 */
const GROUPS_CACHE_MS = 45_000;

interface GroupsSnapshot {
  groups: unknown[];
  /** False when the server says the draw does not exist yet (400). */
  published: boolean;
}

let groupsCache: { at: number; value: GroupsSnapshot } | null = null;
let groupsInFlight: Promise<GroupsSnapshot | null> | null = null;

/**
 * Fetch the group tree, reusing a recent response and collapsing concurrent
 * callers into one request.
 *
 * Deliberately does NOT take the caller's AbortSignal: the result is shared,
 * so one component unmounting must not cancel a fetch another is waiting on.
 * Callers check their own signal after awaiting instead.
 */
async function loadGroups(tournamentId: number): Promise<GroupsSnapshot | null> {
  const now = Date.now();
  if (groupsCache && now - groupsCache.at < GROUPS_CACHE_MS) return groupsCache.value;
  if (groupsInFlight) return groupsInFlight;

  groupsInFlight = (async (): Promise<GroupsSnapshot | null> => {
    try {
      const response = await fetch(`${API_BASE}${LEAGUE_GROUPS_PATH}/${tournamentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isleaderboard: false }),
      });

      // "Groups not found" is a definite not-yet, not a failure.
      if (response.status === 400) {
        const value = { groups: [], published: false };
        groupsCache = { at: Date.now(), value };
        return value;
      }
      if (!response.ok) return null;

      const body = (await response.json()) as { data?: unknown[] };
      const value = {
        groups: Array.isArray(body?.data) ? body.data : [],
        published: Array.isArray(body?.data) && body.data.length > 0,
      };
      groupsCache = { at: Date.now(), value };
      return value;
    } catch {
      return null;
    } finally {
      groupsInFlight = null;
    }
  })();

  return groupsInFlight;
}

/** Walk the group tree and collect every distinct court id it references. */
function courtIdsIn(groups: unknown[]): number[] {
  const found = new Set<number>();
  for (const group of groups) {
    const g = group as { ties?: unknown[] };
    for (const tie of g?.ties ?? []) {
      const t = tie as { tieFixtures?: unknown[] };
      for (const fixture of t?.tieFixtures ?? []) {
        const f = fixture as { matches?: Array<{ courtId?: number | null }> };
        for (const match of f?.matches ?? []) {
          if (typeof match?.courtId === "number" && Number.isFinite(match.courtId)) {
            found.add(match.courtId);
          }
        }
      }
    }
  }
  return [...found].sort((a, b) => a - b);
}

/**
 * Courts polled each cycle.
 *
 * THIS NUMBER KEEPS MOVING. The tournament record said 6 before the draw was
 * loaded, 2 on day one, and 3 by the morning of day two — court 3 appeared
 * overnight with 3 fixtures on it. Treat any value here as already out of date.
 *
 * `discoverCourtIds()` reads the real ids from the fixture data and can widen
 * this list, never narrow it, so a new court is picked up without a deploy.
 * This list only matters when discovery fails — which is not hypothetical: the
 * endpoint it reads 502'd for a spell on day two morning. So it is kept in step
 * with the latest known count rather than left to rot.
 */
export const COURT_IDS = [1, 2, 3] as const;

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
  _signal?: AbortSignal,
): Promise<DrawState> {
  const snapshot = await loadGroups(tournamentId);
  if (!snapshot) return { courtIds: null, hasFixtures: null };
  const courts = courtIdsIn(snapshot.groups);
  return {
    courtIds: courts.length > 0 ? courts : null,
    hasFixtures: snapshot.published,
  };
}

export async function discoverCourtIds(
  tournamentId: number = TOURNAMENT_ID,
  _signal?: AbortSignal,
): Promise<number[] | null> {
  const snapshot = await loadGroups(tournamentId);
  if (!snapshot) return null;
  const courts = courtIdsIn(snapshot.groups);
  return courts.length > 0 ? courts : null;
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

/**
 * How long a finished match stays on its court card after the feed drops it.
 *
 * The live endpoint returns nothing for a court the instant its match ends, so
 * between matches every court empties and the whole board collapses to "No
 * Match In Play" — observed repeatedly on day one. Holding the last result for
 * a few minutes keeps the board populated through the changeover and shows the
 * final score, which is what a spectator wants in that gap anyway.
 *
 * Five minutes: long enough to cover a normal changeover, short enough that a
 * real break is reported honestly rather than showing a stale match all lunch.
 */
export const RECENT_MATCH_MS = 5 * 60_000;

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
   * Read from `fetch-league-leaderboard` with `{tournamentId: 76}` on 17 Sep
   * 2026, once the draw was loaded. Ids are per-tournament — the test server
   * issued 533-544 for its own — so these belong to THIS tournament only and
   * must be re-read for season 3.
   *
   * With ids present, crest matching no longer depends on how the feed spells
   * a team. The name and alias matching below stays as the fallback for a team
   * whose id we have not seen.
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
    ids: [146],
    aliases: ["Salem Super Smasher", "Salem Smashers"],
  },
  {
    name: "Chennai Tamizh Titans",
    short: "Chennai",
    logo: logoChennai,
    accent: "190 90% 62%",
    ids: [154],
    aliases: ["Chennai's Tamizh Titans", "Chennais Tamizh Titans", "Chennai Titans"],
  },
  {
    name: "Kanchi Blackbucks",
    short: "Kanchi",
    logo: logoKanchi,
    accent: "150 75% 52%",
    ids: [152],
    aliases: ["Kanchi Black Bucks", "Kanchipuram Blackbucks"],
  },
  {
    name: "Twin Eagles Hosur",
    short: "Hosur",
    logo: logoHosur,
    accent: "205 85% 62%",
    ids: [149],
    aliases: ["Hosur Twin Eagles", "Twin Eagles"],
  },
  {
    name: "Coimbatore Smashers",
    short: "Coimbatore",
    logo: logoCoimbatore,
    accent: "15 90% 60%",
    ids: [151],
    aliases: ["Kovai Smashers"],
  },
  {
    name: "Cuddalore Kings",
    short: "Cuddalore",
    logo: logoCuddalore,
    accent: "270 80% 65%",
    ids: [153],
  },
  {
    name: "Rockfort Terminatrz Trichy",
    short: "Trichy",
    logo: logoRockfort,
    accent: "22 85% 58%",
    ids: [148],
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
    ids: [150],
    aliases: ["Nilgiris Bisons"],
  },
  {
    name: "Ramnad Royals",
    short: "Ramnad",
    logo: logoRamnad,
    accent: "198 85% 58%",
    ids: [145],
    aliases: ["Ramanathapuram Royals"],
  },
  {
    name: "Nellai Superstars",
    short: "Nellai",
    logo: logoNellai,
    accent: "175 80% 55%",
    ids: [143],
    aliases: ["Tirunelveli Superstars", "Nellai Super Stars"],
  },
  {
    name: "Madurai All Stars",
    short: "Madurai",
    logo: logoMadurai,
    accent: "355 85% 58%",
    ids: [147],
    aliases: ["Madurai Allstars"],
  },
  {
    name: "Kodai Tigers",
    short: "Kodai",
    logo: logoKodai,
    accent: "32 95% 60%",
    ids: [144],
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
  /**
   * True when the court now reports no match, but one finished here moments
   * ago and is being held on screen briefly.
   *
   * Different from `isStale`: the feed is healthy and genuinely says the court
   * is clear. We keep the result up so the board does not collapse in the gap
   * between matches, and so spectators see how the last one ended.
   */
  isRecentlyFinished?: boolean;
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

/* ─────────────────────────────────────────────
   COMPLETED MATCHES

   The live endpoint only ever describes what is on court now — a finished
   match vanishes from it instantly. Results come instead from the group tree,
   which carries every fixture with its final scores and winners, and costs a
   single request for the whole tournament.
───────────────────────────────────────────── */

export interface MatchResult {
  matchId: number;
  matchNo: number;
  courtId: number | null;
  teamAId: number | null;
  teamAName: string;
  teamBId: number | null;
  teamBName: string;
  teamAScore: number;
  teamBScore: number;
  /** Franchise name as the feed reports it, or null if it did not say. */
  winnerName: string | null;
  playersA: string[];
  playersB: string[];
  isDoubles: boolean;
}

export interface TieResult {
  tieId: number;
  tieName: string;
  groupName: string;
  teamAId: number | null;
  teamAName: string;
  teamBId: number | null;
  teamBName: string;
  /** Matches won in this tie, as the feed counts them. */
  winsA: number;
  winsB: number;
  /** Finished matches only, newest first. */
  matches: MatchResult[];
}

/** Pull a readable name out of the feed's several shapes for one. */
function nameOf(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (value && typeof value === "object") {
    const n = (value as { name?: unknown }).name;
    if (typeof n === "string" && n.trim()) return n.trim();
  }
  return null;
}

function playersOf(side: unknown): string[] {
  const mapping = (side as { matchTeamPlayerMapping?: unknown[] })?.matchTeamPlayerMapping;
  if (!Array.isArray(mapping)) return [];
  const out: string[] = [];
  for (const entry of mapping) {
    for (const key of ["player1", "player2"] as const) {
      const p = (entry as Record<string, unknown>)?.[key] as
        | { name?: string; lastName?: string }
        | null
        | undefined;
      if (!p) continue;
      const full = titleCaseName([p.name, p.lastName].map((x) => (x ?? "").trim()).filter(Boolean).join(" "));
      if (full) out.push(full);
    }
  }
  return out;
}

/**
 * Every finished match, grouped by the tie it belongs to.
 *
 * Ties with nothing finished are dropped, so the caller can render the result
 * directly without filtering empties. Returns null on failure rather than an
 * empty list, so "could not load" stays distinguishable from "nothing yet".
 */
export async function fetchResults(
  tournamentId: number = TOURNAMENT_ID,
  _signal?: AbortSignal,
): Promise<TieResult[] | null> {
  try {
    const snapshot = await loadGroups(tournamentId);
    if (!snapshot) return null;
    const groups = snapshot.groups;
    const ties: TieResult[] = [];

    for (const group of groups) {
      const g = group as { name?: string; ties?: unknown[] };
      for (const tie of g.ties ?? []) {
        const t = tie as { id?: number; name?: string; tieFixtures?: unknown[] };
        for (const fixture of t.tieFixtures ?? []) {
          const f = fixture as {
            teamA?: { id?: number; name?: string };
            teamB?: { id?: number; name?: string };
            teamAwinsCount?: number;
            teamBwinsCount?: number;
            matches?: unknown[];
          };

          const finished: MatchResult[] = [];
          for (const match of f.matches ?? []) {
            const m = match as Record<string, unknown>;
            if (m.hasEnded !== true && m.isCompleted !== true) continue;

            const a = m.teamA as Record<string, unknown> | undefined;
            const b = m.teamB as Record<string, unknown> | undefined;
            const playersA = playersOf(a);
            const playersB = playersOf(b);

            finished.push({
              matchId: typeof m.matchId === "number" ? m.matchId : -1,
              matchNo: typeof m.matchNo === "number" ? m.matchNo : 0,
              courtId: typeof m.courtId === "number" ? m.courtId : null,
              teamAId: typeof a?.teamAId === "number" ? a.teamAId : null,
              teamAName: nameOf(a?.teamAName) ?? nameOf(f.teamA?.name) ?? "Team A",
              teamBId: typeof b?.teamBId === "number" ? b.teamBId : null,
              teamBName: nameOf(b?.teamBName) ?? nameOf(f.teamB?.name) ?? "Team B",
              teamAScore: typeof m.teamAScore === "number" ? m.teamAScore : 0,
              teamBScore: typeof m.teamBScore === "number" ? m.teamBScore : 0,
              winnerName: nameOf(m.winnerTeam),
              playersA,
              playersB,
              isDoubles: Math.max(playersA.length, playersB.length) > 1,
            });
          }

          if (finished.length === 0) continue;

          // Latest match first: people look for the most recent result.
          finished.sort((x, y) => y.matchNo - x.matchNo);

          ties.push({
            tieId: typeof t.id === "number" ? t.id : -1,
            tieName: nameOf(t.name) ?? "Tie",
            groupName: nameOf(g.name) ?? "",
            teamAId: typeof f.teamA?.id === "number" ? f.teamA.id : null,
            teamAName: nameOf(f.teamA?.name) ?? "Team A",
            teamBId: typeof f.teamB?.id === "number" ? f.teamB.id : null,
            teamBName: nameOf(f.teamB?.name) ?? "Team B",
            winsA: typeof f.teamAwinsCount === "number" ? f.teamAwinsCount : 0,
            winsB: typeof f.teamBwinsCount === "number" ? f.teamBwinsCount : 0,
            matches: finished,
          });
        }
      }
    }

    return ties;
  } catch {
    return null;
  }
}

/** First key present with a finite number, else null. */
function pickNumber(row: Record<string, unknown>, keys: string[]): number | null {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
  }
  return null;
}

/* ─────────────────────────────────────────────
   GROUP STANDINGS

   The league is two groups of six. Each group plays a full round robin — 15
   ties, every pair once — and `advancePerGroup` teams go through to the
   knockouts. A single combined table of twelve therefore misrepresents the
   competition: a team is racing the five others in its own group, not the
   eleven others in the tournament.

   The per-group figures already exist inside the group tree, under
   `group.teams`, so this costs no extra request — it reuses the same cached
   snapshot as results and court discovery.

   Note the level shift: these `wins`/`losses` count individual MATCHES (a
   team plays 8 per tie), whereas the combined leaderboard counts TIES won.
   Both are true; they answer different questions.
───────────────────────────────────────────── */

export interface GroupStandingRow {
  position: number;
  teamId: number | null;
  teamName: string;
  played: number | null;
  wins: number | null;
  losses: number | null;
  points: number | null;
  pointsFor: number | null;
  pointsAgainst: number | null;
  difference: number | null;
  /** True when this position qualifies for the knockouts. */
  qualifies: boolean;
}

export interface GroupStandings {
  groupId: number | null;
  groupName: string;
  /** How many teams go through, straight from the feed. */
  advanceCount: number | null;
  isFinished: boolean;
  rows: GroupStandingRow[];
}

/**
 * Standings for each group, ranked.
 *
 * Ordered by league points, then points difference, then points scored — the
 * conventional tie-break ladder. The feed supplies no ranking at group level,
 * only at tournament level, so the order is computed here.
 */
export async function fetchGroupStandings(
  tournamentId: number = TOURNAMENT_ID,
  _signal?: AbortSignal,
): Promise<GroupStandings[] | null> {
  const snapshot = await loadGroups(tournamentId);
  if (!snapshot) return null;

  const out: GroupStandings[] = [];

  for (const group of snapshot.groups) {
    const g = group as {
      id?: number;
      name?: string;
      advancePerGroup?: number;
      isGroupFinished?: boolean;
      teams?: unknown[];
    };

    const rows: Omit<GroupStandingRow, "position" | "qualifies">[] = [];
    for (const team of g.teams ?? []) {
      const t = team as Record<string, unknown>;
      const league = t.leagueTeam as { id?: number; name?: string } | undefined;
      const name = typeof league?.name === "string" ? league.name.trim() : "";
      if (!name) continue;

      const pointsFor = pickNumber(t, ["pointsFor"]);
      const pointsAgainst = pickNumber(t, ["pointsAgainst"]);
      rows.push({
        teamId: typeof league?.id === "number" ? league.id : null,
        teamName: name,
        played: pickNumber(t, ["matchesPlayed", "tiePlayed", "played"]),
        wins: pickNumber(t, ["wins", "tieWins"]),
        losses: pickNumber(t, ["losses"]),
        // `points` reads 0 while `netPoints` carries the real figure.
        points: pickNumber(t, ["netPoints", "points"]),
        pointsFor,
        pointsAgainst,
        difference:
          pointsFor !== null && pointsAgainst !== null ? pointsFor - pointsAgainst : null,
      });
    }

    if (rows.length === 0) continue;

    rows.sort(
      (a, b) =>
        (b.points ?? 0) - (a.points ?? 0) ||
        (b.difference ?? 0) - (a.difference ?? 0) ||
        (b.pointsFor ?? 0) - (a.pointsFor ?? 0) ||
        a.teamName.localeCompare(b.teamName),
    );

    const advance =
      typeof g.advancePerGroup === "number" && g.advancePerGroup > 0
        ? g.advancePerGroup
        : null;

    out.push({
      groupId: typeof g.id === "number" ? g.id : null,
      groupName: typeof g.name === "string" && g.name.trim() ? g.name.trim() : "Group",
      advanceCount: advance,
      isFinished: g.isGroupFinished === true,
      rows: rows.map((row, i) => ({
        ...row,
        position: i + 1,
        qualifies: advance !== null && i < advance,
      })),
    });
  }

  out.sort((a, b) => a.groupName.localeCompare(b.groupName));
  return out;
}
