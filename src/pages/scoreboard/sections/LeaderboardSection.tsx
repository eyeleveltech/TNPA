import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { GroupSwitcher } from "./GroupSwitcher";
import {
  initialsOf,
  resolveFranchise,
  type GroupStandingRow,
  type GroupStandings,
} from "@/lib/live-scores";
import type { GroupStandingsState } from "@/hooks/useGroupStandings";

const GOLD_ACCENT = "45 90% 58%";

function Crest({ id, name }: { id: number | null; name: string }) {
  const brand = resolveFranchise(id, name);
  const accent = brand?.accent ?? GOLD_ACCENT;
  return (
    <span
      className="relative grid h-6 w-6 shrink-0 place-items-center overflow-hidden rounded-md sm:h-8 sm:w-8 sm:rounded-lg"
      style={{
        border: `1px solid color-mix(in oklab, hsl(${accent}) 40%, transparent)`,
        background: `color-mix(in oklab, hsl(${accent}) 10%, transparent)`,
      }}
    >
      {brand?.logo ? (
        <img
          src={brand.logo}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain p-0.5"
        />
      ) : (
        <span className="text-[8px] font-black" style={{ color: `hsl(${accent})` }}>
          {initialsOf(name)}
        </span>
      )}
    </span>
  );
}

/** Numeric cell. An absent figure shows a dash rather than a misleading zero. */
function Num({
  value,
  className = "",
  signed = false,
}: {
  value: number | null;
  className?: string;
  signed?: boolean;
}) {
  return (
    <td
      className={`px-1.5 py-3 text-right text-[12px] tabular-nums sm:px-3 sm:text-[13px] ${className}`}
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      {value === null ? (
        <span className="text-foreground/25">–</span>
      ) : signed && value > 0 ? (
        `+${value}`
      ) : (
        value
      )}
    </td>
  );
}

const Th = ({
  label,
  title,
  align = "right",
  className = "",
}: {
  label: string;
  title?: string;
  align?: "left" | "right";
  className?: string;
}) => (
  <th
    scope="col"
    title={title}
    className={`px-1.5 py-3 text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/40 sm:px-3 ${
      align === "left" ? "text-left" : "text-right"
    } ${className}`}
  >
    {label}
  </th>
);

/* ─────────────────────────────────────────────
   ONE GROUP TABLE
───────────────────────────────────────────── */

/**
 * One standings table.
 *
 * Shared by all three views. `advanceCount` draws the qualification line and
 * is only meaningful for a group — the overall and knockout tables pass null,
 * because there is no cut to draw across the whole field.
 */
function StandingsTable({
  rows,
  advanceCount,
  caption,
}: {
  rows: GroupStandingRow[];
  advanceCount: number | null;
  caption: string;
}) {
  const has = (key: keyof GroupStandingRow) => rows.some((r) => r[key] !== null);
  const showPlayed = has("played");
  const showWins = has("wins");
  const showFor = has("pointsFor");
  const showAgainst = has("pointsAgainst");
  const showDiff = has("difference");
  const showPoints = has("points");

  return (
    <div className="stat-card overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-border">
              <Th label="#" align="left" className="px-2 sm:px-4" />
              <Th label="Team" align="left" />
              {/* Tie-level, matching the organisers' own standings screen. */}
              {showPlayed && <Th label="P" title="Ties played" />}
              {showWins && <Th label="W" title="Ties won" />}
              {showFor && <Th label="PF" title="Points for" className="hidden md:table-cell" />}
              {showAgainst && (
                <Th label="PA" title="Points against" className="hidden md:table-cell" />
              )}
              {showDiff && (
                <Th label="Diff" title="Points difference" className="hidden sm:table-cell" />
              )}
              {showPoints && (
                <Th label="Pts" title="League points" className="px-3 text-gold sm:px-4" />
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const brand = resolveFranchise(row.teamId, row.teamName);
              const name = brand?.name ?? row.teamName;
              /* The qualification cut is real information from the feed
                 (advancePerGroup), so it is drawn as a line rather than left
                 for the reader to count. */
              const isCut = advanceCount !== null && row.position === advanceCount;

              return (
                <tr
                  key={row.teamId ?? row.teamName}
                  className={`last:border-0 ${
                    isCut ? "border-b-2 border-gold/35" : "border-b border-border"
                  }`}
                >
                  <td
                    className={`px-2 py-3 text-left text-[12px] font-bold tabular-nums sm:px-4 sm:text-[13px] ${
                      row.qualifies ? "text-gold" : "text-foreground/40"
                    }`}
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    {row.position}
                  </td>
                  <td className="px-1.5 py-3 sm:px-2">
                    <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
                      <Crest id={row.teamId} name={row.teamName} />
                      <span
                        className={`text-[11px] font-bold uppercase leading-tight tracking-[0.02em] sm:truncate sm:text-[13px] sm:tracking-[0.04em] ${
                          row.qualifies ? "text-foreground" : "text-foreground/60"
                        }`}
                      >
                        {name}
                      </span>
                    </div>
                  </td>
                  {showPlayed && <Num value={row.played} className="text-foreground/60" />}
                  {showWins && <Num value={row.wins} className="text-foreground/60" />}
                  {showFor && (
                    <Num value={row.pointsFor} className="hidden text-foreground/60 md:table-cell" />
                  )}
                  {showAgainst && (
                    <Num
                      value={row.pointsAgainst}
                      className="hidden text-foreground/60 md:table-cell"
                    />
                  )}
                  {showDiff && (
                    <Num
                      value={row.difference}
                      signed
                      className={`hidden sm:table-cell ${
                        row.difference !== null && row.difference > 0
                          ? "text-emerald-400/80"
                          : row.difference !== null && row.difference < 0
                            ? "text-red-400/70"
                            : "text-foreground/60"
                      }`}
                    />
                  )}
                  {showPoints && (
                    <Num
                      value={row.points}
                      className={`px-3 font-black sm:px-4 ${
                        row.qualifies ? "text-gold" : "text-foreground/85"
                      }`}
                    />
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION
───────────────────────────────────────────── */

type Board = "groups" | "overall" | "knockout";

/**
 * Standings, in three views.
 *
 *   Groups   — each team against the five in its own group, which is what
 *              decides who advances, with the qualification cut drawn where
 *              the feed puts it.
 *   Overall  — all twelve ranked together.
 *   Knockout — the bracket, which does not exist until the group stage ends
 *              and so has no tab until the feed returns one.
 *
 * Figures are tie-level throughout, matching the organisers' own screen.
 */
export function LeaderboardSection({
  state,
  activeGroup,
  onGroupChange,
}: {
  state: GroupStandingsState;
  /** Shared with the matches section; null means "first group". */
  activeGroup: string | null;
  onGroupChange: (group: string) => void;
}) {
  const { groups, overall, knockout, isLoading, failed } = state;
  const [picked, setPicked] = useState<Board | null>(null);

  // Nothing to show until standings exist. No skeleton, no empty frame.
  if (isLoading) return null;

  const hasGroups = groups.length > 0;
  const hasOverall = overall.length > 0;
  const hasKnockout = knockout !== null && knockout.length > 0;
  if (!hasGroups && !hasOverall && !hasKnockout) return null;

  const tabs: Array<{ id: Board; label: string; show: boolean }> = [
    { id: "groups", label: "Groups", show: hasGroups },
    { id: "overall", label: "Overall", show: hasOverall },
    { id: "knockout", label: "Knockout", show: hasKnockout },
  ];
  const visibleTabs = tabs.filter((t) => t.show);

  /* Groups first: it is the table that decides who goes through. A tab whose
     data has gone away cannot stay selected. */
  const fallback: Board = hasGroups ? "groups" : hasOverall ? "overall" : "knockout";
  const board: Board =
    picked !== null && visibleTabs.some((t) => t.id === picked) ? picked : fallback;

  const groupNames = groups.map((g) => g.groupName);
  const activeName =
    activeGroup !== null && groupNames.includes(activeGroup)
      ? activeGroup
      : (groupNames[0] ?? "");
  const activeGroupData = groups.find((g) => g.groupName === activeName) ?? groups[0];

  const showingGroups = board === "groups" && activeGroupData;
  const rows = showingGroups
    ? activeGroupData.rows
    : board === "knockout" && knockout
      ? knockout
      : overall;
  const advanceCount = showingGroups ? activeGroupData.advanceCount : null;
  const caption = showingGroups
    ? `${activeGroupData.groupName} standings${
        activeGroupData.advanceCount !== null
          ? `, top ${activeGroupData.advanceCount} advance`
          : ""
      }`
    : board === "knockout"
      ? "Knockout standings"
      : "Overall standings, all teams";

  return (
    <Reveal delay={80}>
      <section className="mt-10 sm:mt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h2 className="inline-block text-[11px] font-black uppercase tracking-[0.22em] text-foreground">
            Standings
            <span className="mt-1.5 block h-0.5 w-8 rounded-full bg-gold" aria-hidden="true" />
          </h2>
          {showingGroups && activeGroupData.advanceCount !== null ? (
            <span
              className="text-[11px] text-foreground/45"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Top {activeGroupData.advanceCount} advance to the knockouts
            </span>
          ) : (
            <span
              className="text-[11px] text-foreground/40"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              {rows.length} teams
            </span>
          )}
        </div>

        {/* Which board on the left, which group on the right — the group
            chooser only means anything in the groups view. */}
        <div className="mt-4 flex flex-wrap items-center gap-2 sm:justify-between sm:gap-3">
          {visibleTabs.length > 1 && (
            <div
              role="tablist"
              aria-label="Choose a standings table"
              className="inline-flex flex-wrap gap-1 rounded-xl p-1 sm:gap-1.5 sm:rounded-2xl sm:p-1.5"
              style={{
                border: "1px solid var(--color-border)",
                background: "color-mix(in oklab, var(--chalk) 4%, transparent)",
              }}
            >
              {visibleTabs.map((tab) => {
                const isActive = tab.id === board;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setPicked(tab.id)}
                    className={`rounded-lg px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] transition-colors sm:rounded-xl sm:px-5 sm:text-[13px] sm:tracking-[0.12em] ${
                      isActive ? "text-ink" : "text-foreground/60 hover:text-foreground"
                    }`}
                    style={{ background: isActive ? "var(--gold)" : "transparent" }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}

          {board === "groups" && (
            <GroupSwitcher
              groups={groupNames}
              active={activeName}
              onChange={onGroupChange}
              label="Choose a group for the standings"
            />
          )}
        </div>

        <div className="mt-4">
          <StandingsTable rows={rows} advanceCount={advanceCount} caption={caption} />
        </div>

        {failed && (
          <p
            className="mt-3 text-[11px] text-foreground/40"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Standings could not be refreshed just now. Showing the last loaded tables.
          </p>
        )}
      </section>
    </Reveal>
  );
}
