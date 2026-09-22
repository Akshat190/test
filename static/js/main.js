/**
 * Kapadia High School - main site script.
 * - Sticky footer is handled purely by CSS (flex + min-vh-100). No JS needed.
 * - Bootstrap dropdowns/collapse use native Bootstrap JS. No custom overrides.
 */
(function () {
  'use strict';

  function initCarousel() {
    var carousel = document.querySelector('#homeCarousel');
    if (!carousel) return;
    // data-bs-ride="carousel" already auto-starts it; only init if needed
    // and only if Bootstrap actually loaded (CDN/adblock safe).
    if (typeof window.bootstrap === 'undefined' || !window.bootstrap.Carousel) return;
    try {
      if (window.bootstrap.Carousel.getInstance) {
        if (window.bootstrap.Carousel.getInstance(carousel)) return;
      }
      // eslint-disable-next-line no-new
      new window.bootstrap.Carousel(carousel, {
        interval: 5000,
        wrap: true,
        keyboard: true
      });
    } catch (err) {
      // Never break the rest of the page because of the carousel.
      if (window.console && console.warn) console.warn('Carousel init skipped:', err);
    }
  }

  function initScrollToTop() {
    var btn = document.getElementById('scrollToTop');
    if (!btn) return;
    var onScroll = function () {
      var y = window.scrollY || document.documentElement.scrollTop || 0;
      if (y > 300) btn.classList.add('visible');
      else btn.classList.remove('visible');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    // Footer "back to top" buttons share the same behaviour.
    document.querySelectorAll('[data-scroll-top]').forEach(function (el) {
      el.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  // Map tabs on the contact page. Works with data attributes;
  // window.showMap is kept for backwards-compat with old inline onclick.
  function showMap(mapId) {
    var iframes = document.querySelectorAll('.map-container iframe');
    if (!iframes.length) return;
    var target = mapId ? document.getElementById(mapId) : null;
    if (!target) return;
    iframes.forEach(function (iframe) {
      iframe.style.display = 'none';
    });
    target.style.display = 'block';
    var buttons = document.querySelectorAll('.map-tab-btn');
    buttons.forEach(function (btn) {
      var isActive = btn.getAttribute('data-map-target') === mapId;
      btn.classList.toggle('active', isActive);
      if (isActive) btn.setAttribute('aria-selected', 'true');
      else btn.removeAttribute('aria-selected');
    });
  }

  function initMapTabs() {
    var buttons = document.querySelectorAll('.map-tab-btn');
    if (!buttons.length) return;
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var mapId = button.getAttribute('data-map-target');
        // Fallback for any legacy inline onclick="showMap('map1')"
        if (!mapId) {
          var inline = button.getAttribute('onclick') || '';
          var m = inline.match(/'([^']+)'/);
          if (m) mapId = m[1];
        }
        if (mapId) showMap(mapId);
      });
    });
    // Default to first tab if none marked active.
    var active = document.querySelector('.map-tab-btn.active');
    var firstId = active
      ? active.getAttribute('data-map-target')
      : buttons[0].getAttribute('data-map-target');
    if (firstId) showMap(firstId);
  }

  // Expose for any remaining inline handlers.
  window.showMap = showMap;

  document.addEventListener('DOMContentLoaded', function () {
    initCarousel();
    initScrollToTop();
    initMapTabs();
  });
})();
