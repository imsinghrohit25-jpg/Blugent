import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { Container, Section } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { PageHero } from "@/components/sections/page-hero";
import { Globe } from "@/components/visuals/globe";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Cta } from "@/components/sections/cta";
import { industries } from "@/constants/industries";

export const metadata: Metadata = buildMetadata({
  title: "AI Solutions | Blugent - Enterprise AI Platform",
  description:
    "Discover Blugent's enterprise AI solutions for sales, marketing, operations, and customer service automation.",
  path: "/solutions",
  keywords: ["AI solutions", "industry AI solutions", "enterprise AI use cases"],
});

export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ])}
      />
      <PageHero
        eyebrow="Solutions"
        title="AI built around how your industry actually operates"
        description="The right architecture for an AI system in healthcare looks nothing like one for logistics. We design around your industry's constraints, not a generic template."
        breadcrumbs={[{ label: "Solutions", href: "/solutions" }]}
      >
        <div className="mx-auto aspect-[2/1] w-full max-w-2xl">
          <Globe className="size-full" />
        </div>
      </PageHero>

      <Section className="pt-0">
        <Container>
          <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <RevealItem key={industry.slug}>
                <GlassCard id={industry.slug} className="h-full scroll-mt-32">
                  <span className="flex size-12 items-center justify-center rounded-xl border border-magenta/20 bg-magenta/[0.07] text-magenta-soft">
                    <industry.icon className="size-6" />
                  </span>
                  <h2 className="mt-5 text-lg font-bold leading-snug tracking-tight text-white">{industry.name}</h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/45">{industry.description}</p>
                  <ul className="mt-5 space-y-1.5 border-t border-white/[0.06] pt-4">
                    {industry.useCases.map((useCase) => (
                      <li key={useCase} className="flex items-center gap-2 text-xs text-white/40">
                        <span className="size-1 shrink-0 rounded-full bg-magenta/60" />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Cta />
    </>
  );
}
