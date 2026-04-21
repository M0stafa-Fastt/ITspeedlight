"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleField({ count = 800, color = "#3d5afe" }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Swirling Galaxy / Vortex Mathematics
      // Concentrate particles near the core and trail them outwards in a spiral
      const radius = 1.5 + Math.random() * 6; 
      const spinAngle = radius * 1.5; // Spiral tightness
      const angle = Math.random() * Math.PI * 2;
      
      const x = Math.cos(angle + spinAngle) * radius;
      const z = Math.sin(angle + spinAngle) * radius;
      // Compressing the Y axis to create a disk-like swirl around the torus
      const y = (Math.random() - 0.5) * 3 * (1 - radius / 10);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      // Hypnotic orbital flow
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.15;
    }
  });


  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
