import { cn } from "@/lib/utils";

interface GlassCardProps {
  className?: string;
  children: React.ReactNode;
  strong?: boolean;
  hover?: boolean;
  id?: string;
  glow?: "magenta" | "electric" | "gold" | "none";
}

const glowMap = {
  magenta: "hover:border-magenta/20 hover:shadow-[0_0_0_1px_rgba(217,70,239,0.08),0_20px_60px_-20px_rgba(217,70,239,0.18)]",
  electric: "hover:border-electric/20 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.08),0_20px_60px_-20px_rgba(59,130,246,0.15)]",
  gold: "hover:border-gold/20 hover:shadow-[0_0_0_1px_rgba(212,175,55,0.08),0_20px_60px_-20px_rgba(212,175,55,0.12)]",
  none: "",
};

export function GlassCard({
  className,
  children,
  strong = false,
  hover = true,
  id,
  glow = "magenta",
}: GlassCardProps) {
  return (
    <div
      id={id}
      className={cn(
        "relative rounded-2xl p-6 transition-all duration-500",
        strong ? "glass-strong" : "glass-card",
        hover && [
          "-translate-y-0 hover:-translate-y-1",
          glow !== "none" ? glowMap[glow] : "",
        ],
        className
      )}
    >
      {children}
    </div>
  );
}
