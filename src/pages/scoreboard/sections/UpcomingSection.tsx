import { CalendarClock, LayoutGrid } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { GroupSwitcher } from "./GroupSwitcher";
import {
  initialsOf,
  resolveFranchise,
  type UpcomingMatch,
  type UpcomingTie,
} from "@/lib/live-scores";
import type { UpcomingState } from "@/hooks/useUpcoming";

const GOLD_ACCENT = "45 90% 58%";

function Crest({ id, name }: { id: number | null; name: string }) {
  const brand = resolveFranchise(id, name);
  const accent = brand?.accent ?? GOLD_ACCENT;
  return (
    <span
      className="relative grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-lg"
      style={{
        border: `1px solid color-mix(in oklab, hsl(${accent}) 38%, transparent)`,
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
        <span className="text-[9px] font-black" style={{ color: `hsl(${accent})` }}>
          {initialsOf(name)}
        </span>
      )}
    </span>
  );
}

const display = (id: number | null, name: string) =>
  resolveFranchise(id, name)?.name ?? name;

/** Two crests and two names, used by both kinds of upcoming entry. */
function Matchup({
  aId,
  aName,
  bId,
  bName,
}: {
  aId: number | null;
  aName: string;
  bId: number | null;
  bName: string;
}) {
  return (
    <div className="mt-2.5 flex items-center gap-2.5">
      <Crest id={aId} name={aName} />
      <span className="min-w-0 flex-1 truncate text-[12px] font-bold uppercase tracking-[0.04em] text-foreground/80">
        {display(aId, aName)}
      </span>
      <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/30">
        v
      </span>
      <span className="min-w-0 flex-1 truncate text-right text-[12px] font-bold uppercase tracking-[0.04em] text-foreground/80">
        {display(bId, bName)}
      </span>
      <Crest id={bId} name={bName} />
    </div>
  );
}

function NextMatchCard({ match }: { match: UpcomingMatch }) {
  return (
    <li
      className="rounded-xl px-4 py-3.5"
      style={{
        border: "1px solid var(--color-border)",
        background: "color-mix(in oklab, var(--chalk) 2%, transparent)",
      }}
    >
      <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/40">
        {match.courtId !== null && (
          <span className="inline-flex items-center gap-1.5 text-gold">
            <LayoutGrid className="h-3 w-3" aria-hidden="true" />
            Court {match.courtId}
          </span>
        )}
        <span aria-hidden="true">·</span>
        <span>Match {match.matchNo}</span>
        <span aria-hidden="true">·</span>
        <span>{match.tieName}</span>
      </div>
      <Matchup
        aId={match.teamAId}
        aName={match.teamAName}
        bId={match.teamBId}
        bName={match.teamBName}
      />
    </li>
  );
}

function UpcomingTieCard({ tie }: { tie: UpcomingTie }) {
  return (
    <li
      className="rounded-xl px-4 py-3.5"
      style={{
        border: "1px solid var(--color-border)",
        background: "color-mix(in oklab, var(--chalk) 2%, transparent)",
      }}
    >
      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gold">
        {tie.tieName}
      </p>
      <Matchup
        aId={tie.teamAId}
        aName={tie.teamAName}
        bId={tie.teamBId}
        bName={tie.teamBName}
      />
    </li>
  );
}

/**
 * What is still to be played.
 *
 * Two lists, because the feed knows two different amounts about them. Matches
 * already created carry a court, so they answer "what is on this court next".
 * Ties whose matches do not exist yet are only a pairing.
 *
 * Neither carries a time. The feed has no scheduling fields anywhere, so the
 * copy says "order of play" rather than implying a timetable we do not have.
 */
export function UpcomingSection({
  state,
  activeGroup,
  onGroupChange,
}: {
  state: UpcomingState;
  /** Shared with the standings and results sections. */
  activeGroup: string | null;
  onGroupChange: (group: string) => void;
}) {
  const { groups, isLoading, failed } = state;

  if (isLoading || groups.length === 0) return null;

  const groupNames = groups.map((g) => g.groupName).filter(Boolean);
  const activeName =
    activeGroup !== null && groupNames.includes(activeGroup)
      ? activeGroup
      : (groupNames[0] ?? "");
  const active = groups.find((g) => g.groupName === activeName) ?? groups[0];

  // Everything in this group has been played.
  if (active.nextMatches.length === 0 && active.ties.length === 0) return null;

  return (
    <Reveal delay={80}>
      <section className="mt-10 sm:mt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h2 className="inline-block text-[11px] font-black uppercase tracking-[0.22em] text-foreground">
            Still To Play
            <span className="mt-1.5 block h-0.5 w-8 rounded-full bg-gold" aria-hidden="true" />
          </h2>
          {/* Said plainly, because the feed carries no times and guessing one
              would be worse than admitting there is none. */}
          <span
            className="inline-flex items-center gap-1.5 text-[11px] text-foreground/40"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
            Order of play — start times are not published
          </span>
        </div>

        <div className="mt-4">
          <GroupSwitcher
            groups={groupNames}
            active={activeName}
            onChange={onGroupChange}
            label="Choose a group for upcoming matches"
          />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {active.nextMatches.length > 0 && (
            <div className="stat-card rounded-2xl p-4 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/45">
                Next on court
              </p>
              <ul className="mt-3 grid gap-2.5">
                {active.nextMatches.map((m) => (
                  <NextMatchCard key={m.matchId} match={m} />
                ))}
              </ul>
            </div>
          )}

          {active.ties.length > 0 && (
            <div className="stat-card rounded-2xl p-4 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/45">
                Later ties
              </p>
              <ul className="mt-3 grid gap-2.5">
                {active.ties.map((t) => (
                  <UpcomingTieCard key={`${t.tieId}-${t.teamAId}-${t.teamBId}`} tie={t} />
                ))}
              </ul>
            </div>
          )}
        </div>

        {failed && (
          <p
            className="mt-3 text-[11px] text-foreground/40"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            This list could not be refreshed just now. Showing the last loaded set.
          </p>
        )}
      </section>
    </Reveal>
  );
}
