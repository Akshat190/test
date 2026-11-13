'use client';

import Icon from '@/components/Icon';
import { useEffect } from 'react';

export default function ScrollToTop() {
  useEffect(() => {
    const button = document.getElementById('scrollToTop');
    if (!button) return;

    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      if (y > 300) button.classList.add('visible');
      else button.classList.remove('visible');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.querySelectorAll('[data-scroll-top]').forEach((element) => {
      element.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }, []);

  return (
    <>
      <div className="quick-contact">
        <a className="quick-contact-btn quick-contact-call" href="tel:+916354368335" aria-label="Call the school office">
          <Icon name="phone" />
        </a>
        <a className="quick-contact-btn quick-contact-wa" href="https://wa.me/916354368335" target="_blank" rel="noopener" aria-label="Message the school on WhatsApp">
          <Icon name="message-circle" />
        </a>
      </div>

      <button id="scrollToTop" className="scroll-to-top" aria-label="Scroll to top">
        <Icon name="arrow-up" />
      </button>
    </>
  );
}
