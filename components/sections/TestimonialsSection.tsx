"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { key: "t1", accent: "#3D5AFE" },
  { key: "t2", accent: "#1A237E" },
  { key: "t3", accent: "#00F5FF" },
  { key: "t4", accent: "#3D5AFE" },
  { key: "t5", accent: "#1A237E" },
];

export default function TestimonialsSection() {
  const t = useTranslations("Home.Testimonials");
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(badgeRef.current, {
        opacity: 0, y: 20, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.from(titleRef.current, {
        opacity: 0, y: 30, duration: 0.8,
        scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Duplicate cards for infinite scroll effect
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-accent-blue/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10 mb-12">
        <div className="flex flex-col items-center text-center">
          <div ref={badgeRef} className="section-badge">
            <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
            {t("badge")}
          </div>

          <h2 ref={titleRef} className="font-orbitron font-bold text-4xl md:text-6xl text-white max-w-3xl">
            {t("title")}
          </h2>
        </div>
      </div>

      {/* Marquee track */}
      <div className="relative w-full overflow-hidden py-4 group">
        {/* Gradient fades on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-void to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-void to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-6 animate-marquee group-hover:[animation-play-state:paused]"
          style={{ width: "fit-content" }}
        >
          {allTestimonials.map((item, i) => (
            <div
              key={i}
              className="glass-panel p-8 rounded-2xl w-[380px] flex-shrink-0 flex flex-col justify-between border border-white/5 hover:border-white/15 transition-all"
            >
              {/* Quote */}
              <p className="font-sans text-text-secondary text-sm leading-relaxed mb-6">
                &ldquo;{t(`${item.key}.text`)}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: item.accent + "30", border: `1px solid ${item.accent}40` }}
                >
                  {t(`${item.key}.name`).charAt(0)}
                </div>
                <div>
                  <p className="font-sans font-semibold text-white text-sm">{t(`${item.key}.name`)}</p>
                  <p className="font-sans text-text-disabled text-xs">{t(`${item.key}.role`)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
