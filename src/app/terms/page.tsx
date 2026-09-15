import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { LegalContent } from "@/components/sections/legal-content";
import { termsSections, lastUpdated } from "@/constants/legal";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms governing use of the Blugent website and engagement with Blugent's enterprise AI services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" description="The terms governing use of blugent.ai and our services." />
      <LegalContent sections={termsSections} lastUpdated={lastUpdated} />
    </>
  );
}
