import SmartImage from '@/components/SmartImage';
import Icon from '@/components/Icon';
import type { Metadata } from 'next';

import GalleryScripts from '@/components/GalleryScripts';
import PageShell from '@/components/PageShell';
import { getCampuses, getCelebrations, getConfig, getGalleries } from '@/lib/api';
import { pageMetadata } from '@/lib/metadata';
import type { Celebration, Gallery, Option } from '@/lib/types';

export const metadata: Metadata = pageMetadata({
  title: 'School Gallery - Kapadia High School',
  description:
    'Photo galleries and celebration albums from Kapadia High School: festivals, sports days, cultural events and campus life across our five campuses.',
  path: '/gallery/',
});

const FALLBACK_CATEGORIES: Option[] = [
  { value: 'festival', label: 'Festival' },
  { value: 'event', label: 'Event' },
  { value: 'sports', label: 'Sports' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'academic', label: 'Academic' },
  { value: 'other', label: 'Other' },
];

const json = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

function galleryAlbum(gallery: Gallery) {
  const photos = gallery.image_count > 0
    ? gallery.images.map((image) => ({
        src: image.image ?? '',
        alt: image.title || gallery.name,
        caption: image.caption || image.title || gallery.name,
      }))
    : gallery.thumbnail_url
      ? [{ src: gallery.thumbnail_url, alt: gallery.name, caption: gallery.name }]
      : [];
  return { title: gallery.name, photos };
}

function celebrationAlbum(celebration: Celebration) {
  const photos = [];
  if (celebration.image) {
    photos.push({ src: celebration.image, alt: celebration.festivalname, caption: celebration.festivalname });
  }
  celebration.photos.forEach((photo) => {
    if (photo.photo) {
      photos.push({
        src: photo.photo,
        alt: photo.caption || celebration.festivalname,
        caption: photo.caption || celebration.festivalname,
      });
    }
  });
  if (!photos.length) {
    photos.push({ src: '/static/images/placeholder.jpg', alt: celebration.festivalname, caption: celebration.festivalname });
  }
  return { title: celebration.festivalname, photos };
}

export default async function GalleryPage() {
  const [galleries, celebrations, campuses, config] = await Promise.all([
    getGalleries(),
    getCelebrations(),
    getCampuses(),
    getConfig(),
  ]);
  const categories = config.gallery_categories.length ? config.gallery_categories : FALLBACK_CATEGORIES;

  return (
    <>
      <PageShell>
        <div className="gallery-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h1 className="page-title">School gallery</h1>
                <div className="title-underline"></div>
                <p className="lead">Photographs from across the five campuses.</p>
              </div>
            </div>
          </div>
        </div>

        <section className="gallery-section">
          <div className="container">
            <div className="gallery-categories" id="galleryCategoryFilter" role="group" aria-label="Filter galleries by category">
              <button type="button" className="gallery-category active" data-filter-category="all">All</button>
              {categories.map((category) => (
                <button key={category.value} type="button" className="gallery-category" data-filter-category={category.value}>
                  {category.label}
                </button>
              ))}
            </div>

            <div className="gallery-grid" id="galleryGrid">
              {galleries.length === 0 ? (
                <div className="no-gallery-message">
                  <p>No gallery items available at this time. Please check back later.</p>
                </div>
              ) : (
                galleries.map((gallery) => (
                  <div
                    key={gallery.id}
                    className="gallery-item js-open-album"
                    data-category={gallery.category}
                    data-album-title={gallery.name}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open ${gallery.name} photos`}
                  >
                    <div className="gallery-image-container">
                      <SmartImage
                        src={gallery.thumbnail_url ?? '/static/images/placeholder.jpg'}
                        alt={gallery.name}
                        className="gallery-image"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="gallery-overlay">
                        <div className="gallery-info">
                          <h3>{gallery.name}</h3>
                          <div className="gallery-actions">
                            {gallery.image_count > 0 && (
                              <span className="gallery-more">
                                <Icon name="images" />
                                <span className="photo-count">{gallery.image_count}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {gallery.description && (
                      <div className="gallery-caption">
                        <p>{gallery.description.slice(0, 100)}</p>
                      </div>
                    )}
                    <script
                      type="application/json"
                      className="album-photos"
                      dangerouslySetInnerHTML={{ __html: json(galleryAlbum(gallery)) }}
                    />
                  </div>
                ))
              )}
            </div>
            <p className="filter-empty" id="galleryEmpty" hidden>No galleries in this category yet.</p>

            {celebrations.length > 0 && (
              <div className="celebrations-on-gallery">
                <div className="row mt-5">
                  <div className="col-12 section-heading-left mb-4">
                    <h2 className="section-title">School celebrations</h2>
                    <div className="title-underline"></div>
                    <p className="section-description">Festivals and school events from across the five campuses.</p>
                  </div>
                </div>
                {campuses.length > 0 && (
                  <div className="gallery-categories mb-4" id="galleryCelebrationFilter" role="group" aria-label="Filter celebrations by campus">
                    <button type="button" className="gallery-category active" data-filter-campus="all">All</button>
                    {campuses.map((campus) => (
                      <button key={campus.slug} type="button" className="gallery-category" data-filter-campus={campus.slug}>
                        {campus.name}
                      </button>
                    ))}
                  </div>
                )}
                <div className="row" id="galleryCelebrationGrid">
                  {celebrations.map((celebration) => (
                    <div
                      key={celebration.id}
                      className="col-lg-4 col-md-6 mb-4 gallery-celebration-card"
                      data-campus={celebration.campus?.slug ?? 'none'}
                    >
                      <div
                        className="gallery-item js-open-album"
                        data-album-title={celebration.festivalname}
                        tabIndex={0}
                        role="button"
                        aria-label={`Open ${celebration.festivalname} photos`}
                      >
                        <div className="gallery-image-container">
                          <SmartImage
                            src={celebration.image ?? '/static/images/placeholder.jpg'}
                            alt={celebration.festivalname}
                            className="gallery-image"
                            loading="lazy"
                          />
                          <div className="gallery-overlay">
                            <div className="gallery-info">
                              <h3>{celebration.festivalname}</h3>
                              <div className="gallery-actions">
                                {celebration.photo_count > 0 && (
                                  <span className="gallery-more">
                                    <Icon name="images" />
                                    <span className="photo-count">{celebration.photo_count}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="gallery-caption">
                          <p>
                            {celebration.festivalname}{' '}
                            <span className="gallery-caption-date">
                              {new Date(celebration.date).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </p>
                        </div>
                        <script
                          type="application/json"
                          className="album-photos"
                          dangerouslySetInnerHTML={{ __html: json(celebrationAlbum(celebration)) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="filter-empty" id="celebrationEmpty" hidden>No celebrations for this campus yet.</p>
              </div>
            )}
          </div>
        </section>

        <style
          dangerouslySetInnerHTML={{
            __html: `
  .gallery-header {
    background-color: #003264;
    padding: 48px 0;
    color: #FFFFFF;
  }
  .page-title { font-size: 2.2rem; font-weight: 600; color: #FFFFFF; margin-bottom: 12px; }
  .title-underline { height: 4px; width: 80px; background-color: #D4AF37; margin: 0 auto 20px; }
  .lead { font-size: 1.1rem; font-weight: 400; color: rgba(255, 255, 255, 0.85); }
  .gallery-section { padding: 30px 0 70px; background-color: #FFFFFF; }
  .gallery-categories { display: flex; justify-content: center; flex-wrap: wrap; margin-bottom: 40px; }
  .gallery-category {
    background-color: transparent; border: 2px solid #003264; color: #374151;
    padding: 8px 16px; margin: 0 6px 10px; border-radius: 8px; font-weight: 500;
    cursor: pointer; transition: all 0.3s ease; text-decoration: none; min-height: 44px;
  }
  .gallery-category:hover, .gallery-category.active { background-color: #003264; color: #FFFFFF; }
  .gallery-category:focus-visible { outline: 2px solid #D4AF37; outline-offset: 2px; }
  .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 25px; }
  .gallery-item { border-radius: 10px; overflow: hidden; box-shadow: 0 2px 12px rgba(0, 50, 100, 0.06); border: 1px solid rgba(0, 50, 100, 0.1); transition: border-color 0.2s ease, box-shadow 0.2s ease; background-color: #FFFFFF; cursor: pointer; }
  .gallery-item:hover { box-shadow: 0 6px 20px rgba(0, 50, 100, 0.1); border-color: rgba(0, 50, 100, 0.25); }
  .gallery-item:focus-visible { outline: 3px solid #D4AF37; outline-offset: 2px; }
  .gallery-image-container { position: relative; height: 250px; overflow: hidden; }
  .gallery-image { width: 100%; height: 100%; object-fit: cover; }
  .gallery-overlay {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(to top, rgba(0,50,100,0.9), rgba(0,50,100,0.6));
    display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease;
  }
  .gallery-item:hover .gallery-overlay, .gallery-item:focus-within .gallery-overlay { opacity: 1; }
  .gallery-info { text-align: center; color: #FFFFFF; padding: 20px; }
  .gallery-info h3 { font-size: 1.3rem; font-weight: 600; margin-bottom: 15px; text-shadow: 1px 1px 3px rgba(0,0,0,0.3); }
  .gallery-actions { display: flex; gap: 10px; justify-content: center; }
  .gallery-more {
    display: inline-flex; align-items: center; justify-content: center; min-width: 45px; height: 45px;
    background-color: #003264; color: #D4AF37; border-radius: 50%; font-size: 1.2rem; position: relative; padding: 0 12px;
  }
  .photo-count {
    position: absolute; top: -5px; right: -5px; background-color: #D4AF37; color: #003264;
    border-radius: 50%; min-width: 20px; height: 20px; font-size: 0.7rem; display: flex; align-items: center; justify-content: center; font-weight: bold; padding: 0 4px;
  }
  .gallery-caption { padding: 10px 15px; color: #4B5563; font-size: 0.9rem; border-top: 1px solid #E5E7EB; }
  .gallery-caption p { margin: 0; }
  .gallery-caption-date { color: #6B7280; font-size: 0.85rem; }
  .gallery-caption-date::before { content: "· "; }
  .filter-empty { text-align: center; padding: 30px 20px; color: #6B7280; font-size: 1.05rem; }
  .section-description { font-size: 1.05rem; color: #4B5563; max-width: 640px; margin: 0 0 32px; }

  /* Single lightbox */
  .lightbox-overlay {
    display: none; position: fixed; inset: 0; z-index: 999999;
    background: rgba(4, 7, 14, 0.96);
    align-items: center; justify-content: center;
  }
  .lightbox-overlay.active { display: flex; }
  .lightbox-figure { margin: 0; max-width: min(92vw, 1100px); text-align: center; }
  .lightbox-img {
    max-width: 100%; max-height: 76vh; object-fit: contain; border-radius: 8px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5); background: #0a0a0a;
  }
  .lightbox-meta { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 14px; flex-wrap: wrap; }
  .lightbox-counter {
    color: rgba(255,255,255,0.85); font-size: 0.9rem; background: rgba(255,255,255,0.12);
    padding: 6px 16px; border-radius: 20px; white-space: nowrap;
  }
  .lightbox-caption { color: rgba(255,255,255,0.75); font-size: 0.95rem; }
  .lightbox-close {
    position: absolute; top: max(14px, env(safe-area-inset-top, 0px)); right: 14px; width: 52px; height: 52px;
    border-radius: 50%; border: 1px solid rgba(255,255,255,0.35);
    background: rgba(255,255,255,0.1); color: #fff; font-size: 1.8rem; line-height: 1;
    cursor: pointer; z-index: 2; transition: background 0.2s, transform 0.2s;
  }
  .lightbox-close:hover { background: #D4AF37; color: #003264; transform: scale(1.06); }
  .lightbox-close:focus-visible, .lightbox-nav:focus-visible, .lightbox-mobile-close:focus-visible {
    outline: 3px solid #D4AF37; outline-offset: 2px;
  }
  .lightbox-nav {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 52px; height: 52px; border-radius: 50%;
    color: white; font-size: 1.4rem; background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.25); cursor: pointer; line-height: 1;
    transition: background 0.2s; z-index: 2;
  }
  .lightbox-nav:hover { background: rgba(212,175,55,0.85); color: #003264; }
  .lightbox-prev { left: 16px; }
  .lightbox-next { right: 16px; }
  .lightbox-mobile-close { display: none; }

  .no-gallery-message { grid-column: 1 / -1; text-align: center; padding: 48px 20px; color: #6B7280; font-size: 1.05rem; border: 1px dashed rgba(0, 50, 100, 0.18); border-radius: 10px; }

  @media (max-width: 992px) {
    .gallery-header { padding: 44px 0; }
    .page-title { font-size: 2rem; }
  }
  @media (max-width: 768px) {
    .gallery-header { padding: 40px 0; }
    .page-title { font-size: 1.9rem; }
    .lead { font-size: 1.05rem; }
    .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
  }
  @media (max-width: 576px) {
    .gallery-header { padding: 30px 0; }
    .page-title { font-size: 1.7rem; }
    .lead { font-size: 0.95rem; }
    .gallery-category { padding: 6px 15px; margin: 0 5px 8px; font-size: 0.85rem; }
    .gallery-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
    .gallery-image-container { height: 170px; }
    .gallery-info h3 { font-size: 1rem; }
    .gallery-section { padding: 20px 0 40px; }
    .gallery-categories { margin-bottom: 25px; }
    .section-description { font-size: 0.95rem; margin-bottom: 24px; }
    .lightbox-figure { max-width: 100vw; padding: 0 8px; }
    .lightbox-img { max-height: 62vh; }
    .lightbox-nav { width: 48px; height: 48px; top: auto; bottom: 86px; transform: none; }
    .lightbox-prev { left: 12px; }
    .lightbox-next { right: 12px; }
    .lightbox-mobile-close {
      display: inline-block; position: absolute; bottom: calc(18px + env(safe-area-inset-bottom, 0px)); left: 50%;
      transform: translateX(-50%); background: #D4AF37; color: #003264; font-weight: 700;
      border: 0; border-radius: 999px; padding: 12px 44px; font-size: 1rem; cursor: pointer;
    }
  }
  @media (hover: none) and (pointer: coarse) {
    .gallery-overlay { opacity: 1; }
    .gallery-item:hover { transform: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .gallery-item, .gallery-image, .gallery-overlay, .lightbox-close, .lightbox-nav { transition: none; }
  }
`,
          }}
        />
      </PageShell>
      <GalleryScripts />
    </>
  );
}
