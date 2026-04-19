"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("Contact");

  return (
    <main className="min-h-screen bg-bg-void pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-[30%] right-[10%] w-[600px] h-[600px] bg-accent-cyan/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-orbitron font-bold text-5xl md:text-7xl mb-6">{t("title")}</h1>
          <p className="font-sans text-xl text-text-secondary">{t("subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Contact Details */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex flex-col gap-8 justify-center">
            
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-cyan/10 transition-colors">
                <MapPin className="w-6 h-6 text-accent-cyan" />
              </div>
              <div>
                <h3 className="font-syne font-bold text-xl text-white mb-2">{t("info.addressTitle")}</h3>
                <p className="text-text-secondary font-sans">{t("info.address")}</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-violet/10 transition-colors">
                <Mail className="w-6 h-6 text-accent-violet" />
              </div>
              <div>
                <h3 className="font-syne font-bold text-xl text-white mb-2">{t("info.emailTitle")}</h3>
                <p className="text-text-secondary font-sans">hello@itspeedlight.com</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-magenta/10 transition-colors">
                <Phone className="w-6 h-6 text-accent-magenta" />
              </div>
              <div>
                <h3 className="font-syne font-bold text-xl text-white mb-2">{t("info.phoneTitle")}</h3>
                <p className="text-text-secondary font-sans">+1 (555) 000-0000</p>
              </div>
            </div>

          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <form className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-sans text-text-secondary mb-2 uppercase tracking-wider">{t("form.name")}</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent-cyan transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-sans text-text-secondary mb-2 uppercase tracking-wider">{t("form.email")}</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent-cyan transition-colors" placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-sm font-sans text-text-secondary mb-2 uppercase tracking-wider">{t("form.message")}</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent-cyan transition-colors resize-none" placeholder="Let's build something great..."></textarea>
              </div>
              <button type="submit" className="w-full mt-4 bg-gradient-cta rounded-xl py-4 font-sans font-bold text-white hover:brightness-110 hover:-translate-y-1 transition-all shadow-[0_0_20px_rgba(255,45,120,0.3)]">
                {t("form.submit")}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
