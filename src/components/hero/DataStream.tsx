"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLES_PER_STREAM = 28;
const STREAM_SPEED = 0.22;

// ─── Build CatmullRom arc curve between globe and screen ──────────────────────

function buildStreamCurve(
  globeCenter: THREE.Vector3,
  globeRadius: number,
  screenCenter: THREE.Vector3
): THREE.CatmullRomCurve3 {
  const dir = screenCenter.clone().sub(globeCenter).normalize();
  const start = globeCenter.clone().add(dir.clone().multiplyScalar(globeRadius));
  const dist = start.distanceTo(screenCenter);
  const archH = dist * 0.38;

  const mid1 = start.clone().lerp(screenCenter, 0.32).add(new THREE.Vector3(0, archH, 0));
  const mid2 = start.clone().lerp(screenCenter, 0.68).add(new THREE.Vector3(0, archH * 0.5, 0));

  return new THREE.CatmullRomCurve3([start, mid1, mid2, screenCenter], false, "catmullrom", 0.5);
}

// ─── Tube geometry for each stream ───────────────────────────────────────────

function StreamTube({ curve, color, visible }: {
  curve: THREE.CatmullRomCurve3;
  color: string;
  visible: boolean;
}) {
  const coreMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const glowMatRef = useRef<THREE.MeshBasicMaterial>(null);

  const { coreGeo, glowGeo } = useMemo(() => {
    const coreGeo = new THREE.TubeGeometry(curve, 60, 0.012, 5, false);
    const glowGeo = new THREE.TubeGeometry(curve, 40, 0.04, 5, false);
    return { coreGeo, glowGeo };
  }, [curve]);

  useFrame((_, delta) => {
    if (coreMatRef.current) {
      const t = visible ? 0.7 : 0;
      coreMatRef.current.opacity += (t - coreMatRef.current.opacity) * delta * 2;
    }
    if (glowMatRef.current) {
      const t = visible ? 0.15 : 0;
      glowMatRef.current.opacity += (t - glowMatRef.current.opacity) * delta * 2;
    }
  });

  return (
    <group>
      <mesh geometry={glowGeo}>
        <meshBasicMaterial ref={glowMatRef} color={color} transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh geometry={coreGeo}>
        <meshBasicMaterial ref={coreMatRef} color={color} transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

// ─── Flowing particles (InstancedMesh for all streams) ────────────────────────

interface StreamDef {
  curve: THREE.CatmullRomCurve3;
  color: THREE.Color;
  speed: number;
}

function StreamParticles({ streams, visible }: { streams: StreamDef[]; visible: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const totalCount = streams.length * PARTICLES_PER_STREAM;

  useFrame(({ clock }, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.elapsedTime;

    streams.forEach((stream, si) => {
      for (let i = 0; i < PARTICLES_PER_STREAM; i++) {
        const idx = si * PARTICLES_PER_STREAM + i;
        const progress = (t * stream.speed + i / PARTICLES_PER_STREAM) % 1;
        const point = stream.curve.getPointAt(progress);
        dummy.position.copy(point);
        const lifeFactor = Math.sin(progress * Math.PI);
        dummy.scale.setScalar(lifeFactor * 0.055);
        dummy.updateMatrix();
        mesh.setMatrixAt(idx, dummy.matrix);
      }
    });

    mesh.instanceMatrix.needsUpdate = true;

    // Fade opacity
    const mat = mesh.material as THREE.MeshBasicMaterial;
    const target = visible ? 1 : 0;
    mat.opacity += (target - mat.opacity) * delta * 2;
  });

  if (totalCount === 0) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, totalCount]}>
      <sphereGeometry args={[1, 5, 5]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0} depthWrite={false} />
    </instancedMesh>
  );
}

// ─── Connection pulse at screen end ──────────────────────────────────────────

function ConnectionPulse({ position, color, visible }: {
  position: THREE.Vector3;
  color: string;
  visible: boolean;
}) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!matRef.current || !meshRef.current) return;
    const t = clock.elapsedTime;
    const pulse = 0.6 + Math.sin(t * 3.0) * 0.4;
    matRef.current.emissiveIntensity = pulse * (visible ? 1 : 0);
    if (meshRef.current) {
      const s = 0.5 + pulse * 0.5;
      meshRef.current.scale.setScalar(s * (visible ? 1 : 0));
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.065, 10, 10]} />
      <meshStandardMaterial
        ref={matRef}
        color={color}
        emissive={color}
        emissiveIntensity={1}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// ─── DataStream component ─────────────────────────────────────────────────────

export interface StreamConfig {
  screenPosition: [number, number, number];
  color: string;
  speed?: number;
}

interface DataStreamProps {
  globeCenter?: [number, number, number];
  globeRadius?: number;
  streams: StreamConfig[];
  visible?: boolean;
}

export function DataStream({
  globeCenter = [0, 0, 0],
  globeRadius = 1.55,
  streams,
  visible = true,
}: DataStreamProps) {
  const gc = useMemo(() => new THREE.Vector3(...globeCenter), [globeCenter]);

  const streamDefs = useMemo<StreamDef[]>(() =>
    streams.map((s) => ({
      curve: buildStreamCurve(gc, globeRadius, new THREE.Vector3(...s.screenPosition)),
      color: new THREE.Color(s.color),
      speed: s.speed ?? STREAM_SPEED,
    })),
    [gc, globeRadius, streams]
  );

  return (
    <group>
      {streamDefs.map((def, i) => (
        <group key={i}>
          <StreamTube curve={def.curve} color={streams[i].color} visible={visible} />
          <ConnectionPulse
            position={new THREE.Vector3(...streams[i].screenPosition)}
            color={streams[i].color}
            visible={visible}
          />
        </group>
      ))}
      <StreamParticles streams={streamDefs} visible={visible} />
    </group>
  );
}
