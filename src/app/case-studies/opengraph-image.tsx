import { buildOgImageResponse, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return buildOgImageResponse(
    "How Blugent Builds AI Systems",
    "Our methodology, what we build, and what an engagement looks like from kickoff to production."
  );
}
