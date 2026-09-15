import { MapPin, CalendarClock, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/constants/site";

export function ContactExtras() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Reveal>
        <GlassCard hover={false} className="h-full overflow-hidden p-0">
          {/* Map placeholder — swap for Google Maps iframe when API key available */}
          <div className="relative flex h-52 items-center justify-center overflow-hidden bg-grid-fine">
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-[#050505]/50 to-[#050505]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,70,239,0.08),transparent_60%)]" />
            <span className="relative flex size-14 items-center justify-center rounded-2xl border border-magenta/25 bg-magenta/10 text-magenta-soft shadow-[0_0_30px_-6px_rgba(217,70,239,0.5)]">
              <MapPin className="size-7" />
            </span>
          </div>
          <div className="p-6">
            <h3 className="text-base font-semibold text-white">Visit our headquarters</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/45">{siteConfig.contact.address}</p>
          </div>
        </GlassCard>
      </Reveal>

      <Reveal delay={0.08}>
        <GlassCard hover={false} className="flex h-full flex-col justify-between">
          <div>
            <span className="flex size-12 items-center justify-center rounded-xl border border-magenta/20 bg-magenta/[0.07] text-magenta-soft">
              <CalendarClock className="size-6" />
            </span>
            <h3 className="mt-5 text-base font-semibold text-white">Prefer to talk live?</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-white/45">
              Skip the form and book time directly with our solutions team to walk through your use
              case and leave with a clear next step.
            </p>
          </div>
          <Button
            className="mt-7 w-fit gap-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 text-sm font-semibold text-white glow-magenta-sm transition-all duration-300 hover:from-fuchsia-500 hover:to-violet-500"
            asChild
          >
            <a
              href={`mailto:${siteConfig.contact.salesEmail}?subject=${encodeURIComponent("Book a call with Blugent")}`}
            >
              Book a Call
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </GlassCard>
      </Reveal>
    </div>
  );
}
