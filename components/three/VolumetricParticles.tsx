"use client";

import { Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function VolumetricParticles() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Extremely slow rotation for a subtle ambient feel
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      {/* Reduced particle counts for stable 60fps on average devices */}
      <Sparkles
        count={40}
        scale={40}
        size={3}
        speed={0.1}
        opacity={0.2}
        color="#00F5FF"
      />
      <Sparkles
        count={30}
        scale={40}
        size={4}
        speed={0.15}
        opacity={0.15}
        color="#7B2FFF"
      />
      <Sparkles
        count={50}
        scale={50}
        size={2}
        speed={0.05}
        opacity={0.1}
        color="#0040FF"
      />
    </group>
  );
}
