"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";

export default function PersonalIntroduction() {
  return (
    <section
      id="intro-letter"
      className="relative overflow-hidden py-28 sm:py-40"
    >
      <div className="mx-auto max-w-4xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center text-[0.68rem] uppercase tracking-[0.4em] text-champagne-400"
        >
          {siteConfig.introduction.eyebrow}
        </motion.p>

        <div className="flex flex-col gap-8 sm:gap-10">
          {siteConfig.introduction.paragraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 42, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 1,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={
                i === 0
                  ? "font-serif text-3xl leading-snug text-ivory-50 sm:text-4xl"
                  : "text-lg font-light leading-relaxed text-ivory-300/90 sm:text-xl"
              }
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}