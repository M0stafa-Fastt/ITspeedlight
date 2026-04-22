"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { BackgroundEffect } from "@/components/ui/BackgroundEffect";
import { getServiceBySlug } from "@/lib/servicesData";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = getServiceBySlug(slug);
  const t = useTranslations("Services");
  const locale = useLocale();

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  // Get features — falls back gracefully
  const featureKeys = ["f1", "f2", "f3", "f4"];

  return (
    <main className="bg-bg-void relative overflow-clip font-sans text-balance pb-32">
      <BackgroundEffect />

      <div className="max-w-[1440px] mx-auto relative z-10">

        {/* ═══════════════════ BACK LINK ═══════════════════ */}
        <div className="px-6 lg:px-12 pt-28 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-3 text-text-disabled hover:text-white transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300 rtl:rotate-180 rtl:group-hover:translate-x-1" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase">
                {t("backToServices")}
              </span>
            </Link>
          </motion.div>
        </div>

        {/* ═══════════════════ HERO SECTION ═══════════════════ */}
        <section className="min-h-[60vh] lg:min-h-[70vh] flex flex-col lg:flex-row items-center gap-12 lg:gap-20 px-6 lg:px-12 pt-12 pb-16 lg:pb-24 relative">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 max-w-2xl relative z-10"
          >
            {/* Segment Marker */}
            <div className="inline-flex items-center gap-4 mb-8">
              <span
                className="w-3 h-3 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                style={{ background: service.accentHex }}
              />
              <span className="font-mono text-sm tracking-[0.3em] text-text-disabled uppercase">
                {t("detailBadge")}
              </span>
            </div>

            <h1 className="font-orbitron font-black text-5xl sm:text-6xl lg:text-[5rem] xl:text-[5.5rem] tracking-tight leading-[1.05] text-white mb-8 drop-shadow-sm">
              {t(`items.${service.key}.title`)}
            </h1>

            <p className="font-sans text-xl sm:text-2xl text-text-secondary leading-relaxed font-light">
              {t(`items.${service.key}.longDesc`)}
            </p>
          </motion.div>

          {/* Visual / Icon Art */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative flex items-center justify-center w-full max-w-[280px] lg:max-w-[380px] aspect-square"
          >
            {/* Background glow */}
            <div
              className="absolute inset-0 rounded-full opacity-[0.08] blur-[80px]"
              style={{ background: `linear-gradient(135deg, ${service.accentHex}, transparent)` }}
            />

            {/* Orbital rings */}
            <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-8 rounded-full border border-white/10 border-dashed animate-[spin_40s_linear_infinite_reverse]" />

            {/* Core glass sphere */}
            <div className="w-40 h-40 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full border border-white/10 bg-white/[0.01] backdrop-blur-[30px] shadow-[0_0_40px_rgba(0,0,0,0.5),inset_0_2px_15px_rgba(255,255,255,0.05)] flex items-center justify-center relative overflow-hidden">
              {/* Inner gradient glow */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/2 opacity-15 blur-xl"
                style={{ background: `linear-gradient(to top, ${service.accentHex}, transparent)` }}
              />
              <Icon
                className="w-16 h-16 lg:w-24 lg:h-24 xl:w-28 xl:h-28 text-white z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                strokeWidth={1.5}
              />
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════ FEATURES GRID ═══════════════════ */}
        <section className="px-6 lg:px-12 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <span
                className="w-3 h-3 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                style={{ background: service.accentHex }}
              />
              <span className="font-mono text-sm tracking-[0.3em] text-text-disabled uppercase">
                {t("featuresTitle")}
              </span>
            </div>
            <h2 className="font-orbitron font-bold text-3xl lg:text-5xl text-white">
              {t("featuresHeading")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {featureKeys.map((fKey, i) => (
              <motion.div
                key={fKey}
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-[1.5rem] border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-7 lg:p-8 overflow-hidden hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 30% 0%, ${service.accentHex}08, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 flex gap-5">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2
                      className="w-6 h-6 transition-colors duration-500"
                      style={{ color: service.accentHex }}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-lg lg:text-xl text-white mb-2">
                      {t(`items.${service.key}.features.${fKey}.title`)}
                    </h3>
                    <p className="font-sans text-sm lg:text-[15px] text-text-secondary leading-relaxed font-light">
                      {t(`items.${service.key}.features.${fKey}.text`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════ CTA SECTION ═══════════════════ */}
        <section className="px-6 lg:px-12 py-16 lg:py-24 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2.5rem] overflow-hidden border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-transparent p-10 lg:p-20 text-center"
          >
            {/* Background accent glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] opacity-[0.06] blur-[100px] rounded-full pointer-events-none"
              style={{ background: service.accentHex }}
            />

            <div className="relative z-10">
              <h2 className="font-orbitron font-black text-3xl lg:text-6xl text-white mb-6">
                {t("ctaTitle")}
              </h2>
              <p className="font-sans text-lg lg:text-xl text-text-secondary max-w-2xl mx-auto mb-10 font-light">
                {t("ctaSubtitle")}
              </p>

              <Link href={`/${locale}/contact`} className="inline-block group">
                <div className="relative px-10 py-5 bg-white text-black font-syne font-bold text-lg rounded-full flex items-center gap-3 transition-transform group-hover:scale-105 active:scale-95 duration-300">
                  {t("ctaButton")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </div>
              </Link>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}
