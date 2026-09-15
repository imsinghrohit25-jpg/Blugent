import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { ClientEffects } from "@/components/motion/client-effects";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/constants/site";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata({
    title: "Blugent | AI Solutions & Automation for Enterprise",
    description:
      "Blugent delivers cutting-edge AI agents, automation, and machine learning solutions for enterprise businesses. Transform your operations with our AI-powered services.",
    path: "/",
    keywords: [
      "AI solutions",
      "AI agents",
      "automation",
      "machine learning",
      "enterprise AI",
      "artificial intelligence",
      "Blugent",
    ],
  }),
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${firaCode.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-magenta focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>

        {/* Client-only effects: custom cursor, loading screen, scroll progress */}
        <ClientEffects />

        <TooltipProvider delayDuration={150}>
          <SmoothScrollProvider>
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </SmoothScrollProvider>
        </TooltipProvider>

        <WhatsAppButton />
      </body>
    </html>
  );
}
