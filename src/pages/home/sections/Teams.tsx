import { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";

import logoChennai from "@/assets/Team_Logos-01.webp";
import logoCoimbatore from "@/assets/Team_Logos-02.webp";
import logoMadurai from "@/assets/Team_Logos-03.webp";
import logoNellai from "@/assets/Team_Logos-04.webp";
import logoOoty from "@/assets/Team_Logos-05.webp";
import logoKanchi from "@/assets/Team_Logos-06.webp";
import logoCuddalore from "@/assets/Team_Logos-07.webp";
import logoHosur from "@/assets/Team_Logos-08.webp";
import logoRockfort from "@/assets/Team_Logos-09.webp";
import logoRamnad from "@/assets/Team_Logos-10.webp";
import logoSalem from "@/assets/Team_Logos-11.webp";
import logoKodai from "@/assets/Team_Logos-12.webp";

type Team = {
  name: string;
  district: string;
  region: string;
  accent: string;
  logo: string | null;
};

const TEAMS: Team[] = [
  {
    name: "Chennai Tamizh Titans",
    district: "Chennai",
    region: "North",
    accent: "190 90% 62%",
    logo: logoChennai,
  },
  {
    name: "Kanchi Blackbucks",
    district: "Kanchipuram",
    region: "North",
    accent: "150 75% 52%",
    logo: logoKanchi,
  },
  {
    name: "Cuddalore Kings",
    district: "Cuddalore",
    region: "East",
    accent: "270 80% 65%",
    logo: logoCuddalore,
  },
  {
    name: "Twin Eagles Hosur",
    district: "Krishnagiri",
    region: "North",
    accent: "205 85% 62%",
    logo: logoHosur,
  },
  {
    name: "Coimbatore Smashers",
    district: "Coimbatore",
    region: "West",
    accent: "15 90% 60%",
    logo: logoCoimbatore,
  },
  {
    name: "Kodai Tigers",
    district: "Kodaikanal",
    region: "West",
    accent: "32 95% 60%",
    logo: logoKodai,
  },
  {
    name: "Ooty Bisons",
    district: "Nilgiris",
    region: "West",
    accent: "128 70% 52%",
    logo: logoOoty,
  },
  {
    name: "Madurai All Stars",
    district: "Madurai",
    region: "South",
    accent: "355 85% 58%",
    logo: logoMadurai,
  },
  {
    name: "Nellai Warriors",
    district: "Tirunelveli",
    region: "South",
    accent: "175 80% 55%",
    logo: logoNellai,
  },
  {
    name: "Ramnad Royals",
    district: "Ramanathapuram",
    region: "South",
    accent: "198 85% 58%",
    logo: logoRamnad,
  },
  {
    name: "Rockfort Terminatrz",
    district: "Tiruchirappalli",
    region: "Central",
    accent: "22 85% 58%",
    logo: logoRockfort,
  },
  {
    name: "Salem Super Smashers",
    district: "Salem",
    region: "West",
    accent: "195 85% 55%",
    logo: logoSalem,
  },
];

export function Teams() {
  const [active, setActive] = useState(5);
  const [layout, setLayout] = useState({ spread: 132, visible: 4 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setLayout({ spread: 0, visible: 0 });
      else if (w < 1024) setLayout({ spread: 128, visible: 2 });
      else if (w < 1280) setLayout({ spread: 148, visible: 3 });
      else setLayout({ spread: 168, visible: 4 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const go = useCallback((dir: number) => {
    setActive((i) => (i + dir + TEAMS.length) % TEAMS.length);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const minSwipeDistance = 40;

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setTouchStart(clientX);
    setTouchEnd(clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setTouchEnd(clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging || touchStart === null || touchEnd === null) {
      setIsDragging(false);
      return;
    }
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      go(1);
    } else if (distance < -minSwipeDistance) {
      go(-1);
    }
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const current = TEAMS[active];

  return (
    <section id="teams" className="relative overflow-hidden bg-ink py-10 sm:py-12 lg:py-14">
      {/* ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, color-mix(in oklab, var(--gold) 10%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "linear-gradient(to bottom, black, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
        {/* heading */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/50 sm:w-16" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
              12 Franchises
            </span>
            <span className="h-px w-10 bg-gold/50 sm:w-16" />
          </div>
          <h2 className="display-title-extended mt-4 text-[clamp(2.4rem,6.5vw,4.2rem)]">
            <span className="block text-foreground">District</span>
            <span className="text-gold-gradient block">Franchises</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-[15px]"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Twelve city franchises. Each district, a battle ground. Each team, a community. Franchise
            identities unveiled at the Grand Player Auction.
          </p>
        </div>

        {/* mobile: logo grid */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:hidden">
          {TEAMS.map((t, i) => (
            <div
              key={t.name}
              className="stat-card flex items-center gap-3 rounded-xl p-3"
              style={{ borderColor: `color-mix(in oklab, hsl(${t.accent}) 35%, transparent)` }}
            >
              {t.logo ? (
                <img
                  src={t.logo}
                  alt={`${t.name} logo`}
                  loading="eager"
                  fetchPriority="high"
                  className="h-14 w-14 shrink-0 object-contain"
                  style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.7))" }}
                />
              ) : (
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold"
                  style={{
                    background: `radial-gradient(circle, color-mix(in oklab, hsl(${t.accent}) 30%, transparent), transparent)`,
                    border: `1px solid color-mix(in oklab, hsl(${t.accent}) 50%, transparent)`,
                    color: `hsl(${t.accent})`,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              <div className="min-w-0">
                <p className="font-display text-[11px] font-black uppercase leading-tight text-foreground">
                  {t.name}
                </p>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: `hsl(${t.accent})` }}>
                  {t.region} Zone
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* desktop: 3D carousel */}
        <div className="relative mt-14 hidden sm:block">
          <div
            className="relative h-135 lg:h-142.5 perspective-[1400px] cursor-grab active:cursor-grabbing touch-pan-y select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
          >
            {TEAMS.map((t, i) => {
              const total = TEAMS.length;
              let offset = i - active;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;
              const abs = Math.abs(offset);
              const isActive = offset === 0;

              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`${t.name} franchise`}
                  aria-hidden={abs > layout.visible}
                  className="absolute left-1/2 top-1/2 w-65 rounded-2xl border text-left transition-all duration-500 ease-out lg:w-70"
                  style={{
                    transform: `translate(-50%, -50%) translateX(${offset * layout.spread}px) scale(${isActive ? 1 : Math.max(0.74, 0.9 - abs * 0.03)
                      }) rotateY(${offset * -4}deg)`,
                    zIndex: 20 - abs,
                    opacity: abs > layout.visible ? 0 : isActive ? 1 : Math.max(0.35, 1 - abs * 0.18),
                    pointerEvents: abs > layout.visible ? "none" : "auto",
                    borderColor: isActive
                      ? "color-mix(in oklab, var(--gold) 75%, transparent)"
                      : `color-mix(in oklab, hsl(${t.accent}) 40%, transparent)`,
                    background: `linear-gradient(165deg, color-mix(in oklab, hsl(${t.accent}) 14%, var(--ink)) 0%, var(--ink) 62%)`,
                    boxShadow: isActive
                      ? `0 30px 70px -28px color-mix(in oklab, var(--gold) 65%, transparent), 0 0 0 1px color-mix(in oklab, var(--gold) 18%, transparent) inset`
                      : "0 20px 46px -30px rgba(0,0,0,0.9)",
                    filter: isActive ? "none" : "saturate(0.85)",
                  }}
                >
                  <div className="flex h-full flex-col items-center px-5 py-6">
                    {/* header row */}
                    <div className="flex w-full items-center justify-between">
                      <span className="text-[11px] font-semibold tracking-[0.18em] text-foreground/45">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.22em]"
                        style={{
                          background: `color-mix(in oklab, hsl(${t.accent}) 18%, transparent)`,
                          color: `hsl(${t.accent})`,
                          border: `1px solid color-mix(in oklab, hsl(${t.accent}) 35%, transparent)`,
                        }}
                      >
                        {t.region} Zone
                      </span>
                    </div>

                    {/* logo / placeholder */}
                    <div className="relative mt-3 grid h-36 w-full place-items-center">
                      {/* glow behind logo */}
                      <span
                        className="absolute inset-0 rounded-2xl blur-3xl opacity-20"
                        style={{ background: `hsl(${t.accent})` }}
                        aria-hidden
                      />
                      {t.logo ? (
                        <img
                          src={t.logo}
                          alt={`${t.name} logo`}
                          loading="eager"
                          fetchPriority="high"
                          className="relative h-36 w-full object-contain"
                          style={{ filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.7))" }}
                        />
                      ) : (
                        <span
                          className="relative grid h-32 w-32 place-items-center rounded-2xl text-2xl font-black"
                          style={{
                            border: `1px solid color-mix(in oklab, hsl(${t.accent}) 40%, transparent)`,
                            color: `hsl(${t.accent})`,
                            background: `radial-gradient(circle, color-mix(in oklab, hsl(${t.accent}) 12%, transparent), transparent)`,
                          }}
                        >
                          ?
                        </span>
                      )}
                    </div>

                    <h3 className="display-title-extended mt-3 text-center text-xl leading-tight text-foreground lg:text-2xl">
                      {t.name}
                    </h3>

                    <p
                      className="mt-1 text-[9px] font-bold uppercase tracking-[0.28em]"
                      style={{ color: `hsl(${t.accent})` }}
                    >
                      {t.district}
                    </p>

                    <span className="my-4 h-px w-full bg-foreground/10" />

                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-foreground/50">
                      Franchise Owner
                    </p>
                    <p className="mt-1 text-center text-[12px] font-semibold text-foreground/65">
                      To Be Announced
                    </p>

                    <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/55">
                      <MapPin className="h-3.5 w-3.5" style={{ color: `hsl(${t.accent})` }} />
                      {t.district}, Tamil Nadu
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* arrows */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous team"
            className="absolute left-0 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-gold/50 bg-ink/70 text-gold transition-colors hover:bg-gold hover:text-primary-foreground sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next team"
            className="absolute right-0 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-gold/50 bg-ink/70 text-gold transition-colors hover:bg-gold hover:text-primary-foreground sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {TEAMS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to ${t.name}`}
                className="h-2 w-2 rounded-full transition-all"
                style={{
                  background: i === active ? "var(--gold)" : "color-mix(in oklab, var(--foreground) 30%, transparent)",
                  transform: i === active ? "scale(1.4)" : "none",
                }}
              />
            ))}
          </div>
        </div>



        {/* bottom CTA — auction feature card */}
        <div className="stat-card relative mt-14 overflow-hidden rounded-3xl text-center sm:mt-16">
          <div className="relative px-8 py-12 sm:px-14 sm:py-16">
            {/* star eyebrow */}
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-linear-to-r from-transparent to-gold/60" />
              <span className="text-gold animate-star-pickleball" style={{ fontSize: "1.1rem" }}>&#9733;</span>
              <span className="h-px w-12 bg-linear-to-l from-transparent to-gold/60" />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-foreground/55">
              Franchise identities revealed at
            </p>

            <h3
              className="display-title-extended mt-3 text-foreground"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3.4rem)" }}
            >
              The Grand Player Auction
            </h3>

            <div className="mt-3 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gold/50" />
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-gold">
                4 August 2026
              </p>
              <span className="h-px w-8 bg-gold/50" />
            </div>

            <p
              className="mx-auto mt-5 max-w-md text-[13px] leading-relaxed text-foreground/80 sm:text-sm"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              ITC Grand Chola, Chennai. Each franchise owner picks a district, builds their
              14-player squad, and a name is born.
            </p>

            <div className="mt-8 flex justify-center">
              <a
                href="https://www.youtube.com/channel/UCE_hcfY87sko-R60DCXnYzg"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-[0.18em]"
              >
                Watch the Auction Live
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
