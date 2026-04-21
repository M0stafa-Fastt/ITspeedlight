import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--bg-void)",
        foreground: "var(--text-primary)",
        "bg-void": "var(--bg-void)",
        "bg-surface": "var(--bg-surface)",
        "bg-card": "var(--bg-card)",
        "bg-border": "var(--bg-border)",
        "accent-blue": "var(--accent-blue)",
        "accent-indigo": "var(--accent-indigo)",
        "accent-cyan": "var(--accent-cyan)",
        "accent-gold": "var(--accent-gold)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-disabled": "var(--text-disabled)",
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
        cairo: ["var(--font-cairo)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-blue) 100%)",
        "gradient-cta": "linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-indigo) 100%)",
        "gradient-glow": "radial-gradient(circle, rgba(61,90,254,0.15) 0%, transparent 70%)",
        "gradient-card": "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0))",
      },
      boxShadow: {
        "glass": "0 8px 32px rgba(0, 0, 0, 0.4)",
      }
    },
  },
  plugins: [],
};
export default config;
