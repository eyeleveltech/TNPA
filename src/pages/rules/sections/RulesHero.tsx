import { Reveal } from "@/components/Reveal";

export function RulesHero() {
  return (
    <div className="relative">
      <section
        className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20"
        style={{
          background:
            "radial-gradient(80% 60% at 40% 0%, color-mix(in oklab, var(--gold) 7%, transparent), transparent 60%), var(--ink)",
        }}
      >
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <Reveal delay={60}>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold/50" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
                Official
              </span>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <h1 className="display-title mt-4 text-[clamp(2.6rem,7vw,4.8rem)] text-foreground">
              Rules <span style={{ fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>&amp;</span>{" "}
              <span className="text-gold-gradient">Regulations</span>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-foreground/65">
              The official rules governing TNPPL Season 2. All participants — players, franchise staff, and officials — are bound by these regulations.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-3 text-[13px] text-foreground/50">
              Last updated: July 2026. Full Tournament Handbook to be published prior to the event.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
