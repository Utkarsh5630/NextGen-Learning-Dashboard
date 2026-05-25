"use client";

import { motion } from "framer-motion";
import { Sparkles, Trophy } from "lucide-react";
import { BentoCard } from "@/components/dashboard/BentoCard";
import type { Win } from "@/lib/types";
import { springTransition } from "@/components/motion/spring";

interface WinsPanelProps {
  wins: Win[];
}

export function WinsPanel({ wins }: WinsPanelProps) {
  if (wins.length === 0) {
    return (
      <section className="col-span-12" aria-label="Learning wins">
        <BentoCard className="p-8 text-center" delay={0}>
          <Trophy className="mx-auto h-10 w-10 text-violet-400" aria-hidden />
          <h2 className="mt-4 text-xl font-semibold text-ink">No wins yet</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Add rows to the <code className="text-violet-300">wins</code> table in
            Supabase, or run the updated seed script.
          </p>
        </BentoCard>
      </section>
    );
  }

  return (
    <section
      className="col-span-12 grid grid-cols-1 gap-4 sm:grid-cols-2"
      aria-label="Learning wins"
    >
      {wins.map((win, index) => (
        <motion.article
          key={win.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: index * 0.08 }}
          whileHover={{ scale: 1.02 }}
          className="bento-card p-5"
          style={{ willChange: "transform" }}
        >
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-violet-500/15 p-2.5">
              <Sparkles className="h-5 w-5 text-violet-300" aria-hidden />
            </div>
            <div>
              <h3 className="font-semibold text-ink">{win.title}</h3>
              {win.description && (
                <p className="mt-1 text-sm text-ink-muted">{win.description}</p>
              )}
              <time
                className="mt-3 block text-xs text-ink-faint"
                dateTime={win.achieved_at}
              >
                {new Date(win.achieved_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
          </div>
        </motion.article>
      ))}
    </section>
  );
}
