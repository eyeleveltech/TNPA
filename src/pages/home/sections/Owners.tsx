import { Star, Building2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";

import vikramImg from "@/assets/vikram_final.webp";
import keerthiImg from "@/assets/keerthi_final.webp";
import varalaxmiImg from "@/assets/varalaxmi_final.webp";
import suriyaImg from "@/assets/suriya.webp";
import uttamImg from "@/assets/uttam_kothari.webp";
import manikandanImg from "@/assets/mv_manikandan.webp";
import manuranjithImg from "@/assets/manuranjith.webp";
import samarjitImg from "@/assets/samarjit_baskaran.webp";
import dineshImg from "@/assets/dinesh_kumar_amudhan.webp";
import rithikaImg from "@/assets/rithika.webp";
import arjunImg from "@/assets/arjun.webp";
import mohamedImg from "@/assets/mohamed_gani_faizal.webp";
import sarveshImg from "@/assets/sarvesh_shashi.webp";
import abishekImg from "@/assets/abishek_murali.webp";
import atulImg from "@/assets/atul_jain.webp";
import abhayImg from "@/assets/abhay_meganathan.webp";

const FRANCHISE_OWNERS = [
  {
    name: "Chiyaan Vikram",
    type: "Celebrity Owner",
    category: "Actor",
    accent: "45 90% 58%",
    initial: "V",
    image: vikramImg,
    team: "Cuddalore Kings",
  },
  {
    name: "Varalaxmi Sarathkumar",
    type: "Celebrity Owner",
    category: "Actor",
    accent: "325 85% 62%",
    initial: "VS",
    image: varalaxmiImg,
    team: "Chennai Tamizh Titans",
  },
  {
    name: "Keerthi Pandian",
    type: "Celebrity Owner",
    category: "Actor",
    accent: "0 80% 58%",
    initial: "KP",
    image: keerthiImg,
    team: "Nellai Superstars",
  },
  // 4 New Owners
  {
    name: "Surya",
    type: "Franchise Owner",
    category: "Goplay",
    accent: "355 85% 58%", // Madurai
    initial: "S",
    image: suriyaImg,
    team: "Madurai All Stars",
  },
  {
    name: "Uttam Kothari",
    type: "Franchise Owner",
    category: "Destiiny Inventure LLP",
    accent: "175 80% 55%", // Nellai
    initial: "UK",
    image: uttamImg,
    team: "Nellai Superstars",
  },
  {
    name: "MV Manikandan",
    type: "Franchise Owner",
    category: "Adissia Developers",
    accent: "355 85% 58%", // Madurai
    initial: "MM",
    image: manikandanImg,
    team: "Madurai All Stars",
  },
  {
    name: "Manuranjith Ranganathan",
    type: "Franchise Owner",
    category: "CavinKare",
    accent: "270 80% 65%", // Cuddalore
    initial: "MR",
    image: manuranjithImg,
    team: "Cuddalore Kings",
  },
  {
    name: "Dr. Samarjit Baskaran",
    type: "Franchise Owner",
    category: "Gorilla Smash Club",
    accent: "205 85% 62%", // Hosur
    initial: "SB",
    image: samarjitImg,
    team: "Twin Eagles Hosur",
  },
  {
    name: "Arjun Narendran",
    type: "Franchise Owner",
    category: "Coimbatore Super Smashers",
    accent: "15 90% 60%", // Coimbatore
    initial: "AN",
    image: arjunImg,
    team: "Coimbatore Smashers",
  },
  {
    name: "Rithika Ramakrishnan",
    type: "Franchise Owner",
    category: "Coimbatore Super Smashers",
    accent: "15 90% 60%", // Coimbatore
    initial: "RR",
    image: rithikaImg,
    team: "Coimbatore Smashers",
  },
  {
    name: "Mohamed Gani Faizal",
    type: "Franchise Owner",
    category: "Millennials Movie Production LLP",
    accent: "32 95% 60%", // Kodai
    initial: "MF",
    image: mohamedImg,
    team: "Kodai Tigers",
  },
  {
    name: "Sarvesh Shashi",
    type: "Franchise Owner",
    category: "ABC Studios",
    accent: "210 50% 50%", // TBA
    initial: "SS",
    image: sarveshImg,
    team: "",
  },
  {
    name: "Dinesh Kumar Amudhan",
    type: "Franchise Owner",
    category: "Entrepreneur",
    accent: "195 85% 55%", // Salem
    initial: "DA",
    image: dineshImg,
    team: "Salem Super Smashers",
  },
  {
    name: "Abhishek Murali",
    type: "Franchise Owner",
    category: "Geetham Veg Restaurant",
    accent: "128 70% 52%", // Ooty
    initial: "AM",
    image: abishekImg,
    team: "Ooty Bisons",
  },
  {
    name: "Atul Jain",
    type: "Franchise Owner",
    category: "Kiran Global Group",
    accent: "22 85% 58%", // Rockfort
    initial: "AJ",
    image: atulImg,
    team: "Rockfort Terminatrz",
  },
  {
    name: "Abhay Meganathan",
    type: "Franchise Owner",
    category: "Rajalakshmi Institutions",
    accent: "150 75% 52%", // Kanchi
    initial: "AM",
    image: abhayImg,
    team: "Kanchi Blackbucks",
  },
];

export function Owners() {
  return (
    <section id="owners" className="relative overflow-hidden bg-background py-10 sm:py-12 lg:py-14 border-t border-white/5">
      {/* ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, color-mix(in oklab, var(--gold) 7%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
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
                Our Franchise Owners
              </span>
              <span className="h-px w-10 bg-gold/50 sm:w-16" />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <h2 className="display-title-extended mt-4 text-[clamp(2.4rem,6.5vw,4.2rem)]">
              <span className="block text-foreground">The People</span>
              <span className="text-gold-gradient block">Behind The League</span>
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p
              className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-[15px]"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              TNPPL Season 2 is powered by an extraordinary lineup of franchise owners — Tamil cinema
              icons, leading corporates, and institutions committed to growing the sport.
            </p>
          </Reveal>
          <div className="mt-4 flex items-center justify-center gap-3" aria-hidden>
            <span className="h-px w-20 bg-gold/40" />
            <span className="text-xs text-gold animate-star-pickleball">★</span>
            <span className="h-px w-20 bg-gold/40" />
          </div>
        </div>

        {/* ── Franchise Owners Grid ── */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {FRANCHISE_OWNERS.map((owner, idx) => (
            <div
              key={idx}
              className="stat-card group relative flex flex-col overflow-hidden rounded-2xl p-2.5 sm:p-5 transition-all duration-300 hover:border-gold/60 hover:shadow-[0_15px_35px_-10px_rgba(234,179,8,0.25)]"
              style={{
                borderColor: "color-mix(in oklab, var(--gold) 30%, transparent)",
                background: "linear-gradient(165deg, color-mix(in oklab, var(--gold) 8%, var(--ink)) 0%, var(--ink) 65%)",
              }}
            >
              {/* Image Frame with Full Cover Image */}
              <div className="relative flex items-center justify-center aspect-square sm:aspect-auto sm:h-80 lg:h-84 w-full overflow-hidden rounded-xl bg-[#021026] border border-gold/30">
                {owner.image ? (
                  <img
                    src={owner.image}
                    alt={owner.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center opacity-30">
                    <span className="font-display text-2xl sm:text-4xl font-black text-white/50">
                      TBA
                    </span>
                  </div>
                )}
              </div>

              {/* Details Centered Below Image */}
              <div className="mt-2.5 sm:mt-4 flex flex-1 flex-col justify-between items-center text-center p-1 sm:p-2">
                <div className="flex flex-col items-center w-full">
                  <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.24em] text-gold">
                    {owner.type}
                  </span>
                  <h3 className="mt-1 text-xs font-bold leading-tight text-foreground transition-colors group-hover:text-gold sm:text-xl min-h-[2.2rem] sm:min-h-11 flex items-center justify-center text-center">
                    {owner.name}
                  </h3>
                  <p
                    className="mt-1 flex items-center justify-center gap-1 text-[10px] sm:text-xs text-foreground/80 min-h-6 sm:min-h-7 text-center"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    {owner.category === "Actor" ? (
                      <Star className="h-3 w-3 shrink-0 text-gold" strokeWidth={1.5} />
                    ) : (
                      <Building2 className="h-3 w-3 shrink-0 text-gold" strokeWidth={1.5} />
                    )}
                    <span className="line-clamp-2">{owner.category}</span>
                  </p>
                </div>
                <span className="mt-2 sm:mt-3.5 inline-block rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider sm:tracking-[0.18em] text-gold whitespace-nowrap max-w-full overflow-hidden text-ellipsis">
                  {owner.team || "District Franchise TBA"}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// Sync refresh
