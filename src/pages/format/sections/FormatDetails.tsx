import { Trophy, ShieldCheck, AlertTriangle, ArrowRight } from "lucide-react";

export const LEAGUE_MATCHES = [
  { num: 1, name: "Men's Singles", points: 2, menOpen: 1, women: null, men50: null },
  { num: 2, name: "Women's Doubles", points: 2, menOpen: null, women: 2, men50: null },
  { num: 3, name: "Men's Doubles", points: 2, menOpen: 2, women: null, men50: null },
  { num: 4, name: "Mixed Doubles", points: 2, menOpen: 1, women: 1, men50: null },
  { num: 5, name: "Men 50+ Doubles", points: 2, menOpen: null, women: null, men50: 2 },
  { num: 6, name: "Men's Doubles", points: 3, menOpen: 2, women: null, men50: null },
  { num: 7, name: "Super Doubles", points: 3, menOpen: 3, women: null, men50: 1 },
  { num: 8, name: "Super Singles", points: 3, menOpen: 3, women: 1, men50: 1 },
];

export const KO_MATCHES = [
  { num: 1, name: "Men's Singles", points: 2, menOpen: 1, women: null, men50: null },
  { num: 2, name: "Women's Doubles", points: 2, menOpen: null, women: 2, men50: null },
  { num: 3, name: "Men's Doubles", points: 1, menOpen: 2, women: null, men50: null },
  { num: 4, name: "Mixed Doubles", points: 2, menOpen: 1, women: 1, men50: null },
  { num: 5, name: "Men 50+ Doubles", points: 2, menOpen: null, women: 2, men50: null },
  { num: 6, name: "Men's Doubles", points: 3, menOpen: 2, women: null, men50: null },
  { num: 7, name: "Men's Doubles", points: 2, menOpen: 2, women: null, men50: null },
  { num: 8, name: "Men's Splits Age Double", points: 2, menOpen: 1, women: null, men50: 1 },
  { num: 9, name: "Super Singles", points: 3, menOpen: 3, women: 1, men50: 1 },
];

export const FAIR_PLAY_RULES = [
  { num: "01", rule: "No player plays more than 2 matches in a Tie." },
  { num: "02", rule: "Standard matches = 11 service points (win by 1). Super Singles & Super Doubles = 25 rally points (win by 1)." },
  { num: "03", rule: "All 6 unique players must feature across the 3 Men's Open Doubles matches." },
  { num: "04", rule: "1 Under-18 player (boy or girl) is mandatory in every squad." },
  { num: "05", rule: "Men's Singles player cannot play in Super Singles." },
  { num: "06", rule: "Men 50+ players cannot play any open category matches." },
  { num: "07", rule: "All 8 matches are played regardless of the overall score." },
];

export const SUPER_SINGLES_ORDER = [
  { order: 1, category: "Men Open", points: 5 },
  { order: 2, category: "Women", points: 5 },
  { order: 3, category: "Men Open", points: 5 },
  { order: 4, category: "Men 50+", points: 5 },
  { order: 5, category: "Men Open", points: 5 },
];

export const QF_BRACKETS = [
  { match: "QF 1", teamA: "1st Pool A", teamB: "4th Pool B" },
  { match: "QF 2", teamA: "3rd Pool A", teamB: "2nd Pool B" },
  { match: "QF 3", teamA: "2nd Pool A", teamB: "3rd Pool B" },
  { match: "QF 4", teamA: "4th Pool A", teamB: "1st Pool B" },
];

function Cell({ val }: { val: number | null }) {
  if (val === null) return <td className="border border-border/30 px-4 py-3 text-center text-foreground/30 text-sm">—</td>;
  return <td className="border border-border/30 px-4 py-3 text-center text-sm font-bold text-gold">{val}</td>;
}

function MatchTable({
  matches,
  totals,
}: {
  matches: typeof LEAGUE_MATCHES;
  totals: { points: number; menOpen: number; women: number; men50: number };
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-120 border-collapse text-left">
        <thead>
          <tr className="border-b border-gold/30">
            <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-gold/70">#</th>
            <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-gold/70">Match</th>
            <th className="px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-gold/70">Points</th>
            <th className="px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/50">Men &lt;50</th>
            <th className="px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/50">Women</th>
            <th className="px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/50">Men 50+</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((m) => (
            <tr key={m.num} className="border-b border-border/20 transition-colors hover:bg-card/40">
              <td className="px-4 py-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gold/15 text-[11px] font-black text-gold">
                  {m.num}
                </span>
              </td>
              <td className="px-4 py-3 text-sm font-semibold text-foreground">{m.name}</td>
              <td className="border border-border/30 px-4 py-3 text-center text-sm font-black text-gold">{m.points}</td>
              <Cell val={m.menOpen} />
              <Cell val={m.women} />
              <Cell val={m.men50} />
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-gold/40 bg-gold/5">
            <td colSpan={2} className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-gold">Total</td>
            <td className="px-4 py-3 text-center text-base font-black text-gold">{totals.points}</td>
            <td className="px-4 py-3 text-center text-base font-black text-gold">{totals.menOpen}</td>
            <td className="px-4 py-3 text-center text-base font-black text-gold">{totals.women}</td>
            <td className="px-4 py-3 text-center text-base font-black text-gold">{totals.men50}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export function FormatDetails() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-14 px-5 pb-20 sm:px-8 lg:px-10 xl:px-14">
      {/* ── Section 1: Overview ── */}
      <section className="border-t border-border pt-14">
        <h2 className="display-title text-[clamp(1.8rem,4vw,2.8rem)] text-foreground">
          Tournament <span className="text-gold-gradient">Overview</span>
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Pools */}
          <div className="stat-card col-span-full rounded-2xl p-6 sm:p-8 lg:col-span-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">Pool Structure</p>
            <h3 className="display-title mt-2 text-xl text-foreground">
              <span style={{ fontFamily: "Arial, sans-serif" }}>12</span> Teams <span style={{ fontFamily: "Arial, sans-serif" }}> — </span> <span style={{ fontFamily: "Arial, sans-serif" }}>2</span> Pools of <span style={{ fontFamily: "Arial, sans-serif" }}>6</span>
            </h3>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {["Pool A", "Pool B"].map((pool) => (
                <div
                  key={pool}
                  className="rounded-xl border border-gold/30 p-4 text-center"
                  style={{ background: "color-mix(in oklab, var(--gold) 5%, var(--card))" }}
                >
                  <p className="font-display text-lg text-gold">{pool}</p>
                  <p className="mt-1 text-[12px] text-foreground/60">6 Teams</p>
                  <p className="mt-3 flex items-center justify-center gap-1.5 flex-wrap">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <span
                        key={i}
                        className="inline-block h-6 w-6 rounded-sm"
                        style={{
                          background:
                            pool === "Pool A"
                              ? "color-mix(in oklab, var(--gold) 40%, var(--ink))"
                              : "color-mix(in oklab, var(--gold) 20%, var(--ink))",
                          border: "1px solid color-mix(in oklab, var(--gold) 50%, transparent)",
                        }}
                      />
                    ))}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[13px] text-foreground/55">
              Each team plays a <strong className="text-foreground/80">Tie</strong> against all 5
              other teams in its pool. Top 4 from each pool advance to the Quarter Finals.
            </p>
          </div>

          {/* Player Breakdown */}
          <div className="stat-card rounded-2xl p-6 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">168 Players</p>
            <h3 className="display-title mt-2 text-xl text-foreground">Player Breakdown</h3>
            <div className="mt-5 space-y-3">
              {[
                { cat: "Men's Open", count: 96, color: "190 85% 58%" },
                { cat: "Women", count: 36, color: "300 80% 62%" },
                { cat: "Men 50+", count: 36, color: "45 90% 58%" },
              ].map(({ cat, count, color }) => (
                <div key={cat} className="flex items-center justify-between">
                  <span className="text-[13px] text-foreground/70">{cat}</span>
                  <span
                    className="text-xl font-bold"
                    style={{ color: `hsl(${color})`, fontFamily: "Arial, sans-serif" }}
                  >
                    {count}
                  </span>
                </div>
              ))}
              <div className="mt-2 border-t border-border pt-3 flex items-center justify-between">
                <span className="text-[13px] font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-gold" style={{ fontFamily: "Arial, sans-serif" }}>168</span>
              </div>
            </div>
          </div>
        </div>

        {/* Squad composition */}
        <div className="stat-card mt-5 rounded-2xl p-6 sm:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">Per Team</p>
          <h3 className="display-title mt-2 text-xl text-foreground">
            Squad Composition <span style={{ fontFamily: "Arial, sans-serif" }}> — </span> <span style={{ fontFamily: "Arial, sans-serif" }}>14</span> Players
          </h3>
          <p className="mt-2 text-[13px] text-foreground/55">
            Each team is led by a Team Captain appointed by the Franchise Owner. All final
            decisions on team sheet rest with the Captain.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            {[
              { label: "Men's Open", count: 8, color: "190 85% 58%" },
              { label: "Women", count: 3, color: "300 80% 62%" },
              { label: "Men 50+", count: 3, color: "45 90% 58%" },
              { label: "Total", count: 14, color: "45 90% 58%", border: true },
            ].map(({ label, count, color, border }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl px-5 py-3"
                style={{
                  background: border
                    ? "transparent"
                    : `color-mix(in oklab, hsl(${color}) 12%, var(--card))`,
                  border: `1px solid color-mix(in oklab, hsl(${color}) ${border ? 55 : 25}%, transparent)`,
                }}
              >
                <span className="text-2xl font-bold" style={{ color: `hsl(${color})`, fontFamily: "Arial, sans-serif" }}>
                  {count}
                </span>
                <span className="text-[13px] text-foreground/70">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: League Stage ── */}
      <section className="border-t border-border pt-14">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-gold/50" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
            League Phase
          </span>
        </div>
        <h2 className="display-title mt-3 text-[clamp(1.8rem,4vw,2.8rem)] text-foreground">
          League Stage <span className="text-gold-gradient">Match Format</span>
        </h2>
        <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-foreground/60">
          A <strong className="text-foreground/80">Tie</strong> is the full set of matches played
          between 2 teams. Each team plays a Tie against all 5 other teams in its pool. Every Tie
          has 8 matches.
        </p>

        <div className="stat-card mt-8 rounded-2xl p-6 sm:p-8">
          <MatchTable
            matches={LEAGUE_MATCHES}
            totals={{ points: 19, menOpen: 12, women: 4, men50: 4 }}
          />
        </div>
      </section>

      {/* ── Section 3: Super Doubles + Super Singles ── */}
      <section className="border-t border-border pt-14">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-gold/50" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
            Match Types
          </span>
        </div>
        <h2 className="display-title mt-3 text-[clamp(1.8rem,4vw,2.8rem)] text-foreground">
          Super Doubles <span style={{ fontFamily: "Arial, sans-serif" }}>&amp;</span> <span className="text-gold-gradient">Super Singles</span>
        </h2>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {/* Super Doubles */}
          <div className="stat-card rounded-2xl p-6 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">Match 7</p>
            <h3 className="display-title mt-2 text-xl text-foreground">Super Doubles</h3>
            <p className="mt-3 text-[13px] leading-relaxed text-foreground/60">
              A combined match of Men's Open Doubles + Split Age Doubles (1 Men 50+ player + 1
              Men's Open player).
            </p>
            <div className="mt-5 space-y-3">
              {[
                { step: 1, text: "Men's Open Doubles pair plays the first 10 cumulative rally points." },
                { step: 2, text: "Split Age Doubles pair plays the next 10 cumulative rally points." },
                { step: 3, text: "Pairs alternate every 10 points until one team reaches 25 rally points (wins)." },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gold/20 text-[12px] font-black text-gold">
                    {step}
                  </span>
                  <p className="pt-0.5 text-[13px] leading-relaxed text-foreground/65">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3 rounded-lg border border-gold/30 px-4 py-3">
              <span className="text-2xl font-bold text-gold" style={{ fontFamily: "Arial, sans-serif" }}>25</span>
              <span className="text-[12px] text-foreground/60">Rally points to win</span>
            </div>
          </div>

          {/* Super Singles */}
          <div className="stat-card rounded-2xl p-6 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">Match 8</p>
            <h3 className="display-title mt-2 text-xl text-foreground">Super Singles</h3>
            <p className="mt-3 text-[13px] leading-relaxed text-foreground/60">
              3 unique Men's Open players + 1 Women's Open player + 1 Men 50+ player per team.
              Players rotate every 5 cumulative points:
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-gold/20">
                    <th className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold/60">Order</th>
                    <th className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold/60">Category</th>
                    <th className="px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gold/60">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {SUPER_SINGLES_ORDER.map((s) => (
                    <tr key={s.order} className="border-b border-border/20">
                      <td className="px-3 py-2.5">
                        <span className="flex h-5 w-5 items-center justify-center rounded bg-gold/15 text-[10px] font-black text-gold">
                          {s.order}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-[13px] text-foreground/80">{s.category}</td>
                      <td className="px-3 py-2.5 text-center text-sm font-bold text-gold">{s.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 space-y-2">
              <p className="flex items-start gap-2 text-[12px] text-foreground/55">
                <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                Match continues until one team reaches 25 rally points.
              </p>
              <p className="flex items-start gap-2 text-[12px] text-foreground/55">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                If a team reaches 25 before a 5-point rotation completes, the match ends immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Fair Play Rules ── */}
      <section className="border-t border-border pt-14">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-gold/50" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
            Rules
          </span>
        </div>
        <h2 className="display-title mt-3 text-[clamp(1.8rem,4vw,2.8rem)] text-foreground">
          Fair Play <span style={{ fontFamily: "Arial, sans-serif" }}>&amp;</span> <span className="text-gold-gradient">Equal Opportunity</span>
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FAIR_PLAY_RULES.map(({ num, rule }) => (
            <div key={num} className="stat-card flex items-start gap-4 rounded-xl p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/20 text-[12px] font-black text-gold">
                {num}
              </span>
              <p className="text-[13px] leading-relaxed text-foreground/70">{rule}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 5: Knockout Stage ── */}
      <section className="border-t border-border pt-14">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-gold/50" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
            Knockout Phase
          </span>
        </div>
        <h2 className="display-title mt-3 text-[clamp(1.8rem,4vw,2.8rem)] text-foreground">
          Knock<span style={{ fontFamily: "Arial, sans-serif" }}>-</span>Out Stage <span className="text-gold-gradient">Match Format</span>
        </h2>
        <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-foreground/60">
          From the Quarter Finals onward, each Tie has 9 matches. If a team reaches{" "}
          <strong className="text-gold">10 match points</strong> first, the Tie ends early and
          remaining matches are not played.
        </p>

        <div className="stat-card mt-8 rounded-2xl p-6 sm:p-8">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold/60">
            Every Tie <span style={{ fontFamily: "Arial, sans-serif" }}>&mdash;</span> Nine Battles <span style={{ fontFamily: "Arial, sans-serif" }}>&mdash;</span> One Winner
          </p>
          <MatchTable
            matches={KO_MATCHES}
            totals={{ points: 19, menOpen: 12, women: 4, men50: 4 }}
          />
        </div>
      </section>

      {/* ── Section 6: Road to the Title ── */}
      <section className="border-t border-border pt-14">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-gold/50" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
            Bracket
          </span>
        </div>
        <h2 className="display-title mt-3 text-[clamp(1.8rem,4vw,2.8rem)] text-foreground">
          The Road to <span className="text-gold-gradient">the Title</span>
        </h2>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_2fr]">
          {/* Qualification */}
          <div className="stat-card rounded-2xl p-6 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
              Qualification
            </p>
            <h3 className="display-title mt-2 text-xl text-foreground">
              Top 4 Per Pool
            </h3>
            <p className="mt-3 text-[13px] text-foreground/55">
              Ranked by:
            </p>
            <div className="mt-4 space-y-2.5">
              {[
                { rank: "1", label: "Match Points" },
                { rank: "2", label: "Tie Wins" },
                { rank: "3", label: "Head to Head" },
                { rank: "4", label: "Score Difference" },
              ].map(({ rank, label }) => (
                <div key={rank} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-[11px] font-black text-gold">
                    {rank}
                  </span>
                  <span className="text-[13px] text-foreground/75">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bracket */}
          <div className="stat-card rounded-2xl p-6 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
              Quarter Finals
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {QF_BRACKETS.map(({ match, teamA, teamB }) => (
                <div
                  key={match}
                  className="rounded-xl border border-border/40 p-4"
                  style={{ background: "color-mix(in oklab, var(--gold) 4%, var(--card))" }}
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-gold/70">
                    {match}
                  </p>
                  <p className="mt-2 text-[13px] font-semibold text-foreground">{teamA}</p>
                  <p className="my-1 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/40">
                    vs
                  </p>
                  <p className="text-[13px] font-semibold text-foreground">{teamB}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { stage: "Semi Finals", desc: "QF winners advance — 2 Ties" },
                { stage: "Grand Final", desc: "SF winners meet for the title" },
                { stage: "3rd Place Playoff", desc: "Losing semi-finalists compete" },
              ].map(({ stage, desc }) => (
                <div
                  key={stage}
                  className="rounded-xl border border-gold/30 p-4 text-center"
                  style={{ background: "color-mix(in oklab, var(--gold) 6%, var(--card))" }}
                >
                  <p className="text-sm font-bold text-gold" style={{ fontFamily: "Arial, sans-serif" }}>{stage}</p>
                  <p className="mt-1 text-[11px] text-foreground/50">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-4 border-t border-border pt-4">
              <p className="flex items-center gap-2 text-[12px] text-foreground/55">
                <ShieldCheck className="h-4 w-4 text-gold" />
                Standard matches: 11 service points (win by 1)
              </p>
              <p className="flex items-center gap-2 text-[12px] text-foreground/55">
                <Trophy className="h-4 w-4 text-gold" />
                Super Singles: 25 rally points (win by 1)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
