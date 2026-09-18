"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import { futureMemories } from "@/data/future";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";

interface StarPos {
  x: number;
  y: number;
  size: number;
  delay: number;
}

/** Deterministic pseudo-random spread so the sky never changes between renders. */
function computePositions(count: number): StarPos[] {
  const positions: StarPos[] = [];
  for (let i = 0; i < count; i++) {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const seed = i * 47 + 13;
    const xJitter = ((seed % 13) - 6) * 1.5;
    const yJitter = (((seed * 7) % 11) - 5) * 2.2;
    const x = Math.min(88, Math.max(10, 16 + col * 34 + xJitter));
    const y = Math.min(82, Math.max(12, 18 + row * 34 + yJitter));
    const size = 4 + ((i * 3) % 3);
    positions.push({
      x,
      y: i % 2 === 0 ? y : y + 6,
      size: i % 2 === 0 ? size : size + 1,
      delay: (i % 6) * 0.55,
    });
  }
  return positions;
}

export default function FutureStars() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const positions = useMemo(() => computePositions(futureMemories.length), []);

  return (
    <section id="future" className="relative overflow-hidden py-28 sm:py-40">
      <div className="mx-auto mb-12 max-w-4xl px-6">
        <SectionHeading
          eyebrow={siteConfig.future.eyebrow}
          title={siteConfig.future.title}
        />
      </div>

      <div className="relative mx-auto min-h-[62vh] max-w-5xl px-6 md:min-h-[74vh]">
        {/* night sky — nebula glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-800/10 blur-3xl" />
          <div className="absolute bottom-10 right-1/4 h-64 w-64 rounded-full bg-champagne-500/10 blur-3xl" />
        </div>

        {/* scattered faint background stars */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {Array.from({ length: 40 }, (_, i) => {
            const sx = ((i * 31 + 7) % 100);
            const sy = ((i * 53 + 19) % 100);
            return (
              <span
                key={i}
                className="absolute rounded-full bg-ivory-100/30"
                style={{
                  left: `${sx}%`,
                  top: `${sy}%`,
                  width: i % 3 === 0 ? 2 : 1,
                  height: i % 3 === 0 ? 2 : 1,
                  opacity: 0.12 + ((i % 4) * 0.08),
                }}
              />
            );
          })}
        </div>

        {/* future memory stars */}
        {futureMemories.map((memory, i) => {
          const pos = positions[i];
          return (
            <motion.button
              key={memory.id}
              type="button"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: pos.delay * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => setActive(active === i ? null : i)}
              aria-label={`Reveal future memory: ${memory.label}`}
              aria-pressed={active === i}
              className="group absolute -translate-x-1/2 -translate-y-1/2 focus-visible:outline-2 focus-visible:outline-champagne-400"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <Star
                className={cn(
                  "transition-all duration-300",
                  active === i ? "text-champagne-300" : "text-ivory-100/80",
                )}
                style={{
                  width: pos.size + (active === i ? 4 : 0),
                  height: pos.size + (active === i ? 4 : 0),
                  animationDelay: `${pos.delay}s`,
                  filter:
                    active === i
                      ? "drop-shadow(0 0 10px rgba(230,213,181,0.95))"
                      : "drop-shadow(0 0 4px rgba(230,213,181,0.55))",
                }}
                fill={active === i ? "currentColor" : "none"}
              />
              <span className="pointer-events-none absolute left-1/2 top-full mt-2 whitespace-nowrap -translate-x-1/2 text-[0.6rem] uppercase tracking-[0.22em] text-ivory-300/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {memory.label}
              </span>
            </motion.button>
          );
        })}

        {/* revealed message */}
        <AnimatePresence mode="wait">
          {active !== null ? (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute inset-x-4 bottom-6 flex justify-center sm:bottom-10"
            >
              <div className="pointer-events-auto relative max-w-md rounded-3xl border border-white/10 bg-noir-900/85 p-6 text-center shadow-2xl backdrop-blur-xl sm:p-8">
                <Sparkles className="mx-auto mb-3 h-4 w-4 text-champagne-300" />
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-champagne-300/90">
                  {futureMemories[active].label}
                </p>
                <p className="mt-3 font-serif text-lg leading-relaxed text-ivory-100">
                  {futureMemories[active].message}
                </p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}