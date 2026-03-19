import { WEDDING, TIMELINE } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import styles from "@/styles/modules/story.module.css";

export function Story() {
  return (
    <section id="story" className={styles.story}>
      <div className={styles.inner}>
        <SectionHeader tag="Our Story" title="A love story worth telling" />

        <Reveal delay={0.1}>
          <p className={styles.intro}>
            We met on a rainy Tuesday in a bookshop on Charing Cross Road. What began as a
            laughing apology turned into coffee, then dinner, then four years of{" "}
            <em className={styles.introEm}>adventures across three continents</em>. Today,
            we invite you to witness the next chapter.
          </p>
        </Reveal>

        {/* Timeline */}
        <div className={styles.timeline}>
          <div className={styles.centerLine} aria-hidden="true" />

          {TIMELINE.map((item, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div className={`${styles.timelineItem} ${styles[`side_${item.side}`]}`}>
                <div className={`${styles.timelineCard} ${styles[`card_${item.side}`]}`}>
                  <div
                    className={styles.dot}
                    style={{ [item.side === "left" ? "right" : "left"]: -7 }}
                    aria-hidden="true"
                  />
                  <span className={styles.year}>{item.year}</span>
                  <span className={styles.eventTitle}>{item.title}</span>
                  <p className={styles.eventDesc}>{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
