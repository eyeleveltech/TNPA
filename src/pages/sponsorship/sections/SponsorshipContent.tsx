import { ChevronRight, Star, Handshake, Megaphone, Trophy, Users2, Globe, Lock } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const TIERS = [
  {
    name: "Title Sponsor",
    tag: "Flagship",
    description:
      "Your brand owns the league name. Maximum visibility across all tournament touchpoints — stage, courts, digital, broadcast, and press.",
    features: [
      "League named after your brand",
      "Exclusive court branding at all 4 venues",
      "Logo on all player jerseys",
      "Opening and closing ceremony naming rights",
      "30-second brand film played at every match",
      "Dedicated booth at Express Avenue Atrium",
      "Social media co-branding across all channels",
      "Press conference visibility",
      "VIP access for 10 guests per day",
    ],
    highlight: true,
    soldOut: true,
    icon: Trophy,
  },
  {
    name: "Co-Presenting Sponsor",
    tag: "Premium",
    description:
      "Second-highest brand share. Prominent presence across the event — courts, digital, and live broadcast.",
    features: [
      "Logo on all match courts",
      "Branding on player kits",
      "Social media co-branding",
      "Booth presence at venue",
      "VIP access for 6 guests per day",
      "Inclusion in all press materials",
    ],
    highlight: false,
    icon: Star,
  },
  {
    name: "Associate Sponsor",
    tag: "Associate",
    description:
      "Solid brand share for businesses looking to align with Tamil Nadu's fastest-growing sport property.",
    features: [
      "Branding at designated court zones",
      "Social media mentions",
      "Inclusion in event collateral",
      "VIP access for 4 guests per day",
    ],
    highlight: false,
    icon: Handshake,
  },
  {
    name: "Category Sponsor",
    tag: "Category",
    description:
      "Own your category — Official Hydration Partner, Official Nutrition Partner, Official Travel Partner, and more. Exclusive to your product vertical.",
    features: [
      "Exclusive category ownership",
      "Product placement rights at venue",
      "Branding aligned to your category",
      "Social media category mentions",
    ],
    highlight: false,
    icon: Globe,
  },
];

export const REACH = [
  { value: "12", label: "Franchise Cities", sub: "Across Tamil Nadu" },
  { value: "168", label: "Athletes", sub: "Competing players" },
  { value: "4", label: "Match Days", sub: "17–20 September 2026" },
  { value: "Free", label: "Entry", sub: "Open to all audiences" },
];

export const ASSOCIATION = [
  {
    icon: Megaphone,
    title: "Live Audience",
    copy:
      "Central Atrium, Express Avenue Mall — one of Chennai's highest-footfall premium venues. Free entry means maximum crowd.",
  },
  {
    icon: Users2,
    title: "Digital Reach",
    copy:
      "Official social channels with an engaged Tamil Nadu pickleball community. Pre-event, match-day, and post-event content cycles.",
  },
  {
    icon: Globe,
    title: "Media Coverage",
    copy:
      "Regional press coverage and digital video content reaching players, fans, and sports enthusiasts across the state.",
  },
];

export function SponsorshipContent() {
  return (
    <>
      {/* Reach Numbers */}
      <section className="border-y border-border bg-card/30 py-10">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <Reveal delay={100}>
          <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {REACH.map((r) => (
              <li key={r.label} className="text-center">
                <p className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none text-gold">
                  {r.value}
                </p>
                <p className="mt-1 text-sm font-bold uppercase tracking-[0.12em] text-foreground">
                  {r.label}
                </p>
                <p className="mt-0.5 text-[11px] text-foreground/50">{r.sub}</p>
              </li>
            ))}
          </ul>
          </Reveal>
        </div>
      </section>

      {/* Why Associate */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <div className="mb-12 text-center">
            <h2 className="display-title text-[clamp(1.8rem,4.5vw,3rem)] text-foreground">
              Why Associate with <span className="text-gold-gradient">TNPPL<span style={{ fontFamily: "Arial, sans-serif" }}>?</span></span>
            </h2>
          </div>
          <Reveal delay={100}>
          <div className="grid gap-6 sm:grid-cols-3">
            {ASSOCIATION.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.title} className="stat-card rounded-2xl p-6 sm:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="display-title mt-5 text-xl text-foreground">{a.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-foreground/80" style={{ fontFamily: "Arial, sans-serif" }}>{a.copy}</p>
                </div>
              );
            })}
          </div>
          </Reveal>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="border-t border-border py-16 sm:py-20">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gold/50 sm:w-16" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
                Sponsorship Tiers
              </span>
              <span className="h-px w-10 bg-gold/50 sm:w-16" />
            </div>
            <h2 className="display-title mt-4 text-[clamp(1.8rem,4.5vw,3rem)] text-foreground">
              Find the Right <span className="text-gold-gradient">Partnership Level</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-foreground/80" style={{ fontFamily: "Arial, sans-serif" }}>
              Each tier is customized to match your brand objectives. Contact us for detailed
              packages, availability, and pricing.
            </p>
          </div>

          <Reveal delay={100}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.name}
                  className={`stat-card relative flex flex-col rounded-2xl p-6 ${
                    tier.highlight
                      ? "ring-1 ring-gold/60"
                      : ""
                  }`}
                  style={
                    tier.highlight
                      ? {
                          background:
                            "linear-gradient(160deg, color-mix(in oklab, var(--gold) 10%, var(--card)), var(--card))",
                        }
                      : undefined
                  }
                >
                  {tier.soldOut ? (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-gold px-4 py-1 text-[9px] font-black uppercase tracking-[0.22em] text-primary-foreground shadow-lg">
                        Slot Reserved
                      </span>
                    </div>
                  ) : tier.highlight ? (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-gold px-4 py-1 text-[9px] font-black uppercase tracking-[0.22em] text-primary-foreground">
                        Premium Slot
                      </span>
                    </div>
                  ) : null}

                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/40 text-gold">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    {tier.soldOut && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">
                        <Lock className="h-3 w-3" /> Reserved
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.28em] text-gold">
                    {tier.tag}
                  </p>
                  <h3 className="display-title mt-1 text-xl text-foreground">
                    {tier.name.includes("-") ? (
                      <>
                        {tier.name.split("-")[0]}
                        <span style={{ fontFamily: "Arial, sans-serif" }}>-</span>
                        {tier.name.split("-")[1]}
                      </>
                    ) : (
                      tier.name
                    )}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-foreground/80" style={{ fontFamily: "Arial, sans-serif" }}>
                    {tier.description}
                  </p>

                  <ul className="mt-5 flex-1 space-y-2">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[12px] text-foreground/75">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {tier.soldOut ? (
                    <button
                      disabled
                      aria-disabled="true"
                      className="mt-6 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-gold/30 bg-gold/10 px-5 py-3 text-[12px] font-bold uppercase tracking-widest text-gold/75"
                    >
                      <Lock className="h-3.5 w-3.5" />
                      Slot Reserved
                    </button>
                  ) : (
                    <a
                      href="mailto:tnstatepa@gmail.com?subject=Sponsorship Enquiry — TNPPL Season 2"
                      className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-[12px] font-bold uppercase tracking-widest transition-colors ${
                        tier.highlight ? "btn-gold" : "btn-outline-light"
                      }`}
                    >
                      Enquire Now
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16 sm:py-20">
        <div className="mx-auto max-w-[1600px] px-5 text-center sm:px-8 lg:px-10 xl:px-14">
          <h2 className="display-title text-[clamp(1.9rem,4.5vw,3.2rem)] text-foreground">
            Ready to be part of <span className="text-gold-gradient">something bigger<span style={{ fontFamily: "Arial, sans-serif" }}>?</span></span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-[15px]" style={{ fontFamily: "Arial, sans-serif" }}>
            Reach out to explore the right partnership for your brand. We will share the full
            sponsorship deck, availability matrix, and custom options.
          </p>
          <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="mailto:tnstatepa@gmail.com?subject=Sponsorship Enquiry — TNPPL Season 2"
              className="btn-gold inline-flex w-auto items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] sm:px-8 sm:py-4 sm:text-sm"
            >
              Email Us
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
            <a
              href="/#contact"
              onClick={() => {
                sessionStorage.setItem("focusCollab", "true");
              }}
              className="btn-outline-light inline-flex w-auto items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] sm:px-8 sm:py-4 sm:text-sm"
            >
              Call Us Directly
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
          </div>
          <p className="mt-6 text-xs text-foreground/40">
            For detailed packages, pricing, and availability — tnstatepa@gmail.com
          </p>
        </div>
      </section>
    </>
  );
}
