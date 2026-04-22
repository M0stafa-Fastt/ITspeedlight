import type { Metadata } from "next";
import { Orbitron, Syne, DM_Sans, Cairo, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ITspeedlight — Premium Web & Marketing Solutions",
  description:
    "ITspeedlight is a premium futuristic digital agency delivering world-class web development, branding, SEO, and marketing strategies.",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="dark">
      <body
        className={`${orbitron.variable} ${syne.variable} ${dmSans.variable} ${cairo.variable} ${jetbrainsMono.variable} font-sans antialiased bg-bg-void text-text-primary selection:bg-accent-cyan/30 selection:text-accent-cyan`}
      >
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <Navigation />
            {children}
            <Footer />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
