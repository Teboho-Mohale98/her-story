"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import EasterEgg from "./EasterEgg";

const sections = [
  { id: "story", label: "Our Story" },
  { id: "memories", label: "Memories" },
  { id: "favourites", label: "Favourites" },
  { id: "song", label: "Our Song" },
  { id: "letter", label: "The Letter" },
];

export default function Navigation() {
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.9;
      setShown(past);
      if (!past) setMenuOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <AnimatePresence>
        {shown ? (
          <motion.header
            initial={{ y: -72, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -72, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 z-[70] border-b border-white/[0.06] bg-noir-950/80 backdrop-blur-xl"
          >
            <div className="flex h-16 items-center justify-between px-5 sm:px-8">
              <div className="flex items-center gap-2">
                <EasterEgg />
                <button
                  type="button"
                  onClick={() => goTo("top")}
                  className="font-serif text-sm tracking-[0.2em] text-ivory-100 uppercase transition hover:text-champagne-300 focus-visible:outline-2 focus-visible:outline-champagne-400"
                >
                  {siteConfig.girlfriendName}
                </button>
              </div>

              <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => goTo(s.id)}
                    className="text-[0.72rem] uppercase tracking-[0.22em] text-ivory-300/70 transition hover:text-ivory-50 focus-visible:outline-2 focus-visible:outline-champagne-400"
                  >
                    {s.label}
                  </button>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ivory-200 transition hover:border-white/25 md:hidden focus-visible:outline-2 focus-visible:outline-champagne-400"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            <AnimatePresence>
              {menuOpen ? (
                <motion.nav
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
                  aria-label="Sections"
                  className="overflow-hidden border-t border-white/[0.06] md:hidden"
                >
                  <div className="flex flex-col px-5 py-3">
                    {sections.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => goTo(s.id)}
                        className="border-b border-white/[0.04] py-3.5 text-left text-sm text-ivory-200 transition hover:text-champagne-300 focus-visible:outline-2 focus-visible:outline-champagne-400 last:border-0"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </motion.nav>
              ) : null}
            </AnimatePresence>
          </motion.header>
        ) : null}
      </AnimatePresence>

      <ProgressBar />
    </>
  );
}

function ProgressBar() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[80] h-[2px] bg-transparent"
    >
      <div
        className={cn("h-full origin-left bg-gradient-to-r from-rose-600 via-rose-400 to-champagne-300")}
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}