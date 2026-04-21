"use client";

import { useEffect, useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPreview() {
  const t = useTranslations("Home.About");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const stats = useMemo(() => [
    { value: 120, suffix: "+", label: t("statClients") },
    { value: 500, suffix: "+", label: t("statProjects") },
    { value: 5, suffix: "+", label: t("statYears") },
  ], [t]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge
      gsap.from(badgeRef.current, {
        opacity: 0, y: 20,
        duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Title word reveal
      const words = titleRef.current?.querySelectorAll(".word-inner");
      if (words?.length) {
        gsap.from(words, {
          y: "100%", opacity: 0,
          stagger: 0.05, duration: 0.8, ease: "power4.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        });
      }

      // Description
      gsap.from(descRef.current, {
        y: 30, opacity: 0,
        duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: descRef.current, start: "top 85%" },
      });

      // Stats counter animation
      if (statsRef.current) {
        const statEls = statsRef.current.querySelectorAll(".stat-card");
        gsap.from(statEls, {
          y: 40, opacity: 0,
          stagger: 0.12, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
        });

        // Number counting
        statEls.forEach((el, i) => {
          const numEl = el.querySelector(".stat-number");
          if (numEl) {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stats[i].value,
              duration: 2,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 85%" },
              onUpdate: () => {
                (numEl as HTMLElement).textContent = Math.floor(obj.val) + stats[i].suffix;
              },
            });
          }
        });
      }

      // CTA
      gsap.from(ctaRef.current, {
        y: 20, opacity: 0, duration: 0.6,
        scrollTrigger: { trigger: ctaRef.current, start: "top 90%" },
      });

      // Background glow parallax
      gsap.to(glowRef.current, {
        y: -80,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [stats]);

  const splitWords = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="word-wrap">
        <span className="word-inner">{word}</span>
        {i < text.split(" ").length - 1 && <span>&nbsp;</span>}
      </span>
    ));
  };

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Background glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent-indigo/8 blur-[150px] rounded-full pointer-events-none"
      />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <div ref={badgeRef} className="section-badge">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            {t("badge")}
          </div>

          <h2
            ref={titleRef}
            className="font-orbitron font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-8 max-w-4xl leading-[1.1]"
            style={{ perspective: "800px" }}
          >
            {splitWords(t("title"))}
          </h2>

          <p ref={descRef} className="font-sans text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-card glass-panel p-8 rounded-2xl flex flex-col items-center text-center group hover:border-white/20 transition-all"
            >
              <span className="stat-number font-orbitron font-bold text-5xl md:text-6xl gradient-text mb-3">
                0{stat.suffix}
              </span>
              <span className="font-sans text-text-secondary text-sm uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="flex justify-center">
          <Link href={`/${locale}/about`}>
            <button className="glass-panel py-4 px-10 font-sans font-semibold text-accent-cyan hover:border-accent-cyan/40 hover:bg-accent-cyan/5 transition-all group text-base">
              {t("cta")}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 ml-2">→</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
