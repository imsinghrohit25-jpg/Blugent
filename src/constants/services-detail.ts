import type { LucideIcon } from "lucide-react";
import {
  Cpu,
  Bot,
  Workflow,
  Database,
  BrainCircuit,
  MessageSquare,
  Network,
  Layers,
  Brain,
  Sparkles,
  Rocket,
  Compass,
  RefreshCw,
  Search,
  HelpCircle,
  Globe,
  MousePointerClick,
  TrendingUp,
  Award,
} from "lucide-react";

export interface ServiceCategory {
  id: string;
  label: string;
}

export const serviceCategories: ServiceCategory[] = [
  { id: "ai-development", label: "AI Development" },
  { id: "ai-ml-engineering", label: "AI & ML Engineering" },
  { id: "software-consulting", label: "Software & Consulting" },
  { id: "growth-marketing", label: "Growth & Marketing" },
];

export interface ServiceDetail {
  slug: string;
  name: string;
  category: string;
  icon: LucideIcon;
  problem: string;
  solution: string;
  techStack: string[];
  benefits: string[];
  industries: string[];
  ctaLabel: string;
}

export const servicesDetail: ServiceDetail[] = [
  {
    slug: "enterprise-ai-development",
    name: "Enterprise AI Development",
    category: "ai-development",
    icon: Cpu,
    problem:
      "Most AI pilots are built by a small team in isolation and never survive contact with the compliance, security, and integration requirements of a real enterprise environment.",
    solution:
      "We design and build AI systems as production software from day one — with the architecture, observability, and review process your engineering and risk teams already expect from anything that touches live operations.",
    techStack: ["Python", "TypeScript", "FastAPI", "PostgreSQL", "Docker", "Kubernetes"],
    benefits: [
      "Built for your existing security and compliance review",
      "Architected to scale past the pilot without a rebuild",
      "Full observability from day one, not bolted on later",
      "Documented and handed off so your team can operate it",
    ],
    industries: ["Finance", "Healthcare", "Enterprise"],
    ctaLabel: "Talk to us about an AI build",
  },
  {
    slug: "ai-agents",
    name: "AI Agents",
    category: "ai-development",
    icon: Bot,
    problem:
      "Chatbots that only answer questions leave the actual work — approvals, lookups, follow-ups — sitting in someone's queue.",
    solution:
      "We build agents that plan and execute multi-step work inside your real systems, with a defined scope of authority and human checkpoints on anything above a risk threshold you set.",
    techStack: ["LangGraph", "OpenAI", "Anthropic", "Vector databases", "Internal API connectors"],
    benefits: [
      "Agents act inside your systems, not just chat about them",
      "Scoped autonomy with explicit human escalation paths",
      "Full audit trail on every action an agent takes",
      "Starts narrow, expands as trust is earned",
    ],
    industries: ["Finance", "Legal", "Recruitment", "Enterprise"],
    ctaLabel: "Talk to us about AI agents",
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    category: "ai-development",
    icon: Workflow,
    problem:
      "Manual, repeatable workflows — data entry, routing, follow-ups — consume hours your team could spend on judgment calls a system can't make.",
    solution:
      "We automate the repeatable parts of a workflow end-to-end and route only the genuine exceptions to a person, with the full context already attached.",
    techStack: ["Workflow orchestration", "RPA connectors", "Webhooks", "n8n / Temporal", "Internal APIs"],
    benefits: [
      "Removes manual work from high-volume processes",
      "Exceptions reach the right person with full context",
      "Integrates with the CRM/ERP you already run",
      "Rolled out workflow-by-workflow, not all at once",
    ],
    industries: ["Manufacturing", "Logistics", "Retail", "Enterprise"],
    ctaLabel: "Talk to us about automation",
  },
  {
    slug: "rag-systems",
    name: "RAG Systems",
    category: "ai-development",
    icon: Database,
    problem:
      "Your organization's real knowledge is scattered across PDFs, wikis, and systems that don't talk to each other — and a generic AI assistant doesn't know any of it.",
    solution:
      "We build retrieval-augmented platforms that ground every answer in your own documents and data, with citations back to the exact source — not a model guessing from memory.",
    techStack: ["Pinecone / Weaviate", "Hybrid search", "LangChain", "Document parsing pipelines"],
    benefits: [
      "Answers grounded in your actual documents, with citations",
      "Handles messy real-world formats, not just clean text",
      "Deployable inside your own cloud environment",
      "Re-indexes continuously as your knowledge base changes",
    ],
    industries: ["Healthcare", "Legal", "Education", "Enterprise"],
    ctaLabel: "Talk to us about RAG",
  },
  {
    slug: "llm-integration",
    name: "LLM Integration",
    category: "ai-development",
    icon: BrainCircuit,
    problem:
      "Wiring a frontier model into a product is easy in a demo and brittle in production — rate limits, cost control, fallback handling, and prompt versioning all get skipped.",
    solution:
      "We integrate LLMs into your product or internal tooling with proper cost controls, fallback models, prompt versioning, and monitoring built in from the start.",
    techStack: ["OpenAI API", "Anthropic API", "Open-source models", "Prompt versioning tooling"],
    benefits: [
      "Production-grade integration, not a fragile demo wrapper",
      "Cost and rate-limit controls built in",
      "Model-agnostic — swap providers without a rewrite",
      "Versioned prompts with rollback",
    ],
    industries: ["Enterprise", "Retail", "Finance"],
    ctaLabel: "Talk to us about LLM integration",
  },
  {
    slug: "ai-chatbots",
    name: "AI Chatbots",
    category: "ai-development",
    icon: MessageSquare,
    problem:
      "Off-the-shelf chatbot widgets give generic, ungrounded answers and have no path to actually resolving a customer's issue.",
    solution:
      "We build conversational interfaces grounded in your knowledge base and connected to your systems, so they can resolve issues — not just deflect them — with a clean handoff to a human when needed.",
    techStack: ["RAG-grounded responses", "Intent routing", "CRM/helpdesk integrations", "Multi-channel deployment"],
    benefits: [
      "Grounded in your real documentation and policies",
      "Connected to your systems to actually resolve issues",
      "Clean handoff to a human when it should escalate",
      "Deployable across web, app, and messaging channels",
    ],
    industries: ["Retail", "Finance", "Education"],
    ctaLabel: "Talk to us about chatbots",
  },
  {
    slug: "machine-learning",
    name: "Machine Learning",
    category: "ai-ml-engineering",
    icon: Network,
    problem:
      "You have historical data with predictive value sitting unused, and no in-house team to turn it into a deployed model.",
    solution:
      "We build, validate, and deploy predictive models tailored to your operational data — with the monitoring in place to catch performance drift after launch.",
    techStack: ["PyTorch", "scikit-learn", "Feature pipelines", "Model monitoring"],
    benefits: [
      "Models built on your actual operational data",
      "Validated against real outcomes, not just held-out test sets",
      "Deployed with drift monitoring, not left to decay silently",
      "Retraining loop included, not a one-time delivery",
    ],
    industries: ["Manufacturing", "Finance", "Retail"],
    ctaLabel: "Talk to us about ML",
  },
  {
    slug: "deep-learning",
    name: "Deep Learning",
    category: "ai-ml-engineering",
    icon: Layers,
    problem:
      "Vision, signal, and unstructured-data problems often need architectures beyond classical ML — and getting them production-ready takes specialized expertise.",
    solution:
      "We design and train deep learning architectures for vision, language, and signal-processing problems, optimized for your inference latency and infrastructure constraints.",
    techStack: ["PyTorch", "Computer vision pipelines", "ONNX / TensorRT", "GPU inference infrastructure"],
    benefits: [
      "Architectures matched to your specific problem, not generic templates",
      "Optimized for real-world inference latency and cost",
      "Trained and validated on representative production data",
      "Deployment-ready, including edge/on-prem inference",
    ],
    industries: ["Manufacturing", "Healthcare"],
    ctaLabel: "Talk to us about deep learning",
  },
  {
    slug: "neural-networks",
    name: "Neural Networks",
    category: "ai-ml-engineering",
    icon: Brain,
    problem:
      "Generic off-the-shelf models often underperform on domain-specific problems where the structure of your data doesn't match what public models were trained on.",
    solution:
      "We design, train, and fine-tune custom neural network architectures specifically for your domain and data, rather than forcing a general-purpose model to fit.",
    techStack: ["PyTorch", "Custom architecture design", "Transfer learning", "Hyperparameter optimization"],
    benefits: [
      "Architectures designed around your specific data, not generic",
      "Fine-tuned and benchmarked against your real use case",
      "Built with reproducible training pipelines",
      "Documented for your team to retrain independently",
    ],
    industries: ["Manufacturing", "Finance", "Enterprise"],
    ctaLabel: "Talk to us about neural networks",
  },
  {
    slug: "generative-ai",
    name: "Generative AI",
    category: "ai-ml-engineering",
    icon: Sparkles,
    problem:
      "Generic content and code generation tools don't understand your brand voice, technical standards, or internal context — so output needs heavy manual rework.",
    solution:
      "We build generative pipelines for content, code, and design tuned to your standards and context, with review steps built in so output is usable, not just plausible.",
    techStack: ["Fine-tuning", "Prompt engineering", "RAG-grounded generation", "Output validation pipelines"],
    benefits: [
      "Output tuned to your brand voice and technical standards",
      "Grounded in your context, not generic training data",
      "Built-in review/validation steps before output ships",
      "Integrated into the tools your team already uses",
    ],
    industries: ["Retail", "Enterprise"],
    ctaLabel: "Talk to us about generative AI",
  },
  {
    slug: "custom-ai-software",
    name: "Custom AI Software",
    category: "software-consulting",
    icon: Rocket,
    problem:
      "Your AI use case doesn't fit a SaaS product, and stitching together point solutions creates a maintenance burden no one signed up for.",
    solution:
      "We design and build bespoke AI-native software — from internal tools to client-facing products — owned outright by you, not licensed from us.",
    techStack: ["Next.js", "TypeScript", "Python", "Cloud infrastructure (AWS/Azure/GCP)"],
    benefits: [
      "Built around your actual workflow, not a generic template",
      "You own the code and the infrastructure outright",
      "Architected to scale with your usage from day one",
      "Documented and handed off cleanly to your team",
    ],
    industries: ["Enterprise", "Retail", "Recruitment"],
    ctaLabel: "Talk to us about custom software",
  },
  {
    slug: "ai-consulting",
    name: "AI Consulting",
    category: "software-consulting",
    icon: Compass,
    problem:
      "Leadership knows AI matters but lacks a clear, sequenced roadmap for where it actually creates value versus where it's just noise.",
    solution:
      "We run a structured readiness audit across your data, systems, and operations, then deliver a prioritized roadmap of AI opportunities ranked by feasibility and impact.",
    techStack: ["Data & systems audit frameworks", "ROI modeling", "Architecture review"],
    benefits: [
      "A prioritized roadmap, not a generic AI strategy deck",
      "Honest assessment of what's feasible with your current data",
      "Clear sequencing — what to do first, second, and not yet",
      "Vendor-neutral recommendations",
    ],
    industries: ["Enterprise", "Finance", "Healthcare"],
    ctaLabel: "Talk to us about AI strategy",
  },
  {
    slug: "digital-transformation",
    name: "Digital Transformation",
    category: "software-consulting",
    icon: RefreshCw,
    problem:
      "Legacy systems and manual processes slow down decision-making and make it hard to introduce AI anywhere without a much larger overhaul first.",
    solution:
      "We help modernize the underlying systems and workflows — data infrastructure, integrations, process design — so AI initiatives have a stable foundation to run on.",
    techStack: ["Cloud migration", "API & data integration", "Process re-engineering"],
    benefits: [
      "A stable foundation for AI initiatives, not a patchwork",
      "Modernization sequenced around business priorities",
      "Minimal disruption to day-to-day operations during rollout",
      "Sets up clean data infrastructure for future AI work",
    ],
    industries: ["Manufacturing", "Logistics", "Enterprise"],
    ctaLabel: "Talk to us about transformation",
  },
  {
    slug: "seo",
    name: "SEO",
    category: "growth-marketing",
    icon: Search,
    problem:
      "Organic visibility erodes quietly when technical SEO and content strategy aren't treated as ongoing, measured work.",
    solution:
      "We run technical SEO audits, fix the structural issues holding your site back, and build a content strategy aimed at durable organic growth — not short-term ranking tricks.",
    techStack: ["Technical SEO audits", "Search Console", "Structured data", "Content strategy frameworks"],
    benefits: [
      "Technical fixes prioritized by actual impact",
      "Content strategy built around real search intent",
      "Transparent reporting on what's working and what isn't",
      "No tactics that risk a future ranking penalty",
    ],
    industries: ["Retail", "Enterprise"],
    ctaLabel: "Talk to us about SEO",
  },
  {
    slug: "aeo",
    name: "AEO",
    category: "growth-marketing",
    icon: HelpCircle,
    problem:
      "Voice assistants and AI-powered search increasingly answer questions directly — if your content isn't structured to be the answer, you don't get the click.",
    solution:
      "We structure your content — clear answers, schema markup, well-formed Q&A — so assistants and answer engines can extract and surface it directly.",
    techStack: ["Schema.org markup", "FAQ structuring", "Answer-first content design"],
    benefits: [
      "Content structured to be extractable, not just readable",
      "Schema markup that makes your claims unambiguous",
      "Positions your brand as the cited source in AI answers",
      "Builds on existing SEO work rather than replacing it",
    ],
    industries: ["Retail", "Finance", "Enterprise"],
    ctaLabel: "Talk to us about AEO",
  },
  {
    slug: "geo",
    name: "GEO",
    category: "growth-marketing",
    icon: Globe,
    problem:
      "Customers are increasingly asking ChatGPT, Gemini, and Perplexity instead of Google — and most brands have no idea how they show up in those answers, if at all.",
    solution:
      "We audit how your brand currently appears across major AI assistants and build a generative-engine-optimization plan to improve accuracy and visibility in AI-generated answers.",
    techStack: ["LLM answer auditing", "Structured content design", "Third-party citation building"],
    benefits: [
      "Clear picture of how AI assistants currently describe you",
      "A concrete plan to close visibility and accuracy gaps",
      "Builds the structured, citable content AI models favor",
      "Tracked over time as a standing program, not a one-off",
    ],
    industries: ["Retail", "Enterprise", "Finance"],
    ctaLabel: "Talk to us about GEO",
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    category: "growth-marketing",
    icon: MousePointerClick,
    problem:
      "Paid search budgets get wasted on broad targeting and weak conversion tracking, making it impossible to tell what's actually driving revenue.",
    solution:
      "We build and manage Google Ads campaigns with tight targeting and proper conversion tracking, optimized continuously against the metrics that matter to your business.",
    techStack: ["Google Ads", "Conversion tracking", "Landing page testing", "Bid strategy optimization"],
    benefits: [
      "Campaigns optimized for revenue, not just clicks",
      "Conversion tracking set up correctly from day one",
      "Transparent spend and performance reporting",
      "Continuous testing, not a set-and-forget campaign",
    ],
    industries: ["Retail", "Recruitment", "Enterprise"],
    ctaLabel: "Talk to us about Google Ads",
  },
  {
    slug: "performance-marketing",
    name: "Performance Marketing",
    category: "growth-marketing",
    icon: TrendingUp,
    problem:
      "Acquisition spread thin across channels without unified measurement makes it hard to know where to invest the next dollar.",
    solution:
      "We run cross-channel acquisition with unified measurement and attribution, so budget moves toward what's actually working rather than what's easiest to report on.",
    techStack: ["Multi-channel campaign management", "Attribution modeling", "Analytics & dashboards"],
    benefits: [
      "Unified view of performance across every channel",
      "Budget reallocated toward what's proven to convert",
      "Attribution modeling that accounts for the full funnel",
      "Reporting built around business outcomes, not vanity metrics",
    ],
    industries: ["Retail", "Enterprise"],
    ctaLabel: "Talk to us about performance marketing",
  },
  {
    slug: "brand-growth",
    name: "Brand Growth",
    category: "growth-marketing",
    icon: Award,
    problem:
      "Technical credibility doesn't automatically translate into market awareness — strong engineering can still lose to a louder, clearer competitor.",
    solution:
      "We develop positioning and brand systems that translate genuine technical capability into a market presence that's clear, credible, and memorable.",
    techStack: ["Brand positioning frameworks", "Messaging architecture", "Content & design systems"],
    benefits: [
      "Positioning grounded in your actual capabilities",
      "A consistent system across every customer touchpoint",
      "Messaging that's credible to technical buyers",
      "A foundation your team can extend without us",
    ],
    industries: ["Enterprise", "Recruitment"],
    ctaLabel: "Talk to us about brand growth",
  },
];
