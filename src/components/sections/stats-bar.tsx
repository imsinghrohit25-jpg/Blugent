"use client";

import { useEffect, useRef } from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

const stats = [
  { value: 350, suffix: "+", label: "Projects Shipped" },
  { value: 98,  suffix: "%", label: "Client Retention Rate" },
  { value: 2,   suffix: "B+", prefix: "$", label: "Revenue Generated for Clients" },
  { value: 50,  suffix: "+", label: "Enterprise Clients" },
  { value: 40,  suffix: "+", label: "Countries Served" },
];

export function StatsBar() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
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

      {/* Divider lines */}
      <div className="divider-gradient absolute inset-x-0 top-0 z-10" />
      <div className="divider-gradient absolute inset-x-0 bottom-0 z-10" />

      <Container className="relative z-10">
        <Reveal>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1.5 text-center lg:items-start lg:text-left"
              >
                <p className="text-[clamp(1.8rem,4vw,2.75rem)] font-bold tracking-tight text-white">
                  {stat.prefix}
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={1.8}
                  />
                </p>
                <p className="text-xs font-medium text-white/35">{stat.label}</p>
                {i < stats.length - 1 && (
                  <div className="absolute right-0 hidden h-8 w-px bg-white/[0.06] lg:block" />
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
