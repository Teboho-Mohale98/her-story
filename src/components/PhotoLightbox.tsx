"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/data/types";

interface PhotoLightboxProps {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function PhotoLightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: PhotoLightboxProps) {
  const reduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<number | null>(null);
  const isOpen = index !== null;

  const activePhoto = isOpen ? photos[index] : undefined;
  const galleryId = activePhoto ? `${activePhoto.id}-${index}` : "";
  const activeIndex = index;

  const goPrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (activeIndex === null) return;
      onNavigate((activeIndex - 1 + photos.length) % photos.length);
    },
    [activeIndex, photos.length, onNavigate],
  );

  const goNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (activeIndex === null) return;
      onNavigate((activeIndex + 1) % photos.length);
    },
    [activeIndex, photos.length, onNavigate],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => closeRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [isOpen, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {isOpen && activePhoto ? (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.caption || activePhoto.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[90] flex flex-col bg-black/95 backdrop-blur-md"
          onClick={onClose}
          onTouchStart={(e) => {
            touchStart.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStart.current === null) return;
            const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStart.current;
            if (Math.abs(dx) > 60) {
              if (dx < 0) goNext();
              else goPrev();
            }
            touchStart.current = null;
          }}
        >
          <div className="relative flex h-full w-full flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between p-4 sm:p-6">
              <span className="pl-1 text-xs tracking-[0.3em] text-ivory-300/70">
                {activeIndex !== null ? `${String(activeIndex + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}` : ""}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                aria-label="Close photo"
                className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-ivory-200 transition hover:border-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-champagne-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Image */}
            <div
              key={galleryId}
              className="relative min-h-0 flex-1 px-2 sm:px-10"
            >
              <motion.div
                key={galleryId}
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                className="relative h-full w-full"
              >
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  className="object-contain"
                  fill
                  sizes="100vw"
                  priority
                />
              </motion.div>
            </div>

            {/* Caption */}
            <div className="relative px-6 pb-8 pt-4 text-center sm:pb-10">
              {activePhoto.caption ? (
                <p className="font-serif text-lg text-ivory-100 sm:text-xl">
                  {activePhoto.caption}
                </p>
              ) : null}
              {activePhoto.date ? (
                <p className="mt-1.5 text-xs uppercase tracking-[0.25em] text-champagne-400/80">
                  {activePhoto.date}
                </p>
              ) : null}
            </div>

            {/* Prev / Next */}
            {photos.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/30 p-3 text-ivory-200 backdrop-blur transition hover:border-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-champagne-400 sm:left-5 sm:inline-flex"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/30 p-3 text-ivory-200 backdrop-blur transition hover:border-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-champagne-400 sm:right-5 sm:inline-flex"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}