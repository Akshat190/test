import SmartImage from '@/components/SmartImage';
import Link from 'next/link';
import Icon from '@/components/Icon';
import type { Metadata } from 'next';

import PageShell from '@/components/PageShell';
import { getCampus } from '@/lib/api';
import { CAMPUS_SLUGS } from '@/lib/campus';
import { pageMetadata } from '@/lib/metadata';
import '@/css/campus.css';

export const dynamicParams = false;

// JSON.stringify leaves `<` intact, which lets a `</script>` in DB text break out.
const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

export function generateStaticParams() {
  return CAMPUS_SLUGS.map((campus) => ({ campus }));
}

export async function generateMetadata({ params }: { params: Promise<{ campus: string }> }): Promise<Metadata> {
  const { campus: slug } = await params;
  const info = await getCampus(slug);
  if (!info) return {};

  const description = `Kapadia High School's ${info.name} campus${info.board ? `, ${info.board} affiliated` : ''}${info.timings ? `. School timings ${info.timings}` : ''}. Admissions and campus information.`;
  return pageMetadata({
    title: `${info.name} Campus - Kapadia High School`,
    description,
    path: `/${slug}/`,
  });
}

export default async function CampusPage({ params }: { params: Promise<{ campus: string }> }) {
  const { campus: slug } = await params;
  const info = await getCampus(slug);
  // Failing loudly beats baking a permanent 404 when the API is down at build.
  if (!info) throw new Error(`Campus API unavailable for ${slug}`);

  const campusSchema = {
    '@context': 'https://schema.org',
    '@type': 'School',
    '@id': `https://kapadiahighschool.com/${slug}/#campus`,
    name: `Kapadia High School, ${info.name} Campus`,
    url: `https://kapadiahighschool.com/${slug}/`,
    parentOrganization: { '@id': 'https://kapadiahighschool.com/#organization' },
    ...(info.board
      ? { department: { '@type': 'EducationalOrganization', name: info.board } }
      : {}),
    address: {
      '@type': 'PostalAddress',
      ...(info.address ? { streetAddress: info.address } : {}),
      addressLocality: info.name,
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    ...(info.affiliation_number ? { identifier: info.affiliation_number } : {}),
    ...(info.photo_url ? { image: `https://kapadiahighschool.com${info.photo_url}` } : {}),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kapadiahighschool.com/' },
      { '@type': 'ListItem', position: 2, name: `${info.name} Campus`, item: `https://kapadiahighschool.com/${slug}/` },
    ],
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(campusSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />

      <section className={`campus-hero ${info.photo_url || info.hero_image ? '' : 'campus-hero-no-image'}`.trim()}>
        {(info.photo_url || info.hero_image) && (
          <SmartImage
            src={info.photo_url ?? `/static/${info.hero_image}`}
            alt={`${info.name} Campus`}
            className="campus-hero-img"
            loading="eager"
            fetchPriority="high"
          />
        )}
        <div className="campus-hero-scrim" aria-hidden="true"></div>
        <div className="container campus-hero-content">
          <h1 className="campus-hero-title">{info.name}</h1>
          <div className="campus-hero-meta">
            {info.board && <span className="campus-badge">{info.board}</span>}
            <span className="campus-chip"><Icon name="clock" className="me-1" />{info.timings}</span>
          </div>
        </div>
      </section>

      <div className="container campus-body">
        <section className="campus-info" aria-label="Campus information">
          <div className="row g-3">
            {info.board && (
              <div className="col-md-4">
                <div className="info-card">
                  <Icon name="graduation-cap" className="info-icon" />
                  <h3>Board</h3>
                  <p>{info.board}</p>
                </div>
              </div>
            )}
            {info.affiliation_number && (
              <div className="col-md-4">
                <div className="info-card">
                  <Icon name="certificate" className="info-icon" />
                  <h3>{info.affiliation_label}</h3>
                  <p>{info.affiliation_number}</p>
                </div>
              </div>
            )}
            <div className="col-md-4">
              <div className="info-card">
                <Icon name="clock" className="info-icon" />
                <h3>Timings</h3>
                <p>{info.timings}</p>
              </div>
            </div>
            {info.address && (
              <div className="col-md-4">
                <div className="info-card">
                  <Icon name="map-marker-alt" className="info-icon" />
                  <h3>Address</h3>
                  <p>{info.address}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="campus-facilities" aria-label="Campus facilities">
          <h2 className="section-title">Campus Facilities</h2>
          <div className="section-underline"></div>
          <div className="row g-3">
            {['Smart Boards', 'Playground', 'Library', 'Art Room', 'Music Room', 'Curated Labs', 'Transportation', 'Medical Room', 'Green Campus'].map((facility) => (
              <div key={facility} className="col-md-4"><span className="facility-btn">{facility}</span></div>
            ))}
          </div>
        </section>

        {info.documents.length > 0 && (
          <section className="campus-docs" aria-label="Campus documents">
            <h2 className="section-title">Mandatory Disclosures</h2>
            <div className="section-underline"></div>
            <div className="document-grid">
              {info.documents.map((document) => (
                <div key={document.id} className="doc-card">
                  <a href={document.file ?? '#'} target="_blank" rel="noopener" className="doc-link">
                    <Icon name="file-pdf" />
                    <span>{document.title}</span>
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="campus-cta">
          <h2>Visit the {info.name} campus</h2>
          <p>Admissions are open. Call the school office or send an enquiry.</p>
          <div className="campus-cta-actions">
            <a href="https://forms.gle/sDftg7osPaxvGKAD8" className="cta-btn cta-btn-primary" target="_blank" rel="noopener">
              <Icon name="graduation-cap" />Admissions open
            </a>
            <Link className="cta-btn cta-btn-ghost" href="/contact/">
              <Icon name="envelope" />Contact
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
