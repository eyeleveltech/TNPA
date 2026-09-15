import { Reveal } from "@/components/Reveal";
import type { TournamentInfo, TournamentPhase } from "@/lib/live-scores";
/* Same asset the home hero uses for the Tech Partner slot, so the mark is
   identical everywhere it appears rather than drifting between pages. */
import RIZZFIT_LOGO from "@/assets/sponsors/rizzfit.webp";

interface ScoreboardHeroProps {
  /** Number of courts currently showing a match, for the hero's live badge. */
  liveCount: number;
  isLoading: boolean;
  phase: TournamentPhase;
  info: TournamentInfo | null;
}

export function ScoreboardHero({ liveCount, isLoading, phase, info }: ScoreboardHeroProps) {
  const hasLive = liveCount > 0;

  /* The badge tells the truth about the phase rather than always shouting
     LIVE. Before play it counts down, after it says finished, and only
     during play does it claim anything is live. */
  const badge =
    phase === "before"
      ? { text: "Starting Soon", live: false }
      : phase === "after"
        ? { text: "Season Complete", live: false }
        : hasLive
          ? { text: `${liveCount} Court${liveCount === 1 ? "" : "s"} Live`, live: true }
          : { text: "No Live Match", live: false };

  const venue = info?.placeName ?? "Central Atrium, Express Avenue Mall";
  const intro =
    phase === "before"
      ? `Live scores from every court at ${venue}, the moment play begins.`
      : phase === "after"
        ? `Thank you for following the action at ${venue}.`
        : `Live scores from ${venue}. Scores refresh automatically while this page is open.`;

  return (
    <div className="relative">
      <section
        className="relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16"
        style={{
          background:
            "radial-gradient(80% 60% at 40% 0%, color-mix(in oklab, var(--gold) 7%, transparent), transparent 60%), var(--ink)",
        }}
      >
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <Reveal delay={60}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="h-px w-10 bg-gold/50" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
                Season 2
              </span>

              {/* The badge only claims "live" when a court actually has a match
                  on it. A permanently-lit LIVE pill teaches people to ignore it. */}
              {!isLoading && (
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ${
                    badge.live ? "text-red-300" : "text-foreground/55"
                  }`}
                  style={{
                    border: badge.live
                      ? "1px solid color-mix(in oklab, #ff3b3b 45%, transparent)"
                      : "1px solid var(--color-border)",
                    background: badge.live
                      ? "color-mix(in oklab, #ff3b3b 12%, transparent)"
                      : "transparent",
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    {badge.live && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    )}
                    <span
                      className={`relative inline-flex h-2 w-2 rounded-full ${
                        badge.live ? "bg-red-500" : "bg-foreground/35"
                      }`}
                    />
                  </span>
                  {badge.text}
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <h1 className="display-title mt-4 text-[clamp(2.6rem,7vw,4.8rem)] text-foreground">
              Live <span className="text-gold-gradient">Scoreboard</span>
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p
              className="mt-4 max-w-xl text-[15px] leading-relaxed text-foreground/65"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              {intro}
            </p>
          </Reveal>

          {/* Powered-by lockup. The logo is the credit, so the wordmark is not
              repeated as text beside it — "Powered by Rizzfitt [Rizzfitt]"
              reads as a mistake. The alt text carries the name for anyone who
              cannot see the image. */}
          <Reveal delay={300}>
            <div
              className="mt-6 inline-flex items-center gap-3 rounded-full px-4 py-2.5 sm:gap-4 sm:px-5"
              style={{
                border: "1px solid var(--color-border)",
                background: "color-mix(in oklab, var(--chalk) 4%, transparent)",
              }}
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-foreground/45">
                Powered by
              </span>
              <span className="h-4 w-px shrink-0 bg-border" aria-hidden="true" />
              <img
                src={RIZZFIT_LOGO}
                alt="Rizzfitt"
                width={152}
                height={28}
                loading="eager"
                decoding="async"
                className="h-5 w-auto max-w-30 object-contain sm:h-6 sm:max-w-36"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
