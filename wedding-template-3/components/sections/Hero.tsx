"use client";
import { useState, useEffect } from "react";
import { WEDDING } from "@/lib/constants";
import styles from "@/styles/modules/hero.module.css";

interface HeroProps { onScroll: () => void; }

export function Hero({ onScroll }: HeroProps) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section id="hero" className={styles.hero}>
      {/* Full bleed background image */}
      <div className={styles.bgWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1800&q=80"
          alt="Wedding background"
          className={styles.bgImg}
        />
        <div className={styles.bgOverlay} />
        {/* Vignette */}
        <div className={styles.vignette} />
      </div>

      {/* Content */}
      <div className={`${styles.content} ${loaded ? styles.contentLoaded : ""}`}>
        {/* Top eyebrow */}
        <p className={styles.eyebrow}>You are invited</p>

        {/* Names — the hero centrepiece */}
        <div className={styles.namesWrap}>
          <h1 className={styles.nameLeft}>{WEDDING.groom}</h1>
          <div className={styles.ampWrap}>
            <span className={styles.ampLine} />
            <span className={styles.amp}>&amp;</span>
            <span className={styles.ampLine} />
          </div>
          <h1 className={styles.nameRight}>{WEDDING.bride}</h1>
        </div>

        {/* Date pill */}
        <div className={styles.datePill}>
          <span>{WEDDING.dayOfWeek}</span>
          <span className={styles.datePillDot}>·</span>
          <span>{WEDDING.displayDate}</span>
          <span className={styles.datePillDot}>·</span>
          <span>Manila</span>
        </div>
      </div>

      {/* Scroll cue */}
      <button className={styles.scrollCue} onClick={onScroll} aria-label="Scroll down">
        <span className={styles.scrollText}>Scroll</span>
        <span className={styles.scrollArrow}>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <path d="M8 0v20M1 13l7 8 7-8" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
        </span>
      </button>
    </section>
  );
}
