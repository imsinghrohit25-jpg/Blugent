"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function useLenis() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // ── Lenis ↔ ScrollTrigger sync ─────────────────────────────────────────
    //
    // ScrollTrigger needs to know about every scroll position update that
    // Lenis produces (Lenis drives scroll by intercepting wheel events and
    // applying its own eased delta to window.scrollY incrementally).
    //
    // 1. `lenis.on("scroll", ScrollTrigger.update)` — fires ScrollTrigger's
    //    recalc on every Lenis tick so trigger thresholds are always current.
    //
    // 2. `gsap.ticker.add(tick)` — replaces Lenis's own requestAnimationFrame
    //    loop with GSAP's centralised ticker, eliminating frame-doubling and
    //    ensuring both systems advance in lockstep on the same RAF callback.
    //    `time` is in seconds from GSAP; Lenis.raf expects milliseconds.
    //
    // 3. `lagSmoothing(0)` — disables GSAP's built-in catch-up when the tab
    //    was backgrounded, preventing a burst of scroll-trigger activations on
    //    tab focus.
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}
