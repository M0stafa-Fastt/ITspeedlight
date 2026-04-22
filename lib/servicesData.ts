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
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export interface ServiceDef {
  slug: string;
  key: string;          // i18n key inside Services.items.*
  icon: LucideIcon;
  color: string;        // tailwind gradient classes
  accentHex: string;    // raw hex for dynamic styles
}

export const services: ServiceDef[] = [
  {
    slug: "web-development",
    key: "web",
    icon: Code2,
    color: "from-[#00F5FF] to-blue-500",
    accentHex: "#00F5FF",
  },
  {
    slug: "it-consulting",
    key: "itConsulting",
    icon: MonitorSmartphone,
    color: "from-[#00F5FF] to-[#3D5AFE]",
    accentHex: "#3D5AFE",
  },
  {
    slug: "seo",
    key: "seo",
    icon: Search,
    color: "from-[#E056FD] to-fuchsia-500",
    accentHex: "#E056FD",
  },
  {
    slug: "cloud-solutions",
    key: "cloud",
    icon: CloudCog,
    color: "from-sky-400 to-blue-600",
    accentHex: "#38bdf8",
  },
  {
    slug: "security",
    key: "security",
    icon: ShieldCheck,
    color: "from-rose-500 to-red-600",
    accentHex: "#f43f5e",
  },
  {
    slug: "network-consulting",
    key: "network",
    icon: Network,
    color: "from-emerald-400 to-teal-500",
    accentHex: "#34d399",
  },
  {
    slug: "light-current",
    key: "lightCurrent",
    icon: Zap,
    color: "from-amber-400 to-orange-500",
    accentHex: "#fbbf24",
  },
  {
    slug: "email-marketing",
    key: "email",
    icon: Mail,
    color: "from-yellow-400 to-amber-600",
    accentHex: "#facc15",
  },
  {
    slug: "social-media",
    key: "social",
    icon: Smartphone,
    color: "from-pink-500 to-rose-500",
    accentHex: "#ec4899",
  },
  {
    slug: "career",
    key: "career",
    icon: Briefcase,
    color: "from-indigo-400 to-purple-600",
    accentHex: "#818cf8",
  },
];

export function getServiceBySlug(slug: string): ServiceDef | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
