"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const ParticleFieldScene = dynamic(
  () => import("@/components/visuals/particle-field-scene").then((m) => m.ParticleFieldScene),
  { ssr: false }
);

function subscribeResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function useIsMobile() {
  return useSyncExternalStore(
    subscribeResize,
    () => window.innerWidth < 768,
    () => false
  );
}

export function ParticleField({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  if (reducedMotion) {
    return (
      <div
        className={cn(
          "bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(37,99,235,0.25),transparent)]",
          className
        )}
      />
    );
  }

  return (
    <div className={cn(className)}>
      <ParticleFieldScene density={isMobile ? 160 : 420} />
    </div>
  );
}
