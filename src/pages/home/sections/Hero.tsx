import { ChevronRight, Trophy, Users, Award, MapPin, Calendar } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";

const STRIP = [
  { eyebrow: "Teams", value: "12 Franchises", icon: Trophy },
  { eyebrow: "Players", value: "168 Players", icon: Users },
  { eyebrow: "Prize", value: "₹30L Prize Pool", icon: Award },
  { eyebrow: "Venue", value: "Express Avenue, Chennai", icon: MapPin },
  { eyebrow: "Dates", value: "17–20 Sep 2026", icon: Calendar },
];

import HERO_VIDEO from "@/assets/TNPPL  VID  V2  .mp4";

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
        <div className="flex flex-1 items-center pt-24 sm:pt-28 lg:pt-37.5">
          <div className="w-full max-w-full sm:max-w-160 lg:max-w-[50%] xl:max-w-[46%]">
            <p
              className="animate-fade-up font-display text-xs tracking-[0.4em] text-foreground/85 sm:text-sm"
              style={{ animationDelay: "60ms" }}
            >
              SEASON 2
            </p>

            <h1
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
            </h1>

            <div
              className="mt-7 flex items-center gap-3"
              aria-hidden="true"
            >
              <span
                className="h-px bg-linear-to-r from-transparent to-gold/70 w-16 sm:w-24"
                style={{
                  animation: "tn-line-grow-right 0.7s 980ms cubic-bezier(0.22, 1, 0.36, 1) both",
                  transformOrigin: "left center",
                }}
              />
              <span
                className="text-gold"
                style={{
                  animation: "tn-star-pop 0.55s 1100ms cubic-bezier(0.34, 1.56, 0.64, 1) both",
                }}
              >
                <span className="inline-block animate-star-pickleball">&#9733;</span>
              </span>
              <span
                className="h-px flex-1 bg-linear-to-l from-transparent to-gold/70"
                style={{
                  animation: "tn-line-grow-left 0.7s 980ms cubic-bezier(0.22, 1, 0.36, 1) both",
                  transformOrigin: "right center",
                }}
              />
            </div>

            <p
              className="animate-fade-up mt-6 max-w-110 text-sm leading-relaxed text-foreground/80 sm:text-[15px]"
              style={{ fontFamily: "Arial, sans-serif", animationDelay: "1300ms" }}
            >
              Experience four unforgettable days of elite competition, celebrity-owned franchises,
              and the fastest-growing sport in India.
            </p>

            <div
              className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
              style={{ animationDelay: "1400ms" }}
            >
              <a
                href="#about"
                className="btn-gold inline-flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.08em] sm:w-auto"
              >
                <span>Explore Season 2</span>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#schedule"
                className="btn-outline-light inline-flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.08em] sm:w-auto"
              >
                <span>View Schedule</span>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div
          className="animate-fade-up mt-10 rounded-2xl lg:mt-12"
          style={{
            animationDelay: "1500ms",
            border: "1px solid color-mix(in oklab, var(--gold) 15%, transparent)",
            background: "color-mix(in oklab, var(--ink) 65%, transparent)",
            backdropFilter: "blur(12px)",
          }}
        >
          <dl className="grid grid-cols-2 divide-y divide-gold/10 sm:grid-cols-3 lg:grid-cols-5 sm:divide-y-0 sm:divide-x sm:divide-gold/10">
            {STRIP.map(({ eyebrow, value, icon: Icon }) => (
              <div
                key={eyebrow}
                className="flex items-center gap-3.5 px-4 py-5 sm:px-5 sm:py-6"
              >
                <Icon className="h-4 w-4 shrink-0 text-gold" />
                <div className="min-w-0 flex-1">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold/75">
                    {eyebrow}
                  </dt>
                  <dd className="mt-0.5 truncate text-[12px] font-semibold uppercase leading-tight text-foreground/90 sm:text-[13px]">
                    {value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="animate-fade-up mt-8 flex items-center justify-center gap-3 sm:gap-4"
          style={{ animationDelay: "1820ms" }}
        >
          <span className="inline-block animate-star-pickleball text-gold text-xs sm:text-sm lg:text-base" aria-hidden="true">&#9733;</span>
          <p
            className="text-center text-lg uppercase tracking-[0.06em] sm:text-3xl lg:text-[2.5rem] sm:tracking-widest"
            style={{ fontFamily: "'PODIUM Sharp', sans-serif" }}
          >
            <span style={{ color: "#ffffff" }}>ONE </span>
            <span style={{ color: "oklch(0.865 0.197 83)" }}>GAME<span style={{ fontFamily: "Arial, sans-serif" }}>.</span> </span>
            <span style={{ color: "#ffffff" }}>ONE </span>
            <span style={{ color: "oklch(0.865 0.197 83)" }}>FAMILY<span style={{ fontFamily: "Arial, sans-serif" }}>.</span></span>
          </p>
          <span className="inline-block animate-star-pickleball text-gold text-xs sm:text-sm lg:text-base" aria-hidden="true">&#9733;</span>
        </div>
      </div>
    </section>
  );
}
