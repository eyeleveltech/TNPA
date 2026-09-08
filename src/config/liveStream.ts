/**
 * Helper to safely extract an 11-character YouTube video ID from any input:
 * - Full watch URL: https://www.youtube.com/watch?v=XXXXX
 * - Live stream URL: https://www.youtube.com/live/XXXXX
 * - Short URL: https://youtu.be/XXXXX
 * - Embed URL: https://www.youtube.com/embed/XXXXX
 * - Or raw 11-char ID: XXXXX
 */
export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return "";
  const trimmed = urlOrId.trim();
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/))([\w-]{11})/i
  );
  if (match && match[1]) return match[1];
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  return "";
}

export interface LiveStreamConfig {
  // YouTube Video URLs or IDs for Court 1 & Court 2
  court1VideoId: string;
  court2VideoId: string;

  // Court Labels & Match Context (optional)
  court1Title: string;
  court2Title: string;
  court1Match?: string;
  court2Match?: string;

  // Official Channel URL for fallback / subscription
  youtubeChannelUrl: string;
}

export const LIVE_STREAM_CONFIG: LiveStreamConfig = {
  // ─── DEVELOPER INPUT HERE ────────────────────────────────────────────────
  // Paste full YouTube URLs or just the Video IDs:
  court1VideoId: "",
  court2VideoId: "",

  // Court details
  court1Title: "Court 1",
  court2Title: "Court 2",
  court1Match: "Center Court Match",
  court2Match: "Court 2 Match",

  // Official YouTube Channel
  youtubeChannelUrl: "https://www.youtube.com/channel/UCE_hcfY87sko-R60DCXnYzg",
};

/**
 * Automatically true whenever either court has a valid YouTube ID or URL entered.
 */
export const isLiveActive = Boolean(
  extractYouTubeId(LIVE_STREAM_CONFIG.court1VideoId) ||
  extractYouTubeId(LIVE_STREAM_CONFIG.court2VideoId)
);
