import { ChevronRight, Handshake } from "lucide-react";

export function Sponsors() {
  return (
    <section id="sponsors" className="relative overflow-hidden bg-background py-10 sm:py-12 lg:py-14">
      {/* ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(60% 45% at 20% 60%, color-mix(in oklab, var(--gold) 7%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "linear-gradient(to top right, black, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
        {/* heading */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/50 sm:w-16" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
              Our Partners
            </span>
            <span className="h-px w-10 bg-gold/50 sm:w-16" />
          </div>
          <h2 className="display-title-extended mt-4 text-[clamp(2.4rem,6.5vw,4.2rem)]">
            <span className="block text-foreground">Official</span>
            <span className="text-gold-gradient block">Sponsors</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-[15px]"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            TNPPL is supported by leading brands and institutions.
          </p>
        </div>

        {/* Sponsor logos will go here in the future */}
        <div className="grid place-items-center py-10 opacity-30">
          <p className="text-sm font-semibold tracking-widest text-white uppercase">Sponsors TBA</p>
        </div>

        {/* CTA strip */}
        <div className="stat-card mt-14 grid items-center gap-6 rounded-2xl px-6 py-7 sm:px-10 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
          <span className="relative hidden h-16 w-16 shrink-0 place-items-center lg:grid">
            <span className="absolute inset-0 rounded-2xl" style={{ border: "1px solid color-mix(in oklab, var(--gold) 22%, transparent)" }} />
            <span className="absolute inset-1.25 rounded-xl" style={{
              background: "radial-gradient(circle at 38% 32%, color-mix(in oklab, var(--gold) 22%, transparent), color-mix(in oklab, var(--gold) 5%, transparent))",
              border: "1px solid color-mix(in oklab, var(--gold) 45%, transparent)",
            }} />
            <Handshake className="relative h-7 w-7 text-gold" strokeWidth={1.2} aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-foreground/80 sm:text-base">
              Let's build something extraordinary together.
            </p>
            <h3 className="display-title-extended mt-1 text-2xl sm:text-3xl">
              <span className="text-foreground">Brand </span>
              <span className="text-gold-gradient">Collaboration</span>
              <span className="text-foreground"> with TNPPL Season 2.</span>
            </h3>
          </div>
          <a
            href="/#contact-name"
            onClick={(e) => {
              const el = document.getElementById('contact-name');
              if (el) {
                setTimeout(() => el.focus(), 50);
              }
            }}
            className="btn-outline-light inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.12em]"
          >
            Brand Collaboration
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
