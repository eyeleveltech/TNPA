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
      className="relative grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-lg sm:h-8 sm:w-8"
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
      className={`px-2 py-3 text-right text-[13px] tabular-nums sm:px-3 ${className}`}
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
    className={`px-2 py-3 text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/40 sm:px-3 ${
      align === "left" ? "text-left" : "text-right"
    } ${className}`}
  >
    {label}
  </th>
);

/* ─────────────────────────────────────────────
   ONE GROUP TABLE
───────────────────────────────────────────── */

function GroupTable({ group }: { group: GroupStandings }) {
  const has = (key: keyof GroupStandingRow) => group.rows.some((r) => r[key] !== null);
  const showPlayed = has("played");
  const showWins = has("wins");
  const showFor = has("pointsFor");
  const showAgainst = has("pointsAgainst");
  const showDiff = has("difference");
  const showPoints = has("points");

  return (
    <div className="stat-card overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[460px] border-collapse">
          <caption className="sr-only">
            {group.groupName} standings
            {group.advanceCount !== null ? `, top ${group.advanceCount} advance` : ""}
          </caption>
          <thead>
            <tr className="border-b border-border">
              <Th label="#" align="left" className="px-3 sm:px-4" />
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
            {group.rows.map((row) => {
              const brand = resolveFranchise(row.teamId, row.teamName);
              const name = brand?.name ?? row.teamName;
              /* The qualification cut is real information from the feed
                 (advancePerGroup), so it is drawn as a line rather than left
                 for the reader to count. */
              const isCut =
                group.advanceCount !== null && row.position === group.advanceCount;

              return (
                <tr
                  key={row.teamId ?? row.teamName}
                  className={`last:border-0 ${
                    isCut ? "border-b-2 border-gold/35" : "border-b border-border"
                  }`}
                >
                  <td
                    className={`px-3 py-3 text-left text-[13px] font-bold tabular-nums sm:px-4 ${
                      row.qualifies ? "text-gold" : "text-foreground/40"
                    }`}
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    {row.position}
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-2.5">
                      <Crest id={row.teamId} name={row.teamName} />
                      <span
                        className={`truncate text-[12px] font-bold uppercase tracking-[0.04em] sm:text-[13px] ${
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

/**
 * Group standings.
 *
 * The league is two groups of six playing separate round robins, so one
 * combined table of twelve would misrepresent it — a team is racing the five
 * others in its group, not the eleven others in the tournament. One group is
 * shown at a time, chosen by a button, with the qualification cut drawn where
 * the feed's own `advancePerGroup` puts it.
 */
export function LeaderboardSection({
  state,
  activeGroup,
  onGroupChange,
}: {
  state: GroupStandingsState;
  /** Shared with the results section; null means "first group". */
  activeGroup: string | null;
  onGroupChange: (group: string) => void;
}) {
  const { groups, isLoading, failed } = state;

  // Nothing to show until standings exist. No skeleton, no empty frame.
  if (isLoading || groups.length === 0) return null;

  const activeName =
    activeGroup !== null && groups.some((g) => g.groupName === activeGroup)
      ? activeGroup
      : groups[0].groupName;
  const active = groups.find((g) => g.groupName === activeName) ?? groups[0];

  return (
    <Reveal delay={80}>
      <section className="mt-10 sm:mt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h2 className="inline-block text-[11px] font-black uppercase tracking-[0.22em] text-foreground">
            Standings
            <span className="mt-1.5 block h-0.5 w-8 rounded-full bg-gold" aria-hidden="true" />
          </h2>
          {active.advanceCount !== null && (
            <span
              className="text-[11px] text-foreground/45"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Top {active.advanceCount} advance to the knockouts
            </span>
          )}
        </div>

        <div className="mt-4">
          <GroupSwitcher
            groups={groups.map((g) => g.groupName)}
            active={activeName}
            onChange={onGroupChange}
            label="Choose a group for the standings"
          />
        </div>

        <div className="mt-4">
          <GroupTable group={active} />
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
