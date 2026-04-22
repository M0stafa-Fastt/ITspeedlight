"use client";

import { Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import MorphingSphere from "./MorphingSphere";
import ParticleField from "./ParticleField";

// Computed once at module load — never inside render
const IS_MOBILE =
  typeof window !== "undefined" &&
  /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
const CORES =
  typeof navigator !== "undefined" ? (navigator.hardwareConcurrency ?? 2) : 2;
const TIER: "low" | "mid" | "high" =
  IS_MOBILE && CORES <= 4 ? "low" : IS_MOBILE || CORES <= 6 ? "mid" : "high";

const CFG = {
  low: {
    dpr: [1, 1] as [number, number],
    fov: 55,
    particles: 50,
    antialias: false,
  },
  mid: {
    dpr: [1, 1.5] as [number, number],
    fov: 50,
    particles: 100,
    antialias: false,
  },
  high: {
    dpr: [1, 2] as [number, number],
    fov: 45,
    particles: 180,
    antialias: true,
  },
}[TIER];

function SceneContent() {
  const { viewport } = useThree();
  const scale = Math.min(1.05, viewport.width / 10);

  return (
    <>
      <ambientLight intensity={0.5} />
      {/* Modern space-themed lighting: Deep Blue and Cyan */}
      <pointLight position={[-10, -10, -10]} intensity={4} color="#3d5afe" />
      <pointLight position={[10, 10, 10]} intensity={4} color="#00ffff" />

      <group scale={scale}>
        <MorphingSphere />
        {/* Star-white particles for a cosmic atmosphere */}
        <ParticleField count={CFG.particles} color="#ffffff" />
      </group>

      <Environment preset="night" />
      <fog attach="fog" args={["#000000", 18, 32]} />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 15], fov: CFG.fov }}
        dpr={CFG.dpr}
        gl={{
          antialias: CFG.antialias,
          powerPreference: "high-performance",
          stencil: false, // never used — free perf win
          depth: true,
          alpha: false, // opaque canvas = faster compositing
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 1);

          // Pause the loop when tab is hidden — prevents jank on resume
          document.addEventListener("visibilitychange", () => {
            if (document.hidden) gl.setAnimationLoop(null);
            else gl.setAnimationLoop((gl as any)._currentAnimationLoop ?? null);
          });
        }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
