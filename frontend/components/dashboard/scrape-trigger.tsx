// components/dashboard/scrape-trigger.tsx
"use client";

import { useState } from "react";
import { triggerScrape } from "@/lib/api";

export function ScrapeTrigger() {
  const [loading, setLoading] = useState(false);

  async function handleScrape() {
    setLoading(true);
    try {
      await triggerScrape();
      // You might want to refresh the data here
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleScrape}
      disabled={loading}
      className="rounded-md bg-primary px-4 py-2 text-white disabled:opacity-50"
    >
      {loading ? "Scraping..." : "Trigger Scrape"}
    </button>
  );
}
