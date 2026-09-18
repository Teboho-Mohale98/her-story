"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/site";
import IntroScreen from "@/components/IntroScreen";
import PasswordGate from "@/components/PasswordGate";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MarqueeTicker from "@/components/MarqueeTicker";
import SparkleCursor from "@/components/SparkleCursor";
import PersonalIntroduction from "@/components/PersonalIntroduction";
import StoryTimeline from "@/components/StoryTimeline";
import MemoryGallery from "@/components/MemoryGallery";
import FavouriteGallery from "@/components/FavouriteGallery";
import LoveCards from "@/components/LoveCards";
import PolaroidWall from "@/components/PolaroidWall";
import MusicPlayer from "@/components/MusicPlayer";
import VideoGallery from "@/components/VideoGallery";
import LoveLetter from "@/components/LoveLetter";
import FutureStars from "@/components/FutureStars";
import FinalMessage from "@/components/FinalMessage";

function initialGateState() {
  if (typeof window === "undefined") return !siteConfig.passwordGate.enabled;
  if (!siteConfig.passwordGate.enabled) return true;
  try {
    return sessionStorage.getItem("her-story-unlocked") === "1";
  } catch {
    return false;
  }
}

export default function Experience() {
  const [started, setStarted] = useState(false);
  const [gateClosed, setGateClosed] = useState(initialGateState);
  const gateEnabled = siteConfig.passwordGate.enabled;

  return (
    <>
      {/* cinematic film grain */}
      <div className="film-grain" aria-hidden="true" />
      <SparkleCursor />

      {gateEnabled && !gateClosed ? (
        <PasswordGate onUnlocked={() => setGateClosed(true)} />
      ) : null}

      <AnimatePresence>
        {!started ? <IntroScreen onEnter={() => setStarted(true)} /> : null}
      </AnimatePresence>

      <Navigation />

      <main>
        <Hero />
        <MarqueeTicker />
        <PersonalIntroduction />
        <div className="section-divider" aria-hidden="true" />
        <StoryTimeline />
        <MemoryGallery />
        <FavouriteGallery />
        <LoveCards />
        <div className="section-divider" aria-hidden="true" />
        <PolaroidWall />
        <MusicPlayer />
        <VideoGallery />
        <div className="section-divider" aria-hidden="true" />
        <LoveLetter />
        <FutureStars />
        <FinalMessage />
      </main>
    </>
  );
}