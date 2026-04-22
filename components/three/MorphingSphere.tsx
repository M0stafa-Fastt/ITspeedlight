"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Created ONCE at module level — zero GC pressure, zero realloc
const OUTER_GEO = new THREE.TorusKnotGeometry(2, 0.6, 128, 32);
const INNER_GEO = new THREE.SphereGeometry(1.2, 32, 32);

const OUTER_MAT = new THREE.MeshStandardMaterial({
  color: new THREE.Color("#82b1ff"), // Modern Light Blue
  metalness: 0.9,
  roughness: 0.05,
  envMapIntensity: 2.5,
  transparent: true,
  opacity: 0.75,
  side: THREE.FrontSide,
});

const INNER_MAT = new THREE.MeshStandardMaterial({
  color: new THREE.Color("#0066ff"), // Space Blue
  emissive: new THREE.Color("#00ccff"), // Cyan Glow
  emissiveIntensity: 2.0,
  wireframe: true, // Restored wireframe core
  transparent: true,
  opacity: 0.5,
});

// Add modern vertex morphing to the material
OUTER_MAT.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = { value: 0 };
  shader.vertexShader = `
    uniform float uTime;
    ${shader.vertexShader}
  `.replace(
    '#include <begin_vertex>',
    `
    // Very subtle organic liquid morphing
    vec3 transformed = position;
    float noise = sin(position.x * 1.5 + uTime) * cos(position.y * 1.5 + uTime) * sin(position.z * 1.5 + uTime);
    transformed += normal * noise * 0.15; // Toned down displacement for TorusKnot
    `
  );
  OUTER_MAT.userData.shader = shader;
};

export default function MorphingSphere() {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    // Update shader time for liquid effect
    if (OUTER_MAT.userData.shader) {
      OUTER_MAT.userData.shader.uniforms.uTime.value = t;
    }

    outerRef.current.rotation.x += d * 0.08;
    outerRef.current.rotation.y += d * 0.12;

    innerRef.current.rotation.x -= d * 0.1;
    innerRef.current.rotation.z += d * 0.15;

    groupRef.current.position.y = Math.sin(t * 0.5) * 0.25;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.05;
  });

  return (
    <group ref={groupRef} scale={1.15}>
      <mesh ref={outerRef} geometry={OUTER_GEO} material={OUTER_MAT} />
      <mesh ref={innerRef} geometry={INNER_GEO} material={INNER_MAT} />
    </group>
  );
}
