"use client";

import { Suspense } from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, Preload } from "@react-three/drei";
import { cn } from "@/lib/utils";

interface SceneCanvasProps extends Omit<CanvasProps, "children"> {
  children: React.ReactNode;
  className?: string;
  /** Fallback shown while the scene is loading */
  fallback?: React.ReactNode;
  /** Disable adaptive DPR (useful for high-fidelity screenshots) */
  fixedDpr?: boolean;
}

/**
 * Production-ready R3F canvas with:
 * - Adaptive DPR (scales pixel ratio down when FPS drops)
 * - Adaptive events (disables costly pointer hit-testing when idle)
 * - Preload (eagerly processes all useLoader assets)
 * - Alpha background by default
 * - Sensible DPR ceiling of 1.5
 */
export function SceneCanvas({
  children,
  className,
  fallback = null,
  fixedDpr = false,
  gl,
  dpr,
  ...props
}: SceneCanvasProps) {
  return (
    <Canvas
      className={cn("size-full", className)}
      dpr={dpr ?? [1, 1.5]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        ...gl,
      }}
      {...props}
    >
      {!fixedDpr && <AdaptiveDpr pixelated />}
      <AdaptiveEvents />
      <Suspense fallback={fallback}>{children}</Suspense>
      <Preload all />
    </Canvas>
  );
}
