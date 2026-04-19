"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleField({ count = 2000 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const radius = 5 + Math.random() * 15;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const speed = 0.001 + Math.random() * 0.002;
      const offset = Math.random() * Math.PI * 2;
      temp.push({ x, y, z, speed, offset, radius });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    particles.forEach((particle, i) => {
      const angle = time * particle.speed + particle.offset;
      dummy.position.set(
        Math.cos(angle) * particle.radius,
        particle.y + Math.sin(time + particle.offset) * 0.5,
        Math.sin(angle) * particle.radius
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#7B2FFF" transparent opacity={0.6} />
    </instancedMesh>
  );
}
