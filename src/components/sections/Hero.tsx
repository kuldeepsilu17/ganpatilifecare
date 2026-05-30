"use client";

import { HeroMediaBackground } from "@/components/hero/HeroMediaBackground";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden"
      aria-label="Hero"
    >
      {/* Premium Modern Hero with Animated Logo and Integrated Wave Divider */}
      <HeroMediaBackground />
    </section>
  );
}
