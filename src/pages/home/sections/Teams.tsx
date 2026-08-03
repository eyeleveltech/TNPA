import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Building2,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AUCTION_STREAM_URL } from "@/lib/auction";


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

/**
 * Team + owner are ONE record on purpose.
 *
 * These used to be two arrays in two files (TEAMS here, FRANCHISE_OWNERS in
 * Owners.tsx) with nothing keeping them in sync. They drifted: an orphaned
 * "Sarvesh Shashi / District Franchise TBA" card belonged to no team, Ramnad
 * Royals had no owner entry at all, and Rithika's surname was spelled two
 * different ways. Keeping owners nested under their team makes that class of
 * bug structurally impossible rather than something to re-audit each time.
 */
type Owner = {
  name: string;
  /** Company or role shown under the name. */
  affiliation: string;
  /** Drives the Star vs Building2 glyph. */
  isCelebrity?: boolean;
};

type Team = {
  name: string;
  district: string;
  region: string;
  accent: string;
  logo: string | null;
  owners: Owner[];
};

/** Order matches the confirmed Season 2 roster. */
const TEAMS: Team[] = [
  {
    name: "Kanchi Blackbucks",
    district: "Kanchipuram",
    region: "North",
    accent: "150 75% 52%",
    logo: logoKanchi,
    owners: [
      {
        name: "Abhay Meganathan",
        affiliation: "Vice Chairman, Rajalakshmi Institutions",
      },
    ],
  },
  {
    name: "Twin Eagles Hosur",
    district: "Hosur",
    region: "North",
    accent: "205 85% 62%",
    logo: logoHosur,
    owners: [
      {
        name: "Dr. Samarjit Baskaran",
        affiliation: "Owner, Gorilla Smash Club",
      },
    ],
  },
  {
    name: "Salem Super Smashers",
    district: "Salem",
    region: "West",
    accent: "195 85% 55%",
    logo: logoSalem,
    owners: [
      {
        name: "Dinesh Kumar Amudhan",
        affiliation: "Entrepreneur, Mahendra Institutions and SKS Hospital",
      },
    ],
  },
  {
    name: "Coimbatore Smashers",
    district: "Coimbatore",
    region: "West",
    accent: "15 90% 60%",
    logo: logoCoimbatore,
    owners: [
      {
        name: "Arjun Narendran",
        affiliation: "Arka Motorsport",
      },
      {
        name: "Rithika Ramakrishna",
        affiliation: "Pickleball Champion",
      },
    ],
  },
  {
    name: "Chennai Tamizh Titans",
    district: "Chennai",
    region: "North",
    accent: "190 90% 62%",
    logo: logoChennai,
    owners: [
      {
        name: "Varalaxmi Sarathkumar",
        affiliation: "Actor",
        isCelebrity: true,
      },
      {
        name: "Nova Lifespaces",
        affiliation: "Co-owner",
      },
    ],
  },
  {
    name: "Cuddalore Kings",
    district: "Cuddalore",
    region: "East",
    accent: "270 80% 65%",
    logo: logoCuddalore,
    owners: [
      {
        name: "Chiyaan Vikram",
        affiliation: "Actor",
        isCelebrity: true,
      },
      {
        name: "Manuranjith Ranganathan",
        affiliation: "Director, CavinKare",
      },
    ],
  },
  {
    name: "Rockfort Terminatrz Trichy",
    district: "Tiruchirappalli",
    region: "Central",
    accent: "22 85% 58%",
    logo: logoRockfort,
    owners: [
      {
        name: "Atul Jain",
        affiliation: "Kiran Global Group",
      },
    ],
  },
  {
    name: "Ooty Bisons",
    district: "Nilgiris",
    region: "West",
    accent: "128 70% 52%",
    logo: logoOoty,
    owners: [
      {
        name: "Abhishek Murali",
        affiliation: "Restaurateur, Geetham Veg Restaurant",
      },
    ],
  },
  {
    name: "Ramnad Royals",
    district: "Ramanathapuram",
    region: "South",
    accent: "198 85% 58%",
    logo: logoRamnad,
    owners: [
      { name: "Naagarjun Sethupathy", affiliation: "Franchise Owner" },
      { name: "Sneha Sethupathy", affiliation: "Franchise Owner" },
    ],
  },
  {
    name: "Nellai Superstars",
    district: "Tirunelveli",
    region: "South",
    accent: "175 80% 55%",
    logo: logoNellai,
    owners: [
      {
        name: "Uttam Kothari",
        affiliation: "Entrepreneur, Destiiny Inventure LLP",
      },
      {
        name: "Keerthi Pandian",
        affiliation: "Actor",
        isCelebrity: true,
      },
    ],
  },
  {
    name: "Madurai All-Stars",
    district: "Madurai",
    region: "South",
    accent: "355 85% 58%",
    logo: logoMadurai,
    owners: [
      { name: "Surya", affiliation: "Goplay" },
      {
        name: "MV Manikandan",
        affiliation: "Adissia Developers",
      },
    ],
  },
  {
    name: "Kodai Tigers",
    district: "Kodaikanal",
    region: "West",
    accent: "32 95% 60%",
    logo: logoKodai,
    owners: [
      {
        name: "Mohamed Gani Faizal",
        affiliation: "Millennials Movie Production LLP",
      },
    ],
  },
];

function renderTeamName(name: string) {
  if (name === "Twin Eagles Hosur") {
    return (
      <>
        <span className="block">Twin Eagles</span>
        <span className="block">Hosur</span>
      </>
    );
  }
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (
      <>
        <span className="block">{parts[0]}</span>
        <span className="block">{parts.slice(1).join(" ")}</span>
      </>
    );
  }
  return name;
}

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

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);
  const [dragMoved, setDragMoved] = useState(false);
  const [wheelCooldown, setWheelCooldown] = useState(false);

  const handlePointerDown = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    touchStartRef.current = { x: clientX, y: clientY };
    touchEndRef.current = { x: clientX, y: clientY };
    isDraggingRef.current = true;
    setDragMoved(false);
  };

  const handlePointerMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDraggingRef.current || !touchStartRef.current) return;
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    touchEndRef.current = { x: clientX, y: clientY };

    const dx = Math.abs(clientX - touchStartRef.current.x);
    const dy = Math.abs(clientY - touchStartRef.current.y);

    if (dx > 10) {
      setDragMoved(true);
    }
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current || !touchStartRef.current || !touchEndRef.current) {
      isDraggingRef.current = false;
      return;
    }

    const deltaX = touchStartRef.current.x - touchEndRef.current.x;
    const deltaY = Math.abs(touchStartRef.current.y - touchEndRef.current.y);

    // Only step card if horizontal swipe distance > 25px and horizontal delta > vertical delta
    if (Math.abs(deltaX) > 25 && Math.abs(deltaX) > deltaY) {
      if (deltaX > 0) {
        go(1);
      } else {
        go(-1);
      }
    }

    isDraggingRef.current = false;
    touchStartRef.current = null;
    touchEndRef.current = null;
    setTimeout(() => setDragMoved(false), 50);
  };

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
          <Reveal delay={60}>
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gold/50 sm:w-16" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
                12 Franchises
              </span>
              <span className="h-px w-10 bg-gold/50 sm:w-16" />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <h2 className="display-title-extended mt-4 text-[clamp(2.4rem,6.5vw,4.2rem)]">
              <span className="block text-foreground">District</span>
              <span className="text-gold-gradient block">Franchises</span>
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p
              className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-[15px]"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Every franchise carries a district&rsquo;s name and an owner&rsquo;s belief.
              Meet the twelve.
            </p>
          </Reveal>
        </div>

        {/* Carousel at every width. Below 640px the layout effect sets
            {spread: 0, visible: 0}, which stacks the cards and shows only the
            active one — a single-card swipe view driven by the same touch
            handlers as desktop, with the dot indicators below. */}
        <div className="relative mt-10 sm:mt-14">
          <div
            className="relative h-131 sm:h-143.5 lg:h-148.5 perspective-[1400px] cursor-grab active:cursor-grabbing touch-pan-y select-none"
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onWheel={(e) => {
              if (wheelCooldown) return;
              // Only capture horizontal scroll (trackpad side swipe / horizontal wheel) so vertical page scroll works naturally
              if (Math.abs(e.deltaX) > 25 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                setWheelCooldown(true);
                if (e.deltaX > 0) go(1);
                else go(-1);
                setTimeout(() => setWheelCooldown(false), 250);
              }
            }}
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
                  onClick={() => {
                    if (!dragMoved) setActive(i);
                  }}
                  aria-label={`${t.name} franchise`}
                  aria-hidden={abs > layout.visible}
                  className="absolute left-1/2 top-1/2 w-66 sm:w-68 lg:w-76 h-123 sm:h-131 rounded-2xl border text-left transition-all duration-500 ease-out overflow-hidden"
                  style={{
                    transform: `translate(-50%, -50%) translateX(${offset * (layout.spread + 10)}px) scale(${isActive ? 1 : 0.88
                      })`,
                    zIndex: 20 - abs,
                    opacity: abs > layout.visible ? 0 : isActive ? 1 : Math.max(0.35, 0.85 - abs * 0.15),
                    pointerEvents: abs > layout.visible ? "none" : "auto",
                    borderColor: isActive
                      ? "color-mix(in oklab, var(--gold) 85%, transparent)"
                      : `color-mix(in oklab, hsl(${t.accent}) 40%, transparent)`,
                    background: `linear-gradient(165deg, color-mix(in oklab, hsl(${t.accent}) 14%, var(--ink)) 0%, var(--ink) 62%)`,
                    boxShadow: isActive
                      ? `0 30px 70px -28px color-mix(in oklab, var(--gold) 65%, transparent), 0 0 0 1px color-mix(in oklab, var(--gold) 18%, transparent) inset`
                      : "0 20px 46px -30px rgba(0,0,0,0.9)",
                    filter: isActive ? "none" : "saturate(0.85)",
                  }}
                >
                  <div className="flex h-full flex-col justify-between items-center px-5 py-5 text-center">
                    {/* header row */}
                    <div className="flex w-full items-center justify-between shrink-0">
                      <span className="text-[11px] font-semibold tracking-[0.18em] text-foreground/45">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* logo / placeholder */}
                    <div className="relative my-auto grid h-40 sm:h-48 w-full place-items-center shrink-0">
                      {/* glow behind logo */}
                      <span
                        className="absolute inset-0 rounded-2xl blur-3xl opacity-25"
                        style={{ background: `hsl(${t.accent})` }}
                        aria-hidden
                      />
                      {t.logo ? (
                        <img
                          src={t.logo}
                          alt={`${t.name} logo`}
                          loading="eager"
                          fetchPriority="high"
                          className="relative h-40 sm:h-48 w-full object-contain scale-125"
                          style={{ filter: "drop-shadow(0 8px 22px rgba(0,0,0,0.75))" }}
                        />
                      ) : (
                        <span
                          className="relative grid h-32 w-32 place-items-center rounded-2xl text-3xl font-black"
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

                    {/* Team Title */}
                    <div className="h-12 w-full flex flex-col items-center justify-center shrink-0">
                      <h3 className="display-title-extended text-center text-xl leading-none text-foreground lg:text-2xl">
                        {renderTeamName(t.name)}
                      </h3>
                    </div>

                    <p
                      className="mt-1 text-[9px] font-bold uppercase tracking-[0.28em] shrink-0"
                      style={{ color: `hsl(${t.accent})` }}
                    >
                      {t.district}
                    </p>

                    <span className="my-2.5 h-px w-full bg-foreground/10 shrink-0" />

                    {/* Owner block — team identity and owner identity travel
                        together on the same card. Fixed height so cards align. */}
                    <div className="h-18 w-full flex flex-col justify-start items-center shrink-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-gold/90">
                        {t.owners.length > 1 ? "Franchise Owners" : "Franchise Owner"}
                      </p>
                      <ul className="mt-2 flex w-full items-start justify-center gap-3">
                        {t.owners.map((o) => (
                          <li
                            key={o.name}
                            className="flex min-w-0 flex-1 flex-col items-center text-center"
                            style={{ maxWidth: `${100 / t.owners.length}%` }}
                          >
                            <span className="w-full text-[11px] font-bold leading-tight text-foreground line-clamp-2">
                              {o.name}
                            </span>
                            <span
                              className="mt-0.5 flex w-full items-center justify-center gap-1 text-[9px] leading-tight text-foreground/65"
                              style={{ fontFamily: "Arial, sans-serif" }}
                            >
                              {o.isCelebrity ? (
                                <Star className="h-2.5 w-2.5 shrink-0 text-gold" strokeWidth={1.5} />
                              ) : (
                                <Building2 className="h-2.5 w-2.5 shrink-0 text-gold" strokeWidth={1.5} />
                              )}
                              <span className="line-clamp-2">{o.affiliation}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
        <Reveal delay={300}>
        <div className="stat-card relative mt-14 overflow-hidden rounded-3xl text-center sm:mt-16">
          <div className="relative px-2 py-12 sm:px-14 sm:py-16">
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
              className="display-title-extended mt-3 block"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3.4rem)" }}
            >
              <span className="text-white">The Grand </span>
              <span className="text-gold-gradient">Player Auction</span>
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
                href={AUCTION_STREAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center justify-center gap-2 sm:gap-3 rounded-full px-3.5 py-3 sm:px-7 sm:py-3.5 text-[10px] sm:text-sm font-bold uppercase tracking-wider sm:tracking-[0.18em] leading-none whitespace-nowrap max-w-full"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
                    fill="currentColor"
                  />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="var(--gold)" />
                </svg>
                <span className="leading-none">Watch the Auction Live</span>
                <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              </a>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
