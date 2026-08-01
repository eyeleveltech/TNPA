import { ChevronRight, Instagram, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export function Contact() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#contact-name") {
      const el = document.getElementById("contact-name");
      if (el) {
        setTimeout(() => {
          el.focus();
        }, 500);
      }
    }
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");
    
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "c7a4369a-4d6b-470c-aea4-fc31383c2643");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully!");
        (event.target as HTMLFormElement).reset();
      } else {
        setResult(data.message || "An error occurred.");
      }
    } catch (error) {
      setResult("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };
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

        {/* ── Contact Layout ── */}
        <div className="mx-auto mt-12 max-w-5xl grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          
          {/* Left: Info Cards */}
          <div className="space-y-4">
            {/* Email */}
            <div className="stat-card flex flex-col justify-center rounded-2xl px-6 py-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-gold/80 mb-3">Direct Email</p>
              <a
                href="mailto:tnstatepa@gmail.com"
                className="flex items-center gap-3 text-[14px] font-medium text-foreground transition-colors hover:text-gold group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition-colors group-hover:bg-gold/10 group-hover:ring-gold/30">
                  <Mail className="h-4 w-4 text-gold" strokeWidth={1.5} />
                </div>
                tnstatepa@gmail.com
              </a>
            </div>

            {/* Instagram */}
            <div className="stat-card flex flex-col justify-center rounded-2xl px-6 py-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-gold/80 mb-3">Instagram</p>
              <a
                href="https://www.instagram.com/tamilnadupickleball.assn/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[14px] font-medium text-foreground transition-colors hover:text-gold group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition-colors group-hover:bg-gold/10 group-hover:ring-gold/30">
                  <Instagram className="h-4 w-4 text-gold" strokeWidth={1.5} />
                </div>
                @tamilnadupickleball.assn
              </a>
            </div>
          </div>

          {/* Right: Contact Form UI */}
          <div className="stat-card rounded-2xl p-6 sm:p-8">
            <h3 className="mb-6 text-[13px] font-bold uppercase tracking-widest text-gold">Collaboration Form</h3>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-[11px] font-semibold uppercase tracking-wider text-foreground/70">Name</label>
                <input 
                  id="contact-name"
                  name="name"
                  type="text" 
                  placeholder="Your full name" 
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-foreground/30 focus:border-gold/50 focus:bg-white/10 focus:ring-1 focus:ring-gold/50" 
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-foreground/70">Company Name</label>
                <input 
                  name="company"
                  type="text" 
                  placeholder="Your company" 
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-foreground/30 focus:border-gold/50 focus:bg-white/10 focus:ring-1 focus:ring-gold/50" 
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-foreground/70">Email ID</label>
                  <input 
                    name="email"
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-foreground/30 focus:border-gold/50 focus:bg-white/10 focus:ring-1 focus:ring-gold/50" 
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-foreground/70">Phone Number</label>
                  <input 
                    name="phone"
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-foreground/30 focus:border-gold/50 focus:bg-white/10 focus:ring-1 focus:ring-gold/50" 
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-foreground/70">City</label>
                <input 
                  name="city"
                  type="text" 
                  placeholder="Your city" 
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-foreground/30 focus:border-gold/50 focus:bg-white/10 focus:ring-1 focus:ring-gold/50" 
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-foreground/70">Collaboration Details</label>
                <textarea 
                  name="message"
                  placeholder="What type of collaboration do you want to have?" 
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-foreground/30 focus:border-gold/50 focus:bg-white/10 focus:ring-1 focus:ring-gold/50" 
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="btn-gold mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[13px] font-bold uppercase tracking-widest transition-transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <ChevronRight className="h-4 w-4" />}
              </button>
              {result && (
                <p className={`mt-3 text-center text-[13px] font-medium ${result.includes("success") ? "text-green-400" : "text-gold"}`}>
                  {result}
                </p>
              )}
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
