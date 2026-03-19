import styles from "@/styles/modules/ui.module.css";

interface GoldDividerProps {
  light?: boolean;
}

export function GoldDivider({ light = false }: GoldDividerProps) {
  return (
    <div className={`${styles.divider} ${light ? styles.dividerLight : ""}`}>
      <span className={styles.dividerLine} />
      <span className={styles.dividerDiamond} />
      <span className={styles.dividerLine} />
    </div>
  );
}
