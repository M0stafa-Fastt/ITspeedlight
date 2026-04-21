"use client";

import { useEffect, useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StatsCounter() {
  const t = useTranslations("Home.Stats");
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = useMemo(() => [
    { value: 120, suffix: "+", label: t("clients"), icon: "🏢" },
    { value: 500, suffix: "+", label: t("projects"), icon: "🚀" },
    { value: 15, suffix: "+", label: t("countries"), icon: "🌍" },
    { value: 98, suffix: "%", label: t("satisfaction"), icon: "⭐" },
  ], [t]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const items = containerRef.current.querySelectorAll(".stat-item");

      gsap.from(items, {
        y: 40, opacity: 0,
        stagger: 0.1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Count up numbers
      items.forEach((item, i) => {
        const numEl = item.querySelector(".stat-num");
        if (!numEl) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stats[i].value,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 85%" },
          onUpdate: () => {
            (numEl as HTMLElement).textContent = Math.floor(obj.val) + stats[i].suffix;
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [stats]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Gradient background band */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-indigo/5 to-transparent pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div
          ref={containerRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, i) => (
            <div key={i} className="stat-item flex flex-col items-center text-center py-8">
              <span className="text-3xl mb-4">{stat.icon}</span>
              <span className="stat-num font-orbitron font-bold text-4xl md:text-5xl text-white mb-2">
                0{stat.suffix}
              </span>
              <span className="font-sans text-text-secondary text-sm uppercase tracking-wider">
                {stat.label}
              </span>
              {/* Decorative line */}
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent mt-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
