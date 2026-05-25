"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  GraduationCap,
  Home,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useDashboardNav } from "@/components/dashboard/DashboardNavContext";
import type { NavItemId, StudentProfile } from "@/lib/types";

interface NavItem {
  id: NavItemId;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "activity", label: "Activity", icon: BarChart3 },
  { id: "wins", label: "Wins", icon: Sparkles },
];

interface SidebarProps {
  profile: StudentProfile;
}

export function Sidebar({ profile }: SidebarProps) {
  const { activeTab, setActiveTab } = useDashboardNav();

  return (
    <aside
      className="hidden min-h-screen w-[72px] shrink-0 flex-col border-r border-white/10 bg-surface-raised/80 backdrop-blur-md md:flex lg:w-60"
      aria-label="Primary navigation"
    >
      <div className="p-3 lg:p-5">
        <div className="mb-8 flex items-center justify-center gap-3 lg:justify-start">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-300">
            <GraduationCap className="h-5 w-5" aria-hidden />
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-ink">NextGen</p>
            <p className="text-xs text-ink-faint">Learning</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                aria-current={isActive ? "page" : undefined}
                title={item.label}
                className={`relative flex items-center justify-center gap-3 rounded-xl py-2.5 text-sm font-medium transition-colors lg:justify-start lg:px-3 ${
                  isActive ? "text-violet-200" : "text-ink-muted hover:text-ink"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-highlight"
                    className="absolute inset-0 rounded-xl bg-violet-500/15"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 28,
                    }}
                  />
                )}
                <Icon
                  className={`relative z-10 h-5 w-5 shrink-0 ${
                    isActive ? "text-violet-300" : ""
                  }`}
                  aria-hidden
                />
                <span className="relative z-10 hidden lg:inline">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto hidden p-5 lg:block">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">
            Momentum streak
          </p>
          <p className="mt-1 text-2xl font-semibold text-ink">
            {profile.streak_days} days
          </p>
        </div>
      </div>
    </aside>
  );
}
