"use client";

import { useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import SectionHeading from "./SectionHeading";

export default function LoveLetter() {
  const reduceMotion = useReducedMotion();
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const lines = scope.current?.querySelectorAll(".letter-line");
        if (!lines || lines.length === 0) return;

        gsap.fromTo(
          lines,
          { opacity: 0, y: 34, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: scope.current,
              start: "top 72%",
            },
          },
        );
      },
    );

    return () => {
      cancelled = true;
    };
  }, [reduceMotion]);

  return (
    <section id="letter" className="relative overflow-hidden py-28 sm:py-40">
      <div className="mx-auto mb-16 max-w-4xl px-6">
        <SectionHeading
          eyebrow={siteConfig.letter.eyebrow}
          title={siteConfig.letter.title}
        />
      </div>

      <div className="mx-auto max-w-3xl px-6">
        <div
          ref={scope}
          className="relative rounded-2xl bg-gradient-to-b from-[#f7f1e4] to-[#efe6d3] p-8 text-[#332818] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] sm:p-12 sm:px-14"
        >
          {/* subtle paper texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(180,150,110,0.14) 0%, transparent 40%), radial-gradient(circle at 85% 70%, rgba(160,120,90,0.12) 0%, transparent 45%)",
            }}
          />

          <div className="relative">
            <p className="letter-line font-serif text-2xl leading-snug text-[#3d2f1f]">
              {siteConfig.letter.greeting}
            </p>

            <div className="mt-7 flex flex-col gap-5 sm:mt-9">
              {siteConfig.letter.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="letter-line text-[0.98rem] font-normal leading-[1.85] text-[#403525]/95 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <p className="letter-line mt-9 font-serif text-xl italic text-[#4a3a24]">
              {siteConfig.letter.closing}
            </p>
            <p className="letter-line mt-2 text-right font-serif text-xl text-[#4a3a24]">
              {siteConfig.letter.signature}
            </p>
          </div>

          {/* Wax seal */}
          <div
            aria-hidden="true"
            className="absolute -bottom-7 right-8 flex h-20 w-20 rotate-6 items-center justify-center rounded-full bg-gradient-to-br from-rose-600 to-rose-800 shadow-[0_12px_30px_-8px_rgba(60,8,18,0.85)] sm:h-24 sm:w-24"
          >
            <div className="flex h-[80%] w-[80%] items-center justify-center rounded-full border border-rose-300/40">
              <Heart className="h-7 w-7 text-[#f2d9cf] sm:h-8 sm:w-8" fill="currentColor" />
            </div>
          </div>
        </div>

        <div className="h-10" />
      </div>
    </section>
  );
}