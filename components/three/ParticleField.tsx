"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Shader compiled ONCE with twinkling and trail logic
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
      attribute float aOffset;
      uniform float uTime;
      varying float vOpacity;
      
      void main() {
        // Starfield base position
        vec3 pos = position;
        
        // For 'Data Streaks' (if aSize is negative, it's a streak)
        if (aSize < 0.0) {
           pos.x = mod(pos.x + uTime * aSpeed * 2.0 + aOffset, 60.0) - 30.0;
        }

        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        
        // Twinkling logic
        float twinkle = sin(uTime * aSpeed * 3.0 + aOffset) * 0.5 + 0.5;
        vOpacity = 0.3 + (twinkle * 0.7);
        
        gl_PointSize = (abs(aSize) * 180.0) / -mv.z;
        gl_Position  = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3  uColor;
      varying float vOpacity;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
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
  color = "#ffffff",
}: {
  count?: number;
  color?: string;
}) {
  const pointsRef = useRef<THREE.Points>(null!);
  const material = useMemo(() => makeParticleMaterial(color), [color]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    
    // Combine stars and data streaks into one draw call
    const streakCount = Math.floor(count * 0.15); // 15% are streaks
    const totalCount = count + streakCount;
    
    const pos = new Float32Array(totalCount * 3);
    const sizes = new Float32Array(totalCount);
    const speeds = new Float32Array(totalCount);
    const offsets = new Float32Array(totalCount);

    for (let i = 0; i < totalCount; i++) {
      if (i < count) {
        // Starfield
        const r = 5 + Math.random() * 25; 
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
        sizes[i] = 0.4 + Math.random() * 0.8;
        speeds[i] = 0.5 + Math.random();
      } else {
        // Data Streaks (Modern Tech look)
        pos[i * 3] = (Math.random() - 0.5) * 60; // x
        pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
        pos[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
        sizes[i] = - (0.2 + Math.random() * 0.4); // Negative indicates streak
        speeds[i] = 2.0 + Math.random() * 3.0; // Fast
      }
      offsets[i] = Math.random() * 100;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute("aOffset", new THREE.BufferAttribute(offsets, 1));
    return geo;
  }, [count]);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    material.uniforms.uTime.value = t;
    
    // Smooth cosmic rotation on all axes
    pointsRef.current.rotation.y += d * 0.015;
    pointsRef.current.rotation.x = Math.sin(t * 0.03) * 0.05;
    pointsRef.current.rotation.z = Math.sin(t * 0.02) * 0.04;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
