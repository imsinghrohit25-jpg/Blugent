import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  accent?: "magenta" | "electric" | "gold";
}

const accentConfig = {
  magenta: { dot: "bg-magenta", text: "text-magenta-soft", border: "border-magenta/18", bg: "bg-magenta/[0.06]" },
  electric: { dot: "bg-electric", text: "text-electric-soft", border: "border-electric/18", bg: "bg-electric/[0.06]" },
  gold:    { dot: "bg-gold",    text: "text-gold-soft",    border: "border-gold/18",    bg: "bg-gold/[0.06]" },
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  accent = "magenta",
}: SectionHeadingProps) {
  const a = accentConfig[accent];

  return (
    <div
      className={cn(
        "mx-auto flex max-w-3xl flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <Reveal>
          <span
            className={`inline-flex items-center gap-2.5 rounded-full border ${a.border} ${a.bg} px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${a.text}`}
          >
            <span className={`size-1.5 rounded-full ${a.dot} animate-glow-pulse`} />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}

      <Reveal delay={0.05}>
        <h2 className="text-balance text-[clamp(1.85rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.025em] text-white">
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.1}>
          <p className="text-balance text-base leading-relaxed text-white/45 sm:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
