"use client";

import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

interface GLTFModelProps {
  /** Path to the .glb / .gltf file relative to /public */
  src: string;
  /** Auto-rotation speed on Y axis (radians/sec). 0 = no rotation. */
  rotationSpeed?: number;
  scale?: number | [number, number, number];
  position?: [number, number, number];
}

/**
 * Loads and renders a GLTF/GLB model.
 * Place your .glb files in the /public folder and pass the path as `src`.
 *
 * Wrap this in <SceneCanvas> + dynamic import (ssr: false) at the call site.
 *
 * @example
 * // public/models/robot.glb
 * <GLTFModel src="/models/robot.glb" rotationSpeed={0.3} scale={1.5} />
 */
export function GLTFModel({ src, rotationSpeed = 0, scale = 1, position = [0, 0, 0] }: GLTFModelProps) {
  const { scene } = useGLTF(src);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (rotationSpeed && groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  const scaleArray: [number, number, number] = Array.isArray(scale)
    ? (scale as [number, number, number])
    : [scale, scale, scale];

  return (
    <group ref={groupRef} position={position} scale={scaleArray}>
      <primitive object={scene} />
    </group>
  );
}

/**
 * Call at module level (or in a useEffect) to eagerly warm the GLTF loader
 * cache so the model is ready before the Canvas mounts.
 */
GLTFModel.preload = (src: string) => useGLTF.preload(src);
