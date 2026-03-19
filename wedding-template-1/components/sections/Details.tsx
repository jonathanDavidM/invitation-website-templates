"use client";

import { useState } from "react";
import { WEDDING } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import styles from "@/styles/modules/details.module.css";

interface DetailCard {
  label: string;
  title: string;
  lines: string[];
  href?: string;
  icon: React.ReactNode;
}

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const DETAIL_CARDS: DetailCard[] = [
  {
    label: "Ceremony",
    title: WEDDING.ceremony.venue,
    lines: [WEDDING.ceremony.address, WEDDING.ceremony.time, WEDDING.ceremony.doorsOpen],
    href: WEDDING.ceremony.mapsUrl,
    icon: <LocationIcon />,
  },
  {
    label: "Reception",
    title: WEDDING.reception.venue,
    lines: [WEDDING.reception.address, WEDDING.reception.time, WEDDING.reception.note],
    href: WEDDING.reception.mapsUrl,
    icon: <HomeIcon />,
  },
  {
    label: "Dress Code",
    title: WEDDING.dressCode,
    lines: ["Formal attire requested", WEDDING.dressNote],
    icon: <ClockIcon />,
  },
];

export function Details() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="details" className={styles.details}>
      <div className={styles.inner}>
        <SectionHeader tag="Event Details" title="Join us to celebrate" light />

        <div className={styles.grid}>
          {DETAIL_CARDS.map((card, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div
                className={`${styles.card} ${hovered === i ? styles.cardHovered : ""}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className={`${styles.iconWrap} ${hovered === i ? styles.iconWrapHovered : ""}`}>
                  {card.icon}
                </div>
                <span className={styles.cardLabel}>{card.label}</span>
                <span className={styles.cardTitle}>{card.title}</span>
                <div className={styles.cardBody}>
                  {card.lines.map((line, j) => (
                    <p key={j}>{line}</p>
                  ))}
                </div>
                {card.href && (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mapLink}
                  >
                    View on Map →
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
