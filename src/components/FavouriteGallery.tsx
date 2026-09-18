"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { favouritePhotos } from "@/data/favourites";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";

export default function FavouriteGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);

  const updateControls = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateControls();
    el.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);
    return () => {
      el.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>("[data-slide]");
    const step = item ? item.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="favourites" className="relative overflow-hidden py-28 sm:py-40">
      <div className="mx-auto mb-14 max-w-4xl px-6">
        <SectionHeading
          eyebrow={siteConfig.favourites.eyebrow}
          title={siteConfig.favourites.title}
          subtitle={siteConfig.favourites.subtitle}
        />
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 sm:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
          style={{ scrollbarWidth: "none" }}
        >
          {favouritePhotos.map((photo) => (
            <article
              key={photo.id}
              data-slide
              className="group relative w-[74vw] shrink-0 snap-center sm:w-[46vw] lg:w-[38vw] xl:w-[560px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-noir-800">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1280px) 560px, (min-width: 640px) 46vw, 74vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70" />
              </div>
              <p className="mt-5 px-1 font-serif text-lg italic text-ivory-100/90 sm:text-xl">
                {photo.caption}
              </p>
            </article>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-noir-950 to-transparent lg:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-noir-950 to-transparent lg:block" />

        {/* Controls */}
        <div className="mt-8 hidden items-center justify-center gap-4 lg:flex">
          <button
            type="button"
            onClick={() => nudge(-1)}
            disabled={!canPrev}
            aria-label="Previous photographs"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-ivory-200 transition",
              canPrev
                ? "hover:border-champagne-400/60 hover:text-champagne-300"
                : "cursor-not-allowed opacity-35",
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="h-px w-40 overflow-hidden rounded bg-white/10">
            <div
              className="h-full origin-left bg-gradient-to-r from-rose-500 to-champagne-300 transition-transform duration-200"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
          <button
            type="button"
            onClick={() => nudge(1)}
            disabled={!canNext}
            aria-label="Next photographs"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-ivory-200 transition",
              canNext
                ? "hover:border-champagne-400/60 hover:text-champagne-300"
                : "cursor-not-allowed opacity-35",
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}