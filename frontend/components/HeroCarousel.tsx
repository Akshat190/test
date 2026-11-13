'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

import type { CarouselImage } from '@/lib/types';

type Slide = {
  key: string;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
};

const FALLBACK: Slide[] = [
  {
    key: 'campus',
    image: '/static/image/Shela-school-image.jpeg',
    alt: 'Kapadia High School building and grounds',
    title: 'Kapadia High School',
    subtitle: 'A co-educational English medium school in Kalol, Gujarat, established in 1956.',
    buttonText: 'About the school',
    buttonLink: '/aboutSchool/',
  },
];

export default function HeroCarousel({ images }: { images: CarouselImage[] }) {
  const slides: Slide[] = images.length
    ? images.map((image) => ({
        key: String(image.id),
        image: image.image ?? '/static/image/Shela-school-image.jpeg',
        alt: image.title || 'Kapadia High School campus',
        title: image.title,
        subtitle: image.subtitle,
        buttonText: image.button_text,
        buttonLink: image.button_link,
      }))
    : FALLBACK;

  const autoplayRef = useRef(Autoplay({
    delay: 6000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    playOnInit: true,
  }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: slides.length > 1, align: 'start' },
    [autoplayRef.current],
  );
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const count = slides.length;

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActive(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    if (count < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      autoplayRef.current.stop();
      setPlaying(false);
    }
  }, [emblaApi, count]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const toggleAutoplay = useCallback(() => {
    const autoplay = autoplayRef.current;
    if (autoplay.isPlaying()) {
      autoplay.stop();
      setPlaying(false);
    } else {
      autoplay.play();
      setPlaying(true);
    }
  }, []);

  return (
    <div className="carousel-container" id="home-carousel-container">
      <div
        id="homeCarousel"
        className="carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="School photographs"
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') prev();
          if (event.key === 'ArrowRight') next();
        }}
      >
        <div className="carousel-viewport" ref={emblaRef}>
          <div className="carousel-inner">
            {slides.map((slide, index) => (
              <div key={slide.key} className="carousel-item" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${count}`}>
                <div className="carousel-image-container">
                  <img
                    src={slide.image}
                    className="carousel-image"
                    alt={slide.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'low'}
                  />
                </div>
                <div className="carousel-caption">
                  <h2>{slide.title}</h2>
                  <p>{slide.subtitle}</p>
                  {slide.buttonText && slide.buttonLink && (
                    <a href={slide.buttonLink} className="btn carousel-btn">{slide.buttonText}</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {count > 1 && (
          <>
            <div className="carousel-indicators">
              {slides.map((slide, index) => (
                <button
                  key={slide.key}
                  type="button"
                  className={index === active ? 'active' : undefined}
                  aria-current={index === active ? 'true' : undefined}
                  aria-label={`Slide ${index + 1}`}
                  onClick={() => scrollTo(index)}
                ></button>
              ))}
            </div>
            <button
              type="button"
              className="carousel-autoplay-toggle"
              aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
              onClick={toggleAutoplay}
            >
              {playing ? <Pause size={16} strokeWidth={1.5} aria-hidden="true" /> : <Play size={16} strokeWidth={1.5} aria-hidden="true" />}
            </button>
            <button type="button" className="carousel-control-prev" aria-label="Previous slide" onClick={prev}>
              <ChevronLeft aria-hidden="true" size={26} strokeWidth={1.5} />
            </button>
            <button type="button" className="carousel-control-next" aria-label="Next slide" onClick={next}>
              <ChevronRight aria-hidden="true" size={26} strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
