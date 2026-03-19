"use client";

import { WEDDING } from "@/lib/constants";
import { useCountdown } from "@/lib/hooks/useCountdown";
import { Reveal } from "@/components/ui/Reveal";
import styles from "@/styles/modules/countdown.module.css";

const UNITS = [
  { key: "days" as const, label: "Days" },
  { key: "hours" as const, label: "Hours" },
  { key: "mins" as const, label: "Minutes" },
  { key: "secs" as const, label: "Seconds" },
];

export function Countdown() {
  const time = useCountdown(WEDDING.date);

  return (
    <section id="countdown" className={styles.countdown}>
      <Reveal>
        <p className={styles.label}>Counting the Days</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className={styles.row}>
          {UNITS.map((unit, i) => (
            <div key={unit.key} className={styles.unitGroup}>
              <div className={styles.unit}>
                <span className={styles.number}>{time[unit.key]}</span>
                <span className={styles.unitLabel}>{unit.label}</span>
              </div>
              {i < UNITS.length - 1 && (
                <span className={styles.separator} aria-hidden="true">·</span>
              )}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
