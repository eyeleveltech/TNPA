import { ChevronRight, Medal, Users2, Star, Trophy, Instagram } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import SEASON_1_WINNERS from "@/assets/season_1_winners.webp";

const SQUAD_STATS = [
  {
    value: "168",
    label: "Players",
    copy: "Elite athletes from across Tamil Nadu selected for Season 2.",
    icon: Users2,
  },
  {
    value: "14",
    label: "Per Squad",
    copy: "Each franchise builds a 14-player squad at the Grand Player Auction.",
    icon: Medal,
  },
  {
    value: "30",
    label: "League Ties",
    copy: "Round-robin league followed by Quarterfinals, Semifinals and the Final.",
    icon: Star,
  },
  {
    value: "₹30L",
    label: "Prize Pool",
    copy: "Total prize money on the line across TNPPL Season 2.",
    icon: Trophy,
  },
];

const COMPOSITION = [
  { role: "Men", count: 8, accent: "190 90% 60%" },
  { role: "Women", count: 3, accent: "325 85% 62%" },
  { role: "Masters", count: 3, accent: "45 90% 58%" },
];

export function Players() {
  return (
    <section id="players" className="relative overflow-hidden bg-background py-10 sm:py-12 lg:py-14">
      {/* ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(70% 55% at 80% 30%, color-mix(in oklab, var(--gold) 8%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "linear-gradient(to bottom, black, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
        {/* ── Squad format + stats ── */}
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">

          {/* Left: squad format feature card */}
          <div
            className="stat-card relative min-h-120 overflow-hidden rounded-2xl"
            style={{
              background: "linear-gradient(145deg, color-mix(in oklab, var(--gold) 10%, var(--ink)) 0%, var(--ink) 55%)",
            }}
          >
            {/* paint stroke decoration */}
            <svg
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 h-[55%] w-[32%] opacity-15"
              viewBox="0 0 200 400"
              fill="none"
            >
              <path d="M150 0 L200 40 L120 210 L165 250 L90 400 L140 230 L100 195 Z" fill="var(--gold)" />
            </svg>

            {/* left-side gradient for legibility */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, var(--ink) 40%, color-mix(in oklab, var(--ink) 60%, transparent) 65%, transparent 80%)",
              }}
            />

            <div className="relative z-10 flex h-full flex-col p-2 sm:p-8">
              <div>
                <div className="mb-2.5 sm:mb-5 overflow-hidden rounded-xl border border-gold/30 shadow-lg">
                  <img
                    src={SEASON_1_WINNERS}
                    alt="TNPPL Season 1 Champions"
                    className="h-48 sm:h-52 w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    loading="eager"
                  />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-gold">
                  Season 2 Squad Format
                </p>
                <h2 className="display-title-extended mt-3 text-4xl leading-none sm:text-5xl">
                  <span className="block font-black text-foreground" style={{ fontFamily: "Arial, sans-serif" }}>168</span>
                  <span className="text-gold-gradient block">Elite Athletes</span>
                </h2>

                <p
                  className="mt-4 max-w-sm text-[13px] leading-relaxed text-foreground/70"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  Each of the 12 district franchises builds a 14-player squad at the Grand Player Auction.
                  Squad compositions are determined on auction day.
                </p>

                {/* squad composition bars */}
                <div className="mt-8 space-y-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-foreground/50">
                    Squad Composition (per franchise)
                  </p>
                  {COMPOSITION.map((c) => (
                    <div key={c.role} className="flex items-center gap-4">
                      <p className="w-16 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/60">
                        {c.role}
                        {c.role === "Masters" && (
                          <span className="ml-0.5 text-[8px] text-foreground/40"> 50+</span>
                        )}
                      </p>
                      <div className="flex flex-1 items-center gap-2">
                        <div className="flex gap-1">
                          {Array.from({ length: c.count }).map((_, i) => (
                            <span
                              key={i}
                              className="block h-4 w-4 rounded-sm"
                              style={{ background: `hsl(${c.accent})`, opacity: 0.85 }}
                            />
                          ))}
                        </div>
                        <p className="font-display text-xl font-black leading-none" style={{ color: `hsl(${c.accent})` }}>
                          {c.count}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="mt-2 flex items-center gap-2 border-t border-foreground/10 pt-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50">Total per squad</span>
                    <span className="font-display text-2xl font-black text-gold">14</span>
                  </div>
                </div>
              </div>

              {/* equal space above */}
              <div className="flex-1 min-h-6" />

              {/* announcement banner */}
              <div
                className="rounded-xl border px-5 py-4 shrink-0"
                style={{
                  borderColor: "color-mix(in oklab, var(--gold) 40%, transparent)",
                  background: "color-mix(in oklab, var(--gold) 6%, transparent)",
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-gold">
                  Squad Announcement
                </p>
                <p
                  className="mt-1.5 text-[13px] leading-relaxed text-foreground/80"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  Player squads will be revealed at the Grand Player Auction at ITC Grand Chola,
                  Chennai. Follow{" "}
                  <a
                    href="https://www.instagram.com/tamilnadupickleball.assn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold underline underline-offset-2"
                  >
                    @tamilnadupickleball.assn
                  </a>{" "}
                  for live updates.
                </p>
              </div>

              {/* equal space below */}
              <div className="flex-1 min-h-6" />
            </div>
          </div>

          {/* Right: heading + stat grid */}
          <div className="flex flex-col justify-center">
            <Reveal delay={60}>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold/50 sm:w-16" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
                  The Players
                </span>
                <span className="h-px w-10 bg-gold/50 sm:w-16" />
              </div>
            </Reveal>

            <Reveal delay={140}>
              <h2 className="display-title-extended mt-4 text-[clamp(2.4rem,6.5vw,4.2rem)]">
                <span className="block text-foreground">The Heart of</span>
                <span className="text-gold-gradient block">TNPPL</span>
              </h2>
            </Reveal>

            <Reveal delay={220}>
              <p
                className="mt-5 max-w-md text-sm leading-relaxed text-foreground/80 sm:text-[15px]"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                From district champions to national-level talent, 168 pickleball players will
                represent Tamil Nadu's finest. Different districts. One goal.
              </p>
            </Reveal>

            <div className="mt-3 flex items-center gap-3" aria-hidden>
              <span className="h-px w-20 bg-gold/40" />
              <span className="text-gold text-xs animate-star-pickleball">★</span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {SQUAD_STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="stat-card rounded-xl p-5">
                    {/* luxury icon ring */}
                    <span className="relative mb-4 grid h-14 w-14 place-items-center">
                      <span className="absolute inset-0 rounded-full" style={{ border: "1px solid color-mix(in oklab, var(--gold) 20%, transparent)" }} />
                      <span className="absolute inset-1.25 rounded-full" style={{
                        background: "radial-gradient(circle at 38% 32%, color-mix(in oklab, var(--gold) 22%, transparent), color-mix(in oklab, var(--gold) 5%, transparent))",
                        border: "1px solid color-mix(in oklab, var(--gold) 45%, transparent)",
                      }} />
                      <Icon className="relative h-5 w-5 text-gold" strokeWidth={1.4} aria-hidden />
                    </span>
                    <p className="font-display text-3xl font-black leading-none text-gold">{s.value}</p>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/80">
                      {s.label}
                    </p>
                    <p className="mt-2 text-[12px] leading-relaxed text-foreground/55">{s.copy}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Format breakdown strip ── */}
        <div className="stat-card mt-12 grid gap-6 rounded-2xl px-6 py-7 sm:px-10 lg:mt-16 lg:grid-cols-3">
          <div className="flex flex-col items-center gap-2 text-center lg:border-r lg:border-border">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-foreground/50">League Stage</p>
            <p className="font-display text-4xl font-black text-gold">30</p>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/80">League Ties</p>
            <p className="text-[12px] text-foreground/55">Round-robin format across 12 franchises</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center lg:border-r lg:border-border">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-foreground/50">Knockout</p>
            <p className="font-display text-4xl font-black text-gold">QF → SF</p>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/80">Playoffs</p>
            <p className="text-[12px] text-foreground/55">Quarterfinals and Semifinals on Day 3</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-foreground/50">Day 4</p>
            <p className="font-display text-4xl font-black text-gold">Final</p>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/80">Championship</p>
            <p className="text-[12px] text-foreground/55">One champion. ₹30L prize pool on the line.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://www.instagram.com/tamilnadupickleball.assn"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-light inline-flex items-center justify-center gap-2 sm:gap-3 rounded-full px-3.5 py-3 sm:px-8 sm:py-3.5 text-[10px] sm:text-sm font-bold uppercase tracking-wider sm:tracking-[0.16em] leading-none whitespace-nowrap max-w-full"
          >
            <Instagram className="h-4 w-4 text-white shrink-0" />
            <span className="leading-none">Follow for Player Updates</span>
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
}
