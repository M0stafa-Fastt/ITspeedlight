"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const footerRef = useRef<HTMLElement>(null);
  const colsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (colsRef.current) {
        const cols = colsRef.current.querySelectorAll(".footer-col");
        gsap.from(cols, {
          y: 40, opacity: 0,
          stagger: 0.1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const quickLinks = [
    { label: "Home", path: `/${locale}` },
    { label: "About", path: `/${locale}/about` },
    { label: "Services", path: `/${locale}/services` },
    { label: "Contact", path: `/${locale}/contact` },
    { label: "Blogs", path: `/${locale}/blogs` },
  ];

  const serviceLinks = [
    "Web Development",
    "Luxury Branding",
    "Social Media",
    "Technical SEO",
    "Performance Marketing",
  ];

  return (
    <footer ref={footerRef} className="relative border-t border-white/5 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-6 pt-20 pb-10">
        <div ref={colsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand column */}
          <div className="footer-col lg:col-span-1">
            <Link href={`/${locale}`} className="group flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-10 h-10 bg-white text-bg-void [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] flex items-center justify-center transition-all duration-700 group-hover:bg-accent-blue group-hover:text-white">
                  <span className="relative z-10 font-orbitron font-black text-sm">S</span>
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-orbitron font-black text-xl text-white tracking-[-0.05em]">
                  IT<span className="text-accent-blue">speed</span>light
                </span>
              </div>
            </Link>
            <p className="font-sans text-text-secondary text-sm leading-relaxed mt-4">
              {t("description")}
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {["X", "In", "Ig", "Fb"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary text-xs font-mono hover:bg-accent-cyan/10 hover:border-accent-cyan/30 hover:text-accent-cyan transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="font-syne font-bold text-white text-sm uppercase tracking-wider mb-6">
              {t("quickLinks")}
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.path}
                    className="font-sans text-sm text-text-secondary hover:text-accent-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="font-syne font-bold text-white text-sm uppercase tracking-wider mb-6">
              {t("services")}
            </h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <span className="font-sans text-sm text-text-secondary hover:text-accent-cyan transition-colors cursor-pointer">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col">
            <h4 className="font-syne font-bold text-white text-sm uppercase tracking-wider mb-6">
              {t("newsletter")}
            </h4>
            <p className="font-sans text-text-secondary text-sm mb-4">
              {t("newsletterText")}
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-text-disabled focus:outline-none focus:border-accent-cyan/50 transition-colors"
              />
              <button
                type="submit"
                className="bg-gradient-cta rounded-xl px-5 py-3 text-white text-sm font-semibold hover:brightness-110 transition-all flex-shrink-0"
              >
                {t("subscribe")}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-text-disabled text-xs">
            {t("copyright")}
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-sans text-text-disabled text-xs hover:text-text-secondary transition-colors">
              {t("privacy")}
            </a>
            <a href="#" className="font-sans text-text-disabled text-xs hover:text-text-secondary transition-colors">
              {t("terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
