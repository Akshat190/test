import type { Metadata, Viewport } from 'next';

// Bootstrap is intentionally not used; ui.css carries the only primitives needed.
import '@/css/ui.css';
import '@/css/base.css';
import '@/css/image-styles.css';
import '@/css/footer.css';
import '@/css/sticky-footer.css';
import '@/css/header.css';
import '@/css/carousel.css';

export const viewport: Viewport = {
  themeColor: '#003264',
};

export const metadata: Metadata = {
  title: 'Kapadia High School',
  description:
    'Kapadia High School - Excellence in Education Since 1956. A co-educational English medium school in Gujarat, India.',
  manifest: '/static/images/favicon/site.webmanifest',
  // Set GOOGLE_SITE_VERIFICATION in .env to emit the Search Console meta tag.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
  icons: {
    icon: [
      { url: '/static/images/favicon/khes.png', type: 'image/png' },
      { url: '/static/images/favicon/favicon.ico', rel: 'shortcut icon' },
    ],
    apple: '/static/images/favicon/khes.png',
  },
};

const SCHOOL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'School',
  '@id': 'https://kapadiahighschool.com/#organization',
  name: 'Kapadia High School',
  alternateName: 'KHS',
  description:
    'Co-educational English medium school founded in 1956, with five campuses across Gujarat offering CBSE and GSEB education from K-12.',
  url: 'https://kapadiahighschool.com',
  logo: 'https://kapadiahighschool.com/static/image/khes.png',
  image: 'https://kapadiahighschool.com/static/image/khs.jpeg',
  foundingDate: '1956',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Near Chhatral Railway Station',
    addressLocality: 'Kalol',
    addressRegion: 'Gujarat',
    postalCode: '382721',
    addressCountry: 'IN',
  },
  telephone: '+91-6354368335',
  email: 'info@kapadiahighschool.com',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-6354368335',
    contactType: 'admissions',
    email: 'info@kapadiahighschool.com',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi', 'gu'],
  },
  sameAs: [
    'https://www.instagram.com/kapadiahighschool',
    'https://www.facebook.com/kapadiahighschool',
    'https://x.com/kapadiahighschool',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHOOL_SCHEMA) }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
        html { scroll-behavior: smooth; }
        ::selection { background: #D4AF37; color: #003264; }
        .skip-link {
            position: absolute; left: -9999px; top: 0; z-index: 2000;
            background: #D4AF37; color: #003264; padding: 8px 16px;
        }
        .skip-link:focus { left: 8px; top: 8px; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
      `,
          }}
        />
      </head>
      <body className="d-flex flex-column min-vh-100">{children}</body>
    </html>
  );
}
