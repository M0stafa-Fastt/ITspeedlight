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

      // Removed mouse movement behavior based on user request
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
      {/* Full-Screen 3D Dreamscape Background */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <HeroScene />
      </div>

      {/* Cinematic Vignette — blends edges into pure black void */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.9)_100%)]" />

      {/* HUD Layer: Minimalist Framing Only */}
      <div className="hud-layer absolute inset-0 z-[5] pointer-events-none p-12">
        <div className="hud-bracket absolute top-12 left-12 w-10 h-10 border-t border-l border-white/40 rounded-tl-sm transition-all duration-700" />
        <div className="hud-bracket absolute top-12 right-12 w-10 h-10 border-t border-r border-white/40 rounded-tr-sm transition-all duration-700" />
        <div className="hud-bracket absolute bottom-12 left-12 w-10 h-10 border-b border-l border-white/40 rounded-bl-sm transition-all duration-700" />
        <div className="hud-bracket absolute bottom-12 right-12 w-10 h-10 border-b border-r border-white/40 rounded-br-sm transition-all duration-700" />
      </div>

      {/* Cinematic Movie Poster Layout: Text pinned to bottom-left */}
      <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 lg:bottom-24 lg:left-24 z-[10] flex flex-col items-start text-left">
        <h1
          ref={title1Ref}
          className="font-orbitron font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white leading-[1.1] tracking-tight mb-1"
        >
          {splitText(t("titlePart1").toUpperCase())}
        </h1>

        <h1
          ref={title2Ref}
          className="font-orbitron font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white leading-[1.1] tracking-tight mb-6"
        >
          <span className="text-accent-blue">
            {splitText(t("titlePart2").toUpperCase())}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="font-sans text-[11px] md:text-xs text-white/60 max-w-sm leading-relaxed mb-10"
        >
          {t("subtitle")}
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
          <button className="relative px-7 py-3 bg-white text-bg-void rounded-full font-sans font-black text-[9px] uppercase tracking-widest overflow-hidden group transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">
              {t("ctaStart")}
            </span>
            <div className="absolute inset-0 bg-accent-blue translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>

          <button className="px-7 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-full font-mono font-bold text-[9px] uppercase tracking-widest text-white hover:bg-white/10 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            {t("ctaExplore")}
          </button>
        </div>
      </div>

      {/* Vertical Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[10] flex flex-col items-center gap-4 opacity-70">
        <span
          className="font-mono text-[7px] text-white/60 tracking-[0.5em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          SCROLL
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
