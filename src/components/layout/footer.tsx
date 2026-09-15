"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/ui/container";
import { XIcon, LinkedInIcon, GitHubIcon, YouTubeIcon } from "@/components/icons/social";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { footerNav } from "@/constants/nav";
import { siteConfig } from "@/constants/site";

const socialLinks = [
  { label: "X (Twitter)", href: siteConfig.links.twitter, icon: XIcon },
  { label: "LinkedIn",    href: siteConfig.links.linkedin, icon: LinkedInIcon },
  { label: "GitHub",      href: siteConfig.links.github,   icon: GitHubIcon },
  { label: "YouTube",     href: siteConfig.links.youtube,  icon: YouTubeIcon },
];

const contactItems = [
  {
    icon: Mail,
    label: siteConfig.contact.salesEmail,
    href: `mailto:${siteConfig.contact.salesEmail}`,
  },
  {
    icon: Phone,
    label: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`,
  },
  {
    icon: MapPin,
    label: siteConfig.contact.address,
    href: undefined,
  },
];

const navColumns = [
  { title: "Company", links: footerNav.company },
  { title: "Services", links: footerNav.services },
  { title: "Solutions", links: footerNav.solutions },
  { title: "Resources", links: footerNav.resources },
];

export function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#020204]">
      {/* Full-bleed footer background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 size-full object-cover opacity-40"
        src="/videos/Animate_3D_video_from_image_202608241046.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/50 z-[1]" />

      {/* Blue-to-purple gradient divider */}
      <div
        className="absolute inset-x-0 top-0 z-10 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #3B82F6, #8B5CF6, transparent)" }}
      />

      {/* Ambient background: blue/purple glow + subtle tech grid */}
      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden="true">
        <div style={{ position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 55% 50% at 12% -5%, rgba(59,130,246,0.12), transparent)" }} />
        <div style={{ position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 50% 45% at 88% 105%, rgba(139,92,246,0.12), transparent)" }} />
        <div className="absolute inset-0 bg-grid opacity-[0.05]" />
      </div>

      <Container className="relative z-10 py-16 sm:py-20">
        {/* Top CTA banner */}
        <div className="glass-card flex flex-col items-center gap-7 rounded-3xl px-8 py-11 text-center sm:flex-row sm:justify-between sm:px-12 sm:text-left">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[1.75rem]">
              Ready to build something intelligent?
            </h2>
            <p className="mt-2.5 max-w-md text-sm leading-relaxed text-white/40 sm:text-base">
              Start with a two-week Discovery Sprint — walk away with a working prototype and a roadmap.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.04]"
            style={{
              background: "linear-gradient(128deg, #3B82F6 0%, #8B5CF6 52%, #EC4899 100%)",
              boxShadow: "0 0 38px -8px rgba(59,130,246,0.7), 0 4px 30px -8px rgba(139,92,246,0.55)",
            }}
          >
            Start Your Project
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Brand + nav columns */}
        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.85fr_0.85fr_0.85fr_0.85fr]">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/35">
              {siteConfig.description}
            </p>
            <div className="mt-7 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/35 transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/30 hover:bg-electric/10 hover:text-electric-soft hover:shadow-[0_0_20px_-4px_rgba(59,130,246,0.55)]"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns: Company, Services, Solutions, Resources */}
          {navColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">{col.title}</h3>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact + Newsletter */}
        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-white/[0.05] pt-14 lg:grid-cols-2">
          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">Contact</h3>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
              {contactItems.map((item) => {
                const inner = (
                  <>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-electric/20 bg-electric/[0.08] text-electric-soft shadow-[0_0_18px_-6px_rgba(59,130,246,0.75)] transition-all duration-300 group-hover:border-electric/35 group-hover:shadow-[0_0_24px_-4px_rgba(139,92,246,0.65)]">
                      <item.icon className="size-4" />
                    </span>
                    <span className="text-sm text-white/45 transition-colors duration-200 group-hover:text-white">
                      {item.label}
                    </span>
                  </>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} className="group flex items-center gap-3">
                    {inner}
                  </a>
                ) : (
                  <div key={item.label} className="group flex items-center gap-3">
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">Stay updated</h3>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/35">
              AI insights, case studies, and product updates — delivered monthly.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.05] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerNav.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/20 transition-colors hover:text-white/50"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
