"use client";

import { useState, useEffect, useRef } from "react";
import { WEDDING } from "@/lib/constants";
import type { NavSection } from "@/lib/types";
import styles from "@/styles/modules/hero.module.css";

interface HeroProps {
  onNavigate: (id: NavSection) => void;
}

const LEAF_PATHS = [
  "M10,0 Q14,5 10,10 Q6,5 10,0Z",
  "M0,8 Q5,0 10,8 Q5,14 0,8Z",
  "M5,0 Q12,4 8,12 Q2,8 5,0Z",
];

interface Leaf {
  id: number;
  left: string;
  size: number;
  duration: string;
  delay: string;
  path: string;
}

export function Hero({ onNavigate }: HeroProps) {
  const [loaded, setLoaded] = useState(false);
  const leaves = useRef<Leaf[]>(
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 14 + Math.random() * 18,
      duration: `${9 + Math.random() * 11}s`,
      delay: `${Math.random() * 12}s`,
      path: LEAF_PATHS[i % 3],
    }))
  ).current;

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      {/* Background layers */}
      <div className={styles.heroBg} />
      <div className={styles.heroGrid} />

      {/* Floating leaves */}
      <div className={styles.leafContainer} aria-hidden="true">
        {leaves.map((leaf) => (
          <div
            key={leaf.id}
            className={styles.leaf}
            style={{
              left: leaf.left,
              animationDuration: leaf.duration,
              animationDelay: leaf.delay,
            }}
          >
            <svg
              width={leaf.size}
              height={leaf.size * 1.4}
              viewBox="0 0 14 20"
              fill="rgba(74,158,110,0.22)"
              aria-hidden="true"
            >
              <path d={leaf.path} />
            </svg>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className={`${styles.content} ${loaded ? styles.contentVisible : ""}`}>
        <p className={styles.eyebrow}>We Are Getting Married</p>

        <h1 className={styles.names}>
          {WEDDING.bride}
          <span className={styles.ampersand} aria-hidden="true">&amp;</span>
          {WEDDING.groom}
        </h1>

        <div className={styles.dateLine}>
          <span className={styles.dateRule} />
          <span className={styles.dateText}>{WEDDING.dayOfWeek} · {WEDDING.displayDate} · London</span>
          <span className={styles.dateRule} />
        </div>

        <div className={styles.ctaRow}>
          <button
            className={styles.btnOutline}
            onClick={() => onNavigate("details")}
          >
            View Details
          </button>
          <button
            className={styles.btnFill}
            onClick={() => onNavigate("rsvp")}
          >
            RSVP Now
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}
