"use client";

import React from "react";

export const BackgroundEffect = () => {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* Grid Lines - visible on dark background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), 
                           linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
        }}
      />

      {/* Glowing Cyan Dots at grid intersections */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 245, 255, 0.15) 1px, transparent 0)`,
          backgroundSize: "4rem 4rem",
        }}
      />

      {/* Top-left ambient glow - cyan */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full"
        style={{ background: "rgba(34, 211, 238, 0.06)", filter: "blur(120px)" }}
      />

      {/* Bottom-right ambient glow - blue/violet */}
      <div 
        className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full"
        style={{ background: "rgba(61, 90, 254, 0.06)", filter: "blur(120px)" }}
      />

      {/* Center subtle glow */}
      <div 
        className="absolute top-[40%] left-[30%] w-[500px] h-[500px] rounded-full"
        style={{ background: "rgba(123, 47, 255, 0.04)", filter: "blur(100px)" }}
      />

      {/* Scanning Line Effect */}
      <div 
        className="absolute left-0 right-0 h-[1px]"
        style={{ 
          background: "linear-gradient(to right, transparent, rgba(0, 245, 255, 0.08), transparent)",
          animation: "scanline 8s linear infinite",
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0"
        style={{ 
          opacity: 0.03,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")',
        }}
      />

      {/* Keyframe for scanning line */}
      <style jsx>{`
        @keyframes scanline {
          0% { top: -5%; }
          100% { top: 105%; }
        }
      `}</style>
    </div>
  );
};
