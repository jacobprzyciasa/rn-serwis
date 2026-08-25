"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Reveal from "./Reveal";
import type { GalleryPhoto } from "@/data/gallery";

const ALT = "Zdjęcie z serwisu RN Serwis Elektroniki";

export default function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, [photos.length]);
  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, showPrev, showNext]);

  return (
    <>
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, i) => (
          <Reveal key={photo.id} delay={(i % 8) * 0.05}>
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              className="group relative block w-full aspect-square rounded-xl overflow-hidden border border-black/8 bg-white cursor-zoom-in"
              aria-label="Powiększ zdjęcie"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.image}
                alt={ALT}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </button>
          </Reveal>
        ))}
      </div>

      <div
        className={`fixed inset-0 z-70 flex items-center justify-center p-4 sm:p-8 transition-opacity duration-200 ${
          activeIndex !== null ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Podgląd zdjęcia"
      >
        <div className="absolute inset-0 bg-[#0A0E14]/90 backdrop-blur-sm" onClick={close} />

        <button
          type="button"
          onClick={close}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 grid place-items-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
          aria-label="Zamknij podgląd"
        >
          <X className="w-5 h-5" />
        </button>

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPrev}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Poprzednie zdjęcie"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Następne zdjęcie"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {activeIndex !== null && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photos[activeIndex].image}
            alt={ALT}
            className="relative max-w-full max-h-full object-contain rounded-lg select-none"
          />
        )}
      </div>
    </>
  );
}
