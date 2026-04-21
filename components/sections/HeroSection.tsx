"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

const HeroScene = dynamic(() => import("../three/HeroScene"), { ssr: false });

const LOG_ENTRIES = [
  "INITIALIZING_CORE_SYSTEM",
  "OPTIMIZING_SEO_ALGORITHMS",
  "SYNCING_LIGHT_CURRENT_NODES",
  "DECRYPTING_GROWTH_DATA",
  "SECURING_NETWORK_LAYER",
  "CLOUD_THROUGHPUT_ESTABLISHED",
  "UAV_TRACKING_ACTIVE",
  "AI_ANALYSIS_COMPLETE",
  "DEPLOYING_SMART_SOLUTIONS",
];

export default function HeroSection() {
  const t = useTranslations("Home.Hero");
  const sectionRef = useRef<HTMLElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState({ ping: 0, uptime: 0, throughput: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate titles
      tl.from(".char-reveal", {
        y: "110%",
        stagger: 0.04,
        duration: 1,
        ease: "power4.out",
      });

      tl.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 15,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.7",
      );

      tl.fromTo(
        ctaRef.current?.children ?? [],
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5",
      );

      // HUD Elements reveal - Using fromTo to ensure visibility
      tl.fromTo(
        ".hud-bracket",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.8",
      );

      // Continuous Scanning Beam
      gsap.to(".scan-line", {
        top: "100%",
        duration: 4,
        repeat: -1,
        ease: "none",
      });

      // Animate Metrics
      const metricObj = { ping: 0, uptime: 0, throughput: 0 };
      gsap.to(metricObj, {
        ping: 12,
        uptime: 99.99,
        throughput: 1.2,
        duration: 2,
        delay: 1,
        ease: "power2.out",
        onUpdate: () => setMetrics({ ...metricObj }),
      });

      // Mouse Parallax for HUD
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(".hud-layer", {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: "power2.out",
        });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="inline-block overflow-hidden h-[1.2em] -mb-[0.2em]"
      >
        <span className="char-reveal inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full flex items-center overflow-hidden bg-bg-void selection:bg-accent-blue/30 pt-16"
    >
      {/* Full-Screen Shader Gradient Background */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-60 mix-blend-screen">
        <ShaderGradientCanvas
          style={{ width: "100%", height: "100%" }}
          pointerEvents="none"
          pixelDensity={1}
        >
          <ShaderGradient
            animate="on"
            type="sphere"
            wireframe={false}
            shader="defaults"
            uTime={0}
            uSpeed={0.1}
            uStrength={0.3}
            uDensity={0.8}
            uFrequency={5.5}
            uAmplitude={3.2}
            positionX={-0.1}
            positionY={0}
            positionZ={0}
            rotationX={0}
            rotationY={130}
            rotationZ={70}
            color1="#739daf"
            color2="#a13085"
            color3="#4d279b"
            reflection={0.4}
            cAzimuthAngle={270}
            cPolarAngle={180}
            cDistance={0.5}
            cameraZoom={15.1}
            lightType="env"
            brightness={0.8}
            envPreset="city"
            grain="on"
            toggleAxis={false}
            zoomOut={false}
            hoverState=""
            enableTransition={false}
          />
        </ShaderGradientCanvas>
      </div>

      {/* HUD Layer: Minimalist Framing Only */}
      <div className="hud-layer absolute inset-0 z-[5] pointer-events-none p-12">
        <div className="hud-bracket absolute top-12 left-12 w-10 h-10 border-t border-l border-white/40 rounded-tl-sm transition-all duration-700" />
        <div className="hud-bracket absolute top-12 right-12 w-10 h-10 border-t border-r border-white/40 rounded-tr-sm transition-all duration-700" />
        <div className="hud-bracket absolute bottom-12 left-12 w-10 h-10 border-b border-l border-white/40 rounded-bl-sm transition-all duration-700" />
        <div className="hud-bracket absolute bottom-12 right-12 w-10 h-10 border-b border-r border-white/40 rounded-br-sm transition-all duration-700" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-12 grid lg:grid-cols-12 gap-8 items-center h-full">
        {/* Left Column: Content */}
        <div className="lg:col-span-6 flex flex-col items-start text-left justify-center py-6">
          <div className="mb-6 flex items-center gap-3" ref={trustRef}>
            <div className="w-8 h-[2px] bg-accent-blue shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
            <span className="text-white font-sans text-[11px] font-bold tracking-widest leading-none">
              {t("trustBar")}
            </span>
          </div>

          <h1
            ref={title1Ref}
            className="font-orbitron font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-[1.2] tracking-tight mb-1"
          >
            {splitText(t("titlePart1").toUpperCase())}
          </h1>

          <h1
            ref={title2Ref}
            className="font-orbitron font-black text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] text-white leading-[1.2] tracking-tight mb-10"
          >
            <span className="text-accent-blue">
              {splitText(t("titlePart2").toUpperCase())}
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="font-sans text-xs md:text-sm text-white/60 max-w-md leading-relaxed mb-12"
          >
            {t("subtitle")}
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-5">
            <button className="relative px-9 py-3.5 bg-white text-bg-void rounded-full font-sans font-black text-[10px] uppercase tracking-widest overflow-hidden group transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                {t("ctaStart")}
              </span>
              <div className="absolute inset-0 bg-accent-blue translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>

            <button className="px-9 py-3.5 border border-white/30 rounded-full font-sans font-black text-[10px] uppercase tracking-widest text-white hover:bg-white/5 transition-all">
              {t("ctaExplore")}
            </button>
          </div>
        </div>

        {/* Right Column: 3D visual container */}
        <div className="hidden lg:flex lg:col-span-6 relative h-full items-center justify-center">
          <div className="w-full h-[40rem] relative">
            <HeroScene />
          </div>
        </div>
      </div>
    </section>
  );
}
