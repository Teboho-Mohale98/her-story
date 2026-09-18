import type { Polaroid } from "./types";

/**
 * ============================================================
 *  POLAROID WALL — the slightly-messy, very-loved photo wall.
 *
 *  Drop square photographs in:
 *    public/images/polaroids/    (p-1.jpg, p-2.jpg, ...)
 *
 *  `caption` is written under each polaroid in a hand style.
 *  `rotation` (-8 to 8) is a gentle random tilt in degrees.
 * ============================================================
 */
export const polaroids: Polaroid[] = [
  { id: "pol-01", src: "/images/polaroids/p1.jpg", caption: "a random day", rotation: -5 },
  { id: "pol-02", src: "/images/polaroids/p2.jpg", caption: "you, laughing", rotation: 4 },
  { id: "pol-03", src: "/images/polaroids/p3.jpg", caption: "my favourite", rotation: -3 },
  { id: "pol-04", src: "/images/polaroids/p4.jpg", caption: "remember this?", rotation: 6 },
  { id: "pol-05", src: "/images/polaroids/p5.jpg", caption: "golden hour", rotation: -6 },
  { id: "pol-06", src: "/images/polaroids/p7.jpeg", caption: "us", rotation: 3 },
];