import type { LucideIcon } from "lucide-react";
import {
  Target,
  Microscope,
  ShieldCheck,
  HeartHandshake,
  Workflow,
  Lock,
  Layers,
  RefreshCw,
  GitBranch,
  Eye,
} from "lucide-react";

export const companyStory: string[] = [
  "Most enterprise AI initiatives never make it past a pilot. The model works in a demo, then quietly gets switched off a few months into production — not because the underlying technology was weak, but because it was never engineered for the realities of a live operating environment: messy data, compliance review, change management, and the cost of being wrong.",
  "Blugent exists to close that gap. We're a team of engineers and applied researchers who build AI agents, retrieval systems, and automation layers the way production software is supposed to be built — with monitoring, rollback plans, audit trails, and an evaluation harness that catches drift before a client does.",
  "We don't sell a platform you have to bend your business around. We design systems that plug into the tools and workflows you already run, scoped tightly enough to earn trust fast and built openly enough that your own team can operate them long after we've handed over the keys.",
];

export const mission =
  "To give enterprises the infrastructure to operate autonomously — AI systems that plan, decide, and act inside real workflows, governed with the same rigor as the people they work alongside.";

export const vision =
  "A future where the operational core of every enterprise — claims, contracts, supply chains, customer service, compliance — runs on AI systems that are as auditable, reliable, and accountable as a well-run team.";

export interface ValueItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const whyChooseUs: ValueItem[] = [
  {
    title: "Production over demos",
    description: "We measure success by what survives contact with real operations, not what impresses in a sales call.",
    icon: Target,
  },
  {
    title: "Rigor over hype",
    description: "Every system ships with evaluation data behind it. We're skeptical of our own excitement until the numbers agree.",
    icon: Microscope,
  },
  {
    title: "Auditable by default",
    description: "If a decision can't be traced back to its source, it doesn't ship — regardless of how well it performs.",
    icon: ShieldCheck,
  },
  {
    title: "Long-term partnership",
    description: "We design for the system you'll still trust two years from now, not the one that wins this quarter's demo.",
    icon: HeartHandshake,
  },
  {
    title: "Integration, not replacement",
    description: "We connect to the CRM, ERP, and core systems you already run — a rip-and-replace migration is rarely the right answer.",
    icon: Workflow,
  },
  {
    title: "Security-first architecture",
    description: "Single-tenant deployment options, role-based access, and full audit logging are the default, not an upsell.",
    icon: Lock,
  },
];

export const technologyPhilosophy: ValueItem[] = [
  {
    title: "Right model for the job",
    description: "We select models and architectures based on what your data and constraints actually require — not whichever one is trending.",
    icon: Layers,
  },
  {
    title: "Evaluation is continuous",
    description: "We treat model and retrieval evaluation as a standing pipeline against real usage, not a one-time benchmark before launch.",
    icon: RefreshCw,
  },
  {
    title: "Scoped autonomy",
    description: "Every agent operates within an explicit, narrow boundary of authority, with clear escalation paths for anything outside it.",
    icon: GitBranch,
  },
  {
    title: "Full observability",
    description: "Every automated decision is logged with the data, model version, and reasoning that produced it — visible, not a black box.",
    icon: Eye,
  },
];
