import type { NextConfig } from 'next';

// Same URLs as the Django site (trailing slash), so existing links, canonicals
// and the sitemap keep resolving.
const DJANGO = (process.env.DJANGO_URL ?? 'http://127.0.0.1:8000').replace(/\/$/, '');

const nextConfig: NextConfig = {
  trailingSlash: true,
  turbopack: { root: process.cwd() },
  // Images, PDFs and CSS-referenced assets stay owned by Django/nginx. In dev
  // Next proxies them; in production nginx matches these prefixes first.
  async rewrites() {
    return [
      { source: '/static/:path*', destination: `${DJANGO}/static/:path*` },
      { source: '/media/:path*', destination: `${DJANGO}/media/:path*` },
    ];
  },
};

export default nextConfig;
