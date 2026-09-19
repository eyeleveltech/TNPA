import { Reveal } from "@/components/Reveal";
import { initialsOf, resolveFranchise, type LeaderboardRow } from "@/lib/live-scores";
import type { LeaderboardState } from "@/hooks/useLeaderboard";

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

/**
 * Tournament standings.
 *
 * Columns are driven by what the feed actually returns. The leaderboard has
 * already renamed a column mid-tournament once — `tieWins` became
 * `tieWinByMatchPoints` between morning and afternoon on day two — so any
 * column where every row is empty is dropped entirely rather than rendered as
 * a stripe of dashes.
 */
export function LeaderboardSection({ state }: { state: LeaderboardState }) {
  const { rows, isLoading, failed } = state;

  // Nothing to show until standings exist. No skeleton, no empty frame.
  if (isLoading || rows.length === 0) return null;

  const has = (key: keyof LeaderboardRow) => rows.some((r) => r[key] !== null);
  const showPlayed = has("played");
  const showWins = has("wins");
  const showPoints = has("points");
  const showDiff = has("difference");

  return (
    <Reveal delay={80}>
      <section className="mt-10 sm:mt-12">
        <div className="flex items-baseline gap-3">
          <h2 className="inline-block text-[11px] font-black uppercase tracking-[0.22em] text-foreground">
            Standings
            <span className="mt-1.5 block h-0.5 w-8 rounded-full bg-gold" aria-hidden="true" />
          </h2>
          <span
            className="text-[11px] text-foreground/40"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {rows.length} teams
          </span>
        </div>

        <div className="stat-card mt-4 overflow-hidden rounded-2xl">
          {/* The table is the one thing allowed to scroll sideways, and only
              inside its own container, so the page body never does. */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/40 sm:px-4"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/40"
                  >
                    Team
                  </th>
                  {showPlayed && (
                    <th
                      scope="col"
                      title="Ties played"
                      className="px-2 py-3 text-right text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/40 sm:px-3"
                    >
                      P
                    </th>
                  )}
                  {showWins && (
                    <th
                      scope="col"
                      title="Ties won"
                      className="px-2 py-3 text-right text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/40 sm:px-3"
                    >
                      W
                    </th>
                  )}
                  {showDiff && (
                    <th
                      scope="col"
                      title="Points difference"
                      className="hidden px-2 py-3 text-right text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/40 sm:table-cell sm:px-3"
                    >
                      Diff
                    </th>
                  )}
                  {showPoints && (
                    <th
                      scope="col"
                      title="League points"
                      className="px-3 py-3 text-right text-[9px] font-bold uppercase tracking-[0.16em] text-gold sm:px-4"
                    >
                      Pts
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const brand = resolveFranchise(row.teamId, row.teamName);
                  const name = brand?.name ?? row.teamName;
                  const isTop = row.position === 1;
                  return (
                    <tr
                      key={`${row.teamId ?? row.teamName}`}
                      className="border-b border-border last:border-0"
                    >
                      <td
                        className={`px-3 py-3 text-left text-[13px] font-bold tabular-nums sm:px-4 ${
                          isTop ? "text-gold" : "text-foreground/45"
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
                              isTop ? "text-foreground" : "text-foreground/75"
                            }`}
                          >
                            {name}
                          </span>
                        </div>
                      </td>
                      {showPlayed && <Num value={row.played} className="text-foreground/60" />}
                      {showWins && <Num value={row.wins} className="text-foreground/60" />}
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
                            isTop ? "text-gold" : "text-foreground"
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

        {failed && (
          <p
            className="mt-3 text-[11px] text-foreground/40"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Standings could not be refreshed just now. Showing the last loaded table.
          </p>
        )}
      </section>
    </Reveal>
  );
}
