"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BookIcon, LayoutDashboardIcon, ListIcon } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      icon: LayoutDashboardIcon,
      label: "Dashboard",
    },
    {
      href: "/books",
      icon: BookIcon,
      label: "Books",
    },
    {
      href: "/categories",
      icon: ListIcon,
      label: "Categories",
    },
  ]

  return (
    <div className="flex h-full w-64 flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BookIcon className="h-6 w-6" />
          <span>Book Scraper</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "flex h-9 items-center justify-start px-3",
                pathname === route.href ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/50",
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}
