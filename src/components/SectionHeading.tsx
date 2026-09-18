"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const alignClass =
    align === "center" ? "mx-auto text-center" : "text-left mx-0";

  return (
    <div className={cn("max-w-3xl", alignClass, className)}>
      {eyebrow ? (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-5 text-[0.68rem] uppercase tracking-[0.4em] text-champagne-400"
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        variants={fadeUp}
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="font-serif text-[2rem] leading-[1.15] text-ivory-50 sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-5 text-base leading-relaxed text-ivory-300/80 sm:text-lg"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}