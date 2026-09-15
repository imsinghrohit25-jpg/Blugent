import { siteConfig } from "@/constants/site";
import { buildOgImageResponse, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return buildOgImageResponse(
    siteConfig.tagline,
    "AI agents, RAG systems, and intelligent automation for the enterprise."
  );
}
