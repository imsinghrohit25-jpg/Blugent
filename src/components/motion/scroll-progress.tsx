"use client";

import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressProps {
  /** Tailwind color class or CSS color value for the bar */
  color?: string;
  /** Bar height in pixels */
  height?: number;
  /** Z-index */
  zIndex?: number;
}

/**
 * A thin progress indicator fixed at the top of the viewport that fills as
 * the user scrolls down the page.
 */
export function ScrollProgress({
  color = "rgb(37,99,235)",
  height = 3,
  zIndex = 9999,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height,
        background: color,
        transformOrigin: "0%",
        zIndex,
      }}
    />
  );
}
