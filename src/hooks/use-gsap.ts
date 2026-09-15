"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGSAPPlugins } from "@/lib/gsap";

// useLayoutEffect fires synchronously after DOM mutations — preferred for GSAP.
// Falls back to useEffect on the server (where window is undefined).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type GSAPContextCallback = (
  context: gsap.Context,
  gsapInstance: typeof gsap,
  ScrollTriggerInstance: typeof ScrollTrigger
) => void | (() => void);

/**
 * Runs `callback` inside a GSAP context tied to `scope` (defaults to the
 * returned ref). The context is automatically reverted on unmount.
 *
 * @example
 * const containerRef = useGSAP((ctx, gsap) => {
 *   gsap.fromTo(".item", { opacity: 0 }, { opacity: 1, stagger: 0.1 });
 * });
 * return <div ref={containerRef}>…</div>;
 */
export function useGSAP<T extends HTMLElement = HTMLDivElement>(
  callback: GSAPContextCallback,
  deps: React.DependencyList = []
) {
  const scopeRef = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    registerGSAPPlugins();

    const ctx = gsap.context(() => {
      return callback(ctx, gsap, ScrollTrigger);
    }, scopeRef);

    return () => ctx.revert();
  }, deps); // deps intentionally passed through; callback is stable by convention

  return scopeRef;
}
