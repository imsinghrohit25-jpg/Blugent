export interface FaqItem {
  question: string;
  answer: string;
}

export const homeFaqs: FaqItem[] = [
  {
    question: "What kinds of companies does Blugent work with?",
    answer:
      "We work primarily with mid-market and enterprise organizations — typically 200+ employees — in financial services, healthcare, retail, manufacturing, logistics, legal, and the public sector. Our systems are built for environments with real compliance, security, and scale requirements.",
  },
  {
    question: "How long does a typical engagement take?",
    answer:
      "Most engagements move from kickoff to a production pilot in 6-10 weeks, followed by a phased rollout. Scope and data readiness are the biggest variables — our discovery sprint gives you an accurate timeline before any commitment.",
  },
  {
    question: "Do you build on top of our existing systems, or replace them?",
    answer:
      "We integrate. Blugent's agents and automation layers connect to your existing CRM, ERP, data warehouse, and core systems through APIs and secure connectors — we very rarely recommend a rip-and-replace approach.",
  },
  {
    question: "How do you handle data security and compliance?",
    answer:
      "All deployments run in your cloud environment or a dedicated single-tenant instance. We support SOC 2, HIPAA, and GDPR-aligned architectures, with full audit logging, role-based access, and configurable data retention policies.",
  },
  {
    question: "Can you work with our existing AI or data science team?",
    answer:
      "Yes — many engagements are co-delivered with internal teams. We can lead end-to-end delivery, embed engineers alongside yours, or hand off a fully documented system for your team to operate independently.",
  },
  {
    question: "What does pricing look like?",
    answer:
      "Engagements are scoped around outcomes, not hours. Most clients start with a fixed-fee discovery sprint that defines the exact scope and cost of the build before any larger commitment — reach out and we'll walk you through it.",
  },
];
