/**
 * Auction-day gate for the hero's third CTA.
 *
 * The Grand Player Auction is 4 August 2026 (see Teams.tsx). Up to and
 * including that date the hero points at the livestream; after it, at a
 * durable CTA so we never ship a dead link.
 *
 * Dates are compared as local YYYY-MM-DD strings, deliberately. Using
 * `new Date("2026-08-04")` would parse as UTC midnight = 05:30 IST, flipping
 * the CTA five and a half hours early for the audience that actually cares.
 * Lexicographic comparison of zero-padded ISO dates is ordering-correct.
 */

export const AUCTION_DATE = "2026-08-04";
export const AUCTION_STREAM_URL = "https://www.youtube.com/live/aSpkMbhuvU4";

/** Local calendar date as YYYY-MM-DD (not UTC — see module note). */
export function toLocalISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * True on or before auction day.
 *   isAuctionUpcoming(new Date("2026-08-03T23:00:00")) === true
 *   isAuctionUpcoming(new Date("2026-08-04T23:59:00")) === true   // inclusive
 *   isAuctionUpcoming(new Date("2026-08-05T00:01:00")) === false
 */
export function isAuctionUpcoming(
  now: Date = new Date(),
  cutoff: string = AUCTION_DATE,
): boolean {
  return toLocalISODate(now) <= cutoff;
}

export interface HeroTertiaryCta {
  label: string;
  href: string;
  external: boolean;
}

/**
 * The hero's third CTA. Called plainly during render — no state, no effect.
 *
 * Known limitation, accepted: a tab left open across local midnight 4→5 Aug
 * won't re-evaluate until something else triggers a render. That's one stale
 * button, for one night, on a tab nobody is looking at — not worth a timer.
 */
export function getHeroTertiaryCta(now: Date = new Date()): HeroTertiaryCta {
  return isAuctionUpcoming(now)
    ? { label: "Watch the Auction", href: AUCTION_STREAM_URL, external: true }
    : { label: "Explore Season 2", href: "#about", external: false };
}
