"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface GlobeProps {
  position?: [number, number, number];
  visible?: boolean;
}

// ─── Inner pulsing core ───────────────────────────────────────────────────────

function GlobeCore() {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const t = clock.elapsedTime;
    // Pulse emissive intensity
    matRef.current.emissiveIntensity = 1.8 + Math.sin(t * 2.1) * 0.8;
    // Scale pulse
    if (ref.current) {
      const s = 0.92 + Math.sin(t * 2.1) * 0.1;
      ref.current.scale.setScalar(s);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.55, 24, 24]} />
      <meshStandardMaterial
        ref={matRef}
        color="#b829dd"
        emissive="#ff00ff"
        emissiveIntensity={2}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// ─── Counter-rotating wireframe overlay ───────────────────────────────────────

function GlobeWireframe({ visible }: { visible: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }, delta) => {
    if (!ref.current || !matRef.current) return;
    ref.current.rotation.y -= delta * 0.4;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.1;
    // Fade in
    const target = visible ? 0.18 : 0;
    matRef.current.opacity += (target - matRef.current.opacity) * delta * 2;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.64, 2]} />
      <meshBasicMaterial
        ref={matRef}
        color="#00d4ff"
        wireframe
        transparent
        opacity={0}
      />
    </mesh>
  );
}

// ─── Main globe shell ─────────────────────────────────────────────────────────

function GlobeShell({ visible }: { visible: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame((_, delta) => {
    if (!ref.current || !matRef.current) return;
    ref.current.rotation.y += delta * 0.28;
    // Fade in
    const target = visible ? 0.28 : 0;
    matRef.current.opacity += (target - matRef.current.opacity) * delta * 2;
    const sTarget = visible ? 1 : 0.05;
    ref.current.scale.x += (sTarget - ref.current.scale.x) * delta * 3;
    ref.current.scale.y += (sTarget - ref.current.scale.y) * delta * 3;
    ref.current.scale.z += (sTarget - ref.current.scale.z) * delta * 3;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.55, 4]} />
      <meshPhysicalMaterial
        ref={matRef}
        color="#0066ff"
        emissive="#00d4ff"
        emissiveIntensity={0.25}
        roughness={0.1}
        metalness={0.6}
        transmission={0.55}
        thickness={1.8}
        ior={1.5}
        transparent
        opacity={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ─── Neon ring beneath globe ──────────────────────────────────────────────────

function GlobeRing({ visible }: { visible: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }, delta) => {
    if (!ref.current || !matRef.current) return;
    ref.current.rotation.z += delta * 0.2;
    const t = clock.elapsedTime;
    matRef.current.emissiveIntensity = 0.8 + Math.sin(t * 1.5) * 0.4;
    const target = visible ? 0.7 : 0;
    matRef.current.opacity += (target - matRef.current.opacity) * delta * 2;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
      <torusGeometry args={[1.8, 0.04, 8, 80]} />
      <meshStandardMaterial
        ref={matRef}
        color="#00d4ff"
        emissive="#00d4ff"
        emissiveIntensity={1}
        transparent
        opacity={0}
      />
    </mesh>
  );
}

// ─── Globe ───────────────────────────────────────────────────────────────────

export function Globe({ position = [0, 0, 0], visible = true }: GlobeProps) {
  const coreVisible = visible;
  const shellVisible = visible;

  return (
    <Float
      speed={0.8}
      rotationIntensity={0.05}
      floatIntensity={0.3}
      position={position}
    >
      <group>
        {coreVisible && <GlobeCore />}
        <GlobeShell visible={shellVisible} />
        <GlobeWireframe visible={shellVisible} />
        <GlobeRing visible={shellVisible} />
      </group>
    </Float>
  );
}
