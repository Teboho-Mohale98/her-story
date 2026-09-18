import type { Photo, PhotoRatio } from "./types";

/**
 * ============================================================
 *  MEMORY GALLERY — the masonry scrapbook.
 *
 *  Photographs live in:
 *    public/images/memories/     (m1.jpg … m12.jpg)
 *
 *  `ratio` controls where each photo sits in the masonry grid so
 *  mixed orientations look intentional. It does NOT crop your
 *  original file — use objectPosition if the crop isn't flattering.
 *
 *  `caption` / `date` are optional — if you ever want them back,
 *  add them to any entry and the gallery + lightbox will show them.
 * ============================================================
 */

interface MemoryPhoto extends Photo {
  ratio: PhotoRatio;
}

export const memories: MemoryPhoto[] = [
  {
    id: "mem-01",
    src: "/images/memories/m1.jpg",
    alt: "A photo of you",
    ratio: "portrait",
  },
  {
    id: "mem-02",
    src: "/images/memories/m2.jpg",
    alt: "A photo of you",
    ratio: "landscape",
  },
  {
    id: "mem-03",
    src: "/images/memories/m3.jpg",
    alt: "A photo of you",
    ratio: "landscape",
  },
  {
    id: "mem-04",
    src: "/images/memories/m4.jpg",
    alt: "A photo of you",
    ratio: "portrait",
  },
  {
    id: "mem-05",
    src: "/images/memories/m5.jpg",
    alt: "A photo of you",
    ratio: "square",
  },
  {
    id: "mem-06",
    src: "/images/memories/m6.jpg",
    alt: "A photo of you",
    ratio: "landscape",
  },
  {
    id: "mem-07",
    src: "/images/memories/m7.jpg",
    alt: "A photo of you",
    ratio: "portrait",
  },
  {
    id: "mem-08",
    src: "/images/memories/m8.jpg",
    alt: "A photo of you",
    ratio: "landscape",
  },
  {
    id: "mem-09",
    src: "/images/memories/m9.jpg",
    alt: "A photo of you",
    ratio: "square",
  },
  {
    id: "mem-10",
    src: "/images/memories/m10.jpg",
    alt: "A photo of you",
    ratio: "portrait",
  },
  {
    id: "mem-11",
    src: "/images/memories/m11.jpg",
    alt: "A photo of you",
    ratio: "square",
  },
  {
    id: "mem-12",
    src: "/images/memories/m12.jpg",
    alt: "A photo of you",
    ratio: "landscape",
  },
];