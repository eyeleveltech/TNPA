import { Download, Mail, ChevronRight, Image, FileText, Film } from "lucide-react";

export const ASSETS = [
  {
    category: "Logos & Brand Identity",
    icon: Image,
    color: "45 90% 58%",
    items: [
      { name: "TNPPL Primary Logo (PNG)", size: "Transparent background, multiple sizes" },
      { name: "TNPPL Logo Reversed (White on Dark)", size: "For dark backgrounds" },
      { name: "TNPA Official Logo", size: "Organizing body" },
    ],
    note: "Available on request — email tnstatepa@gmail.com",
  },
  {
    category: "Brand Guidelines",
    icon: FileText,
    color: "190 85% 58%",
    items: [
      { name: "TNPPL Brand Identity Manual", size: "Colors, typography, usage rules" },
      { name: "Official Color Palette", size: "Navy #011837 · Gold #FFD000 · Chalk #F6F6F6" },
      { name: "Typography Guide", size: "Fontspring Podium (display) · Inter (body)" },
    ],
    note: "Available on request — email tnstatepa@gmail.com",
  },
  {
    category: "Press & Media",
    icon: FileText,
    color: "120 70% 55%",
    items: [
      { name: "Official Press Release — Season 2 Launch", size: "July 2026" },
      { name: "Event Fact Sheet", size: "Key dates, teams, format summary" },
      { name: "Franchise Owner Profiles", size: "Celebrity and corporate owners" },
      { name: "Event Schedule (When Published)", size: "17–20 September 2026" },
    ],
    note: "Available on request — email tnstatepa@gmail.com",
  },
  {
    category: "Photography & Video",
    icon: Film,
    color: "300 80% 62%",
    items: [
      { name: "Official Event Photography", size: "Available post-event" },
      { name: "TNPPL Opener / Promo Video", size: "For broadcast and social use" },
      { name: "Player Action Shots", size: "Available after Player Auction" },
    ],
    note: "High-resolution assets available to accredited media only",
  },
];

export const PRESS_CONTACTS = [
  { name: "Dr Kavya Somesh", role: "TNPA — Tournament Director", phone: "+91 98944 27793", tel: "+919894427793" },
  { name: "Yogesh Ramchandani", role: "TNPA — Operations", phone: "+91 98841 30737", tel: "+919884130737" },
];

export function MediaKitContent() {
  return (
    <section className="py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
        {/* CTA banner */}
        <div
          className="stat-card mb-12 rounded-2xl p-6 sm:flex sm:items-center sm:justify-between sm:p-8"
          style={{
            background: "linear-gradient(135deg, color-mix(in oklab, var(--gold) 12%, var(--card)), var(--card))",
          }}
        >
          <div>
            <h2 className="display-title text-xl text-foreground sm:text-2xl">
              Request the Full Media Kit
            </h2>
            <p className="mt-2 text-[14px] text-foreground/65">
              Email us with your organization name and press credentials to receive the complete asset bundle.
            </p>
          </div>
          <a
            href="mailto:tnstatepa@gmail.com?subject=Media Kit Request — TNPPL Season 2"
            className="btn-gold mt-5 inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-widest sm:mt-0"
          >
            <Mail className="h-4 w-4" />
            Request Kit
          </a>
        </div>

        {/* Asset categories */}
        <div className="grid gap-6 lg:grid-cols-2">
          {ASSETS.map(({ category, icon: Icon, color, items, note }) => (
            <div key={category} className="stat-card rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: `color-mix(in oklab, hsl(${color}) 15%, var(--card))`,
                    border: `1px solid color-mix(in oklab, hsl(${color}) 30%, transparent)`,
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color: `hsl(${color})` }} strokeWidth={1.5} />
                </div>
                <h3 className="display-title text-lg text-gold">
                  {category.includes("&") ? (
                    <>
                      {category.split("&")[0]}
                      <span style={{ fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>&amp;</span>
                      {category.split("&")[1]}
                    </>
                  ) : (
                    category
                  )}
                </h3>
              </div>
              <ul className="mt-5 space-y-3">
                {items.map(({ name, size }) => (
                  <li key={name} className="flex items-start justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-[13px] font-semibold text-foreground">{name}</p>
                      <p className="text-[11px] text-foreground/50">{size}</p>
                    </div>
                    <Download className="h-4 w-4 shrink-0 text-foreground/30 mt-0.5" />
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[11px] text-foreground/40 italic">{note}</p>
            </div>
          ))}
        </div>

        {/* Media accreditation */}
        <div className="mt-12 stat-card rounded-2xl p-6 sm:p-8">
          <h2 className="display-title text-xl text-foreground sm:text-2xl">
            Media <span className="text-gold-gradient">Accreditation</span>
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-foreground/65">
            Accredited media personnel receive access to designated press areas, photography zones, and post-match interviews. Apply with your press credentials at least 7 days before the event.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {PRESS_CONTACTS.map((c) => (
              <div key={c.name} className="rounded-xl border border-border p-4">
                <p className="text-[13px] font-bold text-foreground">{c.name}</p>
                <p className="text-[11px] text-foreground/50">{c.role}</p>
                <a
                  href={`tel:${c.tel}`}
                  className="mt-2 inline-flex items-center gap-1.5 text-[12px] text-gold hover:text-gold/80"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                  {c.phone}
                </a>
              </div>
            ))}
          </div>
          <a
            href="mailto:tnstatepa@gmail.com?subject=Media Accreditation — TNPPL Season 2"
            className="btn-outline-light mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-widest"
          >
            Apply for Accreditation
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
