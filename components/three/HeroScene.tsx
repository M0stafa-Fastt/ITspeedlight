"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import MorphingSphere from "./MorphingSphere";
import ParticleField from "./ParticleField";

function SceneFallback() {
  return <div className="absolute inset-0" />;
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight
        position={[20, 20, 10]}
        intensity={2}
        angle={0.15}
        penumbra={1}
        color="#ffffff"
      />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#3d5afe" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />

      <group position={[0, 0, 0]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <MorphingSphere />
        </Float>
        <ParticleField count={1200} color="#3d5afe" />
      </group>

      <Environment preset="night" />
      <fog attach="fog" args={["#000000", 8, 30]} />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Suspense fallback={<SceneFallback />}>
        <Canvas
          camera={{ position: [0, 0, 15], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <SceneContent />
        </Canvas>
      </Suspense>
    </div>
  );
}
