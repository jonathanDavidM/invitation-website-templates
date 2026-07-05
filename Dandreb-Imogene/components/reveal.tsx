"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
  /** Render as a different HTML tag (default div) */
  as?: "div" | "section" | "li" | "span" | "figure";
}

/** Fade-up scroll reveal for a single block. */
export function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const Comp = motion[as];
  return (
    <Comp
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={delay ? { delay } : undefined}
      className={className}
    >
      {children}
    </Comp>
  );
}

interface RevealGroupProps {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
  as?: "div" | "ul" | "ol";
}

/** Parent that staggers its <RevealItem> children as they scroll into view. */
export function RevealGroup({
  children,
  stagger = 0.1,
  className,
  as = "div",
}: RevealGroupProps) {
  const Comp = motion[as];
  return (
    <Comp
      variants={staggerContainer(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
    >
      {children}
    </Comp>
  );
}

interface RevealItemProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  as?: "div" | "li" | "figure";
}

export function RevealItem({
  children,
  variants = fadeUp,
  className,
  as = "div",
}: RevealItemProps) {
  const Comp = motion[as];
  return (
    <Comp variants={variants} className={className}>
      {children}
    </Comp>
  );
}
