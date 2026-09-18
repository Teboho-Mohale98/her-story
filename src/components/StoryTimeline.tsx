"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { storyEvents } from "@/data/story";
import { siteConfig } from "@/data/site";
import SectionHeading from "./SectionHeading";

export default function StoryTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 65%"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="story" className="relative overflow-hidden py-28 sm:py-40">
      <div className="mx-auto mb-20 max-w-4xl px-6">
        <SectionHeading
          eyebrow={siteConfig.storyIntro.eyebrow}
          title="Our Story"
        />
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-2xl text-center font-serif text-xl leading-relaxed text-ivory-200/90 sm:text-2xl"
        >
          {siteConfig.storyIntro.title}
        </motion.p>
      </div>

      <div ref={trackRef} className="relative mx-auto max-w-6xl px-6">
        {/* Track line */}
        <div className="absolute bottom-0 left-5 top-0 w-px -translate-x-1/2 bg-white/[0.08] md:left-1/2" />

        {/* Animated fill */}
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute bottom-0 left-5 top-0 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-champagne-400 via-rose-400/80 to-rose-300 md:left-1/2"
        />

        <ol className="flex flex-col">
          {storyEvents.map((event, i) => {
            const leftSide = i % 2 === 0;
            return (
              <li
                key={event.id}
                className="relative py-10 pl-14 md:grid md:grid-cols-2 md:gap-x-20 md:py-14 md:pl-0"
              >
                {/* Node dot */}
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-5 top-[4.4rem] h-3 w-3 -translate-x-1/2 rounded-full border border-champagne-300 bg-noir-950 shadow-[0_0_18px_rgba(217,201,168,0.45)] md:top-1/2 md:-translate-y-1/2"
                />

                <div
                  className={
                    leftSide
                      ? "md:col-start-1 md:pr-4"
                      : "md:col-start-2 md:pl-4 md:text-left"
                  }
                >
                  <motion.div
                    initial={{ opacity: 0, y: 34, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className={leftSide ? "md:text-right" : ""}
                  >
                    {/* Date */}
                    <span className="mb-4 inline-block rounded-full border border-white/10 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.28em] text-champagne-300">
                      {event.date}
                    </span>

                    {/* Image */}
                    <div className="group relative mb-7 overflow-hidden rounded-xl bg-noir-800">
                      <div className="aspect-[16/10] w-full">
                        <Image
                          src={event.image}
                          alt={`${event.title} — a photograph from our story`}
                          fill
                          sizes="(min-width: 768px) 40vw, 90vw"
                          className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 font-serif text-2xl text-ivory-50 sm:text-3xl">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base font-light leading-relaxed text-ivory-300/85">
                      {event.description}
                    </p>

                    {/* Location */}
                    {event.location ? (
                      <p className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-ivory-400/80">
                        <MapPin className="h-3.5 w-3.5 text-rose-300" />
                        {event.location}
                      </p>
                    ) : null}
                  </motion.div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}