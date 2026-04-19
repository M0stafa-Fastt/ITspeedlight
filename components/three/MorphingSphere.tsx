"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function MorphingSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={2.5}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color="#00F5FF"
        emissive="#7B2FFF"
        emissiveIntensity={0.5}
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
        wireframe={true}
      />
    </mesh>
  );
}
