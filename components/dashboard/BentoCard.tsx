"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { springTransition } from "@/components/motion/spring";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function BentoCard({
  children,
  className = "",
  delay = 0,
}: BentoCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springTransition, delay }}
      whileHover={{
        scale: 1.015,
        boxShadow:
          "0 0 0 1px rgba(167,139,250,0.25), 0 12px 40px rgba(124,58,237,0.15)",
      }}
      className={`group relative bento-card overflow-hidden transition-[box-shadow,border-color] duration-300 hover:border-violet-500/30 ${className}`}
      style={{ willChange: "transform" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(59,130,246,0.08) 100%)",
        }}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </motion.article>
  );
}
