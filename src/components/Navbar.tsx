import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Menu, X, Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const SOCIAL_LINKS = [
  { label: "Instagram", Icon: Instagram, href: "https://www.instagram.com/tamilnadupickleball.assn/" },
  { label: "Facebook", Icon: Facebook, href: "https://www.facebook.com/TamilnaduPickleballAssociation/" },
  { label: "YouTube", Icon: Youtube, href: "https://www.youtube.com/channel/UCE_hcfY87sko-R60DCXnYzg" },
  { label: "X", Icon: Twitter, href: "https://x.com/tnstatepa" },
];

import LOGO_SRC from "../assets/Tnppl.webp";

const NAV_ITEMS = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Teams", href: "/#teams" },
  { name: "Players", href: "/#players" },
  { name: "Schedule", href: "/#schedule" },
  { name: "Sponsors", href: "/#sponsors" },
  { name: "News", href: "/#news" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="relative z-30 w-full transition-colors bg-linear-to-r from-[#011837] from-10% via-[#011837]/80 via-40% to-transparent to-90%"
    >
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-2.5 sm:px-8 sm:py-3 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-3 md:px-4 md:py-3 lg:gap-8 lg:px-10 lg:py-3.5 xl:px-14">
        <Link to="/" className="flex min-w-0 items-center" aria-label="TNPPL home">
          <img
            src={LOGO_SRC}
            alt="Tamil Nadu Pickleball Premier League logo"
            width={235}
            height={235}
            className="h-10 w-auto shrink-0 sm:h-12 md:h-12 lg:h-14 xl:h-16"
            fetchPriority="high"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden min-w-0 flex-nowrap items-center justify-center gap-x-2 overflow-hidden md:flex lg:gap-x-5 xl:gap-x-7 2xl:gap-x-9"
        >
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.name}
              href={item.href}
              className={`nav-link whitespace-nowrap text-[9px] lg:text-[12px] xl:text-[13px] ${i === 0 ? "nav-link-active" : ""}`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 lg:gap-3">
          <div className="hidden items-center gap-2 md:flex lg:gap-3">
            <a
              href="/#partner"
              className="btn-gold inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-[9px] font-bold uppercase tracking-[0.06em] lg:gap-2 lg:px-5 lg:py-3 lg:text-[12px] lg:tracking-[0.08em] xl:px-6"
            >
              Brand Collaboration
              <ChevronRight className="h-3.5 w-3.5 lg:h-4 lg:w-4" aria-hidden="true" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="btn-outline-light inline-flex h-11 w-11 items-center justify-center rounded-md md:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="animate-fade-in mx-5 mt-4 rounded-xl border border-border bg-card/95 p-5 backdrop-blur-md sm:mx-8 md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-4">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`nav-link text-sm ${i === 0 ? "nav-link-active" : ""}`}
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="/#partner"
              className="btn-gold inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold uppercase tracking-[0.08em]"
            >
              Brand Collaboration
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
