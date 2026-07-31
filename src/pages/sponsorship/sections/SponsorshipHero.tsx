import { ChevronRight } from "lucide-react";

export function SponsorshipHero() {
  return (
    <div className="relative">
      <section
        className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 0%, color-mix(in oklab, var(--gold) 10%, transparent), transparent 70%)",
        }}
      >
        <div className="mx-auto max-w-[1600px] px-5 text-center sm:px-8 lg:px-10 xl:px-14">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/50 sm:w-16" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
              Partner with TNPPL
            </span>
            <span className="h-px w-10 bg-gold/50 sm:w-16" />
          </div>
          <h1
            className="display-title mx-auto mt-5"
            style={{ fontSize: "clamp(2.6rem, 7vw, 5rem)" }}
          >
            <span className="block text-foreground">Sponsorship <span style={{ fontFamily: "Arial, sans-serif" }}>&amp;</span></span>
            <span className="text-gold-gradient block">Partnership</span>
            <span className="block text-foreground">Opportunities</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-foreground/80 sm:text-[15px]" style={{ fontFamily: "Arial, sans-serif" }}>
            TNPPL Season 2 is Tamil Nadu&rsquo;s biggest pickleball event. 12 franchises, 168
            players, 4 days at Express Avenue Atrium. Align your brand with the fastest-growing
            sport in India.
          </p>
          <a
            href="mailto:tnstatepa@gmail.com?subject=Sponsorship Enquiry — TNPPL Season 2"
            className="btn-gold mt-8 inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.08em]"
          >
            Talk to Us About Sponsorship
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
