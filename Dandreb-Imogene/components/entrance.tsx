"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { couple } from "@/content/couple";
import { EASE_LUXE } from "@/lib/motion";

/** Fired when the guest opens the invitation — MusicPlayer listens for it. */
export const ENTER_EVENT = "wedding:enter";

/**
 * Full-screen entrance overlay. Because browsers block audible autoplay until
 * a gesture, this "Open the Invitation" tap doubles as that gesture: it
 * dismisses the overlay AND starts the music with sound in the same click.
 */
export function Entrance() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = React.useState(true);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Lock scroll + focus the button while the overlay is up.
  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    buttonRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const enter = React.useCallback(() => {
    // Synchronous dispatch keeps this inside the click's user-activation,
    // so the music is allowed to start with sound.
    window.dispatchEvent(new Event(ENTER_EVENT));
    setOpen(false);
  }, []);

  // Trap Tab within the overlay (single control) so focus can't slip behind it.
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      buttonRef.current?.focus();
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Welcome — ${couple.shortNames}`}
          onKeyDown={onKeyDown}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE_LUXE }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-forest px-6 text-center text-forest-foreground"
        >
          {/* soft radial glow behind the crest */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-radial from-forest-foreground/10 to-transparent"
          />
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              ease: EASE_LUXE,
              delay: reduceMotion ? 0 : 0.15,
            }}
            className="relative flex flex-col items-center gap-6"
          >
            <Image
              src="/images/monogram.png"
              alt=""
              width={487}
              height={440}
              priority
              className="h-28 w-auto invert md:h-36"
            />
            <p className="text-caption font-semibold uppercase tracking-[0.3em] text-forest-muted">
              {couple.heroEyebrow}
            </p>
            <div aria-hidden="true" className="hairline-gold w-16" />
            <p className="text-body text-forest-muted">
              {couple.dayLabel} &middot; {couple.dateLabel}
            </p>
            <button
              ref={buttonRef}
              type="button"
              onClick={enter}
              aria-label="Open the invitation"
              className="group mt-2 flex flex-col items-center gap-4 rounded-xl p-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <span className="block w-52 drop-shadow-lg transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:drop-shadow-xl sm:w-60">
                <svg
                  viewBox="0 0 260 180"
                  className="h-auto w-full"
                  aria-hidden="true"
                >
                  {/* envelope body */}
                  <rect
                    x="6"
                    y="36"
                    width="248"
                    height="138"
                    rx="8"
                    className="fill-card stroke-border"
                    strokeWidth="2"
                  />
                  {/* bottom seam */}
                  <path
                    d="M6 174 L130 150 L254 174"
                    fill="none"
                    className="stroke-border"
                    strokeWidth="1.5"
                  />
                  {/* closed top flap */}
                  <path
                    d="M6 36 L130 120 L254 36"
                    fill="none"
                    className="stroke-accent"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  {/* wax seal */}
                  <circle cx="130" cy="116" r="16" className="fill-accent" />
                  <text
                    x="130"
                    y="117"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="20"
                    className="fill-card font-serif"
                  >
                    &amp;
                  </text>
                </svg>
              </span>
              <span className="text-caption font-semibold uppercase tracking-[0.25em] text-forest-foreground">
                Open the Invitation
              </span>
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
