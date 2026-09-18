import type { StoryEvent } from "./types";

/**
 * ============================================================
 *  OUR STORY — the cinematic vertical timeline.
 *
 *  Drop each photograph in:
 *    public/images/story/        (s1.jpg … s4.jpg)
 *
 *  Every field below is yours to edit.
 *  These dates reflect a two-month relationship (July → September 2026).
 *  Adjust the placeholders to your actual memories.
 * ============================================================
 */
export const storyEvents: StoryEvent[] = [
  {
    id: "start",
    date: "July 2026",
    title: "The Day We Met",
    description:
      "I remember the first hug we had. At 26 Juta Street, you in your jean overall — and I was nervous, because it was the first time seeing you.",
    image: "/images/story/s1.jpeg",
    location: "26 Juta Street",
  },
  {
    id: "us",
    date: "July–August 2026",
    title: "When I Knew",
    description:
      "You looked at me like I was everything to you.",
    image: "/images/story/s2.jpg",
  },
  {
    id: "everyday",
    date: "August 2026",
    title: "Every Day With You",
    description:
      "Two months in and I already replay conversations in my head. I collect these things quietly.",
    image: "/images/story/s3.jpg",
  },
  {
    id: "now",
    date: "September 2026",
    title: "Still the Beginning",
    description:
      "And here we are — two months in and this already feels like the best thing I've ever been part of. I don't know where every chapter goes, but I know I want to keep writing this one with you.",
    image: "/images/story/s4.jpg",
  },
];