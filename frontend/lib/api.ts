// frontend/lib/api.ts
import { Book, BookStats } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export async function fetchBooks(category?: string): Promise<Book[]> {
  const url = category
    ? `${API_BASE}/api/books?category=${encodeURIComponent(category)}`
    : `${API_BASE}/api/books`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch books");
  return response.json();
}

export async function triggerScrape(): Promise<{ status: string }> {
  const response = await fetch(`${API_BASE}/scrape`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Failed to trigger scrape");
  return response.json();
}

export async function getBookStats(): Promise<BookStats> {
  const books = await fetchBooks();
  return {
    totalBooks: books.length,
    averagePrice:
      books.reduce((acc, book) => acc + book.price, 0) / books.length,
    availableBooks: books.filter((book) => book.availability).length,
    categories: new Set(books.map((book) => book.category)).size,
  };
}
