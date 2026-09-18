"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { memories } from "@/data/memories";
import { siteConfig } from "@/data/site";
import type { PhotoRatio } from "@/data/types";
import SectionHeading from "./SectionHeading";
import PhotoLightbox from "./PhotoLightbox";

const ratios: Record<PhotoRatio, string> = {
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  tall: "aspect-[9/16]",
};

export default function MemoryGallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="memories" className="relative py-28 sm:py-40">
      <div className="mx-auto mb-16 max-w-4xl px-6">
        <SectionHeading
          eyebrow={siteConfig.memories.eyebrow}
          title={siteConfig.memories.title}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="gap-4 columns-2 md:gap-5 lg:columns-3">
          {memories.map((photo, i) => (
            <motion.button
              key={photo.id}
              type="button"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActive(i)}
              className="group relative mb-4 block w-full overflow-hidden rounded-xl bg-noir-800 focus-visible:outline-2 focus-visible:outline-champagne-400 md:mb-5"
            >
              <div className={`relative ${ratios[photo.ratio]}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                  className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-[1.05]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {photo.caption ? (
                  <p className="font-serif text-base text-ivory-50 sm:text-lg">
                    {photo.caption}
                  </p>
                ) : null}
                {photo.date ? (
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-champagne-300">
                    {photo.date}
                  </p>
                ) : null}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <PhotoLightbox
        photos={memories}
        index={active}
        onClose={() => setActive(null)}
        onNavigate={setActive}
      />
    </section>
  );
}