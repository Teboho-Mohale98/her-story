"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play, X } from "lucide-react";
import { videoMemories } from "@/data/videos";
import { siteConfig } from "@/data/site";
import SectionHeading from "./SectionHeading";

function VideoModal({
  index,
  onClose,
}: {
  index: number;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const video = videoMemories[index];
  const [failed, setFailed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => {
      setFailed(false);
      closeRef.current?.focus();
    }, 50);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [onClose, video.id]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-ivory-200 transition hover:border-white/35 hover:text-white focus-visible:outline-2 focus-visible:outline-champagne-400"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="overflow-hidden rounded-2xl bg-noir-900 shadow-2xl">
          {failed ? (
            <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 px-6 text-center">
              <Play className="h-6 w-6 text-rose-300" />
              <p className="text-sm text-ivory-300/90">
                I couldn&apos;t find this video.
                <br />
                Place it at{" "}
                <code className="text-champagne-300">{video.src}</code> and
                reload.
              </p>
            </div>
          ) : (
            <video
              key={video.src}
              src={video.src}
              poster={video.poster}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full bg-black object-contain"
              onError={() => setFailed(true)}
            />
          )}
        </div>

        <p className="mt-4 text-center font-serif text-lg text-ivory-100 sm:text-xl">
          {video.title}
        </p>
      </div>
    </motion.div>
  );
}

export default function VideoGallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="videos" className="relative py-28 sm:py-40">
      <div className="mx-auto mb-16 max-w-4xl px-6">
        <SectionHeading
          eyebrow={siteConfig.videos.eyebrow}
          title={siteConfig.videos.title}
        />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videoMemories.map((video, i) => (
            <motion.button
              key={video.id}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-noir-800 text-left focus-visible:outline-2 focus-visible:outline-champagne-400"
            >
              <Image
                src={video.poster}
                alt={`Video poster: ${video.title}`}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-champagne-400/70 sm:h-16 sm:w-16">
                  <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
                </span>
              </div>

              <p className="absolute inset-x-0 bottom-0 p-4 text-sm font-light text-ivory-100">
                {video.title}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null ? (
          <VideoModal
            key={active}
            index={active}
            onClose={() => setActive(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}