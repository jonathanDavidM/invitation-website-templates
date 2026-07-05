"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { couple } from "@/content/couple";
import { heroImage } from "@/content/gallery";
import {
  DURATION,
  EASE_LUXE,
  fade,
  fadeUp,
  imageReveal,
  staggerContainer,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Thin botanical line-art branch — purely decorative. */
function BotanicalBranch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* main stem */}
      <path d="M8 112C34 92 62 62 96 14" />
      {/* alternating leaf pairs along the stem */}
      <path d="M28 95Q16 88 12 74Q24 80 28 95Z" />
      <path d="M30 93Q34 106 46 112Q42 98 30 93Z" />
      <path d="M49 73Q38 64 36 50Q47 57 49 73Z" />
      <path d="M51 71Q57 83 70 87Q64 74 51 71Z" />
      <path d="M72 47Q62 38 61 24Q71 31 72 47Z" />
      <path d="M74 45Q81 56 94 59Q88 47 74 45Z" />
      <path d="M96 14Q100 4 110 2Q102 10 96 14Z" />
      {/* small berries */}
      <circle cx="40" cy="82" r="2" />
      <circle cx="62" cy="58" r="2" />
      <circle cx="85" cy="32" r="2" />
    </svg>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  const driftTransition = (duration: number) =>
    reduceMotion
      ? undefined
      : {
          duration,
          repeat: Infinity,
          repeatType: "mirror" as const,
          ease: "easeInOut" as const,
        };

  return (
    <section id="hero" className="relative min-h-svh overflow-hidden bg-forest">
      {/* Background photograph with a soft scale-settle on load */}
      <motion.div
        className="absolute inset-0"
        variants={reduceMotion ? fade : imageReveal}
        initial="hidden"
        animate="visible"
      >
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          placeholder={heroImage.blurDataURL ? "blur" : "empty"}
          blurDataURL={heroImage.blurDataURL}
        />
      </motion.div>

      {/* Emerald gradient scrim so the type passes AA */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-forest/75 via-forest/45 to-forest/85"
      />

      {/* Floating botanical ornaments — opposite corners, slow drift */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-8 z-10 text-accent/40 md:left-10 md:top-12"
        animate={reduceMotion ? undefined : { y: [-8, 8] }}
        transition={driftTransition(7)}
      >
        <BotanicalBranch className="w-24 -scale-y-100 md:w-36" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-16 right-4 z-10 text-accent/40 md:bottom-20 md:right-10"
        animate={reduceMotion ? undefined : { y: [8, -8] }}
        transition={driftTransition(8)}
      >
        <BotanicalBranch className="w-24 -scale-x-100 md:w-36" />
      </motion.div>

      {/* Invitation content — centered on mobile, shifted right on desktop so
          it clears the couple on the left of the photograph. */}
      <motion.div
        variants={staggerContainer(0.15, 0.2)}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex min-h-svh w-full flex-col items-center justify-center gap-6 px-6 py-24 text-center md:ml-auto md:w-3/5 md:gap-8 md:pr-6 lg:w-1/2 lg:pr-12"
      >
        <motion.p
          variants={fadeUp}
          className="text-caption font-semibold uppercase tracking-[0.3em] text-forest-foreground/90"
        >
          {couple.heroEyebrow}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-display font-normal text-forest-foreground"
        >
          <span className="block">{couple.groom.displayName}</span>
          <span className="my-2 block">
            <span aria-hidden="true" className="font-script text-title text-accent">
              &amp;
            </span>
            <span className="sr-only">and</span>
          </span>
          <span className="block">{couple.bride.displayName}</span>
        </motion.h1>

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-4">
          <span aria-hidden="true" className="h-px w-16 bg-accent" />
          <p className="text-body text-forest-foreground/90">
            <span className="block sm:inline">
              {couple.dayLabel} &middot; {couple.dateLabel}
            </span>
            <span aria-hidden="true" className="hidden sm:inline">
              {" "}
              &middot;{" "}
            </span>
            <span className="block sm:inline">{couple.location}</span>
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-2">
          <a
            href="#welcome"
            className={cn(buttonVariants({ variant: "gold", size: "lg" }))}
          >
            {couple.heroCta}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: DURATION, ease: EASE_LUXE }}
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2"
      >
        <a
          href="#welcome"
          aria-label="Scroll to welcome"
          className="flex min-h-11 min-w-11 flex-col items-center justify-end gap-2 p-2 text-forest-foreground/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <span
            aria-hidden="true"
            className="block h-10 w-px bg-forest-foreground/40"
          />
          <motion.span
            aria-hidden="true"
            className="block size-2 rounded-full bg-accent"
            animate={reduceMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </a>
      </motion.div>
    </section>
  );
}
