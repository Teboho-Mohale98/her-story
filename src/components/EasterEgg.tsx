"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

interface EasterEggProps {
  className?: string;
}

/**
 * A small discreet heart, tucked into the navigation.
 * Tap it five times and a little secret reveals itself.
 */
export default function EasterEgg({ className }: EasterEggProps) {
  const reduceMotion = useReducedMotion();
  const [clicks, setClicks] = useState(0);
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);

  const reset = useCallback(() => {
    setClicks(0);
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const handleClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(reset, 2000);
    if (next >= siteConfig.easterEgg.clicks) {
      setOpen(true);
      reset();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label="A tiny little secret is hidden here"
        className={cn(
          "group inline-flex h-9 w-9 items-center justify-center rounded-full text-ivory-300/60 transition hover:text-rose-300 focus-visible:outline-2 focus-visible:outline-champagne-400",
          className,
        )}
      >
        <Heart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" fill="currentColor" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Secret message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/90 p-6 backdrop-blur-md"
            onClick={handleClose}
          >
            <motion.div
              initial={{
                scale: reduceMotion ? 1 : 0.88,
                opacity: 0,
                filter: "blur(8px)",
              }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{
                scale: reduceMotion ? 1 : 0.92,
                opacity: 0,
                filter: "blur(6px)",
              }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-md rounded-3xl border border-white/10 bg-noir-900 p-8 text-center sm:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close secret"
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-ivory-300/70 transition hover:text-white focus-visible:outline-2 focus-visible:outline-champagne-400"
              >
                <X className="h-4 w-4" />
              </button>

              <Heart
                className="mx-auto mb-5 h-8 w-8 text-rose-300 animate-[pulse-soft_3s_ease-in-out_infinite]"
                fill="currentColor"
              />
              <p className="font-serif text-2xl text-ivory-50">
                {siteConfig.easterEgg.reveal}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ivory-300/80">
                {siteConfig.easterEgg.message}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}