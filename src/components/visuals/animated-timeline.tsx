"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAPPlugins } from "@/lib/gsap";
import { Reveal } from "@/components/motion/reveal";

export function AnimatedTimeline({
  steps,
}: {
  steps: { step: string; title: string; description: string }[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !containerRef.current || !lineRef.current) return;

    registerGSAPPlugins();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative mx-auto max-w-3xl">
      {/* Static track */}
      <div className="absolute left-[27px] top-2 bottom-2 w-px bg-white/[0.06] sm:left-1/2" />

      {/* Animated magenta progress line */}
      <div
        ref={lineRef}
        className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-magenta via-magenta-soft/60 to-transparent sm:left-1/2"
        style={{ transformOrigin: "top" }}
      />

      <div className="flex flex-col gap-10">
        {steps.map((item, i) => (
          <Reveal key={item.step} delay={i * 0.05}>
            <div className="relative flex gap-6 sm:gap-8">
              {/* Step number circle */}
              <div className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl border border-magenta/25 bg-[#0a0a0a] text-sm font-bold tracking-tight text-magenta-soft shadow-[0_0_24px_-6px_rgba(217,70,239,0.4)]">
                {item.step}
              </div>

              {/* Content card */}
              <div className="glass-card flex-1 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-white/10">
                <h3 className="text-base font-bold tracking-tight text-white">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/45">{item.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
