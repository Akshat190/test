import type { MetadataRoute } from 'next';

const PATHS = [
  '',
  'aboutSchool',
  'gallery',
  'contact',
  'disclosures',
  'brief',
  'chandkheda',
  'chattral',
  'iffco',
  'kadi',
  'shela',
  'success-stories',
  'facilities',
  'institutional-goals',
  'our-team',
  'team',
  'activities',
  'testimonials',
  'achievements',
];

// Campus pages and the home page are the pages worth crawling first.
const PRIORITY: Record<string, number> = { '': 1, aboutSchool: 0.8, contact: 0.8, gallery: 0.7 };
for (const campus of ['chandkheda', 'chattral', 'iffco', 'kadi', 'shela']) PRIORITY[campus] = 0.9;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PATHS.map((path) => ({
    url: `https://kapadiahighschool.com/${path}${path ? '/' : ''}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: PRIORITY[path] ?? 0.6,
  }));
}
