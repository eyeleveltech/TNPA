import { ChevronRight, Handshake, Building2, Star } from "lucide-react";
import sdatNewLogo from "@/assets/SDAT New English Logo.2109c9b437628e4b77e4.webp";
import ipaLogoImg from "@/assets/ipa.webp";
import TNPA_LOGO from "@/assets/TNPA LOGO (1).webp";

import vikramImg from "@/assets/chiyan vikram og.webp";
import keerthiImg from "@/assets/keerthi pandian og.webp";
import varalaxmiImg from "@/assets/varalakshmmi og.webp";

const FRANCHISE_OWNERS = [
  {
    name: "Chiyaan Vikram",
    type: "Celebrity Owner",
    category: "Actor",
    accent: "45 90% 58%",
    initial: "V",
    image: vikramImg,
  },
  {
    name: "Varalaxmi Sarathkumar",
    type: "Celebrity Owner",
    category: "Actor",
    accent: "325 85% 62%",
    initial: "VS",
    image: varalaxmiImg,
  },
  {
    name: "Keerthi Pandian",
    type: "Celebrity Owner",
    category: "Actor",
    accent: "0 80% 58%",
    initial: "KP",
    image: keerthiImg,
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

        {/* ── Franchise Owners Grid (3 Columns with Full Uncropped Centered Image & Extra Gap) ── */}
        <div className="mt-12 grid gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {FRANCHISE_OWNERS.map((owner) => (
            <div
              key={owner.name}
              className="stat-card group relative flex flex-col overflow-hidden rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:border-gold/60 hover:shadow-[0_15px_35px_-10px_rgba(234,179,8,0.25)]"
              style={{
                borderColor: "color-mix(in oklab, var(--gold) 30%, transparent)",
                background: "linear-gradient(165deg, color-mix(in oklab, var(--gold) 8%, var(--ink)) 0%, var(--ink) 65%)",
              }}
            >
              {/* Image Frame with Full Cover Image */}
              <div className="relative flex items-center justify-center h-72 sm:h-80 lg:h-84 w-full overflow-hidden rounded-xl bg-[#021026] border border-gold/30">
                {owner.image ? (
                  <img
                    src={owner.image}
                    alt={owner.name}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center">
                    <span className="font-display text-3xl font-black text-gold">
                      {owner.initial}
                    </span>
                  </div>
                )}
              </div>

              {/* Details Centered Below Image */}
              <div className="mt-4 flex flex-col items-center text-center p-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">
                  {owner.type}
                </span>
                <h3 className="mt-1.5 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-gold sm:text-xl">
                  {owner.name}
                </h3>
                <p
                  className="mt-1.5 flex items-center justify-center gap-1.5 text-xs text-foreground/80"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  <Star className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                  {owner.category}
                </p>
                <span className="mt-3.5 inline-block rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                  District Franchise TBA
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] text-foreground/45">
          Remaining franchise owners to be announced. District-to-owner mapping revealed at the Grand Player Auction.
        </p>



      </div>
    </section>
  );
}
