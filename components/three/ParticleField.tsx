"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Shader compiled ONCE with twinkling logic
const makeParticleMaterial = (color: string) =>
  new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: 0.9 },
      uTime: { value: 0 },
    },
    vertexShader: `
      attribute float aSize;
      attribute float aSpeed;
      uniform float uTime;
      varying float vOpacity;
      
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        
        // Dynamic twinkling effect
        float twinkle = sin(uTime * aSpeed * 3.0) * 0.5 + 0.5;
        vOpacity = 0.3 + (twinkle * 0.7);
        
        gl_PointSize = (180.0 * aSize) / -mv.z;
        gl_Position  = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3  uColor;
      varying float vOpacity;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        
        // Core glow
        float glow = smoothstep(0.5, 0.05, d);
        gl_FragColor = vec4(uColor, glow * vOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

export default function ParticleField({
  count = 100,
  color = "#ffffff", // Default to star-white
}: {
  count?: number;
  color?: string;
}) {
  const pointsRef = useRef<THREE.Points>(null!);

  // Material keyed by color
  const material = useMemo(() => makeParticleMaterial(color), [color]);

  // Geometry with extra attributes for per-star behavior
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Large spherical distribution for a "space" feel
      const r = 5 + Math.random() * 25; 
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = 0.5 + Math.random(); // Varied star sizes
      speeds[i] = 0.5 + Math.random(); // Varied twinkle speeds
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    return geo;
  }, [count]);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    
    // Update uTime for twinkling
    material.uniforms.uTime.value = t;
    
    // Very slow cosmic rotation
    pointsRef.current.rotation.y += d * 0.01;
    pointsRef.current.rotation.x = Math.sin(t * 0.03) * 0.05;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
