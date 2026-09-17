import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import {
  initialsOf,
  resolveFranchise,
  type MatchResult,
  type TieResult,
} from "@/lib/live-scores";
import type { ResultsState } from "@/hooks/useResults";

const GOLD_ACCENT = "45 90% 58%";

/** Small crest, matching the live card's treatment at a smaller size. */
function Crest({ id, name, size }: { id: number | null; name: string; size: "sm" | "md" }) {
  const brand = resolveFranchise(id, name);
  const logo = brand?.logo ?? null;
  const accent = brand?.accent ?? GOLD_ACCENT;
  const box = size === "md" ? "h-10 w-10 rounded-xl" : "h-7 w-7 rounded-lg";

  return (
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden ${box}`}
      style={{
        border: `1px solid color-mix(in oklab, hsl(${accent}) 40%, transparent)`,
        background: `color-mix(in oklab, hsl(${accent}) 10%, transparent)`,
      }}
    >
      {logo ? (
        <img src={logo} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain p-0.5" />
      ) : (
        <span
          className={size === "md" ? "text-[10px] font-black" : "text-[8px] font-black"}
          style={{ color: `hsl(${accent})` }}
        >
          {initialsOf(name)}
        </span>
      )}
    </span>
  );
}

/** Our spelling of a franchise, falling back to whatever the feed sent. */
const display = (id: number | null, name: string) =>
  resolveFranchise(id, name)?.name ?? name;

/* ─────────────────────────────────────────────
   ONE FINISHED MATCH
───────────────────────────────────────────── */

function ResultRow({ match }: { match: MatchResult }) {
  const aWon = match.teamAScore > match.teamBScore;
  const bWon = match.teamBScore > match.teamAScore;

  const side = (
    won: boolean,
    id: number | null,
    name: string,
    score: number,
    players: string[],
  ) => (
    <div className="flex items-start gap-2.5">
      <Crest id={id} name={name} size="sm" />
      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-[12px] font-bold uppercase leading-tight tracking-[0.06em] ${
            won ? "text-foreground" : "text-foreground/55"
          }`}
        >
          {display(id, name)}
        </p>
        {players.length > 0 && (
          <p
            className="mt-0.5 truncate text-[11px] text-foreground/45"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {players.join(", ")}
          </p>
        )}
      </div>
      <span className="flex shrink-0 items-center gap-1.5">
        {won && <Check className="h-3.5 w-3.5 text-gold" strokeWidth={3} aria-label="Winner" />}
        <span
          className={`text-lg font-black leading-none ${won ? "text-gold" : "text-foreground/55"}`}
          style={{ fontFamily: "Arial, sans-serif", fontVariantNumeric: "tabular-nums" }}
        >
          {score}
        </span>
      </span>
    </div>
  );

  return (
    <li
      className="rounded-xl px-3.5 py-3"
      style={{
        border: "1px solid var(--color-border)",
        background: "color-mix(in oklab, var(--chalk) 2%, transparent)",
      }}
    >
      <div className="mb-2.5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/40">
        <span className="text-gold/70">M{match.matchNo}</span>
        <span>{match.isDoubles ? "Doubles" : "Singles"}</span>
        {match.courtId !== null && (
          <>
            <span aria-hidden="true">·</span>
            <span>Court {match.courtId}</span>
          </>
        )}
      </div>
      <div className="space-y-2">
        {side(aWon, match.teamAId, match.teamAName, match.teamAScore, match.playersA)}
        {side(bWon, match.teamBId, match.teamBName, match.teamBScore, match.playersB)}
      </div>
    </li>
  );
}

/* ─────────────────────────────────────────────
   ONE TIE
───────────────────────────────────────────── */

function TieCard({ tie, defaultOpen }: { tie: TieResult; defaultOpen: boolean }) {
  /* Collapsed by default beyond the first: a full day's results is a long
     page, and most people want the latest tie, not all of them at once. */
  const [open, setOpen] = useState(defaultOpen);
  const aLeads = tie.winsA > tie.winsB;
  const bLeads = tie.winsB > tie.winsA;
  const panelId = `tie-${tie.tieId}-matches`;

  return (
    <div className="stat-card overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-gold/5 sm:gap-4 sm:p-5"
      >
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-gold">
            {[tie.groupName, tie.tieName].filter(Boolean).join("  ·  ")}
          </p>

          <div className="mt-2.5 flex items-center gap-2.5 sm:gap-3">
            <Crest id={tie.teamAId} name={tie.teamAName} size="md" />
            <span
              className={`min-w-0 flex-1 truncate text-[12px] font-bold uppercase tracking-[0.04em] sm:text-[13px] ${
                aLeads ? "text-foreground" : "text-foreground/60"
              }`}
            >
              {display(tie.teamAId, tie.teamAName)}
            </span>

            <span
              className="shrink-0 text-base font-black text-foreground sm:text-lg"
              style={{ fontFamily: "Arial, sans-serif", fontVariantNumeric: "tabular-nums" }}
            >
              <span className={aLeads ? "text-gold" : undefined}>{tie.winsA}</span>
              <span className="mx-1.5 text-foreground/30">–</span>
              <span className={bLeads ? "text-gold" : undefined}>{tie.winsB}</span>
            </span>

            <span
              className={`min-w-0 flex-1 truncate text-right text-[12px] font-bold uppercase tracking-[0.04em] sm:text-[13px] ${
                bLeads ? "text-foreground" : "text-foreground/60"
              }`}
            >
              {display(tie.teamBId, tie.teamBName)}
            </span>
            <Crest id={tie.teamBId} name={tie.teamBName} size="md" />
          </div>
        </div>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-foreground/40 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <div id={panelId} hidden={!open} className="border-t border-border p-4 sm:p-5">
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {tie.matches.map((m) => (
            <ResultRow key={m.matchId} match={m} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION
───────────────────────────────────────────── */

export function ResultsSection({ state }: { state: ResultsState }) {
  const { ties, isLoading, failed } = state;

  // Nothing to say until something has finished. No skeleton, no empty box —
  // the section simply does not exist yet.
  if (isLoading || ties.length === 0) return null;

  const matchCount = ties.reduce((n, t) => n + t.matches.length, 0);

  return (
    <Reveal delay={80}>
      <section className="mt-10 sm:mt-12">
        <div className="flex items-baseline gap-3">
          <h2 className="inline-block text-[11px] font-black uppercase tracking-[0.22em] text-foreground">
            Results
            <span className="mt-1.5 block h-0.5 w-8 rounded-full bg-gold" aria-hidden="true" />
          </h2>
          <span
            className="text-[11px] text-foreground/40"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {matchCount} match{matchCount === 1 ? "" : "es"} completed
          </span>
        </div>

        <div className="mt-4 grid gap-3">
          {ties.map((tie, i) => (
            <TieCard key={`${tie.tieId}-${tie.teamAId}-${tie.teamBId}`} tie={tie} defaultOpen={i === 0} />
          ))}
        </div>

        {failed && (
          <p
            className="mt-3 text-[11px] text-foreground/40"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Results could not be refreshed just now. Showing the last loaded set.
          </p>
        )}
      </section>
    </Reveal>
  );
}
