"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import HeroScene from "../three/HeroScene";

export default function HeroSection() {
  const t = useTranslations("Home.Hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroScene />
      <div className="absolute inset-0 bg-black/50 z-[1] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-20">
        <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-orbitron font-bold text-5xl md:text-7xl leading-tight text-white mb-2 max-w-3xl">
              {t("titlePart1")} <br />
              <span className="gradient-text">{t("titlePart2")}</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="font-sans text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
            className="flex flex-wrap items-center gap-4 mt-4"
          >
            <button className="bg-gradient-cta rounded-full py-4 px-8 font-sans font-medium hover:scale-105 hover:brightness-110 transition-all text-white shadow-[0_0_20px_rgba(255,45,120,0.4)]">
              {t("ctaStart")}
            </button>
            <button className="glass-panel py-4 px-8 font-sans font-medium text-accent-cyan hover:border-accent-cyan/50 transition-all group">
              {t("ctaExplore")}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-2">→</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 glass-panel p-6 border-l-2 border-l-accent-cyan md:max-w-lg"
          >
            <p className="font-sans text-sm text-text-secondary italic">
              « {t("trustBar")} »
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
