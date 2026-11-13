import type { Metadata } from 'next';

const SITE = 'https://kapadiahighschool.com';
const OG_IMAGE = `${SITE}/static/image/og-default.jpg`;

type PageMeta = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  /** Absolute or site-relative image; defaults to the shared OG card. */
  image?: string;
};

// Mirrors base.html: page-specific title/description, shared OG defaults.
export function pageMetadata({
  title,
  description,
  path,
  ogTitle = title,
  ogDescription = description,
  image,
}: PageMeta): Metadata {
  const url = `${SITE}${path}`;
  const ogImage = image
    ? (image.startsWith('http') ? image : `${SITE}${image}`)
    : OG_IMAGE;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title: ogTitle,
      description: ogDescription,
      url,
      siteName: 'Kapadia High School',
      locale: 'en_IN',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}
