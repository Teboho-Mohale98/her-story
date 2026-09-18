import type { VideoMemory } from "./types";

/**
 * ============================================================
 *  VIDEO MEMORIES — moving moments.
 *
 *  Clips live in:
 *    public/videos/      (vid-1.mp4 = 9 Sep, vid-2.mp4 = 1 Sep)
 *
 *  `poster` is a thumbnail shown before the video plays.
 *  You can swap in a different still from your photos.
 *
 *  If a file goes missing, the gallery shows the poster image
 *  but gracefully explains the file is missing on play.
 * ============================================================
 */
export const videoMemories: VideoMemory[] = [
  {
    id: "vid-01",
    src: "/videos/vid-1.mp4",
    poster: "/images/memories/m5.jpg",
    title: "[Video title — 9 Sep]",
  },
  {
    id: "vid-02",
    src: "/videos/vid-2.mp4",
    poster: "/images/favourites/f1.jpg",
    title: "[Video title — 1 Sep]",
  },
];