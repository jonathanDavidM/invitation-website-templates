"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { basePath } from "@/lib/base-path";
import { ENTER_EVENT } from "@/components/entrance";

/**
 * Background music with a tasteful floating toggle.
 *
 * Browsers block autoplay-with-sound until the visitor interacts, so we:
 *  - attempt to start on the first pointer/key/touch gesture, and
 *  - always expose a play/pause button.
 *
 * The control hides itself if the audio file is missing, so there's never a
 * dead button. Drop a song at public/audio/wedding-song.mp3 to enable it.
 */
const SRC = `${basePath}/audio/wedding-song.mp3`;

function Equalizer({ animate }: { animate: boolean }) {
  const bars = [0, 1, 2, 3];
  return (
    <span aria-hidden="true" className="flex h-5 items-end gap-0.5">
      {bars.map((i) => (
        <motion.span
          key={i}
          className="w-0.5 rounded-full bg-primary"
          initial={{ height: "35%" }}
          animate={
            animate
              ? { height: ["30%", "100%", "45%", "85%", "30%"] }
              : { height: "60%" }
          }
          transition={
            animate
              ? {
                  duration: 0.9 + i * 0.18,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : undefined
          }
        />
      ))}
    </span>
  );
}

export function MusicPlayer() {
  const reduceMotion = useReducedMotion();
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const userPaused = React.useRef(false);
  const [available, setAvailable] = React.useState(true);
  const [playing, setPlaying] = React.useState(false);

  // Keep UI state in sync with the actual element.
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.55;
    // The src loads pre-hydration, so a missing file may have errored before
    // React attached listeners — check the latched state, then listen too.
    if (audio.error) {
      setAvailable(false);
      return;
    }
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => setAvailable(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
    };
  }, []);

  // Try to autoplay immediately on load; browsers usually block audible
  // autoplay until a gesture, so the listener below is the reliable fallback.
  React.useEffect(() => {
    audioRef.current?.play().catch(() => {});
  }, []);

  // The entrance overlay's "Open the Invitation" tap starts the music with
  // sound (dispatched synchronously inside that click's user-activation).
  React.useEffect(() => {
    const onEnter = () => {
      userPaused.current = false;
      audioRef.current?.play().catch(() => {});
    };
    window.addEventListener(ENTER_EVENT, onEnter);
    return () => window.removeEventListener(ENTER_EVENT, onEnter);
  }, []);

  // Start on the first user gesture, unless they've explicitly paused.
  React.useEffect(() => {
    const start = () => {
      if (!userPaused.current) audioRef.current?.play().catch(() => {});
      remove();
    };
    const remove = () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      window.removeEventListener("touchstart", start);
    };
    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);
    window.addEventListener("touchstart", start);
    return remove;
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      userPaused.current = false;
      audio.play().catch(() => {});
    } else {
      userPaused.current = true;
      audio.pause();
    }
  };

  if (!available) return null;

  return (
    <>
      <audio ref={audioRef} src={SRC} loop preload="metadata" />
      <motion.button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        aria-pressed={playing}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className={cn(
          "fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-50 flex size-12 items-center justify-center rounded-full",
          "border border-border bg-background/70 text-primary shadow-md backdrop-blur-md",
          "transition-colors duration-200 hover:bg-background",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        )}
      >
        {playing ? (
          <Equalizer animate={!reduceMotion} />
        ) : (
          <Music aria-hidden="true" className="size-5" />
        )}
      </motion.button>
    </>
  );
}
