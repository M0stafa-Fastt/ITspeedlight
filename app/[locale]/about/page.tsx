"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Rocket, ShieldCheck, Cpu } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("About");
  const locale = useLocale();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const whyIcons = [
    <ShieldCheck key="1" className="w-10 h-10 text-accent-cyan" />,
    <Rocket key="2" className="w-10 h-10 text-accent-violet" />,
    <Cpu key="3" className="w-10 h-10 text-accent-magenta" />
  ];

  return (
    <main className="min-h-screen bg-bg-void pt-32 pb-24 overflow-hidden relative">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-cyan/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-24">
          
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto">
            <h1 className="font-orbitron font-bold text-5xl md:text-7xl mb-6">{t("title")}</h1>
            <p className="font-sans text-xl text-text-secondary">{t("subtitle")}</p>
          </motion.div>

          {/* Mission & Vision Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="glass-panel p-10 relative overflow-hidden group border border-white/10 hover:border-accent-cyan/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-10 transition-opacity" />
              <h2 className="font-syne font-bold text-3xl mb-4 text-white">{t("missionTitle")}</h2>
              <p className="font-sans text-text-secondary leading-relaxed">{t("missionText")}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel p-10 relative overflow-hidden group border border-white/10 hover:border-accent-violet/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-cta opacity-0 group-hover:opacity-10 transition-opacity" />
              <h2 className="font-syne font-bold text-3xl mb-4 text-white">{t("visionTitle")}</h2>
              <p className="font-sans text-text-secondary leading-relaxed">{t("visionText")}</p>
            </motion.div>
          </div>

          {/* Why Choose Us */}
          <motion.div variants={itemVariants} className="mt-12">
            <h2 className="font-orbitron font-bold text-4xl mb-12 text-center">{t("whyChooseUs")}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center text-center p-8 bg-white/5 rounded-2xl border border-white/5 hover:-translate-y-2 transition-transform duration-300">
                  <div className="bg-bg-void p-4 rounded-full mb-6 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    {whyIcons[i-1]}
                  </div>
                  <h3 className="font-syne font-bold text-xl mb-3">{t(`why${i}`)}</h3>
                  <p className="font-sans text-text-secondary text-sm leading-relaxed">{t(`why${i}Text`)}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Segment */}
          <motion.div variants={itemVariants} className="text-center mt-12 py-16 px-6 glass-panel rounded-3xl border-t-2 border-accent-cyan">
            <h2 className="font-syne font-bold text-3xl md:text-5xl mb-8">{t("cta")}</h2>
            <Link href={`/${locale}/contact`}>
              <button className="bg-gradient-cta rounded-full py-4 px-10 text-lg font-medium font-sans hover:scale-105 hover:shadow-[0_0_30px_rgba(255,45,120,0.5)] transition-all text-white">
                Contact Our Team
              </button>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}
