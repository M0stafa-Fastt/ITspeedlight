"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Box, Target, Zap } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("About");
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-bg-void relative overflow-hidden font-sans text-balance">
      
      {/* Background Noise overlay for premium editorial feel */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>

      {/* Massive Ambient Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-accent-cyan opacity-[0.04] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] left-[-15%] w-[800px] h-[800px] bg-accent-violet opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col">
        
        {/* ======================= HERO SECTION ======================= */}
        <section className="min-h-[80vh] flex flex-col justify-center pt-40 pb-20 relative">
           {/* Subtle background Wireframe Art */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-1/2 h-full flex items-center justify-center opacity-30 z-0 pointer-events-none"
           >
              <div className="w-[500px] h-[500px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite] relative flex items-center justify-center">
                 <div className="w-[400px] h-[400px] border border-white/5 border-dashed rounded-full absolute animate-[spin_40s_linear_infinite_reverse]" />
                 <div className="w-[300px] h-[300px] border border-white/10 rounded-full absolute" />
                 <div className="w-1 h-1 bg-accent-cyan rounded-full absolute top-0 animate-ping" />
                 <div className="w-2 h-2 bg-accent-violet rounded-full absolute bottom-1/4 right-0 blur-sm shadow-[0_0_20px_#3D5AFE]" />
              </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
             animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
             transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
             className="relative z-10 max-w-4xl"
           >
              <div className="inline-flex items-center gap-4 mb-8">
                 <span className={`w-3 h-3 rounded-full bg-gradient-to-r from-accent-cyan to-accent-blue shadow-[0_0_15px_rgba(0,245,255,0.5)]`} />
                 <span className="font-mono text-sm tracking-[0.3em] text-text-disabled uppercase">
                   01 — {t("badge")}
                 </span>
              </div>
              
              <h1 className="font-orbitron font-black text-5xl sm:text-7xl lg:text-[6rem] tracking-tight leading-[1.05] text-white mb-8 drop-shadow-sm">
                {t("title")}
              </h1>
              
              <p className="font-sans text-2xl lg:text-3xl text-white/80 font-light max-w-3xl leading-relaxed mb-6">
                {t("subtitle")}
              </p>

              <p className="font-sans text-lg lg:text-xl text-text-secondary leading-relaxed max-w-2xl">
                {t("introText")}
              </p>
           </motion.div>
        </section>

        {/* ======================= MISSION & VISION ======================= */}
        <section className="py-24 relative">
          <div className="flex flex-col gap-12 lg:gap-32">
             
             {/* Mission Box - Left aligned */}
             <motion.div
               initial={{ opacity: 0, x: -30, filter: "blur(20px)" }}
               whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
               viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
               transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
               className="relative lg:w-2/3 mr-auto group"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 to-transparent blur-3xl -z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="glass-panel p-8 lg:p-16 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all duration-700 bg-black/40 backdrop-blur-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                   <h2 className="font-orbitron font-bold text-3xl lg:text-5xl text-white mb-6 flex items-center gap-6">
                     <div className="p-4 rounded-full bg-accent-cyan/10 border border-white/10">
                       <Target className="w-8 h-8 text-accent-cyan" />
                     </div>
                     {t("missionTitle")}
                   </h2>
                   <p className="font-sans text-xl lg:text-2xl text-text-secondary leading-relaxed font-light">
                     {t("missionText")}
                   </p>
                </div>
             </motion.div>

             {/* Vision Box - Right aligned */}
             <motion.div
               initial={{ opacity: 0, x: 30, filter: "blur(20px)" }}
               whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
               viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
               transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
               className="relative lg:w-2/3 ml-auto group"
             >
                <div className="absolute inset-0 bg-gradient-to-tl from-accent-violet/10 to-transparent blur-3xl -z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="glass-panel p-8 lg:p-16 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all duration-700 bg-black/40 backdrop-blur-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                   <h2 className="font-orbitron font-bold text-3xl lg:text-5xl text-white mb-6 flex items-center gap-6">
                     <div className="p-4 rounded-full bg-accent-violet/10 border border-white/10">
                       <Zap className="w-8 h-8 text-accent-violet" />
                     </div>
                     {t("visionTitle")}
                   </h2>
                   <p className="font-sans text-xl lg:text-2xl text-text-secondary leading-relaxed font-light">
                     {t("visionText")}
                   </p>
                </div>
             </motion.div>

          </div>
        </section>

        {/* ======================= WHY CHOOSE US ======================= */}
        <section className="py-32 relative">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
             className="mb-20 text-center flex flex-col items-center"
           >
              <div className="inline-flex items-center gap-4 mb-6">
                 <span className={`w-3 h-3 rounded-full bg-gradient-to-r from-accent-magenta to-accent-violet shadow-[0_0_15px_rgba(255,45,120,0.5)]`} />
                 <span className="font-mono text-sm tracking-[0.3em] text-text-disabled uppercase">
                   02 — Core Values
                 </span>
              </div>
              <h2 className="font-orbitron font-bold text-4xl lg:text-6xl text-white max-w-3xl">
                {t("whyChooseUs")}
              </h2>
           </motion.div>

           <div className="flex flex-col gap-6">
              {[
                { i: "1", color: "from-[#00F5FF]/10 to-transparent", iconColor: "text-[#00F5FF]" },
                { i: "2", color: "from-[#3D5AFE]/10 to-transparent", iconColor: "text-[#3D5AFE]" },
                { i: "3", color: "from-[#E056FD]/10 to-transparent", iconColor: "text-[#E056FD]" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                  className="w-full relative group"
                >
                   {/* Horizontal Card */}
                   <div className="glass-panel w-full p-8 lg:p-12 rounded-[2rem] border border-white/5 bg-white/[0.01] backdrop-blur-xl hover:bg-white/[0.03] transition-all duration-700 flex flex-col md:flex-row items-start md:items-center gap-8 overflow-hidden">
                      {/* Interactive Hover Glow */}
                      <div className={`absolute left-0 top-0 w-[500px] h-full bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[80px] -z-10`} />

                      {/* Giant Number Identifier */}
                      <div className="text-6xl lg:text-8xl font-orbitron font-black text-white/[0.03] select-none shrink-0 w-24 text-center md:text-left">
                        0{item.i}
                      </div>

                      <div className="flex-1 space-y-4">
                         <h3 className="font-syne font-bold text-2xl lg:text-4xl text-white">
                           {t(`why${item.i}`)}
                         </h3>
                         <p className="font-sans text-lg lg:text-xl text-text-secondary leading-relaxed font-light">
                           {t(`why${item.i}Text`)}
                         </p>
                      </div>

                      {/* Abstract decorative graphic */}
                      <div className="hidden lg:flex shrink-0 w-20 h-20 rounded-full border border-white/10 items-center justify-center relative shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-bg-void/50">
                         <Box className={`w-8 h-8 ${item.iconColor}`} />
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </section>

        {/* ======================= ULTRA CTA CTA ======================= */}
        <section className="py-24 mb-20 relative px-4">
           <motion.div
             initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
             whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
             viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
             transition={{ duration: 1, ease: "easeOut" }}
             className="relative rounded-[3rem] overflow-hidden"
           >
              {/* Epic Background Gradient Base */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 via-accent-violet/10 to-accent-magenta/10" />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />
              
              {/* Border ring */}
              <div className="absolute inset-0 border border-white/10 rounded-[3rem] pointer-events-none" />

              <div className="relative z-10 py-24 px-8 flex flex-col items-center text-center">
                 <div className="inline-flex items-center gap-4 mb-8">
                   <span className={`w-2 h-2 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_15px_rgba(0,245,255,0.5)]`} />
                   <span className="font-mono text-sm tracking-[0.3em] text-text-disabled uppercase">
                     Engage
                   </span>
                 </div>

                 <h2 className="font-orbitron font-black text-4xl lg:text-6xl text-white mb-6">
                   {t("ctaTitle")}
                 </h2>
                 <p className="font-sans text-xl lg:text-2xl text-text-secondary max-w-2xl mb-12 font-light">
                   {t("ctaSubtitle")}
                 </p>

                 <Link href={`/${locale}/contact`}>
                    <button className="relative group/btn overflow-hidden rounded-full p-[1px]">
                       {/* Animated border glow */}
                       <span className="absolute inset-0 bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-magenta rounded-full opacity-60 group-hover/btn:opacity-100 animate-[spin_3s_linear_infinite]" />
                       
                       {/* Button Body */}
                       <div className="relative px-10 py-4 lg:px-12 lg:py-5 bg-black/80 backdrop-blur-xl rounded-full flex items-center gap-4 transition-all duration-300 group-hover/btn:bg-black/40">
                          <span className="font-syne font-bold text-lg text-white/90 group-hover/btn:text-white transition-colors">
                            {t("ctaButton")}
                          </span>
                          <span className="transform group-hover/btn:translate-x-2 transition-transform duration-500 rtl:group-hover/btn:-translate-x-2 text-accent-cyan">
                            →
                          </span>
                       </div>
                    </button>
                 </Link>
              </div>
           </motion.div>
        </section>

      </div>
    </main>
  );
}
