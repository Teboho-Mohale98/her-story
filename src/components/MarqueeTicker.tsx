"use client";

import { useReducedMotion } from "framer-motion";

const words = [
  "you",
  "me",
  "us",
  "always",
  "together",
  "you",
  "me",
  "us",
  "always",
  "together",
];

export default function MarqueeTicker() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative overflow-hidden border-y border-white/[0.06] bg-noir-950 py-5"
      aria-hidden="true"
    >
      <div
        className={`flex w-max ${reduceMotion ? "" : "animate-[marquee_40s_linear_infinite]"}`}
      >
        {/* Two copies for seamless loop */}
        <p className="whitespace-nowrap font-hand text-xl tracking-wide text-ivory-300/40 sm:text-2xl">
          {words.map((w, i) => (
            <span key={`a-${i}`} className="mx-4 inline-block">
              {w}
            </span>
          ))}
        </p>
        <p className="whitespace-nowrap font-hand text-xl tracking-wide text-ivory-300/40 sm:text-2xl">
          {words.map((w, i) => (
            <span key={`b-${i}`} className="mx-4 inline-block">
              {w}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}