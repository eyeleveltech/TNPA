import { Trophy, Users, Calendar, MapPin } from "lucide-react";

export function FormatHero() {
  return (
    <div className="relative">
      <section
        className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, color-mix(in oklab, var(--gold) 8%, transparent), transparent 60%), var(--ink)",
        }}
      >
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold/50" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
              Official Format
            </span>
          </div>
          <h1 className="display-title mt-4 text-[clamp(2.6rem,7vw,4.8rem)] text-foreground">
            Tournament <span className="text-gold-gradient">Format</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground/65">
            TNPPL Season 2 — September 17&ndash;20, 2026 at Express Avenue, Central Atrium,
            Chennai. 12 franchises, 168 players, 4 days of elite competition.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            {[
              { icon: Trophy, label: "Teams", value: "12" },
              { icon: Users, label: "Players", value: "168" },
              { icon: Calendar, label: "Days", value: "4" },
              { icon: MapPin, label: "Venue", value: "Express Avenue" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="stat-card flex items-center gap-3 rounded-xl px-5 py-4">
                <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                <div>
                  <p
                    className="text-2xl sm:text-3xl font-black leading-none text-gold"
                    style={{ fontFamily: "'Arial Black', 'Arial', sans-serif", fontWeight: 900 }}
                  >
                    {value}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/75">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
