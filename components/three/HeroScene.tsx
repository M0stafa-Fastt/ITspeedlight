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
      {/* Enhanced custom lighting to match ShaderGradient colors */}
      <pointLight position={[-10, -10, -10]} intensity={2} color="#4d279b" />
      <pointLight position={[10, 10, 10]} intensity={2} color="#a13085" />

      <group position={[0, 0, 0]} scale={1.3}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <MorphingSphere />
        </Float>
        {/* Restored to a smaller, cleaner ambient flow */}
        <ParticleField count={100} color="#e056fd" />
      </group>

      <Environment preset="night" />
      {/* Deep cinematic fog to fade into pure black at the edges */}
      <fog attach="fog" args={["#000000", 6, 25]} />
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
