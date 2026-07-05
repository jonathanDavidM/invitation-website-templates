import type { Variants } from "framer-motion";

/**
 * Shared motion language — every section uses these so the whole site
 * moves as one. Restrained, editorial, never bouncy.
 */
export const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

export const DURATION = 0.7;

/** Standard viewport config for scroll reveals: animate once, slightly early. */
export const VIEWPORT = { once: true, margin: "-80px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE_LUXE },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION, ease: EASE_LUXE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION, ease: EASE_LUXE },
  },
};

/** Parent container that staggers its children. */
export const staggerContainer = (stagger = 0.1, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Soft image reveal — pairs with an overflow-hidden wrapper. */
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: EASE_LUXE },
  },
};
