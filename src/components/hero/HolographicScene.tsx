"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

import { Globe } from "./Globe";
import { HolographicScreen, type ScreenContentType } from "./HolographicScreen";
import { DataStream, type StreamConfig } from "./DataStream";
import { FloorGrid } from "./FloorGrid";

// ─── Scene configuration ──────────────────────────────────────────────────────

const GLOBE_CENTER: [number, number, number] = [3.0, -0.4, 0];
const GLOBE_RADIUS = 1.55;

interface ScreenDef {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  contentType: ScreenContentType;
  glowColor: string;
  floatOffset: number;
  floatSpeed: number;
}

const SCREENS: ScreenDef[] = [
  {
    id: "seo-top-left",
    position: [-1.2, 2.1, -1.4],
    rotation: [0, Math.PI * 0.14, -0.04],
    contentType: "seo",
    glowColor: "#00d4ff",
    floatOffset: 0,
    floatSpeed: 0.85,
  },
  {
    id: "stats-top-right",
    position: [7.4, 2.1, -1.4],
    rotation: [0, -Math.PI * 0.14, 0.04],
    contentType: "stats",
    glowColor: "#b829dd",
    floatOffset: Math.PI / 3,
    floatSpeed: 0.72,
  },
  {
    id: "funnel-mid-left",
    position: [-3.2, -0.2, -0.4],
    rotation: [0, Math.PI * 0.22, 0],
    contentType: "funnel",
    glowColor: "#00d4ff",
    floatOffset: Math.PI / 6,
    floatSpeed: 0.95,
  },
  {
    id: "web-bot-left",
    position: [0.2, -2.9, 0.7],
    rotation: [0.08, Math.PI * 0.12, 0],
    contentType: "web",
    glowColor: "#b829dd",
    floatOffset: Math.PI / 2,
    floatSpeed: 0.78,
  },
  {
    id: "funnel-mid-right",
    position: [9.2, -0.2, -0.4],
    rotation: [0, -Math.PI * 0.22, 0],
    contentType: "funnel",
    glowColor: "#00d4ff",
    floatOffset: Math.PI * 0.8,
    floatSpeed: 0.88,
  },
  {
    id: "seo-bot-right",
    position: [5.8, -2.9, 0.7],
    rotation: [0.08, -Math.PI * 0.12, 0],
    contentType: "seo",
    glowColor: "#b829dd",
    floatOffset: Math.PI,
    floatSpeed: 0.68,
  },
];

// ─── Loading sequence ─────────────────────────────────────────────────────────

function useLoadSequence() {
  const [phases, setPhases] = useState({
    globe: false,
    floor: false,
    screens: [false, false, false, false, false, false] as boolean[],
    streams: false,
  });

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhases((p) => ({ ...p, globe: true })), 300),
      setTimeout(() => setPhases((p) => ({ ...p, floor: true })), 900),
      ...SCREENS.map((_, i) =>
        setTimeout(
          () =>
            setPhases((p) => {
              const screens = [...p.screens];
              screens[i] = true;
              return { ...p, screens };
            }),
          1200 + i * 200
        )
      ),
      setTimeout(() => setPhases((p) => ({ ...p, streams: true })), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return phases;
}

// ─── Deterministic seeded PRNG (avoids Math.random() in render / useMemo) ────

function seededRnd(seed: number): number {
  const s = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

// ─── Ambient particles (background depth) ────────────────────────────────────

function AmbientParticles({ count = 300 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(
    () =>
      new Float32Array(
        Array.from({ length: count * 3 }, (_, i) => {
          const r = seededRnd(i + 1);
          if (i % 3 === 0) return (r - 0.2) * 22;
          if (i % 3 === 1) return (seededRnd(i + 100) - 0.3) * 14;
          return (seededRnd(i + 200) - 0.5) * 10;
        })
      ),
    [count]
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#00d4ff"
        size={0.015}
        sizeAttenuation
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Camera rig (mouse parallax, fixed look-at) ───────────────────────────────

const BASE_CAMERA = new THREE.Vector3(3.2, 0.6, 10.5);
const LOOK_TARGET = new THREE.Vector3(3.0, -0.3, 0);

function CameraRig() {
  const { camera, pointer } = useThree();

  useEffect(() => {
    camera.position.copy(BASE_CAMERA);
    camera.lookAt(LOOK_TARGET);
  }, [camera]);

  useFrame((_, delta) => {
    const targetX = BASE_CAMERA.x + pointer.x * 0.9;
    const targetY = BASE_CAMERA.y + pointer.y * 0.5;
    /* eslint-disable react-hooks/immutability */
    camera.position.x += (targetX - camera.position.x) * delta * 1.8;
    camera.position.y += (targetY - camera.position.y) * delta * 1.8;
    /* eslint-enable react-hooks/immutability */
    camera.lookAt(LOOK_TARGET);
  });

  return null;
}

// ─── Inner 3D scene (inside Canvas) ──────────────────────────────────────────

// Pre-computed stream speeds (stable, no Math.random at render time)
const STREAM_SPEEDS = [0.19, 0.22, 0.18, 0.24, 0.21, 0.20];

const STREAM_CONFIGS: StreamConfig[] = SCREENS.map((s, i) => ({
  screenPosition: s.position,
  color: s.glowColor,
  speed: STREAM_SPEEDS[i],
}));

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  const phases = useLoadSequence();

  return (
    <>
      {/* Scene background — must set here when alpha=false on canvas */}
      <color attach="background" args={["#0a0e17"]} />

      {/* Lighting */}
      <ambientLight intensity={0.06} />
      <pointLight position={[3, 3, 5]}  color="#00d4ff" intensity={50} decay={2} />
      <pointLight position={[3, -2, 3]} color="#0066ff" intensity={30} decay={2} />
      <pointLight position={[3, 5, -2]} color="#b829dd" intensity={25} decay={2} />

      <Environment preset="night" />

      {/* Background ambient particles */}
      <AmbientParticles count={280} />

      {/* Globe */}
      <Globe position={GLOBE_CENTER} visible={phases.globe} />

      {/* Floor platform */}
      <FloorGrid
        position={[GLOBE_CENTER[0], GLOBE_CENTER[1] - 1.75, GLOBE_CENTER[2]]}
        visible={phases.floor}
      />

      {/* Holographic screens */}
      {SCREENS.map((screen, i) => (
        <HolographicScreen
          key={screen.id}
          position={screen.position}
          rotation={screen.rotation}
          contentType={screen.contentType}
          glowColor={screen.glowColor}
          floatOffset={screen.floatOffset}
          floatSpeed={screen.floatSpeed}
          visible={phases.screens[i]}
        />
      ))}

      {/* Data streams */}
      <DataStream
        globeCenter={GLOBE_CENTER}
        globeRadius={GLOBE_RADIUS}
        streams={STREAM_CONFIGS}
        visible={phases.streams}
      />

      {/* Camera */}
      {!reducedMotion && <CameraRig />}

      {/* Post-processing removed — using CSS bloom + vignette on the canvas
           container instead to avoid @react-three/postprocessing v3 / fiber v9
           render-target initialization bug (null.alpha on addPass). */}
    </>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

interface HolographicSceneProps {
  className?: string;
  reducedMotion?: boolean;
}

export function HolographicScene({
  className,
  reducedMotion = false,
}: HolographicSceneProps) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.5]}
      camera={{ position: [3.2, 0.6, 10.5], fov: 68 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
    >
      <Scene reducedMotion={reducedMotion} />
    </Canvas>
  );
}
