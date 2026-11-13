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

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: `https://kapadiahighschool.com/${path}${path ? '/' : ''}`,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));
}
