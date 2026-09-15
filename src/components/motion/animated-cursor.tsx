"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SPRING_DOT  = { stiffness: 800, damping: 40, mass: 0.2 };
const SPRING_RING = { stiffness: 120, damping: 22, mass: 0.6 };

// Loaded via dynamic import with ssr:false — guaranteed browser-only execution.
export function AnimatedCursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Start off-screen so the cursor elements are invisible until the first
  // mousemove fires. Touch devices never fire mousemove, so they stay hidden.
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  const dotX  = useSpring(mx, SPRING_DOT);
  const dotY  = useSpring(my, SPRING_DOT);
  const ringX = useSpring(mx, SPRING_RING);
  const ringY = useSpring(my, SPRING_RING);

  const frameRef = useRef<number>(0);

  useEffect(() => {
    // On touch / coarse-pointer devices we don't enable the cursor overlay.
    // We do NOT call setState here — we just subscribe to DOM events.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("cursor-none");

    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        mx.set(e.clientX);
        my.set(e.clientY);
      });
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp   = () => setClicked(false);

    const onMouseOver = (e: MouseEvent) => {
      const isHoverable = (e.target as HTMLElement).closest(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor]"
      );
      setHovered(!!isHoverable);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup",   onMouseUp);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup",   onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(frameRef.current);
    };
  }, [mx, my]);

  return (
    <>
      {/* Outer tracking ring */}
      <motion.div
        aria-hidden
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width:  hovered ? 44 : 32,
          height: hovered ? 44 : 32,
        }}
        animate={{
          borderColor: hovered ? "rgba(217,70,239,0.8)" : "rgba(255,255,255,0.35)",
          scale: clicked ? 0.85 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed left-0 top-0 z-[99999] rounded-full border will-change-transform"
      />

      {/* Inner dot */}
      <motion.div
        aria-hidden
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width:  clicked ? 3 : 5,
          height: clicked ? 3 : 5,
        }}
        animate={{
          backgroundColor: hovered ? "#d946ef" : "#ffffff",
          scale: clicked ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed left-0 top-0 z-[99999] rounded-full will-change-transform"
      />
    </>
  );
}
