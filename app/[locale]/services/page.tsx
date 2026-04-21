"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Globe, Lightbulb, Share2, Search, Target, TrendingUp } from "lucide-react";

export default function ServicesPage() {
  const t = useTranslations("Services");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0, 0, 0.2, 1] } },
  };

  const services = [
    { key: "web", icon: <Globe className="w-8 h-8 text-white" /> },
    { key: "branding", icon: <Lightbulb className="w-8 h-8 text-white" /> },
    { key: "social", icon: <Share2 className="w-8 h-8 text-white" /> },
    { key: "seo", icon: <Search className="w-8 h-8 text-white" /> },
    { key: "marketing", icon: <Target className="w-8 h-8 text-white" /> },
    { key: "growth", icon: <TrendingUp className="w-8 h-8 text-white" /> }
  ];

  return (
    <main className="min-h-screen bg-bg-void pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-accent-violet/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-16">
          
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h1 className="font-orbitron font-bold text-5xl md:text-7xl mb-6">{t("title")}</h1>
            <p className="font-sans text-xl text-text-secondary">{t("subtitle")}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.key}
                whileHover={{ y: -8 }}
                className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-150 transition-transform duration-500">
                   {service.icon}
                </div>
                
                <div className="w-14 h-14 rounded-full bg-gradient-hero flex items-center justify-center mb-6 shadow-lg shadow-accent-cyan/20">
                  {service.icon}
                </div>
                
                <h3 className="font-syne font-bold text-2xl mb-4 text-white">
                  {t(`items.${service.key}.title`)}
                </h3>
                <p className="font-sans text-text-secondary leading-relaxed">
                  {t(`items.${service.key}.desc`)}
                </p>
                
                <div className="mt-8 flex items-center text-accent-cyan font-sans text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Discover More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}
