// Data layer for the Astro frontend.
// At build time (SSG) these fetch the Django read-only list APIs; the build
// must never fail because the backend is unreachable, so every fetcher falls
// back to { results: [] } and pages/components render their fallbacks.

const API_BASE = (
  import.meta.env.PUBLIC_API_BASE ?? "http://127.0.0.1:8000"
).replace(/\/$/, "");

async function get<T>(path: string): Promise<{ results: T[] }> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return { results: [] };
    const data: unknown = await res.json();
    if (Array.isArray(data)) return { results: data as T[] };
    if (data && typeof data === "object" && Array.isArray((data as { results?: unknown }).results)) {
      return { results: (data as { results: T[] }).results };
    }
    return { results: [] };
  } catch {
    return { results: [] };
  }
}

// Normalise a Django file URL for <img src>. Absolute URLs pass through;
// MEDIA-relative paths ("/media/...") are served by nginx as-is.
export function getImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (/^(https?:|data:|blob:)/.test(url)) return url;
  return url.startsWith("/") ? url : `/${url}`;
}

export const getCarouselImages = () => get("/api/carousel/");
export const getCelebrations = () => get("/api/celebrations/");
export const getCampuses = () => get("/api/campuses/");
export const getGalleries = (featured = false) =>
  get(featured ? "/api/galleries/?featured=1" : "/api/galleries/");
