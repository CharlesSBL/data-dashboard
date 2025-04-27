"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
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
import { fetchFromBackend } from "@/app/api/proxy"

interface Book {
  title: string
  price: number
  category: string
  rating: number
  availability: boolean
}

export function BookCharts() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await fetchFromBackend("books")
        setBooks(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching books:", error)
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  // Prepare data for price distribution chart
  const priceRanges = [
    { name: "£0-10", range: [0, 10], count: 0 },
    { name: "£10-20", range: [10, 20], count: 0 },
    { name: "£20-30", range: [20, 30], count: 0 },
    { name: "£30-40", range: [30, 40], count: 0 },
    { name: "£40+", range: [40, Number.POSITIVE_INFINITY], count: 0 },
  ]

  books.forEach((book) => {
    const range = priceRanges.find((r) => book.price >= r.range[0] && book.price < r.range[1])
    if (range) range.count++
  })

  // Prepare data for rating distribution chart
  const ratingDistribution = [1, 2, 3, 4, 5].map((rating) => ({
    rating: `${rating} Star${rating !== 1 ? "s" : ""}`,
    count: books.filter((book) => book.rating === rating).length,
  }))

  // Prepare data for category distribution chart
  const categoryDistribution = books.reduce((acc: Record<string, number>, book) => {
    acc[book.category] = (acc[book.category] || 0) + 1
    return acc
  }, {})

  const topCategories = Object.entries(categoryDistribution)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }))

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  if (loading) {
    return (
      <>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Loading charts...</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse">Loading data...</div>
          </CardContent>
        </Card>
      </>
    )
  }

  return (
    <>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Price Distribution</CardTitle>
          <CardDescription>Number of books in each price range</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priceRanges}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Number of Books" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Rating Distribution</CardTitle>
          <CardDescription>Number of books by star rating</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ratingDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" name="Number of Books" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Top Categories</CardTitle>
          <CardDescription>Most popular book categories</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {topCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} books`, "Count"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  )
}
