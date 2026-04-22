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

        // Smooth, gentle twinkling — no harsh blinking
        float twinkle = sin(uTime * 0.8 + aPhase) * 0.3 + 0.7;
        vAlpha = twinkle;

        gl_PointSize = (aSize * 120.0) / -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;

        // Soft glow falloff — no hard edges
        float glow = smoothstep(0.5, 0.0, d);
        float alpha = glow * glow * vAlpha * 0.6;

        // Warm white with a hint of blue
        gl_FragColor = vec4(0.85, 0.9, 1.0, alpha);
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
      // Spread stars across a large sphere — not clustered near center
      const r = 8 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Mix of small ambient dots and a few brighter stars
      sizes[i] = 0.3 + Math.random() * 0.7;
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
