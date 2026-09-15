import { Marquee } from "@/components/ui/marquee";

const MARQUEE_TEXT = "BUILD • AUTOMATE • INTELLIGENTLY SCALE ✦ AI • RAG • AUTOMATION • CLOUD ✦ DIGITAL EXCELLENCE";

export function MarqueeStrip() {
  return (
    <div className="relative flex items-center overflow-hidden py-4">
      {/* Cinematic flowing glow — blends the Hero's blue/purple with the
          stats section's blue/cyan, drifting in the same direction and
          rhythm (32s, linear) as the marquee text above it. */}
      <div
        className="animate-glow-drift pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(59,130,246,0.16), rgba(139,92,246,0.15) 35%, rgba(96,165,250,0.16) 65%, rgba(59,130,246,0.16) 100%)",
          backgroundSize: "200% 100%",
          filter: "blur(30px)",
        }}
        aria-hidden="true"
      />

      <div className="divider-gradient absolute inset-x-0 top-0" />
      <div className="divider-gradient absolute inset-x-0 bottom-0" />

      <Marquee speed="32s" gap="2.5rem">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="shrink-0 text-xs font-bold uppercase tracking-[0.22em] text-white/40"
          >
            {MARQUEE_TEXT}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
