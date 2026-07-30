import { useEffect, useRef, useState } from "react";
import {
  Gavel,
  Users2,
  Trophy,
  Star,
  Clock,
  CalendarDays,
  MapPin,
  LayoutGrid,
  ChevronRight,
  Tv2,
  Eye,
} from "lucide-react";

const DAYS = [
  {
    day: "01",
    date: "17 SEP",
    weekday: "THU",
    title: "Opening Day",
    subtitle: "The Journey Begins",
    copy: "The league kicks off. Franchises take the court for the first time in front of their fans.",
    time: "10:00 AM Onwards",
    icon: Gavel,
    accent: "45 90% 58%",
  },
  {
    day: "02",
    date: "18 SEP",
    weekday: "FRI",
    title: "Group Stage",
    subtitle: "The Battle Begins",
    copy: "Round robin matches as teams compete for crucial points to secure a spot in playoffs.",
    time: "10:00 AM Onwards",
    icon: Users2,
    accent: "190 85% 58%",
  },
  {
    day: "03",
    date: "19 SEP",
    weekday: "SAT",
    title: "Playoffs",
    subtitle: "No Room For Error",
    copy: "Quarterfinals and semifinals as the best teams fight for a place in the final.",
    time: "10:00 AM Onwards",
    icon: Trophy,
    accent: "300 80% 62%",
  },
  {
    day: "04",
    date: "20 SEP",
    weekday: "SUN",
    title: "The Finals",
    subtitle: "One Game. One Champion.",
    copy: "The ultimate showdown. One champion will rise and take the glory home.",
    time: "4:00 PM Onwards",
    icon: Star,
    accent: "45 90% 58%",
  },
];

const BOTTOM_STATS = [
  { value: "~1,000+", label: "Spectators", sub: "Expected", icon: Eye },
  { value: "6", label: "Courts", sub: "Running Simultaneously", icon: LayoutGrid },
  { value: "Champions", label: "Title on the Line", sub: "TNPPL Season 2 Trophy", icon: Trophy },
  { value: "Live", label: "Live Action", sub: "Streaming & Coverage", icon: Tv2 },
];

export function Schedule() {
  const [statsInView, setStatsInView] = useState(false);
  const bottomStatsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
        } else {
          setStatsInView(false);
        }
      },
      { threshold: 0.2 }
    );

    if (bottomStatsRef.current) {
      observer.observe(bottomStatsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="schedule" className="relative overflow-x-clip bg-ink py-10 sm:py-12 lg:py-14">
      {/* ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(65% 50% at 60% 0%, color-mix(in oklab, var(--gold) 9%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(to bottom right, black, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
        <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[360px_minmax(0,1fr)]">
          {/* ── Venue sidebar ── */}
          <div className="lg:sticky lg:top-28 lg:self-start z-10">
            <div className="stat-card overflow-hidden rounded-2xl">
              {/* venue photo */}
              <div
                className="relative h-52 w-full overflow-hidden"
                style={{
                  background:
                    "linear-gradient(165deg, color-mix(in oklab, var(--gold) 14%, var(--ink)), var(--ink))",
                }}
              >
                {/* fallback court SVG — hidden once image loads */}
                <svg
                  aria-hidden
                  className="absolute inset-0 h-full w-full opacity-10"
                  viewBox="0 0 400 200"
                  fill="none"
                >
                  <rect x="40" y="60" width="320" height="100" rx="4" stroke="var(--gold)" strokeWidth="1.5" />
                  <rect x="160" y="60" width="80" height="100" stroke="var(--gold)" strokeWidth="1.5" />
                  <line x1="200" y1="60" x2="200" y2="160" stroke="var(--gold)" strokeWidth="1" />
                  <line x1="40" y1="110" x2="360" y2="110" stroke="var(--gold)" strokeWidth="1" />
                  <circle cx="200" cy="110" r="30" stroke="var(--gold)" strokeWidth="1.5" />
                  <circle cx="200" cy="110" r="5" fill="var(--gold)" opacity="0.5" />
                </svg>
                <img
                  src="/images/venue-express-avenue.jpg"
                  alt="Express Avenue Atrium — TNPPL Season 2 venue"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute bottom-4 left-4 z-10">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold">Venue</p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="display-title-extended text-2xl text-foreground">Express Avenue Atrium</h3>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/60">
                  Royapettah, Chennai
                </p>

                <div className="mt-6 space-y-4 border-t border-border pt-6">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-gold">Dates</p>
                      <p className="mt-0.5 text-[13px] font-medium text-foreground/85">
                        17 – 20 September, 2026
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-gold">Duration</p>
                      <p className="mt-0.5 text-[13px] font-medium text-foreground/85">4 Days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-gold">Venue</p>
                      <p className="mt-0.5 text-[13px] font-medium text-foreground/85">
                        Express Avenue Atrium
                        <br />
                        Royapettah, Chennai
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <LayoutGrid className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-gold">Format</p>
                      <p className="mt-0.5 text-[13px] font-medium text-foreground/85">
                        Team Ties · 30 League Matches
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Timeline ── */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold/50 sm:w-16" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
                Tournament Schedule
              </span>
              <span className="h-px w-10 bg-gold/50 sm:w-16" />
            </div>

            <h2 className="display-title-extended mt-4 text-[clamp(2.4rem,6vw,4rem)]">
              <span className="block text-foreground">Mark Your</span>
              <span className="text-gold-gradient block">Calendar</span>
            </h2>

            <p
              className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-[15px]"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Four days of non-stop action, intense rivalries, and championship moments. Here's how
              Season 2 unfolds.
            </p>

            <div
              className="mt-4 flex items-center gap-3"
              aria-hidden
            >
              <span className="h-px w-16 bg-gold/40" />
              <span className="text-xs text-gold animate-star-pickleball">★</span>
            </div>

            <div className="mt-8 space-y-3">
              {DAYS.map((d, i) => {
                const Icon = d.icon;
                return (
                  <div
                    key={d.day}
                    className="stat-card grid grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-4 rounded-2xl px-5 py-5 sm:grid-cols-[auto_auto_minmax(0,1fr)_auto] sm:gap-6 sm:px-6"
                    style={
                      i === DAYS.length - 1
                        ? { borderColor: "color-mix(in oklab, var(--gold) 50%, transparent)" }
                        : {}
                    }
                  >
                    {/* day number */}
                    <div className="text-center">
                      <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-gold">Day</p>
                      <p className="font-display text-4xl leading-none text-foreground">{d.day}</p>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/55">
                        {d.date}
                        <br />
                        {d.weekday}
                      </p>
                    </div>

                    {/* timeline dot */}
                    <div className="flex flex-col items-center self-stretch">
                      <div className="h-full w-px bg-border" />
                      <div
                        className="my-1 h-3 w-3 shrink-0 rounded-full"
                        style={{ background: `hsl(${d.accent})` }}
                      />
                      <div className="h-full w-px bg-border" />
                    </div>

                    {/* icon + title */}
                    <div className="flex items-start gap-4">
                      {/* luxury icon frame */}
                      <span className="relative hidden h-14 w-14 shrink-0 place-items-center sm:grid">
                        <span
                          className="absolute inset-0 rounded-xl"
                          style={{ border: `1px solid color-mix(in oklab, hsl(${d.accent}) 22%, transparent)` }}
                        />
                        <span
                          className="absolute inset-1.25 rounded-lg"
                          style={{
                            background: `radial-gradient(circle at 38% 32%, color-mix(in oklab, hsl(${d.accent}) 28%, transparent), color-mix(in oklab, hsl(${d.accent}) 8%, transparent))`,
                            border: `1px solid color-mix(in oklab, hsl(${d.accent}) 40%, transparent)`,
                          }}
                        />
                        <Icon
                          className="relative h-6 w-6"
                          style={{
                            color: `hsl(${d.accent})`,
                            filter: `drop-shadow(0 0 5px color-mix(in oklab, hsl(${d.accent}) 50%, transparent))`,
                          }}
                          strokeWidth={1.4}
                        />
                      </span>
                      <div className="min-w-0">
                        <h3 className="display-title-extended text-xl text-foreground sm:text-2xl">
                          {d.title}
                        </h3>
                        <p
                          className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.2em]"
                          style={{ color: `hsl(${d.accent})` }}
                        >
                          {d.subtitle}
                        </p>
                        <p className="mt-2 text-[12px] leading-relaxed text-foreground/80 sm:text-[13px]" style={{ fontFamily: "Arial, sans-serif" }}>
                          {d.copy}
                        </p>
                      </div>
                    </div>

                    {/* time */}
                    <div className="hidden flex-col items-end gap-1 sm:flex">
                      <Clock className="h-4 w-4 text-gold" />
                      <p className="text-right text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/65">
                        {d.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom stats strip ── */}
        <div ref={bottomStatsRef} className="stat-card mt-14 grid grid-cols-2 gap-6 rounded-2xl px-6 py-7 sm:px-10 lg:mt-16 lg:grid-cols-4">
          {BOTTOM_STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`flex min-w-0 flex-col items-center gap-3 text-center ${
                  i > 0 ? "lg:border-l lg:border-border" : ""
                }`}
              >
                {/* luxury ring icon */}
                <span
                  className={`relative grid h-14 w-14 place-items-center rounded-full ${
                    statsInView ? "animate-icon-intro" : ""
                  }`}
                  style={{ animationDelay: statsInView ? `${80 + i * 110}ms` : "0ms" }}
                >
                  <span className="absolute inset-0 rounded-full" style={{ border: "1px solid color-mix(in oklab, var(--gold) 22%, transparent)" }} />
                  <span className="absolute inset-1.25 rounded-full" style={{
                    background: "radial-gradient(circle at 38% 32%, color-mix(in oklab, var(--gold) 20%, transparent), color-mix(in oklab, var(--gold) 5%, transparent))",
                    border: "1px solid color-mix(in oklab, var(--gold) 45%, transparent)",
                  }} />
                  <Icon className="relative h-6 w-6 text-gold" strokeWidth={1.4} aria-hidden />
                </span>
                <p className="font-display text-2xl text-gold sm:text-3xl">{s.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/85">
                  {s.label}
                </p>
                <p className="text-[11px] text-foreground/55">{s.sub}</p>
              </div>
            );
          })}
        </div>

        {/* CTA strip */}
        <div className="mt-10 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/55">
            Entry is Free
          </p>
          <p className="mt-2 text-sm text-foreground/70">
            Open to all. Come support your district franchise.
          </p>
          <a
            href="#contact"
            className="btn-gold mt-5 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.12em]"
          >
            Plan Your Visit
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
