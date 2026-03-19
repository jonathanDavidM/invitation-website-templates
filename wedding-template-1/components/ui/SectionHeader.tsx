import { Reveal } from "./Reveal";
import { GoldDivider } from "./GoldDivider";
import styles from "@/styles/modules/ui.module.css";

interface SectionHeaderProps {
  tag: string;
  title: string;
  light?: boolean;
}

export function SectionHeader({ tag, title, light = false }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeaderWrap}>
      <Reveal delay={0}>
        <p className={`${styles.sectionTag} ${light ? styles.sectionTagLight : ""}`}>{tag}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className={`${styles.sectionTitle} ${light ? styles.sectionTitleLight : ""}`}>{title}</h2>
      </Reveal>
      <Reveal delay={0.2}>
        <GoldDivider light={light} />
      </Reveal>
    </div>
  );
}
