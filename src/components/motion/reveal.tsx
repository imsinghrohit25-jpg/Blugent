"use client";

import { motion, type Variants } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  as?: "div" | "li";
  once?: boolean;
}

const offset = 28;

function getVariants(direction: RevealProps["direction"]): Variants {
  const distance: Record<string, { x?: number; y?: number }> = {
    up: { y: offset },
    down: { y: -offset },
    left: { x: offset },
    right: { x: -offset },
    none: {},
  };

  return {
    hidden: { opacity: 0, ...distance[direction ?? "up"] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };
}

export function Reveal({ children, className, delay = 0, direction = "up", once = true, as = "div" }: RevealProps) {
  const MotionTag = as === "li" ? motion.li : motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={getVariants(direction)}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, direction = "up", as = "div" }: RevealProps) {
  const MotionTag = as === "li" ? motion.li : motion.div;
  return (
    <MotionTag className={className} variants={getVariants(direction)}>
      {children}
    </MotionTag>
  );
}
