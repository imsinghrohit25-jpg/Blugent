"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

function buildConnections(points: THREE.Vector3[], maxDist: number, maxLinks: number) {
  const verts: number[] = [];
  let count = 0;
  for (let i = 0; i < points.length && count < maxLinks; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if (points[i].distanceTo(points[j]) < maxDist) {
        verts.push(points[i].x, points[i].y, points[i].z, points[j].x, points[j].y, points[j].z);
        count++;
        if (count >= maxLinks) break;
      }
    }
  }
  return new Float32Array(verts);
}

function NetworkMesh({
  nodeCount,
  radius,
  color,
  lineColor,
  pulse,
  rotationSpeed,
}: {
  nodeCount: number;
  radius: number;
  color: string;
  lineColor: string;
  pulse: boolean;
  rotationSpeed: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const { nodePositions, linePositions } = useMemo(() => {
    const pts = fibonacciSphere(nodeCount, radius);
    const nodePositions = new Float32Array(pts.length * 3);
    pts.forEach((p, i) => {
      nodePositions[i * 3] = p.x;
      nodePositions[i * 3 + 1] = p.y;
      nodePositions[i * 3 + 2] = p.z;
    });
    const linePositions = buildConnections(pts, radius * 0.62, Math.floor(nodeCount * 1.4));
    return { nodePositions, linePositions };
  }, [nodeCount, radius]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
    if (pulse && materialRef.current) {
      materialRef.current.opacity = 0.55 + Math.sin(state.clock.elapsedTime * 1.4) * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={materialRef}
          color={color}
          size={radius * 0.045}
          sizeAttenuation
          transparent
          opacity={0.85}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} transparent opacity={0.18} />
      </lineSegments>
      <mesh>
        <sphereGeometry args={[radius * 0.985, 32, 32]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

export function NetworkSphere({
  nodeCount = 180,
  radius = 2.4,
  color = "#3b82f6",
  lineColor = "#2563eb",
  pulse = false,
  rotationSpeed = 0.06,
  interactive = true,
  className,
}: {
  nodeCount?: number;
  radius?: number;
  color?: string;
  lineColor?: string;
  pulse?: boolean;
  rotationSpeed?: number;
  interactive?: boolean;
  className?: string;
}) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, radius * 2.7], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <NetworkMesh
        nodeCount={nodeCount}
        radius={radius}
        color={color}
        lineColor={lineColor}
        pulse={pulse}
        rotationSpeed={rotationSpeed}
      />
      {interactive ? (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
          rotateSpeed={0.4}
        />
      ) : null}
    </Canvas>
  );
}
