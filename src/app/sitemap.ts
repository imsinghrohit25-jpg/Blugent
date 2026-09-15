import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";

const staticRoutes = [
  { path: "/", priority: 1, frequency: "weekly" as const },
  { path: "/services", priority: 0.9, frequency: "weekly" as const },
  { path: "/solutions", priority: 0.8, frequency: "monthly" as const },
  { path: "/case-studies", priority: 0.8, frequency: "monthly" as const },
  { path: "/about", priority: 0.7, frequency: "monthly" as const },
  { path: "/contact", priority: 0.7, frequency: "yearly" as const },
  { path: "/privacy", priority: 0.3, frequency: "yearly" as const },
  { path: "/terms", priority: 0.3, frequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return staticRoutes.map((route) => ({
    url: new URL(route.path, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: route.frequency,
    priority: route.priority,
  }));
}
