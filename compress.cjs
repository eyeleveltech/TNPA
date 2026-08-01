const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const { execSync } = require('child_process');

console.log("Starting video compression...");
try {
  // -vcodec libx264: H.264 video codec
  // -crf 28: High compression (lower quality but much smaller size)
  // -preset fast: Faster compression speed
  // -vf scale=-2:720: Resize to 720p height to reduce size
  // -an: Remove audio (since it's a background video and muted anyway)
  execSync(`"${ffmpegPath}" -i "src/assets/TNPPL  VID  V2  .mp4" -vcodec libx264 -crf 28 -preset fast -vf scale=-2:720 -an -y "src/assets/hero.mp4"`, { stdio: 'inherit' });
  console.log("Video compression complete! Saved as hero.mp4");
} catch (error) {
  console.error("Compression failed:", error.message);
}
