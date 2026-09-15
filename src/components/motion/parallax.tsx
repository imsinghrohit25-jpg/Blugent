"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Scroll multiplier. Positive values move the content upward as you scroll
   * (content travels slower than the page); negative values move it downward.
   * Range: typically -0.5 to 0.5.
   */
  speed?: number;
}

/**
 * Wraps children in a scroll-driven parallax container.
 * The outer div clips overflow so content never leaks outside its bounds.
 */
export function Parallax({ children, className, speed = 0.3 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Translate as a percentage of the element's own height
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -50}%`, `${speed * 50}%`]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
