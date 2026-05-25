"use client";

import type { ReactNode } from "react";
import { DashboardNavProvider } from "@/components/dashboard/DashboardNavContext";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { Sidebar } from "@/components/dashboard/Sidebar";
import type { StudentProfile } from "@/lib/types";

interface DashboardShellProps {
  children: ReactNode;
  profile: StudentProfile;
}

export function DashboardShell({ children, profile }: DashboardShellProps) {
  return (
    <DashboardNavProvider>
      <div className="flex min-h-screen">
        <Sidebar profile={profile} />

        <div className="flex min-w-0 flex-1 flex-col">
          <main
            id="dashboard-main"
            className="flex-1 overflow-y-auto px-4 py-5 pb-24 md:px-6 md:py-6 md:pb-6 lg:px-8"
          >
            {children}
          </main>
          <MobileNav />
        </div>
      </div>
    </DashboardNavProvider>
  );
}
