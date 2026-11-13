import type {
  Campus,
  CampusInfo,
  CarouselImage,
  Celebration,
  Gallery,
  SiteConfig,
} from './types';
import { CAMPUS_SLUGS } from './campus';

// Django owns content and uploads; this is the same origin in production and
// 127.0.0.1:8000 in local dev. Revalidate matches the old 15-minute page cache.
const BASE = (process.env.DJANGO_URL ?? 'http://127.0.0.1:8000').replace(/\/$/, '');
const REVALIDATE = 300;

async function getList<T>(path: string): Promise<T[]> {
  try {
    const response = await fetch(`${BASE}${path}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: REVALIDATE },
    });
    if (!response.ok) return [];
    const data: unknown = await response.json();
    return Array.isArray(data) ? (data as T[]) : [];
  } catch {
    // A backend outage must render the same empty fallbacks as the Django site.
    return [];
  }
}

export const getCarousel = () => getList<CarouselImage>('/api/carousel/');
export const getCelebrations = () => getList<Celebration>('/api/celebrations/');
export const getGalleries = () => getList<Gallery>('/api/galleries/');
// The campuses list returns display slugs ("IFFCO-Township"); routes are lowercase.
const canonicalSlug = (slug: string) =>
  CAMPUS_SLUGS.find((known) => slug.toLowerCase().startsWith(known)) ?? slug.toLowerCase();

export const getCampuses = async (): Promise<Campus[]> => {
  const campuses = await getList<Campus>('/api/campuses/');
  return campuses.map((campus) => ({ ...campus, slug: canonicalSlug(campus.slug) }));
};

export async function getConfig(): Promise<SiteConfig> {
  try {
    const response = await fetch(`${BASE}/api/config/`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: REVALIDATE },
    });
    if (!response.ok) return { gallery_categories: [], celebration_types: [] };
    return (await response.json()) as SiteConfig;
  } catch {
    return { gallery_categories: [], celebration_types: [] };
  }
}

export async function getCampus(slug: string): Promise<CampusInfo | null> {
  try {
    const response = await fetch(`${BASE}/api/campus/${slug}/`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: REVALIDATE },
    });
    if (!response.ok) return null;
    return (await response.json()) as CampusInfo;
  } catch {
    return null;
  }
}
