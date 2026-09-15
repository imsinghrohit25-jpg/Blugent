import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, servicesItemListJsonLd } from "@/lib/jsonld";
import { Container, Section } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { Cta } from "@/components/sections/cta";
import { ServiceExplorer } from "@/app/services/service-explorer";
import { servicesDetail } from "@/constants/services-detail";

export const metadata: Metadata = buildMetadata({
  title: "AI Services | Blugent - Custom AI Agents & Automation",
  description:
    "Explore Blugent's AI services including custom AI agents, process automation, ML model development, and AI consulting.",
  path: "/services",
  keywords: ["AI services", "AI consulting", "AI automation", "RAG systems", "AI agents"],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesItemListJsonLd(servicesDetail)} />
      <PageHero
        eyebrow="Services"
        title="Every AI capability your enterprise needs, under one roof"
        description="Select a service to see the problem it solves, our approach, the technology behind it, and what it delivers for your business."
      />

      <Section className="pt-0">
        <Container>
          <ServiceExplorer />
        </Container>
      </Section>

      <Cta />
    </>
  );
}
