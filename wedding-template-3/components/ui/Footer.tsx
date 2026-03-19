import { WEDDING } from "@/lib/constants";
import styles from "@/styles/modules/footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className="gold-line"><span /><i /><span /></div>
        <p className={styles.monogram}>{WEDDING.groom} &amp; {WEDDING.bride}</p>
        <p className={styles.date}>{WEDDING.displayDate}</p>
        <p className={styles.hashtag}>{WEDDING.hashtag}</p>
        <p className={styles.credit}>
          Made with love &nbsp;·&nbsp; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
