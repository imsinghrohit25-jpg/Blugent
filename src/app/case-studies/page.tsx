import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Database, Workflow, Rocket, ArrowRight, TrendingUp, Clock, Shield, Target } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/sections/page-hero";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedTimeline } from "@/components/visuals/animated-timeline";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Cta } from "@/components/sections/cta";
import { howWeWork } from "@/constants/timeline";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies / Work",
  description:
    "How Blugent builds AI agents, RAG platforms, and automation systems — our methodology, what we build, and what an engagement looks like from kickoff to production.",
  path: "/case-studies",
  keywords: ["AI development process", "AI agency methodology", "how we build AI systems"],
});

const whatWeBuild = [
  {
    slug: "ai-agents",
    icon: Bot,
    title: "AI Agents",
    description: "Multi-step, autonomous systems that plan and execute work inside your operations, with human checkpoints on anything high-stakes.",
    accent: "text-magenta-soft",
    iconBg: "bg-magenta/[0.07] border-magenta/20",
  },
  {
    slug: "rag-systems",
    icon: Database,
    title: "RAG Platforms",
    description: "Retrieval layers that ground AI answers in your own documents and data, with citations back to the source.",
    accent: "text-electric-soft",
    iconBg: "bg-electric/[0.07] border-electric/20",
  },
  {
    slug: "ai-automation",
    icon: Workflow,
    title: "Automation Systems",
    description: "End-to-end automation of repeatable workflows, with exceptions routed to a person instead of silently failing.",
    accent: "text-gold-soft",
    iconBg: "bg-gold/[0.07] border-gold/20",
  },
  {
    slug: "custom-ai-software",
    icon: Rocket,
    title: "Custom AI Software",
    description: "Bespoke, AI-native products and internal tools, built and owned outright by you, not licensed from us.",
    accent: "text-magenta-soft",
    iconBg: "bg-magenta/[0.07] border-magenta/20",
  },
];

const resultMetrics = [
  {
    icon: TrendingUp,
    value: "340%",
    label: "Average ROI",
    description: "Measured against agreed KPIs 6 months post-launch",
  },
  {
    icon: Clock,
    value: "6 wks",
    label: "Time to Production",
    description: "From kickoff to a production system in your environment",
  },
  {
    icon: Shield,
    value: "99.7%",
    label: "Decision Accuracy",
    description: "Across all deployed autonomous agent systems",
  },
  {
    icon: Target,
    value: "100%",
    label: "On-Scope Delivery",
    description: "Every engagement delivers against the agreed ROI model",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies / Work", path: "/case-studies" },
        ])}
      />
      <PageHero
        eyebrow="Case Studies / Work"
        title="How we build, and what we build"
        description="Instead of a slide of logos, here's what we actually do: the systems we specialise in and the process behind every engagement, from first call to production."
        breadcrumbs={[{ label: "Case Studies / Work", href: "/case-studies" }]}
      />

      {/* What We Build */}
      <Section className="pt-0">
        <Container>
          <SectionHeading eyebrow="What We Build" title="Four categories of systems, one accountable team" />
          <RevealGroup className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whatWeBuild.map((item) => (
              <RevealItem key={item.slug}>
                <Link href={`/services#${item.slug}`} className="block h-full">
                  <GlassCard className="group h-full transition-all duration-300">
                    <span className={`flex size-11 items-center justify-center rounded-xl border ${item.iconBg} ${item.accent}`}>
                      <item.icon className="size-5" />
                    </span>
                    <h3 className="mt-5 text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-white/45">{item.description}</p>
                    <span className={`mt-5 inline-flex items-center gap-1.5 text-xs font-semibold ${item.accent} opacity-0 transition-opacity duration-200 group-hover:opacity-100`}>
                      View service <ArrowRight className="size-3.5" />
                    </span>
                  </GlassCard>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Results by the numbers */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Results by the numbers"
            title="What clients experience after launch"
            description="These metrics are measured against the ROI model agreed at kickoff — not estimated projections."
          />
          <RevealGroup className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {resultMetrics.map((m) => (
              <RevealItem key={m.label}>
                <div className="glass-card flex h-full flex-col rounded-2xl p-6 text-center">
                  <span className="mx-auto flex size-11 items-center justify-center rounded-xl border border-magenta/20 bg-magenta/[0.07] text-magenta-soft">
                    <m.icon className="size-5" />
                  </span>
                  <p className="mt-5 text-3xl font-bold tracking-tight text-white">{m.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/35">{m.label}</p>
                  <p className="mt-3 text-xs leading-relaxed text-white/30">{m.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* How We Work */}
      <Section>
        <Container>
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

      {/* Measurement */}
      <Section>
        <Container className="max-w-3xl text-center">
          <SectionHeading
            eyebrow="How We Measure Success"
            title="Every engagement starts with a model of what success looks like"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-[1.8] text-white/45">
              Before any code ships, we agree on the specific metric a system is meant to move —
              cycle time, error rate, cost, capacity — and how we&apos;ll measure it. That model is
              what the project is evaluated against after launch, not a generic &ldquo;AI improved
              things&rdquo; claim.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white glow-magenta-sm transition-all duration-300 hover:from-fuchsia-500 hover:to-violet-500"
            >
              Tell us about your use case
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </Container>
      </Section>

      <Cta />
    </>
  );
}
