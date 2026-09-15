"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export type ScreenContentType = "seo" | "stats" | "funnel" | "web";

// ─── Canvas texture drawing ───────────────────────────────────────────────────

const W = 480;
const H = 320;

function drawBase(ctx: CanvasRenderingContext2D) {
  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "rgba(8, 18, 30, 0.97)");
  bg.addColorStop(1, "rgba(5, 12, 22, 0.99)");
  ctx.fillStyle = bg;
  ctx.roundRect(0, 0, W, H, 10);
  ctx.fill();

  // Subtle inner grid
  ctx.strokeStyle = "rgba(0, 212, 255, 0.04)";
  ctx.lineWidth = 0.5;
  for (let x = 0; x < W; x += 32) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 32) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
}

function drawHeader(ctx: CanvasRenderingContext2D, icon: string, title: string) {
  ctx.fillStyle = "#00d4ff";
  ctx.font = "bold 18px 'Courier New', monospace";
  ctx.fillText(`${icon}  ${title}`, 20, 38);

  ctx.strokeStyle = "rgba(0, 212, 255, 0.25)";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(20, 52); ctx.lineTo(W - 20, 52); ctx.stroke();
}

function drawMiniLineChart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  data: number[],
  color: string
) {
  if (data.length < 2) return;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = w / (data.length - 1);

  // Fill
  ctx.beginPath();
  data.forEach((v, i) => {
    const px = x + i * stepX;
    const py = y + h - ((v - min) / range) * h;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  });
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, y, 0, y + h);
  grad.addColorStop(0, color.replace(")", ", 0.3)").replace("rgb", "rgba"));
  grad.addColorStop(1, color.replace(")", ", 0)").replace("rgb", "rgba"));
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  data.forEach((v, i) => {
    const px = x + i * stepX;
    const py = y + h - ((v - min) / range) * h;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawBarChart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  data: number[],
  color1: string,
  color2: string
) {
  const max = Math.max(...data);
  const barW = (w / data.length) * 0.6;
  const gap = (w / data.length) * 0.4;

  data.forEach((v, i) => {
    const bh = (v / max) * h;
    const bx = x + i * (barW + gap);
    const by = y + h - bh;
    const grad = ctx.createLinearGradient(0, by, 0, by + bh);
    grad.addColorStop(0, i % 2 === 0 ? color1 : color2);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.roundRect(bx, by, barW, bh, 2);
    ctx.fill();
  });
}

function createSEOTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  drawBase(ctx);
  drawHeader(ctx, "⟳", "SEO MODULES");

  const rows = [
    { label: "KEYWORD RANKING", value: "#1", color: "#00d4ff" },
    { label: "ORGANIC TRAFFIC",  value: "+147%", color: "#00ff88" },
    { label: "DOMAIN AUTHORITY", value: "82/100", color: "#00d4ff" },
    { label: "BACKLINKS",        value: "12.4K",  color: "#b829dd" },
  ];

  rows.forEach((row, i) => {
    const y = 78 + i * 38;
    ctx.fillStyle = "#3a4a5a";
    ctx.font = "11px 'Courier New', monospace";
    ctx.fillText(row.label, 20, y);
    ctx.fillStyle = row.color;
    ctx.font = "bold 14px 'Courier New', monospace";
    ctx.fillText(row.value, W - 20 - ctx.measureText(row.value).width, y);
    ctx.strokeStyle = "rgba(0,212,255,0.08)";
    ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(20, y + 8); ctx.lineTo(W - 20, y + 8); ctx.stroke();
  });

  drawMiniLineChart(ctx, 20, 234, W - 40, 66, [40, 55, 48, 72, 65, 88, 75, 92, 85, 98], "rgb(0,212,255)");

  return new THREE.CanvasTexture(canvas);
}

function createStatsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  drawBase(ctx);
  drawHeader(ctx, "◈", "ADMIN STATISTICS");

  // 2x2 stat grid
  const stats = [
    { label: "IMPRESSIONS",  value: "2.4M",   color: "#00d4ff" },
    { label: "CONVERSIONS",  value: "3.1K",   color: "#00ff88" },
    { label: "UPTIME",       value: "99.7%",  color: "#b829dd" },
    { label: "RESPONSE TIME",value: "0.8ms",  color: "#00d4ff" },
  ];

  stats.forEach((s, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const bx = 20 + col * ((W - 40) / 2 + 5);
    const by = 66 + row * 80;
    const bw = (W - 50) / 2;

    ctx.fillStyle = "rgba(0,212,255,0.05)";
    ctx.roundRect(bx, by, bw, 66, 4);
    ctx.fill();
    ctx.strokeStyle = "rgba(0,212,255,0.15)";
    ctx.lineWidth = 0.5;
    ctx.roundRect(bx, by, bw, 66, 4);
    ctx.stroke();

    ctx.fillStyle = s.color;
    ctx.font = "bold 22px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.fillText(s.value, bx + bw / 2, by + 38);
    ctx.fillStyle = "#3a4a5a";
    ctx.font = "9px 'Courier New', monospace";
    ctx.fillText(s.label, bx + bw / 2, by + 56);
    ctx.textAlign = "left";
  });

  drawBarChart(ctx, 20, 236, W - 40, 64, [60, 80, 55, 90, 70, 85, 95, 75], "rgba(0,212,255,0.8)", "rgba(184,41,221,0.8)");

  return new THREE.CanvasTexture(canvas);
}

function createFunnelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  drawBase(ctx);
  drawHeader(ctx, "◎", "SALES FUNNELS");

  const levels = [
    { label: "AWARENESS",  pct: 100, color: "rgba(0,212,255,0.8)" },
    { label: "INTEREST",   pct: 68,  color: "rgba(0,170,220,0.8)" },
    { label: "DESIRE",     pct: 42,  color: "rgba(100,60,200,0.8)" },
    { label: "ACTION",     pct: 23,  color: "rgba(184,41,221,0.8)" },
  ];

  const maxW = W - 80;
  levels.forEach((lev, i) => {
    const y = 68 + i * 56;
    const bw = (lev.pct / 100) * maxW;
    const bx = 20 + (maxW - bw) / 2;

    const grad = ctx.createLinearGradient(bx, 0, bx + bw, 0);
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(0.3, lev.color);
    grad.addColorStop(0.7, lev.color);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.roundRect(bx, y, bw, 36, 3);
    ctx.fill();

    ctx.fillStyle = "#e0e6ed";
    ctx.font = "11px 'Courier New', monospace";
    ctx.fillText(lev.label, bx + 10, y + 22);
    ctx.fillStyle = "#00d4ff";
    ctx.font = "bold 13px 'Courier New', monospace";
    ctx.textAlign = "right";
    ctx.fillText(`${lev.pct}%`, bx + bw - 10, y + 22);
    ctx.textAlign = "left";
  });

  return new THREE.CanvasTexture(canvas);
}

function createWebTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  drawBase(ctx);
  drawHeader(ctx, "⬡", "WEB CARDS");

  const cards = [
    { label: "E-COMMERCE",  sub: "Shopify + Custom", color: "#00d4ff" },
    { label: "CORPORATE",   sub: "React + Next.js",  color: "#b829dd" },
    { label: "LANDING",     sub: "A/B Optimized",    color: "#00ff88" },
  ];

  cards.forEach((card, i) => {
    const bx = 24 + i * 8;
    const by = 64 + i * 16;
    const bw = W - 64 + i * 8;
    const bh = 68;

    ctx.fillStyle = `rgba(${i === 0 ? "0,212,255" : i === 1 ? "184,41,221" : "0,255,136"},0.06)`;
    ctx.roundRect(bx, by, bw - i * 8, bh, 6);
    ctx.fill();
    ctx.strokeStyle = card.color;
    ctx.lineWidth = 0.8;
    ctx.roundRect(bx, by, bw - i * 8, bh, 6);
    ctx.stroke();

    ctx.fillStyle = "#e0e6ed";
    ctx.font = `bold ${14 - i}px 'Courier New', monospace`;
    ctx.fillText(card.label, bx + 14, by + 28);
    ctx.fillStyle = "#3a4a5a";
    ctx.font = `10px 'Courier New', monospace`;
    ctx.fillText(card.sub, bx + 14, by + 48);
  });

  // Bottom metrics
  const metrics = [
    { label: "AVG LOAD TIME", value: "0.9s" },
    { label: "LIGHTHOUSE",    value: "97+" },
    { label: "CORE WEB V.",   value: "PASS" },
  ];
  metrics.forEach((m, i) => {
    const y = 252 + i * 22;
    ctx.fillStyle = "#3a4a5a";
    ctx.font = "10px 'Courier New', monospace";
    ctx.fillText(m.label, 20, y);
    ctx.fillStyle = "#00d4ff";
    ctx.font = "bold 12px 'Courier New', monospace";
    ctx.textAlign = "right";
    ctx.fillText(m.value, W - 20, y);
    ctx.textAlign = "left";
  });

  return new THREE.CanvasTexture(canvas);
}

const textureFactories: Record<ScreenContentType, () => THREE.CanvasTexture> = {
  seo:    createSEOTexture,
  stats:  createStatsTexture,
  funnel: createFunnelTexture,
  web:    createWebTexture,
};

// ─── Screen border (line loop) ────────────────────────────────────────────────

function ScreenBorder({
  width,
  height,
  color,
  visible,
}: {
  width: number;
  height: number;
  color: string;
  visible: boolean;
}) {
  const matRef = useRef<THREE.LineBasicMaterial>(null);
  const hw = width / 2;
  const hh = height / 2;

  const positions = useMemo(
    () => new Float32Array([-hw, -hh, 0, hw, -hh, 0, hw, hh, 0, -hw, hh, 0]),
    [hw, hh]
  );

  useFrame((_, delta) => {
    if (!matRef.current) return;
    const target = visible ? 0.75 : 0;
    matRef.current.opacity += (target - matRef.current.opacity) * delta * 3;
  });

  return (
    <lineLoop>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial ref={matRef} color={color} transparent opacity={0} />
    </lineLoop>
  );
}

// ─── Holographic Screen ───────────────────────────────────────────────────────

interface HolographicScreenProps {
  position: [number, number, number];
  rotation: [number, number, number];
  contentType: ScreenContentType;
  glowColor?: string;
  floatOffset?: number;
  floatSpeed?: number;
  visible?: boolean;
}

export function HolographicScreen({
  position,
  rotation,
  contentType,
  glowColor = "#00d4ff",
  floatOffset = 0,
  floatSpeed = 1,
  visible = true,
}: HolographicScreenProps) {
  const groupRef = useRef<THREE.Group>(null);
  const screenMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const glowMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    return textureFactories[contentType]();
  }, [contentType]);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;

    // Entrance animation
    const targetScale = visible ? 1 : 0;
    const cs = groupRef.current.scale.x;
    groupRef.current.scale.setScalar(cs + (targetScale - cs) * delta * 4);

    // Opacity fade
    const targetOp = visible ? 0.92 : 0;
    if (screenMatRef.current) {
      screenMatRef.current.opacity += (targetOp - screenMatRef.current.opacity) * delta * 3;
    }
    if (glowMatRef.current) {
      const gTarget = visible ? 0.35 : 0;
      glowMatRef.current.opacity += (gTarget - glowMatRef.current.opacity) * delta * 3;
      glowMatRef.current.emissiveIntensity = 0.5 + Math.sin(clock.elapsedTime * 1.5 + floatOffset) * 0.3;
    }
  });

  return (
    <Float
      speed={floatSpeed}
      floatIntensity={0.25}
      rotationIntensity={0.04}
    >
      <group ref={groupRef} position={position} rotation={rotation} scale={0}>
        {/* Glow halo behind screen */}
        <mesh position={[0, 0, -0.08]}>
          <planeGeometry args={[2.65, 1.82]} />
          <meshStandardMaterial
            ref={glowMatRef}
            color={glowColor}
            emissive={glowColor}
            emissiveIntensity={0.6}
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>

        {/* Screen surface with canvas texture */}
        <mesh>
          <planeGeometry args={[2.4, 1.6]} />
          <meshBasicMaterial
            ref={screenMatRef}
            map={texture ?? undefined}
            transparent
            opacity={0}
          />
        </mesh>

        {/* Neon border */}
        <ScreenBorder
          width={2.4}
          height={1.6}
          color={glowColor}
          visible={visible}
        />

        {/* Corner accent dots */}
        {(
          [
            [-1.2, -0.8] as [number, number],
            [1.2, -0.8] as [number, number],
            [1.2, 0.8] as [number, number],
            [-1.2, 0.8] as [number, number],
          ]
        ).map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.01]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshBasicMaterial color={glowColor} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}
