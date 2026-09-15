"use client";

import { useEffect, useRef } from "react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedTimeline } from "@/components/visuals/animated-timeline";
import { howWeWork } from "@/constants/timeline";

export function HowWeWork() {
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
      {/* Subtle dark overlay — keeps text/timeline contrast over the video */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "rgba(4,7,19,0.72)" }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="How We Work"
          title="From discovery to a system you can trust in production"
          description="No slideware. Every engagement ships working software in your hands every two weeks."
        />
        <div className="mt-16">
          <AnimatedTimeline steps={howWeWork} />
        </div>
      </Container>
    </Section>
  );
}
