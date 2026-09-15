import type { Metadata } from "next";
import { siteConfig } from "@/constants/site";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
  keywords,
}: BuildMetadataOptions): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const fullTitle = path === "/" ? title : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      // `images` is omitted (not set to undefined) when no explicit image is
      // passed, so Next.js falls back to the route's opengraph-image file
      // convention — Next only auto-merges that file when the `images` key
      // is entirely absent (checked via hasOwnProperty), not just falsy.
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
      creator: "@blugent",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
