"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// useLayoutEffect fires synchronously after DOM mutations so GSAP can measure
// elements before the browser paints. On the server it doesn't exist, so we
// fall back to useEffect to avoid the "can't use useLayoutEffect on server"
// React warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Callback = (
  gsapInstance: typeof gsap,
  st: typeof ScrollTrigger
) => gsap.core.Tween | gsap.core.Timeline | ScrollTrigger | void;

/**
 * Runs `callback` inside a GSAP context scoped to `scopeRef`.
 *
 * - All tweens / ScrollTriggers created inside the callback are automatically
 *   killed when the component unmounts (via `ctx.revert()`).
 * - Pass `deps` the same way as `useEffect`; the context is rebuilt whenever
 *   a dependency changes (old triggers are killed first).
 *
 * @example
 * function HeroSection() {
 *   const ref = useScrollTrigger<HTMLElement>((gsap, ScrollTrigger) => {
 *     gsap.fromTo(".hero-title", { opacity: 0, y: 40 }, {
 *       opacity: 1, y: 0,
 *       scrollTrigger: { trigger: ".hero-title", start: "top 80%" },
 *     });
 *   });
 *
 *   return <section ref={ref}>…</section>;
 * }
 */
export function useScrollTrigger<T extends HTMLElement = HTMLDivElement>(
  callback: Callback,
  deps: React.DependencyList = []
) {
  const scopeRef = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      callback(gsap, ScrollTrigger);
    }, scopeRef);

    return () => {
      ctx.revert();
    };
  }, deps); // callback is not a dep by convention — it must be stable at call site

  return scopeRef;
}

// ─── Scrub helper hook ────────────────────────────────────────────────────────

interface ScrubOptions {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  start?: string;
  end?: string;
  scrub?: number;
}

/**
 * Convenience wrapper: pins the returned ref to its own element and applies
 * a scrub tween whose progress tracks scroll position.
 *
 * @example
 * const heroRef = useScrubAnimation({
 *   from: { y: 0, opacity: 1 },
 *   to:   { y: -80, opacity: 0 },
 *   start: "top top",
 *   end:   "bottom top",
 * });
 * return <section ref={heroRef}>…</section>;
 */
export function useScrubAnimation<T extends HTMLElement = HTMLDivElement>({
  from,
  to,
  start = "top top",
  end = "bottom top",
  scrub = 0.8,
}: ScrubOptions) {
  const ref = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el, from, {
        ...to,
        ease: "none",
        scrollTrigger: { trigger: el, start, end, scrub },
      });
    });

    return () => ctx.revert();
  }, []); // options are read once on mount; reactivity is caller's responsibility

  return ref;
}
