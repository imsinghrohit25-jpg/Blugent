import { buildOgImageResponse, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return buildOgImageResponse(
    "Talk to Blugent",
    "AI agents, RAG platforms, and automation for your enterprise — most replies within one business day."
  );
}
