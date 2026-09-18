"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";

interface IntroScreenProps {
  onEnter: () => void;
}

/** Cumulative reveal: each line fades up as its turn arrives, and stays. */
export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const reduceMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(0);
  const [ready, setReady] = useState(false);

  const lines = siteConfig.intro.lines;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    // Read the preference in a callback (never during render) so the SSR
    // markup and the first client render are identical — this keeps
    // hydration warnings away for users who prefer reduced motion.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const gaps = prefersReduced
      ? lines.map(() => 1)
      : [1000, 2000, 2400].slice(0, lines.length);

    const timers: number[] = [];
    let acc = 0;

    gaps.forEach((gap, i) => {
      acc += gap;
      timers.push(window.setTimeout(() => setVisibleCount(i + 1), acc));
    });

    const buttonDelay = prefersReduced ? 20 : 1300;
    timers.push(
      window.setTimeout(() => setReady(true), acc + buttonDelay),
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [lines]);

  return (
    <motion.div
      key="intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: reduceMotion ? 0 : 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-noir-950 px-6"
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex min-h-[11rem] flex-col items-center justify-center gap-3 sm:min-h-[12rem] sm:gap-4">
          {lines.map((line, i) => {
            const visible = i < visibleCount;
            return (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                animate={
                  visible
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : undefined
                }
                transition={{
                  duration: reduceMotion ? 0 : 1.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ visibility: visible ? "visible" : "hidden" }}
                className="font-serif text-2xl leading-snug text-ivory-50 sm:text-4xl"
              >
                {line}
              </motion.p>
            );
          })}
        </div>

        {ready ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              delay: reduceMotion ? 0 : 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8"
          >
            <button
              type="button"
              onClick={onEnter}
              className="group inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-4 text-[0.72rem] uppercase tracking-[0.3em] text-ivory-100 transition hover:border-champagne-400/60 hover:text-champagne-300 focus-visible:outline-2 focus-visible:outline-champagne-400 sm:px-10"
            >
              {siteConfig.intro.enterLabel}
              <span className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
}