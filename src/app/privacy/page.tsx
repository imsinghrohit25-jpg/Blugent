import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { LegalContent } from "@/components/sections/legal-content";
import { privacySections, lastUpdated } from "@/constants/legal";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Blugent collects, uses, and protects information across our website and enterprise AI deployments.",
  path: "/privacy",
  noIndex: false,
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description="How we collect, use, and protect your information." />
      <LegalContent sections={privacySections} lastUpdated={lastUpdated} />
    </>
  );
}
