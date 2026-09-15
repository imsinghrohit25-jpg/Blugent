import type { LucideIcon } from "lucide-react";
import { servicesDetail, serviceCategories } from "@/constants/services-detail";

export interface NavLink {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export const mainNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
];

export const simpleNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export interface MegaMenuGroup {
  id: string;
  label: string;
  items: { name: string; slug: string; icon: LucideIcon }[];
}

export const servicesMegaMenu: MegaMenuGroup[] = serviceCategories.map((category) => ({
  id: category.id,
  label: category.label,
  items: servicesDetail
    .filter((service) => service.category === category.id)
    .map((service) => ({ name: service.name, slug: service.slug, icon: service.icon })),
}));

export const footerNav = {
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "All Services", href: "/services" },
    { label: "AI Agents", href: "/services#ai-agents" },
    { label: "RAG Systems", href: "/services#rag-systems" },
    { label: "AI Automation", href: "/services#ai-automation" },
  ],
  solutions: [
    { label: "All Solutions", href: "/solutions" },
    { label: "Healthcare", href: "/solutions#healthcare" },
    { label: "Finance", href: "/solutions#finance" },
    { label: "Enterprise", href: "/solutions#enterprise" },
  ],
  resources: [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
