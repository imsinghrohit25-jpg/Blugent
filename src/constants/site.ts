export const siteConfig = {
  name: "Blugent",
  legalName: "Blugent Intelligence, Inc.",
  tagline: "Building Intelligent Enterprises with AI",
  description:
    "Blugent designs, builds, and operates enterprise AI systems — AI agents, retrieval-augmented platforms, and intelligent automation — engineered to run real business operations, not just demos.",
  url: "https://www.blugent.ai",
  locale: "en_US",
  themeColor: "#030712",
  links: {
    twitter: "https://twitter.com/blugent",
    linkedin: "https://linkedin.com/company/blugent",
    github: "https://github.com/blugent-ai",
    youtube: "https://youtube.com/@blugent",
  },
  contact: {
    email: "Imsinghrohit25@gmail.com",
    salesEmail: "Imsinghrohit25@gmail.com",
    phone: "+91 9716202089",
    address: "Swaroop nagar, New Delhi-110042",
  },
} as const;

export type SiteConfig = typeof siteConfig;
