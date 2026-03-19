"use client";
import { useEffect, useRef } from "react";
import { WEDDING } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import styles from "@/styles/modules/programme.module.css";

export function Programme() {
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = bgRef.current;
    if (!img) return;
    const onScroll = () => {
      const section = img.closest("section");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      img.style.transform = `translateY(${(progress - 0.5) * 60}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="programme" className={styles.section}>
      <div className={styles.bgWrap} aria-hidden="true">
        <img
          ref={bgRef}
          src="https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1600&q=80"
          alt=""
          className={styles.bgImg}
        />
        <div className={styles.bgOverlay} />
      </div>

      <div className={styles.inner}>
        <Reveal animation="fadeIn">
          <p className={styles.eyebrow}>The Day</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className={styles.heading}>Programme</h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="gold-line" style={{ marginBottom: 56 }}>
            <span /><i /><span />
          </div>
        </Reveal>

        <div className={styles.list}>
          {WEDDING.programme.map((item, i) => (
            <Reveal key={i} delay={i * 0.06} animation="fadeIn">
              <div className={styles.row}>
                <span className={styles.time}>{item.time}</span>
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.event}>{item.event}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
