"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import MorphingSphere from "./MorphingSphere";
import ParticleField from "./ParticleField";

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 bg-bg-void overflow-hidden">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00F5FF" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#7B2FFF" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <MorphingSphere />
        </Float>
        
        <ParticleField count={700} />
        
        <Environment preset="city" />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 2 - 0.1}
        />
        
        {/* Fallback fog to blend background */}
        <fog attach="fog" args={["#040406", 10, 30]} />
      </Canvas>
    </div>
  );
}
