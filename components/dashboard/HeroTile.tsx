"use client";

import { Flame, Zap } from "lucide-react";
import { BentoCard } from "@/components/dashboard/BentoCard";
import type { StudentProfile } from "@/lib/types";
import { useEffect, useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface HeroTileProps {
  profile: StudentProfile;
}

const quotes = [
  "Small progress every day leads to big results.",
  "Discipline creates freedom.",
  "Learn. Build. Repeat.",
  "Consistency beats motivation.",
];

export function HeroTile({ profile }: HeroTileProps) {
  const [xp, setXp] = useState(0);
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 25;
      setXp(i);
      if (i >= profile.focus_score * 10) clearInterval(interval);
    }, 25);
  }, [profile.focus_score]);

  const chartData = [
    { day: "Mon", val: 20 },
    { day: "Tue", val: 40 },
    { day: "Wed", val: 35 },
    { day: "Thu", val: 70 },
    { day: "Fri", val: 90 },
  ];

  return (
    <BentoCard
      delay={0}
      className="
        group relative col-span-12 p-6 md:p-8 lg:col-span-8

        transition-all duration-300 ease-out
        hover:-translate-y-2
        hover:scale-[1.015]
        hover:shadow-[0_30px_90px_-25px_rgba(139,92,246,0.45)]
      "
    >
      {/* Glow background */}
      <div
        className="
          absolute inset-0 opacity-0
          bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-500/10
          transition-opacity duration-300
          group-hover:opacity-100
          pointer-events-none
        "
      />

      {/* XP badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 text-xs text-violet-200 backdrop-blur">
        <Zap className="h-3.5 w-3.5" />
        XP {xp}
      </div>

      {/* Header */}
      <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-violet-200">
        <Flame className="h-3.5 w-3.5" />
        Daily focus
      </p>

      {/* Title */}
      <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:text-5xl">
        Welcome back, {profile.name}
      </h1>

      {/* subtitle */}
      <p className="mt-3 max-w-xl text-base text-ink-muted">
        {profile.tagline ??
          "Continue your learning journey and complete your next milestone today."}
      </p>

      {/* STATS (STRONG HOVER) */}
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

      {/* Bottom section */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Quote */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/10 hover:shadow-lg">
          <p className="text-xs uppercase tracking-wider text-ink-faint">
            Motivation
          </p>
          <p className="mt-2 text-sm text-ink-muted italic">"{quote}"</p>
        </div>

        {/* Mini chart */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/10 hover:shadow-lg">
          <p className="mb-2 text-xs uppercase tracking-wider text-ink-faint">
            Weekly XP
          </p>

          <div className="h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line
                  type="monotone"
                  dataKey="val"
                  stroke="#a78bfa"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

/* =========================
   STRONG STAT CARD
========================= */

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
      className={`
        relative overflow-hidden rounded-2xl border p-4 cursor-pointer

        transition-all duration-300 ease-out
        hover:-translate-y-2
        hover:scale-[1.04]
        hover:shadow-[0_25px_60px_-20px_rgba(139,92,246,0.45)]
        hover:border-violet-400/50
        hover:bg-white/10

        active:scale-[0.98]
        group

        ${highlight
          ? "border-violet-500/25 bg-violet-500/10"
          : "border-white/10 bg-white/5"}
      `}
    >
      {/* glow layer */}
      <div
        className="
          absolute inset-0 opacity-0
          bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-500/10
          transition-opacity duration-300
          group-hover:opacity-100
          pointer-events-none
        "
      />

      {/* content */}
      <div className="relative z-10">
        <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">
          {label}
        </p>
        <p className="mt-1 text-2xl font-semibold text-ink">
          {value}
        </p>
      </div>

      {/* top line animation */}
      <div className="absolute top-0 left-0 h-[2px] w-0 bg-violet-400 transition-all duration-300 group-hover:w-full" />
    </div>
  );
}