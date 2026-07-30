import { useEffect, useRef, useState } from "react";

export interface ParallaxState {
  /** -1 .. 1 pointer offset from viewport center */
  mx: number;
  my: number;
  /** pixels scrolled */
  scrollY: number;
}

/**
 * Lightweight rAF-throttled pointer + scroll parallax source.
 * Disabled for coarse pointers and reduced-motion users.
 */
export function useParallax(): ParallaxState {
  const [state, setState] = useState<ParallaxState>({ mx: 0, my: 0, scrollY: 0 });
  const frame = useRef<number | null>(null);
  const target = useRef<ParallaxState>({ mx: 0, my: 0, scrollY: 0 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const fine = window.matchMedia("(pointer: fine)").matches;

    const schedule = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        setState({ ...target.current });
      });
    };

    const onMove = (e: PointerEvent) => {
      target.current.mx = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.my = (e.clientY / window.innerHeight) * 2 - 1;
      schedule();
    };

    const onScroll = () => {
      target.current.scrollY = window.scrollY;
      schedule();
    };

    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return state;
}
