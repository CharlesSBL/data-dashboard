import { Suspense } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { BookStats } from "@/components/dashboard/book-stats";
import { BookCharts } from "@/components/dashboard/book-charts";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { ScrapeTrigger } from "@/components/dashboard/scrape-trigger";

// app/page.tsx
export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Overview of your book scraping data"
      >
        <ScrapeTrigger />
      </DashboardHeader>
      <Suspense fallback={<DashboardSkeleton />}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <BookStats />
        </div>
      </Suspense>
    </DashboardShell>
  );
}
