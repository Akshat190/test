import SmartImage from '@/components/SmartImage';
import Link from 'next/link';
import Icon from '@/components/Icon';
import type { Metadata } from 'next';

import HeroCarousel from '@/components/HeroCarousel';
import HomeCelebrations from '@/components/HomeCelebrations';
import PageShell from '@/components/PageShell';
import { getCampus, getCampuses, getCarousel, getCelebrations, getGalleries } from '@/lib/api';
import { CAMPUS_SLUGS } from '@/lib/campus';
import { pageMetadata } from '@/lib/metadata';
import '@/css/home.css';
import '@/css/celebrations.css';

export const metadata: Metadata = pageMetadata({
  title: 'Kapadia High School | CBSE & GSEB School in Kalol, Gujarat',
  description:
    'Kapadia High School, founded 1956, is a co-educational English medium school with five campuses across Gujarat offering CBSE and GSEB education from K-12.',
  path: '/',
  ogTitle: 'Kapadia High School | CBSE & GSEB School in Kalol, Gujarat',
  ogDescription:
    'Founded 1956. Five campuses across Gujarat offering CBSE and GSEB education from K-12.',
});

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Kapadia High School',
  alternateName: 'KHS',
  url: 'https://kapadiahighschool.com/',
  publisher: { '@id': 'https://kapadiahighschool.com/#organization' },
  inLanguage: 'en-IN',
};

export default async function HomePage() {
  const [carouselImages, celebrations, galleries, campuses, campusDetails] = await Promise.all([
    getCarousel(),
    getCelebrations(),
    getGalleries(),
    getCampuses(),
    Promise.all(CAMPUS_SLUGS.map((slug) => getCampus(slug))),
  ]);

  const campusCards = campusDetails.filter((campus) => campus !== null);
  const mainCampus = campusCards.find((campus) => campus.slug === 'chattral');

  const featured = galleries.filter((gallery) => gallery.is_featured);
  const homeGalleries = (featured.length ? featured : galleries).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
      />
      <HeroCarousel images={carouselImages} />
      <PageShell>
        <div className="about-home-section">
          <section className="py-5">
            <div className="container">
              <div className="row">
                <div className="col-12 section-heading-left mb-4">
                  <h1 className="section-title">Kapadia High School</h1>
                  <div className="title-underline"></div>
                </div>
              </div>
              <div className="row gy-4 align-items-center">
                <div className="col-12 col-lg-6">
                  <div className="about-image-container">
                    <SmartImage
                      className="img-fluid"
                      loading="lazy"
                      src="/static/image/campus_chhatral.jpg"
                      alt="The Chhatral campus building and grounds"
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="about-content">
                    <h2>Excellence since 1956</h2>
                    <div className="content-underline"></div>
                    <p>Kapadia High School was founded in 1956 with a small group of students. It is now a co-educational English medium school teaching K-12 across five campuses in Gujarat.</p>
                    <p>The school is affiliated to CBSE and GSEB, and the Chhatral campus is the main office for admissions and general enquiries.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {campusCards.length > 0 && (
          <section className="campus-strip-section">
            <div className="container">
              <div className="row">
                <div className="col-12 section-heading-left mb-4">
                  <h2 className="section-title">Five campuses</h2>
                  <div className="title-underline"></div>
                  <p className="section-description">One school, five campuses across Gujarat.</p>
                </div>
              </div>
              <div className="campus-strip">
                {campusCards.map((campus) => (
                  <Link key={campus.slug} href={`/${campus.slug}/`} className="campus-strip-card">
                    {campus.photo_url || campus.hero_image ? (
                      <SmartImage
                        src={campus.photo_url ?? `/static/${campus.hero_image}`}
                        alt={`${campus.name} campus`}
                        loading="lazy"
                      />
                    ) : (
                      <span className="campus-strip-placeholder" aria-hidden="true">
                        <Icon name="school" />
                      </span>
                    )}
                    <span className="campus-strip-name">{campus.name}</span>
                    {campus.board && <span className="campus-strip-board">{campus.board}</span>}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {celebrations.length > 0 && (
          <HomeCelebrations celebrations={celebrations} campuses={campuses} />
        )}

        <section className="gallery-home-section py-5">
          <div className="container">
            <div className="row">
              <div className="col-12 section-heading-left mb-4">
                <h2 className="section-title">Our gallery</h2>
                <div className="title-underline"></div>
                <p className="section-description">Photographs from across the five campuses.</p>
              </div>
            </div>
            {homeGalleries.length > 0 ? (
              <div className="row gallery-grid">
                {homeGalleries.map((gallery) => (
                  <div key={gallery.id} className="col-lg-4 col-md-6 mb-4">
                    <div className="gallery-card">
                      <div className="gallery-img-container">
                        <SmartImage
                          src={gallery.images[0]?.image ?? gallery.thumbnail_url ?? '/static/image/campus_chhatral.jpg'}
                          alt={gallery.name}
                          className="img-fluid"
                        />
                        <div className="gallery-overlay">
                          <Link className="gallery-link" aria-label={`Open ${gallery.name}`} href="/gallery/">
                            <Icon name="search-plus" />
                          </Link>
                        </div>
                      </div>
                      <div className="gallery-card-body">
                        <h5>{gallery.name}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="home-gallery-empty">Galleries will appear here as photos are added.</p>
            )}
            <div className="row mt-4">
              <div className="col-12">
                <Link className="view-all-btn" href="/gallery/">Open the gallery</Link>
              </div>
            </div>
          </div>
        </section>

        {mainCampus && (
          <section className="home-info-band">
            <div className="container">
              <div className="row g-4 align-items-center">
                <div className="col-lg-8">
                  <h2 className="section-title">Admissions and disclosures</h2>
                  <div className="title-underline"></div>
                  <p>The Chhatral campus is affiliated to {mainCampus.board || 'CBSE'}{mainCampus.affiliation_number ? ` (${mainCampus.affiliation_number})` : ''}. The school publishes its mandatory disclosure documents for parents.</p>
                </div>
                <div className="col-lg-4 home-info-actions">
                  <Link href="/chattral/" className="view-all-btn">Disclosure documents</Link>
                  <a href="https://forms.gle/sDftg7osPaxvGKAD8" className="view-all-btn view-all-btn-outline" target="_blank" rel="noopener">Admission enquiry</a>
                </div>
              </div>
            </div>
          </section>
        )}

        <style
          dangerouslySetInnerHTML={{
            __html: `
  .celebration-modal .modal-content { border-radius: 0; background: #0a0a0a; }
  .celebration-modal .modal-header { background: #1a1a2e; color: white; border-bottom: 1px solid #2a2a3e; padding: 12px 20px; }
  .celebration-modal .modal-title { font-size: 1.1rem; font-weight: 600; display: flex; align-items: center; gap: 12px; }
  .celebration-modal .modal-body { padding: 20px; overflow-y: auto; max-height: calc(100vh - 60px); background: #0a0a0a; }
  .celebration-modal .btn-close-white { filter: brightness(0) invert(1); }
  .celebration-count { font-size: 0.85rem; color: #D4AF37; font-weight: 500; }
  .celebration-type { font-size: 0.72rem; font-weight: 500; color: #fff; background: rgba(255,255,255,0.16); padding: 3px 10px; border-radius: 4px; }
  .celebration-description { color: rgba(255,255,255,0.78); max-width: 70ch; margin: 0 0 18px; font-size: 0.95rem; }
  .lightbox-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 999999; justify-content: center; align-items: center; cursor: zoom-out; }
  .lightbox-overlay.active { display: flex; }
  .lightbox-img { max-width: 90%; max-height: 90%; object-fit: contain; border-radius: 4px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); cursor: default; }
  .lightbox-close { position: absolute; top: 20px; right: 30px; color: white; font-size: 3rem; background: none; border: none; cursor: pointer; z-index: 10; line-height: 1; opacity: 0.8; }
  .lightbox-close:hover { opacity: 1; }
  .lightbox-nav { position: absolute; top: 50%; transform: translateY(-50%); color: white; font-size: 2.5rem; background: rgba(255,255,255,0.1); border: none; cursor: pointer; padding: 15px 10px; border-radius: 8px; transition: background 0.2s; line-height: 1; opacity: 0.7; }
  .lightbox-nav:hover { background: rgba(255,255,255,0.2); opacity: 1; }
  .lightbox-prev { left: 20px; }
  .lightbox-next { right: 20px; }
  .lightbox-counter { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); color: rgba(255,255,255,0.7); font-size: 0.9rem; background: rgba(0,0,0,0.5); padding: 6px 16px; border-radius: 20px; }
  .modal-thumb-wrap { position: relative; width: 100%; padding-bottom: 75%; overflow: hidden; border-radius: 6px; cursor: pointer; transition: transform 0.2s ease; background: #1a1a2e; }
  .modal-thumb-wrap:hover { transform: scale(1.03); }
  .modal-thumb-img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
  .photo-badge { font-size: 0.8rem; background: #003264; color: #F4C430; padding: 3px 12px; border-radius: 20px; font-weight: 500; }
  .gallery-modal-grid { max-width: 1400px; margin: 0 auto; }
  @media (max-width: 576px) {
    .lightbox-nav { font-size: 1.8rem; padding: 12px 8px; opacity: 0.9; background: rgba(255,255,255,0.15); }
    .lightbox-prev { left: 8px; }
    .lightbox-next { right: 8px; }
    .lightbox-close { font-size: 2.5rem; top: 10px; right: 15px; }
    .lightbox-img { max-width: 95%; max-height: 85%; }
    .celebration-modal .modal-body { padding: 10px; }
  }
`,
          }}
        />
      </PageShell>
    </>
  );
}
