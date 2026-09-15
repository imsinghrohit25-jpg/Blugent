import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { MarqueeStrip } from "@/components/sections/marquee-strip";
import { StatsBar } from "@/components/sections/stats-bar";
import { ServicesOverview } from "@/components/sections/services-overview";
import { FlagshipCapabilities } from "@/components/sections/flagship-capabilities";
import { HowWeWork } from "@/components/sections/how-we-work";
import { SolutionsTeaser } from "@/components/sections/solutions-teaser";
import { WhyNexora } from "@/components/sections/why-nexora";
import { Testimonials } from "@/components/sections/testimonials";
import { TechStack } from "@/components/sections/tech-stack";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = buildMetadata({
  title: "Blugent | Best AI Solutions & Automation Agency",
  description:
    "India's leading AI solutions company. We build custom AI agents, automation workflows, and ML models for enterprise businesses.",
  path: "/",
  keywords: ["enterprise AI", "AI agents", "RAG", "AI automation", "machine learning consulting"],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <StatsBar />
      <ServicesOverview />
      <FlagshipCapabilities />
      <HowWeWork />
      <SolutionsTeaser />
      <WhyNexora />
      <Testimonials />
      <TechStack />
      <Pricing />
      <Faq />
      <Cta />
    </>
  );
}
