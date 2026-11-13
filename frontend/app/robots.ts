import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/health/', '/metrics/', '/api/'],
    },
    sitemap: 'https://kapadiahighschool.com/sitemap.xml',
  };
}
