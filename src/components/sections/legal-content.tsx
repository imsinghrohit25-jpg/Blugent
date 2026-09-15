import { Container, Section } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import type { LegalSection } from "@/constants/legal";

export function LegalContent({ sections, lastUpdated }: { sections: LegalSection[]; lastUpdated: string }) {
  return (
    <Section className="pt-0">
      <Container className="max-w-3xl">
        <Reveal>
          <p className="text-sm text-slate-400">Last updated: {lastUpdated}</p>
        </Reveal>
        <div className="mt-10 space-y-10">
          {sections.map((section, i) => (
            <Reveal key={section.heading} delay={Math.min(i * 0.03, 0.3)}>
              <div>
                <h2 className="text-xl font-semibold text-white">{section.heading}</h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((p, pi) => (
                    <p key={pi} className="text-sm leading-relaxed text-slate-400">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
