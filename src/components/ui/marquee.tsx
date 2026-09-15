import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  gap = "2rem",
  speed = "40s",
}: {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  gap?: string;
  speed?: string;
}) {
  return (
    <div
      className={cn("group flex w-full overflow-hidden [--gap:2rem]", className)}
      style={{ "--gap": gap } as React.CSSProperties}
    >
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "flex shrink-0 items-center justify-around gap-[var(--gap)] pr-[var(--gap)] animate-marquee",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "marquee-pause-on-hover"
          )}
          style={{
            animationDuration: speed,
            WebkitAnimationDuration: speed,
          } as React.CSSProperties}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
