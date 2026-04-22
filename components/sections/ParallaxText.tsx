"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxText() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row 1 moves left
      gsap.to(row1Ref.current, {
        x: "-40%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Start when section enters viewport
          end: "bottom top", // End when section leaves viewport
          scrub: 1, // Smooth scrubbing
        },
      });

      // Row 2 moves right
      gsap.to(row2Ref.current, {
        x: "10%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const textPhrase1 = "ENGINEERED FOR GROWTH • ".repeat(6);
  const textPhrase2 = "BUILDING DIGITAL EMPIRES • ".repeat(6);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-20 md:py-32 bg-bg-void overflow-hidden flex flex-col justify-center border-y border-white/5"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-accent-blue/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Row 1 (Solid Text, moves left) */}
      <div 
        ref={row1Ref}
        className="whitespace-nowrap flex font-orbitron font-bold text-[80px] md:text-[140px] leading-none text-white opacity-90 select-none will-change-transform"
      >
        {textPhrase1}
      </div>

      {/* Row 2 (Hollow Stroke Text, moves right) */}
      <div 
        ref={row2Ref}
        className="whitespace-nowrap flex font-orbitron font-bold text-[80px] md:text-[140px] leading-none select-none will-change-transform -ml-[50%]"
        style={{
          WebkitTextStroke: "2px rgba(255, 255, 255, 0.15)",
          color: "transparent",
        }}
      >
        {textPhrase2}
      </div>
    </section>
  );
}
