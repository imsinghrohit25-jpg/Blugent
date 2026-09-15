"use client";

import { motion } from "framer-motion";
import { Bot, Database, Workflow, Sparkles, Network, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

const nodes = [
  { icon: Bot, top: "12%", left: "8%", delay: 0, size: "size-12" },
  { icon: Database, top: "68%", left: "4%", delay: 0.6, size: "size-10" },
  { icon: Workflow, top: "20%", left: "88%", delay: 1.1, size: "size-11" },
  { icon: Sparkles, top: "78%", left: "85%", delay: 0.3, size: "size-9" },
  { icon: Network, top: "45%", left: "92%", delay: 1.6, size: "size-10" },
  { icon: BrainCircuit, top: "85%", left: "30%", delay: 0.9, size: "size-9" },
];

export function FloatingNodes({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: node.top, left: node.left }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: node.delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
            className={cn(
              "glass flex items-center justify-center rounded-2xl text-electric-soft shadow-[0_8px_32px_-12px_rgba(37,99,235,0.5)]",
              node.size
            )}
          >
            <node.icon className="size-1/2" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
