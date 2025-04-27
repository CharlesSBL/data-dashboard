import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { BookList } from "@/components/dashboard/book-list"
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton"
import { BookFilters } from "@/components/dashboard/book-filters"

export default function BooksPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Books" text="View and filter all scraped books" />
      <BookFilters />
      <Suspense fallback={<DashboardSkeleton />}>
        <BookList />
      </Suspense>
    </DashboardShell>
  )
}
