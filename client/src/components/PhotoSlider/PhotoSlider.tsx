// components/PhotoSlider.tsx
import React, { useRef, useState, useEffect } from 'react';
import Photo from '../Photo/Photo';
import './PhotoSlider.css';

interface PhotoSliderProps {
  title: string;
  subtitle?: string;
  photos: string[];
  photoWidth?: number;
  photoHeight?: number;
  zoomOnHover?: boolean;
}

const PhotoSlider: React.FC<PhotoSliderProps> = ({
  title,
  subtitle,
  photos,
  photoWidth,
  photoHeight,
  zoomOnHover,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -800 : 800,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollBy({
        left: e.deltaY > 0 ? 800 : -800,
        behavior: 'smooth',
      });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  const handlePrev = () => {
    if (activeIndex !== null && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex !== null && activeIndex < photos.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <section className="section light">
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="text-center text-gray-700 mb-4">{subtitle}</p>}

      <div className="slider-wrapper">
        <div className="slider-inner">
          <button className="slider-arrow left" onClick={() => scroll('left')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="horizontal-scroll" ref={scrollRef}>
            {photos.map((src, i) => (
              <Photo
                key={i}
                src={src}
                alt={`${title} ${i + 1}`}
                width={photoWidth}
                height={photoHeight}
                zoomOnHover={zoomOnHover}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>

          <button className="slider-arrow right" onClick={() => scroll('right')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {activeIndex !== null && (
        <div className="photo-modal" onClick={() => setActiveIndex(null)}>
          <img src={photos[activeIndex]} alt="Fullscreen" />

          <button className="close-btn" onClick={(e) => { e.stopPropagation(); setActiveIndex(null); }}>
            ✕
          </button>

          {activeIndex > 0 && (
            <button className="modal-arrow left" onClick={(e) => { e.stopPropagation(); handlePrev(); }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          {activeIndex < photos.length - 1 && (
            <button className="modal-arrow right" onClick={(e) => { e.stopPropagation(); handleNext(); }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default PhotoSlider;
