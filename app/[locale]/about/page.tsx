"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Box, Target, Zap, Cpu, Sparkles, Shield, ArrowRight } from "lucide-react";
import { BackgroundEffect } from "@/components/ui/BackgroundEffect";

export default function AboutPage() {
  const t = useTranslations("About");
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-bg-void relative overflow-hidden font-sans text-balance">
      
      {/* Premium Lightweight Background */}
      <BackgroundEffect />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col">
        
        {/* ======================= HERO SECTION ======================= */}
        <section className="min-h-[70vh] flex flex-col justify-center pt-40 pb-20 relative">
           <motion.div
             initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
             animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
             transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
             className="relative z-10 max-w-4xl"
           >
              <div className="inline-flex items-center gap-4 mb-8">
                 <span className={`w-3 h-3 rounded-full bg-accent-cyan shadow-[0_0_15px_rgba(0,245,255,0.5)]`} />
                 <span className="font-mono text-sm tracking-[0.3em] text-text-disabled uppercase">
                   01 — {t("badge")}
                 </span>
              </div>
              
              <h1 className="font-orbitron font-black text-5xl sm:text-7xl lg:text-[6rem] tracking-tight leading-[1.05] text-white mb-8 drop-shadow-sm">
                {t("title")}
              </h1>
              
              <p className="font-sans text-2xl lg:text-3xl text-white/80 font-light max-w-3xl leading-relaxed">
                {t("subtitle")}
              </p>
           </motion.div>
        </section>

        {/* ======================= MISSION & VISION (VISIONARY CORE) ======================= */}
        <section className="py-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
             
             {/* Mission */}
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: false, margin: "-10%" }}
               className="glass-panel p-8 lg:p-12 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl group"
             >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-accent-cyan/10 border border-white/10 group-hover:border-accent-cyan/30 transition-colors">
                    <Target className="w-6 h-6 text-accent-cyan" />
                  </div>
                  <h2 className="font-orbitron font-bold text-2xl text-white uppercase tracking-wider">{t("missionTitle")}</h2>
                </div>
                <p className="font-sans text-xl text-text-secondary leading-relaxed font-light">
                  {t("missionText")}
                </p>
             </motion.div>

             {/* Vision */}
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: false, margin: "-10%" }}
               transition={{ delay: 0.1 }}
               className="glass-panel p-8 lg:p-12 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl group"
             >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-accent-violet/10 border border-white/10 group-hover:border-accent-violet/30 transition-colors">
                    <Zap className="w-6 h-6 text-accent-violet" />
                  </div>
                  <h2 className="font-orbitron font-bold text-2xl text-white uppercase tracking-wider">{t("visionTitle")}</h2>
                </div>
                <p className="font-sans text-xl text-text-secondary leading-relaxed font-light">
                  {t("visionText")}
                </p>
             </motion.div>
          </div>
        </section>

        {/* ======================= SKILLS (THE ARSENAL) ======================= */}
        <section className="py-24 relative">
           <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              className="glass-panel w-full p-8 lg:p-16 rounded-[3rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden relative"
           >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Cpu className="w-40 h-40 text-accent-cyan" strokeWidth={0.5} />
              </div>

              <div className="max-w-3xl relative z-10">
                 <h2 className="font-orbitron font-bold text-3xl lg:text-5xl text-white mb-8">
                   {t("skillsTitle")}
                 </h2>
                 <p className="font-sans text-xl lg:text-2xl text-text-secondary leading-relaxed font-light">
                   {t("skillsText")}
                 </p>
              </div>
           </motion.div>
        </section>

        {/* ======================= passion & quality ======================= */}
        <section className="py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32">
           {/* Passion */}
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: false, margin: "-10%" }}
             className="flex flex-col gap-6"
           >
              <h2 className="font-orbitron font-bold text-3xl lg:text-5xl text-white flex items-center gap-4">
                 <Sparkles className="w-8 h-8 text-accent-magenta" />
                 {t("passionTitle")}
              </h2>
              <p className="font-sans text-xl lg:text-2xl text-text-secondary leading-relaxed font-light">
                 {t("passionText")}
              </p>
           </motion.div>

           {/* Quality */}
           <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: false, margin: "-10%" }}
             className="flex flex-col gap-6"
           >
              <h2 className="font-orbitron font-bold text-3xl lg:text-5xl text-white flex items-center gap-4">
                 <Shield className="w-8 h-8 text-accent-cyan" />
                 {t("qualityTitle")}
              </h2>
              <p className="font-sans text-xl lg:text-2xl text-text-secondary leading-relaxed font-light">
                 {t("qualityText")}
              </p>
           </motion.div>
        </section>

        {/* ======================= CORE VALUES (REFINED) ======================= */}
        <section className="py-32 relative">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: false, margin: "-10%" }}
             className="mb-20"
           >
              <div className="inline-flex items-center gap-4 mb-6">
                 <span className={`w-3 h-3 rounded-full bg-accent-magenta shadow-[0_0_15px_rgba(255,45,120,0.5)]`} />
                 <span className="font-mono text-sm tracking-[0.3em] text-text-disabled uppercase">
                   02 — {t("whyChooseUs")}
                 </span>
              </div>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all duration-500 group"
                >
                   <div className="text-4xl font-orbitron font-black text-white/5 mb-6 group-hover:text-accent-cyan/20 transition-colors">0{i}</div>
                   <h3 className="font-syne font-bold text-2xl text-white mb-4">{t(`why${i}`)}</h3>
                   <p className="font-sans text-text-secondary leading-relaxed font-light">{t(`why${i}Text`)}</p>
                </motion.div>
              ))}
           </div>
        </section>

        {/* ======================= CTA ======================= */}
        <section className="py-24 mb-20 relative px-4">
           <motion.div
             initial={{ opacity: 0, scale: 0.98 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: false }}
             className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-12 lg:p-24 text-center"
           >
              <h2 className="font-orbitron font-black text-4xl lg:text-7xl text-white mb-6">
                {t("ctaTitle")}
              </h2>
              <p className="font-sans text-xl lg:text-2xl text-text-secondary max-w-2xl mx-auto mb-12 font-light">
                {t("ctaSubtitle")}
              </p>

              <Link href={`/${locale}/contact`} className="inline-block group">
                 <div className="relative px-10 py-5 bg-white text-black font-syne font-bold text-lg rounded-full flex items-center gap-3 transition-transform group-hover:scale-105 active:scale-95 duration-300">
                    {t("ctaButton")}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                 </div>
              </Link>
           </motion.div>
        </section>

      </div>
    </main>
  );
}
