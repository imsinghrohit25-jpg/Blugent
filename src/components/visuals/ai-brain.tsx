"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { VisualFallback } from "@/components/visuals/visual-fallback";
import { cn } from "@/lib/utils";

const NetworkSphere = dynamic(
  () => import("@/components/visuals/network-sphere").then((m) => m.NetworkSphere),
  { ssr: false, loading: () => <VisualFallback className="size-full" /> }
);

export function AIBrain({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <VisualFallback className={cn("size-full", className)} />;
  }

  return (
    <div className={cn("size-full", className)}>
      <NetworkSphere
        nodeCount={140}
        radius={2.1}
        color="#d4af37"
        lineColor="#3b82f6"
        rotationSpeed={0.12}
        pulse
        interactive={false}
      />
    </div>
  );
}
