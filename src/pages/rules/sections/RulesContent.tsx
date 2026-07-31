import { CheckCircle2, AlertCircle, Info } from "lucide-react";

export const SECTIONS = [
  {
    title: "General Tournament Rules",
    icon: CheckCircle2,
    color: "190 85% 58%",
    rules: [
      "All matches are governed by the official IPA (Indian Pickleball Association) rules unless otherwise specified by TNPPL.",
      "Each franchise must field the minimum required players per category in every team tie.",
      "Players must carry valid identification matching their registered name at all times.",
      "Disputes must be raised with the Tournament Director immediately. Decisions are final.",
      "Unsportsmanlike conduct may result in disqualification at the Tournament Director's discretion.",
      "All players must be registered with TNPA and listed in their franchise's official squad roster.",
    ],
  },
  {
    title: "Match Format",
    icon: CheckCircle2,
    color: "45 90% 58%",
    rules: [
      "Men's, Women's, and Masters (50+) matches are played per team tie.",
      "Standard rally-point scoring applies. Game to 11 points, win by 2. Best of 3 games.",
      "The third game (if required) plays to 11 points with no cap.",
      "Warm-up time: 5 minutes per side before each match.",
      "Substitutions must be declared before the match begins and cannot be made mid-match without Tournament Director approval.",
      "Full match format details will be published in the official TNPPL Season 2 Tournament Handbook.",
    ],
  },
  {
    title: "Code of Conduct",
    icon: AlertCircle,
    color: "0 80% 58%",
    rules: [
      "All players, coaches, and franchise staff must treat opponents, officials, and spectators with respect.",
      "The use of offensive language directed at opponents or officials will not be tolerated.",
      "Players must wear their franchise's official kit during all league and playoff matches.",
      "Players are not permitted to use any performance-enhancing substances as defined by WADA regulations.",
      "Any player found to have violated the code of conduct will face disciplinary action as determined by the TNPPL Disciplinary Committee.",
      "Franchise owners and team management are responsible for the conduct of their players at all times.",
    ],
  },
  {
    title: "Venue & Safety",
    icon: Info,
    color: "120 70% 55%",
    rules: [
      "All participants must adhere to the venue rules of the Central Atrium, Express Avenue Mall.",
      "Players must not enter the playing area without the umpire's permission.",
      "Spectators must remain behind the designated spectator zones at all times.",
      "Photography and videography of matches is permitted for personal use. Commercial media must hold valid accreditation.",
      "The Tournament Committee reserves the right to modify the schedule due to unforeseen circumstances.",
      "TNPA and SDAT bear no liability for personal injuries sustained during the event. Players participate at their own risk.",
    ],
  },
];

export function RulesContent() {
  return (
    <section className="py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
        <div className="space-y-10">
          {SECTIONS.map(({ title, icon: Icon, color, rules }) => (
            <div key={title} className="stat-card rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: `color-mix(in oklab, hsl(${color}) 15%, var(--card))`,
                    border: `1px solid color-mix(in oklab, hsl(${color}) 35%, transparent)`,
                  }}
                >
                  <Icon className="h-6 w-6" style={{ color: `hsl(${color})` }} strokeWidth={1.5} />
                </div>
                <h2 className="display-title text-xl text-foreground sm:text-2xl">
                  {title.includes("&") ? (
                    <>
                      {title.split("&")[0]}
                      <span style={{ fontFamily: "Arial, sans-serif" }}>&amp;</span>
                      {title.split("&")[1]}
                    </>
                  ) : (
                    title
                  )}
                </h2>
              </div>
              <ul className="mt-6 space-y-3">
                {rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed text-foreground/65">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                      style={{
                        background: `color-mix(in oklab, hsl(${color}) 15%, var(--card))`,
                        color: `hsl(${color})`,
                      }}
                    >
                      {i + 1}
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6 sm:p-8">
            <p className="text-[13px] leading-relaxed text-foreground/65">
              <strong className="text-foreground">Note:</strong> These rules are subject to revision. The complete TNPPL Season 2 Tournament Handbook — including detailed scoring procedures, appeal processes, and category-specific rules — will be published by TNPA prior to the event. Registered franchise owners and players will receive the handbook directly. For any rule clarifications, contact{" "}
              <a href="mailto:tnstatepa@gmail.com" className="text-gold hover:underline">
                tnstatepa@gmail.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
