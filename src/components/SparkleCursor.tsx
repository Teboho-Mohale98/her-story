"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

const COLORS = ["#dca9b6", "#c67f91", "#e6d5b5", "#f0e4cc", "#fcf8f1"];
const LIFETIME_MS = 650;
const MAX = 40;

let queue: HTMLSpanElement[] = [];

function spawn(cx: number, cy: number, offsetX = 0, offsetY = 0) {
  const el = document.createElement("span");
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const size = 4 + Math.random() * 4;
  const x = cx + offsetX + (Math.random() - 0.5) * 8;
  const y = cy + offsetY + (Math.random() - 0.5) * 8;

  Object.assign(el.style, {
    position: "fixed",
    left: `${x}px`,
    top: `${y}px`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    background: color,
    pointerEvents: "none",
    zIndex: "50",
    "--sparkle-x": `${(Math.random() - 0.5) * 16}px`,
    "--sparkle-y": `${8 + Math.random() * 14}px`,
    animation: "sparkle-drift 600ms ease-out forwards",
  });

  document.body.appendChild(el);
  queue.push(el);

  if (queue.length > MAX) {
    const old = queue.splice(0, queue.length - MAX);
    old.forEach((n) => n.remove());
  }

  setTimeout(() => el.remove(), LIFETIME_MS);
}

function burst(cx: number, cy: number) {
  const count = 6 + Math.floor(Math.random() * 3);
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const radius = 12 + Math.random() * 16;
    spawn(cx, cy, Math.cos(angle) * radius, Math.sin(angle) * radius);
  }
}

export default function SparkleCursor() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    let last = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 55) return;
      last = now;
      spawn(e.clientX, e.clientY);
    };

    const onClick = (e: MouseEvent) => burst(e.clientX, e.clientY);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      queue.forEach((el) => el.remove());
      queue = [];
    };
  }, [reduceMotion]);

  return null;
}