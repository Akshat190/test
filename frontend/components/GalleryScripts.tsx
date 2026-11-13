'use client';

import { useEffect } from 'react';

import { wrapIndex } from '@/lib/ui';

type AlbumPhoto = { src: string; alt: string; caption?: string };
type Album = { title: string; photos: AlbumPhoto[] };

// Port of static/js/gallery.js. The overlay markup lives here so it renders as a
// body-level sibling of <main>, exactly like the Django `overlays` block.
// Contract with the server-rendered cards: .js-open-album, .album-photos,
// data-filter-category and data-filter-campus.
export default function GalleryScripts() {
  useEffect(() => {
    const overlay = document.getElementById('lightbox');
    if (!overlay) return;
    const img = document.getElementById('lightboxImg') as HTMLImageElement | null;
    const caption = document.getElementById('lightboxCaption');
    const counter = document.getElementById('lightboxCounter');
    const closeButtons = overlay.querySelectorAll<HTMLElement>('[data-lightbox-close]');
    const prevButton = overlay.querySelector('[data-lightbox-prev]');
    const nextButton = overlay.querySelector('[data-lightbox-next]');

    let photos: AlbumPhoto[] = [];
    let index = 0;
    let isOpen = false;
    let pushedState = false;
    let lastFocused: HTMLElement | null = null;
    let prevOverflow = '';

    function readAlbum(card: Element): Album | null {
      const node = card.querySelector('.album-photos');
      if (!node) return null;
      try {
        const data = JSON.parse(node.textContent || '');
        if (!data || !data.photos || !data.photos.length) return null;
        return { title: data.title || '', photos: data.photos };
      } catch {
        return null;
      }
    }

    function render() {
      const photo = photos[index];
      if (!photo || !img || !caption || !counter) return;
      img.src = photo.src;
      img.alt = photo.alt || '';
      caption.textContent = photo.caption || photo.alt || '';
      counter.textContent = `${index + 1} / ${photos.length}`;
    }

    function show() {
      overlay!.classList.add('active');
      overlay!.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      isOpen = true;
    }

    function hide() {
      overlay!.classList.remove('active');
      overlay!.setAttribute('hidden', '');
      document.body.style.overflow = prevOverflow;
      isOpen = false;
    }

    function openLightbox(album: Album, startIndex: number, opener?: Element | null) {
      if (!album || !album.photos.length) return;
      photos = album.photos;
      index = Math.min(Math.max(startIndex || 0, 0), photos.length - 1);
      lastFocused = (opener as HTMLElement) || (document.activeElement as HTMLElement);
      prevOverflow = document.body.style.overflow;
      render();
      show();
      if (!pushedState) {
        try {
          history.pushState({ khsLightbox: true }, '');
          pushedState = true;
        } catch {
          // history unavailable (file://, sandbox)
        }
      }
      closeButtons[0]?.focus();
    }

    function closeLightbox(fromPop: boolean) {
      if (!isOpen) return;
      hide();
      photos = [];
      index = 0;
      if (lastFocused && lastFocused.focus) {
        try {
          lastFocused.focus();
        } catch {
          // ignore
        }
      }
      lastFocused = null;
      if (!fromPop && pushedState) {
        pushedState = false;
        try {
          history.back();
        } catch {
          // ignore
        }
      } else {
        pushedState = false;
      }
    }

    function step(dir: number) {
      if (!photos.length) return;
      index = wrapIndex(index, dir, photos.length);
      render();
    }

    const onCloseClick = () => closeLightbox(false);
    const onPrevClick = () => step(-1);
    const onNextClick = () => step(1);

    closeButtons.forEach((button) => button.addEventListener('click', onCloseClick));
    prevButton?.addEventListener('click', onPrevClick);
    nextButton?.addEventListener('click', onNextClick);

    const onOverlayClick = (event: MouseEvent) => {
      if (event.target === overlay) closeLightbox(false);
    };
    overlay.addEventListener('click', onOverlayClick);

    const onKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === 'Escape') closeLightbox(false);
      else if (event.key === 'ArrowLeft') step(-1);
      else if (event.key === 'ArrowRight') step(1);
    };
    document.addEventListener('keydown', onKeyDown);

    const onPopState = () => {
      if (isOpen) closeLightbox(true);
    };
    window.addEventListener('popstate', onPopState);

    let startX = 0;
    let distX = 0;
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length) startX = event.touches[0].clientX;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length) distX = event.touches[0].clientX - startX;
    };
    const onTouchEnd = () => {
      if (Math.abs(distX) > 50) step(distX > 0 ? -1 : 1);
      startX = 0;
      distX = 0;
    };
    overlay.addEventListener('touchstart', onTouchStart, { passive: true });
    overlay.addEventListener('touchmove', onTouchMove, { passive: true });
    overlay.addEventListener('touchend', onTouchEnd, { passive: true });

    const onCardClick = (event: MouseEvent) => {
      if (isOpen) return;
      const target = event.target as Element;
      if (target.closest('a')) return;
      const card = target.closest('.js-open-album');
      if (!card) return;
      const album = readAlbum(card);
      if (album) openLightbox(album, 0, card);
    };
    document.addEventListener('click', onCardClick);

    const onCardKeyDown = (event: KeyboardEvent) => {
      if (isOpen) return;
      const target = event.target as HTMLElement;
      if ((event.key === 'Enter' || event.key === ' ') && target.classList && target.classList.contains('js-open-album')) {
        event.preventDefault();
        const album = readAlbum(target);
        if (album) openLightbox(album, 0, target);
      }
    };
    document.addEventListener('keydown', onCardKeyDown);
    const placeholder = '/static/images/placeholder.jpg';
    document.querySelectorAll<HTMLImageElement>('.gallery-image').forEach((image) => {
      image.addEventListener('error', function handler() {
        image.removeEventListener('error', handler);
        if (image.src.indexOf('placeholder.jpg') === -1) image.src = placeholder;
      });
    });

    return () => {
      closeButtons.forEach((button) => button.removeEventListener('click', onCloseClick));
      prevButton?.removeEventListener('click', onPrevClick);
      nextButton?.removeEventListener('click', onNextClick);
      overlay.removeEventListener('click', onOverlayClick);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('popstate', onPopState);
      overlay.removeEventListener('touchstart', onTouchStart);
      overlay.removeEventListener('touchmove', onTouchMove);
      overlay.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('click', onCardClick);
      document.removeEventListener('keydown', onCardKeyDown);
    };
  }, []);

  return (
    <div className="lightbox-overlay" id="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" hidden>
      <button type="button" className="lightbox-close" data-lightbox-close aria-label="Close photo viewer">&times;</button>
      <button type="button" className="lightbox-nav lightbox-prev" data-lightbox-prev aria-label="Previous photo">&#10094;</button>
      <figure className="lightbox-figure">
        {/* src is set by the lightbox script when a photo opens */}
        <img className="lightbox-img" id="lightboxImg" alt="" />
        <figcaption className="lightbox-meta">
          <span className="lightbox-counter" id="lightboxCounter"></span>
          <span className="lightbox-caption" id="lightboxCaption"></span>
        </figcaption>
      </figure>
      <button type="button" className="lightbox-nav lightbox-next" data-lightbox-next aria-label="Next photo">&#10095;</button>
      <button type="button" className="lightbox-mobile-close" data-lightbox-close>Close</button>
    </div>
  );
}
