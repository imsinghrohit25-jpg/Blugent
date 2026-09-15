import type { LucideIcon } from "lucide-react";
import {
  HeartPulse,
  Scale,
  Landmark,
  UserSearch,
  Factory,
  ShoppingCart,
  GraduationCap,
  Truck,
  Building2,
} from "lucide-react";

export interface Industry {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  useCases: string[];
}

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    description:
      "AI copilots and retrieval systems built on compliant infrastructure for providers, payers, and life-sciences teams.",
    icon: HeartPulse,
    useCases: ["Clinical documentation support", "Prior authorization workflows", "Patient intake & triage agents", "Research literature retrieval"],
  },
  {
    slug: "legal",
    name: "Legal",
    description:
      "Contract intelligence and research copilots that compress review time, with full audit trails on every output.",
    icon: Scale,
    useCases: ["Contract analysis & clause comparison", "Legal research retrieval", "E-discovery automation", "Compliance monitoring agents"],
  },
  {
    slug: "finance",
    name: "Finance",
    description:
      "Risk-aware AI for underwriting, fraud detection, and client servicing for banks, lenders, and asset managers.",
    icon: Landmark,
    useCases: ["Fraud & anomaly detection", "Credit risk modeling support", "Client onboarding automation", "Financial document intelligence"],
  },
  {
    slug: "recruitment",
    name: "Recruitment",
    description:
      "Sourcing, screening, and candidate-engagement agents that give recruiters more time for the conversations that matter.",
    icon: UserSearch,
    useCases: ["Resume screening & ranking", "Candidate sourcing agents", "Interview scheduling automation", "Talent pipeline intelligence"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    description:
      "Predictive maintenance and quality-control systems for production lines and industrial operations.",
    icon: Factory,
    useCases: ["Predictive maintenance models", "Computer-vision quality control", "Supply chain forecasting", "Production reporting automation"],
  },
  {
    slug: "retail",
    name: "Retail",
    description:
      "Personalization, demand forecasting, and customer-service agents for omnichannel retail operations.",
    icon: ShoppingCart,
    useCases: ["Product recommendation engines", "Demand & inventory forecasting", "Customer service agents", "Catalog & content automation"],
  },
  {
    slug: "education",
    name: "Education",
    description:
      "Secure AI systems for institutions handling student records, admissions, and academic support at scale.",
    icon: GraduationCap,
    useCases: ["Admissions document processing", "Student support agents", "Curriculum & research assistants", "Administrative automation"],
  },
  {
    slug: "logistics",
    name: "Logistics",
    description:
      "Routing, inventory, and exception-handling agents built for the pace of global supply networks.",
    icon: Truck,
    useCases: ["Route & fleet optimization", "Inventory forecasting", "Exception management agents", "Carrier & vendor communication automation"],
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    description:
      "Cross-functional AI infrastructure for large organizations standardizing automation across departments.",
    icon: Building2,
    useCases: ["Internal knowledge retrieval", "Cross-department workflow automation", "Document & contract intelligence", "Custom internal tooling"],
  },
];
