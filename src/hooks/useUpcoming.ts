import { useCallback, useEffect, useRef, useState } from "react";
import { fetchUpcoming, type GroupUpcoming } from "@/lib/live-scores";

/**
 * The list of what is still to come shrinks only when a match starts.
 *
 * Reads the shared group snapshot, the same one results, standings and court
 * discovery use, so most refreshes cost no request at all.
 */
const UPCOMING_INTERVAL_MS = 2 * 60_000;

export interface UpcomingState {
  groups: GroupUpcoming[];
  isLoading: boolean;
  /** Distinguishes "could not load" from "nothing left to play". */
  failed: boolean;
}

/** Matches and ties still to be played, refreshed in the background. */
export function useUpcoming(): UpcomingState {
  const [groups, setGroups] = useState<GroupUpcoming[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const mountedRef = useRef(true);

  const load = useCallback(async (signal?: AbortSignal) => {
    const result = await fetchUpcoming(undefined, signal);
    if (!mountedRef.current || signal?.aborted) return;
    if (result === null) {
      // Keep the last good list rather than wiping it on one bad refresh.
      setFailed(true);
    } else {
      setGroups(result);
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
        timer = setInterval(() => void load(controller.signal), UPCOMING_INTERVAL_MS);
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

  return { groups, isLoading, failed };
}
