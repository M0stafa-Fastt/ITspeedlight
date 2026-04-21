"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function MorphingSphere() {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.15;
      outerRef.current.rotation.y += delta * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.2;
      innerRef.current.rotation.z += delta * 0.25;
    }
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* 2025 Trend: Frosted Glass Torus Knot with Chromatic Aberration */}
      <mesh ref={outerRef}>
        <torusKnotGeometry args={[2, 0.6, 256, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1.5}
          chromaticAberration={0.12}
          anisotropy={0.3}
          distortion={0.6}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#ffffff"
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Inner Hovering Energy Core */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#a13085"
          emissive="#ff00ff"
          emissiveIntensity={2.5}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}
