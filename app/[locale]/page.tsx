import HeroSection from "@/components/sections/HeroSection";
import BentoShowcase from "@/components/sections/BentoShowcase";
import ParallaxText from "@/components/sections/ParallaxText";
import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BentoShowcase />
      <ParallaxText />
      <TestimonialsCarousel />
    </main>
  );
}
