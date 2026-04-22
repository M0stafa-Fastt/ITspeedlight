"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Cloud, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function BentoShowcase() {
  const tAbout = useTranslations("Home.About");
  const tItems = useTranslations("Services.items");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".bento-card");
        gsap.fromTo(cards, 
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-bg-void overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-blue/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-cyan/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 flex flex-col items-start max-w-2xl">
           <div className="section-badge mb-6">
             <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
             Discover
           </div>
           <h2 className="font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
             Where <span className="text-accent-cyan">Vision</span> Meets <span className="text-accent-blue">Execution</span>
           </h2>
        </div>

        {/* 3x3 Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
          
          {/* Card 1: About Us (col-span-2, row-span-1) */}
          <div className="bento-card md:col-span-2 md:row-span-1 glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden group border border-white/5 hover:border-white/20 transition-all flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-blue/10 blur-[100px] rounded-full group-hover:bg-accent-blue/20 transition-all duration-700" />
            <h3 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-4 leading-tight relative z-10 max-w-lg">
              {tAbout("title")}
            </h3>
            <p className="font-sans text-base text-text-secondary leading-relaxed relative z-10 max-w-2xl">
              {tAbout("description")}
            </p>
          </div>

          {/* Card 2: Web Dev (col-span-1, row-span-1) */}
          <div className="bento-card md:col-span-1 md:row-span-1 glass-panel rounded-3xl p-8 flex flex-col justify-between border border-white/5 hover:border-white/20 transition-all group">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5 group-hover:scale-110 group-hover:bg-accent-cyan/10 transition-all duration-500">
               <Globe className="w-7 h-7 text-accent-cyan" />
            </div>
            <div>
               <h4 className="font-syne font-bold text-xl text-white mb-2 group-hover:text-accent-cyan transition-colors">{tItems(`web.title`)}</h4>
               <p className="font-sans text-sm text-text-secondary line-clamp-3">{tItems(`web.desc`)}</p>
            </div>
          </div>

          {/* Card 3: Cloud (col-span-1, row-span-1) */}
          <div className="bento-card md:col-span-1 md:row-span-1 glass-panel rounded-3xl p-8 flex flex-col justify-between border border-white/5 hover:border-white/20 transition-all group">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5 group-hover:scale-110 group-hover:bg-accent-blue/10 transition-all duration-500">
               <Cloud className="w-7 h-7 text-accent-blue" />
            </div>
            <div>
               <h4 className="font-syne font-bold text-xl text-white mb-2 group-hover:text-accent-blue transition-colors">{tItems(`cloud.title`)}</h4>
               <p className="font-sans text-sm text-text-secondary line-clamp-3">{tItems(`cloud.desc`)}</p>
            </div>
          </div>

          {/* Card 4: Stats (col-span-1, row-span-1) */}
          <div className="bento-card md:col-span-1 md:row-span-1 glass-panel rounded-3xl p-8 flex flex-col justify-center border border-white/5 hover:border-white/20 transition-all group bg-white/5">
            <div className="flex flex-col gap-6">
               <div>
                  <div className="font-orbitron font-bold text-5xl text-white mb-1">120<span className="text-accent-cyan">+</span></div>
                  <div className="text-sm text-text-secondary uppercase tracking-widest font-mono">Clients</div>
               </div>
               <div className="h-px w-full bg-white/10" />
               <div>
                  <div className="font-orbitron font-bold text-5xl text-white mb-1">500<span className="text-accent-cyan">+</span></div>
                  <div className="text-sm text-text-secondary uppercase tracking-widest font-mono">Projects</div>
               </div>
            </div>
          </div>

          {/* Card 5: CTA (col-span-1, row-span-1) */}
          <div className="bento-card md:col-span-1 md:row-span-1 glass-panel rounded-3xl p-8 flex flex-col justify-between items-start border border-accent-cyan/20 hover:border-accent-cyan/50 transition-all group bg-accent-cyan/5 relative">
             <div className="w-16 h-16 rounded-full bg-white text-bg-void flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="w-6 h-6 group-hover:-rotate-45 transition-transform duration-300" />
             </div>
             <div>
                <h3 className="font-orbitron font-bold text-2xl text-white mb-2">Explore All</h3>
                <p className="font-sans text-text-secondary text-sm">Discover how we can accelerate your digital growth.</p>
             </div>
             <Link href={`/${locale}/services`} className="absolute inset-0 z-20">
                <span className="sr-only">Explore Services</span>
             </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
