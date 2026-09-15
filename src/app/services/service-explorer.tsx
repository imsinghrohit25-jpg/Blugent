"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { servicesDetail, serviceCategories } from "@/constants/services-detail";
import { industries } from "@/constants/industries";

function industryHref(name: string) {
  const match = industries.find((i) => i.name === name);
  return match ? `/solutions#${match.slug}` : undefined;
}

function ServiceDetailPanel({ service }: { service: (typeof servicesDetail)[number] }) {
  return (
    <GlassCard hover={false} className="h-full">
      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-electric-soft">
          <service.icon className="size-6" />
        </span>
        <div>
          <h3 className="text-xl font-semibold text-white">{service.name}</h3>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Problem</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{service.problem}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Solution</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{service.solution}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Technology Stack</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {service.techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="border-white/10 bg-white/[0.03] text-slate-300">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Business Benefits</p>
        <ul className="mt-2.5 space-y-2">
          {service.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-300">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-electric-soft" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Industries</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {service.industries.map((name) => {
            const href = industryHref(name);
            return href ? (
              <Link
                key={name}
                href={href}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300 transition-colors hover:border-electric/40 hover:text-white"
              >
                {name}
              </Link>
            ) : (
              <span key={name} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
                {name}
              </span>
            );
          })}
        </div>
      </div>

      <Button className="mt-7 gap-2 rounded-full px-6" asChild>
        <Link href="/contact">
          {service.ctaLabel}
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </GlassCard>
  );
}

export function ServiceExplorer() {
  const [active, setActive] = useState(servicesDetail[0].slug);

  useEffect(() => {
    // Deep-link support (e.g. /services#ai-agents from the header mega menu).
    // Deferred to an effect intentionally: the server always renders the
    // first service so markup is hydration-safe, then we sync to the URL
    // hash once `window` is available.
    const hash = window.location.hash.replace("#", "");
    if (hash && servicesDetail.some((s) => s.slug === hash)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(hash);
    }
  }, []);

  return (
    <div>
      {/* Desktop: vertical tabs (list + detail panel) */}
      <Tabs
        value={active}
        onValueChange={setActive}
        orientation="vertical"
        className="hidden gap-8 lg:grid lg:grid-cols-[300px_1fr] lg:flex-row"
      >
        <TabsList className="h-fit w-full flex-col items-stretch gap-1 bg-transparent p-0">
          {serviceCategories.map((category) => (
            <div key={category.id} className="mb-3">
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{category.label}</p>
              {servicesDetail
                .filter((s) => s.category === category.id)
                .map((service) => (
                  <TabsTrigger
                    key={service.slug}
                    value={service.slug}
                    id={service.slug}
                    className={cn(
                      "h-auto w-full justify-start gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-400 data-active:bg-white/[0.06] data-active:text-white data-active:shadow-none",
                      "scroll-mt-32"
                    )}
                  >
                    <service.icon className="size-4 shrink-0" />
                    {service.name}
                  </TabsTrigger>
                ))}
            </div>
          ))}
        </TabsList>

        <div>
          {servicesDetail.map((service) => (
            <TabsContent key={service.slug} value={service.slug} className="mt-0">
              <ServiceDetailPanel service={service} />
            </TabsContent>
          ))}
        </div>
      </Tabs>

      {/* Mobile: accordion grouped by category */}
      <div className="lg:hidden">
        {serviceCategories.map((category) => (
          <div key={category.id} className="mb-6">
            <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{category.label}</p>
            <Accordion type="single" collapsible defaultValue={undefined}>
              {servicesDetail
                .filter((s) => s.category === category.id)
                .map((service) => (
                  <AccordionItem key={service.slug} value={service.slug} id={service.slug} className="border-white/10 scroll-mt-32">
                    <AccordionTrigger className="gap-3 text-left text-sm font-medium text-white hover:no-underline">
                      <span className="flex items-center gap-2.5">
                        <service.icon className="size-4 shrink-0 text-electric-soft" />
                        {service.name}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ServiceDetailPanel service={service} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
