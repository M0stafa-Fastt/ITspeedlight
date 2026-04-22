"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── The "Water Shape" — TorusKnot with organic liquid breathing ────────────
const KNOT_GEO = new THREE.TorusKnotGeometry(2.4, 0.65, 140, 28);

// ─── Frosted metallic shell ─────────────────────────────────────────────────
const KNOT_MAT = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color("#b0c4ff"),
  metalness: 0.85,
  roughness: 0.08,
  envMapIntensity: 2.0,
  clearcoat: 1.0,
  clearcoatRoughness: 0.05,
  transparent: true,
  opacity: 0.7,
  side: THREE.FrontSide,
});


// ─── Vertex morphing on the knot: gentle liquid breathing ───────────────────
KNOT_MAT.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = { value: 0 };
  shader.uniforms.uPulse = { value: 0 };
  shader.vertexShader = `
    uniform float uTime;
    uniform float uPulse;
    ${shader.vertexShader}
  `.replace(
    "#include <begin_vertex>",
    `
    vec3 transformed = position;
    // Base wave amplitude + extra amplitude from the smooth pulse
    float amp = 1.0 + uPulse * 1.5; 
    float wave1 = sin(position.x * 2.0 + uTime * 0.6) * 0.06 * amp;
    float wave2 = sin(position.y * 1.8 + uTime * 0.5 + 1.5) * 0.05 * amp;
    float wave3 = cos(position.z * 2.2 + uTime * 0.7 + 3.0) * 0.04 * amp;
    transformed += normal * (wave1 + wave2 + wave3);
    `,
  );
  KNOT_MAT.userData.shader = shader;
};

// ─── Smooth pulse math helper ────────────────────────────────────────────────
// Creates a smooth, continuous wave for a gentle breathing/pulsing effect
function smoothPulse(t: number): number {
  // Sine wave from 0 to 1
  return (Math.sin(t * 2.5) + 1.0) / 2.0;
}

export default function MorphingSphere() {
  const knotRef = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // ── Smooth Pulse (Only affects the water shape now) ──
    const pulse = smoothPulse(t);

    // Update knot shader time and pulse
    if (KNOT_MAT.userData.shader) {
      KNOT_MAT.userData.shader.uniforms.uTime.value = t;
      KNOT_MAT.userData.shader.uniforms.uPulse.value = pulse;
    }

    // Only the water shape scales smoothly
    const knotScale = 1.0 + pulse * 0.02; 
    knotRef.current.scale.setScalar(knotScale);

    // Keep the light stable
    if (lightRef.current) {
      lightRef.current.intensity = 2;
    }

    // Slow, elegant knot rotation
    knotRef.current.rotation.y = t * 0.1;
    knotRef.current.rotation.x = t * 0.06;

    // Soft floating (no mouse)
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.15;
  });

  return (
    <group ref={groupRef} scale={1.05}>
      {/* The "Water Shape" — frosted glass TorusKnot */}
      <mesh ref={knotRef} geometry={KNOT_GEO} material={KNOT_MAT} />

      {/* Inner point light: pulses color through the knot gaps */}
      <pointLight ref={lightRef} color="#2979ff" intensity={1} distance={8} />
    </group>
  );
}
