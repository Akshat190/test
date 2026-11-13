'use client';

import SmartImage from '@/components/SmartImage';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import type { Campus, Celebration } from '@/lib/types';
import { wrapIndex } from '@/lib/ui';

type AlbumPhoto = { src: string; alt: string };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function photoLabel(count: number): string {
  return `${count} photo${count === 1 ? '' : 's'}`;
}

function celebrationPhotos(celebration: Celebration): AlbumPhoto[] {
  const photos: AlbumPhoto[] = [];
  if (celebration.image) {
    photos.push({ src: celebration.image, alt: celebration.festivalname });
  }
  celebration.photos.forEach((photo) => {
    if (photo.photo) {
      photos.push({
        src: photo.photo,
        alt: photo.caption || celebration.festivalname,
      });
    }
  });
  return photos;
}

export default function HomeCelebrations({
  celebrations,
  campuses,
}: {
  celebrations: Celebration[];
  campuses: Campus[];
}) {
  const [campus, setCampus] = useState('all');
  const [modal, setModal] = useState<Celebration | null>(null);
  const [lightbox, setLightbox] = useState<{ photos: AlbumPhoto[]; index: number } | null>(null);

  useEffect(() => {
    document.body.style.overflow = modal || lightbox ? 'hidden' : '';
  }, [modal, lightbox]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (lightbox) {
        if (event.key === 'Escape') setLightbox(null);
        if (event.key === 'ArrowLeft') {
          setLightbox((current) =>
            current ? { ...current, index: wrapIndex(current.index, -1, current.photos.length) } : current,
          );
        }
        if (event.key === 'ArrowRight') {
          setLightbox((current) =>
            current ? { ...current, index: wrapIndex(current.index, 1, current.photos.length) } : current,
          );
        }
      } else if (modal && event.key === 'Escape') {
        setModal(null);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [lightbox, modal]);

  const ordered = [...celebrations].sort(
    (a, b) => Number(b.is_featured) - Number(a.is_featured),
  );
  const visible = ordered
    .filter((item) => campus === 'all' || item.campus?.slug === campus)
    .slice(0, 3);

  const modalPhotos = modal ? celebrationPhotos(modal) : [];
  const modalType = modal
    ? modal.celebration_type.charAt(0).toUpperCase() + modal.celebration_type.slice(1)
    : '';

  return (
    <section className="celebrations-section">
      <div className="container">
        <div className="row">
          <div className="col-12 section-heading-left mb-4">
            <h2 className="celebrations-title">School celebrations</h2>
            <div className="celebrations-underline"></div>
            <p className="celebrations-subtitle">Festivals and school events from across the five campuses.</p>
          </div>
        </div>
        {campuses.length > 0 && (
          <div className="celebration-campus-filter" id="celebrationFilter">
            <button className={`gallery-category ${campus === 'all' ? 'active' : ''}`} data-campus="all" onClick={() => setCampus('all')}>All</button>
            {campuses.map((item) => (
              <button
                key={item.slug}
                className={`gallery-category ${campus === item.slug ? 'active' : ''}`}
                data-campus={item.slug}
                onClick={() => setCampus(item.slug)}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
        <div className="row mt-4" id="celebrationGrid">
          {visible.map((celebration) => {
            const photos = celebrationPhotos(celebration);
            const openable = photos.length > 0;
            return (
              <div key={celebration.id} className="col-lg-4 col-md-6 mb-4 celebration-card-wrap" data-campus={celebration.campus?.slug ?? 'none'}>
                <div
                  className="celebration-card"
                  onClick={openable ? () => setModal(celebration) : undefined}
                  style={{ cursor: openable ? 'pointer' : 'default' }}
                >
                  <div className="celebration-img-container">
                    <SmartImage
                      src={celebration.image ?? '/static/image/campus_chhatral.jpg'}
                      alt={celebration.festivalname}
                      className="celebration-img"
                    />
                    <div className="celebration-date">{formatDate(celebration.date)}</div>
                  </div>
                  <div className="celebration-content">
                    <h3 className="celebration-name">{celebration.festivalname}</h3>
                    {celebration.photo_count > 0 && (
                      <span className="celebration-count">{photoLabel(celebration.photo_count)}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="row">
          <div className="col-12">
            <Link className="view-all-btn" href="/gallery/">See all celebrations</Link>
          </div>
        </div>
      </div>

      {modal && (
        <div className="modal fade celebration-modal show" id={`celebModal${modal.id}`} tabIndex={-1} style={{ display: 'block' }} aria-hidden="true" onClick={(event) => { if (event.target === event.currentTarget) setModal(null); }}>
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modal.festivalname}
                  <span className="celebration-type">{modalType}</span>
                  <span className="photo-badge">{photoLabel(modalPhotos.length)}</span>
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setModal(null)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {modal.description && (
                  <p className="celebration-description">{modal.description}</p>
                )}
                <div className="row g-2 gallery-modal-grid" id={`homeCelebGrid${modal.id}`}>
                  {modalPhotos.map((photo, index) => (
                    <div key={`${photo.src}-${index}`} className="col-6 col-md-4 col-lg-3">
                      <div className="modal-thumb-wrap" onClick={() => setLightbox({ photos: modalPhotos, index })}>
                        <SmartImage src={photo.src} alt={photo.alt} className="modal-thumb-img" loading="lazy" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`lightbox-overlay ${lightbox ? 'active' : ''}`}
        id="homeLightbox"
        onClick={(event) => {
          if (event.target === event.currentTarget) setLightbox(null);
        }}
      >
        <button className="lightbox-close" onClick={() => setLightbox(null)}>&times;</button>
        <button className="lightbox-nav lightbox-prev" onClick={() => setLightbox((current) => current ? { ...current, index: wrapIndex(current.index, -1, current.photos.length) } : current)}>&#10094;</button>
        <button className="lightbox-nav lightbox-next" onClick={() => setLightbox((current) => current ? { ...current, index: wrapIndex(current.index, 1, current.photos.length) } : current)}>&#10095;</button>
        <div className="lightbox-counter" id="homeLightboxCounter">
          {lightbox ? `${lightbox.index + 1} / ${lightbox.photos.length}` : ''}
        </div>
        <SmartImage className="lightbox-img" id="homeLightboxImg" src={lightbox?.photos[lightbox.index]?.src ?? ''} alt={lightbox?.photos[lightbox.index]?.alt ?? ''} />
      </div>
    </section>
  );
}
