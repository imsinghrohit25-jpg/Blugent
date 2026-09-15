"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Word-by-word reveal ──────────────────────────────────────────────────────

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

const wordVariant = {
  hidden: { opacity: 0, y: "0.4em" },
  visible: { opacity: 1, y: "0em" },
};

export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  once = true,
  as: Tag = "p",
}: TextRevealProps) {
  const words = text.split(" ");

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.p;

  return (
    <MotionTag
      className={cn("overflow-hidden", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariant}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
          style={{ marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}

// ─── Character-by-character reveal ───────────────────────────────────────────

const charVariant = {
  hidden: { opacity: 0, y: "0.6em" },
  visible: { opacity: 1, y: "0em" },
};

export function CharReveal({
  text,
  className,
  delay = 0,
  stagger = 0.025,
  once = true,
  as: Tag = "p",
}: TextRevealProps) {
  const chars = text.split("");

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.p;

  return (
    <MotionTag
      className={cn("overflow-hidden", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={charVariant}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </MotionTag>
  );
}
