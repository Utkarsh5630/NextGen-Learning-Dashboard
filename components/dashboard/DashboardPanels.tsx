"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useDashboardNav } from "@/components/dashboard/DashboardNavContext";
import { HeroTile } from "@/components/dashboard/HeroTile";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { CourseGrid } from "@/components/dashboard/CourseGrid";
import { WinsPanel } from "@/components/dashboard/WinsPanel";
import type { DashboardData } from "@/lib/types";
import { springTransition } from "@/components/motion/spring";

interface DashboardPanelsProps {
  data: DashboardData;
}

export function DashboardPanels({ data }: DashboardPanelsProps) {
  const { activeTab } = useDashboardNav();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={springTransition}
        className="grid grid-cols-12 gap-4 md:gap-5 lg:gap-6"
      >
        {activeTab === "overview" && (
          <>
            <HeroTile profile={data.profile} />
            <ActivityTile activity={data.activity} />
            <CourseGrid courses={data.courses} />
          </>
        )}

        {activeTab === "courses" && (
          <CourseGrid courses={data.courses} className="mt-0" />
        )}

        {activeTab === "activity" && (
          <>
            <ActivityTile
              activity={data.activity}
              className="col-span-12 p-6 md:p-8"
            />
            <section className="col-span-12 rounded-3xl border border-white/10 bg-surface-raised p-6">
              <h2 className="text-lg font-semibold text-ink">Weekly summary</h2>
              <p className="mt-2 text-ink-muted">
                {data.activity.summary ??
                  "Your consistency is trending upward this week."}
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Metric label="Sessions" value={String(data.activity.week_total)} />
                <Metric
                  label="Consistency"
                  value={`${data.activity.consistency_percent}%`}
                />
                <Metric
                  label="Courses active"
                  value={String(data.profile.active_courses_count)}
                />
              </dl>
            </section>
          </>
        )}

        {activeTab === "wins" && <WinsPanel wins={data.wins} />}
      </motion.div>
    </AnimatePresence>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <dt className="text-xs font-medium uppercase tracking-wider text-ink-faint">
        {label}
      </dt>
      <dd className="mt-1 text-2xl font-semibold text-ink">{value}</dd>
    </div>
  );
}
