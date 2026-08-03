import { Reveal } from "@/components/Reveal";

export function FAQHero() {
  return (
    <div className="relative">
      <section
        className="relative overflow-hidden bg-ink pt-32 pb-16 sm:pt-40 sm:pb-20"
        style={{
          background:
            "radial-gradient(80% 60% at 60% 0%, color-mix(in oklab, var(--gold) 7%, transparent), transparent 60%), var(--ink)",
        }}
      >
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <Reveal delay={60}>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold/50" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
                Help &amp; Support
              </span>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <h1 className="display-title mt-4 text-[clamp(2.6rem,7vw,4.8rem)] text-foreground">
              Frequently Asked{" "}
              <span className="text-gold-gradient">Questions</span>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-foreground/65">
              Everything you need to know about TNPPL Season 2 — from the event schedule to sponsorship enquiries.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
