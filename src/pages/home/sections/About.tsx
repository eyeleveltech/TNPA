import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

import teamPhoto from "@/assets/TEAM.jpg.webp";

import sdatNewLogo from "@/assets/SDAT New English Logo.2109c9b437628e4b77e4.webp";
import ipaLogoImg from "@/assets/ipa.webp";

import TNPA_LOGO from "@/assets/TNPA LOGO (1).webp";
const SDAT_LOGO = sdatNewLogo;
const IPA_LOGO = ipaLogoImg;

const STATS = [
  {
    icon: ShieldCheck,
    value: "12",
    label: "Franchises",
    copy: "District-based teams competing for pride and glory.",
  },
  {
    icon: Users,
    value: "168",
    label: "Players",
    copy: "The best of Tamil Nadu, from age 18 to 50+.",
  },
  {
    icon: CalendarDays,
    value: "4",
    label: "Days",
    copy: "High-intensity matches, entertainment and unmatched energy.",
  },
  {
    icon: MapPin,
    value: "TNPA + SDAT",
    label: "Official League",
    copy: "The official state league nothing unofficial about it.",
    stacked: true,
  },
];


export function About() {
  const [inView, setInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative overflow-hidden bg-ink py-10 sm:py-12 lg:py-14">
      {/* ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 0%, color-mix(in oklab, var(--gold) 7%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-8 hidden h-48 w-48 lg:block"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklab, var(--gold) 55%, transparent) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          opacity: 0.2,
          maskImage: "linear-gradient(to bottom left, black, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 bottom-8 hidden h-48 w-48 lg:block"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklab, var(--gold) 55%, transparent) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          opacity: 0.15,
          maskImage: "linear-gradient(to top right, black, transparent)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">

        {/* ---------- centered intro ---------- */}
        <div className="animate-fade-up text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/50 sm:w-16" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
              About TNPPL
            </span>
            <span className="h-px w-10 bg-gold/50 sm:w-16" />
          </div>

          <h2
            className="display-title-extended mt-4 text-[clamp(2.1rem,6.2vw,4.1rem)]"
            style={{ animationDelay: "80ms" }}
          >
            <span className="block text-foreground">More than a league.</span>
            <span className="text-gold-gradient block">
              It&rsquo;s a movement.
            </span>
          </h2>

          <div className="mx-auto mt-6 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-24 bg-linear-to-r from-transparent to-gold/70" />
            <span className="text-xs text-gold animate-star-pickleball">&#9733;</span>
            <span className="h-px w-24 bg-linear-to-l from-transparent to-gold/70" />
          </div>

          <p
            className="animate-fade-up mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-foreground/80 sm:text-[15px]"
            style={{ animationDelay: "160ms", fontFamily: "Arial, sans-serif" }}
          >
            Twelve city franchises. Each district, a battle ground. Each team, a community.
            Franchise identities to be unveiled at the Grand Player Auction.
          </p>
        </div>

        {/* ---------- feature photo ---------- */}
        <div
          className="animate-fade-up relative mt-12 overflow-hidden lg:mt-14"
          style={{
            borderRadius: "1.5rem",
            border: "1px solid color-mix(in oklab, var(--gold) 20%, transparent)",
            animationDelay: "340ms",
          }}
        >
          <img
            src={teamPhoto}
            alt="TNPPL players in navy and gold jerseys celebrating together on court"
            width={1280}
            height={480}
            loading="lazy"
            className="h-56 w-full object-cover sm:h-72 lg:h-96"
          />
          {/* scrim */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, color-mix(in oklab, var(--ink) 65%, transparent), transparent 60%), linear-gradient(to top, color-mix(in oklab, var(--ink) 40%, transparent), transparent 40%)",
            }}
          />
          {/* decorative diagonal stripe overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(55deg, var(--gold) 0 2px, transparent 2px 18px)",
            }}
          />
        </div>

        {/* ---------- stats ---------- */}
        <div ref={statsRef} className="mt-14 grid gap-8 border-t border-border pt-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-0">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`animate-fade-up flex min-w-0 items-start gap-3 lg:gap-2 xl:gap-5 lg:px-3 xl:px-7 ${i > 0 ? "lg:border-l lg:border-border" : ""
                }`}
              style={{ animationDelay: `${420 + i * 100}ms` }}
            >
              {/* luxury double-ring icon */}
              <span
                className={`relative grid h-12 w-12 sm:h-16 sm:w-16 lg:h-12 lg:w-12 xl:h-16 xl:w-16 shrink-0 place-items-center rounded-full ${
                  inView ? "animate-icon-intro" : ""
                }`}
                style={{ animationDelay: inView ? `${80 + i * 110}ms` : "0ms" }}
              >
                {/* outer ring */}
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: "1px solid color-mix(in oklab, var(--gold) 20%, transparent)",
                  }}
                />
                {/* tick marks — 4 corners */}
                <span className="absolute -inset-1 rounded-full opacity-40"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0% 10%, color-mix(in oklab, var(--gold) 60%, transparent) 10% 12%, transparent 12% 35%, color-mix(in oklab, var(--gold) 60%, transparent) 35% 37%, transparent 37% 60%, color-mix(in oklab, var(--gold) 60%, transparent) 60% 62%, transparent 62% 85%, color-mix(in oklab, var(--gold) 60%, transparent) 85% 87%, transparent 87% 100%)",
                  }}
                />
                {/* inner filled ring */}
                <span
                  className="absolute inset-1.5 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 38% 32%, color-mix(in oklab, var(--gold) 22%, transparent), color-mix(in oklab, var(--gold) 5%, transparent))",
                    border: "1px solid color-mix(in oklab, var(--gold) 50%, transparent)",
                  }}
                />
                <s.icon className="relative h-6 w-6 text-gold" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <div className="flex flex-col">
                  <p className="display-title-extended text-xl sm:text-2xl lg:text-lg xl:text-2xl text-gold leading-tight">{s.value}</p>
                  <p className="display-title-extended text-xs sm:text-sm lg:text-xs xl:text-sm text-foreground mt-0.5 whitespace-nowrap">{s.label}</p>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-foreground/80" style={{ fontFamily: "Arial, sans-serif" }}>{s.copy}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ---------- partners ---------- */}
        <div
          className="animate-fade-up stat-card mt-14 grid gap-8 rounded-2xl px-6 py-8 sm:px-10 xl:px-4 2xl:px-10 lg:grid-cols-3 lg:gap-0"
          style={{ animationDelay: "840ms" }}
        >
          <div className="flex w-full justify-center">
            <div className="flex flex-col items-center gap-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold text-center w-full">
                Officially organized by
              </p>
              <div className="flex items-center gap-4 text-left lg:gap-6">
                <img
                  src={TNPA_LOGO}
                  alt="Tamil Nadu Pickleball Association logo"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  loading="lazy"
                  className="h-16 w-auto shrink-0"
                />
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pt-0">
            <div className="flex flex-col items-center gap-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold text-center w-full">
                Affiliated by
              </p>
              <div className="flex items-center gap-4 text-left lg:gap-6">
                <img
                  src={IPA_LOGO}
                  alt="Indian Pickleball Association logo"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  loading="lazy"
                  className="h-16 w-auto shrink-0"
                />
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pt-0">
            <div className="flex flex-col items-center gap-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold text-center w-full">
                Associate with
              </p>
              <div className="flex items-center gap-4 text-left lg:gap-6">
                <img
                  src={SDAT_LOGO}
                  alt="Sports Development Authority of Tamil Nadu logo"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  loading="lazy"
                  className="h-16 w-auto shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
