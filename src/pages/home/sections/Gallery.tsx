import { useState } from "react";
import { Camera, ChevronRight } from "lucide-react";

const CATEGORIES = [
  "All Moments",
  "Match Action",
  "Behind The Scenes",
  "Opening Ceremony",
  "Fan Zone",
  "Award Ceremony",
];

const IMAGES = [
  {
    label: "Champion in Action",
    accent: "45 90% 58%",
    span: "col-span-1 row-span-2",
    caption: "Match Action",
    img: "/images/gallery-01.jpg",
  },
  {
    label: "High Five Moment",
    accent: "120 70% 55%",
    span: "col-span-1 row-span-1",
    caption: "Behind The Scenes",
    img: "/images/gallery-02.jpg",
  },
  {
    label: "Fan Zone Energy",
    accent: "190 85% 58%",
    span: "col-span-1 row-span-1",
    caption: "Fan Zone",
    img: "/images/gallery-03.jpg",
  },
  {
    label: "Serve & Smash",
    accent: "300 80% 62%",
    span: "col-span-1 row-span-1",
    caption: "Match Action",
    img: "/images/gallery-04.jpg",
  },
  {
    label: "Opening Ceremony",
    accent: "45 90% 58%",
    span: "col-span-1 row-span-1",
    caption: "Opening Ceremony",
    img: "/images/gallery-05.jpg",
  },
  {
    label: "Champions Trophy",
    accent: "45 95% 55%",
    span: "col-span-1 row-span-1",
    caption: "Award Ceremony",
    img: "/images/gallery-06.jpg",
  },
  {
    label: "Champions Celebration",
    accent: "45 90% 58%",
    span: "col-span-1 row-span-1",
    caption: "Award Ceremony",
    prize: "₹8,50,000",
    img: "/images/gallery-07.jpg",
  },
];

export function Gallery() {
  const [active, setActive] = useState("All Moments");

  return (
    <section id="gallery" className="relative overflow-hidden bg-ink py-10 sm:py-12 lg:py-14">
      {/* ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 0%, color-mix(in oklab, var(--gold) 8%, transparent), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
        {/* heading */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/50 sm:w-16" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
              Gallery
            </span>
            <span className="h-px w-10 bg-gold/50 sm:w-16" />
          </div>
          <h2 className="display-title-extended mt-4 text-[clamp(2.4rem,6.5vw,4.2rem)]">
            <span className="block text-foreground">Relive</span>
            <span className="text-gold-gradient block">The Action</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-[15px]"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Unforgettable moments, fierce rivalries, and non-stop energy. A glimpse of TNPPL Season 2.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3" aria-hidden>
            <span className="h-px w-20 bg-gold/40" />
            <span className="text-xs text-gold animate-star-pickleball">★</span>
            <span className="h-px w-20 bg-gold/40" />
          </div>
        </div>

        {/* category tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-all ${
                active === cat
                  ? "bg-gold text-primary-foreground shadow-(--shadow-gold)"
                  : "border border-border text-foreground/70 hover:border-gold/50 hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* photo grid */}
        <div className="mt-10 grid auto-rows-50 grid-cols-2 gap-3 sm:auto-rows-55 sm:gap-4 lg:grid-cols-4 lg:auto-rows-60">
          {IMAGES.map((img, i) => (
            <div
              key={img.label}
              className={`group relative overflow-hidden rounded-xl cursor-pointer ${i === 0 ? "row-span-2" : ""}`}
              style={{
                background: `linear-gradient(165deg, color-mix(in oklab, hsl(${img.accent}) 28%, var(--ink)), var(--ink))`,
              }}
            >
              {/* grid pattern (fallback, hidden once image loads) */}
              <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
                viewBox="0 0 200 200"
                fill="none"
              >
                <line x1="100" y1="0" x2="100" y2="200" stroke="white" />
                <line x1="0" y1="100" x2="200" y2="100" stroke="white" />
                <rect x="60" y="60" width="80" height="80" stroke="white" strokeWidth="0.5" />
              </svg>

              {/* paint accent */}
              <div
                className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-20 blur-2xl"
                style={{ background: `hsl(${img.accent})` }}
              />

              {/* real photo */}
              <img
                src={img.img}
                alt={img.label}
                className="absolute inset-0 h-full w-full object-cover object-center"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />

              {/* centre label (fallback only — hidden when image shows) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span
                    className="font-display text-2xl font-black uppercase opacity-25 select-none sm:text-3xl"
                    style={{ color: `hsl(${img.accent})` }}
                  >
                    TNPPL
                  </span>
                </div>
              </div>

              {/* prize overlay (award card) */}
              {img.prize && (
                <div className="absolute right-3 bottom-14 rounded-lg bg-ink/90 px-3 py-2 text-right">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gold">
                    Champions
                  </p>
                  <p className="font-display text-xl text-foreground">{img.prize}</p>
                  <p className="text-[8px] text-foreground/50">TNPPL Season 2</p>
                </div>
              )}

              {/* hover overlay */}
              <div className="absolute inset-0 flex items-end bg-linear-to-t from-ink/90 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <div>
                  <p
                    className="text-[9px] font-bold uppercase tracking-[0.22em]"
                    style={{ color: `hsl(${img.accent})` }}
                  >
                    {img.caption}
                  </p>
                  <p className="mt-0.5 text-[13px] font-semibold text-foreground">{img.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* bottom banner */}
        <div className="stat-card mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl px-6 py-7 sm:flex-row sm:px-10">
          <div className="flex items-center gap-4">
            <Camera className="h-10 w-10 shrink-0 text-gold" strokeWidth={1.3} aria-hidden />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-foreground/80">
                Witness the excitement.
              </p>
              <h3 className="display-title-extended text-2xl">
                <span className="text-foreground">More Moments, </span>
                <span className="text-gold-gradient">Coming Soon!</span>
              </h3>
            </div>
          </div>
          <a
            href="#gallery"
            className="btn-outline-light inline-flex shrink-0 items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold uppercase tracking-[0.12em]"
          >
            View Full Gallery
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
