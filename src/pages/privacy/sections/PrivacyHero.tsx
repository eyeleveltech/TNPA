export function PrivacyHero() {
  return (
    <div className="relative">
      <section
        className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 0%, color-mix(in oklab, var(--gold) 6%, transparent), transparent 60%), var(--ink)",
        }}
      >
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold/50" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
              Legal
            </span>
          </div>
          <h1 className="display-title mt-4 text-[clamp(2.6rem,7vw,4.8rem)] text-foreground">
            Privacy <span className="text-gold-gradient">Policy</span>
          </h1>
          <p className="mt-3 text-[13px] text-foreground/50">
            Effective Date: July 2026. This policy governs the collection and use of personal data on the TNPPL official website.
          </p>
        </div>
      </section>
    </div>
  );
}
