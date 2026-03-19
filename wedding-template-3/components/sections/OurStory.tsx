import { WEDDING } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import styles from "@/styles/modules/story.module.css";

export function OurStory() {
  return (
    <section id="story" className={styles.section}>
      {/* Full-bleed parallax photo */}
      <ParallaxImage
        src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1600&q=80"
        alt="Couple photo"
        height="60vh"
        overlay="rgba(9,9,8,0.5)"
      >
        <div className={styles.photoCaption}>
          <Reveal animation="fadeIn">
            <p className={styles.photoCaptionText}>Our Story</p>
          </Reveal>
        </div>
      </ParallaxImage>

      {/* Story timeline */}
      <div className={styles.inner}>
        <div className={styles.timeline}>
          {WEDDING.story.map((item, i) => (
            <Reveal key={i} delay={i * 0.1} animation={i % 2 === 0 ? "slideRight" : "slideLeft"}>
              <div className={`${styles.item} ${i % 2 !== 0 ? styles.itemReverse : ""}`}>
                {/* Year badge */}
                <div className={styles.yearCol}>
                  <span className={styles.year}>{item.year}</span>
                  <span className={styles.yearLine} />
                </div>
                {/* Text */}
                <div className={styles.textCol}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemBody}>{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Second atmospheric photo */}
      <ParallaxImage
        src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600&q=80"
        alt="Wedding atmosphere"
        height="50vh"
        overlay="rgba(9,9,8,0.4)"
      />
    </section>
  );
}
