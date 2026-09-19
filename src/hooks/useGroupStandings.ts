import { useCallback, useEffect, useRef, useState } from "react";
import { fetchGroupStandings, type GroupStandings } from "@/lib/live-scores";

/**
 * Standings move only when a tie concludes.
 *
 * This reads the shared group-tree snapshot, the same one results and court
 * discovery use, so most refreshes cost nothing at all.
 */
const STANDINGS_INTERVAL_MS = 2 * 60_000;

export interface GroupStandingsState {
  groups: GroupStandings[];
  isLoading: boolean;
  /** Distinguishes "could not load" from "no standings yet". */
  failed: boolean;
}

/** Per-group league tables, refreshed in the background. */
export function useGroupStandings(): GroupStandingsState {
  const [groups, setGroups] = useState<GroupStandings[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const mountedRef = useRef(true);

  const load = useCallback(async (signal?: AbortSignal) => {
    const result = await fetchGroupStandings(undefined, signal);
    if (!mountedRef.current || signal?.aborted) return;
    if (result === null) {
      // Keep the last good tables rather than wiping them on one bad refresh.
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
        timer = setInterval(() => void load(controller.signal), STANDINGS_INTERVAL_MS);
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
