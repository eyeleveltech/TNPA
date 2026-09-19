import { LayoutGrid } from "lucide-react";
import {
  initialsOf,
  resolveFranchise,
  type GroupUpcoming,
  type UpcomingMatch,
  type UpcomingTie,
} from "@/lib/live-scores";

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
    <div className="mt-2.5 flex min-w-0 items-center gap-2.5">
      <Crest id={aId} name={aName} />
      <span className="min-w-0 flex-1 text-[12px] font-bold uppercase leading-tight tracking-[0.04em] text-foreground/80 sm:truncate">
        {display(aId, aName)}
      </span>
      <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/30">
        v
      </span>
      <span className="min-w-0 flex-1 text-right text-[12px] font-bold uppercase leading-tight tracking-[0.04em] text-foreground/80 sm:truncate">
        {display(bId, bName)}
      </span>
      <Crest id={bId} name={bName} />
    </div>
  );
}

function NextMatchCard({ match }: { match: UpcomingMatch }) {
  return (
    <li
      className="min-w-0 rounded-xl px-4 py-3.5"
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
      className="min-w-0 rounded-xl px-4 py-3.5"
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
 * The two upcoming lists for one group.
 *
 * Header, group switcher and view toggle live in MatchesSection, which owns
 * the shared chrome; this renders only the content.
 *
 * Two lists because the feed knows two different amounts. Matches already
 * created carry a court, so they answer "what is on this court next". Ties
 * whose matches do not exist yet are only a pairing.
 */
export function UpcomingBody({ group }: { group: GroupUpcoming }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {group.nextMatches.length > 0 && (
        <div className="stat-card rounded-2xl p-4 sm:p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/45">
            Next on court
          </p>
          <ul className="mt-3 grid gap-2.5">
            {group.nextMatches.map((m) => (
              <NextMatchCard key={m.matchId} match={m} />
            ))}
          </ul>
        </div>
      )}

      {group.ties.length > 0 && (
        <div className="stat-card rounded-2xl p-4 sm:p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/45">
            Later ties
          </p>
          <ul className="mt-3 grid gap-2.5">
            {group.ties.map((t) => (
              <UpcomingTieCard key={`${t.tieId}-${t.teamAId}-${t.teamBId}`} tie={t} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
