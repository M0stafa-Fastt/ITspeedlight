"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Lightbulb, Share2, Search, Target, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const serviceIcons = [
  { key: "web", icon: Globe, color: "#00F5FF" },
  { key: "branding", icon: Lightbulb, color: "#3D5AFE" },
  { key: "social", icon: Share2, color: "#1A237E" },
  { key: "seo", icon: Search, color: "#00F5FF" },
  { key: "marketing", icon: Target, color: "#3D5AFE" },
  { key: "growth", icon: TrendingUp, color: "#1A237E" },
];

export default function ServicesShowcase() {
  const t = useTranslations("Home.Services");
  const tItems = useTranslations("Services.items");
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(badgeRef.current, {
        opacity: 0, y: 20, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.from(titleRef.current, {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
      });

      gsap.from(subtitleRef.current, {
        opacity: 0, y: 30, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: subtitleRef.current, start: "top 85%" },
      });

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".service-card");
        gsap.from(cards, {
          y: 60, opacity: 0, scale: 0.95,
          stagger: 0.08, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[20%] right-[-15%] w-[500px] h-[500px] bg-accent-cyan/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-accent-indigo/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div ref={badgeRef} className="section-badge">
            <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
            {t("badge")}
          </div>

          <h2 ref={titleRef} className="font-orbitron font-bold text-4xl md:text-6xl text-white mb-6 max-w-3xl">
            {t("title")}
          </h2>

          <p ref={subtitleRef} className="font-sans text-lg text-text-secondary max-w-2xl">
            {t("subtitle")}
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceIcons.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.key}
                className="service-card glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all relative group overflow-hidden cursor-pointer"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${service.color}10, transparent 70%)`,
                  }}
                />

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/10"
                  style={{ background: `${service.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: service.color }} />
                </div>

                <h3 className="font-syne font-bold text-xl mb-3 text-white group-hover:text-accent-cyan transition-colors">
                  {tItems(`${service.key}.title`)}
                </h3>
                <p className="font-sans text-text-secondary text-sm leading-relaxed mb-6">
                  {tItems(`${service.key}.desc`)}
                </p>

                <div className="flex items-center text-accent-cyan font-sans text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Learn More
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
