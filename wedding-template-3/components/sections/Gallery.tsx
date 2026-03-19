"use client";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import styles from "@/styles/modules/gallery.module.css";

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80", alt: "Couple portrait", span: 2 },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80", alt: "Wedding flowers" },
  { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80", alt: "Wedding rings" },
  { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80", alt: "First dance" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", alt: "Wedding ceremony" },
  { src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80", alt: "Celebration", span: 2 },
];

export function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.header}>
        <Reveal>
          <p className={styles.eyebrow}>Moments</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className={styles.heading}>Our Gallery</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="gold-line"><span /><i /><span /></div>
        </Reveal>
      </div>

      <Reveal animation="fadeIn" delay={0.2} style={{ padding: "0 var(--section-px)" }}>
        <div className={styles.grid}>
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              className={styles.cell}
              style={{ gridColumn: photo.span ? `span ${photo.span}` : "span 1" }}
              onClick={() => setLightbox(photo.src)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={photo.alt} className={styles.img} loading="lazy" />
              <div className={styles.cellOverlay}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" aria-hidden="true">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Lightbox */}
      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)} role="dialog" aria-label="Photo lightbox">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="Full size" className={styles.lightboxImg} />
          <button className={styles.lightboxClose} onClick={() => setLightbox(null)} aria-label="Close">✕</button>
        </div>
      )}
    </section>
  );
}
