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
        scale: 1.02,
        boxShadow:
          "0 0 0 1px rgba(167,139,250,0.25), 0 12px 40px rgba(124,58,237,0.15)",
      }}
      className="group relative min-h-[220px] overflow-hidden rounded-3xl border border-white/10 bg-surface-raised p-5 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-violet-500/30"
      style={{ willChange: "transform" }}
    >
      <div className="mesh-gradient grain-texture absolute inset-0" aria-hidden />

      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between">
          <div
            className="rounded-2xl p-2.5"
            style={{ backgroundColor: `${accent}22` }}
          >
            <Icon className="h-5 w-5" style={{ color: accent }} aria-hidden />
          </div>
          <span
            className="text-sm font-medium tabular-nums"
            style={{ color: accent }}
          >
            {progress}%
          </span>
        </div>

        <h3 className="mb-5 text-lg font-semibold leading-snug text-ink">
          {course.title}
        </h3>

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
