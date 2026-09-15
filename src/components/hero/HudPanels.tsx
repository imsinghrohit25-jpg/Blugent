"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Radio } from "lucide-react";

// ─── Response Rate — radial progress gauge ─────────────────────────────────────
function ResponseRatePanel() {
  const value = 98.7;
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 0.5, y: 0 }}
      transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card animate-float-slow absolute flex items-center gap-3 rounded-xl px-4 py-3"
      style={{ left: "2%", top: "4%", width: 178 }}
    >
      <svg width="56" height="56" viewBox="0 0 60 60" className="shrink-0" aria-hidden="true">
        <circle cx="30" cy="30" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
        <motion.circle
          cx="30" cy="30" r={radius} fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          transform="rotate(-90 30 30)"
        />
      </svg>
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-widest text-white/35">Response Rate</p>
        <p className="mt-1 text-lg font-bold text-white">{value}%</p>
      </div>
    </motion.div>
  );
}

// ─── Message Queues — mini bar chart ───────────────────────────────────────────
const QUEUE_BARS = [0.4, 0.65, 0.5, 0.85, 0.6, 0.95, 0.7];

function MessageQueuesPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 0.5, y: 0 }}
      transition={{ duration: 1, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card animate-float-delayed absolute rounded-xl px-4 py-3"
      style={{ right: "0%", top: "2%", width: 168 }}
    >
      <p className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-widest text-white/35">
        <Radio className="size-2.5" />
        Message Queues
      </p>
      <div className="mt-2.5 flex h-11 items-end gap-1.5" aria-hidden="true">
        {QUEUE_BARS.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h * 100}%` }}
            transition={{ duration: 0.6, delay: 1.4 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-electric/70 to-electric-soft/50"
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── System Alert — warning rows ───────────────────────────────────────────────
function SystemAlertPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 0.45, y: 0 }}
      transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card animate-float absolute space-y-1.5 rounded-xl px-4 py-3"
      style={{ left: "0%", bottom: "6%", width: 190 }}
    >
      <p className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-widest text-amber-300/50">
        <AlertTriangle className="size-2.5" />
        Latency Spike — Node #3
      </p>
      <p className="text-[9px] font-semibold uppercase tracking-widest text-white/25">
        Queue Overflow Risk: 12%
      </p>
    </motion.div>
  );
}

/**
 * Small floating glass HUD widgets used as background depth behind the hero's
 * orbiting service cards. Purely HTML/CSS (no WebGL) — kept intentionally
 * low-opacity so they read as atmosphere, not competing content.
 */
export function HudPanels() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <ResponseRatePanel />
      <MessageQueuesPanel />
      <SystemAlertPanel />
    </div>
  );
}
