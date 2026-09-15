"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas } from "@/components/visuals/scene-canvas";

// ─── Deterministic seeded PRNG (no Math.random in render) ────────────────────
function seededRnd(seed: number): number {
  const s = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

type Vec3 = [number, number, number];

function sampleSphereSurface(seedBase: number, center: Vec3, radius: number): Vec3 {
  const theta = seededRnd(seedBase + 1) * Math.PI * 2;
  const phi = Math.acos(2 * seededRnd(seedBase + 2) - 1);
  const r = radius * (0.85 + seededRnd(seedBase + 3) * 0.15);
  return [
    center[0] + r * Math.sin(phi) * Math.cos(theta),
    center[1] + r * Math.sin(phi) * Math.sin(theta) * 1.05,
    center[2] + r * Math.cos(phi),
  ];
}

function sampleCapsule(seedBase: number, a: Vec3, b: Vec3, radius: number): Vec3 {
  const t = seededRnd(seedBase + 1);
  const theta = seededRnd(seedBase + 2) * Math.PI * 2;
  const rr = radius * Math.sqrt(seededRnd(seedBase + 3));
  return [
    a[0] + (b[0] - a[0]) * t + rr * Math.cos(theta),
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t + rr * Math.sin(theta),
  ];
}

// ─── Stylized humanoid skeleton (deterministic, procedural — no external asset) ─
const HEAD_CENTER: Vec3 = [0, 1.62, 0];
const HEAD_RADIUS = 0.22;

const LIMBS: { a: Vec3; b: Vec3; radius: number }[] = [
  { a: [0, 1.38, 0], b: [0, 0.45, 0], radius: 0.27 }, // torso
  { a: [-0.34, 1.28, 0], b: [-0.5, 0.55, 0.05], radius: 0.1 }, // left upper arm
  { a: [-0.5, 0.55, 0.05], b: [-0.42, 0.02, 0.08], radius: 0.075 }, // left forearm
  { a: [0.34, 1.28, 0], b: [0.5, 0.55, 0.05], radius: 0.1 }, // right upper arm
  { a: [0.5, 0.55, 0.05], b: [0.42, 0.02, 0.08], radius: 0.075 }, // right forearm
  { a: [-0.15, 0.45, 0], b: [-0.19, -0.75, 0.05], radius: 0.13 }, // left thigh
  { a: [-0.19, -0.75, 0.05], b: [-0.16, -1.55, 0.1], radius: 0.1 }, // left shin
  { a: [0.15, 0.45, 0], b: [0.19, -0.75, 0.05], radius: 0.13 }, // right thigh
  { a: [0.19, -0.75, 0.05], b: [0.16, -1.55, 0.1], radius: 0.1 }, // right shin
];

function HumanoidParticles({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const headCount = Math.round(count * 0.14);
    for (let i = 0; i < count; i++) {
      let p: Vec3;
      if (i < headCount) {
        p = sampleSphereSurface(i * 7 + 1, HEAD_CENTER, HEAD_RADIUS);
      } else {
        const limbIndex = Math.floor(seededRnd((i - headCount) * 3 + 900) * LIMBS.length);
        const limb = LIMBS[limbIndex];
        p = sampleCapsule(i * 11 + 5, limb.a, limb.b, limb.radius);
      }
      arr[i * 3] = p[0];
      arr[i * 3 + 1] = p[1];
      arr[i * 3 + 2] = p[2];
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.08) * 0.15 + t * 0.015;
    ref.current.position.y = Math.sin(t * 0.4) * 0.04;
  });

  return (
    <points ref={ref} position={[0, -0.15, -0.6]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#5fd4ff"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.38}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Chest energy core — subtle pulsing focal point ────────────────────────────
// Mirrors HumanoidParticles' own float/rotation so it stays locked to the torso
// without coupling the two components together.
function EnergyCore() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.08) * 0.15 + t * 0.015;
    ref.current.position.y = -0.15 + Math.sin(t * 0.4) * 0.04;
    const pulse = 1 + Math.sin(t * 1.6) * 0.14;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <group ref={ref} position={[0, -0.15, -0.6]}>
      <mesh position={[0, 0.92, 0.12]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#5fd4ff" transparent opacity={0.65} toneMapped={false} />
      </mesh>
    </group>
  );
}

// ─── Ambient depth particles ───────────────────────────────────────────────────
function AmbientDepthParticles({ count = 220 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (seededRnd(i * 5 + 2001) - 0.5) * 7;
      arr[i * 3 + 1] = (seededRnd(i * 5 + 2002) - 0.4) * 5;
      arr[i * 3 + 2] = (seededRnd(i * 5 + 2003) - 0.5) * 3 - 1.4;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#8B5CF6"
        size={0.014}
        sizeAttenuation
        transparent
        opacity={0.22}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Subtle camera parallax (kept smaller than the foreground card layer) ─────
function FigureCameraRig() {
  const { camera, pointer } = useThree();
  useFrame((_, delta) => {
    const targetX = pointer.x * 0.25;
    const targetY = 0.1 + pointer.y * 0.15;
    /* eslint-disable react-hooks/immutability */
    camera.position.x += (targetX - camera.position.x) * delta * 1.2;
    camera.position.y += (targetY - camera.position.y) * delta * 1.2;
    /* eslint-enable react-hooks/immutability */
    camera.lookAt(0, 0.2, 0);
  });
  return null;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.04} />
      <pointLight position={[2, 2, 3]} color="#3B82F6" intensity={14} decay={2} />
      <pointLight position={[-2, 0, 2]} color="#8B5CF6" intensity={10} decay={2} />
      <pointLight position={[0, -1.5, 2]} color="#EC4899" intensity={6} decay={2} />
      {/* Cyan rim light — traces the figure's edge for a crisper holographic silhouette */}
      <pointLight position={[0.4, 1.2, -2]} color="#60A5FA" intensity={8} decay={2} />

      <HumanoidParticles count={1300} />
      <AmbientDepthParticles count={220} />
      <EnergyCore />
      <FigureCameraRig />
    </>
  );
}

interface HolographicFigureProps {
  className?: string;
}

/**
 * Faint, procedural particle-cloud humanoid used as background atmosphere
 * behind the hero's orbiting service cards. Desktop-only and reduced-motion
 * gating is handled by the caller (matches NexoraInfographic's own gating).
 */
export function HolographicFigure({ className }: HolographicFigureProps) {
  return (
    <SceneCanvas
      className={className}
      camera={{ position: [0, 0.1, 4.4], fov: 42 }}
      gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
    >
      <Scene />
    </SceneCanvas>
  );
}
