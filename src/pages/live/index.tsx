import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LIVE_STREAM_CONFIG, isLiveActive, extractYouTubeId } from "@/config/liveStream";
import { Radio, Tv } from "lucide-react";
import LIVE_STUDIO_BG from "@/assets/live_studio_bg.webp";

// Target Live Date: September 17, 2026, 08:00:00 AM IST
const TARGET_LIVE_TIMESTAMP = new Date("2026-09-17T08:00:00+05:30").getTime();

function calculateTimeLeft() {
  const now = new Date().getTime();
  const difference = TARGET_LIVE_TIMESTAMP - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isLive: false,
  };
}

export default function LivePage() {
  const court1Id = extractYouTubeId(LIVE_STREAM_CONFIG.court1VideoId);
  const court2Id = extractYouTubeId(LIVE_STREAM_CONFIG.court2VideoId);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-ink text-foreground flex flex-col justify-between selection:bg-gold/30 selection:text-gold">
      {/* Top Navigation */}
      <div className="absolute inset-x-0 top-0 z-30">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <main className="relative isolate flex-1 flex flex-col justify-center items-center overflow-hidden w-full">
        {/* Ambient Stadium Lighting Glows - Subtle and balanced */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-96 w-140 -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl"
        />

        {isLiveActive ? (
          /* ========================================================================= */
          /* 2-VIDEO LIVE BROADCAST VIEW (Active when developer adds YouTube IDs)       */
          /* ========================================================================= */
          <div className="mx-auto w-full max-w-7xl px-4 pt-24 pb-8 sm:px-6 sm:pt-28 sm:pb-10 lg:px-8 lg:pt-32">
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
          /* BANNER HERO SECTION: FULL-BLEED LIVE COUNTDOWN ARENA                      */
          /* ========================================================================= */
          <div className="relative flex w-full min-h-screen flex-col items-center justify-center px-4 pt-24 pb-12 sm:pt-28 sm:pb-16 text-center select-none overflow-hidden">
            {/* Ultra HD Studio Background - Edge to Edge */}
            <img
              src={LIVE_STUDIO_BG}
              alt="TNPPL Live Broadcast Arena"
              width={1920}
              height={1080}
              loading="eager"
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover object-center -z-10"
            />
            {/* Subtle contrast overlay to keep glow balanced and elegant */}
            <div className="absolute inset-0 bg-ink/30 pointer-events-none -z-10" />

            {/* 1. YouTube 3D Vector Icon (Compact & elegant) */}
            <div className="relative mb-2 sm:mb-3 md:mb-4 flex items-center justify-center">
              <div className="absolute h-9 w-12 sm:h-12 sm:w-16 md:h-14 md:w-20 rounded-full bg-red-600/20 blur-lg" />
              <svg
                className="relative h-8 w-auto sm:h-11 md:h-13 lg:h-14 drop-shadow-[0_4px_12px_rgba(239,68,68,0.3)]"
                viewBox="0 0 120 84"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="120" height="84" rx="24" fill="url(#ytRedGrad)" />
                <path d="M48 24L82 42L48 60V24Z" fill="white" />
                <defs>
                  <linearGradient id="ytRedGrad" x1="0" y1="0" x2="120" y2="84" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF1E27" />
                    <stop offset="1" stopColor="#B80008" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* 2. Razor-Sharp "Coming up soon" Title (Refined, proportional scale) */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] mb-3 sm:mb-5 md:mb-6 font-sans">
              Coming up soon
            </h1>

            {/* 3. Sleek Luxury Glassmorphic Countdown Box (Toned-down glow) */}
            <div className="w-[92%] sm:w-[80%] md:w-[65%] lg:w-[50%] xl:w-[44%] max-w-2xl bg-black/85 border border-red-500/35 ring-1 ring-white/10 rounded-2xl sm:rounded-3xl px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_16px_rgba(239,68,68,0.2)] flex flex-col items-center justify-center backdrop-blur-xl">
              <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-bold tracking-[0.22em] text-white/90 uppercase mb-1.5 sm:mb-2">
                {timeLeft.isLive ? "EVENT IS NOW LIVE" : "GOING LIVE IN"}
              </span>

              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5 lg:gap-6 text-white">
                {/* Days */}
                <div className="flex flex-col items-center min-w-8 sm:min-w-12 md:min-w-16 lg:min-w-20">
                  <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black font-mono tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="text-[7px] sm:text-[9px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-gold mt-0.5 sm:mt-1">
                    DAYS
                  </span>
                </div>

                <span className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-bold text-red-500/80 -translate-y-2 sm:-translate-y-3">
                  :
                </span>

                {/* Hours */}
                <div className="flex flex-col items-center min-w-8 sm:min-w-12 md:min-w-16 lg:min-w-20">
                  <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black font-mono tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[7px] sm:text-[9px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-gold mt-0.5 sm:mt-1">
                    HRS
                  </span>
                </div>

                <span className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-bold text-red-500/80 -translate-y-2 sm:-translate-y-3">
                  :
                </span>

                {/* Minutes */}
                <div className="flex flex-col items-center min-w-8 sm:min-w-12 md:min-w-16 lg:min-w-20">
                  <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black font-mono tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[7px] sm:text-[9px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-gold mt-0.5 sm:mt-1">
                    MIN
                  </span>
                </div>

                <span className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-bold text-red-500/80 -translate-y-2 sm:-translate-y-3">
                  :
                </span>

                {/* Seconds */}
                <div className="flex flex-col items-center min-w-8 sm:min-w-12 md:min-w-16 lg:min-w-20">
                  <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black font-mono tracking-tight text-[#ff4466] drop-shadow-[0_2px_8px_rgba(255,68,102,0.3)]">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[7px] sm:text-[9px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-gold mt-0.5 sm:mt-1">
                    SEC
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle Footer Note */}
            <div className="mt-8 sm:mt-10 border-t border-border/60 pt-6 w-full max-w-md">
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
