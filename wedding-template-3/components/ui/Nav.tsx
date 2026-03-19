"use client";
import { useState } from "react";
import styles from "@/styles/modules/nav.module.css";

const LINKS = [
  { id: "story",     label: "Our Story" },
  { id: "details",   label: "Details" },
  { id: "programme", label: "Programme" },
  { id: "gallery",   label: "Gallery" },
  { id: "rsvp",      label: "RSVP" },
];

interface NavProps {
  active: string;
  visible: boolean;
  onNav: (id: string) => void;
}

export function Nav({ active, visible, onNav }: NavProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`${styles.nav} ${visible ? styles.navVisible : ""}`} role="banner">
      <button className={styles.logo} onClick={() => onNav("hero")} aria-label="Home">
        <span>Lj</span>
        <span className={styles.logoAmp}>&amp;</span>
        <span>Lei</span>
      </button>

      {/* Desktop */}
      <nav className={styles.links} aria-label="Site navigation">
        {LINKS.map(({ id, label }) => (
          <button
            key={id}
            className={`${styles.link} ${active === id ? styles.linkActive : ""}`}
            onClick={() => onNav(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <button className={styles.rsvpBtn} onClick={() => onNav("rsvp")}>
        RSVP
      </button>

      {/* Mobile toggle */}
      <button
        className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`} aria-hidden={!open}>
        {LINKS.map(({ id, label }) => (
          <button key={id} className={styles.drawerLink} onClick={() => { onNav(id); setOpen(false); }}>
            {label}
          </button>
        ))}
        <button className={styles.drawerRsvp} onClick={() => { onNav("rsvp"); setOpen(false); }}>
          RSVP
        </button>
      </div>
    </header>
  );
}
