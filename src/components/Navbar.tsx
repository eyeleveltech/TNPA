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

const NAV_ITEMS = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Teams", href: "/#teams" },
  { name: "Players", href: "/#players" },
  { name: "Schedule", href: "/#schedule" },
  { name: "Team Owners", href: "/#owners" },
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

    const sectionIds = NAV_ITEMS.filter((i) => i.href.startsWith("/#")).map((i) => i.href.substring(2));
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === "/#home") {
      return location.pathname === "/" && (!activeSection || activeSection === "home");
    }
    if (href.startsWith("/#")) {
      return location.pathname === "/" && activeSection === href.replace("/#", "");
    }
    return location.pathname === href;
  };

  return (
    <header
      className="relative z-30 w-full transition-colors bg-linear-to-r from-[#011837] from-10% via-[#011837]/80 via-40% to-transparent to-90%"
    >
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-2.5 sm:px-8 sm:py-3 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-3 md:px-4 md:py-3 lg:gap-8 lg:px-10 lg:py-3.5 xl:px-14">
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
              className={`nav-link whitespace-nowrap text-[9px] lg:text-[12px] xl:text-[13px] ${isActive(item.href) ? "nav-link-active" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 lg:gap-3">
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
                className={`nav-link text-sm ${isActive(item.href) ? "nav-link-active" : ""}`}
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
        </div>
      )}
    </header>
  );
}
