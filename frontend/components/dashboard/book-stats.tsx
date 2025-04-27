// components/dashboard/book-stats.tsx
"use client";

import { useEffect, useState } from "react";
import { BookStats } from "@/types";
import { getBookStats } from "@/lib/api";

export function BookStats() {
  const [stats, setStats] = useState<BookStats | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getBookStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadStats();
  }, []);

  if (!stats) return null;

  return (
    <>
      <div className="rounded-lg border p-4">
        <div className="text-2xl font-bold">{stats.totalBooks}</div>
        <div className="text-sm text-gray-500">Total Books</div>
      </div>
      <div className="rounded-lg border p-4">
        <div className="text-2xl font-bold">
          ${stats.averagePrice.toFixed(2)}
        </div>
        <div className="text-sm text-gray-500">Average Price</div>
      </div>
      <div className="rounded-lg border p-4">
        <div className="text-2xl font-bold">{stats.availableBooks}</div>
        <div className="text-sm text-gray-500">Available Books</div>
      </div>
      <div className="rounded-lg border p-4">
        <div className="text-2xl font-bold">{stats.categories}</div>
        <div className="text-sm text-gray-500">Categories</div>
      </div>
    </>
  );
}
