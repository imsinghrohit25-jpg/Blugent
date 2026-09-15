"use client";

import { useEffect, useRef } from "react";
import { Quote } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Marquee } from "@/components/ui/marquee";
import { testimonials } from "@/constants/testimonials";

function TestimonialCard({
  quote,
  author,
  role,
  company,
  metric,
  metricLabel,
}: {
  quote: string;
  author: string;
  role: string;
  company: string;
  metric?: string;
  metricLabel?: string;
}) {
  return (
    <div className="glass-card group w-[min(420px,90vw)] shrink-0 rounded-2xl p-7 transition-all duration-500 hover:border-magenta/15">
      {/* Quote icon */}
      <div className="flex items-start justify-between gap-4">
        <Quote className="size-6 shrink-0 text-magenta/40" />
        {metric && (
          <div className="text-right">
            <p className="text-xl font-bold text-gradient-magenta">{metric}</p>
            <p className="text-[10px] text-white/30">{metricLabel}</p>
          </div>
        )}
      </div>

      {/* Quote text */}
      <p className="mt-5 text-sm leading-[1.8] text-white/55">&ldquo;{quote}&rdquo;</p>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
        {/* Avatar ring */}
        <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-magenta/40 to-electric/30 text-xs font-bold text-white">
          {author.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">{author}</p>
          <p className="truncate text-xs text-white/35">
            {role} · {company}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
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
          eyebrow="Client Results"
          title="What enterprise teams say after shipping"
          description="From financial services to healthcare and logistics — the results speak for themselves."
        />
      </Container>

      {/* Auto-scroll marquee — two rows, opposite directions */}
      <div className="relative z-10 mt-16 flex flex-col gap-5 overflow-hidden">
        <Marquee speed="50s" pauseOnHover gap="1.25rem">
          {testimonials.map((t) => (
            <TestimonialCard key={t.author} {...t} />
          ))}
        </Marquee>
        <Marquee speed="45s" reverse pauseOnHover gap="1.25rem">
          {[...testimonials].reverse().map((t) => (
            <TestimonialCard key={`r-${t.author}`} {...t} />
          ))}
        </Marquee>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#050505] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#050505] to-transparent" />
    </Section>
  );
}
