"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import { fetchFromBackend } from "@/app/api/proxy"

interface CategoryData {
  name: string
  count: number
  averagePrice: number
  averageRating: number
}

export function CategoryBreakdown() {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const books = await fetchFromBackend("books")

        // Group books by category
        const categoryMap = books.reduce((acc: Record<string, any[]>, book: any) => {
          if (!acc[book.category]) {
            acc[book.category] = []
          }
          acc[book.category].push(book)
          return acc
        }, {})

        // Calculate statistics for each category
        const categoryData = Object.entries(categoryMap).map(([name, books]) => {
          const count = books.length
          const totalPrice = books.reduce((sum, book) => sum + book.price, 0)
          const totalRating = books.reduce((sum, book) => sum + book.rating, 0)

          return {
            name,
            count,
            averagePrice: Number.parseFloat((totalPrice / count).toFixed(2)),
            averageRating: Number.parseFloat((totalRating / count).toFixed(1)),
          }
        })

        // Sort by count (descending)
        categoryData.sort((a, b) => b.count - a.count)

        setCategories(categoryData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching category data:", error)
        setLoading(false)
      }
    }

    fetchCategoryData()
  }, [])

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82ca9d",
    "#ffc658",
    "#8dd1e1",
    "#a4de6c",
    "#d0ed57",
  ]

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
          <CardDescription>Loading category data...</CardDescription>
        </CardHeader>
        <CardContent className="h-[500px] flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Books by Category</CardTitle>
          <CardDescription>Distribution of books across categories</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categories} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={90} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Number of Books" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category Distribution</CardTitle>
          <CardDescription>Percentage of books in each category</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories.slice(0, 10)}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {categories.slice(0, 10).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} books`, "Count"]} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Categories</CardTitle>
          <CardDescription>Categories with the most books</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.slice(0, 5).map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{category.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {category.count} books • Avg. Rating: {category.averageRating}/5
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/books?category=${encodeURIComponent(category.name)}`}>
                    <ArrowRightIcon className="mr-1 h-4 w-4" />
                    View
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
