"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { BackgroundEffect } from "@/components/ui/BackgroundEffect";
import { services } from "@/lib/servicesData";
import { ArrowUpRight } from "lucide-react";

export default function ServicesPage() {
  const t = useTranslations("Services");
  const locale = useLocale();

  return (
    <main className="bg-bg-void relative overflow-clip font-sans text-balance pb-32">
      
      {/* Premium Lightweight Background */}
      <BackgroundEffect />

      <div className="max-w-[1440px] mx-auto relative z-10">

        {/* ═══════════════════ HERO HEADER ═══════════════════ */}
        <div className="min-h-[50vh] lg:min-h-[60vh] flex flex-col justify-center px-6 lg:px-12 pt-32 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Segment Marker */}
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="w-3 h-3 rounded-full bg-accent-cyan shadow-[0_0_15px_rgba(0,245,255,0.5)]" />
              <span className="font-mono text-sm tracking-[0.3em] text-text-disabled uppercase">
                {t("badge")}
              </span>
            </div>

            <h1 className="font-orbitron font-black text-5xl sm:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.05] bg-gradient-to-br from-white via-white/90 to-white/30 bg-clip-text text-transparent mb-8 drop-shadow-sm">
              {t("title")}
            </h1>
            <p className="font-sans text-xl sm:text-2xl text-text-secondary max-w-xl leading-relaxed font-light">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>

        {/* ═══════════════════ SERVICE CARDS GRID ═══════════════════ */}
        <div className="px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={`/${locale}/services/${service.slug}`}
                    className="group relative block h-full"
                  >
                    <div className="relative h-full rounded-[1.5rem] border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                      
                      {/* Gradient Glow — appears on hover */}
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                        style={{
                          background: `radial-gradient(ellipse at 50% 0%, ${service.accentHex}12, transparent 70%)`,
                        }}
                      />

                      {/* Faint number watermark */}
                      <div className="absolute top-4 right-5 select-none pointer-events-none">
                        <span className="font-orbitron font-black text-[4rem] leading-none text-white/[0.02] group-hover:text-white/[0.05] transition-colors duration-700">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 p-7 lg:p-8 flex flex-col min-h-[260px]">
                        {/* Icon */}
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/[0.08] group-hover:border-white/[0.15] transition-all duration-500 group-hover:scale-110"
                          style={{ background: `${service.accentHex}10` }}
                        >
                          <Icon
                            className="w-7 h-7 transition-colors duration-500"
                            style={{ color: service.accentHex }}
                            strokeWidth={1.5}
                          />
                        </div>

                        {/* Title & Description */}
                        <h3 className="font-syne font-bold text-xl lg:text-2xl text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-500"
                          style={{
                            // @ts-ignore
                            "--tw-gradient-from": service.accentHex,
                            "--tw-gradient-to": "#ffffff",
                          } as React.CSSProperties}
                        >
                          {t(`items.${service.key}.title`)}
                        </h3>
                        <p className="font-sans text-sm lg:text-[15px] text-text-secondary leading-relaxed font-light flex-1">
                          {t(`items.${service.key}.desc`)}
                        </p>

                        {/* Explore CTA */}
                        <div className="mt-6 pt-5 border-t border-white/[0.05] flex items-center justify-between">
                          <span className="font-mono text-xs tracking-[0.2em] text-text-disabled uppercase group-hover:text-white/60 transition-colors duration-500">
                            {t("exploreCta")}
                          </span>
                          <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-500">
                            <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:rotate-0 -rotate-12 transition-all duration-500 rtl:rotate-[192deg] rtl:group-hover:rotate-180" />
                          </div>
                        </div>
                      </div>

                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}
