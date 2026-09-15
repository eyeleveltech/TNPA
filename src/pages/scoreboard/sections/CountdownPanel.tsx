import { useEffect, useState } from "react";
import { CalendarDays, LayoutGrid, MapPin, Trophy } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import type { TournamentInfo } from "@/lib/live-scores";

/** Whole units remaining. Never negative — the caller switches page at zero. */
function remaining(target: Date, now: number) {
  const ms = Math.max(0, target.getTime() - now);
  const total = Math.floor(ms / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    isUp: ms <= 0,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="grid min-w-[4.25rem] place-items-center rounded-2xl px-3 py-4 sm:min-w-[5.5rem] sm:px-5 sm:py-5"
        style={{
          border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)",
          background:
            "linear-gradient(165deg, color-mix(in oklab, var(--gold) 9%, transparent), transparent)",
        }}
      >
        <span
          className="text-3xl font-black leading-none text-gold sm:text-5xl"
          style={{ fontFamily: "Arial, sans-serif", fontVariantNumeric: "tabular-nums" }}
        >
          {value}
        </span>
      </div>
      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/45 sm:text-[10px]">
        {label}
      </span>
    </div>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-gold">{label}</p>
        <p
          className="mt-1 text-[13px] leading-relaxed text-foreground/80"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/** "17 – 20 September 2026" from two ISO dates, collapsing the shared month. */
function formatDateRange(start: string | null, end: string | null): string | null {
  if (!start) return null;
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
  const s = new Date(`${start}T12:00:00`);
  if (Number.isNaN(s.getTime())) return null;
  if (!end) return s.toLocaleDateString("en-GB", opts);
  const e = new Date(`${end}T12:00:00`);
  if (Number.isNaN(e.getTime())) return s.toLocaleDateString("en-GB", opts);
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${s.getDate()} – ${e.toLocaleDateString("en-GB", opts)}`;
  }
  return `${s.toLocaleDateString("en-GB", opts)} – ${e.toLocaleDateString("en-GB", opts)}`;
}

/**
 * The page before play begins.
 *
 * Shown instead of an empty scoreboard, because a board with six "no match"
 * tiles two days out reads as broken rather than as early. Everything here
 * comes from the tournament record, so the organisers' own dates and venue
 * drive it and nothing can drift out of sync with their system.
 */
export function CountdownPanel({
  info,
  startsAt,
}: {
  info: TournamentInfo | null;
  startsAt: Date | null;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const left = startsAt ? remaining(startsAt, now) : null;
  const dateRange = formatDateRange(info?.startDate ?? null, info?.endDate ?? null);
  const venue = info?.placeName ?? null;
  const courts = info?.noOfCourts ?? null;

  return (
    <Reveal delay={60}>
      <div
        className="relative overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-12"
        style={{
          border: "1px solid var(--color-border)",
          background:
            "radial-gradient(85% 70% at 50% 0%, color-mix(in oklab, var(--gold) 8%, transparent), transparent 70%), color-mix(in oklab, var(--chalk) 3%, transparent)",
        }}
      >
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-[11px]">
            Live Scores Begin In
          </p>

          {left ? (
            <div className="mt-6 flex flex-wrap items-start justify-center gap-3 sm:mt-8 sm:gap-5">
              <Unit value={String(left.days)} label={left.days === 1 ? "Day" : "Days"} />
              <Unit value={pad(left.hours)} label="Hours" />
              <Unit value={pad(left.minutes)} label="Minutes" />
              <Unit value={pad(left.seconds)} label="Seconds" />
            </div>
          ) : (
            <p
              className="mt-6 text-[15px] text-foreground/70"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Scores appear here the moment the first match begins.
            </p>
          )}

          <p
            className="mx-auto mt-7 max-w-lg text-[13px] leading-relaxed text-foreground/60 sm:mt-9 sm:text-sm"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Every court, every score, updating on its own. Leave this page open and it
            will come to life as soon as play starts.
          </p>
        </div>

        {/* Facts, each shown only if the tournament record carries it. */}
        {(dateRange || venue || courts) && (
          <div className="mx-auto mt-9 grid max-w-2xl gap-6 border-t border-border pt-7 sm:grid-cols-3 sm:gap-8">
            {dateRange && <Fact icon={CalendarDays} label="Dates" value={dateRange} />}
            {venue && <Fact icon={MapPin} label="Venue" value={venue} />}
            {courts !== null && (
              <Fact
                icon={LayoutGrid}
                label="Courts"
                value={`${courts} running simultaneously`}
              />
            )}
          </div>
        )}
      </div>
    </Reveal>
  );
}

/**
 * Shown once the tournament is over.
 *
 * Deliberately plain: a countdown to nothing, or a live board that will never
 * update again, are both worse than saying play has finished.
 */
export function ConcludedPanel({ info }: { info: TournamentInfo | null }) {
  const dateRange = formatDateRange(info?.startDate ?? null, info?.endDate ?? null);
  return (
    <Reveal delay={60}>
      <div className="stat-card rounded-3xl px-6 py-14 text-center">
        <span
          className="mx-auto grid h-16 w-16 place-items-center rounded-full"
          style={{
            border: "1px solid color-mix(in oklab, var(--gold) 30%, transparent)",
            background:
              "radial-gradient(circle at 38% 32%, color-mix(in oklab, var(--gold) 16%, transparent), transparent)",
          }}
        >
          <Trophy className="h-7 w-7 text-gold" strokeWidth={1.4} aria-hidden="true" />
        </span>
        <h2 className="display-title-extended mt-5 text-2xl text-foreground sm:text-3xl">
          {info?.name ? `${info.name} Has Concluded` : "Play Has Concluded"}
        </h2>
        <p
          className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-foreground/60"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {dateRange
            ? `Thank you to everyone who followed the action, ${dateRange}.`
            : "Thank you to everyone who followed the action."}
        </p>
      </div>
    </Reveal>
  );
}
