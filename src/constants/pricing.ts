export interface PricingTier {
  id: string;
  name: string;
  price: string;
  billing: string;
  description: string;
  highlight: boolean;
  badge?: string;
  features: string[];
  cta: string;
  href: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "Discovery Sprint",
    billing: "Fixed-fee · 2 weeks",
    description:
      "Validate your AI opportunity with a working prototype and a production-ready roadmap. Zero commitment beyond the sprint.",
    highlight: false,
    features: [
      "In-depth operations & data audit",
      "Proof-of-concept agent or RAG demo",
      "ROI model and business case",
      "Full technical architecture document",
      "30-day launch roadmap",
      "Kickoff within 5 business days",
    ],
    cta: "Book a Sprint",
    href: "/contact",
  },
  {
    id: "growth",
    name: "Growth",
    price: "Production Build",
    billing: "Milestone-based · 6–10 weeks",
    description:
      "Full-cycle design, build, and deployment of your first production AI system with bi-weekly working software deliveries.",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Everything in Starter",
      "Production agent or RAG platform build",
      "API and system integrations (up to 5)",
      "Custom fine-tuning or embedding pipelines",
      "Staging & production deployment",
      "Monitoring, alerting, and observability",
      "3 months post-launch support",
    ],
    cta: "Start Building",
    href: "/contact",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    billing: "Retainer or project-based",
    description:
      "Multi-agent platforms, enterprise integrations, co-delivery with your team, and ongoing operations for complex AI programs.",
    highlight: false,
    features: [
      "Everything in Growth",
      "Multi-agent orchestration systems",
      "Unlimited system integrations",
      "Dedicated engineering team",
      "Embedded delivery with your team",
      "White-label and OEM options",
      "SLA-backed production operations",
      "Executive steering and roadmap reviews",
    ],
    cta: "Talk to Sales",
    href: "/contact",
  },
];
