"use client";

import type { Course } from "@/lib/types";
import { CourseCard } from "@/components/dashboard/CourseCard";

interface CourseGridProps {
  courses: Course[];
  className?: string;
}

export function CourseGrid({ courses, className = "" }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <section className="col-span-12 rounded-3xl border border-dashed border-white/15 bg-surface-raised p-8 text-center">
        <p className="text-ink-muted">
          No courses yet. Add rows to your Supabase{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-violet-200">
            courses
          </code>{" "}
          table.
        </p>
      </section>
    );
  }

  return (
    <section
      className={`col-span-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 ${className}`}
      aria-label="Active courses"
    >
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </section>
  );
}
