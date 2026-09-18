import { useEffect, useRef, useState } from "react";
import {
  derivePhase,
  fetchDrawState,
  fetchTournamentInfo,
  tournamentStartsAt,
  type TournamentInfo,
  type TournamentPhase,
} from "@/lib/live-scores";

/**
 * How often to re-check whether the draw has been published.
 *
 * This reads the group tree, which is the heaviest call the page makes and
 * grows through the tournament — 353KB and up to 21 seconds by day two. The
 * thing it watches for flips exactly once, from unpublished to published, so
 * checking every five minutes is ample and a minute was wasteful.
 */
const DRAW_RECHECK_MS = 5 * 60_000;

export interface TournamentState {
  info: TournamentInfo | null;
  phase: TournamentPhase;
  /** Kick-off instant, for the countdown. */
  startsAt: Date | null;
  /** True once the draw exists; false while unpublished; null if unknown. */
  hasFixtures: boolean | null;
  isLoading: boolean;
}

/**
 * Tracks which page the scoreboard should be showing.
 *
 * Two things are watched, both cheap and both slow-moving:
 *
 *  1. The tournament record, read once, for the dates and venue. Driving the
 *     countdown from the same record the organisers edit means our page cannot
 *     disagree with their system about when play starts.
 *  2. Whether the draw has been published. Rizzfitt load fixtures close to the
 *     event, so this flips from false to true at some point and the page has
 *     to notice without anyone redeploying. Re-checked every minute, which is
 *     ample for something that changes once.
 *
 * The phase is also recomputed on a timer, so a page left open across the
 * start of play switches from countdown to live board on its own.
 */
export function useTournament(): TournamentState {
  const [info, setInfo] = useState<TournamentInfo | null>(null);
  const [hasFixtures, setHasFixtures] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, tick] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const controller = new AbortController();

    void fetchTournamentInfo(undefined, controller.signal).then((result) => {
      if (!mountedRef.current) return;
      setInfo(result);
      setIsLoading(false);
    });

    const checkDraw = () => {
      void fetchDrawState(undefined, controller.signal).then((draw) => {
        if (!mountedRef.current) return;
        setHasFixtures(draw.hasFixtures);
      });
    };
    checkDraw();
    const drawTimer = setInterval(checkDraw, DRAW_RECHECK_MS);

    // Re-evaluate the phase each second so a countdown that reaches zero rolls
    // straight into the live board without a reload.
    const phaseTimer = setInterval(() => {
      if (mountedRef.current) tick((n) => n + 1);
    }, 1_000);

    return () => {
      mountedRef.current = false;
      controller.abort();
      clearInterval(drawTimer);
      clearInterval(phaseTimer);
    };
  }, []);

  return {
    info,
    phase: derivePhase(info),
    startsAt: tournamentStartsAt(info),
    hasFixtures,
    isLoading,
  };
}
