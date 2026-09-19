import { useCallback, useEffect, useRef, useState } from "react";
import { fetchLeaderboard, type LeaderboardRow } from "@/lib/live-scores";

/**
 * Standings shift only when a tie concludes, so this is deliberately slow.
 *
 * It is cheap enough to poll faster — ~4KB on its own endpoint, unlike the
 * group tree — but there is nothing to gain from it.
 */
const LEADERBOARD_INTERVAL_MS = 2 * 60_000;

export interface LeaderboardState {
  rows: LeaderboardRow[];
  isLoading: boolean;
  /** Distinguishes "could not load" from "no standings yet". */
  failed: boolean;
}

/** Tournament standings, refreshed in the background. */
export function useLeaderboard(): LeaderboardState {
  const [rows, setRows] = useState<LeaderboardRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const mountedRef = useRef(true);

  const load = useCallback(async (signal?: AbortSignal) => {
    const result = await fetchLeaderboard(undefined, signal);
    if (!mountedRef.current || signal?.aborted) return;
    if (result === null) {
      // Keep the last good table rather than wiping it on one bad refresh.
      setFailed(true);
    } else {
      setRows(result);
      setFailed(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    const controller = new AbortController();
    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (timer === null) {
        timer = setInterval(() => void load(controller.signal), LEADERBOARD_INTERVAL_MS);
      }
    };
    const stop = () => {
      if (timer !== null) clearInterval(timer);
      timer = null;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else {
        void load(controller.signal);
        start();
      }
    };

    void load(controller.signal);
    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      mountedRef.current = false;
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      controller.abort();
    };
  }, [load]);

  return { rows, isLoading, failed };
}
