"use client";

import Image from "next/image";
import { LOGO } from "@/lib/brand";
import "@/styles/Logo.css";

type LogoVariant = "full" | "mark";

const sizes: Record<LogoVariant, { width: number; height: number; className: string }> = {
  full: { width: 300, height: 400, className: "logo-size-full" },
  mark: { width: 300, height: 400, className: "logo-size-mark" },
};

export function Logo({
  variant = "full",
  alt,
  priority = false,
  className = "",
}: {
  variant?: LogoVariant;
  alt?: string;
  priority?: boolean;
  className?: string;
}) {
  const src = variant === "mark" ? LOGO.mark : LOGO.full;
  const size = sizes[variant];

  return (
    <div className={`logo-container ${className}`}>
      <Image
        src={src}
        alt={alt ?? LOGO.alt.main}
        width={size.width}
        height={size.height}
        priority={priority}
        className={`logo-image ${size.className}`}
      />
    </div>
  );
}
