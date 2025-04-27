"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { fetchFromBackend } from "@/app/api/proxy"

export function BookFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const currentCategory = searchParams.get("category") || ""

  useEffect(() => {
    async function fetchCategories() {
      try {
        const books = await fetchFromBackend("books")

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(books.map((book: any) => book.category))).sort() as string[]

        setCategories(uniqueCategories)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching categories:", error)
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryChange = (value: string) => {
    if (value && value !== "all") {
      router.push(`/books?category=${encodeURIComponent(value)}`)
    } else {
      router.push("/books")
    }
  }

  const clearFilters = () => {
    router.push("/books")
  }

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="category-select" className="text-sm font-medium">
              Category
            </label>
            <Select value={currentCategory} onValueChange={handleCategoryChange} disabled={loading}>
              <SelectTrigger id="category-select" className="w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentCategory && (
            <Button variant="outline" onClick={clearFilters} className="mt-auto">
              Clear Filters
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
