import { Quote } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/motion/reveal";

/**
 * Reusable layout for a single, real case study. Not wired to any route or
 * fabricated data — render this with real client/project content once it
 * exists, e.g. from a future `app/case-studies/[slug]/page.tsx`.
 */
export interface CaseStudyContent {
  client: string;
  industry: string;
  title: string;
  summary: string;
  metrics: { value: string; label: string }[];
  challenge: string;
  approach: string[];
  solution: string;
  result: string;
  quote?: { text: string; name: string; role: string };
  tags: string[];
}

export function CaseStudyTemplate({ study }: { study: CaseStudyContent }) {
  return (
    <>
      <Section className="pb-0 pt-36 sm:pt-44">
        <Container className="max-w-4xl">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-electric-soft">
                {study.industry}
              </span>
              {study.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {study.title}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">{study.summary}</p>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          <Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {study.metrics.map((metric) => (
                <div key={metric.label} className="glass rounded-2xl p-5 text-center">
                  <p className="text-2xl font-semibold text-white">{metric.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{metric.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-10">
              <Reveal>
                <div>
                  <h2 className="text-xl font-semibold text-white">The Challenge</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{study.challenge}</p>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div>
                  <h2 className="text-xl font-semibold text-white">The Approach</h2>
                  <ul className="mt-3 space-y-2.5">
                    {study.approach.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-400">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-electric-soft" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <div className="space-y-10">
              <Reveal direction="left">
                <div>
                  <h2 className="text-xl font-semibold text-white">The Solution</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{study.solution}</p>
                </div>
              </Reveal>
              <Reveal direction="left" delay={0.05}>
                <div>
                  <h2 className="text-xl font-semibold text-white">The Result</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{study.result}</p>
                </div>
              </Reveal>
            </div>
          </div>

          {study.quote ? (
            <Reveal delay={0.1}>
              <GlassCard strong hover={false} className="mt-16">
                <Quote className="size-8 text-electric/50" />
                <p className="mt-4 text-lg leading-relaxed text-white">&ldquo;{study.quote.text}&rdquo;</p>
                <p className="mt-4 text-sm text-slate-400">
                  <span className="font-medium text-white">{study.quote.name}</span> — {study.quote.role}
                </p>
              </GlassCard>
            </Reveal>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
