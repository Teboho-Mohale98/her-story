"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/data/site";
import Particles from "./Particles";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollToStory = () => {
    document.getElementById("intro-letter")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={ref}
      id="top"
      aria-label={`Happy birthday, ${siteConfig.girlfriendName}`}
      className="relative flex h-[100svh] min-h-[36rem] items-end justify-center overflow-hidden"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={siteConfig.hero.image}
          alt={siteConfig.girlfriendName}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-noir-950" />
      <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-transparent to-transparent" />

      <Particles count={14} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex w-full flex-col items-center px-6 pb-24 text-center sm:pb-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 text-[0.68rem] uppercase tracking-[0.45em] text-champagne-300/90"
        >
          Happy Birthday, My Love
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl leading-none text-ivory-50 drop-shadow-[0_2px_30px_rgba(0,0,0,0.55)] sm:text-7xl md:text-8xl"
        >
          {siteConfig.girlfriendName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.75 }}
          className="mt-7 max-w-md text-sm font-light leading-relaxed text-ivory-200/90 sm:text-base"
        >
          {siteConfig.hero.statement}
        </motion.p>

        <motion.button
          type="button"
          onClick={scrollToStory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.1 }}
          className="mt-16 flex flex-col items-center gap-3 text-[0.68rem] uppercase tracking-[0.35em] text-ivory-300/80 transition hover:text-champagne-300 focus-visible:outline-2 focus-visible:outline-champagne-400"
          aria-label="Scroll to begin"
        >
          Scroll to begin
          <span className="inline-block animate-[bounce-slow_2.6s_ease-in-out_infinite] text-lg leading-none">
            ↓
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}