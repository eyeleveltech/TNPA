import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Menu, X, Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const SOCIAL_LINKS = [
  { label: "Instagram", Icon: Instagram, href: "https://www.instagram.com/tamilnadupickleball.assn/" },
  { label: "Facebook", Icon: Facebook, href: "https://www.facebook.com/TamilnaduPickleballAssociation/" },
  { label: "YouTube", Icon: Youtube, href: "https://www.youtube.com/channel/UCE_hcfY87sko-R60DCXnYzg" },
  { label: "X", Icon: Twitter, href: "https://x.com/tnstatepa" },
];

import LOGO_SRC from "../assets/Tnppl.webp";

interface NavItem {
  name: string;
  href: string;
  /** Extra section ids that should also light this item. Defaults to its own hash. */
  match?: string[];
}

/* "Teams & Owners" needs no `match`: Teams and Owners are now one section
   (#teams), with each franchise card carrying its own owners. */

/* Label is "Format", not "Tournament Format": the nav is whitespace-nowrap
   inside overflow-hidden, so an over-wide row clips silently rather than
   wrapping. "Tournament Format" overflows by ~25px at lg and ~70px at xl. */
const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Teams & Owners", href: "/#teams" },
  { name: "Format", href: "/format" },
  { name: "Schedule", href: "/#schedule" },
  { name: "Sponsors", href: "/sponsorship" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            if (entry.target.id === 'home') {
              window.history.replaceState(null, '', window.location.pathname);
            } else {
              window.history.replaceState(null, '', '#' + entry.target.id);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px"
      }
    );

    // `match` lets one nav item stay lit across several section ids. Nothing
    // uses it right now; it stays because merging sections is a recurring ask.
    const sectionIds = NAV_ITEMS.flatMap((i) =>
      i.match ?? (i.href.startsWith("/#") ? [i.href.substring(2)] : [])
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const isActive = (item: NavItem) => {
    if (item.href === "/#home") {
      return location.pathname === "/" && (!activeSection || activeSection === "home");
    }
    if (item.href.startsWith("/#")) {
      const ids = item.match ?? [item.href.replace("/#", "")];
      return location.pathname === "/" && ids.includes(activeSection);
    }
    return location.pathname === item.href;
  };

  return (
    <header
      className="relative z-30 w-full transition-colors bg-linear-to-r from-[#011837] from-10% via-[#011837]/80 via-40% to-transparent to-90%"
    >
      {/* The 3-column track must not start before lg: the <nav> that fills the
          middle column is display:none until lg, and a hidden grid item is
          removed from grid flow rather than reserving a cell — so at md the
          right-hand cluster would land in the middle 1fr column and the menu
          button would sit beside the logo instead of flush right. */}
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-2.5 sm:px-8 sm:py-3 md:gap-3 md:px-4 md:py-3 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-8 lg:px-10 lg:py-3.5 xl:px-14">
        <div className="flex min-w-0 items-center gap-4 lg:gap-6">
          <Link to="/" className="flex items-center" aria-label="TNPPL home">
            <img
              src={LOGO_SRC}
              alt="Tamil Nadu Pickleball Premier League logo"
              width={235}
              height={235}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="h-9 w-auto shrink-0 origin-left sm:h-11 md:h-12 lg:h-14 xl:h-16"
            />
          </Link>
        </div>

        <nav
          aria-label="Primary"
          className="hidden min-w-0 flex-nowrap items-center justify-center gap-x-2 overflow-hidden lg:flex lg:gap-x-5 xl:gap-x-7 2xl:gap-x-9"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`nav-link whitespace-nowrap text-[9px] lg:text-[11px] xl:text-[12px] ${isActive(item) ? "nav-link-active" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-self-end gap-2 lg:gap-3">
          {/* Social icons — xl and up only. Below 1280px the 8 nav items plus
              the Brand Collaboration button already consume the row, and the
              nav is whitespace-nowrap + overflow-hidden, so links would clip
              rather than wrap. Mobile gets them inside the drawer instead. */}
          <ul className="hidden items-center gap-1 xl:flex">
            {SOCIAL_LINKS.map(({ label, Icon, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`TNPPL on ${label}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-gold/10 hover:text-gold focus-visible:bg-gold/10 focus-visible:text-gold"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          <span
            className="hidden h-5 w-px bg-foreground/15 xl:block"
            aria-hidden="true"
          />

          <div className="hidden items-center gap-2 lg:flex lg:gap-3">
            <a
              href="/#contact"
              onClick={(e) => {
                sessionStorage.setItem('focusCollab', 'true');
                const el = document.getElementById('contact-name');
                if (el) {
                  setTimeout(() => el.focus({ preventScroll: true }), 50);
                }
              }}
              className="btn-gold inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-[9px] font-bold uppercase tracking-[0.06em] lg:gap-2 lg:px-5 lg:py-3 lg:text-[12px] lg:tracking-[0.08em] xl:px-6"
            >
              Brand Collaboration
              <ChevronRight className="h-3.5 w-3.5 lg:h-4 lg:w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="btn-outline-light inline-flex h-11 w-11 items-center justify-center rounded-md"
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="animate-fade-in mx-5 mt-4 rounded-xl border border-border bg-card/95 p-5 backdrop-blur-md sm:mx-8 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setOpen(false)}
                className={`nav-link text-sm ${isActive(item) ? "nav-link-active" : ""}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="/#contact"
              onClick={(e) => {
                setOpen(false);
                sessionStorage.setItem('focusCollab', 'true');
                const el = document.getElementById('contact-name');
                if (el) {
                  setTimeout(() => el.focus({ preventScroll: true }), 50);
                }
              }}
              className="btn-gold inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold uppercase tracking-[0.08em]"
            >
              Brand Collaboration
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Socials for every viewport below xl, where the header row hides them */}
          <ul className="mt-5 flex items-center justify-center gap-2 border-t border-border pt-5">
            {SOCIAL_LINKS.map(({ label, Icon, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`TNPPL on ${label}`}
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-gold/10 hover:text-gold"
                >
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
