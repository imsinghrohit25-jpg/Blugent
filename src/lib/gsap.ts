import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// ─── Global registration ──────────────────────────────────────────────────────
// Called once from SmoothScrollProvider (root layout). Safe to call multiple
// times — GSAP's registerPlugin is idempotent.

export function registerGSAPPlugins() {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export { gsap, ScrollTrigger, ScrollToPlugin };

// ─── Easing presets ───────────────────────────────────────────────────────────

export const ease = {
  /** Smooth deceleration — good for most UI motion */
  out: [0.16, 1, 0.3, 1] as const,
  /** Fast acceleration — good for exits */
  in: [0.7, 0, 0.84, 0] as const,
  /** Balanced — good for morphs and cross-fades */
  inOut: [0.76, 0, 0.24, 1] as const,
  /** Spring-like overshoot */
  spring: "elastic.out(1, 0.6)",
} as const;

// ─── One-shot animation helpers ───────────────────────────────────────────────

/** Fade in from below. Call inside a GSAP context for scoped cleanup. */
export function fadeUp(target: gsap.TweenTarget, vars?: gsap.TweenVars) {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", ...vars }
  );
}

/** Simple opacity fade-in. */
export function fadeIn(target: gsap.TweenTarget, vars?: gsap.TweenVars) {
  return gsap.fromTo(
    target,
    { opacity: 0 },
    { opacity: 1, duration: 0.6, ease: "power2.out", ...vars }
  );
}

/** Staggered fade-up for a list of elements. */
export function staggerFadeUp(target: gsap.TweenTarget, vars?: gsap.TweenVars) {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08, ...vars }
  );
}

/** Scale + fade entrance. */
export function scaleIn(target: gsap.TweenTarget, vars?: gsap.TweenVars) {
  return gsap.fromTo(
    target,
    { opacity: 0, scale: 0.92 },
    { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)", ...vars }
  );
}

// ─── ScrollTrigger utilities ──────────────────────────────────────────────────

export interface ScrollRevealOptions {
  /** Element that owns the ScrollTrigger (used as trigger by default). */
  trigger: Element;
  /** Pre-built GSAP tween or timeline to drive. */
  animation: gsap.core.Tween | gsap.core.Timeline;
  start?: string;
  end?: string;
  /** false = toggle-play, number = lag-factor for scrubbing (e.g. 0.6). */
  scrub?: boolean | number;
}

/**
 * Attaches a ScrollTrigger to an existing tween / timeline.
 * Returns the ScrollTrigger instance so callers can kill() it manually.
 *
 * @example
 * const tween = gsap.fromTo(".card", { opacity: 0 }, { opacity: 1 });
 * const st = createScrollReveal({ trigger: containerEl, animation: tween });
 * // cleanup: st.kill();
 */
export function createScrollReveal({
  trigger,
  animation,
  start = "top 80%",
  end = "bottom 20%",
  scrub = false,
}: ScrollRevealOptions) {
  return ScrollTrigger.create({
    trigger,
    start,
    end,
    scrub,
    animation,
    toggleActions: "play none none reverse",
  });
}

// ─────────────────────────────────────────────────────────────────────────────

export interface ScrubAnimationOptions {
  /** CSS selector or DOM element to animate. */
  target: gsap.TweenTarget;
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  /** Defaults to the target element itself. */
  trigger?: Element | string;
  start?: string;
  end?: string;
  /** Smoothing lag — 0 = frame-perfect, 1 = 1 s lag. Default: 0.8. */
  scrub?: number;
}

/**
 * Creates an animation whose progress is directly tied to scroll position.
 * Ideal for parallax layers, progress bars, and timeline scrubs.
 *
 * @example
 * scrubAnimation({
 *   target: heroRef.current,
 *   from: { y: 0, opacity: 1 },
 *   to:   { y: -120, opacity: 0 },
 *   start: "top top",
 *   end:   "bottom top",
 * });
 */
export function scrubAnimation({
  target,
  from,
  to,
  trigger,
  start = "top top",
  end = "bottom top",
  scrub = 0.8,
}: ScrubAnimationOptions) {
  return gsap.fromTo(target, from, {
    ...to,
    ease: "none",
    scrollTrigger: {
      trigger: trigger ?? (typeof target === "string" ? target : undefined),
      start,
      end,
      scrub,
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────

export interface PinSectionOptions {
  start?: string;
  /** Either a CSS end value ("+=200%") or "auto" to unpin after the section scrolls past. */
  end?: string;
  /** Adds extra scroll distance before the pin kicks in. 0–1, default 1. */
  anticipatePin?: number;
}

/**
 * Pins `element` to the viewport for the given scroll range.
 * Combine with `scrubAnimation` on child elements to build scroll-driven
 * sequences inside a pinned section.
 *
 * @example
 * pinSection(sectionRef.current, { end: "+=300%" });
 */
export function pinSection(element: Element | string, options: PinSectionOptions = {}) {
  const { start = "top top", end = "+=100%", anticipatePin = 1 } = options;
  return ScrollTrigger.create({
    trigger: element,
    start,
    end,
    pin: true,
    pinSpacing: true,
    anticipatePin,
  });
}

// ─────────────────────────────────────────────────────────────────────────────

export interface BatchRevealOptions {
  /** How far from the viewport bottom to trigger (e.g. "bottom 90%"). */
  start?: string;
  /** Stagger in seconds between each element's animation. */
  interval?: number;
  /** Extra delay before the first element in a batch. */
  batchMax?: number;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
}

/**
 * Uses `ScrollTrigger.batch` to reveal many elements with a coordinated
 * stagger as they scroll into view — more performant than one trigger per
 * element for large lists.
 *
 * @example
 * batchReveal(".card", { interval: 0.1 });
 */
export function batchReveal(targets: string, options: BatchRevealOptions = {}) {
  const {
    start = "top 90%",
    interval = 0.08,
    batchMax = 3,
    from = { opacity: 0, y: 32 },
    to = { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
  } = options;

  return ScrollTrigger.batch(targets, {
    start,
    batchMax,
    onEnter: (batch) => gsap.fromTo(batch, from, { ...to, stagger: interval }),
    onLeaveBack: (batch) => gsap.to(batch, { opacity: 0, y: (from.y ?? 0) as number, stagger: interval }),
  });
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Forces ScrollTrigger to recalculate all trigger positions.
 * Call after async content loads (images, fonts, dynamic data) or after
 * a layout change that wasn't picked up by the built-in ResizeObserver.
 */
export function refreshScrollTriggers(safe = true) {
  if (safe) {
    // Deferred to the next RAF tick so any pending layout work completes first.
    requestAnimationFrame(() => ScrollTrigger.refresh());
  } else {
    ScrollTrigger.refresh();
  }
}
