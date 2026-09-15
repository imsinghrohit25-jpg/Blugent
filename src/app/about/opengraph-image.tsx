import { buildOgImageResponse, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return buildOgImageResponse(
    "About Blugent",
    "An enterprise AI company building autonomous agents, RAG platforms, and intelligent automation."
  );
}
