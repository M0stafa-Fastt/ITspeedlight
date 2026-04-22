"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { Quote } from "lucide-react";

export default function TestimonialsCarousel() {
  const t = useTranslations("Home.Testimonials");
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Extract 5 testimonials dynamically based on en.json structure
  const testimonials = [1, 2, 3, 4, 5].map((num) => ({
    name: t(`t${num}.name`),
    role: t(`t${num}.role`),
    text: t(`t${num}.text`),
  }));

  // Duplicate the array so the GSAP animation can scroll continuously (-50%)
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    let animation: gsap.core.Tween;
    const ctx = gsap.context(() => {
      // Move track from 0 to -50% of its total width infinitely
      animation = gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 40,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  // Pause animation on hover
  useEffect(() => {
    if (trackRef.current) {
      const tweens = gsap.getTweensOf(trackRef.current);
      if (tweens.length > 0) {
        if (isHovered) tweens[0].pause();
        else tweens[0].play();
      }
    }
  }, [isHovered]);

  return (
    <section className="relative py-24 md:py-32 bg-bg-void overflow-hidden border-b border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 mb-16 md:mb-20 relative z-10 flex flex-col items-center text-center">
        <div className="section-badge mb-6">
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
          {t("badge")}
        </div>
        <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white">
          {t("title")}
        </h2>
      </div>

      {/* Marquee Track Container with faded edges */}
      <div 
        className="relative w-full overflow-hidden flex z-10"
        style={{ 
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", 
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" 
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* The Track */}
        <div 
          ref={trackRef}
          className="flex gap-6 w-max px-6 py-4"
        >
          {duplicatedTestimonials.map((testimonial, idx) => (
            <div 
              key={idx} 
              className="w-[320px] md:w-[420px] glass-panel rounded-3xl p-8 border border-white/5 hover:border-accent-cyan/30 transition-all flex flex-col justify-between group bg-white/5 hover:-translate-y-2 duration-500"
            >
              <Quote className="w-10 h-10 text-accent-cyan/20 mb-6 group-hover:text-accent-cyan transition-colors duration-500" />
              <p className="font-sans text-lg text-text-secondary mb-8 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div>
                <h4 className="font-orbitron font-bold text-white text-lg">{testimonial.name}</h4>
                <p className="font-sans text-sm text-accent-blue">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
