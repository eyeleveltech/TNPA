import { ChevronRight, Trophy, Users, Award, MapPin, Calendar } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";

import SPONSOR_CAVINS from "@/assets/Cavins Logo_2-01.webp";
import SPONSOR_GTB from "@/assets/GTB.webp";
import SPONSOR_INDIANBANK from "@/assets/INDIANB.NS_BIG-f675f730.webp";
import SPONSOR_PIXPE from "@/assets/PIX PE LOGO (BB).webp";
import SPONSOR_RIZZFITT from "@/assets/rizzfitt_svg.webp";
import LOGO_S2 from "@/assets/TNPPL_S2_logo.webp";

const STRIP = [
  { eyebrow: "Teams", value: "12 Franchises", icon: Trophy },
  { eyebrow: "Players", value: "168 Players", icon: Users },
  { eyebrow: "Prize", value: "₹30L Prize Pool", icon: Award },
  { eyebrow: "Venue", value: "Express Avenue, Chennai", icon: MapPin },
  { eyebrow: "Dates", value: "17–20 Sep 2026", icon: Calendar },
];

const SPONSOR_GROUPS = [
  { label: "Title Sponsor", logos: [{ name: "CavinKare", src: SPONSOR_CAVINS }] },
  { label: "Co Sponsors", logos: [{ name: "GTB", src: SPONSOR_GTB }, { name: "Indian Bank", src: SPONSOR_INDIANBANK }] },
  { label: "Led Partner", logos: [{ name: "Pix Pe", src: SPONSOR_PIXPE }] },
  { label: "Tech Partner", logos: [{ name: "Rizzfitt", src: SPONSOR_RIZZFITT }] },
];


import HERO_VIDEO from "@/assets/hero.mp4";

export function Hero() {
  const { mx, my, scrollY } = useParallax();

  const imageStyle = {
    transform: `translate3d(${mx * -14}px, ${my * -10 + scrollY * -0.05}px, 0) scale(1.04)`,
  };
  const glowStyle = {
    transform: `translate3d(${mx * 26}px, ${my * 18}px, 0)`,
  };
  const strokeStyle = {
    transform: `translate3d(${mx * -34}px, ${my * -12 + scrollY * 0.06}px, 0)`,
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-ink"
    >
      {/* Hero video background */}
      <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
        <video
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-center will-change-transform"
          style={imageStyle}
        />
        {/* Pattern texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/tnppl-pattern.png')",
            backgroundSize: "360px auto",
            backgroundRepeat: "repeat",
            opacity: 0.06,
            mixBlendMode: "overlay",
          }}
        />
        {/* Left video gradient overlay using Tailwind bg-[#011837] */}
        <div
          className="absolute inset-0 bg-linear-to-r from-[#011837] from-10% via-[#011837]/80 via-40% to-transparent to-90%"
          aria-hidden="true"
        />
      </div>

      {/* Accessible image description for screen readers */}
      <span className="sr-only">
        A TNPPL athlete diving to return a pickleball on a floodlit indoor court.
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
        <div className="flex flex-1 items-start sm:items-center pt-24 sm:pt-28 lg:pt-32">
          <div className="w-full max-w-full sm:max-w-160 lg:max-w-[50%] xl:max-w-[46%]">
            <div
              className="animate-fade-up mb-2 flex items-start gap-2 sm:gap-4 lg:gap-5"
              style={{ animationDelay: "20ms" }}
            >
              <img
                src={SPONSOR_CAVINS}
                alt="Cavins"
                className="h-16 w-auto object-contain sm:h-24 lg:h-36 xl:h-44"
              />
              <img
                src={LOGO_S2}
                alt="TNPPL Season 2"
                className="h-16 w-auto object-contain sm:h-24 lg:h-36 xl:h-44"
              />
            </div>
            {/* <p
              className="animate-fade-up font-display text-xs tracking-[0.4em] text-foreground/85 sm:text-sm"
              style={{ animationDelay: "60ms" }}
            >
              SEASON 2
            </p> */}

            {/* <h1
              id="hero-title"
              className="mt-4 flex flex-col w-max"
              style={{
                fontFamily: "'PODIUM Sharp', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.35em",
                lineHeight: 1.0,
                textTransform: "uppercase",
                transform: `translate3d(${mx * 2}px, ${my * 1.5}px, 0)`,
                transition: "transform 0.08s linear",
              }}
            >
              <span
                className="block text-foreground whitespace-nowrap text-[clamp(1.5rem,5.2vw,6.5rem)]"
                style={{
                  animation: "tn-clip-reveal 0.75s 140ms cubic-bezier(0.22, 1, 0.36, 1) both",
                }}
              >
                TAMIL NADU
              </span>
              <span
                className="block text-gold-gradient mt-2 whitespace-nowrap text-[clamp(10.15px,2.2vw,2.75rem)]"
                style={{
                  letterSpacing: "0.04em",
                  animation: "tn-clip-reveal 0.65s 560ms cubic-bezier(0.22, 1, 0.36, 1) both",
                }}
              >
                Premier Pickleball League
              </span>
            </h1> */}


            <p
              className="animate-fade-up mt-6 max-w-110 text-sm leading-relaxed text-foreground/80 sm:text-[15px]"
              style={{ fontFamily: "Arial, sans-serif", animationDelay: "1300ms" }}
            >
              Experience four unforgettable days of elite competition, celebrity-owned franchises,
              and the fastest-growing sport in India.
            </p>

            <div
              className="animate-fade-up mt-5 sm:mt-8 flex flex-row flex-wrap items-center gap-3 sm:gap-4"
              style={{ animationDelay: "1400ms" }}
            >
              <a
                href="#about"
                className="btn-gold inline-flex w-auto items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] sm:px-8 sm:py-4 sm:text-sm"
              >
                <span>Explore Season 2</span>
                <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              </a>
              <a
                href="#schedule"
                className="btn-outline-light inline-flex w-auto items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] sm:px-8 sm:py-4 sm:text-sm"
              >
                <span>View Schedule</span>
                <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div
          className="animate-fade-up mt-6 sm:mt-10 rounded-xl sm:rounded-2xl lg:mt-12"
          style={{
            animationDelay: "1500ms",
            border: "1px solid color-mix(in oklab, var(--gold) 15%, transparent)",
            background: "color-mix(in oklab, var(--ink) 65%, transparent)",
            backdropFilter: "blur(12px)",
          }}
        >
          <dl className="grid grid-cols-2 gap-y-1.5 gap-x-2 sm:grid-cols-3 lg:grid-cols-5 sm:gap-0 sm:divide-x sm:divide-gold/10">
            {STRIP.map(({ eyebrow, value, icon: Icon }, index) => (
              <div
                key={eyebrow}
                className={`flex items-center gap-2.5 px-3 py-2.5 sm:gap-3.5 sm:px-5 sm:py-6 ${index === 4 ? "col-span-2 sm:col-span-1 justify-center sm:justify-start" : ""}`}
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
        {/* ── Sponsor Logo Marquee ── */}
        <div
          className="animate-fade-up mt-8 overflow-hidden rounded-xl"
          style={{
            animationDelay: "1820ms",
            border: "1px solid color-mix(in oklab, var(--gold) 12%, transparent)",
            background: "color-mix(in oklab, var(--ink) 55%, transparent)",
            backdropFilter: "blur(10px)",
            maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="flex items-center pt-3 pb-1.5 sm:pt-4 sm:pb-2">
            <div
              className="flex shrink-0 items-start"
              style={{
                animation: "sponsor-scroll 24s linear infinite",
              }}
            >
              {/* Repeat logos 4x for seamless infinite loop */}
              {Array.from({ length: 4 }).flatMap((_, setIdx) =>
                SPONSOR_GROUPS.map((group, i) => (
                  <div
                    key={`group-${setIdx}-${i}`}
                    className="mx-6 flex shrink-0 flex-col items-center sm:mx-8 lg:mx-10"
                  >
                    <span
                      className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/50 sm:text-[10px]"
                      style={{ fontFamily: "Arial, sans-serif" }}
                    >
                      {group.label}
                    </span>
                    <div className="mt-0.5 flex h-12 w-full items-center justify-center gap-8 sm:mt-1 sm:h-14 sm:gap-10 lg:mt-1.5 lg:h-16 lg:gap-12">
                      {group.logos.map(logo => (
                        <img
                          key={logo.name}
                          src={logo.src}
                          alt={logo.name}
                          loading="eager"
                          className={`w-auto object-contain ${
                            logo.name === "CavinKare"
                              ? "-my-2 h-16 max-w-56 sm:-my-3 sm:h-20 sm:max-w-68 lg:-my-4 lg:h-24 lg:max-w-80"
                              : "h-8 max-w-27.5 sm:h-10 sm:max-w-32.5 lg:h-11 lg:max-w-37.5"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

