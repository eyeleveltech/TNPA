export function MediaKitHero() {
  return (
    <div className="relative">
      <section
        className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20"
        style={{
          background:
            "radial-gradient(80% 60% at 70% 0%, color-mix(in oklab, var(--gold) 8%, transparent), transparent 60%), var(--ink)",
        }}
      >
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold/50" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
              Press &amp; Brand
            </span>
          </div>
          <h1 className="display-title mt-4 text-[clamp(2.6rem,7vw,4.8rem)] text-foreground">
            Media <span className="text-gold-gradient">Kit</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-foreground/65">
            Brand assets, logos, press releases, and official materials for TNPPL Season 2. For accredited media and official brand partners.
          </p>
        </div>
      </section>
    </div>
  );
}
