"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ctfImg } from "@/utils/image";

const SWIPE_THRESHOLD_PX = 40;

export default function RealizationCarousel({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const count = images.length;
  // One clone of the last image at the start and one clone of the first
  // image at the end make the wraparound step look continuous: sliding past
  // either end lands on a clone, then a transition-less snap back to the
  // matching real slide happens invisibly.
  const slides = count > 1 ? [images[count - 1], ...images, images[0]] : images;
  const [position, setPosition] = useState(count > 1 ? 1 : 0);
  const [animate, setAnimate] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const goTo = (delta: number) => {
    setAnimate(true);
    setPosition((p) => p + delta);
  };

  const handleTransitionEnd = () => {
    if (position === slides.length - 1) {
      setAnimate(false);
      setPosition(1);
    } else if (position === 0) {
      setAnimate(false);
      setPosition(count);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (delta > SWIPE_THRESHOLD_PX) goTo(-1);
    else if (delta < -SWIPE_THRESHOLD_PX) goTo(1);
  };

  const activeIndex = ((position - 1 + count) % count + count) % count;

  // The lightbox navigates over the plain `images` array (no slide
  // animation, matching GalleryGrid's lightbox), independent of the
  // inline carousel's clone-based track above.
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => {
    // Leave the inline carousel showing whatever was last open in the
    // lightbox, so the two stay in sync after closing.
    if (lightboxIndex !== null && count > 1 && lightboxIndex !== activeIndex) {
      setAnimate(false);
      setPosition(1 + lightboxIndex);
    }
    setLightboxIndex(null);
  }, [lightboxIndex, activeIndex, count]);

  const showPrevInLightbox = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + count) % count));
  }, [count]);
  const showNextInLightbox = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % count));
  }, [count]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrevInLightbox();
      if (e.key === "ArrowRight") showNextInLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, closeLightbox, showPrevInLightbox, showNextInLightbox]);

  return (
    <>
      <div
        className="relative aspect-video rounded-2xl overflow-hidden border border-black/10 select-none"
        onTouchStart={count > 1 ? onTouchStart : undefined}
        onTouchEnd={count > 1 ? onTouchEnd : undefined}
      >
        <button
          type="button"
          className="absolute inset-0 flex h-full cursor-zoom-in appearance-none border-0 p-0 m-0 bg-transparent"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${(position * 100) / slides.length}%)`,
            transition: animate ? "transform 0.4s cubic-bezier(0.22,1,0.36,1)" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
          onClick={() => setLightboxIndex(activeIndex)}
          aria-label="Powiększ zdjęcie"
        >
          {slides.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={ctfImg(src, 1200)}
              alt={alt}
              loading={i === position ? "eager" : "lazy"}
              className="h-full object-cover"
              style={{ width: `${100 / slides.length}%` }}
            />
          ))}
        </button>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(-1)}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-colors z-10"
              aria-label="Poprzednie zdjęcie"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => goTo(1)}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-colors z-10"
              aria-label="Następne zdjęcie"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === activeIndex ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div
        className={`fixed inset-0 z-70 flex items-center justify-center p-4 sm:p-8 transition-opacity duration-200 ${
          lightboxIndex !== null ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Podgląd zdjęcia"
      >
        <div className="absolute inset-0 bg-[#0A0E14]/90 backdrop-blur-sm" onClick={closeLightbox} />

        <button
          type="button"
          onClick={closeLightbox}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 grid place-items-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
          aria-label="Zamknij podgląd"
        >
          <X className="w-5 h-5" />
        </button>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={showPrevInLightbox}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Poprzednie zdjęcie"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={showNextInLightbox}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Następne zdjęcie"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {lightboxIndex !== null && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={ctfImg(images[lightboxIndex], 1600)}
            alt={alt}
            className="relative max-w-full max-h-full object-contain rounded-lg select-none"
          />
        )}
      </div>
    </>
  );
}
