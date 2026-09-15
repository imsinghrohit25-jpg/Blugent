import { cn } from "@/lib/utils";

export function VisualFallback({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div className="size-2/3 animate-pulse rounded-full bg-gradient-to-br from-electric/30 via-electric/10 to-transparent blur-2xl" />
    </div>
  );
}
