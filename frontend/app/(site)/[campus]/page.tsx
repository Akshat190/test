import SmartImage from '@/components/SmartImage';
import Link from 'next/link';
import Icon from '@/components/Icon';
import type { Metadata } from 'next';

import PageShell from '@/components/PageShell';
import { getCampus } from '@/lib/api';
import { CAMPUS_CITIES, CAMPUS_SLUGS } from '@/lib/campus';
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

  const city = CAMPUS_CITIES[slug] ?? 'Gujarat';
  const board = info.board ? ` (${info.board})` : '';
  const description = `${info.name} campus of Kapadia High School in ${city}: ${info.board ? `${info.board} affiliated, ` : ''}classes K-12. Facilities, timings, address and contact details.`;
  return pageMetadata({
    title: `${info.name} Campus${board} | Kapadia High School, ${city}`,
    description,
    path: `/${slug}/`,
  });
}

export default async function CampusPage({ params }: { params: Promise<{ campus: string }> }) {
  const { campus: slug } = await params;
  const info = await getCampus(slug);
  // Failing loudly beats baking a permanent 404 when the API is down at build.
  if (!info) throw new Error(`Campus API unavailable for ${slug}`);
  const city = CAMPUS_CITIES[slug] ?? 'Gujarat';

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
    telephone: '+91-6354368335',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '14:00',
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kapadiahighschool.com/' },
      { '@type': 'ListItem', position: 2, name: `${info.name} Campus`, item: `https://kapadiahighschool.com/${slug}/` },
    ],
  };

  const boardAnswer = info.board
    ? `Yes. The ${info.name} campus follows the ${info.board} curriculum${info.affiliation_number ? ` and holds affiliation number ${info.affiliation_number}` : ''}.`
    : 'The campus follows the school curriculum; call the office to confirm the current board affiliation and affiliation number.';

  const campusFaqs = [
    {
      q: `Which board does the ${info.name} campus follow?`,
      a: boardAnswer,
    },
    {
      q: 'What are the school timings?',
      a: `Classes run from ${info.timings ?? '8:00 am to 2:00 pm, Monday to Saturday'}. The office is open during school hours.`,
    },
    {
      q: 'Which classes are taught at this campus?',
      a: 'Kapadia High School teaches classes from K-12, English medium, with Science, Commerce and Humanities streams at senior level.',
    },
    {
      q: 'How do I apply for admission?',
      a: `Call the school office on +91 6354368335 or send an enquiry from the contact page. The campus office explains the documents, fees and the next admission date.`,
    },
    {
      q: `Where is the ${info.name} campus?`,
      a: info.address
        ? `${info.address}. Directions and a map are on the contact page.`
        : `The campus is in ${city}. Call the office on +91 6354368335 for the exact address and directions.`,
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: campusFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(campusSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

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
        <section className="campus-about" aria-label={`About the ${info.name} campus`}>
          <h2 className="section-title">About the {info.name} campus</h2>
          <div className="section-underline"></div>
          <p>
            {info.name} is one of the five campuses of Kapadia High School, a co-educational English
            medium school founded in 1956. The campus teaches classes from K-12
            {info.board ? ` and follows the ${info.board} curriculum` : ''}
            {info.affiliation_number ? `, affiliation number ${info.affiliation_number}` : ''}.
          </p>
          <p>
            {info.timings ? `School hours are ${info.timings}. ` : ''}
            Admission enquiries, fee details and campus visits are handled by the school office:
            call <a href="tel:+916354368335">+91 6354368335</a> or write to{' '}
            <a href="mailto:info@kapadiahighschool.com">info@kapadiahighschool.com</a>.
          </p>
        </section>

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

        <section className="campus-faq" aria-label={`${info.name} campus questions`}>
          <h2 className="section-title">Campus questions</h2>
          <div className="section-underline"></div>
          <div className="faq-list">
            {campusFaqs.map((faq) => (
              <details key={faq.q} className="faq-item">
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
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
