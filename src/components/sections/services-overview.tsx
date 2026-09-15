"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { servicesDetail } from "@/constants/services-detail";
import type { LucideIcon } from "lucide-react";

const SERVICES = [
  { slug: "ai-agents",          label: "01" },
  { slug: "rag-systems",        label: "02" },
  { slug: "ai-automation",      label: "03" },
  { slug: "llm-integration",    label: "04" },
  { slug: "machine-learning",   label: "05" },
  { slug: "custom-ai-software", label: "06" },
  { slug: "seo",                label: "07" },
  { slug: "web-development",    label: "08" },
];

function ServiceCard({
  number,
  icon: Icon,
  name,
  solution,
  href,
}: {
  number: string;
  icon: LucideIcon;
  name: string;
  solution: string;
  href: string;
}) {
  return (
    <TiltCard maxTilt={5}>
      <Link href={href} className="group block h-full" tabIndex={0}>
        <div className="glass-card relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:border-magenta/20 hover:bg-white/[0.05]">
          {/* Number watermark */}
          <span className="absolute right-4 top-3 font-mono text-5xl font-bold text-white/[0.03] select-none">
            {number}
          </span>

          {/* Icon */}
          <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-magenta-soft transition-all duration-300 group-hover:border-magenta/30 group-hover:bg-magenta/8 group-hover:text-magenta">
            <Icon className="size-5" />
          </span>

          <h3 className="mt-5 text-base font-semibold leading-tight text-white">{name}</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-white/40">{solution}</p>

          {/* Arrow */}
          <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-white/25 transition-all duration-300 group-hover:text-magenta-soft">
            Learn more
            <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          {/* Bottom glow on hover */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-magenta/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:via-magenta/40 group-hover:opacity-100" />
        </div>
      </Link>
    </TiltCard>
  );
}

export function ServicesOverview() {
  const services = SERVICES.map(({ slug, label }, i) => {
    const detail = servicesDetail.find((s) => s.slug === slug);
    return detail ? { ...detail, label: label ?? `0${i + 1}` } : null;
  }).filter(Boolean) as (typeof servicesDetail[0] & { label: string })[];

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <Section id="services" className="overflow-hidden">
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
          eyebrow="Services"
          title="One team. Every AI capability your enterprise needs."
          description="From autonomous agents to retrieval-augmented platforms and the growth systems that make you visible — Blugent delivers it as one accountable team."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((item) => (
            <RevealItem key={item.slug}>
              <ServiceCard
                number={item.label}
                icon={item.icon}
                name={item.name}
                solution={item.solution}
                href={`/services#${item.slug}`}
              />
            </RevealItem>
          ))}
        </RevealGroup>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-7 py-3.5 text-sm font-semibold text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-magenta/25 hover:bg-magenta/6 hover:text-white"
          >
            View all 19 services
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
