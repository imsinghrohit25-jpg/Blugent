import type { Variants, Transition } from "framer-motion";

// ─── Shared transitions ───────────────────────────────────────────────────────

export const spring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const snappy: Transition = {
  duration: 0.4,
  ease: [0.16, 1, 0.3, 1],
};

export const smooth: Transition = {
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1],
};

export const slow: Transition = {
  duration: 1.1,
  ease: [0.16, 1, 0.3, 1],
};

// ─── Variant factories ────────────────────────────────────────────────────────

export function fadeUpVariants(offset = 28, duration = 0.7): Variants {
  return {
    hidden: { opacity: 0, y: offset },
    visible: { opacity: 1, y: 0, transition: { duration, ease: [0.16, 1, 0.3, 1] } },
  };
}

export function fadeInVariants(duration = 0.6): Variants {
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration, ease: "easeOut" } },
  };
}

export function scaleInVariants(scale = 0.92, duration = 0.5): Variants {
  return {
    hidden: { opacity: 0, scale },
    visible: { opacity: 1, scale: 1, transition: { duration, ease: [0.16, 1, 0.3, 1] } },
  };
}

export function slideInVariants(
  direction: "left" | "right" | "up" | "down" = "up",
  offset = 40,
  duration = 0.7
): Variants {
  const isHorizontal = direction === "left" || direction === "right";
  const sign = direction === "right" || direction === "down" ? 1 : -1;
  const t = { duration, ease: [0.16, 1, 0.3, 1] as const };

  if (isHorizontal) {
    return {
      hidden: { opacity: 0, x: sign * offset },
      visible: { opacity: 1, x: 0, transition: t },
    };
  }
  return {
    hidden: { opacity: 0, y: sign * offset },
    visible: { opacity: 1, y: 0, transition: t },
  };
}

// ─── Stagger container ────────────────────────────────────────────────────────

export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

// ─── Reusable preset variants ─────────────────────────────────────────────────

export const fadeUp = fadeUpVariants();
export const fadeIn = fadeInVariants();
export const scaleIn = scaleInVariants();
export const stagger = staggerContainer();

// ─── Page transition ──────────────────────────────────────────────────────────

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: "easeIn" } },
};
