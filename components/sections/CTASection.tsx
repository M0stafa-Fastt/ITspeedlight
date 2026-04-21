"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const t = useTranslations("Home.CTA");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const magnetRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(titleRef.current, {
        y: 60, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.from(subtitleRef.current, {
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: subtitleRef.current, start: "top 85%" },
      });

      gsap.from(btnRef.current, {
        y: 20, opacity: 0, scale: 0.9, duration: 0.6,
        scrollTrigger: { trigger: btnRef.current, start: "top 90%" },
      });
    }, sectionRef);

    // Magnetic button effect
    const btn = magnetRef.current;
    if (btn) {
      const handleMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.2;
        const dy = (e.clientY - cy) * 0.2;
        gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
      };
      const handleLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
      };
      btn.addEventListener("mousemove", handleMove);
      btn.addEventListener("mouseleave", handleLeave);

      return () => {
        ctx.revert();
        btn.removeEventListener("mousemove", handleMove);
        btn.removeEventListener("mouseleave", handleLeave);
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Floating background shapes */}
      <div className="absolute top-10 left-[10%] w-72 h-72 rounded-full bg-accent-blue/5 blur-[100px] animate-float pointer-events-none" />
      <div className="absolute bottom-10 right-[10%] w-80 h-80 rounded-full bg-accent-indigo/5 blur-[100px] animate-float-reverse pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/3 animate-spin-slow pointer-events-none" />

      <div className="max-w-[900px] mx-auto px-6 text-center relative z-10">
        <h2
          ref={titleRef}
          className="font-orbitron font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-8 leading-[1.1]"
        >
          {t("title").split(" ").map((word, i) => (
            <span key={i}>
              {i === t("title").split(" ").length - 1 ? (
                <span className="gradient-text">{word}</span>
              ) : (
                word
              )}{" "}
            </span>
          ))}
        </h2>

        <p ref={subtitleRef} className="font-sans text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
          {t("subtitle")}
        </p>

        <div ref={btnRef}>
          <Link href={`/${locale}/contact`}>
            <button
              ref={magnetRef}
              className="bg-gradient-cta rounded-full py-5 px-14 font-sans font-bold text-white text-lg hover:brightness-110 transition-all shadow-[0_0_40px_rgba(61,90,254,0.35)] hover:shadow-[0_0_60px_rgba(61,90,254,0.5)]"
            >
              {t("button")}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
