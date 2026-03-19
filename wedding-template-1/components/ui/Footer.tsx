import { WEDDING } from "@/lib/constants";
import styles from "@/styles/modules/footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.monogram}>{WEDDING.monogram}</span>
      <span className={styles.date}>{WEDDING.displayShort}</span>
      <p className={styles.tagline}>Made with love, for love.</p>
    </footer>
  );
}
