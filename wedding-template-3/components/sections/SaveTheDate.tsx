"use client";
import { WEDDING } from "@/lib/constants";
import { useCountdown } from "@/lib/hooks/useCountdown";
import { Reveal } from "@/components/ui/Reveal";
import styles from "@/styles/modules/savethedate.module.css";

export function SaveTheDate() {
  const time = useCountdown(WEDDING.date);
  const units = [
    { val: time.days,  label: "Days" },
    { val: time.hours, label: "Hours" },
    { val: time.mins,  label: "Minutes" },
    { val: time.secs,  label: "Seconds" },
  ];

  return (
    <section className={styles.section}>
      {/* Decorative side text */}
      <div className={styles.sideTextLeft} aria-hidden="true">
        {WEDDING.displayDate}
      </div>
      <div className={styles.sideTextRight} aria-hidden="true">
        {WEDDING.hashtag}
      </div>

      <div className={styles.inner}>
        <Reveal animation="fadeIn">
          <p className={styles.eyebrow}>Save the Date</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className={styles.headline}>{WEDDING.displayDateLong}</h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="gold-line"><span /><i /><span /></div>
        </Reveal>

        {/* Countdown */}
        <Reveal delay={0.3} animation="fadeIn">
          <div className={styles.countdown}>
            {units.map((u, i) => (
              <div key={u.label} className={styles.unitGroup}>
                <div className={styles.unit}>
                  <span className={styles.number}>{u.val}</span>
                  <span className={styles.label}>{u.label}</span>
                </div>
                {i < units.length - 1 && <span className={styles.sep}>·</span>}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
