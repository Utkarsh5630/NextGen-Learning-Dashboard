"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  Home,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useDashboardNav } from "@/components/dashboard/DashboardNavContext";
import type { NavItemId } from "@/lib/types";

const NAV_ITEMS: { id: NavItemId; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "activity", label: "Activity", icon: BarChart3 },
  { id: "wins", label: "Wins", icon: Sparkles },
];

export function MobileNav() {
  const { activeTab, setActiveTab } = useDashboardNav();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-surface-raised/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md md:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <li key={item.id} className="flex-1">
              <button
                type="button"
                onClick={() => setActiveTab(item.id)}
                aria-current={isActive ? "page" : undefined}
                className="relative mx-auto flex w-full max-w-[4.5rem] flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-medium"
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-highlight"
                    className="absolute inset-0 rounded-xl bg-violet-500/15"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 28,
                    }}
                  />
                )}
                <Icon
                  className={`relative z-10 h-5 w-5 ${
                    isActive ? "text-violet-300" : "text-ink-muted"
                  }`}
                  aria-hidden
                />
                <span
                  className={`relative z-10 ${
                    isActive ? "text-violet-200" : "text-ink-faint"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
