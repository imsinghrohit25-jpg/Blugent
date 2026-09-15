"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { pricingTiers } from "@/constants/pricing";

export function Pricing() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <Section id="pricing" className="overflow-hidden">
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
          eyebrow="Pricing"
          title="Start with a sprint. Scale to a platform."
          description="Every engagement begins with a fixed-fee discovery sprint so you know exactly what you're building — and what it will cost — before any larger commitment."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <RevealItem key={tier.id}>
              <div
                className={`relative h-full overflow-hidden rounded-3xl p-px transition-all duration-500 ${
                  tier.highlight
                    ? "bg-gradient-to-b from-magenta/40 via-magenta/10 to-electric/20 shadow-[0_0_60px_-20px_rgba(217,70,239,0.4)]"
                    : "bg-white/[0.06] hover:bg-white/[0.08]"
                }`}
              >
                <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-[#0a0a0a] p-8 flex flex-col">
                  {/* Badge */}
                  {tier.badge && (
                    <span className="mb-4 inline-flex w-fit items-center rounded-full bg-magenta/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-magenta-soft">
                      {tier.badge}
                    </span>
                  )}

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-white/35">
                      {tier.name}
                    </h3>
                    <p
                      className={`mt-2 text-2xl font-bold tracking-tight ${
                        tier.highlight ? "text-gradient-magenta" : "text-white"
                      }`}
                    >
                      {tier.price}
                    </p>
                    <p className="mt-1 text-xs text-white/30">{tier.billing}</p>
                    <p className="mt-4 text-sm leading-relaxed text-white/45">
                      {tier.description}
                    </p>
                  </div>

                  <div className="my-7 h-px bg-white/[0.06]" />

                  <ul className="flex-1 space-y-3.5">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm text-white/55">
                        <Check
                          className={`mt-0.5 size-4 shrink-0 ${
                            tier.highlight ? "text-magenta-soft" : "text-electric-soft"
                          }`}
                        />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    {tier.highlight ? (
                      <Magnetic>
                        <Button
                          className="w-full rounded-xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-600 text-sm font-semibold text-white glow-magenta transition-all duration-300 hover:from-fuchsia-500 hover:to-violet-500"
                          asChild
                        >
                          <Link href={tier.href}>{tier.cta}</Link>
                        </Button>
                      </Magnetic>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full rounded-xl border-white/10 bg-white/[0.03] text-sm font-semibold text-white/70 transition-all duration-300 hover:border-white/18 hover:bg-white/[0.07] hover:text-white"
                        asChild
                      >
                        <Link href={tier.href}>{tier.cta}</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center text-xs text-white/25"
        >
          All pricing scoped per project. Contact us for volume, retainer, and OEM arrangements.
        </motion.p>
      </Container>
    </Section>
  );
}
