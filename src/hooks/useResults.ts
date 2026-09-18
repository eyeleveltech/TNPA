import { useCallback, useEffect, useRef, useState } from "react";
import { fetchResults, type TieResult } from "@/lib/live-scores";

/**
 * Results change only when a match ends, so a slow poll is plenty — the live
 * board already carries the fast-moving numbers.
 *
 * Three minutes, not one: this reads the group tree, the heaviest call the
 * page makes, and it grows as the tournament runs (353KB and up to 21 seconds
 * by day two). A finished match showing up a couple of minutes late costs
 * nothing; hammering a slow endpoint from every open phone at the venue does.
 */
const RESULTS_INTERVAL_MS = 3 * 60_000;

export interface ResultsState {
  ties: TieResult[];
  /** True until the first attempt settles, so nothing flashes on load. */
  isLoading: boolean;
  /** Distinguishes "could not load" from "nothing has finished yet". */
  failed: boolean;
}

/** Completed matches, grouped by tie, refreshed in the background. */
export function useResults(): ResultsState {
  const [ties, setTies] = useState<TieResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const mountedRef = useRef(true);

  const load = useCallback(async (signal?: AbortSignal) => {
    const result = await fetchResults(undefined, signal);
    if (!mountedRef.current || signal?.aborted) return;
    if (result === null) {
      // Keep whatever is already on screen; a failed refresh should not wipe
      // results that loaded fine a minute ago.
      setFailed(true);
    } else {
      setTies(result);
      setFailed(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    const controller = new AbortController();
    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (timer === null) timer = setInterval(() => void load(controller.signal), RESULTS_INTERVAL_MS);
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

  return { ties, isLoading, failed };
}
