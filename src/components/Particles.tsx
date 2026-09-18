"use client";

import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParticlesProps {
  count?: number;
  className?: string;
}

/**
 * Ambient floating dust / ember particles.
 * Deterministic so they never shift between renders.
 * Rendered only when the user hasn't asked for reduced motion.
 */
export default function Particles({ count = 16, className }: ParticlesProps) {
  const reduceMotion = useReducedMotion();

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const left = ((i * 61 + 13) % 100) / 100;
      const top = ((i * 37 + 29) % 100) / 100;
      return {
        left: `${left * 100}%`,
        top: `${top * 100}%`,
        size: 2 + ((i * 7) % 4),
        duration: 6 + ((i * 3) % 8),
        delay: (i % 12) * 0.6,
        opacity: 0.14 + ((i % 5) * 0.07),
        glow: i % 4 === 0,
      };
    });
  }, [count]);

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-champagne-300 animate-[drift_8s_ease-in-out_infinite]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: p.glow
              ? "0 0 12px 2px rgba(217, 201, 168, 0.35)"
              : undefined,
          }}
        />
      ))}
    </div>
  );
}