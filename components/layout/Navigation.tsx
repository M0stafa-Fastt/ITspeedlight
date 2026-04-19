"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { key: "Home", path: `/${locale}` },
    { key: "About", path: `/${locale}/about` },
    { key: "Services", path: `/${locale}/services` },
    { key: "Team", path: `/${locale}/team` }
    // Removing abstract "Portfolio" for now layout as requested
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-[100] transition-colors duration-300 ${
        scrolled ? "bg-bg-void/80 backdrop-blur-[20px] border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-24 flex items-center justify-between">
        <Link href={`/${locale}`} className="font-orbitron font-bold text-2xl text-text-primary tracking-wide">
          ITspeedlight
        </Link>
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => {
            // Check if active
            const isActive = pathname === item.path;
            
            return (
              <Link
                key={item.key}
                href={item.path}
                className={`font-sans text-sm transition-colors ${
                  isActive ? "text-accent-cyan font-bold" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {t(item.key)}
              </Link>
            )
          })}
        </nav>

        {/* Locale switcher & CTA */}
        <div className="flex items-center gap-4">
          <Link 
            href={pathname.replace(`/${locale}`, `/${locale === 'en' ? 'ar' : 'en'}`)} 
            className="text-xs font-mono uppercase bg-white/5 border border-white/10 px-3 py-1 rounded hover:bg-white/10 transition-colors"
          >
            {locale === 'en' ? 'AR' : 'EN'}
          </Link>

          <Link href={`/${locale}/contact`}>
            <button className="bg-gradient-cta rounded-full py-3 px-6 text-sm font-medium font-sans hover:brightness-110 hover:scale-105 transition-all text-white">
              {t("Contact")}
            </button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
