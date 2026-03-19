"use client";

import { useState } from "react";
import { WEDDING } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import styles from "@/styles/modules/gallery.module.css";

interface MoodCell {
  id: number;
  span?: number;
  rowSpan?: number;
  bgClass: string;
  content: React.ReactNode;
}

const MOOD_CELLS: MoodCell[] = [
  {
    id: 0,
    span: 2,
    rowSpan: 2,
    bgClass: styles.cell0,
    content: (
      <p className={styles.monogramText}>
        {WEDDING.bride}
        <br />
        <span className={styles.goldStar}>✦</span>
        <br />
        {WEDDING.groom}
      </p>
    ),
  },
  {
    id: 1,
    bgClass: styles.cell1,
    content: (
      <p className={styles.quoteText}>
        &ldquo;To love and be loved is to feel the sun from both sides.&rdquo;
      </p>
    ),
  },
  {
    id: 2,
    bgClass: styles.cell2,
    content: (
      <div className={styles.venueBlock}>
        <p className={styles.venueLabel}>Ceremony</p>
        <p className={styles.venueName}>
          St. Margaret&apos;s
          <br />
          Westminster
        </p>
      </div>
    ),
  },
  {
    id: 3,
    span: 2,
    bgClass: styles.cell3,
    content: <p className={styles.taglineText}>Dinner · Dancing · Champagne · Joy</p>,
  },
  {
    id: 4,
    bgClass: styles.cell4,
    content: <p className={styles.dateText}>14 · VI<br />{WEDDING.displayYear}</p>,
  },
];

export function Gallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="gallery" className={styles.gallery}>
      <div className={styles.inner}>
        <SectionHeader tag="Atmosphere" title="What awaits you" />

        <Reveal delay={0.15}>
          <div className={styles.grid}>
            {MOOD_CELLS.map((cell) => (
              <div
                key={cell.id}
                className={`${styles.cell} ${cell.bgClass}`}
                style={{
                  gridColumn: cell.span ? `span ${cell.span}` : "span 1",
                  gridRow: cell.rowSpan ? `span ${cell.rowSpan}` : "span 1",
                }}
                onMouseEnter={() => setHovered(cell.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={`${styles.cellInner} ${hovered === cell.id ? styles.cellHovered : ""}`}
                >
                  {cell.content}
                </div>
                <div
                  className={`${styles.cellOverlay} ${hovered === cell.id ? styles.cellOverlayHovered : ""}`}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
