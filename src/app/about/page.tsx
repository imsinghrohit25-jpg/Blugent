import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/sections/page-hero";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedTimeline } from "@/components/visuals/animated-timeline";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Cta } from "@/components/sections/cta";
import { companyStory, mission, vision, whyChooseUs, technologyPhilosophy } from "@/constants/about";
import { howWeWork } from "@/constants/timeline";

export const metadata: Metadata = buildMetadata({
  title: "About Blugent",
  description:
    "Blugent is an enterprise AI company building autonomous agents, RAG platforms, and intelligent automation. Our story, mission, vision, and development process.",
  path: "/about",
});

const companyStats = [
  { value: "50+",  label: "Enterprise Clients" },
  { value: "98%",  label: "Client Retention" },
  { value: "350+", label: "Projects Shipped" },
  { value: "$2B+", label: "Revenue Generated" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Blugent"
        title="We build the infrastructure of the intelligent enterprise"
        description="Blugent designs, builds, and operates AI systems that hold up under real operational pressure — not just in a demo."
      />

      {/* Company stats */}
      <Section className="pt-0 pb-12 sm:pb-16">
        <Container>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] sm:grid-cols-4">
            {companyStats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1.5 bg-[#050505] px-6 py-8 text-center">
                <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{stat.value}</p>
                <p className="text-xs font-medium text-white/35">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Company story */}
      <Section className="pt-0">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Our Story" title="Why Blugent exists" align="left" className="items-start" />
          <div className="mt-8 space-y-5">
            {companyStory.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-base leading-[1.8] text-white/50">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Mission + Vision */}
      <Section>
        <Container className="max-w-5xl">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="glass-card h-full rounded-2xl p-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-magenta/20 bg-magenta/[0.07] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-magenta-soft">
                  Mission
                </span>
                <p className="mt-6 text-base leading-[1.8] text-white/55">{mission}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass-card h-full rounded-2xl p-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/[0.07] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-electric-soft">
                  Vision
                </span>
                <p className="mt-6 text-base leading-[1.8] text-white/55">{vision}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Why Choose Us" title="What guides every engagement" />
          <RevealGroup className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => (
              <RevealItem key={item.title}>
                <GlassCard className="h-full">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-magenta/20 bg-magenta/[0.06] text-magenta-soft">
                    <item.icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/45">{item.description}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Technology Philosophy */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Technology Philosophy"
            title="How we think about building AI systems"
            description="Engineering principles that shape every system we ship, not just the ones we talk about in sales calls."
            accent="electric"
          />
          <RevealGroup className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {technologyPhilosophy.map((item) => (
              <RevealItem key={item.title}>
                <GlassCard className="flex h-full items-start gap-5" glow="electric">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold/[0.06] text-gold-soft">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/45">{item.description}</p>
                  </div>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Development Process */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Development Process" title="How an engagement actually runs" />
          <div className="mt-16">
            <AnimatedTimeline steps={howWeWork} />
          </div>
        </Container>
      </Section>

      <Cta />
    </>
  );
}
