"use client";

import { ReactNode } from "react";
import "@/styles/GlassCard.css";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div className={`glass-card ${className}`}>
      {/* Gradient border glow effect */}
      <div className="glass-card-glow" />

      {children}
    </div>
  );
}
