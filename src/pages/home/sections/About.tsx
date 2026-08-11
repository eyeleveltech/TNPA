import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  MapPin,
  Star,
} from "lucide-react";

import teamPhoto from "@/assets/TEAM-optimized.webp";

import sdatNewLogo from "@/assets/SDAT New English Logo.2109c9b437628e4b77e4.webp";
import ipaLogoImg from "@/assets/ipa.webp";

import TNPA_LOGO from "@/assets/TNPA LOGO (1).webp";
import { Reveal } from "@/components/Reveal";

const SDAT_LOGO = sdatNewLogo;
const IPA_LOGO = ipaLogoImg;

import mohitPhoto from "@/assets/worked/Mr._Mohit_Kumar.webp";
import kavyaPhoto from "@/assets/worked/Dr._Kavya_Somesh.webp";
import ganeshPhoto from "@/assets/worked/Mr._Ganesh.webp";
import petuliaPhoto from "@/assets/worked/Ms._Petulia_Balaji.webp";
import muraliPhoto from "@/assets/worked/Mr._Murali.webp";
import yogeshPhoto from "@/assets/worked/Mr._Yogesh_Ramchandhani.webp";

export const BOARD_MEMBERS = [
  {
    id: 1,
    name: "Mr. Mohit Kumar",
    role: "President",
    badge: "President",
    initials: "MK",
    photo: mohitPhoto,
    objectPosition: "center 15%",
    scale: 1,
  },
  {
    id: 2,
    name: "Dr. Kavya Somesh",
    role: "Secretary",
    badge: "Secretary",
    initials: "KS",
    photo: kavyaPhoto,
    objectPosition: "center 15%",
    scale: 1,
  },
  {
    id: 3,
    name: "Mr. Ganesh",
    role: "Treasurer",
    badge: "Treasurer",
    initials: "G",
    photo: ganeshPhoto,
    objectPosition: "center 15%",
    scale: 1,
  },
  {
    id: 4,
    name: "Ms. Petulia Balaji",
    role: "Founding Member",
    badge: "Founding Member",
    initials: "PB",
    photo: petuliaPhoto,
    objectPosition: "center 15%",
    scale: 1,
  },
  {
    id: 5,
    name: "Mr. Murali",
    role: "Founding Member",
    badge: "Founding Member",
    initials: "M",
    photo: muraliPhoto,
    objectPosition: "center 15%",
    scale: 1,
  },
  {
    id: 6,
    name: "Mr. Yogesh Ramchandhani",
    role: "Founding Member",
    badge: "Founding Member",
    initials: "YR",
    photo: yogeshPhoto,
    objectPosition: "center 15%",
    scale: 1,
  },
];

/* Franchise and player counts live in the hero strip and, with context, in
   the Teams and Players sections. Restating them here made the same four
   numbers the fourth stat block on one page. What is left is what only this
   section says: how long it runs and who sanctions it. */
const STATS = [
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
    copy: "The official state league. Nothing unofficial about it.",
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

      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">

        {/* ---------- Eyebrow ---------- */}
        <div className="text-center">
          <Reveal delay={60}>
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gold/50 sm:w-16" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
                About TNPPL
              </span>
              <span className="h-px w-10 bg-gold/50 sm:w-16" />
            </div>
          </Reveal>
        </div>


        {/* ---------- More than a league heading & content ---------- */}
        <div className="text-center">
          <Reveal delay={140}>
            <h2 className="display-title-extended mt-4 text-[clamp(2.1rem,6.2vw,4.1rem)]">
              <span className="block text-foreground">More than a league<span style={{ fontFamily: "Arial, sans-serif" }}>.</span></span>
              <span className="text-gold-gradient block">
                It<span style={{ fontFamily: "Arial, sans-serif" }}>&rsquo;</span>s a movement<span style={{ fontFamily: "Arial, sans-serif" }}>.</span>
              </span>
            </h2>
          </Reveal>

          <Reveal delay={220}>
            <div className="mx-auto mt-6 flex items-center justify-center gap-3" aria-hidden="true">
              <span className="h-px w-24 bg-linear-to-r from-transparent to-gold/70" />
              <span className="text-xs text-gold animate-star-pickleball">&#9733;</span>
              <span className="h-px w-24 bg-linear-to-l from-transparent to-gold/70" />
            </div>
          </Reveal>

          <Reveal delay={300}>
            <p
              className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-foreground/80 sm:text-[15px]"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Twelve districts, twelve franchises, twelve stories. Owners who believe in this
              sport, sponsors who back it, and players who leave everything on the court for
              their team&rsquo;s colors. TNPPL isn&rsquo;t just a tournament. It&rsquo;s where
              community becomes competition, and competition becomes family.
            </p>
          </Reveal>
        </div>

        {/* ---------- feature photo ---------- */}
        <Reveal delay={400}>
          <div
            className="relative mt-8 overflow-hidden lg:mt-10"
            style={{
              borderRadius: "1.5rem",
              border: "1px solid color-mix(in oklab, var(--gold) 20%, transparent)",
            }}
          >
            <img
              src={teamPhoto}
              alt="TNPPL players in navy and gold jerseys celebrating together on court"
              width={1280}
              height={480}
              loading="lazy"
              decoding="async"
              className="h-56 w-full object-cover sm:h-72 lg:h-96"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, color-mix(in oklab, var(--ink) 65%, transparent), transparent 60%), linear-gradient(to top, color-mix(in oklab, var(--ink) 40%, transparent), transparent 40%)",
              }}
            />
          </div>
        </Reveal>

        {/* ONE GAME. ONE FAMILY. tagline */}
        <div className="mt-8 mb-6 flex items-center justify-center gap-3 text-center">
          <span className="text-xs text-gold animate-star-pickleball">★</span>
          <h3 className="display-title text-2xl sm:text-3xl lg:text-4xl">
            <span className="text-foreground">One </span>
            <span className="text-gold-gradient">Game</span>
            <span className="text-foreground" style={{ fontFamily: "Arial, sans-serif" }}>. </span>
            <span className="text-foreground">One </span>
            <span className="text-gold-gradient">Family</span>
            <span className="text-foreground" style={{ fontFamily: "Arial, sans-serif" }}>.</span>
          </h3>
          <span className="text-xs text-gold animate-star-pickleball">★</span>
        </div>

        {/* ---------- stats ---------- */}
        <Reveal delay={500}>
          <div ref={statsRef} className="mt-14 grid gap-8 border-t border-border pt-12 sm:grid-cols-2 lg:mt-16 lg:gap-0">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`flex min-w-0 items-start gap-3 lg:gap-2 xl:gap-5 lg:px-3 xl:px-7 ${i > 0 ? "lg:border-l lg:border-border" : ""}`}
              >
                {/* luxury double-ring icon */}
                <span
                  className={`relative grid h-12 w-12 sm:h-16 sm:w-16 lg:h-12 lg:w-12 xl:h-16 xl:w-16 shrink-0 place-items-center rounded-full ${
                    inView ? "animate-icon-loop" : ""
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
                    <p className="text-xl sm:text-2xl lg:text-lg xl:text-2xl font-bold text-gold leading-tight" style={{ fontFamily: "Arial, sans-serif" }}>{s.value}</p>
                    <p className="text-xs sm:text-sm lg:text-xs xl:text-sm font-semibold text-foreground mt-0.5 whitespace-nowrap" style={{ fontFamily: "Arial, sans-serif" }}>{s.label}</p>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-foreground/80" style={{ fontFamily: "Arial, sans-serif" }}>{s.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ---------- partners ---------- */}
        <Reveal delay={600}>
          <div
            className="stat-card mt-14 grid gap-8 rounded-2xl px-6 py-8 sm:px-10 xl:px-4 2xl:px-10 lg:grid-cols-3 lg:gap-0"
          >
            <div className="flex w-full justify-center">
              <div className="flex flex-col items-center gap-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold text-center w-full">
                  Organized by
                </p>
                <div className="flex items-center gap-4 text-left lg:gap-6">
                  <img
                    src={TNPA_LOGO}
                    alt="Tamil Nadu Pickleball Association logo"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="h-16 w-auto shrink-0"
                  />
                </div>
              </div>
            </div>

            <div className="flex w-full justify-center border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pt-0">
              <div className="flex flex-col items-center gap-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold text-center w-full">
                  Affiliated with
                </p>
                <div className="flex items-center gap-4 text-left lg:gap-6">
                  <img
                    src={IPA_LOGO}
                    alt="Indian Pickleball Association logo"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="h-16 w-auto shrink-0"
                  />
                </div>
              </div>
            </div>

            <div className="flex w-full justify-center border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pt-0">
              <div className="flex flex-col items-center gap-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold text-center w-full">
                  Co-sanctioned by
                </p>
                <div className="flex items-center gap-4 text-left lg:gap-6">
                  <img
                    src={SDAT_LOGO}
                    alt="Sports Development Authority of Tamil Nadu logo"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="h-16 w-auto shrink-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ========================================================= */}
        {/* ---------- THE TNPA BOARD (Between About TNPPL & More Than A League) ---------- */}
        {/* ========================================================= */}
        <div className="mt-8 sm:mt-10 mb-16 sm:mb-20 text-center">
          <Reveal delay={100}>
            <h2 className="display-title-extended text-[clamp(2.4rem,6.5vw,4.2rem)] flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3">
              <span className="text-foreground">THE</span>
              <span className="text-gold-gradient">TNPA</span>
              <span className="text-foreground">BOARD</span>
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p
              className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-[15px]"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Visionaries committed to building a stronger Pickleball community
            </p>
          </Reveal>

          <div className="mt-4 flex items-center justify-center gap-3" aria-hidden>
            <span className="h-px w-20 bg-gold/40" />
            <span className="text-xs text-gold animate-star-pickleball">★</span>
            <span className="h-px w-20 bg-gold/40" />
          </div>

          {/* ── Franchise Owners Style Grid (3 Cards Per Row) ── */}
          <div className="mt-10 sm:mt-12 grid grid-cols-2 gap-3.5 sm:gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {BOARD_MEMBERS.map((member, idx) => (
              <Reveal key={member.id} delay={idx * 60}>
                <div
                  className="stat-card group relative flex flex-col overflow-hidden rounded-2xl p-2.5 sm:p-5 transition-all duration-300 hover:border-gold/60 hover:shadow-[0_15px_35px_-10px_rgba(234,179,8,0.25)] h-full text-left"
                  style={{
                    borderColor: "color-mix(in oklab, var(--gold) 30%, transparent)",
                    background: "linear-gradient(165deg, color-mix(in oklab, var(--gold) 8%, var(--ink)) 0%, var(--ink) 65%)",
                  }}
                >
                  {/* Image Frame with Full Cover Image / Monogram Placeholder */}
                  <div className="relative flex items-center justify-center aspect-square sm:aspect-auto sm:h-72 lg:h-80 w-full overflow-hidden rounded-xl bg-[#021026] border border-gold/30">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{
                          objectPosition: member.objectPosition || "center",
                          transform: member.scale && member.scale !== 1 ? `scale(${member.scale})` : undefined
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full w-full bg-linear-to-br from-white/5 via-ink to-ink p-4">
                        {/* Glow behind monogram */}
                        <span className="absolute inset-0 rounded-full blur-3xl opacity-20 bg-gold" aria-hidden />
                        <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border-2 border-gold/40 bg-gold/10 shadow-[0_0_25px_rgba(212,175,55,0.2)]">
                          <span className="text-3xl sm:text-4xl font-extrabold tracking-wider text-gold-gradient">
                            {member.initials}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Details Centered Below Image */}
                  <div className="mt-2.5 sm:mt-4 flex flex-1 flex-col justify-between items-center text-center p-1 sm:p-2">
                    <div className="flex flex-col items-center w-full">
                      <h3 className="text-xs font-bold leading-tight text-foreground transition-colors group-hover:text-gold sm:text-xl min-h-[2.2rem] sm:min-h-11 flex items-center justify-center text-center">
                        {member.name}
                      </h3>
                      <span className="mt-1 text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.16em] sm:tracking-[0.24em] text-gold">
                        {member.role}
                      </span>
                      <p
                        className="mt-1 flex items-center justify-center gap-1 text-[10px] sm:text-xs text-foreground/80 min-h-6 sm:min-h-7 text-center"
                        style={{ fontFamily: "Arial, sans-serif" }}
                      >
                        <Star className="h-3 w-3 shrink-0 text-gold" strokeWidth={1.5} />
                        <span className="line-clamp-2">Tamil Nadu Pickleball Association</span>
                      </p>
                    </div>
                    <span className="mt-2 sm:mt-3.5 inline-block rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider sm:tracking-[0.18em] text-gold whitespace-nowrap max-w-full overflow-hidden text-ellipsis">
                      TNPA Board
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Divider leading into More than a league */}
          <div className="mx-auto mt-14 sm:mt-16 flex items-center justify-center gap-4 max-w-2xl opacity-60">
            <span className="h-px flex-1 bg-linear-to-r from-transparent to-gold/50" />
            <span className="text-xs text-gold animate-star-pickleball">&#9733;</span>
            <span className="h-px flex-1 bg-linear-to-l from-transparent to-gold/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
