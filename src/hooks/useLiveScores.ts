import { useCallback, useEffect, useRef, useState } from "react";
import {
  API_BASE,
  COURT_IDS,
  POLL_INTERVAL_MS,
  POLL_INTERVAL_SOCKET_MS,
  SOCKET_REFRESH_THROTTLE_MS,
  TOURNAMENT_SLUG,
  discoverCourtIds,
  fetchAllCourts,
  type CourtResult,
} from "@/lib/live-scores";
import { connectLiveSocket } from "@/lib/live-socket";

export interface LiveScoresState {
  courts: CourtResult[];
  /** True only for the very first load, so refreshes never flash a skeleton. */
  isInitialLoading: boolean;
  isRefreshing: boolean;
  /** Set when every court failed — i.e. the server itself is unreachable. */
  error: string | null;
  lastUpdated: Date | null;
  /** Polling is suspended while the tab is hidden. */
  isPaused: boolean;
  /** True when the push socket is connected and driving updates. */
  isLiveConnected: boolean;
  refresh: () => void;
}

/**
 * Keeps the board current, using push where possible and polling always.
 *
 * Two mechanisms, deliberately layered rather than swapped:
 *
 *  1. A socket connection to the scoring server. Every event it sends is
 *     treated purely as "something changed" and triggers an immediate refetch.
 *     Its payloads are never parsed, so we need none of Rizzfitt's event
 *     contract, and the socket can never put wrong data on screen.
 *  2. Interval polling, which runs regardless. While the socket is connected it
 *     backs off to a slow safety net; when the socket is down it takes over at
 *     the full rate.
 *
 * The result degrades cleanly: a socket that never connects leaves the page
 * behaving exactly as it did before this existed.
 *
 * Three further behaviours worth knowing:
 *
 *  - Polling stops while the tab is hidden and fires immediately on return. A
 *    scoreboard left open in a background tab otherwise burns one request per
 *    court, forever, for nobody.
 *  - A failed cycle keeps the previous scores on screen, flagged `isStale`.
 *    Blanking a live board because one poll timed out is worse than showing a
 *    score a few seconds old, so the UI degrades to a warning instead.
 *  - The feed carries no timestamps of any kind, so freshness is measured here.
 */
export function useLiveScores(
  courtIds: readonly number[] = COURT_IDS,
  intervalMs: number = POLL_INTERVAL_MS,
): LiveScoresState {
  const [courts, setCourts] = useState<CourtResult[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  /* Courts actually used by this tournament. Starts as the fallback guess and
     widens once the fixture data answers — never narrows, so a discovery that
     misses something cannot drop a court we were already watching. */
  const [activeCourtIds, setActiveCourtIds] = useState<readonly number[]>(courtIds);

  const abortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);
  // Guards against overlapping cycles if the network is slower than the tick.
  const inFlightRef = useRef(false);
  // Timestamp of the last socket-triggered refetch, for throttling bursts.
  const lastSocketRefreshRef = useRef(0);

  /* Discover the real court list once, in the background. Failure is silent:
     the fallback list keeps working, which matters because this uses an
     endpoint the provider has not formally documented. */
  useEffect(() => {
    const controller = new AbortController();
    void discoverCourtIds(undefined, controller.signal).then((found) => {
      if (!found || !mountedRef.current) return;
      setActiveCourtIds((current) => {
        const merged = [...new Set([...current, ...found])].sort((a, b) => a - b);
        return merged.length === current.length ? current : merged;
      });
    });
    return () => controller.abort();
  }, []);

  const load = useCallback(async () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsRefreshing(true);
    try {
      const results = await fetchAllCourts(activeCourtIds, controller.signal);
      if (!mountedRef.current || controller.signal.aborted) return;

      /* A court whose request FAILED keeps its last known match rather than
         blanking. fetchCourt resolves errors instead of throwing, so without
         this a single bad cycle — one dropped packet on venue wifi — replaces
         every live score with an empty result and the whole board vanishes
         until the next poll. That flicker is far worse than a score that is a
         few seconds old, and it is what users actually reported.

         Only errors are carried over. A court that genuinely reports no match
         still empties, so a finished match does not linger for ever. */
      setCourts((previous) =>
        results.map((result) => {
          if (result.error === null) return result;
          const last = previous.find((p) => p.courtId === result.courtId);
          return last?.match ? { ...result, match: last.match, isStale: true } : result;
        }),
      );
      setLastUpdated(new Date());

      // Only surface an error banner when NOTHING came back. A single court
      // erroring is shown on that court's own card instead.
      const allFailed = results.length > 0 && results.every((r) => r.error !== null);
      setError(allFailed ? results[0].error : null);
    } catch (err) {
      if (!mountedRef.current || controller.signal.aborted) return;
      setError(err instanceof Error ? err.message : "Could not reach the scoring server");
    } finally {
      if (mountedRef.current) {
        setIsRefreshing(false);
        setIsInitialLoading(false);
      }
      inFlightRef.current = false;
    }
  }, [activeCourtIds]);

  /* ── Push: any socket event means "go and re-read the feed" ── */
  useEffect(() => {
    const disconnect = connectLiveSocket(API_BASE, TOURNAMENT_SLUG, activeCourtIds, {
      onActivity: () => {
        // Nothing to update for a tab nobody is looking at.
        if (document.hidden) return;
        const now = Date.now();
        if (now - lastSocketRefreshRef.current < SOCKET_REFRESH_THROTTLE_MS) return;
        lastSocketRefreshRef.current = now;
        void load();
      },
      onConnectionChange: (connected) => {
        if (mountedRef.current) setIsLiveConnected(connected);
      },
    });
    return disconnect;
  }, [activeCourtIds, load]);

  /* ── Poll: full rate alone, slow safety net once push is connected ── */
  useEffect(() => {
    mountedRef.current = true;
    const activeInterval = isLiveConnected ? POLL_INTERVAL_SOCKET_MS : intervalMs;
    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (timer !== null) return;
      timer = setInterval(() => void load(), activeInterval);
    };

    const stop = () => {
      if (timer === null) return;
      clearInterval(timer);
      timer = null;
    };

    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
        stop();
      } else {
        setIsPaused(false);
        void load();
        start();
      }
    };

    void load();
    if (!document.hidden) start();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [load, intervalMs, isLiveConnected]);

  /* ── Teardown ── */
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
      inFlightRef.current = false;
    };
  }, []);

  const refresh = useCallback(() => {
    void load();
  }, [load]);

  return {
    courts,
    isInitialLoading,
    isRefreshing,
    error,
    lastUpdated,
    isPaused,
    isLiveConnected,
    refresh,
  };
}
