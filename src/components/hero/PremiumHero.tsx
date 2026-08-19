"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ParticleBackground } from "./ParticleBackground";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { Logo } from "@/components/brand/Logo";
import "@/styles/Hero.css";

export function PremiumHero() {
  const logoRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Floating animation
  useEffect(() => {
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.005;
      if (logoRef.current) {
        const floatY = Math.sin(time) * 15;
        const scale = 1 + Math.sin(time * 0.5) * 0.02;
        logoRef.current.style.transform = `translateY(${floatY}px) scale(${scale})`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Glow effect following mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="hero-section">
      {/* Background Gradient */}
      <div className="hero-background" />

      {/* Orange Glow in bottom-right corner */}
      <div className="hero-orange-glow" />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Animated Glow Orb (follows mouse slightly) */}
      <div
        className="hero-glow-orb"
        style={{
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
        }}
      />

      {/* Content Container */}
      <div className="hero-content">
        {/* Animated Logo */}
        <div ref={logoRef} className="hero-logo-container">
          {/* Glowing Circle Background */}
          <div className="hero-logo-circle">
            {/* Logo Component */}
            <Logo variant="mark" className="hero-logo-image-scale" />
          </div>

          {/* Rotating Glow Ring */}
          <div className="hero-logo-ring" />
        </div>

        {/* Small Brand Text */}
        <p className="hero-brand-text">GANPATI LIFECARE</p>

        {/* Main Heading */}
        <h1 className="hero-title">
          Orthopedic, Surgical &amp; <span className="hero-title-accent">Hospital Supplies</span>
        </h1>

        {/* Subheading */}
        <p className="hero-subtitle">
          Quality orthopedic, surgical, and healthcare supplies for hospitals, clinics and healthcare professionals in Rajasthan.
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons">
          <Link href="#products" className="hero-btn hero-btn-primary">
            View Products
          </Link>
          <Link href="#contact" className="hero-btn hero-btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator">
        <div className="hero-scroll-content">
          <p className="hero-scroll-text">Scroll to explore</p>
          <svg className="hero-scroll-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Wave Divider at Bottom */}
      <div className="hero-wave-divider">
        <WaveDivider className="text-white/15" />
      </div>
    </section>
  );
}
