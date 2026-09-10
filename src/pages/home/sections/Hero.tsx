import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Trophy,
  Users,
  Award,
  Ticket,
  Youtube,
} from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import { getHeroTertiaryCta } from "@/lib/auction";

import SPONSOR_CAVINS from "@/assets/sponsors/cavin.webp";
import SPONSOR_BOOM from "@/assets/sponsors/boom_white.webp";
import SPONSOR_GTB from "@/assets/sponsors/gtb.webp";
import SPONSOR_INDIANBANK from "@/assets/sponsors/indian_bank.webp";
import SPONSOR_NOVA from "@/assets/sponsors/nova.webp";
import SPONSOR_TURFTOWN from "@/assets/sponsors/turf_town.webp";
import SPONSOR_RAUNAQ from "@/assets/sponsors/raunaq.webp";
import SPONSOR_PIXEL from "@/assets/sponsors/pixel_edge.webp";
import SPONSOR_SPECTON from "@/assets/sponsors/specton.webp";
import SPONSOR_MIRCHI from "@/assets/sponsors/mirchi.webp";
import SPONSOR_GEETHAM from "@/assets/sponsors/geetham.webp";
import SPONSOR_RIGHTS from "@/assets/sponsors/rh_reversed_straight.webp";
import SPONSOR_REFORGE from "@/assets/sponsors/reforge.webp";

/* Dates and venue now live in the free-entry badge row above the strip —
   keeping them here too would state them twice. */
const STRIP = [
  { eyebrow: "Teams", value: "12 Franchises", icon: Trophy },
  { eyebrow: "Players", value: "168 Players", icon: Users },
  { eyebrow: "Prize", value: "₹30L Prize Pool", icon: Award },
];

/* Grouped by tier per official league hierarchy.
   Any unmentioned logos have been removed.
   Tier 5 (Mirchi, Geetham, Right Hospitals, Reforge) has no category title.
   Sizing boosted for prominent, bold visibility across all tiers. */
const SPONSOR_ITEMS: {
  label: string;
  logos: { name: string; src: string; className?: string }[];
}[] = [
  {
    label: "Title Sponsor",
    logos: [
      {
        name: "CavinKare",
        src: SPONSOR_CAVINS,
        className: "h-12 max-w-36 sm:h-14 sm:max-w-44 lg:h-16 lg:max-w-52",
      },
    ],
  },
  {
    label: "Powered By",
    logos: [
      {
        name: "Boom Cars",
        src: SPONSOR_BOOM,
        className: "h-10.5 max-w-36 sm:h-12 sm:max-w-42 lg:h-13.5 lg:max-w-48",
      },
      {
        name: "GTB",
        src: SPONSOR_GTB,
        className: "h-9.5 max-w-32 sm:h-11 sm:max-w-38 lg:h-12.5 lg:max-w-46",
      },
    ],
  },
  {
    label: "Co Sponsors",
    logos: [
      {
        name: "Indian Bank",
        src: SPONSOR_INDIANBANK,
        className: "h-8.5 max-w-32 sm:h-10 sm:max-w-38 lg:h-11.5 lg:max-w-44 rounded-[3px]",
      },
      {
        name: "NOVA",
        src: SPONSOR_NOVA,
        className: "h-8 max-w-32 sm:h-9.5 sm:max-w-38 lg:h-11 lg:max-w-44",
      },
    ],
  },
  {
    label: "",
    logos: [
      {
        name: "Radio Mirchi",
        src: SPONSOR_MIRCHI,
        className: "h-16 max-w-48 sm:h-18 sm:max-w-56 lg:h-21 lg:max-w-64",
      },
    ],
  },
  {
    label: "",
    logos: [
      {
        name: "Geetham",
        src: SPONSOR_GEETHAM,
        className: "h-10 max-w-34 sm:h-11.5 sm:max-w-40 lg:h-13.5 lg:max-w-48",
      },
    ],
  },
  {
    label: "",
    logos: [
      {
        name: "Right Hospitals",
        src: SPONSOR_RIGHTS,
        className: "h-10.5 max-w-38 sm:h-12.5 sm:max-w-48 lg:h-14.5 lg:max-w-56",
      },
      {
        name: "Reforge",
        src: SPONSOR_REFORGE,
        className: "h-8 max-w-30 sm:h-9.5 sm:max-w-38 lg:h-11 lg:max-w-44",
      },
    ],
  },
  {
    label: "Associate Partners",
    logos: [
      {
        name: "Turf Town",
        src: SPONSOR_TURFTOWN,
        className: "h-9.5 max-w-28 sm:h-11 sm:max-w-34 lg:h-12.5 lg:max-w-40",
      },
      {
        name: "Raunaq",
        src: SPONSOR_RAUNAQ,
        className: "h-12 max-w-32 sm:h-13.5 sm:max-w-38 lg:h-15.5 lg:max-w-46",
      },
      {
        name: "Pixel Edge",
        src: SPONSOR_PIXEL,
        className: "h-6 max-w-28 sm:h-7.5 sm:max-w-36 lg:h-8.5 lg:max-w-42",
      },
      {
        name: "Specton",
        src: SPONSOR_SPECTON,
        className: "h-4.5 max-w-30 sm:h-5.5 sm:max-w-38 lg:h-6.5 lg:max-w-46",
      },
    ],
  },
];

import HERO_VIDEO from "@/assets/hero.mp4";

/* ──────────────────────────────────────────────────────────────
   Hero video treatment — tune these three in one place.

   HERO_PLAYBACK_RATE: below ~0.5 the browser stops interpolating
   frames and the clip judders, so 0.7–0.8 is the usable range for
   a "premium recap" feel.

   HERO_VIDEO_FILTER: graded in CSS rather than baked into the
   export, so it stays adjustable without a re-encode. The contrast
   bump stops the dimming from reading as washed out.

   HERO_SCRIM: horizontal falloff, densest behind the copy column
   and easing to a floor on the right. It never reaches transparent
   — that was the bug: bright frames (orange jerseys) hit the right
   edge at full strength and competed with the white text.
   ────────────────────────────────────────────────────────────── */
const HERO_PLAYBACK_RATE = 0.75;
const HERO_VIDEO_FILTER = "brightness(0.78) saturate(0.85) contrast(1.06)";
const HERO_SCRIM = [
  "rgba(1, 24, 55, 0.95) 0%",
  "rgba(1, 24, 55, 0.88) 22%",
  "rgba(1, 24, 55, 0.72) 50%",
  "rgba(1, 24, 55, 0.52) 78%",
  "rgba(1, 24, 55, 0.42) 100%",
].join(", ");

export function Hero() {
  const { mx, my, scrollY } = useParallax();
  const videoRef = useRef<HTMLVideoElement>(null);

  // playbackRate is reset by the browser each time the media loads,
  // so apply it on mount *and* on loadedmetadata.
  const applyPlaybackRate = () => {
    const video = videoRef.current;
    if (video) video.playbackRate = HERO_PLAYBACK_RATE;
  };

  useEffect(applyPlaybackRate, []);

  // Evaluated every render from the real clock — see src/lib/auction.ts.
  const tertiaryCta = getHeroTertiaryCta();

  const imageStyle = {
    transform: `translate3d(${mx * -14}px, ${my * -10 + scrollY * -0.05}px, 0) scale(1.04)`,
    filter: HERO_VIDEO_FILTER,
  };
  const glowStyle = {
    transform: `translate3d(${mx * 26}px, ${my * 18}px, 0)`,
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-ink"
    >
      {/* Hero video background */}
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={applyPlaybackRate}
          className="h-full w-full object-cover object-center will-change-transform"
          style={imageStyle}
        />
        {/* Horizontal scrim — dense behind the copy column, easing to a
            floor on the right so the footage still breathes. See HERO_SCRIM. */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${HERO_SCRIM})` }}
          aria-hidden="true"
        />
      </div>

      {/* Accessible image description for screen readers */}
      <span className="sr-only">
        A TNPPL athlete diving to return a pickleball on a floodlit indoor
        court.
      </span>

      {/* Stadium light glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
        style={glowStyle}
        aria-hidden="true"
      >
        <div className="absolute left-[58%] top-[6%] h-105 w-105 rounded-full bg-gold/10 blur-[120px]" />
      </div>

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-5 pb-10 sm:px-8 sm:pb-12 lg:px-10 lg:pb-14 xl:px-14">
        {/* flex-none on mobile is load-bearing. The section is min-h-svh and
            this row used to be flex-1 at every width, so it absorbed all the
            leftover height. Combined with items-start that space collected in
            one lump *below* the CTAs and above the stat card, reading as a
            ~250px hole. From sm up, items-center distributes it and the row
            can grow as intended. */}
        <div className="flex flex-none sm:flex-1 items-start sm:items-center pt-24 sm:pt-28 lg:pt-32">
          <div className="w-full max-w-full sm:max-w-160 lg:max-w-[54%] xl:max-w-[60%]">
            {/* Presented-by lockup. The TNPPL S2 logo used to sit here too, but
                the <h1> below now spells out the same words — it survives in the
                navbar, footer and favicon. */}
            <div className="animate-fade-up" style={{ animationDelay: "20ms" }}>
              <p
                className="text-[9px] font-bold uppercase tracking-[0.28em] text-foreground/50 sm:text-[10px]"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                Presented by
              </p>
              <img
                src={SPONSOR_CAVINS}
                alt="CavinKare"
                className="mt-1 h-10 w-auto object-contain sm:h-12 lg:h-14"
              />
            </div>

            <div
              className="animate-fade-up mt-5"
              style={{ animationDelay: "140ms" }}
            >
              <span
                className="text-[12px] font-bold uppercase tracking-[0.32em] text-gold sm:text-[14px]"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                TNPPL &middot; Season 2
              </span>
            </div>

            {/* Sentence case in the source — display-title-extended applies the
                uppercase. Screen readers letter-spell literal all-caps.
                Do NOT add font-bold: only 400/700/800 have @font-face entries and
                400 is the *extended* cut, so any bold silently swaps to the
                narrow one. letter-spacing is locked !important in styles.css. */}
            <h1
              id="hero-title"
              className="display-title-extended mt-4 text-[clamp(1.85rem,9.2vw,3.4rem)] sm:mt-5 sm:text-[clamp(2.6rem,6.2vw,4.4rem)] lg:text-[clamp(2.4rem,5vw,4.6rem)] xl:text-[clamp(3rem,4.8vw,5.4rem)]"
              style={{
                lineHeight: 0.94,
                transform: `translate3d(${mx * 2}px, ${my * 1.5}px, 0)`,
                transition: "transform 0.08s linear",
              }}
            >
              <span
                className="block text-foreground"
                style={{
                  animation:
                    "tn-clip-reveal 0.75s 260ms cubic-bezier(0.22, 1, 0.36, 1) both",
                }}
              >
                Tamil Nadu
              </span>
              <span
                className="text-gold-gradient block"
                style={{
                  animation:
                    "tn-clip-reveal 0.7s 470ms cubic-bezier(0.22, 1, 0.36, 1) both",
                }}
              >
                Pickleball
              </span>
              <span
                className="block text-foreground"
                style={{
                  animation:
                    "tn-clip-reveal 0.7s 660ms cubic-bezier(0.22, 1, 0.36, 1) both",
                }}
              >
                Premier League
              </span>
            </h1>

            <p
              className="animate-fade-up display-title-light mt-4 max-w-[26ch] text-[clamp(0.85rem,2.2vw,0.95rem)] text-foreground/90 sm:mt-5 sm:max-w-[34ch] sm:text-[clamp(0.9rem,1.6vw,1.1rem)]"
              style={{
                animationDelay: "900ms",
                lineHeight: 1.15,
              }}
            >
              Tamil Nadu
              <span style={{ fontFamily: "Arial, sans-serif" }}>&rsquo;</span>s
              own pickleball league
              <span style={{ fontFamily: "Arial, sans-serif" }}>.</span> Twelve
              districts
              <span style={{ fontFamily: "Arial, sans-serif" }}>.</span> One
              family<span style={{ fontFamily: "Arial, sans-serif" }}>.</span>
            </p>

            <p
              className="animate-fade-up mt-4 max-w-110 text-sm leading-relaxed text-foreground/80 sm:text-[15px]"
              style={{
                fontFamily: "Arial, sans-serif",
                animationDelay: "1080ms",
              }}
            >
              Season 2 brings twelve district franchises, 168 players and a
              &#8377;30 lakh prize pool to Chennai. Four days of the
              fastest-growing sport in India.
            </p>

            <div
              className="animate-fade-up mt-5 flex flex-wrap items-center gap-x-3 gap-y-2"
              style={{ animationDelay: "1220ms" }}
            >
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                <Ticket className="h-3.5 w-3.5" aria-hidden="true" />
                Free Entry
              </span>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/70 sm:text-xs"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                17&ndash;20 Sep 2026 &nbsp;&middot;&nbsp; Central Atrium,
                Express Avenue Mall, Chennai
              </span>
            </div>

            <div
              className="animate-fade-up mt-5 flex flex-row flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-4"
              style={{ animationDelay: "1360ms" }}
            >
              <a
                href="/#contact"
                onClick={() => {
                  sessionStorage.setItem("focusCollab", "true");
                  const el = document.getElementById("contact-name");
                  if (el)
                    setTimeout(() => el.focus({ preventScroll: true }), 50);
                }}
                className="btn-gold inline-flex w-auto items-center justify-center gap-2 rounded-full px-4 py-3 text-[10px] font-bold uppercase tracking-[0.08em] sm:px-7 sm:py-4 sm:text-sm"
              >
                <span>Own a Franchise</span>
                <ChevronRight
                  className="hidden h-4 w-4 sm:inline-block"
                  aria-hidden="true"
                />
              </a>
              {/* Route, not a hash — a plain <a> would full-reload and re-fetch
                  the hero video. */}
              <Link
                to="/sponsorship"
                className="btn-outline-light inline-flex w-auto items-center justify-center gap-2 rounded-full px-4 py-3 text-[10px] font-bold uppercase tracking-[0.08em] sm:px-7 sm:py-4 sm:text-sm"
              >
                <span>Become a Sponsor</span>
                <ChevronRight
                  className="hidden h-4 w-4 sm:inline-block"
                  aria-hidden="true"
                />
              </Link>
              <a
                href={tertiaryCta.href}
                {...(tertiaryCta.external
                  ? {
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "aria-label":
                        "Watch the TNPPL Season 2 player auction live on YouTube (opens in a new tab)",
                    }
                  : {})}
                className="btn-outline-light inline-flex w-auto items-center justify-center gap-2 rounded-full px-4 py-3 text-[10px] font-bold uppercase tracking-[0.08em] sm:px-7 sm:py-4 sm:text-sm"
              >
                {tertiaryCta.external && (
                  <Youtube className="h-4 w-4 shrink-0" aria-hidden="true" />
                )}
                <span>{tertiaryCta.label}</span>
                {!tertiaryCta.external && (
                  <ChevronRight
                    className="hidden h-4 w-4 sm:inline-block"
                    aria-hidden="true"
                  />
                )}
              </a>
            </div>
          </div>
        </div>

        <div
          className="animate-fade-up mt-5 sm:mt-8 rounded-xl sm:rounded-2xl lg:mt-9"
          style={{
            animationDelay: "1500ms",
            border:
              "1px solid color-mix(in oklab, var(--gold) 15%, transparent)",
            background: "color-mix(in oklab, var(--ink) 65%, transparent)",
            backdropFilter: "blur(12px)",
          }}
        >
          <dl className="grid grid-cols-3 gap-x-1 sm:gap-0 sm:divide-x sm:divide-gold/10">
            {STRIP.map(({ eyebrow, value, icon: Icon }) => (
              <div
                key={eyebrow}
                className="flex items-center gap-2 px-2.5 py-2.5 sm:gap-3.5 sm:px-5 sm:py-6"
              >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-gold" />
                <div className="min-w-0 flex-1">
                  <dt className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-gold/75">
                    {eyebrow}
                  </dt>
                  <dd className="mt-0.5 text-[11px] sm:text-[13px] font-semibold uppercase leading-tight text-foreground/90">
                    {value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
        {/* ── Sponsor Logo Marquee ──
            Width is capped below one set period (≈1312px at lg: 984px of logos
            + 4×72px tier spacing + one 40px gap inside the Co Sponsors pair).
            If the window is wider than one set you see the same logo twice at
            once — which is what happened at ≥1456px viewport. Shrinking the
            logos would widen that gap, not close it. max-w-300 (1200px) keeps
            the container under the period with ~110px to spare. */}
        <div
          className="group animate-fade-up mx-auto mt-8 w-full max-w-300 overflow-hidden rounded-xl cursor-default"
          style={{
            animationDelay: "1820ms",
            border:
              "1px solid color-mix(in oklab, var(--gold) 12%, transparent)",
            background: "color-mix(in oklab, var(--ink) 55%, transparent)",
            backdropFilter: "blur(10px)",
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="flex items-center pt-3 pb-2.5 sm:pt-4 sm:pb-3">
            {/* Spacing is per-item margin and divider, NOT container `gap` + `px`.
                `gap` puts no space after the last child, so half the track's
                width is never exactly one set — the -50% keyframe lands half a
                gap off and the loop visibly jumps. Symmetric margins and dividers
                make every item cost (width + divider), so half the track is exactly one set. */}
            <div
              className="flex shrink-0 items-center hover:paused group-hover:paused will-change-transform"
              style={{
                animation: "sponsor-scroll 48s linear infinite",
              }}
            >
              {/* 2 sets is the minimum for a -50% loop; 4 was double the DOM
                  for an identical result. */}
              {Array.from({ length: 2 }).flatMap((_, setIdx) =>
                SPONSOR_ITEMS.map((item, i) => (
                  <div
                    key={`item-${setIdx}-${i}`}
                    className="flex shrink-0 items-center"
                  >
                    <div className="flex shrink-0 flex-col items-center text-center px-6 sm:px-8 lg:px-10">
                      <span
                        className="min-h-3.5 text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/50 sm:text-[10px]"
                        style={{ fontFamily: "Arial, sans-serif" }}
                      >
                        {item.label || "\u00A0"}
                      </span>
                      {/* Uniform gap between logos in the same batch */}
                      <div className="mt-2 flex h-16 items-center justify-center gap-7 sm:mt-2.5 sm:h-18 sm:gap-9 lg:h-22 lg:gap-11">
                        {item.logos.map((logo) => (
                          <div
                            key={logo.name}
                            className="flex shrink-0 items-center justify-center"
                          >
                            <img
                              src={logo.src}
                              alt={logo.name}
                              loading="eager"
                              className={`w-auto object-contain transition-opacity duration-300 ${logo.className}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Subtle divider separating batches with perfect symmetry */}
                    <div
                      className="mt-3.5 h-8 w-px shrink-0 self-center bg-white/10"
                      aria-hidden="true"
                    />
                  </div>
                )),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
