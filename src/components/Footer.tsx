import { Link } from "react-router-dom";
import { ChevronRight, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import LOGO_SRC from "../assets/Tnppl.webp";

import TNPA_LOGO from "../assets/TNPA LOGO (1).webp";
import IPA_LOGO from "../assets/ipa.webp";

const FOOTER_LINKS = {
  Information: [
    { label: "Tournament Format", href: "/format" },
    { label: "Rules & Regulations", href: "/rules" },
    { label: "FAQs", href: "/faq" },
    { label: "Media Kit", href: "/media-kit" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  Partners: [
    { label: "Sponsorship Opportunities", href: "/sponsorship" },
    { label: "Brand Collaboration", href: "/#contact-name" },
    { label: "Franchise Enquiries", href: "/#contact" },
  ],
  Support: [
    { label: "Help Center", href: "/#contact" },
    { label: "Accreditation", href: "/#contact" },
    { label: "Volunteer With Us", href: "/#contact" },
  ],
};

const SOCIAL = [
  { label: "Instagram", Icon: Instagram, href: "https://www.instagram.com/tamilnadupickleball.assn/" },
  { label: "Facebook", Icon: Facebook, href: "https://www.facebook.com/TamilnaduPickleballAssociation/" },
  { label: "YouTube", Icon: Youtube, href: "https://www.youtube.com/channel/UCE_hcfY87sko-R60DCXnYzg" },
  { label: "X", Icon: Twitter, href: "https://x.com/tnstatepa" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink" aria-label="Site footer">
      {/* ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklab, var(--gold) 40%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(to top, black, transparent 40%)",
        }}
      />

      {/* ── Partner CTA banner ── */}
      <div className="relative border-b border-border">
        <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10 xl:px-14">
          <div
            className="stat-card grid items-center gap-6 rounded-2xl px-6 py-7 sm:px-10 lg:grid-cols-[auto_minmax(0,1fr)_auto]"
            style={{
              borderColor: "color-mix(in oklab, var(--gold) 25%, transparent)",
            }}
          >
            <div
              className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl lg:flex"
              style={{ border: "1px solid color-mix(in oklab, var(--gold) 40%, transparent)" }}
            >
              <svg
                className="h-9 w-9 text-gold"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <path d="M18 8.5a6.5 6.5 0 0 0-13 0c0 4.5 3 8.5 6.5 10.5 3.5-2 6.5-6 6.5-10.5Z" />
                <circle cx="12" cy="8.5" r="2.5" />
              </svg>
            </div>
            <div>
              <h3 className="display-title text-2xl sm:text-3xl">
                <span className="text-foreground">Be Part of Something Bigger<span style={{ fontFamily: "Arial, sans-serif" }}>.</span></span>
                <br />
                <span className="text-gold-gradient">One Game<span style={{ fontFamily: "Arial, sans-serif" }}>.</span> One Family<span style={{ fontFamily: "Arial, sans-serif" }}>.</span></span>
              </h3>
            </div>
            <div className="flex flex-col items-start gap-4 sm:items-center lg:flex-row">
              <p className="text-[13px] text-foreground/65">
                Collaborate with TNPA and grow the game with us.
              </p>
              <a
                href="/#contact"
                onClick={(e) => {
                  sessionStorage.setItem('focusCollab', 'true');
                  const el = document.getElementById('contact-name');
                  if (el) {
                    setTimeout(() => el.focus({ preventScroll: true }), 50);
                  }
                }}
                className="btn-outline-light inline-flex shrink-0 items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold uppercase tracking-[0.12em]"
              >
                Brand Collaboration
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer ── */}
      <div className="relative mx-auto max-w-[1600px] px-5 py-14 sm:px-8 lg:px-10 xl:px-14">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr] xl:grid-cols-[400px_1fr]">
          {/* brand */}
          <div>
            <img
              src={LOGO_SRC}
              alt="Tamil Nadu Pickleball Premier League"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="h-24 w-auto"
            />
            <div className="mt-3 flex items-center gap-2">
              <span className="h-px w-8 bg-gold/50" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold">
                Season 2
              </span>
              <span className="h-px w-8 bg-gold/50" />
            </div>

            <p className="mt-5 max-w-65 text-[13px] leading-relaxed text-foreground/60">
              The ultimate pickleball showdown in Tamil Nadu. 12 franchises. 168 players. 4 days of
              action. One champion.
            </p>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {Object.entries(FOOTER_LINKS).map(([col, links]) => (
              <div key={col}>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{col}</p>
                <span className="mt-2 block h-px w-8 bg-gold/40" />
                <ul className="mt-4 space-y-2.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        to={href}
                        className="group flex items-center gap-2 text-[13px] font-medium text-foreground/70 transition-colors hover:text-gold"
                      >
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all group-hover:opacity-100" />
                        {label.includes("&") ? <>{label.split("&")[0]}<strong className="font-bold">&amp;</strong>{label.split("&")[1]}</> : label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Social + credits strip ── */}
      <div className="relative border-t border-border">
        <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10 xl:px-14">
          <div className="grid items-center gap-6 sm:grid-cols-2">
            {/* social */}
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                Follow TNPA
              </p>
              <div className="flex gap-2.5">
                {SOCIAL.map(({ label, Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/60 transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* recognized by */}
            <div className="border-t border-border pt-5 text-center sm:border-l sm:border-t-0 sm:pt-0 sm:pl-6">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-foreground/50">
                Recognized By
              </p>
              <div className="flex flex-wrap items-center justify-center gap-5">
                <div className="flex flex-col items-center gap-1.5">
                  <img
                    src={TNPA_LOGO}
                    alt="Tamil Nadu Pickleball Association"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="h-10 w-auto opacity-80"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div className="relative border-t border-border">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 px-5 py-5 text-center sm:flex-row sm:text-left sm:px-8 lg:px-10 xl:px-14">
          <p className="text-[11px] text-foreground/45">
            &copy; 2026 Tamil Nadu Pickleball Premier League (TNPPL). All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/privacy" className="text-[11px] text-foreground/45 hover:text-gold">
              Privacy Policy
            </Link>
            <span className="h-3 w-px bg-border" />
            <Link to="/rules" className="text-[11px] text-foreground/45 hover:text-gold">
              Rules &amp; Regulations
            </Link>
            <span className="h-3 w-px bg-border" />
            <p className="flex items-center gap-1 text-[11px] text-foreground/45">
              Designed by{" "}
              <a
                href="https://theeyelevelstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/70 transition-colors hover:text-gold"
              >
                EyeLevel Growth Studio
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
