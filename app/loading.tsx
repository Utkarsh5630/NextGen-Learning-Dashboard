import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-surface px-4 py-6 md:px-8">
      <div
        className="grid grid-cols-12 gap-4 md:gap-6"
        aria-label="Loading dashboard"
        aria-busy
      >
        <Skeleton className="col-span-12 h-[280px] border border-white/5 lg:col-span-8" />
        <Skeleton className="col-span-12 h-[280px] border border-white/5 lg:col-span-4" />
        <div className="col-span-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="min-h-[220px] border border-white/5"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
