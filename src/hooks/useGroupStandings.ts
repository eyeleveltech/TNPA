import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchGroupStandings,
  fetchKnockoutStandings,
  fetchOverallStandings,
  type GroupStandingRow,
  type GroupStandings,
} from "@/lib/live-scores";

/**
 * Standings move only when a tie concludes.
 *
 * The group table reads the shared snapshot that results and court discovery
 * already use, so most of the work here is one small leaderboard call.
 */
const STANDINGS_INTERVAL_MS = 2 * 60_000;

export interface GroupStandingsState {
  groups: GroupStandings[];
  /** All twelve ranked together. */
  overall: GroupStandingRow[];
  /** Null until the bracket exists — the knockout view then appears on its own. */
  knockout: GroupStandingRow[] | null;
  isLoading: boolean;
  /** Distinguishes "could not load" from "no standings yet". */
  failed: boolean;
}

/** Group, overall and knockout tables, refreshed in the background. */
export function useGroupStandings(): GroupStandingsState {
  const [groups, setGroups] = useState<GroupStandings[]>([]);
  const [overall, setOverall] = useState<GroupStandingRow[]>([]);
  const [knockout, setKnockout] = useState<GroupStandingRow[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const mountedRef = useRef(true);

  const load = useCallback(async (signal?: AbortSignal) => {
    const [groupResult, overallResult, knockoutResult] = await Promise.all([
      fetchGroupStandings(undefined, signal),
      fetchOverallStandings(undefined, signal),
      fetchKnockoutStandings(undefined, signal),
    ]);
    if (!mountedRef.current || signal?.aborted) return;

    // Each table keeps its last good copy rather than being wiped by one bad
    // refresh, and the knockout staying null simply means it does not exist.
    if (groupResult !== null) setGroups(groupResult);
    if (overallResult !== null) setOverall(overallResult);
    setKnockout(knockoutResult);
    setFailed(groupResult === null && overallResult === null);
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

  return { groups, overall, knockout, isLoading, failed };
}
