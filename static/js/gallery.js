/**
 * Gallery page: independent filters + single lightbox layer.
 * - Category buttons filter gallery cards only.
 * - Campus buttons filter celebration cards only.
 * - Card click opens the lightbox directly (no stacked modals).
 */
(function () {
  'use strict';

  /* ---------- Filters ---------- */

  function wireFilterGroup(groupId, itemSelector, keyAttr, emptyId) {
    var group = document.getElementById(groupId);
    if (!group) return;
    var buttons = group.querySelectorAll('[data-filter-category],[data-filter-campus]');
    var items = document.querySelectorAll(itemSelector);
    var emptyMsg = emptyId ? document.getElementById(emptyId) : null;
    if (!items.length) return;

    function apply(value, activeBtn) {
      var key = keyAttr === 'category' ? 'category' : 'campus';
      buttons.forEach(function (b) { b.classList.remove('active'); });
      if (activeBtn) activeBtn.classList.add('active');
      var visible = 0;
      items.forEach(function (item) {
        var match = value === 'all' || item.getAttribute('data-' + key) === value;
        item.style.display = match ? '' : 'none';
        if (match) visible += 1;
      });
      if (emptyMsg) emptyMsg.hidden = visible !== 0;
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var value = btn.getAttribute('data-filter-category') || btn.getAttribute('data-filter-campus');
        apply(value || 'all', btn);
      });
    });
  }

  /* ---------- Lightbox ---------- */

  var overlay, img, caption, counter, closeBtn;
  var photos = [];
  var index = 0;
  var isOpen = false;
  var pushedState = false;
  var lastFocused = null;
  var prevOverflow = '';

  function readAlbum(card) {
    var node = card.querySelector('.album-photos');
    if (!node) return null;
    try {
      var data = JSON.parse(node.textContent);
      if (!data || !data.photos || !data.photos.length) return null;
      return { title: data.title || '', photos: data.photos };
    } catch (err) {
      return null;
    }
  }

  function render() {
    var photo = photos[index];
    if (!photo) return;
    img.src = photo.src;
    img.alt = photo.alt || '';
    caption.textContent = photo.alt || '';
    counter.textContent = (index + 1) + ' / ' + photos.length;
  }

  function show() {
    overlay.classList.add('active');
    overlay.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    isOpen = true;
  }

  function hide() {
    overlay.classList.remove('active');
    overlay.setAttribute('hidden', '');
    document.body.style.overflow = prevOverflow;
    isOpen = false;
  }

  function openLightbox(album, startIndex, opener) {
    if (!album || !album.photos.length) return;
    photos = album.photos;
    index = Math.min(Math.max(startIndex || 0, 0), photos.length - 1);
    lastFocused = opener || document.activeElement;
    prevOverflow = document.body.style.overflow;
    render();
    show();
    if (!pushedState) {
      try {
        history.pushState({ khsLightbox: true }, '');
        pushedState = true;
      } catch (err) { /* history unavailable (file://, sandbox) */ }
    }
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox(fromPop) {
    if (!isOpen) return;
    hide();
    photos = [];
    index = 0;
    if (lastFocused && lastFocused.focus) {
      try { lastFocused.focus(); } catch (err) { /* ignore */ }
    }
    lastFocused = null;
    if (!fromPop && pushedState) {
      pushedState = false;
      try { history.back(); } catch (err) { /* ignore */ }
    } else {
      pushedState = false;
    }
  }

  function step(dir) {
    if (!photos.length) return;
    index = (index + dir + photos.length) % photos.length;
    render();
  }

  function initLightbox() {
    overlay = document.getElementById('lightbox');
    if (!overlay) return;
    img = document.getElementById('lightboxImg');
    caption = document.getElementById('lightboxCaption');
    counter = document.getElementById('lightboxCounter');
    closeBtn = overlay.querySelector('[data-lightbox-close]');

    overlay.querySelectorAll('[data-lightbox-close]').forEach(function (btn) {
      btn.addEventListener('click', function () { closeLightbox(false); });
    });
    overlay.querySelector('[data-lightbox-prev]').addEventListener('click', function () { step(-1); });
    overlay.querySelector('[data-lightbox-next]').addEventListener('click', function () { step(1); });

    // Tap outside the photo closes.
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLightbox(false);
    });

    document.addEventListener('keydown', function (e) {
      if (!isOpen) return;
      if (e.key === 'Escape') closeLightbox(false);
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });

    window.addEventListener('popstate', function () {
      if (isOpen) closeLightbox(true);
    });

    // Swipe navigation.
    var startX = 0;
    var distX = 0;
    overlay.addEventListener('touchstart', function (e) {
      if (e.touches.length) startX = e.touches[0].clientX;
    }, { passive: true });
    overlay.addEventListener('touchmove', function (e) {
      if (e.touches.length) distX = e.touches[0].clientX - startX;
    }, { passive: true });
    overlay.addEventListener('touchend', function () {
      if (Math.abs(distX) > 50) step(distX > 0 ? -1 : 1);
      startX = 0;
      distX = 0;
    }, { passive: true });

    // Card clicks (delegated). Links inside cards keep working.
    document.addEventListener('click', function (e) {
      if (isOpen) return;
      if (e.target.closest('a')) return;
      var card = e.target.closest('.js-open-album');
      if (!card) return;
      var album = readAlbum(card);
      if (album) openLightbox(album, 0, card);
    });
    document.addEventListener('keydown', function (e) {
      if (isOpen) return;
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList &&
          e.target.classList.contains('js-open-album')) {
        e.preventDefault();
        var album = readAlbum(e.target);
        if (album) openLightbox(album, 0, e.target);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    wireFilterGroup('galleryCategoryFilter', '#galleryGrid .gallery-item', 'category', 'galleryEmpty');
    wireFilterGroup('galleryCelebrationFilter', '#galleryCelebrationGrid .gallery-celebration-card', 'campus', 'celebrationEmpty');
    initLightbox();
  });
})();
