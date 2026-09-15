import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

let cachedLogoDataUrl: string | null = null;

function getLogoDataUrl(): string {
  if (!cachedLogoDataUrl) {
    const bytes = readFileSync(join(process.cwd(), "public/images/blugent-icon-mark.png"));
    cachedLogoDataUrl = `data:image/png;base64,${bytes.toString("base64")}`;
  }
  return cachedLogoDataUrl;
}

/**
 * Shared OG/Twitter image template used by every route's opengraph-image.tsx —
 * keeps brand styling (logo, gradient, typography) in one place instead of
 * duplicating the ImageResponse JSX per page.
 */
export function buildOgImageResponse(title: string, subtitle: string) {
  const logoDataUrl = getLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #030712 0%, #0a1224 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoDataUrl}
            width={56}
            height={56}
            alt=""
            style={{ borderRadius: 14 }}
          />
          <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: -0.5 }}>Blugent</div>
        </div>
        <div style={{ display: "flex", marginTop: 64, fontSize: 56, fontWeight: 700, letterSpacing: -2, maxWidth: 1000, lineHeight: 1.1 }}>
          {title}
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 26, color: "#94A3B8", maxWidth: 900 }}>
          {subtitle}
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}
