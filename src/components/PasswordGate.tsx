"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, Lock } from "lucide-react";
import { siteConfig } from "@/data/site";

interface PasswordGateProps {
  onUnlocked: () => void;
}

/**
 * Optional soft gate.
 *
 * IMPORTANT LIMITATION: there is no backend, so the password is stored
 * in the client bundle. This politely deters the casually curious but is
 * NOT real security. To make it genuinely protected, move this check to
 * a server route / middleware before sharing publicly.
 */
export default function PasswordGate({ onUnlocked }: PasswordGateProps) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const tryUnlock = () => {
    if (value === siteConfig.passwordGate.password) {
      sessionStorage.setItem("her-story-unlocked", "1");
      onUnlocked();
    } else {
      setError(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-noir-950 px-6"
    >
      <div className="w-full max-w-sm text-center">
        <Heart
          className="mx-auto mb-6 h-7 w-7 text-rose-300 animate-[pulse-soft_4s_ease-in-out_infinite]"
          fill="currentColor"
        />
        <p className="font-serif text-2xl leading-snug text-ivory-50">
          {siteConfig.passwordGate.title}
        </p>

        <form
          className="mt-8 flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            tryUnlock();
          }}
        >
          <label htmlFor="gate-password" className="sr-only">
            Password
          </label>
          <input
            id="gate-password"
            type="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            placeholder={siteConfig.passwordGate.placeholder}
            className="h-12 w-full rounded-full border border-white/10 bg-noir-800 px-5 text-center text-sm text-ivory-100 placeholder:text-ivory-500/60 focus:border-champagne-400/60 focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-rose-700 px-6 text-sm font-medium tracking-wide text-ivory-50 transition hover:bg-rose-600 focus-visible:outline-2 focus-visible:outline-champagne-400"
          >
            <Lock className="h-4 w-4" />
            {siteConfig.passwordGate.unlockLabel}
          </button>
        </form>

        <AnimatePresence>
          {error ? (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              className="mt-4 text-xs text-rose-300"
            >
              {siteConfig.passwordGate.error}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}