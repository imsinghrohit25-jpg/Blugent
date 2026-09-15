"use client";

import { useEffect, useRef } from "react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Marquee } from "@/components/ui/marquee";
import { techStack } from "@/constants/tech-stack";

const CATEGORY_COLORS: Record<string, string> = {
  Models:         "text-magenta-soft bg-magenta/8 border-magenta/15",
  Orchestration:  "text-electric-soft bg-electric/8 border-electric/15",
  "Vector Store": "text-gold-soft bg-gold/8 border-gold/15",
  Data:           "text-electric-soft bg-electric/8 border-electric/15",
  Cloud:          "text-magenta-soft bg-magenta/8 border-magenta/15",
  Infrastructure: "text-white/50 bg-white/[0.04] border-white/10",
  Application:    "text-electric-soft bg-electric/8 border-electric/15",
  ML:             "text-gold-soft bg-gold/8 border-gold/15",
};

function TechPill({ name, category }: { name: string; category: string }) {
  const color = CATEGORY_COLORS[category] ?? "text-white/50 bg-white/[0.04] border-white/10";

  return (
    <div className="group flex shrink-0 items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 transition-all duration-300 hover:border-white/12 hover:bg-white/[0.05]">
      <span className={`rounded-md border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] ${color}`}>
        {category}
      </span>
      <span className="text-sm font-medium text-white/60 transition-colors duration-200 group-hover:text-white">
        {name}
      </span>
    </div>
  );
}

export function TechStack() {
  const row1 = techStack.slice(0, 9);
  const row2 = techStack.slice(9);
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
          eyebrow="Technology"
          title="Best-in-class infrastructure, not a single vendor's roadmap"
          description="We select the right model, vector store, and cloud for your constraints — not the ones a license agreement requires."
          accent="electric"
        />
      </Container>

      <div className="relative z-10 mt-14 flex flex-col gap-3 overflow-hidden">
        <Marquee speed="38s" gap="0.75rem">
          {row1.map((tech) => (
            <TechPill key={tech.name} name={tech.name} category={tech.category} />
          ))}
        </Marquee>
        <Marquee speed="44s" reverse gap="0.75rem">
          {row2.map((tech) => (
            <TechPill key={tech.name} name={tech.name} category={tech.category} />
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
