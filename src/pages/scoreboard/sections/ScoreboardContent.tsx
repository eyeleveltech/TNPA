import { useState } from "react";
import {
  AlertTriangle,
  Disc,
  LayoutGrid,
  RefreshCw,
  Trophy,
  User,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import {
  deriveMatchState,
  initialsOf,
  matchLabel,
  playerShortName,
  resolveFranchise,
  type ApiFixtureTeam,
  type ApiLiveMatch,
  type ApiMatchPlayer,
  type ApiSideTeam,
  type CourtResult,
} from "@/lib/live-scores";
import type { LiveScoresState } from "@/hooks/useLiveScores";

const GOLD_ACCENT = "45 90% 58%";

/* ─────────────────────────────────────────────
   PRESENCE HELPERS

   The rule for this whole page: if the feed did not send it, the UI does not
   show it. No empty rows, no dashes standing in for missing values, no labels
   with nothing after them. Every block below is wrapped in one of these.

   Most of the feed's optional fields are currently null — match stage, format,
   skill, toss winner, winner team, player photos — and a scoreboard full of
   blank labels reads as broken rather than as sparse.
───────────────────────────────────────────── */

const hasText = (v: unknown): v is string =>
  typeof v === "string" && v.trim().length > 0;

const hasList = <T,>(v: T[] | null | undefined): v is T[] =>
  Array.isArray(v) && v.length > 0;

const isNum = (v: unknown): v is number =>
  typeof v === "number" && Number.isFinite(v);

/* ─────────────────────────────────────────────
   PER-PLAYER SERVE STATE

   `matchPlayers` holds one entry per player on court — two for singles, four
   for doubles — and `servePlayer` identifies which player that entry is about.
   Indexing by that id lets each name carry its own marker instead of crediting
   the whole side, which is what a real scorecard does.
───────────────────────────────────────────── */

interface PlayerState {
  isServing: boolean;
  isReceiving: boolean;
  serverNumber: number | null;
}

function buildPlayerStates(match: ApiLiveMatch): Map<number, PlayerState> {
  const map = new Map<number, PlayerState>();
  for (const entry of match.matchPlayers ?? ([] as ApiMatchPlayer[])) {
    const id = entry.servePlayer?.id;
    if (!isNum(id)) continue;
    map.set(id, {
      isServing: entry.isServing === true,
      isReceiving: entry.isReceiving === true,
      serverNumber: isNum(entry.serverNumber) ? entry.serverNumber : null,
    });
  }
  return map;
}

/** This site's name for a franchise, falling back to whatever the feed sent. */
function franchiseName(
  fixtureTeam: ApiFixtureTeam | null | undefined,
  fallback: string,
): string {
  const apiName = hasText(fixtureTeam?.name) ? fixtureTeam.name : fallback;
  return resolveFranchise(fixtureTeam?.id, apiName)?.name ?? apiName;
}

/**
 * Which FRANCHISE won the toss.
 *
 * The feed leaves `toss.tossWinner` null and only fills `tossCapWinner`, which
 * names the on-court pairing ("Vishal,Sai") rather than the club. That is
 * meaningless on a public scoreboard, so the pairing id is matched back to its
 * side to recover the franchise. Falls back to the pairing name if the ids do
 * not line up, and to nothing at all if the feed sent no toss.
 */
function tossWinnerName(match: ApiLiveMatch): string | null {
  const capId = match.toss?.tossCapWinner?.id;
  if (isNum(capId)) {
    if (capId === match.teamA?.id) {
      return franchiseName(match.tieFixture?.teamA, match.teamA?.teamAName ?? "");
    }
    if (capId === match.teamB?.id) {
      return franchiseName(match.tieFixture?.teamB, match.teamB?.teamBName ?? "");
    }
  }
  const capName = match.toss?.tossCapWinner?.name;
  return hasText(capName) ? capName : null;
}

/* ─────────────────────────────────────────────
   TEAM SIDE

   Mirrored on wide screens: the left side runs crest-then-name, the right side
   reverses so both read inward toward the score. Below `md` both stack in the
   same left-aligned direction, because mirroring a single column just looks
   like a mistake.
───────────────────────────────────────────── */

function TeamSide({
  fixtureTeam,
  sideTeam,
  fallbackName,
  playerStates,
  isDoubles,
  align,
}: {
  fixtureTeam: ApiFixtureTeam | null;
  sideTeam: ApiSideTeam | null;
  fallbackName: string;
  playerStates: Map<number, PlayerState>;
  isDoubles: boolean;
  align: "left" | "right";
}) {
  const apiName = hasText(fixtureTeam?.name) ? fixtureTeam.name : fallbackName;
  const brand = resolveFranchise(fixtureTeam?.id, apiName);

  const displayName = brand?.name ?? apiName;
  const logo = brand?.logo ?? (hasText(fixtureTeam?.image) ? fixtureTeam.image : null);
  const accent = brand?.accent ?? GOLD_ACCENT;
  const players = sideTeam?.players ?? [];

  const isRight = align === "right";

  // Role pill reflects the side, not a guess: derived from the players actually
  // flagged by the feed, so it disappears when the feed reports neither.
  const serving = players.some((p) => playerStates.get(p.id)?.isServing);
  const receiving = players.some((p) => playerStates.get(p.id)?.isReceiving);
  const serverNumber = players
    .map((p) => playerStates.get(p.id))
    .find((s) => s?.isServing)?.serverNumber;

  return (
    <div
      className={`flex items-center gap-4 sm:gap-5 ${
        isRight ? "md:flex-row-reverse md:text-right" : ""
      }`}
    >
      {/* Crest */}
      <span
        className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl sm:h-20 sm:w-20"
        style={{
          border: `1px solid color-mix(in oklab, hsl(${accent}) 45%, transparent)`,
          background: `color-mix(in oklab, hsl(${accent}) 12%, transparent)`,
          boxShadow: `0 0 26px -8px color-mix(in oklab, hsl(${accent}) 55%, transparent)`,
        }}
      >
        {logo ? (
          <img
            src={logo}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-1.5"
          />
        ) : (
          <span
            className="text-base font-black tracking-tight"
            style={{ color: `hsl(${accent})` }}
          >
            {initialsOf(displayName)}
          </span>
        )}
      </span>

      <div className="min-w-0 flex-1">
        <h3
          className="text-xl font-black uppercase leading-[1.08] tracking-[0.02em] text-foreground sm:text-2xl lg:text-[1.75rem]"
          style={{ textWrap: "balance" }}
        >
          {displayName}
        </h3>

        {hasList(players) && (
          <ul className={`mt-2 space-y-1 ${isRight ? "md:items-end" : ""}`}>
            {players.map((player) => {
              const name = playerShortName(player);
              if (!hasText(name)) return null;
              const isServer = playerStates.get(player.id)?.isServing === true;
              return (
                <li
                  key={player.id}
                  className={`flex items-center gap-2 ${
                    isRight ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <User
                    className={`h-3.5 w-3.5 shrink-0 ${
                      isServer ? "text-gold" : "text-foreground/35"
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`truncate text-[13px] sm:text-[15px] ${
                      isServer ? "font-semibold text-foreground" : "text-foreground/65"
                    }`}
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    {name}
                  </span>
                </li>
              );
            })}
          </ul>
        )}

        {/* Role pill. Gold for serving, muted for receiving, absent otherwise. */}
        {(serving || receiving) && (
          <div className={`mt-3 flex ${isRight ? "md:justify-end" : ""}`}>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]"
              style={
                serving
                  ? {
                      color: "var(--gold)",
                      border: "1px solid color-mix(in oklab, var(--gold) 55%, transparent)",
                      background: "color-mix(in oklab, var(--gold) 10%, transparent)",
                    }
                  : {
                      color: "color-mix(in oklab, var(--chalk) 62%, transparent)",
                      border: "1px solid var(--color-border)",
                      background: "color-mix(in oklab, var(--chalk) 5%, transparent)",
                    }
              }
            >
              {serving && (
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--gold)" }}
                  aria-hidden="true"
                />
              )}
              {serving ? "Serving" : "Receiving"}
              {/* Server number is meaningless in singles. */}
              {serving && isDoubles && isNum(serverNumber) ? ` ${serverNumber}` : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCORE PANEL
───────────────────────────────────────────── */

function ScorePanel({
  scoreA,
  scoreB,
  label,
}: {
  scoreA: number;
  scoreB: number;
  label: string;
}) {
  const cell = (value: number, leading: boolean) => (
    <div className="flex flex-col items-center gap-1.5 px-5 sm:px-7">
      <p
        className={`text-5xl font-black leading-none sm:text-6xl ${
          leading ? "text-gold" : "text-foreground"
        }`}
        style={{ fontFamily: "Arial, sans-serif", fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </p>
      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-foreground/40">
        {label}
      </p>
    </div>
  );

  return (
    <div
      className="flex items-center justify-center rounded-2xl px-2 py-5 sm:py-6"
      style={{
        border: "1px solid var(--color-border)",
        background: "color-mix(in oklab, var(--chalk) 4%, transparent)",
      }}
    >
      {cell(scoreA, scoreA > scoreB)}
      <span className="h-14 w-px shrink-0 bg-border sm:h-16" aria-hidden="true" />
      {cell(scoreB, scoreB > scoreA)}
    </div>
  );
}

/* ─────────────────────────────────────────────
   COURT CARD
───────────────────────────────────────────── */

function CourtCard({ result }: { result: CourtResult }) {
  const match = result.match;
  if (!match) return null;

  const state = deriveMatchState(match);
  const playerStates = buildPlayerStates(match);
  const isDoubles = match.matchTypeName === "Doubles";

  const scoreA = isNum(match.teamAScore) ? match.teamAScore : null;
  const scoreB = isNum(match.teamBScore) ? match.teamBScore : null;
  const showScore = isNum(scoreA) && isNum(scoreB);

  /* A carried-over score must not wear a pulsing LIVE badge — that would
     claim it is current when the last request for this court failed. */
  const badge = result.isStale
    ? { label: "Reconnecting", color: "#f59e0b" }
    : result.isRecentlyFinished
      ? { label: "Final", color: "#4ade80" }
      : {
        live: { label: "Live", color: "#ff3b3b" },
        final: { label: "Final", color: "#4ade80" },
        upcoming: { label: "Upcoming", color: "#94a3b8" },
        }[state];

  const contextLine = [match.groupName, match.tieName]
    .filter(hasText)
    .concat(isNum(match.matchNo) ? [`Match ${match.matchNo}`] : [])
    .join("  •  ");

  const eventLabel = matchLabel(match);

  /* Sets show only for genuinely multi-set matches carrying a real score. The
     feed reports `sets[0]` as 0-0 while the top-level score reads 11-2 for that
     same set, so rendering it now would put two contradictory numbers on one
     card. It appears on its own once the scoring team fixes it. */
  const sets = (match.sets ?? []).filter(
    (s) => isNum(s.teamAScore) && isNum(s.teamBScore) && s.teamAScore + s.teamBScore > 0,
  );
  const showSets = isNum(match.maxSets) && match.maxSets > 1 && hasList(sets);

  const tieMatches = (match.tieFixtureMatches ?? []).filter((m) => isNum(m.matchNumber));
  const showTie = hasList(tieMatches);

  /* Read straight from the feed — no substitute computed. The field is
     currently 0-0 because the scoring side has not populated it, so the row
     simply stays hidden until it carries a real value. */
  const tieScore = match.tieScore;
  const showTieScore =
    !!tieScore && isNum(tieScore.teamA) && isNum(tieScore.teamB) &&
    tieScore.teamA + tieScore.teamB > 0;

  const points = match.tournamentTotalPoints;
  const showPoints = points && isNum(points.teamA) && isNum(points.teamB);

  const tossName = tossWinnerName(match);
  const showToss = hasText(tossName);

  const showStage = hasText(match.matchStage);
  const showFooter = showToss || showPoints || showTieScore || showStage;

  return (
    <article
      className="stat-card relative overflow-hidden rounded-3xl p-5 sm:p-7 lg:p-8"
      style={{
        background:
          "radial-gradient(90% 70% at 50% 0%, color-mix(in oklab, var(--gold) 4%, transparent), transparent 70%), color-mix(in oklab, var(--chalk) 3%, transparent)",
      }}
    >
      {/* ── Header ── */}
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <h2 className="shrink-0 text-base font-black uppercase tracking-[0.1em] text-foreground sm:text-lg">
            Court {isNum(match.courtId) ? match.courtId : result.courtId}
          </h2>
          {hasText(contextLine) && (
            <>
              <span className="hidden h-5 w-px shrink-0 bg-border sm:block" aria-hidden="true" />
              <p
                className="truncate text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/45 sm:text-[11px]"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {contextLine}
              </p>
            </>
          )}
        </div>

        <span
          className="inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{
            color: badge.color,
            border: `1px solid color-mix(in oklab, ${badge.color} 55%, transparent)`,
            background: `color-mix(in oklab, ${badge.color} 14%, transparent)`,
          }}
        >
          <span className="relative flex h-2 w-2">
            {state === "live" && !result.isStale && !result.isRecentlyFinished && (
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ background: badge.color }}
              />
            )}
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: badge.color }}
            />
          </span>
          {badge.label}
        </span>
      </header>

      {/* ── Event label, ruled across the card ── */}
      {hasText(eventLabel) && (
        <div className="mt-6 flex items-center gap-4 sm:mt-7">
          <span
            className="h-px min-w-6 flex-1"
            style={{
              background:
                "linear-gradient(to right, transparent, color-mix(in oklab, var(--gold) 45%, transparent))",
            }}
            aria-hidden="true"
          />
          <p
            className="text-center text-[11px] font-bold uppercase tracking-[0.26em] text-gold sm:text-[13px] sm:tracking-[0.3em]"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {eventLabel}
          </p>
          <span
            className="h-px min-w-6 flex-1"
            style={{
              background:
                "linear-gradient(to left, transparent, color-mix(in oklab, var(--gold) 45%, transparent))",
            }}
            aria-hidden="true"
          />
        </div>
      )}

      {/* ── Teams and score ── */}
      <div
        className={`mt-6 grid items-center gap-6 sm:mt-8 sm:gap-7 ${
          showScore ? "md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-8" : "md:grid-cols-2"
        }`}
      >
        <TeamSide
          fixtureTeam={match.tieFixture?.teamA ?? null}
          sideTeam={match.teamA}
          fallbackName={match.teamA?.teamAName ?? "Team A"}
          playerStates={playerStates}
          isDoubles={isDoubles}
          align="left"
        />

        {/* Score is omitted entirely when absent — a fabricated 0 is a wrong
            score, not a missing one. */}
        {showScore && <ScorePanel scoreA={scoreA} scoreB={scoreB} label="Points" />}

        <TeamSide
          fixtureTeam={match.tieFixture?.teamB ?? null}
          sideTeam={match.teamB}
          fallbackName={match.teamB?.teamBName ?? "Team B"}
          playerStates={playerStates}
          isDoubles={isDoubles}
          align="right"
        />
      </div>

      {/* ── Sets ── */}
      {showSets && (
        <section
          className="mt-6 rounded-2xl px-5 py-4 sm:mt-7"
          style={{
            border: "1px solid var(--color-border)",
            background: "color-mix(in oklab, var(--chalk) 3%, transparent)",
          }}
        >
          <p className="inline-block text-[11px] font-black uppercase tracking-[0.16em] text-foreground">
            Sets
            <span className="mt-1 block h-0.5 w-7 rounded-full bg-gold" aria-hidden="true" />
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {sets.map((s) => (
              <span
                key={s.id}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-bold text-foreground/80"
                style={{
                  border: "1px solid var(--color-border)",
                  fontFamily: "Arial, sans-serif",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <span className="text-[11px] font-semibold text-foreground/40">
                  S{s.setNumber}
                </span>
                {s.teamAScore}–{s.teamBScore}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ── Every match in this tie ── */}
      {showTie && (
        <section
          className="mt-4 rounded-2xl px-5 py-4"
          style={{
            border: "1px solid var(--color-border)",
            background: "color-mix(in oklab, var(--chalk) 3%, transparent)",
          }}
        >
          <p className="inline-block text-[11px] font-black uppercase tracking-[0.16em] text-foreground">
            {hasText(match.tieName) ? match.tieName : "This Tie"}
            <span className="mt-1 block h-0.5 w-7 rounded-full bg-gold" aria-hidden="true" />
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tieMatches.map((m) => {
              const isCurrent = m.matchNumber === match.matchNo;
              const scored = isNum(m.teamAScore) && isNum(m.teamBScore);
              return (
                <span
                  key={m.matchNumber}
                  className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-bold ${
                    isCurrent ? "text-gold" : "text-foreground/80"
                  }`}
                  style={{
                    border: isCurrent
                      ? "1px solid color-mix(in oklab, var(--gold) 60%, transparent)"
                      : "1px solid var(--color-border)",
                    background: isCurrent
                      ? "color-mix(in oklab, var(--gold) 10%, transparent)"
                      : "transparent",
                    fontFamily: "Arial, sans-serif",
                    fontVariantNumeric: "tabular-nums",
                  }}
                  title={isCurrent ? "On court now" : undefined}
                >
                  <span
                    className={`text-[11px] font-semibold ${
                      isCurrent ? "text-gold/60" : "text-foreground/40"
                    }`}
                  >
                    M{m.matchNumber}
                  </span>
                  {scored && (
                    <>
                      {m.teamAScore}–{m.teamBScore}
                    </>
                  )}
                </span>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      {showFooter && (
        <section
          className="mt-4 grid gap-5 rounded-2xl px-5 py-5 sm:grid-cols-2 sm:gap-0"
          style={{
            border: "1px solid var(--color-border)",
            background: "color-mix(in oklab, var(--chalk) 3%, transparent)",
          }}
        >
          {showToss && (
            <div className="flex items-center gap-4">
              <Disc className="h-8 w-8 shrink-0 text-foreground/30" strokeWidth={1.3} aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/45">
                  Toss
                </p>
                <p className="mt-1 truncate text-[14px] font-bold uppercase tracking-[0.04em] text-foreground">
                  {tossName}
                </p>
              </div>
            </div>
          )}

          {(showPoints || showTieScore || showStage) && (
            <div
              className={`flex flex-col justify-center gap-3 ${
                showToss ? "sm:border-l sm:border-border sm:pl-6" : ""
              }`}
            >
              {showStage && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/45">
                    Stage
                  </p>
                  <p className="mt-1 text-[14px] font-bold text-foreground">{match.matchStage}</p>
                </div>
              )}
              {showTieScore && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/45">
                    Tie Score
                  </p>
                  <p
                    className="mt-1 text-[18px] font-black text-foreground"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {tieScore.teamA} – {tieScore.teamB}
                  </p>
                </div>
              )}
              {showPoints && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/45">
                    League Points
                  </p>
                  <p
                    className="mt-1 flex items-center gap-2.5 text-[20px] font-black text-foreground"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    <Trophy className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.6} aria-hidden="true" />
                    {points.teamA} – {points.teamB}
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </article>
  );
}

/* ─────────────────────────────────────────────
   SUPPORTING STATES
───────────────────────────────────────────── */

function SkeletonCard() {
  return (
    <div className="stat-card animate-pulse rounded-3xl p-5 sm:p-7 lg:p-8">
      <div className="flex items-center justify-between">
        <div className="h-5 w-40 rounded bg-foreground/10" />
        <div className="h-6 w-20 rounded-full bg-foreground/10" />
      </div>
      <div className="mx-auto mt-7 h-3 w-48 rounded bg-foreground/5" />
      <div className="mt-8 grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        {[0, 1].map((i) => (
          <div key={i} className={`flex items-center gap-5 ${i === 1 ? "md:order-3" : ""}`}>
            <div className="h-16 w-16 shrink-0 rounded-2xl bg-foreground/10 sm:h-20 sm:w-20" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-3/4 rounded bg-foreground/10" />
              <div className="h-3 w-1/2 rounded bg-foreground/5" />
            </div>
          </div>
        ))}
        <div className="mx-auto h-24 w-44 rounded-2xl bg-foreground/5 md:order-2" />
      </div>
    </div>
  );
}


/* ─────────────────────────────────────────────
   COURT SWITCHER

   With only two courts, stacking both cards pushed the second below the fold
   on a phone. Tabs put one court on screen at a time and make switching one
   tap, while the live dot still shows what is happening on the other court
   without leaving the one you are watching.
───────────────────────────────────────────── */

function CourtTabs({
  courts,
  activeId,
  onSelect,
}: {
  courts: CourtResult[];
  activeId: number | null;
  onSelect: (courtId: number) => void;
}) {
  // One court needs no switcher.
  if (courts.length < 2) return null;

  return (
    <div
      role="tablist"
      aria-label="Choose a court"
      className="mb-5 inline-flex flex-wrap gap-1.5 rounded-2xl p-1.5 sm:mb-6"
      style={{
        border: "1px solid var(--color-border)",
        background: "color-mix(in oklab, var(--chalk) 4%, transparent)",
      }}
    >
      {courts.map((court) => {
        const isActive = court.courtId === activeId;
        // A genuinely live match, not one being held through a changeover.
        const isLive = court.match !== null && !court.isRecentlyFinished && !court.isStale;
        return (
          <button
            key={court.courtId}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(court.courtId)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors sm:px-5 sm:text-[13px] ${
              isActive ? "text-ink" : "text-foreground/60 hover:text-foreground"
            }`}
            style={
              isActive
                ? { background: "var(--gold)" }
                : { background: "transparent" }
            }
          >
            <span className="relative flex h-2 w-2">
              {isLive && !isActive && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              )}
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{
                  background: isLive
                    ? isActive
                      ? "color-mix(in oklab, var(--ink) 70%, transparent)"
                      : "#ff3b3b"
                    : isActive
                      ? "color-mix(in oklab, var(--ink) 30%, transparent)"
                      : "color-mix(in oklab, var(--chalk) 25%, transparent)",
                }}
              />
            </span>
            Court {court.courtId}
          </button>
        );
      })}
    </div>
  );
}

/** Shown in place of a card when the chosen court has nothing on it. */
function EmptyCourtPanel({
  result,
  hasFixtures,
}: {
  result: CourtResult | null;
  hasFixtures?: boolean | null;
}) {
  const failed = hasText(result?.error);
  const heading = failed
    ? "Court Unavailable"
    : hasFixtures === false
      ? "Fixtures Coming Soon"
      : "No Match In Play";
  const body = failed
    ? `${result?.error}. The page keeps retrying.`
    : hasFixtures === false
      ? "The draw has not been published yet. Teams, fixtures and scores appear here automatically as soon as the organisers release them."
      : "Nothing is on this court right now. The next match appears here automatically the moment it begins.";

  return (
    <div className="stat-card rounded-3xl px-6 py-14 text-center">
      <span
        className="mx-auto grid h-16 w-16 place-items-center rounded-full"
        style={{
          border: "1px solid color-mix(in oklab, var(--gold) 30%, transparent)",
          background:
            "radial-gradient(circle at 38% 32%, color-mix(in oklab, var(--gold) 16%, transparent), transparent)",
        }}
      >
        <LayoutGrid className="h-7 w-7 text-gold" strokeWidth={1.4} aria-hidden="true" />
      </span>
      <h2 className="display-title-extended mt-5 text-2xl text-foreground sm:text-3xl">
        {heading}
      </h2>
      <p
        className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-foreground/60"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {body}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE BODY
───────────────────────────────────────────── */

export function ScoreboardContent({
  state,
  hasFixtures,
}: {
  state: LiveScoresState;
  /** True once the draw exists, false while unpublished, null if unknown. */
  hasFixtures?: boolean | null;
}) {
  const { courts, isInitialLoading, isRefreshing, error, refresh } = state;

  /* null means "follow the action". Once the viewer taps a court we respect
     that and stop moving under them, which matters when both courts are live
     and the other one finishes. */
  const [picked, setPicked] = useState<number | null>(null);

  const ordered = [...courts].sort((a, b) => a.courtId - b.courtId);
  const firstLive = ordered.find((c) => c.match !== null)?.courtId;
  const activeId =
    picked !== null && ordered.some((c) => c.courtId === picked)
      ? picked
      : (firstLive ?? ordered[0]?.courtId ?? null);
  const active = ordered.find((c) => c.courtId === activeId) ?? null;

  return (
    <section className="relative bg-ink pb-16 pt-2 sm:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(to bottom, black, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
        {/* ── Server unreachable. Last known scores stay on screen below, so
               this is a banner rather than a replacement for the board. ── */}
        {hasText(error) && (
          <div
            className="flex items-start gap-3 rounded-2xl px-4 py-3.5 sm:px-5"
            style={{
              border: "1px solid color-mix(in oklab, #f59e0b 40%, transparent)",
              background: "color-mix(in oklab, #f59e0b 10%, transparent)",
            }}
          >
            <AlertTriangle
              className="mt-0.5 h-4 w-4 shrink-0 text-amber-400"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-amber-300">
                Scores are not updating
              </p>
              <p
                className="mt-1 text-[12px] text-foreground/65"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {error}. Any scores below may be out of date. The page keeps retrying.
              </p>
            </div>
          </div>
        )}

        {/* ── First load ── */}
        {isInitialLoading && <SkeletonCard />}

        {/* ── Court switcher, then the chosen court ── */}
        {!isInitialLoading && hasList(ordered) && (
          <>
            <CourtTabs courts={ordered} activeId={activeId} onSelect={setPicked} />
            {active?.match ? (
              <CourtCard result={active} />
            ) : (
              <Reveal delay={80}>
                <EmptyCourtPanel result={active} hasFixtures={hasFixtures} />
              </Reveal>
            )}
          </>
        )}

      </div>

      {/* ── Refresh. Icon only, stacked directly ABOVE the global back-to-top
             button rather than on top of it: BackToTop is mounted for every
             route at right-6/bottom-6 (sm:right-8/bottom-8) with h-12, so this
             sits one button-height plus a gap higher and shares its right edge.
             Outlined, not solid gold, so the two read as a hierarchy instead of
             two competing primary actions. ── */}
      <button
        type="button"
        onClick={refresh}
        disabled={isRefreshing}
        aria-label="Refresh scores"
        title="Refresh scores"
        className="fixed bottom-22 right-6 z-40 grid h-12 w-12 place-items-center rounded-full text-gold shadow-lg backdrop-blur transition-colors hover:bg-gold/15 disabled:opacity-50 sm:bottom-24 sm:right-8"
        style={{
          border: "1px solid color-mix(in oklab, var(--gold) 45%, transparent)",
          background: "color-mix(in oklab, var(--ink) 82%, transparent)",
        }}
      >
        <RefreshCw
          className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
          aria-hidden="true"
        />
      </button>
    </section>
  );
}
