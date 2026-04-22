"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const t = useTranslations("Contact");

  return (
    <main className="min-h-screen bg-bg-void relative overflow-hidden font-sans text-balance pb-32">
      
      {/* Signature Atmospheric Noise & Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>
      
      {/* Massive Volume Lighting Behind Grid */}
      <div className="absolute top-[20%] left-[-10%] w-[800px] h-[800px] bg-accent-cyan opacity-[0.04] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[60%] right-[-10%] w-[800px] h-[800px] bg-accent-magenta opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 pt-40">
        
        {/* Header Segment */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} 
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} 
          className="max-w-4xl mb-24"
        >
          <div className="inline-flex items-center gap-4 mb-6">
             <span className={`w-3 h-3 rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet shadow-[0_0_15px_rgba(0,245,255,0.5)]`} />
             <span className="font-mono text-sm tracking-[0.3em] text-text-disabled uppercase">
               Engage Module
             </span>
          </div>
          <h1 className="font-orbitron font-black text-5xl sm:text-7xl lg:text-[6rem] tracking-tight leading-[1.05] text-white mb-6">
            {t("title")}
          </h1>
          <p className="font-sans text-xl lg:text-3xl text-white/80 font-light max-w-2xl leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Asymmetrical Grid Layout */}
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-24 relative">
          
          {/* Left Panel - Information Clusters */}
          <div className="flex flex-col gap-6">
             
             {/* 1. HQ Coordinates */}
             <motion.div 
               initial={{ opacity: 0, x: -30, filter: "blur(15px)" }}
               animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
               transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
               className="glass-panel p-8 lg:p-12 rounded-[2rem] border border-white/5 bg-white/[0.01] backdrop-blur-xl hover:bg-white/[0.03] transition-all duration-700 group relative overflow-hidden"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[50px] -z-10" />
                <div className="flex items-start gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex flex-shrink-0 items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,0,0,0.5)] relative">
                     <MapPin className="w-7 h-7 text-accent-cyan" />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-2xl text-white mb-4">{t("info.addressTitle")}</h3>
                    <p className="font-mono text-lg text-text-secondary leading-relaxed tracking-tight group-hover:text-white transition-colors">
                      {t("info.address")}
                    </p>
                  </div>
                </div>
             </motion.div>

             {/* 2. Direct Channels (Emails) */}
             <motion.div 
               initial={{ opacity: 0, x: -30, filter: "blur(15px)" }}
               animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
               transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
               className="glass-panel p-8 lg:p-12 rounded-[2rem] border border-white/5 bg-white/[0.01] backdrop-blur-xl hover:bg-white/[0.03] transition-all duration-700 group relative overflow-hidden"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[50px] -z-10" />
                <div className="flex items-start gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex flex-shrink-0 items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] relative">
                     <Mail className="w-7 h-7 text-accent-violet" />
                  </div>
                  <div className="w-full">
                    <h3 className="font-syne font-bold text-2xl text-white mb-4">{t("info.emailTitle")}</h3>
                    <div className="flex flex-col gap-3">
                       <Link href={`mailto:${t("info.email1")}`} className="group/link flex items-center justify-between py-2 border-b border-white/5 hover:border-white/20 transition-all">
                          <span className="font-mono text-lg text-text-secondary group-hover/link:text-white transition-colors tracking-tight">{t("info.email1")}</span>
                          <ArrowUpRight className="w-4 h-4 text-accent-violet opacity-0 group-hover/link:opacity-100 transition-opacity" />
                       </Link>
                       <Link href={`mailto:${t("info.email2")}`} className="group/link flex items-center justify-between py-2 border-b border-white/5 hover:border-white/20 transition-all">
                          <span className="font-mono text-lg text-text-secondary group-hover/link:text-white transition-colors tracking-tight">{t("info.email2")}</span>
                          <ArrowUpRight className="w-4 h-4 text-accent-violet opacity-0 group-hover/link:opacity-100 transition-opacity" />
                       </Link>
                    </div>
                  </div>
                </div>
             </motion.div>

             {/* 3. Global Hotlines */}
             <motion.div 
               initial={{ opacity: 0, x: -30, filter: "blur(15px)" }}
               animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
               transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
               className="glass-panel p-8 lg:p-12 rounded-[2rem] border border-white/5 bg-white/[0.01] backdrop-blur-xl hover:bg-white/[0.03] transition-all duration-700 group relative overflow-hidden"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-magenta/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[50px] -z-10" />
                <div className="flex items-start gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex flex-shrink-0 items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] relative">
                     <Phone className="w-7 h-7 text-accent-magenta" />
                  </div>
                  <div className="w-full">
                    <h3 className="font-syne font-bold text-2xl text-white mb-4">{t("info.phoneTitle")}</h3>
                    <div className="flex flex-col gap-3">
                       <Link href={`tel:${t("info.phone1")}`} className="group/link flex items-center justify-between py-2 border-b border-white/5 hover:border-white/20 transition-all">
                          <span className="font-mono text-lg text-text-secondary group-hover/link:text-white transition-colors tracking-widest">{t("info.phone1")}</span>
                          <ArrowUpRight className="w-4 h-4 text-accent-magenta opacity-0 group-hover/link:opacity-100 transition-opacity" />
                       </Link>
                       <Link href={`tel:${t("info.phone2")}`} className="group/link flex items-center justify-between py-2 border-b border-white/5 hover:border-white/20 transition-all">
                          <span className="font-mono text-lg text-text-secondary group-hover/link:text-white transition-colors tracking-widest">{t("info.phone2")}</span>
                          <ArrowUpRight className="w-4 h-4 text-accent-magenta opacity-0 group-hover/link:opacity-100 transition-opacity" />
                       </Link>
                    </div>
                  </div>
                </div>
             </motion.div>

          </div>

          {/* Right Panel - Ghost Form Container */}
          <motion.div 
             initial={{ opacity: 0, x: 30, filter: "blur(15px)" }}
             animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
             transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
             className="relative h-full"
          >
            <div className="sticky top-12 glass-panel p-8 md:p-14 rounded-[3rem] border border-white/5 bg-black/40 backdrop-blur-[50px] shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
               
               <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
                  
                  {/* Minimal Floating Input */}
                  <div className="relative group/input">
                    <input 
                      type="text" 
                      id="name"
                      className="peer w-full bg-transparent border-0 border-b border-white/10 px-0 py-4 text-white text-lg focus:outline-none focus:ring-0 focus:border-accent-cyan transition-colors" 
                      placeholder=" " 
                      required
                    />
                    <label 
                      htmlFor="name" 
                      className="absolute left-0 top-4 text-text-secondary font-mono tracking-wide transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent-cyan peer-valid:-top-4 peer-valid:text-xs"
                    >
                      {t("form.name")}
                    </label>
                  </div>

                  {/* Minimal Floating Input */}
                  <div className="relative group/input">
                    <input 
                      type="email" 
                      id="email"
                      className="peer w-full bg-transparent border-0 border-b border-white/10 px-0 py-4 text-white text-lg focus:outline-none focus:ring-0 focus:border-accent-violet transition-colors" 
                      placeholder=" " 
                      required
                    />
                    <label 
                      htmlFor="email" 
                      className="absolute left-0 top-4 text-text-secondary font-mono tracking-wide transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent-violet peer-valid:-top-4 peer-valid:text-xs"
                    >
                      {t("form.email")}
                    </label>
                  </div>

                  {/* Minimal Floating Textarea */}
                  <div className="relative group/input pt-2">
                    <textarea 
                      id="message"
                      rows={5} 
                      className="peer w-full bg-transparent border-0 border-b border-white/10 px-0 py-4 text-white text-lg focus:outline-none focus:ring-0 focus:border-accent-cyan transition-colors resize-none" 
                      placeholder=" " 
                      required
                    />
                    <label 
                      htmlFor="message" 
                      className="absolute left-0 top-6 text-text-secondary font-mono tracking-wide transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-accent-cyan peer-valid:-top-2 peer-valid:text-xs"
                    >
                      {t("form.message")}
                    </label>
                  </div>

                  {/* High-End Submit Lockup */}
                  <div className="pt-8">
                     <button type="submit" className="relative group/btn w-full overflow-hidden rounded-full p-[1px]">
                        {/* Animated border glow */}
                        <span className="absolute inset-0 bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-magenta rounded-full opacity-60 group-hover/btn:opacity-100 animate-[spin_3s_linear_infinite]" />
                        
                        {/* Button Body inner */}
                        <div className="relative w-full px-12 py-6 bg-black/90 backdrop-blur-xl rounded-full flex items-center justify-center gap-4 transition-all duration-300 hover:bg-black/40">
                           <span className="font-syne font-bold text-xl text-white/90 group-hover/btn:text-white transition-colors">
                             {t("form.submit")}
                           </span>
                           <span className="transform group-hover/btn:translate-x-2 transition-transform duration-500 rtl:group-hover/btn:-translate-x-2 text-accent-cyan">
                             →
                           </span>
                        </div>
                     </button>
                  </div>

               </form>

            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
