"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";

export default function FinalMessage() {
  const reduceMotion = useReducedMotion();

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section id="final" className="relative overflow-hidden pb-14 pt-28 sm:pt-40">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl text-ivory-50 sm:text-5xl"
        >
          {siteConfig.final.thankYou}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 font-serif text-xl font-light italic text-ivory-300/90 sm:text-2xl"
        >
          {siteConfig.final.chapter}
        </motion.p>

        {/* sequence of words */}
        <div className="mt-16 flex flex-col gap-5 sm:mt-20 sm:gap-6">
          {siteConfig.final.words.map((word, i) => (
            <motion.p
              key={word}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 1.1,
                delay: i * 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-serif text-4xl leading-tight text-champagne-200 sm:text-6xl"
            >
              {word}
            </motion.p>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 font-serif text-3xl text-ivory-50 sm:text-5xl"
        >
          {siteConfig.final.birthday}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.35 }}
          className="mt-5 font-serif text-2xl italic text-champagne-300"
        >
          {siteConfig.yourName}
        </motion.p>

        {/* final photograph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-14 w-full max-w-sm"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <Image
              src={siteConfig.final.image}
              alt={`${siteConfig.girlfriendName} — the last photograph of the story`}
              fill
              sizes="(max-width: 640px) 80vw, 24rem"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </motion.div>

        {/* replay */}
        <motion.button
          type="button"
          onClick={goToTop}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="group mt-14 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-ivory-100 transition hover:border-champagne-400/60 hover:text-champagne-300 focus-visible:outline-2 focus-visible:outline-champagne-400"
        >
          {siteConfig.final.replay}
        </motion.button>
      </div>

      <p className="mt-24 text-center text-[0.68rem] uppercase tracking-[0.3em] text-ivory-500/70">
        {siteConfig.final.credit}
      </p>
    </section>
  );
}