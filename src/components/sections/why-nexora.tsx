"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, Gauge, Workflow, LineChart, Lock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const METRICS = [
  { value: 99,  suffix: "%",  label: "Uptime SLA" },
  { value: 6,   suffix: "wk", label: "Avg. Time to Production" },
  { value: 340, suffix: "%",  label: "Avg. Client ROI" },
  { value: 50,  suffix: "+",  label: "Integrations Supported" },
];

const REASONS = [
  {
    icon: Gauge,
    title: "Production-first delivery",
    description: "We design for the failure path before the happy path, so systems survive real operations.",
    color: "text-magenta-soft",
    bg: "bg-magenta/8",
    border: "border-magenta/20",
  },
  {
    icon: ShieldCheck,
    title: "Auditable by design",
    description: "Every automated decision carries a traceable record — built for regulators, not just demos.",
    color: "text-electric-soft",
    bg: "bg-electric/8",
    border: "border-electric/20",
  },
  {
    icon: Workflow,
    title: "Integrates, doesn't replace",
    description: "We connect to your existing CRM, ERP, and data stack instead of forcing a rip-and-replace.",
    color: "text-magenta-soft",
    bg: "bg-magenta/8",
    border: "border-magenta/20",
  },
  {
    icon: LineChart,
    title: "Outcome-scoped engagements",
    description: "Every project starts with an ROI model — and is measured against it after launch.",
    color: "text-gold-soft",
    bg: "bg-gold/8",
    border: "border-gold/20",
  },
  {
    icon: Lock,
    title: "Enterprise-grade security",
    description: "Single-tenant deployment options and audit-ready architecture, aligned with SOC 2 and HIPAA.",
    color: "text-electric-soft",
    bg: "bg-electric/8",
    border: "border-electric/20",
  },
  {
    icon: Sparkles,
    title: "Systems that improve",
    description: "Continuous evaluation and retraining loops mean performance compounds, not decays.",
    color: "text-magenta-soft",
    bg: "bg-magenta/8",
    border: "border-magenta/20",
  },
];

export function WhyNexora() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <Section className="overflow-hidden">
      {/* Full-bleed section background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 size-full object-cover"
        src="/videos/Animate_3D_video_from_image_202608240719.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      {/* Subtle dark overlay — keeps content contrast over the video */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "rgba(4,7,19,0.72)" }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Why Blugent"
          title="The difference between a pilot and a platform"
          description="Here's what separates AI that ships and stays in production from AI that gets quietly switched off after the demo."
        />

        {/* Metrics row */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] sm:grid-cols-4">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex flex-col items-center gap-1.5 bg-[#050505] px-8 py-10 text-center"
            >
              <p className="text-[2.25rem] font-bold tracking-tight text-white">
                <AnimatedCounter value={m.value} suffix={m.suffix} duration={2} />
              </p>
              <p className="text-xs font-medium text-white/35">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Reason cards */}
        <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason) => (
            <RevealItem key={reason.title}>
              <TiltCard maxTilt={5}>
                <div className="glass-card group h-full rounded-2xl p-6 transition-all duration-500 hover:border-white/12">
                  <span className={`inline-flex size-11 items-center justify-center rounded-xl border ${reason.border} ${reason.bg} ${reason.color} transition-all duration-300`}>
                    <reason.icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-white">{reason.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/40">{reason.description}</p>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
