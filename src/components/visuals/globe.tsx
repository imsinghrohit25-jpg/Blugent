"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { VisualFallback } from "@/components/visuals/visual-fallback";
import { cn } from "@/lib/utils";

const NetworkSphere = dynamic(
  () => import("@/components/visuals/network-sphere").then((m) => m.NetworkSphere),
  { ssr: false, loading: () => <VisualFallback className="size-full" /> }
);

export function Globe({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <VisualFallback className={cn("size-full", className)} />;
  }

  return (
    <div className={cn("size-full", className)}>
      <NetworkSphere
        nodeCount={220}
        radius={2.6}
        color="#60a5fa"
        lineColor="#2563eb"
        rotationSpeed={0.08}
        interactive
      />
    </div>
  );
}
