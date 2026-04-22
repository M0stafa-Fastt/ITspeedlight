"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import MorphingSphere from "./MorphingSphere";
import ParticleField from "./ParticleField";

// ─── Device tier detection (computed once at module load) ───────────────────
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
    stars: 40,
    antialias: false,
  },
  mid: {
    dpr: [1, 1.5] as [number, number],
    fov: 50,
    stars: 80,
    antialias: false,
  },
  high: {
    dpr: [1, 2] as [number, number],
    fov: 45,
    stars: 140,
    antialias: true,
  },
}[TIER];

// ─── Scene content ─────────────────────────────────────────────────────────
function SceneContent() {
  const { viewport } = useThree();
  const scale = Math.min(1.0, viewport.width / 10);

  return (
    <>
      {/* Three-point lighting for cinematic depth */}
      <ambientLight intensity={0.3} />

      {/* Key light: warm white from top-right */}
      <directionalLight
        position={[8, 8, 5]}
        intensity={1.5}
        color="#ffeedd"
      />

      {/* Fill light: cool blue from left */}
      <pointLight position={[-8, -2, 6]} intensity={3} color="#4d7fff" />

      {/* Rim light: subtle cyan backlight for edge definition */}
      <pointLight position={[0, 4, -8]} intensity={2} color="#00ccff" />

      <group scale={scale}>
        <MorphingSphere />
        <ParticleField count={CFG.stars} />
      </group>

      {/* Studio environment for clean reflections on the orb */}
      <Environment preset="city" />

      {/* Fog: starts far back so the orb stays crisp */}
      <fog attach="fog" args={["#050510", 20, 40]} />
    </>
  );
}

// ─── Canvas wrapper ────────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 12], fov: CFG.fov }}
        dpr={CFG.dpr}
        gl={{
          antialias: CFG.antialias,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          alpha: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x050510, 1);
          // Pause render loop when tab is hidden
          document.addEventListener("visibilitychange", () => {
            if (document.hidden) gl.setAnimationLoop(null);
            else
              gl.setAnimationLoop(
                (gl as any)._currentAnimationLoop ?? null,
              );
          });
        }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
