import { buildOgImageResponse, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return buildOgImageResponse(
    "Terms of Service",
    "The terms governing use of the Blugent website and engagement with our enterprise AI services."
  );
}
