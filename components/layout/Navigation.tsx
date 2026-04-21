"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!menuOverlayRef.current || !menuLinksRef.current) return;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menuOverlayRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
      const links = menuLinksRef.current.querySelectorAll(".mobile-link");
      gsap.fromTo(links, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power3.out", delay: 0.2 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(menuOverlayRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [menuOpen]);

  const navItems = [
    { key: "Home", path: `/${locale}` },
    { key: "Services", path: `/${locale}/services` },
    { key: "About", path: `/${locale}/about` },
    { key: "Contact", path: `/${locale}/contact` },
    { key: "Blogs", path: `/${locale}/blogs` },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          scrolled
            ? "py-6 px-4"
            : "py-12 px-4"
        }`}
      >
        <div 
          className={`max-w-[1000px] mx-auto flex items-center justify-between px-8 py-2.5 transition-all duration-500 rounded-full border border-white/10 ${
            scrolled 
              ? "bg-black/80 backdrop-blur-xl shadow-2xl shadow-black/20" 
              : "bg-white/5 backdrop-blur-md"
          }`}
        >
          {/* Text-Only Logo */}
          <Link href={`/${locale}`} className="group flex items-center">
            <span className="font-orbitron font-black text-lg md:text-xl tracking-[-0.08em] text-white transition-colors duration-500">
              IT<span className="text-accent-blue group-hover:text-white transition-colors transition-duration-500">SPEED</span>LIGHT<span className="text-accent-blue transition-colors">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.key === "Home" && pathname === `/${locale}`);
              return (
                <Link
                  key={item.key}
                  href={item.path}
                  className={`relative px-4 py-1.5 font-sans text-[11px] font-bold uppercase tracking-wider transition-all duration-300 rounded-full ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {t(item.key)}
                  {isActive && (
                    <motion.div
                      layoutId="navTab"
                      className="absolute inset-0 -z-10 rounded-full bg-white/10"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Row */}
          <div className="flex items-center gap-3">
            <Link
              href={pathname.replace(`/${locale}`, `/${locale === "en" ? "ar" : "en"}`)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all duration-300"
            >
              <Globe className="w-3 h-3 text-accent-blue" />
              <span className="text-[9px] font-mono font-black uppercase tracking-widest">
                {locale === "en" ? "AR" : "EN"}
              </span>
            </Link>

            <Link href={`/${locale}/contact`} className="hidden sm:block">
              <button className="px-6 py-2 rounded-full font-sans font-black text-[10px] uppercase tracking-widest transition-all duration-500 transform hover:scale-105 bg-white text-bg-void hover:bg-accent-blue hover:text-white">
                {t("Contact")}
              </button>
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1 p-2 group"
            >
              <div className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
              <div className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Modern Top-Down Mobile Menu */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 z-[90] bg-black text-white opacity-0 -translate-y-full pointer-events-none transition-all duration-500 overflow-hidden"
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
      >
        <div className="absolute top-0 right-0 w-full h-full bg-accent-blue/5 -skew-y-12 translate-y-1/2" />
        
        <div ref={menuLinksRef} className="relative z-10 h-full flex flex-col justify-center px-12 gap-8">
          {navItems.map((item, idx) => (
            <Link
              key={item.key}
              href={item.path}
              onClick={() => setMenuOpen(false)}
              className="mobile-link flex items-baseline gap-4 group"
            >
              <span className="font-mono text-sm text-accent-blue opacity-50">0{idx + 1}</span>
              <span className={`font-orbitron text-5xl font-black tracking-tighter transition-all group-hover:translate-x-6 ${pathname === item.path ? "text-accent-blue" : "text-white"}`}>
                {t(item.key)}
              </span>
            </Link>
          ))}
          
          <div className="mobile-link mt-12 pt-12 border-t border-white/5">
             <Link 
               href={pathname.replace(`/${locale}`, `/${locale === "en" ? "ar" : "en"}`)}
               onClick={() => setMenuOpen(false)}
               className="flex items-center gap-4 text-white font-mono font-bold"
             >
                <Globe className="w-6 h-6 text-accent-blue" />
                {locale === "en" ? "SWITCH TO ARABIC" : "التغيير للإنجليزية"}
             </Link>
          </div>
        </div>
      </div>
    </>
  );
}
