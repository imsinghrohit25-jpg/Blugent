export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  metric?: string;
  metricLabel?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Blugent's AI agent platform cut our claims processing time from 11 days to under 4 hours. The system integrated seamlessly with our existing infrastructure and exceeded every benchmark in the discovery sprint.",
    author: "Sarah Chen",
    role: "Chief Technology Officer",
    company: "Global Insurance Group",
    metric: "95%",
    metricLabel: "Processing Time Reduced",
  },
  {
    quote:
      "We had tried two other AI vendors before Blugent. The difference is that they actually understand enterprise compliance. The audit trail and SOC 2-aligned architecture gave our legal team confidence from day one.",
    author: "Michael Torres",
    role: "VP of Operations",
    company: "Regional Healthcare Network",
    metric: "340%",
    metricLabel: "ROI in Year One",
  },
  {
    quote:
      "The RAG system Blugent built retrieves answers from over 40,000 internal documents with citation-level accuracy. Our analysts now resolve queries in minutes instead of days. Genuinely transformative.",
    author: "Priya Nair",
    role: "Head of Digital Transformation",
    company: "Financial Services Firm",
    metric: "12x",
    metricLabel: "Analyst Productivity Gain",
  },
  {
    quote:
      "What impressed us most was the speed. We went from discovery sprint to a production agent in six weeks. The system handles 60% of our tier-1 support tickets autonomously, without a single escalation error.",
    author: "James Whitfield",
    role: "Director of Customer Experience",
    company: "Enterprise SaaS Platform",
    metric: "60%",
    metricLabel: "Tickets Resolved Autonomously",
  },
  {
    quote:
      "Blugent didn't just deliver software — they gave us a system we can actually trust at scale. The observability tooling means our team can see every decision the model makes. That transparency is priceless.",
    author: "Aisha Kamara",
    role: "SVP of Engineering",
    company: "Global Logistics Operator",
    metric: "99.7%",
    metricLabel: "Decision Accuracy",
  },
];
