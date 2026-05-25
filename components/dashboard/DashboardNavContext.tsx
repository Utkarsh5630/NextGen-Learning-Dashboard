"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { NavItemId } from "@/lib/types";

interface DashboardNavContextValue {
  activeTab: NavItemId;
  setActiveTab: (tab: NavItemId) => void;
}

const DashboardNavContext = createContext<DashboardNavContextValue | null>(
  null
);

export function DashboardNavProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTabState] = useState<NavItemId>("overview");

  const setActiveTab = useCallback((tab: NavItemId) => {
    setActiveTabState(tab);
    const main = document.getElementById("dashboard-main");
    main?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <DashboardNavContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </DashboardNavContext.Provider>
  );
}

export function useDashboardNav() {
  const context = useContext(DashboardNavContext);
  if (!context) {
    throw new Error("useDashboardNav must be used within DashboardNavProvider");
  }
  return context;
}
