"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Shader: Soft twinkling starfield ───────────────────────────────────────
const makeStarMaterial = () =>
  new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
      attribute float aSize;
      attribute float aPhase;
      uniform float uTime;
      varying float vAlpha;

      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);

        // Smooth, gentle twinkling
        float twinkle = sin(uTime * 0.8 + aPhase) * 0.4 + 0.6;
        vAlpha = twinkle;

        // Smaller size multiplier for distant star look
        gl_PointSize = (aSize * 100.0) / -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;

        // Soft glow falloff
        float glow = smoothstep(0.5, 0.0, d);
        // Boost alpha significantly to make stars pop against the pure black background
        float alpha = glow * vAlpha * 2.0;

        // Crisp white with a hint of blue
        gl_FragColor = vec4(0.9, 0.95, 1.0, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

export default function ParticleField({
  count = 120,
}: {
  count?: number;
  color?: string;
}) {
  const pointsRef = useRef<THREE.Points>(null!);
  const material = useMemo(() => makeStarMaterial(), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread stars across a wider volume
      const r = 4 + Math.random() * 45;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Fine, tiny stars
      sizes[i] = 0.2 + Math.random() * 0.4;
      phases[i] = Math.random() * Math.PI * 2; // Random phase offset
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    return geo;
  }, [count]);

  useFrame((state, delta) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;

    // Extremely slow drift — feels like the universe is breathing
    const d = Math.min(delta, 0.05);
    pointsRef.current.rotation.y += d * 0.008;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
