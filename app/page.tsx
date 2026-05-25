import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardPanels } from "@/components/dashboard/DashboardPanels";
import { getDashboardData } from "@/lib/dashboard";

export default async function HomePage() {
  const data = await getDashboardData();

  return (
    <DashboardShell profile={data.profile}>
      <section aria-label="Student dashboard">
        <DashboardPanels data={data} />
      </section>
    </DashboardShell>
  );
}
