import { useState } from "react";
import { Calendar, ChevronRight, Megaphone, Search, Trophy, Users2, Handshake, Star, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import TNPA_LOGO from "@/assets/TNPA LOGO (1).webp";
import SDAT_LOGO from "@/assets/SDAT New English Logo.2109c9b437628e4b77e4.webp";
import TNPPL_LOGO from "@/assets/Tnppl.webp";
import TNPPL_SEASON2 from "@/assets/tnppl_season2.webp";
import TEAM_PHOTO from "@/assets/TEAM.jpg.webp";
import TEAM_LOGO_1 from "@/assets/Team_Logos-01.webp";
import TEAM_LOGO_2 from "@/assets/Team_Logos-02.webp";
import ABOUT_PHOTO from "@/assets/tnppl-about-team.jpg";

const CATEGORIES = ["All News", "Announcements", "Tournament", "Teams", "Players", "Partners"];

const ARTICLES = [
  {
    tag: "Announcement",
    title: "TNPPL Season 2 Officially Launched!",
    excerpt:
      "The stage is set for bigger battles, stronger teams, and unforgettable moments.",
    date: "05 July 2026",
    icon: Megaphone,
    accent: "45 90% 58%",
    featured: true,
  },
  {
    tag: "Tournament",
    title: "Grand Player Auction at ITC Grand Chola",
    excerpt: "Franchise owners. Top talents. One incredible auction — date to be announced.",
    date: "Coming Soon",
    icon: Trophy,
    accent: "45 90% 58%",
  },
  {
    tag: "Tournament",
    title: "Express Avenue Atrium Ready to Host the Action",
    excerpt: "One iconic venue. Four days of non-stop pickleball.",
    date: "28 June 2026",
    icon: Star,
    accent: "190 85% 58%",
  },
  {
    tag: "Players",
    title: "Top 168 Players Locked In",
    excerpt: "Talent from across Tamil Nadu gears up for glory.",
    date: "25 June 2026",
    icon: Users2,
    accent: "120 70% 55%",
  },
  {
    tag: "Teams",
    title: "12 Franchises. One Championship.",
    excerpt: "Meet the powerhouse teams competing this season.",
    date: "22 June 2026",
    icon: Trophy,
    accent: "300 80% 62%",
  },
  {
    tag: "Partners",
    title: "Brand Collaboration Enquiries Now Open",
    excerpt: "Title sponsorship and brand collaboration slots are available for Season 2.",
    date: "20 June 2026",
    icon: Handshake,
    accent: "45 95% 55%",
  },
];

export function News() {
  const [activeTab, setActiveTab] = useState("All News");
  const [search, setSearch] = useState("");

  const featured = ARTICLES[0];
  const rest = ARTICLES.slice(1);

  return (
    <section id="news" className="relative overflow-hidden bg-background py-10 sm:py-12 lg:py-14">
      {/* ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(65% 50% at 70% 0%, color-mix(in oklab, var(--gold) 8%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
        {/* heading */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/50 sm:w-16" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
              News &amp; Updates
            </span>
            <span className="h-px w-10 bg-gold/50 sm:w-16" />
          </div>
          <h2 className="display-title-extended mt-4 text-[clamp(2.4rem,6.5vw,4.2rem)]">
            <span className="block text-foreground">Stay In</span>
            <span className="text-gold-gradient block">The Game</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-[15px]"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            The latest stories, announcements, and updates from the world of TNPPL Season 2.
          </p>
        </div>

        {/* tabs + search */}
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveTab(cat)}
                className={`rounded-lg px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-all ${
                  activeTab === cat
                    ? "bg-gold text-primary-foreground"
                    : "border border-border text-foreground/65 hover:border-gold/50 hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
            <input
              type="search"
              placeholder="Search news..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-card/60 py-2.5 pl-9 pr-4 text-[13px] text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        {/* articles grid */}
        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:grid-rows-2 lg:gap-5">
          {/* 100% Scrollable Instagram Feed */}
          <div className="stat-card relative flex flex-col overflow-hidden rounded-2xl p-4 sm:p-5 lg:row-span-2">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 shrink-0">
                  <img
                    src={TNPA_LOGO}
                    alt="TNPA Instagram"
                    className="h-9 w-9 rounded-full bg-card object-contain p-0.5"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="text-xs font-bold text-foreground">tamilnadupickleball.assn</h3>
                    <svg className="h-3.5 w-3.5 text-blue-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <p className="text-[10px] text-foreground/60" style={{ fontFamily: "Arial, sans-serif" }}>
                    Official Instagram Feed • 593 Posts
                  </p>
                </div>
              </div>
              <a
                href="https://www.instagram.com/tamilnadupickleball.assn/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-1 rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider shrink-0"
              >
                <Instagram className="h-3 w-3" />
                Follow
              </a>
            </div>

            {/* Official Live Instagram Feed (Cropped Header + Zero White Space Below Posts) */}
            <div className="relative w-full flex-1 h-[310px] sm:h-[320px] rounded-xl overflow-y-auto overflow-x-hidden bg-[#0a0f1d] border border-border/60 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gold/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-card/40">
              <iframe
                src="https://www.instagram.com/tamilnadupickleball.assn/embed/"
                title="Tamil Nadu Pickleball Association Live Instagram Feed"
                className="w-full border-0 bg-[#0a0f1d] -mt-[168px] h-[480px]"
                allowTransparency={true}
                allow="encrypted-media"
                scrolling="yes"
              />
            </div>

            {/* Footer link */}
            <div className="mt-3 text-center border-t border-border pt-2.5">
              <a
                href="https://www.instagram.com/tamilnadupickleball.assn/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-widest"
              >
                View All 593+ Posts on Instagram &rarr;
              </a>
            </div>
          </div>

          {/* secondary articles */}
          {rest.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.title}
                className="stat-card group flex items-start gap-4 rounded-xl p-5"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: `color-mix(in oklab, hsl(${a.accent}) 14%, var(--card))`,
                    border: `1px solid color-mix(in oklab, hsl(${a.accent}) 30%, transparent)`,
                  }}
                >
                  <Icon
                    className="h-6 w-6"
                    style={{ color: `hsl(${a.accent})` }}
                    strokeWidth={1.5}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[9px] font-bold uppercase tracking-[0.26em]"
                    style={{ color: `hsl(${a.accent})` }}
                  >
                    {a.tag}
                  </p>
                  <h3 className="mt-1 text-[15px] font-bold leading-snug text-foreground">
                    {a.title}
                  </h3>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-foreground/60">{a.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="flex items-center gap-1 text-[10px] text-foreground/40">
                      <Calendar className="h-3 w-3" />
                      {a.date}
                    </p>
                    <a
                      href="#news"
                      className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold hover:text-gold/80"
                    >
                      Read More &rarr;
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* newsletter strip */}
        <div className="stat-card mt-12 grid gap-6 rounded-2xl px-6 py-8 sm:px-10 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold lg:flex">
            <Megaphone className="h-7 w-7" strokeWidth={1.4} aria-hidden />
          </div>
          <div>
            <h3 className="display-title-extended text-xl text-foreground sm:text-2xl">
              Never Miss an Update
            </h3>
            <p className="mt-1 text-[13px] text-foreground/60">
              Subscribe to our newsletter for exclusive updates, news, and behind-the-scenes stories.
            </p>
          </div>
          <form
            className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full rounded-lg border border-border bg-card/60 px-4 py-2.5 text-[13px] text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none sm:w-64"
            />
            <button
              type="submit"
              className="btn-gold inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em]"
            >
              Subscribe
              <ChevronRight className="h-4 w-4" />
            </button>
          </form>
        </div>


      </div>
    </section>
  );
}
