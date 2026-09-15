"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { industries } from "@/constants/industries";

const ACCENT_COLORS = [
  "hover:border-magenta/25 hover:bg-magenta/[0.04] [&_.icon]:text-magenta-soft",
  "hover:border-electric/25 hover:bg-electric/[0.04] [&_.icon]:text-electric-soft",
  "hover:border-gold/25 hover:bg-gold/[0.04] [&_.icon]:text-gold-soft",
  "hover:border-magenta/25 hover:bg-magenta/[0.04] [&_.icon]:text-magenta-soft",
  "hover:border-electric/25 hover:bg-electric/[0.04] [&_.icon]:text-electric-soft",
];

export function SolutionsTeaser() {
  const featured = industries.slice(0, 5);
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
          eyebrow="Solutions"
          title="Built for the sectors where AI has to get it right"
          description="Regulated, high-stakes, operationally complex — these are the environments Blugent's systems are engineered for."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {featured.map((industry, i) => (
            <RevealItem key={industry.slug}>
              <Link
                href={`/solutions#${industry.slug}`}
                className={`group flex h-full flex-col rounded-2xl border border-white/[0.07] bg-white/[0.015] p-5 transition-all duration-300 hover:-translate-y-1 ${ACCENT_COLORS[i % ACCENT_COLORS.length]}`}
              >
                {/* Icon */}
                <span className="icon flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/50 transition-colors duration-300">
                  <industry.icon className="size-5" />
                </span>

                <h3 className="mt-4 text-sm font-semibold text-white">{industry.name}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-white/40">{industry.description}</p>

                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-white/30 transition-all duration-200 group-hover:text-white/80">
                  Learn more
                  <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/solutions"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white/35 transition-colors duration-200 hover:text-white"
          >
            View all solutions
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
