// This file helps with CORS issues during development
// It proxies requests to the Flask backend

export async function fetchFromBackend(endpoint: string, options: RequestInit = {}) {
  // In production, you would use the actual backend URL
  // For development, we're using the Next.js rewrite in next.config.js
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api"
  const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching from backend:", error)
    throw error
  }
}
