import { buildOgImageResponse, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return buildOgImageResponse(
    "AI Agents, RAG & Automation Services",
    "Blugent's full service catalog — each with the problem it solves, our approach, and tech stack."
  );
}
