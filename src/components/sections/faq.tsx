"use client";

import { useState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd, faqJsonLd } from "@/lib/jsonld";
import { homeFaqs } from "@/constants/faq";

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        open
          ? "border-magenta/20 bg-magenta/[0.04]"
          : "border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-6 px-7 py-6 text-left"
      >
        <span className="text-[0.9375rem] font-semibold leading-snug text-white">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`mt-0.5 shrink-0 transition-colors duration-200 ${
            open ? "text-magenta" : "text-white/30"
          }`}
        >
          <Plus className="size-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="px-7 pb-7 text-sm leading-[1.8] text-white/45">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Faq() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <Section id="faq" className="overflow-hidden">
      <JsonLd data={faqJsonLd(homeFaqs)} />
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

      <Container className="relative z-10 max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions enterprise teams ask before we kick off"
        />

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-3">
            {homeFaqs.map((faq, i) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                index={i}
              />
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
