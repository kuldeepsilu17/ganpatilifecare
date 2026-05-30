"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LOGO } from "@/lib/brand";
import "@/styles/Logo.css";

type LogoVariant = "full" | "mark";

const sizes: Record<LogoVariant, { width: number; height: number; className: string }> = {
  full: { width: 150, height: 200, className: "logo-size-full" },
  mark: { width: 90, height: 120, className: "logo-size-mark" },
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
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`logo-container ${className}`}
    >
      <motion.div
        animate={{
          y: [0, -4, 0],
          filter: [
            "drop-shadow(0px 4px 8px rgba(245, 130, 32, 0.15))",
            "drop-shadow(0px 8px 12px rgba(0, 146, 69, 0.25))",
            "drop-shadow(0px 4px 8px rgba(245, 130, 32, 0.15))",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="logo-glow"
      >
        <Image
          src={src}
          alt={alt ?? LOGO.alt.main}
          width={size.width}
          height={size.height}
          priority={priority}
          className={`logo-image ${size.className}`}
        />
      </motion.div>
    </motion.div>
  );
}
