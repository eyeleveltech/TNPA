import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LIVE_STREAM_CONFIG, isLiveActive, extractYouTubeId } from "@/config/liveStream";
import { Youtube, ChevronLeft, ExternalLink, Radio, Tv } from "lucide-react";

export default function LivePage() {
  const court1Id = extractYouTubeId(LIVE_STREAM_CONFIG.court1VideoId);
  const court2Id = extractYouTubeId(LIVE_STREAM_CONFIG.court2VideoId);

  return (
    <div className="min-h-screen bg-ink text-foreground flex flex-col justify-between selection:bg-gold/30 selection:text-gold">
      {/* Top Navigation */}
      <div className="relative z-30">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <main className="relative isolate flex-1 flex flex-col justify-center overflow-hidden">
        {/* Ambient Stadium Lighting Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-125 w-200 -translate-x-1/2 rounded-full bg-linear-to-b from-navy/40 to-transparent blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-100 w-150 -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]"
        />

        {isLiveActive ? (
          /* ========================================================================= */
          /* 2-VIDEO LIVE BROADCAST VIEW (Active when developer adds YouTube IDs)       */
          /* ========================================================================= */
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            {/* Live Header Strip */}
            <div className="stat-card mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <div>
                  <h1 className="display-title text-base sm:text-xl text-foreground">
                    LIVE BROADCAST ARENA
                  </h1>
                  <p className="text-xs text-foreground/70">
                    Cavin&apos;s TNPPL Season 2 • SDAT Tennis Stadium, Chennai
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-gold">
                <Tv className="h-4 w-4" />
                <span>Dual Court Coverage</span>
              </div>
            </div>

            {/* Two-Video Split Screen Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Court 1 Player */}
              <div className="stat-card flex flex-col gap-3 rounded-2xl p-3 sm:p-4">
                <div className="flex items-center justify-between px-1">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-red-600/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-red-400 border border-red-500/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    {LIVE_STREAM_CONFIG.court1Title}
                  </span>
                  <span className="text-[11px] font-medium text-foreground/60 uppercase tracking-wider">
                    {court1Id ? "Live Stream" : "Standby"}
                  </span>
                </div>

                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ink/90 border border-border">
                  {court1Id ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${court1Id}?autoplay=1&mute=1&rel=0`}
                      title={LIVE_STREAM_CONFIG.court1Title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full border-0"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                      <Radio className="h-8 w-8 text-gold/60 mb-2 animate-pulse" />
                      <p className="display-title text-sm text-foreground">Court 1 Starting Soon</p>
                    </div>
                  )}
                </div>

                {LIVE_STREAM_CONFIG.court1Match && (
                  <div className="px-1 pt-1">
                    <p className="text-xs font-bold text-foreground sm:text-sm">
                      {LIVE_STREAM_CONFIG.court1Match}
                    </p>
                  </div>
                )}
              </div>

              {/* Court 2 Player */}
              <div className="stat-card flex flex-col gap-3 rounded-2xl p-3 sm:p-4">
                <div className="flex items-center justify-between px-1">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-red-600/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-red-400 border border-red-500/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    {LIVE_STREAM_CONFIG.court2Title}
                  </span>
                  <span className="text-[11px] font-medium text-foreground/60 uppercase tracking-wider">
                    {court2Id ? "Live Stream" : "Standby"}
                  </span>
                </div>

                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ink/90 border border-border">
                  {court2Id ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${court2Id}?rel=0`}
                      title={LIVE_STREAM_CONFIG.court2Title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full border-0"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                      <Radio className="h-8 w-8 text-gold/60 mb-2 animate-pulse" />
                      <p className="display-title text-sm text-foreground">Court 2 Starting Soon</p>
                    </div>
                  )}
                </div>

                {LIVE_STREAM_CONFIG.court2Match && (
                  <div className="px-1 pt-1">
                    <p className="text-xs font-bold text-foreground sm:text-sm">
                      {LIVE_STREAM_CONFIG.court2Match}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* SINGLE HERO SECTION: COMING SOON (Pure typographic, zero picture clutter)  */
          /* ========================================================================= */
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-5 py-16 text-center sm:py-24">
            {/* Live Arena Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-red-400 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              LIVE STREAM ARENA • TNPPL SEASON 2
            </div>

            {/* Headline */}
            <h1 className="display-title-extended text-4xl sm:text-6xl lg:text-7xl text-foreground">
              COMING{" "}
              <span className="text-gold">
                SOON
              </span>
            </h1>

            {/* Subtitle / Tagline */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg lg:text-xl font-normal">
              Stay tuned for all the live action from Cavin&apos;s TNPPL Season 2.
              <br className="hidden sm:inline" /> Two courts. One bigger game.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={LIVE_STREAM_CONFIG.youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold rounded-full px-6 py-3 text-xs sm:text-sm gap-2"
              >
                <Youtube className="h-4 w-4" aria-hidden="true" />
                Subscribe on YouTube
                <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden="true" />
              </a>

              <Link
                to="/"
                className="btn-outline-light rounded-full px-6 py-3 text-xs sm:text-sm gap-2"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Back to Home
              </Link>
            </div>

            {/* Subtle Footer Note */}
            <div className="mt-14 border-t border-border pt-6">
              <p className="display-title tracking-wider text-gold text-sm sm:text-base">
                ONE GAME ONE FAMILY
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/50">
                At Express Avenue Mall, Central Atrium, Chennai
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
