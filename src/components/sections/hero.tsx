"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";

// ─── Cycling service labels ───────────────────────────────────────────────────
const SERVICES = [
  { text: "AI Development",        color: "#3B82F6" },
  { text: "Web Development",       color: "#8B5CF6" },
  { text: "SaaS Platforms",        color: "#EC4899" },
  { text: "UI/UX Design",          color: "#3B82F6" },
  { text: "Automation",            color: "#8B5CF6" },
  { text: "SEO & Growth",          color: "#EC4899" },
  { text: "AI Agents",             color: "#3B82F6" },
  { text: "RAG Systems",           color: "#8B5CF6" },
  { text: "Cloud & DevOps",        color: "#EC4899" },
  { text: "Performance Marketing", color: "#3B82F6" },
];

// ─── Cycling service text ─────────────────────────────────────────────────────
function CyclingService() {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      timerRef.current = setTimeout(() => {
        setIdx((i) => (i + 1) % SERVICES.length);
        setShow(true);
      }, 240);
    }, 2200);
    return () => {
      clearInterval(interval);
      clearTimeout(timerRef.current);
    };
  }, []);

  const svc = SERVICES[idx];

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 7 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -7 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block font-bold"
          style={{ color: svc.color, textShadow: `0 0 22px ${svc.color}55` }}
        >
          {svc.text}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section
      className="relative min-h-[100svh] overflow-hidden"
      style={{ background: "#040713" }}
      aria-labelledby="hero-heading"
    >
      {/* ── Full-bleed hero video background ─────────────────────────────── */}
      <video
        className="absolute inset-0 z-0 size-full object-cover"
        src="/videos/Regenerate_video_with_humanoid_c…_202608240513.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* ── Cinematic readability overlay — darkens the left side behind the
          text without dulling the video's own color across the rest of the
          frame. Vignette + grain are the same subtle treatment used
          site-wide, not new graphics on top of the footage. ───────────── */}
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(4,7,19,0.85) 0%, rgba(4,7,19,0.55) 32%, rgba(4,7,19,0.15) 58%, rgba(4,7,19,0.32) 100%)" }} />
        <div className="absolute inset-0 bg-noise opacity-[0.022]" />
        <div className="vignette" />
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <Container className="relative z-10 flex min-h-[100svh] items-center py-28">
        <div className="flex w-full flex-col">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{
                background: "rgba(59,130,246,0.09)",
                border: "1px solid rgba(59,130,246,0.38)",
                color: "#60A5FA",
                boxShadow: "0 0 26px -4px rgba(59,130,246,0.32)",
              }}
            >
              <span className="size-1.5 rounded-full animate-glow-pulse" style={{ background: "#3B82F6" }} />
              Enterprise Web Development Agency
            </span>
          </motion.div>

          {/* ── Headline ────────────────────────────────────────────────── */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 text-[38px] font-black leading-[0.9] tracking-[-0.05em] text-white md:text-[52px] lg:text-[64px] xl:text-[72px]"
            style={{ maxWidth: 650 }}
          >
            Building Intelligent
            <br />
            <span
              className="animate-gradient-shift bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)",
                backgroundSize: "200% auto",
              }}
            >
              Digital Experiences
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
            className="mt-7 text-[18px] leading-[1.82]"
            style={{ color: "rgba(190,205,230,0.62)", maxWidth: 620 }}
          >
            We design, develop and scale world-class websites, AI-powered SaaS
            platforms, enterprise applications, automation systems and digital
            experiences that help businesses grow faster.
          </motion.p>

          {/* Cycling service label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="mt-5 flex h-6 items-center gap-2 text-sm font-medium"
            style={{ color: "rgba(190,205,230,0.5)" }}
          >
            <span>We build</span>
            <CyclingService />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.46 }}
            className="mt-11 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.04]"
                style={{
                  background: "linear-gradient(128deg, #3B82F6 0%, #8B5CF6 52%, #EC4899 100%)",
                  boxShadow: "0 0 38px -8px rgba(59,130,246,0.7), 0 4px 30px -8px rgba(139,92,246,0.55)",
                }}
              >
                Start Your Project
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>

            <Magnetic strength={0.25}>
              <Link
                href="/case-studies"
                className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-bold text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.16)",
                }}
              >
                <Play className="size-3.5 fill-current opacity-80" />
                View Case Studies
              </Link>
            </Magnetic>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.64 }}
            className="mt-8 flex flex-wrap items-center gap-2.5"
          >
            {["Enterprise Ready", "Fast Delivery", "200+ Projects Delivered"].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold backdrop-blur-sm"
                style={{
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "rgba(190,210,240,0.55)",
                }}
              >
                <CheckCircle className="size-3 shrink-0" style={{ color: "#3B82F6" }} />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Bottom depth fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        aria-hidden="true"
        style={{ background: "linear-gradient(to top, #040713, transparent)" }}
      />
    </section>
  );
}
