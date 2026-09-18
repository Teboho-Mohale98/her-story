"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { polaroids } from "@/data/polaroids";
import { siteConfig } from "@/data/site";
import SectionHeading from "./SectionHeading";

function Polaroid({ index }: { index: number }) {
  const [active, setActive] = useState(false);
  const polaroid = polaroids[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="mb-6 break-inside-avoid sm:mb-8"
    >
      <button
        type="button"
        onClick={() => setActive((v) => !v)}
        aria-pressed={active}
        aria-label={`Polaroid memory: ${polaroid.caption}`}
        className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-champagne-400"
        style={{
          transform: `rotate(${active ? 0 : polaroid.rotation}deg) scale(${active ? 1.03 : 1})`,
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
          boxShadow: active
            ? "0 28px 60px -18px rgba(0,0,0,0.85)"
            : "0 16px 40px -20px rgba(0,0,0,0.6)",
        }}
      >
        <div className="rounded-[4px] bg-[#f3ede0] p-3 pb-4 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.6)] transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-18px_rgba(0,0,0,0.8)] sm:p-4 sm:pb-5">
          <div className="relative aspect-square w-full overflow-hidden bg-black/20">
            <Image
              src={polaroid.src}
              alt={`A polaroid photograph: ${polaroid.caption}`}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-center font-hand text-2xl text-[#4a3f31] sm:text-[1.7rem]">
            {polaroid.caption}
          </p>
        </div>
      </button>
    </motion.div>
  );
}

export default function PolaroidWall() {
  return (
    <section id="polaroids" className="relative py-28 sm:py-40">
      <div className="mx-auto mb-16 max-w-4xl px-6">
        <SectionHeading
          eyebrow={siteConfig.polaroids.eyebrow}
          title={siteConfig.polaroids.title}
        />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <div className="columns-2 gap-6 sm:columns-3 sm:gap-8">
          {polaroids.map((p, i) => (
            <Polaroid key={p.id} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}