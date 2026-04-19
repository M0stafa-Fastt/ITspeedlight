"use client";

import { useMemo, useEffect, useRef } from "react";
import * as THREE from "three";

const BUILDING_COUNT = 150;
const NEON_COUNT = 20;

const COLORS = ["#00F5FF", "#7B2FFF", "#0040FF"]; // Cyan, Purple, Blue

export default function CyberCity() {
  const customMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const darkMeshRef = useRef<THREE.InstancedMesh>(null);
  const neonMeshRef = useRef<THREE.InstancedMesh>(null);

  // Generate Dark Buildings
  const darkBuildings = useMemo(() => {
    const matrix = new THREE.Matrix4();
    const positions = [];
    const color = new THREE.Color();
    const colors = [];

    for (let i = 0; i < BUILDING_COUNT; i++) {
      // Distant horizontal skyline placement
      let x = (Math.random() - 0.5) * 120;
      let z = -(Math.random() * 40) - 10; // Strictly behind
      
      const height = Math.random() * 15 + 2;
      const width = Math.random() * 3 + 1;
      const depth = Math.random() * 3 + 1;

      matrix.setPosition(x, height / 2 - 2, z);
      matrix.scale(new THREE.Vector3(width, height, depth));
      positions.push(matrix.clone());

      color.setHSL(0, 0, Math.random() * 0.05 + 0.01);
      colors.push(color.clone());
    }
    return { positions, colors };
  }, []);

  // Generate Glowing Neon Accents
  const neonBuildings = useMemo(() => {
    const matrix = new THREE.Matrix4();
    const positions = [];
    const colors = [];

    for (let i = 0; i < NEON_COUNT; i++) {
      let x = (Math.random() - 0.5) * 100;
      let z = -(Math.random() * 30) - 5; // Strung across the middle distance
      
      const height = Math.random() * 10 + 2;
      const width = Math.random() > 0.5 ? 0.3 : Math.random() * 2 + 0.5;
      const depth = Math.random() > 0.5 ? Math.random() * 2 + 0.5 : 0.3;

      matrix.setPosition(x, height / 2 - 2, z);
      matrix.scale(new THREE.Vector3(width, height, depth));
      positions.push(matrix.clone());

      const neonColor = new THREE.Color(COLORS[Math.floor(Math.random() * COLORS.length)]);
      neonColor.multiplyScalar(2.0); 
      colors.push(neonColor);
    }
    return { positions, colors };
  }, []);

  useEffect(() => {
    // Only update once on mount to save performance!
    if (darkMeshRef.current && darkBuildings.positions.length > 0) {
      darkBuildings.positions.forEach((matrix, i) => {
        darkMeshRef.current?.setMatrixAt(i, matrix);
        darkMeshRef.current?.setColorAt(i, darkBuildings.colors[i]);
      });
      darkMeshRef.current.instanceMatrix.needsUpdate = true;
      if (darkMeshRef.current.instanceColor) darkMeshRef.current.instanceColor.needsUpdate = true;
    }

    if (neonMeshRef.current && neonBuildings.positions.length > 0) {
      neonBuildings.positions.forEach((matrix, i) => {
        neonMeshRef.current?.setMatrixAt(i, matrix);
        neonMeshRef.current?.setColorAt(i, neonBuildings.colors[i]);
      });
      neonMeshRef.current.instanceMatrix.needsUpdate = true;
      if (neonMeshRef.current.instanceColor) neonMeshRef.current.instanceColor.needsUpdate = true;
    }
  }, [darkBuildings, neonBuildings]);

  return (
    <group position={[0, -8, -40]}>
      {/* Underlying Floor Grid / Reflection base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial 
          color="#010102"
          metalness={0.9} 
          roughness={0.4} 
        />
      </mesh>

      {/* Dark Abstract City Blocks */}
      <instancedMesh ref={darkMeshRef} args={[undefined, undefined, BUILDING_COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          ref={customMaterialRef}
          color="#ffffff"
          metalness={0.9}
          roughness={0.3}
        />
      </instancedMesh>

      {/* Glowing Accents */}
      <instancedMesh ref={neonMeshRef} args={[undefined, undefined, NEON_COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}
