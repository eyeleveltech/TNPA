import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const FAQS = [
  {
    category: "About the Event",
    items: [
      {
        q: "What is TNPPL Season 2?",
        a: "The Tamil Nadu Pickleball Premier League (TNPPL) Season 2 is the state's flagship pickleball tournament, organized by the Tamil Nadu Pickleball Association (TNPA) and affiliated with SDAT. It features 12 district-based franchises, 168 players, and 30 league matches played across 4 days at the Central Atrium, Express Avenue Mall, Chennai.",
      },
      {
        q: "When and where is TNPPL Season 2?",
        a: "TNPPL Season 2 takes place from 17 to 20 September 2026 at the Central Atrium, Express Avenue Mall, Royapettah, Chennai.",
      },
      {
        q: "Is entry free for spectators?",
        a: "Yes — entry to all TNPPL Season 2 matches is completely free for the public. Come cheer for your district franchise.",
      },
      {
        q: "Which governing body organizes TNPPL?",
        a: "TNPPL is organized by the Tamil Nadu Pickleball Association (TNPA) and is officially affiliated with SDAT (Sports Development Authority of Tamil Nadu).",
      },
    ],
  },
  {
    category: "Teams & Players",
    items: [
      {
        q: "How many teams are in TNPPL Season 2?",
        a: "There are 12 district-based franchise teams representing regions across Tamil Nadu: Chennai, Kanchipuram, Vellore, Coimbatore, Salem, Nilgiris, Madurai, Kanyakumari, Thanjavur, Villupuram, Tiruchirappalli, and Karur.",
      },
      {
        q: "How many players are in each squad?",
        a: "Each franchise squad comprises 14 players: 8 Men, 3 Women, and 3 Masters (50+) category players.",
      },
      {
        q: "Who can participate as a player?",
        a: "Players are selected through the Grand Player Auction held at ITC Grand Chola, Chennai. Franchise owners bid for players from a pool of Tamil Nadu's top-ranked pickleball athletes.",
      },
      {
        q: "When is the Player Auction?",
        a: "The Grand Player Auction date will be announced shortly by TNPA. Follow @tamilnadupickleball.assn on Instagram for the latest updates.",
      },
    ],
  },
  {
    category: "Tournament Format",
    items: [
      {
        q: "What is the tournament format?",
        a: "The tournament runs in three phases: League (30 team ties over Days 1–3), Playoffs (Quarter-Finals and Semi-Finals), and Finals (Day 4 at Express Avenue Atrium).",
      },
      {
        q: "What match categories are played per tie?",
        a: "Each team tie includes Men's, Women's, and Masters (50+) matches. Full category breakdown will be published in the official tournament handbook.",
      },
      {
        q: "Where can I find the full schedule?",
        a: "The match schedule will be published on this website and the TNPA Instagram page ahead of the event.",
      },
    ],
  },
  {
    category: "Sponsorship & Partnerships",
    items: [
      {
        q: "How can my brand collaborate with TNPPL?",
        a: "TNPPL Season 2 has multiple partnership tiers available, including Title Sponsorship (₹40 Lakhs), Co-Presenting, Associate, and Sector-Exclusive sponsorships. Email tnstatepa@gmail.com with the subject 'Brand Collaboration — TNPPL Season 2' or visit the Sponsorship page for details.",
      },
      {
        q: "Is the Title Sponsorship slot still available?",
        a: "Yes — the Title Sponsorship slot is currently open. Contact us for the full Sponsorship Deck.",
      },
    ],
  },
  {
    category: "Media & Accreditation",
    items: [
      {
        q: "How can media personnel get accreditation?",
        a: "Media accreditation requests can be sent to tnstatepa@gmail.com with the subject 'Media Accreditation — TNPPL Season 2'. Please include your organization name and press credentials.",
      },
      {
        q: "Where can I download the media kit?",
        a: "The TNPPL Season 2 Media Kit including logos, press release, and brand assets is available on the Media Kit page of this website.",
      },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-[15px] font-semibold text-foreground">{q}</span>
        <ChevronDown
          className={`mt-0.5 h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-[14px] leading-relaxed text-foreground/65">{a}</p>
      )}
    </div>
  );
}

export function FAQSection() {
  return (
    <section className="py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* category nav (desktop sticky) */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/50">
                Categories
              </p>
              {FAQS.map(({ category }) => (
                <a
                  key={category}
                  href={`#${category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block text-[13px] text-foreground/55 transition-colors hover:text-gold"
                >
                  {category}
                </a>
              ))}
            </div>
          </aside>

          {/* questions */}
          <div className="space-y-12">
            {FAQS.map(({ category, items }) => (
              <div
                key={category}
                id={category.toLowerCase().replace(/\s+/g, "-")}
              >
                <h2 className="display-title text-xl text-gold sm:text-2xl">
                  {category.includes("&") ? (
                    <>
                      {category.split("&")[0]}
                      <span style={{ fontFamily: "Arial, sans-serif" }}>&amp;</span>
                      {category.split("&")[1]}
                    </>
                  ) : (
                    category
                  )}
                </h2>
                <div className="mt-4 stat-card rounded-2xl px-6 py-2">
                  {items.map(({ q, a }) => (
                    <AccordionItem key={q} q={q} a={a} />
                  ))}
                </div>
              </div>
            ))}

            {/* Still have questions */}
            <div
              className="stat-card rounded-2xl px-6 py-8 text-center sm:px-10"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--gold) 10%, var(--card)), var(--card))",
              }}
            >
              <h3 className="display-title text-xl text-foreground sm:text-2xl">
                Still Have a Question<span style={{ fontFamily: "Arial, sans-serif" }}>?</span>
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-[13px] leading-relaxed text-foreground/65">
                Reach out to the TNPPL team directly and we'll get back to you as soon as possible.
              </p>
              <a
                href="mailto:tnstatepa@gmail.com"
                className="btn-gold mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-widest"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
