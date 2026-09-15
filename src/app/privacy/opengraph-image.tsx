import { buildOgImageResponse, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return buildOgImageResponse(
    "Privacy Policy",
    "How Blugent collects, uses, and protects information across our website and AI deployments."
  );
}
