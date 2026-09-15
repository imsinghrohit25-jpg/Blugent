"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

interface Crumb {
  label: string;
  href: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
  accent?: "magenta" | "electric" | "gold";
}

const accentMap = {
  magenta: {
    dot: "bg-magenta",
    text: "text-magenta-soft",
    border: "border-magenta/20",
    bg: "bg-magenta/[0.07]",
    glow: "rgba(217,70,239,0.18)",
    glowSecondary: "rgba(129,140,248,0.09)",
  },
  electric: {
    dot: "bg-electric",
    text: "text-electric-soft",
    border: "border-electric/20",
    bg: "bg-electric/[0.07]",
    glow: "rgba(59,130,246,0.18)",
    glowSecondary: "rgba(217,70,239,0.08)",
  },
  gold: {
    dot: "bg-gold",
    text: "text-gold-soft",
    border: "border-gold/20",
    bg: "bg-gold/[0.07]",
    glow: "rgba(212,175,55,0.15)",
    glowSecondary: "rgba(217,70,239,0.08)",
  },
};

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  accent = "magenta",
}: PageHeroProps) {
  const a = accentMap[accent];

  return (
    <section className="relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44">
      {/* Cinematic background gradient */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[700px]"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% -5%, ${a.glow}, transparent), radial-gradient(ellipse 50% 40% at 80% 20%, ${a.glowSecondary}, transparent)`,
        }}
      />

      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.12] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />

      {/* Horizontal shine line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-magenta/30 to-transparent" />

      <Container>
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="Breadcrumb"
            className="mb-10 flex items-center justify-center gap-1.5 text-xs text-white/30"
          >
            <Link href="/" className="transition-colors hover:text-white/60">
              Home
            </Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                <ChevronRight className="size-3 text-white/20" />
                <Link href={crumb.href} className="transition-colors hover:text-white/60">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </motion.nav>
        ) : null}

        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className={`inline-flex items-center gap-2.5 rounded-full border ${a.border} ${a.bg} px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${a.text}`}
            >
              <span className={`size-1.5 rounded-full ${a.dot} animate-glow-pulse`} />
              {eyebrow}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 text-balance text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white"
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description ? (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-white/45 sm:text-lg"
            >
              {description}
            </motion.p>
          ) : null}
        </div>

        {children ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-14"
          >
            {children}
          </motion.div>
        ) : null}
      </Container>
    </section>
  );
}
