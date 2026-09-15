"use client";

import dynamic from "next/dynamic";
import { ScrollProgress } from "@/components/motion/scroll-progress";

// Dynamic imports with ssr: false are only allowed inside Client Components in Next.js 16+
const AnimatedCursor = dynamic(
  () => import("@/components/motion/animated-cursor").then((m) => m.AnimatedCursor),
  { ssr: false }
);

const LoadingScreen = dynamic(
  () => import("@/components/motion/loading-screen").then((m) => m.LoadingScreen),
  { ssr: false }
);

export function ClientEffects() {
  return (
    <>
      <LoadingScreen />
      <AnimatedCursor />
      <ScrollProgress
        color="linear-gradient(to right, #d946ef, #818cf8, #3b82f6)"
        height={2}
      />
    </>
  );
}
