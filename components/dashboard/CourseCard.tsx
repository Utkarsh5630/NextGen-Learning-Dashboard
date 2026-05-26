"use client";

import { motion } from "framer-motion";
import type { Course } from "@/lib/types";
import { resolveCourseAccent, resolveCourseIcon } from "@/lib/icons";
import { springTransition } from "@/components/motion/spring";

interface CourseCardProps {
  course: Course;
  index: number;
}

export function CourseCard({ course, index }: CourseCardProps) {
  const Icon = resolveCourseIcon(course.icon_name);
  const accent = resolveCourseAccent(course.icon_name);
  const progress = Math.min(100, Math.max(0, course.progress));

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springTransition, delay: 0.2 + index * 0.08 }}

      whileHover={{
        scale: 1.04,
        y: -6,
        boxShadow:
          "0 25px 80px -25px rgba(139,92,246,0.45)",
      }}

      whileTap={{ scale: 0.98 }}

      className="
        group relative min-h-[220px] overflow-hidden rounded-3xl
        border border-white/10 bg-surface-raised p-5 shadow-card

        transition-all duration-300 ease-out
        hover:border-violet-400/40
      "

      style={{ willChange: "transform" }}
    >
      {/* Glow background (NEW) */}
      <div
        className="
          absolute inset-0 opacity-0
          bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-500/10
          transition-opacity duration-300
          group-hover:opacity-100
          pointer-events-none
        "
      />

      {/* animated top line */}
      <div className="absolute top-0 left-0 h-[2px] w-0 bg-violet-400 transition-all duration-300 group-hover:w-full" />

      {/* texture layer */}
      <div className="mesh-gradient grain-texture absolute inset-0" aria-hidden />

      <div className="relative z-10">
        {/* header */}
        <div className="mb-5 flex items-center justify-between">
          <div
            className="
              rounded-2xl p-2.5
              transition-transform duration-300
              group-hover:scale-110
            "
            style={{ backgroundColor: `${accent}22` }}
          >
            <Icon
              className="
                h-5 w-5 transition-transform duration-300
                group-hover:scale-110
              "
              style={{ color: accent }}
              aria-hidden
            />
          </div>

          <span
            className="
              text-sm font-medium tabular-nums
              transition-transform duration-300
              group-hover:scale-110
            "
            style={{ color: accent }}
          >
            {progress}%
          </span>
        </div>

        {/* title */}
        <h3
          className="
            mb-5 text-lg font-semibold leading-snug text-ink

            transition-all duration-300
            group-hover:translate-x-1
          "
        >
          {course.title}
        </h3>

        {/* progress */}
        <div
          className="h-2 overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${course.title} progress`}
        >
          <motion.div
            className="h-full w-full origin-left rounded-full"
            style={{ backgroundColor: accent }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{
              duration: 0.9,
              delay: 0.25 + index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>
      </div>
    </motion.article>
  );
}