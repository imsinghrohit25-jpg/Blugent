"use client";

import { useEffect } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { registerGSAPPlugins } from "@/lib/gsap";

/**
 * Root-level provider.
 *
 * Registers GSAP plugins once — at the top of the component tree and before
 * any descendant can attempt to use ScrollTrigger. useLenis() then drives
 * the Lenis ↔ ScrollTrigger sync.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // Plugin registration must happen client-side, before any animation runs.
  // useEffect is safe here because GSAP animations are triggered by scroll /
  // viewport intersection, never on the initial synchronous render.
  useEffect(() => {
    registerGSAPPlugins();
  }, []);

  useLenis();
  return <>{children}</>;
}
