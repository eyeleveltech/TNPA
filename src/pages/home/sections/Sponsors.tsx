import { ChevronRight, Handshake, Building2, Star } from "lucide-react";
import sdatNewLogo from "@/assets/SDAT New English Logo.2109c9b437628e4b77e4.webp";
import ipaLogoImg from "@/assets/ipa.webp";
import TNPA_LOGO from "@/assets/TNPA LOGO (1).webp";

const FRANCHISE_OWNERS = [
  {
    name: "Chiyaan Vikram",
    type: "Celebrity Owner",
    category: "Actor",
    accent: "45 90% 58%",
    initial: "V",
  },
  {
    name: "Varalaxmi Sarathkumar",
    type: "Celebrity Owner",
    category: "Actor",
    accent: "325 85% 62%",
    initial: "VS",
  },
  {
    name: "Keerthi Pandian",
    type: "Celebrity Owner",
    category: "Actor",
    accent: "0 80% 58%",
    initial: "KP",
  },
  {
    name: "CavinKare",
    type: "Corporate Owner",
    category: "FMCG Company",
    accent: "190 85% 58%",
    initial: "CK",
  },
  {
    name: "Campus Sports",
    type: "Institutional Owner",
    category: "Sports Institution",
    accent: "120 70% 55%",
    initial: "CS",
  },
  {
    name: "Sri Ramakrishna Hospital",
    type: "Institutional Owner",
    category: "Healthcare",
    accent: "210 85% 62%",
    initial: "SRH",
  },
];

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
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/50 sm:w-16" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
              Our Franchise Owners
            </span>
            <span className="h-px w-10 bg-gold/50 sm:w-16" />
          </div>
          <h2 className="display-title-extended mt-4 text-[clamp(2.4rem,6.5vw,4.2rem)]">
            <span className="block text-foreground">The People</span>
            <span className="text-gold-gradient block">Behind The League</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-[15px]"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            TNPPL Season 2 is powered by an extraordinary lineup of franchise owners — Tamil cinema
            icons, leading corporates, and institutions committed to growing the sport.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3" aria-hidden>
            <span className="h-px w-20 bg-gold/40" />
            <span className="text-xs text-gold animate-star-pickleball">★</span>
            <span className="h-px w-20 bg-gold/40" />
          </div>
        </div>

        {/* ── Franchise Owners Grid ── */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FRANCHISE_OWNERS.map((owner) => (
            <div
              key={owner.name}
              className="stat-card group relative flex items-start gap-4 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-gold/60 hover:shadow-[0_10px_30px_-10px_rgba(234,179,8,0.2)]"
              style={{
                borderColor: "color-mix(in oklab, var(--gold) 25%, transparent)",
                background: "linear-gradient(165deg, color-mix(in oklab, var(--gold) 7%, var(--ink)) 0%, var(--ink) 65%)",
              }}
            >
              {/* luxury avatar */}
              <span className="relative grid h-14 w-14 shrink-0 place-items-center sm:h-16 sm:w-16">
                <span
                  className="absolute inset-0 rounded-xl"
                  style={{ border: "1px solid color-mix(in oklab, var(--gold) 30%, transparent)" }}
                />
                <span
                  className="absolute inset-1.25 rounded-lg"
                  style={{
                    background: "radial-gradient(circle at 38% 30%, color-mix(in oklab, var(--gold) 28%, var(--ink)), var(--ink))",
                    border: "1px solid color-mix(in oklab, var(--gold) 55%, transparent)",
                  }}
                />
                <span className="relative font-display text-lg font-black text-gold drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]">
                  {owner.initial}
                </span>
              </span>

              {/* info */}
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">
                  {owner.type}
                </p>
                <h3 className="mt-1 text-base font-bold leading-tight text-foreground transition-colors group-hover:text-gold sm:text-[17px]">
                  {owner.name}
                </h3>
                <p
                  className="mt-1.5 flex items-center gap-1.5 text-xs text-foreground/80"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  {owner.category === "Actor" ? (
                    <Star className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                  ) : (
                    <Building2 className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                  )}
                  {owner.category}
                </p>
                <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/50">
                  District franchise TBA
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] text-foreground/45">
          Remaining franchise owners to be announced. District-to-owner mapping revealed at the Grand Player Auction.
        </p>



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
            href="#contact"
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
