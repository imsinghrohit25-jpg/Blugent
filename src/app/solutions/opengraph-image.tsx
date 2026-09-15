import { buildOgImageResponse, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return buildOgImageResponse(
    "Industry-Specific AI Solutions",
    "Healthcare, legal, finance, recruitment, manufacturing, retail, education, logistics, and more."
  );
}
