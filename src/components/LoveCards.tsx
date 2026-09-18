"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Shuffle } from "lucide-react";
import type { ReasonCard } from "@/data/types";
import { reasons } from "@/data/reasons";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";

function LoveCard({ reason }: { reason: ReasonCard }) {
  const reduceMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        aria-label={`${reason.title} — tap to reveal`}
        className="group relative block h-56 w-full [perspective:1400px] focus-visible:outline-2 focus-visible:outline-champagne-400 sm:h-60"
      >
        <div
          className={cn("preserve-3d relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]", flipped && "rotate-y-180")}
          style={reduceMotion ? { transition: "none" } : undefined}
        >
          <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/[0.09] bg-noir-800 p-6 text-center transition-colors duration-500 group-hover:border-white/20">
            <span className="pointer-events-none absolute -right-2 -top-6 font-serif text-[7rem] leading-none text-white/[0.045]">
              {reason.number}
            </span>
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-ivory-400/70">
              Reason {reason.number}
            </span>
            <span className="mt-4 font-serif text-2xl text-ivory-50 sm:text-[1.75rem]">
              {reason.title}
            </span>
            <span className="mt-5 text-[0.68rem] uppercase tracking-[0.25em] text-rose-300/80">
              Tap to reveal
            </span>
          </div>

          <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-rose-700/40 bg-gradient-to-br from-rose-900/70 via-noir-850 to-noir-900 p-6 text-center">
            <Heart className="mb-3 h-4 w-4 text-rose-300" fill="currentColor" />
            <p className="text-sm font-light leading-relaxed text-ivory-100/95">
              {reason.message}
            </p>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function LoveCards() {
  const [order, setOrder] = useState(() => reasons.map((_, i) => i));
  const [round, setRound] = useState(0);

  const shuffle = () => {
    setOrder(shuffleArray(order));
    setRound((r) => r + 1);
  };

  return (
    <section id="reasons" className="relative py-28 sm:py-40">
      <div className="mx-auto mb-16 flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
        <SectionHeading
          eyebrow={siteConfig.reasons.eyebrow}
          title={siteConfig.reasons.title}
          subtitle={siteConfig.reasons.hint}
        />
        <button
          type="button"
          onClick={shuffle}
          aria-label="Shuffle the reasons"
          className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-2 text-[0.65rem] uppercase tracking-[0.28em] text-ivory-300/75 transition hover:border-champagne-400/50 hover:text-champagne-300 focus-visible:outline-2 focus-visible:outline-champagne-400"
        >
          <Shuffle className="h-3.5 w-3.5" />
          Shuffle
        </button>
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {order.map((idx, pos) => (
            <LoveCard
              key={`${idx}-${round}-${pos}`}
              reason={reasons[idx]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}