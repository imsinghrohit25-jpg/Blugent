"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, type SpringOptions } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** Attraction strength: 0 = none, 1 = full displacement, 0.3 is a good default */
  strength?: number;
  springConfig?: SpringOptions;
}

const defaultSpring: SpringOptions = { stiffness: 200, damping: 20, mass: 0.5 };

/**
 * Wraps its children with a subtle magnetic hover effect — the element
 * drifts toward the cursor while hovered and snaps back on leave.
 */
export function Magnetic({
  children,
  className,
  strength = 0.3,
  springConfig = defaultSpring,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set((e.clientX - cx) * strength);
    rawY.set((e.clientY - cy) * strength);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
