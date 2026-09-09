import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LIVE_STREAM_CONFIG, isLiveActive, extractYouTubeId } from "@/config/liveStream";
import { Radio, Tv } from "lucide-react";
import LIVE_ARENA_BANNER from "@/assets/live_arena_banner.jpg";

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
          /* BANNER CARD SECTION: 16:9 UNCROPPED COUNTDOWN ARENA BANNER                */
          /* ========================================================================= */
          <div className="mx-auto w-full max-w-5xl px-4 pt-24 pb-12 sm:pt-28 sm:pb-16 flex flex-col items-center justify-center">
            {/* The Framed Banner Card with exact 16:9 aspect ratio - ZERO cropping */}
            <div className="relative w-full aspect-video overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[36px] border border-red-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(239,68,68,0.2)] flex flex-col items-center justify-center text-center p-4 sm:p-8 md:p-12 lg:p-14 select-none">
              {/* Ultra HD Banner Image - Exact 16:9 Uncut */}
              <img
                src={LIVE_ARENA_BANNER}
                alt="TNPPL Live Broadcast Banner"
                width={1920}
                height={1080}
                loading="eager"
                fetchPriority="high"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
              />

              {/* All Banner Content Elements placed on top of the image */}
              <div className="relative z-10 flex flex-col items-center justify-center w-full">
                {/* 1. YouTube 3D Vector Icon (Glow & Icon) */}
                <div className="relative mb-2.5 sm:mb-4 md:mb-5 lg:mb-6 flex items-center justify-center">
                  <div className="absolute h-10 w-14 sm:h-14 sm:w-20 md:h-16 md:w-24 rounded-full bg-red-600/40 blur-xl pointer-events-none" />
                  <svg
                    className="relative h-7 sm:h-10 md:h-12 lg:h-14 drop-shadow-[0_4px_16px_rgba(239,68,68,0.5)]"
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

                {/* 2. Razor-Sharp "COMING UP SOON" Title */}
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-[3.25rem] font-black text-white tracking-wide uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] mb-3 sm:mb-5 md:mb-7 font-sans">
                  COMING UP SOON
                </h1>

                {/* 3. Sleek Luxury Glassmorphic Countdown Box with spacious padding */}
                <div className="w-[94%] sm:w-[88%] md:w-[80%] max-w-2xl bg-black/45 border border-red-500/40 ring-1 ring-white/10 rounded-xl sm:rounded-2xl md:rounded-3xl px-3.5 py-2.5 sm:px-8 sm:py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(239,68,68,0.25)] flex flex-col items-center justify-center backdrop-blur-md">
                  <span className="text-[9px] sm:text-xs md:text-sm font-bold tracking-[0.25em] text-white/90 uppercase mb-1 sm:mb-2 md:mb-3">
                    {timeLeft.isLive ? "EVENT IS NOW LIVE" : "GOING LIVE IN"}
                  </span>

                  <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 text-white">
                    {/* Days */}
                    <div className="flex flex-col items-center min-w-7 sm:min-w-11 md:min-w-14 lg:min-w-16">
                      <span className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-black font-mono tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        {String(timeLeft.days).padStart(2, "0")}
                      </span>
                      <span className="text-[7px] sm:text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#f59e0b] mt-0.5 sm:mt-1">
                        DAYS
                      </span>
                    </div>

                    <span className="text-sm sm:text-2xl md:text-3xl lg:text-4xl font-bold text-red-500/80 -translate-y-1.5 sm:-translate-y-2.5">
                      :
                    </span>

                    {/* Hours */}
                    <div className="flex flex-col items-center min-w-7 sm:min-w-11 md:min-w-14 lg:min-w-16">
                      <span className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-black font-mono tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        {String(timeLeft.hours).padStart(2, "0")}
                      </span>
                      <span className="text-[7px] sm:text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#f59e0b] mt-0.5 sm:mt-1">
                        HRS
                      </span>
                    </div>

                    <span className="text-sm sm:text-2xl md:text-3xl lg:text-4xl font-bold text-red-500/80 -translate-y-1.5 sm:-translate-y-2.5">
                      :
                    </span>

                    {/* Minutes */}
                    <div className="flex flex-col items-center min-w-7 sm:min-w-11 md:min-w-14 lg:min-w-16">
                      <span className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-black font-mono tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        {String(timeLeft.minutes).padStart(2, "0")}
                      </span>
                      <span className="text-[7px] sm:text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#f59e0b] mt-0.5 sm:mt-1">
                        MIN
                      </span>
                    </div>

                    <span className="text-sm sm:text-2xl md:text-3xl lg:text-4xl font-bold text-red-500/80 -translate-y-1.5 sm:-translate-y-2.5">
                      :
                    </span>

                    {/* Seconds */}
                    <div className="flex flex-col items-center min-w-7 sm:min-w-11 md:min-w-14 lg:min-w-16">
                      <span className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-black font-mono tracking-tight text-[#ff2a55] drop-shadow-[0_2px_12px_rgba(255,42,85,0.45)]">
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </span>
                      <span className="text-[7px] sm:text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#f59e0b] mt-0.5 sm:mt-1">
                        SEC
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content text placed BELOW the banner */}
            <div className="mt-6 sm:mt-8 text-center select-none">
              <p className="text-sm sm:text-base md:text-lg font-black tracking-wider uppercase text-[#f59e0b] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                ONE GAME ONE FAMILY
              </p>
              <p className="mt-1 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-[#7dd3fc]">
                AT EXPRESS AVENUE MALL, CENTRAL ATRIUM, CHENNAI
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
