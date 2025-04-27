// components/dashboard/book-list.tsx
"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types";
import { fetchBooks } from "@/lib/api";

export function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid gap-4">
      {books.map((book, i) => (
        <div key={i} className="p-4 border rounded">
          <h3 className="font-bold">{book.title}</h3>
          <p>Price: ${book.price}</p>
          <p>Category: {book.category}</p>
          <p>Rating: {book.rating}/5</p>
          <p>Status: {book.availability ? "Available" : "Out of Stock"}</p>
        </div>
      ))}
    </div>
  );
}
