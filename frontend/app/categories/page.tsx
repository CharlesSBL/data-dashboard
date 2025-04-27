import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { CategoryBreakdown } from "@/components/dashboard/category-breakdown"
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton"

export default function CategoriesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Categories" text="Book distribution by category" />
      <Suspense fallback={<DashboardSkeleton />}>
        <CategoryBreakdown />
      </Suspense>
    </DashboardShell>
  )
}
