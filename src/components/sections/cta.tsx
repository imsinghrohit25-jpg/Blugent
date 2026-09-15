"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/motion/reveal";

export function Cta() {
  return (
    <Section>
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.07]">
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0e0014] via-[#0a000f] to-[#050505]" />

            {/* Magenta glow orb */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-magenta/20 blur-[100px]" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-[300px] w-[400px] translate-x-1/4 translate-y-1/4 rounded-full bg-electric/12 blur-[80px]" />

            {/* Grid overlay */}
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

            {/* Content */}
            <div className="relative z-10 px-8 py-20 text-center sm:px-16 sm:py-28">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex justify-center"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-magenta/20 bg-magenta/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-magenta-soft">
                  <Zap className="size-3" />
                  Get started in 2 weeks
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto mt-8 max-w-2xl text-balance text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white"
              >
                Ready to build the{" "}
                <span className="text-gradient-magenta">intelligent enterprise?</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mx-auto mt-6 max-w-lg text-balance text-base leading-relaxed text-white/45 sm:text-lg"
              >
                Start with a two-week Discovery Sprint. Walk away with a working prototype
                and a roadmap — no multi-quarter commitment required.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <Magnetic>
                  <Button
                    size="lg"
                    className="group h-13 gap-2.5 rounded-full bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-600 px-9 text-sm font-semibold text-white glow-magenta transition-all duration-300 hover:scale-[1.03] hover:from-fuchsia-500 hover:via-purple-500 hover:to-violet-500"
                    asChild
                  >
                    <Link href="/contact">
                      Book a Discovery Sprint
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </Magnetic>

                <Button
                  size="lg"
                  variant="outline"
                  className="h-13 rounded-full border-white/10 bg-white/[0.025] px-8 text-sm font-semibold text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/18 hover:bg-white/[0.06] hover:text-white"
                  asChild
                >
                  <Link href="/services">Explore Services</Link>
                </Button>
              </motion.div>

              {/* Bottom trust line */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10 text-xs text-white/25"
              >
                No long-term contracts. Fixed-fee sprints. Cancel anytime.
              </motion.p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
