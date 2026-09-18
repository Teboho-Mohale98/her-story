"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { siteConfig } from "@/data/site";
import SectionHeading from "./SectionHeading";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

const BAR_COUNT = 40;

function youtubeId(url: string): string {
  const m = url.match(/[?&]v=([^&#]+)/);
  return m ? m[1] : "";
}

function MusicEmbed() {
  const id = youtubeId(siteConfig.soundscape.embedUrl);

  return (
    <section id="song" className="relative overflow-hidden py-28 sm:py-40">
      <div className="mx-auto mb-14 max-w-4xl px-6">
        <SectionHeading
          eyebrow={siteConfig.song.eyebrow}
          title={siteConfig.song.title}
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 text-center text-sm uppercase tracking-[0.3em] text-ivory-400/70"
        >
          Press play.
        </motion.p>
      </div>

      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-3xl border border-white/[0.09] bg-noir-800/70 p-3 backdrop-blur sm:p-4"
        >
          {id ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${encodeURIComponent(id)}?playsinline=1&rel=0&color=white`}
                title={`${siteConfig.soundscape.title} — ${siteConfig.soundscape.artist}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-noir-900 px-6 text-center">
              <p className="text-sm text-ivory-300/80">
                I couldn&apos;t read the video link. Check{" "}
                <code className="text-champagne-300">soundscape.embedUrl</code>{" "}
                in <code className="text-champagne-300">src/data/site.ts</code>.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between gap-4 px-3 py-4">
            <div className="min-w-0">
              <p className="truncate font-serif text-xl text-ivory-50 sm:text-2xl">
                {siteConfig.soundscape.title}
              </p>
              <p className="mt-1 truncate text-xs uppercase tracking-[0.25em] text-champagne-400">
                {siteConfig.soundscape.artist}
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-white/12 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-ivory-400/70">
              YouTube Music
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
          className="mt-8 text-center font-serif text-xl italic text-ivory-200/85"
        >
          {siteConfig.soundscape.note}
        </motion.p>
      </div>
    </section>
  );
}

function AudioPlayer() {
  const reduceMotion = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ---------- visualizer ---------- */

  const ensureAnalyser = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || ctxRef.current) return;
    const Ctor: typeof AudioContext | undefined =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return;
    try {
      const ctx = new Ctor();
      const source = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.75;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      ctxRef.current = ctx;
      analyserRef.current = analyser;
    } catch {
      // context already exists or unsupported — visualizer stays idle
    }
  }, []);

  const drawIdle = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx2d = canvas?.getContext("2d");
    if (!canvas || !ctx2d) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w;
    canvas.height = h;
    ctx2d.clearRect(0, 0, w, h);
    const gap = 3;
    const bw = (w - gap * (BAR_COUNT - 1)) / BAR_COUNT;
    const base = reduceMotion ? 0.45 : 0.3;
    for (let i = 0; i < BAR_COUNT; i++) {
      const bh = Math.max(2, h * base);
      ctx2d.fillStyle = "rgba(217,201,168,0.35)";
      ctx2d.fillRect(i * (bw + gap), (h - bh) / 2, bw, bh);
    }
  }, [reduceMotion]);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx2d = canvas?.getContext("2d");
    if (!canvas || !ctx2d) return;
    const analyser = analyserRef.current;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    ctx2d.clearRect(0, 0, w, h);

    const data = new Uint8Array(analyser ? analyser.frequencyBinCount : 0);
    if (analyser) analyser.getByteFrequencyData(data);

    const gap = 3;
    const bw = (w - gap * (BAR_COUNT - 1)) / BAR_COUNT;

    for (let i = 0; i < BAR_COUNT; i++) {
      let pct: number;
      if (analyser && data.length) {
        const idx = Math.floor((i / BAR_COUNT) * data.length * 0.7);
        pct = data[idx] / 255;
      } else {
        pct = 0.25;
      }
      const bh = Math.max(2, h * (0.12 + pct * 0.85));
      const grad = ctx2d.createLinearGradient(0, h, 0, h - bh);
      grad.addColorStop(0, "rgba(173,92,115,0.85)");
      grad.addColorStop(1, "rgba(217,201,168,0.9)");
      ctx2d.fillStyle = grad;
      ctx2d.fillRect(i * (bw + gap), (h - bh) / 2, bw, bh);
    }
  }, []);

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current !== null) return;
    const tick = () => {
      drawFrame();
      rafRef.current = window.requestAnimationFrame(tick);
    };
    rafRef.current = window.requestAnimationFrame(tick);
  }, [drawFrame]);

  /* ---------- transport ---------- */

  const handlePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    ensureAnalyser();
    if (ctxRef.current?.state === "suspended") {
      void ctxRef.current.resume();
    }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setError(
        `I couldn't find the song. Place it at ${siteConfig.soundscape.src} and reload.`,
      );
      setPlaying(false);
    }
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  const togglePlay = () => {
    if (playing) handlePause();
    else void handlePlay();
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = value * duration;
    setProgress(value);
  };

  const handleVolume = (value: number) => {
    const audio = audioRef.current;
    if (audio) audio.volume = value;
    setVolume(value);
    setMuted(value === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !muted;
    setMuted(!muted);
  };

  /* ---------- audio element events ---------- */

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress(audio.currentTime / audio.duration);
  };

  const onLoadedMeta = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const d = audio.duration;
    if (Number.isFinite(d) && d > 0) setDuration(d);
    else setError("I couldn't read the song file. Add an MP3 and reload.");
  };

  const onAudioError = () => {
    setPlaying(false);
    stopLoop();
    drawIdle();
    setError(
      `I couldn't find the song yet. Place your mp3 at ${siteConfig.soundscape.src} and reload.`,
    );
  };

  /* ---------- lifecycle ---------- */

  useEffect(() => {
    drawIdle();
    return () => {
      stopLoop();
      if (ctxRef.current && ctxRef.current.state !== "closed") {
        void ctxRef.current.close();
      }
    };
  }, [drawIdle, stopLoop]);

  useEffect(() => {
    if (playing && !reduceMotion) startLoop();
    else if (!playing) stopLoop();
    if (!playing && !error) drawIdle();
  }, [playing, reduceMotion, error, startLoop, stopLoop, drawIdle]);

  return (
    <section id="song" className="relative overflow-hidden py-28 sm:py-40">
      <div className="mx-auto mb-14 max-w-4xl px-6">
        <SectionHeading
          eyebrow={siteConfig.song.eyebrow}
          title={siteConfig.song.title}
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 text-center text-sm uppercase tracking-[0.3em] text-ivory-400/70"
        >
          Press play.
        </motion.p>
      </div>

      <div className="mx-auto max-w-2xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-noir-800/70 p-6 backdrop-blur sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-rose-800/20 blur-3xl" />

          <div className="relative flex items-center gap-5 sm:gap-6">
            {/* Artwork */}
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:h-28 sm:w-28">
              <Image
                src={siteConfig.soundscape.artwork}
                alt={`Album artwork: ${siteConfig.soundscape.title}`}
                fill
                sizes="112px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Track info + play */}
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-xl text-ivory-50 sm:text-2xl">
                {siteConfig.soundscape.title}
              </p>
              <p className="mt-1 truncate text-xs uppercase tracking-[0.25em] text-champagne-400">
                {siteConfig.soundscape.artist}
              </p>

              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pause the song" : "Play our song"}
                className="group mt-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-ivory-100 transition hover:border-champagne-400/70 hover:text-champagne-300 focus-visible:outline-2 focus-visible:outline-champagne-400"
              >
                {playing ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
                )}
              </button>
            </div>
          </div>

          {/* Visualizer */}
          <div className="relative mt-6">
            <canvas
              ref={canvasRef}
              className="h-12 w-full"
              aria-hidden="true"
            />
            <div className="mt-1 flex w-full items-baseline justify-between font-mono text-[0.65rem] tabular-nums tracking-wide text-ivory-400/70">
              <span>{formatTime((progress || 0) * duration)}</span>
              <span>{error ? "–:––" : formatTime(duration)}</span>
            </div>
          </div>

          {/* Seek */}
          <div className="relative mt-3">
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={(progress * 100).toFixed(1)}
              onChange={(e) => handleSeek(Number(e.target.value) / 100)}
              disabled={!!error || !duration}
              aria-label="Song position"
              className="player-range disabled:opacity-40"
            />
          </div>

          {/* Volume */}
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ivory-300/80 transition hover:text-ivory-50 focus-visible:outline-2 focus-visible:outline-champagne-400"
            >
              {muted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round((muted ? 0 : volume) * 100)}
              onChange={(e) => handleVolume(Number(e.target.value) / 100)}
              aria-label="Volume"
              className="player-range w-32"
            />
          </div>

          {/* Error notice */}
          {error ? (
            <p className="relative mt-5 flex items-start gap-2.5 rounded-2xl border border-white/[0.08] bg-noir-900/70 px-4 py-3 text-xs leading-relaxed text-ivory-300/85">
              <Music className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-300" />
              {error}
            </p>
          ) : null}
        </div>

        {!error ? (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
            className="mt-8 text-center font-serif text-xl italic text-ivory-200/85"
          >
            {siteConfig.soundscape.note}
          </motion.p>
        ) : null}

        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={siteConfig.soundscape.src}
          preload="metadata"
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMeta}
          onEnded={() => setPlaying(false)}
          onError={onAudioError}
          onVolumeChange={() => {
            const audio = audioRef.current;
            if (!audio) return;
            setMuted(audio.muted || audio.volume === 0);
          }}
        />
      </div>
    </section>
  );
}

export default function MusicPlayer() {
  return siteConfig.soundscape.embedUrl ? <MusicEmbed /> : <AudioPlayer />;
}