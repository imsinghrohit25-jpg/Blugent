"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Deterministic pseudo-random generator (pure function of `seed`) so point
// generation stays safe inside useMemo/render under React's purity rules.
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function Field({ count = 420 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const { positions, linePositions } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const v = new THREE.Vector3(
        (pseudoRandom(i * 3 + 1) - 0.5) * 22,
        (pseudoRandom(i * 3 + 2) - 0.5) * 13,
        (pseudoRandom(i * 3 + 3) - 0.5) * 8
      );
      pts.push(v);
      positions[i * 3] = v.x;
      positions[i * 3 + 1] = v.y;
      positions[i * 3 + 2] = v.z;
    }
    const verts: number[] = [];
    let links = 0;
    const maxLinks = 260;
    for (let i = 0; i < pts.length && links < maxLinks; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < 2.6) {
          verts.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
          links++;
          if (links >= maxLinks) break;
        }
      }
    }
    return { positions, linePositions: new Float32Array(verts) };
  }, [count]);

  useFrame((state) => {
    if (groupRef.current) {
      const targetX = (state.pointer.x * viewport.width) / 60;
      const targetY = (state.pointer.y * viewport.height) / 60;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.02;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.02;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#60a5fa" size={0.045} sizeAttenuation transparent opacity={0.8} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#2563eb" transparent opacity={0.14} />
      </lineSegments>
    </group>
  );
}

export function ParticleFieldScene({ density = 420 }: { density?: number }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ alpha: true, antialias: true }}
    >
      <Field count={density} />
    </Canvas>
  );
}
