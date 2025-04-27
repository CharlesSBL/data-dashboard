import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton className="h-[125px] rounded-md" />
      <Skeleton className="h-[125px] rounded-md" />
      <Skeleton className="h-[125px] rounded-md" />
      <Skeleton className="h-[125px] rounded-md" />
      <Skeleton className="col-span-4 h-[350px] rounded-md" />
    </div>
  )
}
