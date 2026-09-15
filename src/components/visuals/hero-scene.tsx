"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

// ─── Deterministic seeded PRNG ────────────────────────────────────────────────
function seededRnd(seed: number): number {
  const s = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

// ─── Neural Particle Field ────────────────────────────────────────────────────

function NeuralParticles({ count = 700 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const magenta = new THREE.Color("#d946ef");
    const indigo = new THREE.Color("#818cf8");
    const blue = new THREE.Color("#3b82f6");
    const white = new THREE.Color(1, 1, 1);

    for (let i = 0; i < count; i++) {
      // Place in an ellipsoid volume (seeded PRNG — pure, no Math.random)
      const s = i * 4;
      const theta = seededRnd(s + 1) * Math.PI * 2;
      const phi = Math.acos(2 * seededRnd(s + 2) - 1);
      const r = 2 + seededRnd(s + 3) * 3.5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.5;

      // Mix: 30% magenta, 25% indigo, 20% blue, 25% white
      const t = seededRnd(s + 4);
      const c = t < 0.3 ? magenta : t < 0.55 ? indigo : t < 0.75 ? blue : white;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y = t * 0.025;
    ref.current.rotation.x = Math.sin(t * 0.015) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Connection Lines ─────────────────────────────────────────────────────────

function NeuralLines({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.LineSegments>(null);

  const positions = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < count; i++) {
      const s = i * 6;
      const ax = (seededRnd(s + 1) - 0.5) * 7;
      const ay = (seededRnd(s + 2) - 0.5) * 4;
      const az = (seededRnd(s + 3) - 0.5) * 3;
      const bx = ax + (seededRnd(s + 4) - 0.5) * 2.5;
      const by = ay + (seededRnd(s + 5) - 0.5) * 2;
      const bz = az + (seededRnd(s + 6) - 0.5) * 1.5;
      pts.push(ax, ay, az, bx, by, bz);
    }
    return new Float32Array(pts);
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.025;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.015) * 0.08;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#d946ef" transparent opacity={0.12} depthWrite={false} />
    </lineSegments>
  );
}

// ─── Floating Glass Panel ─────────────────────────────────────────────────────

function GlassPanel({
  position,
  rotation,
  width = 2.4,
  height = 1.4,
  speed = 1.2,
  emissive = "#d946ef",
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  width?: number;
  height?: number;
  speed?: number;
  emissive?: string;
}) {
  const hw = width / 2;
  const hh = height / 2;

  // Border geometry (line loop)
  const borderPositions = useMemo(
    () =>
      new Float32Array([
        -hw, -hh, 0, hw, -hh, 0,
         hw,  hh, 0, -hw,  hh, 0,
      ]),
    [hw, hh]
  );

  return (
    <Float speed={speed} rotationIntensity={0.15} floatIntensity={0.4}>
      <group position={position} rotation={rotation}>
        {/* Glass surface */}
        <mesh>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial
            transparent
            opacity={0.045}
            roughness={0.1}
            metalness={0.2}
            color="#ffffff"
            emissive={emissive}
            emissiveIntensity={0.18}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        {/* Border glow */}
        <lineLoop>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[borderPositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={emissive} transparent opacity={0.55} />
        </lineLoop>

        {/* Corner accent dots */}
        {([[-hw, -hh], [hw, -hh], [hw, hh], [-hw, hh]] as [number, number][]).map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0]}>
            <sphereGeometry args={[0.018, 6, 6]} />
            <meshBasicMaterial color={emissive} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// ─── Orbital Torus Rings ──────────────────────────────────────────────────────

function OrbitalRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.04;
    groupRef.current.rotation.x = clock.elapsedTime * 0.025;
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2.2, 0, 0.3]}>
        <torusGeometry args={[2.8, 0.007, 6, 80]} />
        <meshBasicMaterial color="#d946ef" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.5, 0.005, 6, 100]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[0.8, Math.PI / 5, Math.PI / 6]}>
        <torusGeometry args={[4.2, 0.004, 6, 120]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

// ─── Central Glow Sphere ──────────────────────────────────────────────────────

function CoreSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.3 + Math.sin(clock.elapsedTime * 1.2) * 0.15;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.28, 32, 32]} />
      <meshStandardMaterial
        color="#d946ef"
        emissive="#d946ef"
        emissiveIntensity={0.4}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

// ─── Camera Mouse Parallax ────────────────────────────────────────────────────

function CameraRig() {
  const { camera, pointer } = useThree();
  useFrame((_, delta) => {
    /* eslint-disable react-hooks/immutability */
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * delta * 1.5;
    camera.position.y += (pointer.y * 0.7 - camera.position.y) * delta * 1.5;
    /* eslint-enable react-hooks/immutability */
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─── Full Scene ───────────────────────────────────────────────────────────────

function Scene() {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <ambientLight intensity={0.04} />
      <pointLight position={[3, 4, 4]} color="#d946ef" intensity={60} decay={2} />
      <pointLight position={[-4, -2, 3]} color="#3b82f6" intensity={35} decay={2} />
      <pointLight position={[0, 0, 6]} color="#818cf8" intensity={15} decay={2} />

      <Environment preset="night" />

      <NeuralParticles count={650} />
      <NeuralLines count={55} />
      <OrbitalRings />
      <CoreSphere />

      {/* Floating glass panels at different depths */}
      <GlassPanel
        position={[0.6, 0.4, 0.2]}
        rotation={[0.05, -0.15, 0.03]}
        width={3.0}
        height={1.7}
        speed={1.0}
        emissive="#d946ef"
      />
      <GlassPanel
        position={[-1.4, -0.6, -1.8]}
        rotation={[0.08, 0.25, -0.04]}
        width={2.0}
        height={1.1}
        speed={0.8}
        emissive="#818cf8"
      />
      <GlassPanel
        position={[1.8, -1.1, -1.2]}
        rotation={[-0.06, -0.2, 0.02]}
        width={1.5}
        height={0.85}
        speed={1.3}
        emissive="#3b82f6"
      />

      <CameraRig />
    </>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function HeroScene({ className }: { className?: string }) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 48 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
    >
      <Scene />
    </Canvas>
  );
}
