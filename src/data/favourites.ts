import type { Photo } from "./types";

/**
 * ============================================================
 *  FAVOURITE PHOTOS — the horizontal cinematic gallery.
 *
 *  Drop large, vertical photographs in:
 *    public/images/favourites/   (f-1.jpg, f-2.jpg, ...)
 *
 *  The `caption` shows beneath each photo.
 * ============================================================
 */
export const favouritePhotos: Photo[] = [
  {
    id: "fav-01",
    src: "/images/favourites/f1.jpg",
    alt: "A favourite photograph — edit this description",
    caption: "That smile.",
  },
  {
    id: "fav-02",
    src: "/images/favourites/f2.jpg",
    alt: "A favourite photograph — edit this description",
    caption: "My favourite person.",
  },
  {
    id: "fav-03",
    src: "/images/favourites/f3.jpg",
    alt: "A favourite photograph — edit this description",
    caption: "Absolutely beautiful.",
  },
  {
    id: "fav-04",
    src: "/images/favourites/f4.jpg",
    alt: "A favourite photograph — edit this description",
    caption: "How are you even real?",
  },
  {
    id: "fav-05",
    src: "/images/favourites/f5.jpg",
    alt: "A favourite photograph — edit this description",
    caption: "This one lives in my head rent-free.",
  },
];