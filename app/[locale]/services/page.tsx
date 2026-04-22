"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { 
  MonitorSmartphone, 
  Zap, 
  ShieldCheck, 
  CloudCog, 
  Network, 
  Search, 
  Mail, 
  Smartphone, 
  Code2, 
  Briefcase 
} from "lucide-react";

const servicesList = [
  { key: "itConsulting", icon: MonitorSmartphone, color: "from-[#00F5FF] to-[#3D5AFE]" },
  { key: "lightCurrent", icon: Zap, color: "from-amber-400 to-orange-500" },
  { key: "security", icon: ShieldCheck, color: "from-rose-500 to-red-600" },
  { key: "cloud", icon: CloudCog, color: "from-sky-400 to-blue-600" },
  { key: "network", icon: Network, color: "from-emerald-400 to-teal-500" },
  { key: "seo", icon: Search, color: "from-[#E056FD] to-fuchsia-500" },
  { key: "email", icon: Mail, color: "from-yellow-400 to-amber-600" },
  { key: "social", icon: Smartphone, color: "from-pink-500 to-rose-500" },
  { key: "web", icon: Code2, color: "from-[#00F5FF] to-blue-500" },
  { key: "career", icon: Briefcase, color: "from-indigo-400 to-purple-600" },
];

export default function ServicesPage() {
  const t = useTranslations("Services");

  return (
    <main className="bg-bg-void relative overflow-clip font-sans text-balance pb-24">
      
      {/* Background Noise overlay for premium editorial feel */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col">
          
          {/* Header Block */}
          <div className="min-h-[50vh] lg:min-h-[70vh] flex flex-col justify-center px-6 lg:px-12 pt-32 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="font-orbitron font-black text-5xl sm:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.05] bg-gradient-to-br from-white via-white/90 to-white/30 bg-clip-text text-transparent mb-8 drop-shadow-sm">
                <span className="block text-accent-cyan mb-4 text-lg sm:text-xl font-mono tracking-widest font-normal uppercase">
                  Capabilities Index
                </span>
                {t("title")}
              </h1>
              <p className="font-sans text-xl sm:text-2xl text-text-secondary max-w-xl leading-relaxed font-light">
                {t("subtitle")}
              </p>
            </motion.div>
          </div>

          {/* Stacking Sections */}
          <div className="flex flex-col w-full relative">
            {servicesList.map((service, index) => {
               const Icon = service.icon;
               return (
                 <div 
                   key={service.key} 
                   className="w-full relative min-h-[120vh] lg:min-h-[150vh] flex flex-col lg:flex-row items-start z-10 bg-bg-void lg:bg-transparent"
                 >
                    {/* STICKY VISUAL CANVAS (Fixed per section while scrolling its content) */}
                    <div className="w-full lg:w-1/2 sticky top-0 h-[45vh] lg:h-screen flex items-center justify-center p-6 lg:p-12 overflow-hidden z-0 bg-bg-void/80 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border-b border-white/5 lg:border-none">
                       
                       {/* Background Glow */}
                       <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] bg-gradient-to-tr ${service.color} opacity-[0.06] blur-[100px] rounded-full pointer-events-none`} />

                       {/* Giant Background Number */}
                       <div className="absolute inset-0 flex items-center justify-center select-none z-0 pointer-events-none">
                         <span className="font-orbitron font-black text-[12rem] lg:text-[25rem] xl:text-[35rem] text-white/[0.02] leading-none">
                           {String(index + 1).padStart(2, '0')}
                         </span>
                       </div>

                       {/* Art Piece with smooth entrance via whileInView */}
                       <motion.div
                         initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                         whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                         viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                         transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                         className="relative z-10 aspect-square flex items-center justify-center w-full max-w-[200px] lg:max-w-md xl:max-w-lg"
                       >
                         {/* Subtle outer orbital rings */}
                         <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_30s_linear_infinite]" />
                         <div className="absolute inset-6 lg:inset-8 rounded-full border border-white/10 border-dashed animate-[spin_40s_linear_infinite_reverse]" />
                         
                         {/* Inner Core Glass Box */}
                         <div className="w-32 h-32 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full border border-white/10 bg-white/[0.01] backdrop-blur-[30px] shadow-[0_0_40px_rgba(0,0,0,0.5),inset_0_2px_15px_rgba(255,255,255,0.05)] flex items-center justify-center relative overflow-hidden transition-all duration-700">
                            {/* Inner soft colored glow */}
                            <div className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t ${service.color} opacity-10 blur-xl`} />
                            
                            <Icon className="w-12 h-12 lg:w-24 lg:h-24 xl:w-28 xl:h-28 text-white z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]" strokeWidth={1.5} />
                         </div>
                       </motion.div>
                    </div>

                    {/* SCROLLING TEXT CONTENT WITH ANIMATED ENTRANCE */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-12 py-16 lg:py-[30vh] z-10 lg:min-h-screen bg-bg-void/50 lg:bg-transparent">
                       <motion.div
                         initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
                         whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                         viewport={{ once: false, margin: "-15% 0px -15% 0px" }}
                         transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                         className="flex flex-col space-y-8 max-w-2xl"
                       >
                          {/* Contextual Marker */}
                          <div className="inline-flex items-center gap-4">
                             <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${service.color} shadow-[0_0_15px_rgba(255,255,255,0.3)]`} />
                             <span className="font-mono text-sm tracking-[0.3em] text-text-disabled uppercase">
                               {String(index + 1).padStart(2, '0')} — Segment
                             </span>
                          </div>

                          <div className="space-y-6">
                            <h2 className="font-orbitron font-bold text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] leading-[1.1] text-white">
                               {t(`items.${service.key}.title`)}
                            </h2>
                            <p className="font-sans text-xl sm:text-2xl text-text-secondary leading-relaxed font-light">
                               {t(`items.${service.key}.desc`)}
                            </p>
                          </div>

                          {/* Action Button */}
                          <div className="pt-8">
                            <button className="group/btn relative flex items-center gap-6 pb-3 border-b border-white/20 hover:border-white/80 transition-all duration-500 w-max overflow-hidden">
                               <span className="font-syne font-medium text-lg text-white/80 group-hover/btn:text-white transition-colors">View Dynamics</span>
                               <span className="transform -rotate-45 group-hover/btn:rotate-0 group-hover/btn:translate-x-2 transition-all duration-500 rtl:rotate-[135deg] rtl:group-hover/btn:-rotate-180 rtl:group-hover/btn:-translate-x-2">
                                 →
                               </span>
                            </button>
                          </div>
                       </motion.div>
                    </div>

                 </div>
               )
            })}
          </div>

      </div>
    </main>
  );
}
