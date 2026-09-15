"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  /** Target number to count up to */
  to: number;
  /** Starting value */
  from?: number;
  /** Animation duration in ms */
  duration?: number;
  /** Decimal places to show */
  decimals?: number;
  /** String prepended before the number */
  prefix?: string;
  /** String appended after the number */
  suffix?: string;
  className?: string;
  /** Delay before the animation starts (ms) */
  delay?: number;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function CountUp({
  to,
  from = 0,
  duration = 1800,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  delay = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(from);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const timer = setTimeout(() => {
      const start = performance.now();
      const range = to - from;

      function tick(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        setValue(from + range * easeOutCubic(progress));
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, from, to, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
