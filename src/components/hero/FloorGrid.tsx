"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Expanding pulse rings ────────────────────────────────────────────────────

function PulseRing({
  radius,
  delay,
  period = 5,
  color = "#00d4ff",
}: {
  radius: number;
  delay: number;
  period?: number;
  color?: string;
}) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!matRef.current || !meshRef.current) return;
    const t = ((clock.elapsedTime + delay) % period) / period; // 0..1
    const scale = 0.8 + t * 0.5; // expand from 0.8x to 1.3x
    const opacity = Math.sin(t * Math.PI) * 0.4; // fade in then out
    meshRef.current.scale.setScalar(scale);
    matRef.current.opacity = opacity;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius, radius + 0.025, 80]} />
      <meshBasicMaterial ref={matRef} color={color} transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

// ─── Static concentric rings ──────────────────────────────────────────────────

function StaticRings({ radii, color }: { radii: number[]; color: string }) {
  const positions = useMemo(() => {
    const pts: number[] = [];
    const SEGMENTS = 128;
    radii.forEach((r) => {
      for (let i = 0; i <= SEGMENTS; i++) {
        const angle = (i / SEGMENTS) * Math.PI * 2;
        pts.push(r * Math.cos(angle), 0, r * Math.sin(angle));
      }
    });
    return new Float32Array(pts);
  }, [radii]);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.08} />
    </lineSegments>
  );
}

// ─── Radial spokes ────────────────────────────────────────────────────────────

function RadialSpokes({ count = 12, outerRadius = 4.5, color = "#00d4ff" }: {
  count?: number;
  outerRadius?: number;
  color?: string;
}) {
  const positions = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      pts.push(0, 0, 0);
      pts.push(outerRadius * Math.cos(angle), 0, outerRadius * Math.sin(angle));
    }
    return new Float32Array(pts);
  }, [count, outerRadius]);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.05} />
    </lineSegments>
  );
}

// ─── Floor Grid ───────────────────────────────────────────────────────────────

interface FloorGridProps {
  position?: [number, number, number];
  visible?: boolean;
}

export function FloorGrid({ position = [0, 0, 0], visible = true }: FloorGridProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = visible ? 1 : 0;
    groupRef.current.scale.x += (target - groupRef.current.scale.x) * delta * 2;
    groupRef.current.scale.z += (target - groupRef.current.scale.z) * delta * 2;
    groupRef.current.scale.y = 1;
  });

  return (
    <group ref={groupRef} position={position} scale={0}>
      {/* Platform disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[4.5, 80]} />
        <meshStandardMaterial
          color="#0a0e17"
          metalness={0.95}
          roughness={0.1}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Static concentric rings */}
      <StaticRings radii={[1, 1.8, 2.6, 3.4, 4.2]} color="#00d4ff" />
      <RadialSpokes count={16} outerRadius={4.5} color="#00d4ff" />

      {/* Animated pulse rings */}
      <PulseRing radius={2.5} delay={0}   period={5} color="#00d4ff" />
      <PulseRing radius={2.5} delay={1.7} period={5} color="#00d4ff" />
      <PulseRing radius={2.5} delay={3.4} period={5} color="#b829dd" />

      {/* Outer boundary ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.45, 4.5, 120]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
