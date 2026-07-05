"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small uppercase eyebrow, e.g. "Our Story" */
  eyebrow?: string;
  /** The serif title */
  title: string;
  /** Optional script flourish rendered above the title, e.g. "with love" */
  script?: string;
  /** Optional supporting sentence below the title */
  description?: string;
  /** Set when the heading sits on the forest (dark) surface */
  onDark?: boolean;
  align?: "center" | "left";
  className?: string;
}

/**
 * The one way section headings are built across the site:
 * gold eyebrow → serif title (→ optional script + description) → hairline.
 */
export function SectionHeading({
  eyebrow,
  title,
  script,
  description,
  onDark = false,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={cn(
        "mb-16 flex flex-col gap-4 md:mb-20",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {script ? (
        <motion.p
          variants={fadeUp}
          aria-hidden="true"
          className={cn(
            "font-script text-title",
            onDark ? "text-accent" : "text-accent-foreground/80",
          )}
        >
          {script}
        </motion.p>
      ) : null}
      {eyebrow ? (
        <motion.p
          variants={fadeUp}
          className={cn(
            "text-caption font-semibold uppercase tracking-[0.25em]",
            onDark ? "text-forest-muted" : "text-muted-foreground",
          )}
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        variants={fadeUp}
        className={cn(
          "font-serif text-title font-semibold",
          onDark ? "text-forest-foreground" : "text-foreground",
        )}
      >
        {title}
      </motion.h2>
      <motion.div
        variants={fadeUp}
        aria-hidden="true"
        className="hairline-gold w-24"
      />
      {description ? (
        <motion.p
          variants={fadeUp}
          className={cn(
            "max-w-xl text-body",
            onDark ? "text-forest-muted" : "text-muted-foreground",
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
