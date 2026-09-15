import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Container, Section } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/app/contact/contact-form";
import { ContactExtras } from "@/components/sections/contact-extras";
import { siteConfig } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact Blugent | Get a Free AI Consultation",
  description:
    "Contact Blugent for a free AI consultation. Let's discuss how AI can transform your business operations.",
  path: "/contact",
});

const contactPoints = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.salesEmail,
    href: `mailto:${siteConfig.contact.salesEmail}`,
    color: "text-magenta-soft",
    iconBg: "bg-magenta/[0.07] border-magenta/20",
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`,
    color: "text-electric-soft",
    iconBg: "bg-electric/[0.07] border-electric/20",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: siteConfig.contact.address,
    href: undefined,
    color: "text-gold-soft",
    iconBg: "bg-gold/[0.07] border-gold/20",
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within 1 business day",
    href: undefined,
    color: "text-emerald-400",
    iconBg: "bg-emerald-500/[0.07] border-emerald-500/20",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your AI roadmap"
        description="Tell us about your use case and current systems. A solutions architect — not a sales bot — will get back to you within one business day."
      />

      <Section className="pt-0">
        <Container>
          <h2 className="sr-only">Contact information and inquiry form</h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Contact info */}
            <div className="space-y-4">
              {contactPoints.map((point, i) => (
                <Reveal key={point.label} delay={i * 0.06}>
                  <GlassCard hover={false} className="flex items-start gap-4">
                    <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl border ${point.iconBg} ${point.color}`}>
                      <point.icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                        {point.label}
                      </p>
                      {point.href ? (
                        <a
                          href={point.href}
                          className="mt-1 block text-sm font-medium text-white/80 transition-colors hover:text-white"
                        >
                          {point.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm font-medium text-white/80">{point.value}</p>
                      )}
                    </div>
                  </GlassCard>
                </Reveal>
              ))}
            </div>

            {/* Contact form */}
            <Reveal direction="left">
              <ContactForm />
            </Reveal>
          </div>

          {/* Map + booking */}
          <div className="mt-8">
            <ContactExtras />
          </div>
        </Container>
      </Section>
    </>
  );
}
