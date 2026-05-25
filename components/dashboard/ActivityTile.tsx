"use client";

import { BentoCard } from "@/components/dashboard/BentoCard";
import { motion } from "framer-motion";
import type { ActivityStats } from "@/lib/types";

interface ActivityTileProps {
  activity: ActivityStats;
  className?: string;
}

export function ActivityTile({
  activity,
  className = "col-span-12 p-6 lg:col-span-4",
}: ActivityTileProps) {
  const cells = activity.cells.slice(0, 35);

  return (
    <BentoCard className={className} delay={0.1}>
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">
            Activity
          </p>
          <h2 className="mt-1 text-xl font-semibold text-ink">
            Contribution pattern
          </h2>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">
            This week
          </p>
          <p className="mt-1 text-3xl font-semibold text-ink">
            {activity.week_total}
          </p>
        </div>
      </header>

      <div
        className="mt-6 grid grid-cols-7 gap-1.5 sm:gap-2"
        role="img"
        aria-label="Weekly activity heatmap"
      >
        {cells.map((intensity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.015 }}
            className="aspect-square rounded-md"
            style={{
              background: `rgba(167, 139, 250, ${Math.min(1, Math.max(0.15, intensity))})`,
            }}
          />
        ))}
      </div>

      <footer className="mt-6 flex items-end justify-between gap-4">
        <p className="max-w-[200px] text-sm leading-relaxed text-ink-muted">
          {activity.summary ??
            "Consistent sessions are pushing your baseline higher every day."}
        </p>
        <p className="text-3xl font-semibold text-violet-300">
          {activity.consistency_percent}%
        </p>
      </footer>
    </BentoCard>
  );
}
