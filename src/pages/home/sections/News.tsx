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
  return (
    <section id="news" className="relative overflow-hidden bg-background py-10 sm:py-12 lg:py-14">
      {/* ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(65% 50% at 50% 0%, color-mix(in oklab, var(--gold) 8%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
        {/* heading */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/50 sm:w-16" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
              Live Updates &amp; Social Feed
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
            Catch real-time official posts, match updates, and behind-the-scenes stories from TNPPL Season 2.
          </p>
        </div>

        {/* Large Centered Live Instagram Feed Card */}
        <div className="mt-10 mx-auto max-w-6xl">
          <div className="stat-card relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 sm:p-7">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <div className="flex items-center gap-3.5">
                <div className="relative p-0.5 rounded-full bg-linear-to-tr from-yellow-500 via-pink-500 to-purple-600 shrink-0">
                  <img
                    src={TNPA_LOGO}
                    alt="TNPA Instagram"
                    loading="eager"
                    decoding="async"
                    className="h-11 w-11 rounded-full bg-card object-contain p-0.5"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-foreground sm:text-lg">tamilnadupickleball.assn</h3>
                    <svg className="h-4 w-4 text-blue-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <p className="text-xs text-foreground/60" style={{ fontFamily: "Arial, sans-serif" }}>
                    Official Instagram Feed • 593 Posts
                  </p>
                </div>
              </div>
              <a
                href="https://www.instagram.com/tamilnadupickleball.assn/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider shrink-0"
              >
                <Instagram className="h-4 w-4" />
                Follow Us
              </a>
            </div>

            {/* Official Live Instagram Feed (Exact 6 Posts - Large & Clear - Zero White Space) */}
            <div className="relative w-full h-95 sm:h-115 lg:h-127.5 rounded-xl overflow-hidden bg-[#0a0f1d] border border-border/60 shadow-inner">
              <iframe
                src="https://www.instagram.com/tamilnadupickleball.assn/embed/"
                title="Tamil Nadu Pickleball Association Live Instagram Feed"
                className="w-full border-0 bg-[#0a0f1d] -mt-42.5 sm:-mt-51.25 lg:-mt-58.75 h-142.5 sm:h-171.25 lg:h-190"
                allowTransparency={true}
                allow="encrypted-media"
                scrolling="no"
              />
            </div>

            {/* Footer link */}
            <div className="mt-5 text-center border-t border-border pt-4">
              <a
                href="https://www.instagram.com/tamilnadupickleball.assn/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs font-bold uppercase tracking-widest"
              >
                View All 593+ Posts on Instagram &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* newsletter strip */}
        {/* 
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
        */}


      </div>
    </section>
  );
}
