"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";

const states = [
  { icon: CheckCircle2, label: "Agent Status", value: "Active", tone: "text-emerald-400" },
  { icon: Loader2, label: "Workflow Queue", value: "Processing", tone: "text-electric-soft", spin: true },
  { icon: ShieldCheck, label: "System Health", value: "Nominal", tone: "text-emerald-400" },
];

const flowSteps = [
  "Request received and validated",
  "Routed to specialized agent",
  "Cross-checked against source data",
  "Awaiting human review checkpoint",
];

const waveform = [30, 55, 40, 70, 50, 80, 60, 90, 65, 85, 55, 75];

export function GlassDashboard({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="glass-strong overflow-hidden rounded-2xl shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-yellow-400/70" />
            <span className="size-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <span className="text-xs font-medium text-slate-400">Blugent Agent Console</span>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-400">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 p-5">
          {states.map((state) => (
            <div key={state.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
              <state.icon className={`size-4 ${state.tone} ${state.spin ? "animate-spin" : ""}`} />
              <p className="mt-2 text-sm font-semibold text-white">{state.value}</p>
              <p className="text-[11px] text-slate-400">{state.label}</p>
            </div>
          ))}
        </div>

        <div className="px-5 pb-2">
          <div className="flex h-20 items-end gap-1.5" aria-hidden="true">
            {waveform.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-electric/80 to-electric-soft/60"
              />
            ))}
          </div>
        </div>

        <div className="space-y-2.5 border-t border-white/10 p-5">
          {flowSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-3 text-xs">
              <span
                className={`size-1.5 shrink-0 rounded-full ${
                  i === flowSteps.length - 1 ? "bg-amber-400" : "bg-emerald-400"
                }`}
              />
              <span className="flex-1 truncate text-slate-300">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
