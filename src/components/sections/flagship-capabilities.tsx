"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Database, Workflow, CheckCircle2 } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/tilt-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

const capabilities = [
  {
    slug: "ai-agents",
    icon: Bot,
    label: "01",
    title: "Agents that act — not just answer",
    description:
      "Blugent's agent platform plans, executes, and verifies multi-step work across your systems, with the governance enterprise operations demand.",
    points: [
      "Multi-agent orchestration with a supervisor layer",
      "Human-in-the-loop checkpoints on high-stakes actions",
      "Full audit trail on every decision an agent makes",
    ],
    accent: "from-magenta/20 to-purple-500/10",
    iconColor: "text-magenta-soft",
    iconBg: "bg-magenta/8 border-magenta/20",
    checkColor: "text-magenta-soft",
    cta: "Explore AI Agents",
    glow: "rgba(217,70,239,0.12)",
  },
  {
    slug: "rag-systems",
    icon: Database,
    label: "02",
    title: "Grounded answers from your own data",
    description:
      "Blugent's retrieval-augmented platform turns your proprietary documents and records into a trustworthy answer layer, with every response traceable to its source.",
    points: [
      "Hybrid retrieval — dense, sparse, and metadata filtering",
      "Citation-grounded answers, not unattributed guesses",
      "Single-tenant deployment inside your own environment",
    ],
    accent: "from-electric/20 to-blue-500/10",
    iconColor: "text-electric-soft",
    iconBg: "bg-electric/8 border-electric/20",
    checkColor: "text-electric-soft",
    cta: "Explore RAG Systems",
    glow: "rgba(59,130,246,0.12)",
  },
  {
    slug: "ai-automation",
    icon: Workflow,
    label: "03",
    title: "Automation that survives edge cases",
    description:
      "End-to-end automation of high-volume repeatable workflows, with exception routing to a human instead of a silent failure — built to run inside your existing operations stack.",
    points: [
      "Connects to existing CRM, ERP, and data sources via API",
      "Intelligent exception handling with human escalation paths",
      "Observable, auditable, and rollback-safe by design",
    ],
    accent: "from-gold/20 to-amber-500/10",
    iconColor: "text-gold-soft",
    iconBg: "bg-gold/8 border-gold/20",
    checkColor: "text-gold-soft",
    cta: "Explore AI Automation",
    glow: "rgba(212,175,55,0.10)",
  },
];

export function FlagshipCapabilities() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <Section id="capabilities" className="overflow-hidden">
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
      {/* Subtle dark overlay — keeps card/text contrast over the video */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "rgba(4,7,19,0.72)" }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Flagship Capabilities"
          title="Where most engagements start"
          description="Three systems sit at the core of nearly every Blugent deployment — the agents that act, the retrieval layer that grounds them, and the automation that scales the result."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <RevealItem key={cap.slug}>
              <TiltCard maxTilt={5} className="h-full">
                <div
                  className="glass-card group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-all duration-500"
                  style={{
                    boxShadow: `0 0 0 0 ${cap.glow}`,
                  }}
                >
                  {/* Background gradient */}
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${cap.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                  {/* Number label */}
                  <span className="relative z-10 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/20">
                    {cap.label}
                  </span>

                  {/* Icon */}
                  <span
                    className={`relative z-10 mt-4 inline-flex size-12 items-center justify-center rounded-xl border ${cap.iconBg} ${cap.iconColor} transition-all duration-300 group-hover:scale-110`}
                  >
                    <cap.icon className="size-6" />
                  </span>

                  <h3 className="relative z-10 mt-5 text-lg font-bold leading-snug tracking-tight text-white">
                    {cap.title}
                  </h3>
                  <p className="relative z-10 mt-3 flex-1 text-sm leading-relaxed text-white/45">
                    {cap.description}
                  </p>

                  <ul className="relative z-10 mt-6 space-y-2.5">
                    {cap.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-white/60">
                        <CheckCircle2 className={`mt-0.5 size-4 shrink-0 ${cap.checkColor}`} />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="relative z-10 mt-7">
                    <Button
                      variant="outline"
                      className="group/btn gap-2 rounded-full border-white/10 bg-white/[0.025] text-sm text-white/70 transition-all duration-300 hover:border-white/18 hover:bg-white/[0.06] hover:text-white"
                      asChild
                    >
                      <Link href={`/services#${cap.slug}`}>
                        {cap.cta}
                        <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
