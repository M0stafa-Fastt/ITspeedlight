"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { User, Users } from "lucide-react";

export default function TeamPage() {
  const t = useTranslations("Team");

  const team = [
    { key: "ceo", bg: "bg-accent-cyan" },
    { key: "cto", bg: "bg-accent-violet" },
    { key: "cmo", bg: "bg-accent-magenta" }
  ];

  return (
    <main className="min-h-screen bg-bg-void pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-accent-magenta/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-20">
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto">
            <h1 className="font-orbitron font-bold text-5xl md:text-7xl mb-6">{t("title")}</h1>
            <p className="font-sans text-xl text-text-secondary">{t("subtitle")}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div 
                key={member.key}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center group hover:border-white/20 transition-all"
              >
                <div className={`w-32 h-32 rounded-full mb-6 relative overflow-hidden flex items-center justify-center border-4 border-bg-void shadow-xl`}>
                  <div className={`absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity ${member.bg}`} />
                  <User className={`w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform`} />
                </div>
                <h3 className="font-syne font-bold text-2xl text-white mb-2">{t(`members.${member.key}.name`)}</h3>
                <p className="text-text-secondary font-sans uppercase tracking-widest text-xs font-bold text-accent-cyan">{t(`members.${member.key}.role`)}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 glass-panel p-12 rounded-3xl text-center max-w-4xl mx-auto border-t border-accent-cyan flex flex-col items-center"
          >
            <Users className="w-16 h-16 text-accent-cyan mb-6" />
            <h2 className="font-orbitron font-bold text-3xl mb-6">{t("culture")}</h2>
            <p className="font-sans text-lg text-text-secondary leading-relaxed">{t("cultureText")}</p>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
