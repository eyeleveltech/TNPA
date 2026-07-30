import { ChevronRight, Instagram, Mail, MapPin, Phone } from "lucide-react";

const CONTACTS = [
  {
    name: "Dr Kavya Somesh",
    phone: "+91 98944 27793",
    tel: "+919894427793",
  },
  {
    name: "Yogesh Ramchandani",
    phone: "+91 98841 30737",
    tel: "+919884130737",
  },
  {
    name: "Ganesh",
    phone: "+91 98841 30625",
    tel: "+919884130625",
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-10 sm:py-12 lg:py-14">
      {/* ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(65% 50% at 30% 0%, color-mix(in oklab, var(--gold) 8%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
        {/* heading */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/50 sm:w-16" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
              Get in Touch
            </span>
            <span className="h-px w-10 bg-gold/50 sm:w-16" />
          </div>
          <h2 className="display-title-extended mt-4 text-[clamp(2.4rem,6.5vw,4.2rem)]">
            <span className="text-foreground">Connect with </span>
            <span className="text-gold-gradient">TNPPL</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-[15px]"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            For partnership enquiries, media requests, or general information — reach us directly.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3" aria-hidden>
            <span className="h-px w-20 bg-gold/40" />
            <span className="text-xs text-gold animate-star-pickleball">★</span>
            <span className="h-px w-20 bg-gold/40" />
          </div>
        </div>

        {/* ── Contact cards + Sidebar ── */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">

          {/* Contact persons */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/50">
              Speak Directly with TNPPL
            </p>
            {CONTACTS.map((c) => (
              <div key={c.name} className="stat-card flex items-center justify-between rounded-2xl px-5 py-5 sm:px-6">
                <div>
                  <p className="text-[13px] font-bold text-foreground">{c.name}</p>
                  <a
                    href={`tel:${c.tel}`}
                    className="mt-0.5 flex items-center gap-1.5 text-[13px] text-foreground/70 transition-colors hover:text-gold"
                  >
                    <Phone className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                    {c.phone}
                  </a>
                </div>
                <a
                  href={`tel:${c.tel}`}
                  className="btn-outline-light inline-flex w-32 shrink-0 items-center justify-center gap-2 rounded-full py-2.5 text-[11px] font-bold uppercase tracking-widest"
                >
                  Call
                  <Phone className="h-3 w-3" />
                </a>
              </div>
            ))}

            {/* Email */}
            <div className="stat-card flex items-center justify-between rounded-2xl px-5 py-5 sm:px-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-gold">Email</p>
                <a
                  href="mailto:tnstatepa@gmail.com"
                  className="mt-1 flex items-center gap-1.5 text-[13px] text-foreground/85 transition-colors hover:text-gold"
                >
                  <Mail className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                  tnstatepa@gmail.com
                </a>
              </div>
              <a
                href="mailto:tnstatepa@gmail.com"
                className="btn-gold inline-flex w-32 shrink-0 items-center justify-center gap-2 rounded-full py-2.5 text-[11px] font-bold uppercase tracking-widest"
              >
                Email Us
                <ChevronRight className="h-3 w-3" />
              </a>
            </div>

            {/* Instagram */}
            <div className="stat-card flex items-center justify-between rounded-2xl px-5 py-5 sm:px-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-gold">Instagram</p>
                <a
                  href="https://www.instagram.com/tamilnadupickleball.assn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-1.5 text-[13px] text-foreground/85 transition-colors hover:text-gold"
                >
                  <Instagram className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                  @tamilnadupickleball.assn
                </a>
              </div>
              <a
                href="https://www.instagram.com/tamilnadupickleball.assn/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light inline-flex w-32 shrink-0 items-center justify-center gap-2 rounded-full py-2.5 text-[11px] font-bold uppercase tracking-widest"
              >
                Follow
                <ChevronRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Venue card */}
            <div className="stat-card rounded-2xl p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Venue</p>
              <h3 className="display-title-extended mt-2 text-2xl text-foreground sm:text-3xl">
                Express Avenue Atrium
              </h3>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/55">
                Royapettah, Chennai
              </p>
              <span className="mt-4 block h-1 w-10 rounded-full bg-gold" />
              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-foreground/50">Location</p>
                    <p className="text-[13px] text-foreground/85">Central Atrium, Express Avenue Mall</p>
                    <p className="text-[12px] text-foreground/55">Chennai, Tamil Nadu</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-foreground/50">Dates</p>
                    <p className="text-[13px] text-foreground/85">17 – 20 September 2026</p>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-gold">Entry is free</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Venue photo */}
            <div
              className="relative h-48 overflow-hidden rounded-2xl"
              style={{
                background: "linear-gradient(135deg, color-mix(in oklab, var(--gold) 8%, var(--card)), var(--card))",
              }}
            >
              <img
                src="/images/venue-express-avenue.jpg"
                alt="Express Avenue Atrium — TNPPL Season 2 venue"
                className="absolute inset-0 h-full w-full object-cover object-center"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              {/* fallback grid */}
              <svg
                aria-hidden
                className="absolute inset-0 h-full w-full opacity-[0.12]"
                viewBox="0 0 400 220"
                fill="none"
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 24} x2="400" y2={i * 24} stroke="white" strokeWidth="0.5" />
                ))}
                {Array.from({ length: 18 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 24} y1="0" x2={i * 24} y2="220" stroke="white" strokeWidth="0.5" />
                ))}
                <circle cx="200" cy="110" r="18" fill="var(--gold)" opacity="0.9" />
              </svg>
              <div
                className="absolute right-4 bottom-4 rounded-xl px-4 py-2 text-center"
                style={{
                  background: "var(--card)",
                  border: "1px solid color-mix(in oklab, var(--gold) 40%, transparent)",
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
                  Express Avenue Atrium
                </p>
                <p className="mt-0.5 text-[9px] text-foreground/55">Royapettah, Chennai</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA strip */}
        <div className="stat-card mt-8 flex flex-col items-center justify-between gap-5 rounded-2xl px-6 py-7 sm:flex-row sm:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-foreground/75">
              Let's build something extraordinary together.
            </p>
            <h3 className="display-title-extended mt-1 text-2xl sm:text-3xl">
              <span className="text-foreground">Brand </span>
              <span className="text-gold-gradient">Collaboration </span>
              <span className="text-foreground">with TNPPL Season 2.</span>
            </h3>
          </div>
          <a
            href="mailto:tnstatepa@gmail.com?subject=Brand Collaboration — TNPPL Season 2"
            className="btn-outline-light inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.12em]"
          >
            Brand Collaboration
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
