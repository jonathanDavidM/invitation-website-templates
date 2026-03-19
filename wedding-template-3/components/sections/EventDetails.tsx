import { WEDDING } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import styles from "@/styles/modules/details.module.css";

function MapPinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

export function EventDetails() {
  return (
    <section id="details" className={styles.section}>
      <div className={styles.inner}>
        {/* Section header */}
        <Reveal>
          <p className={styles.eyebrow}>The Celebration</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className={styles.heading}>Event Details</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="gold-line" style={{ marginBottom: "var(--section-py)" }}>
            <span /><i /><span />
          </div>
        </Reveal>

        {/* Two event cards */}
        <div className={styles.grid}>
          {/* Ceremony */}
          <Reveal animation="slideRight" delay={0.1}>
            <div className={styles.card}>
              <div className={styles.cardTopLine} />
              <span className={styles.cardBadge}>01</span>
              <h3 className={styles.cardTitle}>Ceremony</h3>
              <div className={styles.cardDivider} />
              <div className={styles.detail}>
                <ClockIcon />
                <span>{WEDDING.ceremony.time}</span>
              </div>
              <div className={styles.detail}>
                <MapPinIcon />
                <div>
                  <strong>{WEDDING.ceremony.venue}</strong>
                  <span>{WEDDING.ceremony.address}</span>
                </div>
              </div>
              <a
                href={WEDDING.ceremony.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                View on Map
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M2 10L10 2M10 2H4M10 2v6"/>
                </svg>
              </a>
            </div>
          </Reveal>

          {/* Reception */}
          <Reveal animation="slideLeft" delay={0.2}>
            <div className={`${styles.card} ${styles.cardAlt}`}>
              <div className={styles.cardTopLine} />
              <span className={styles.cardBadge}>02</span>
              <h3 className={styles.cardTitle}>Reception</h3>
              <div className={styles.cardDivider} />
              <div className={styles.detail}>
                <ClockIcon />
                <span>{WEDDING.reception.time}</span>
              </div>
              <div className={styles.detail}>
                <MapPinIcon />
                <div>
                  <strong>{WEDDING.reception.venue}</strong>
                  <span>{WEDDING.reception.address}</span>
                </div>
              </div>
              <a
                href={WEDDING.reception.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                View on Map
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M2 10L10 2M10 2H4M10 2v6"/>
                </svg>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Dress code strip */}
        <Reveal delay={0.3} animation="fadeIn">
          <div className={styles.dressCode}>
            <span className={styles.dressLabel}>Dress Code</span>
            <span className={styles.dressDivider} />
            <span className={styles.dressValue}>Formal Attire — Black &amp; White Palette Welcome</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
