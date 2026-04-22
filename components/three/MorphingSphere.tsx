"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Created ONCE at module level — zero GC pressure, zero realloc
const OUTER_GEO = new THREE.TorusKnotGeometry(2, 0.6, 100, 20);
const INNER_GEO = new THREE.SphereGeometry(1.2, 24, 24);

const OUTER_MAT = new THREE.MeshStandardMaterial({
  color: new THREE.Color("#82b1ff"), // Modern Light Blue
  metalness: 0.9,
  roughness: 0.1,
  envMapIntensity: 2.0,
  transparent: true,
  opacity: 0.8,
  side: THREE.FrontSide,
});

const INNER_MAT = new THREE.MeshStandardMaterial({
  color: new THREE.Color("#2962ff"), // Deep Blue
  emissive: new THREE.Color("#00e5ff"), // Vibrant Cyan Glow
  emissiveIntensity: 2.5,
  wireframe: true,
  transparent: true,
  opacity: 0.5,
});

export default function MorphingSphere() {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05); // cap — prevents lurch after tab restore
    const t = state.clock.elapsedTime;

    outerRef.current.rotation.x += d * 0.1;
    outerRef.current.rotation.y += d * 0.15;

    innerRef.current.rotation.x -= d * 0.15;
    innerRef.current.rotation.z += d * 0.18;

    // Float inlined — no <Float> wrapper = one fewer useFrame overhead
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.28;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.08;
  });

  return (
    <group ref={groupRef} scale={1.15}>
      <mesh ref={outerRef} geometry={OUTER_GEO} material={OUTER_MAT} />
      <mesh ref={innerRef} geometry={INNER_GEO} material={INNER_MAT} />
    </group>
  );
}
