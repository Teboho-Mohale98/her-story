export interface Photo {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  date?: string;
  category?: string;
  featured?: boolean;
}

export interface StoryEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  location?: string;
}

export interface ReasonCard {
  id: string;
  number: string;
  title: string;
  message: string;
}

export interface Polaroid {
  id: string;
  src: string;
  caption: string;
  rotation: number;
}

export interface FutureMemory {
  id: string;
  label: string;
  message: string;
}

export interface VideoMemory {
  id: string;
  src: string;
  poster: string;
  title: string;
}

export type PhotoRatio = "landscape" | "square" | "portrait" | "tall";