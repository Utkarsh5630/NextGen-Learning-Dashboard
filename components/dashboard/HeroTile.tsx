"use client";

import { Flame } from "lucide-react";
import { BentoCard } from "@/components/dashboard/BentoCard";
import type { StudentProfile } from "@/lib/types";

interface HeroTileProps {
  profile: StudentProfile;
}

export function HeroTile({ profile }: HeroTileProps) {
  return (
    <BentoCard
      className="col-span-12 p-6 md:p-8 lg:col-span-8"
      delay={0}
    >
      <div className="mesh-gradient absolute inset-0 opacity-80" aria-hidden />

      <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-violet-200">
        <Flame className="h-3.5 w-3.5" aria-hidden />
        Daily focus
      </p>

      <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:text-5xl">
        Welcome back, {profile.name}
      </h1>

      <p className="mt-3 max-w-xl text-base text-ink-muted">
        {profile.tagline ??
          "Continue your learning journey and complete your next milestone today."}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Stat
          label="Streak"
          value={`${profile.streak_days} days`}
          highlight
        />
        <Stat label="Focus score" value={`${profile.focus_score}%`} />
        <Stat
          label="Active courses"
          value={String(profile.active_courses_count)}
        />
      </div>
    </BentoCard>
  );
}

function Stat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight
          ? "border-violet-500/25 bg-violet-500/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}
