"use client";

import { useState, useEffect } from "react";
import { WEDDING } from "@/lib/constants";
import type { NavSection } from "@/lib/types";
import styles from "@/styles/modules/nav.module.css";

const NAV_LINKS: { id: NavSection; label: string }[] = [
  { id: "story", label: "Our Story" },
  { id: "details", label: "Details" },
  { id: "gallery", label: "Gallery" },
  { id: "rsvp", label: "RSVP" },
];

interface NavProps {
  activeSection: NavSection;
  onNavigate: (id: NavSection) => void;
}

export function Nav({ activeSection, onNavigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (id: NavSection) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
      <button
        className={styles.logo}
        onClick={() => handleNav("hero")}
        aria-label="Go to top"
      >
        {WEDDING.monogram}
      </button>

      {/* Desktop links */}
      <ul className={styles.links}>
        {NAV_LINKS.map(({ id, label }) => (
          <li key={id}>
            <button
              className={`${styles.link} ${activeSection === id ? styles.linkActive : ""}`}
              onClick={() => handleNav(id)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      <button
        className={styles.rsvpBtn}
        onClick={() => handleNav("rsvp")}
        aria-label="RSVP"
      >
        RSVP
      </button>

      {/* Mobile hamburger */}
      <button
        className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              className={styles.mobileLink}
              onClick={() => handleNav(id)}
            >
              {label}
            </button>
          ))}
          <button
            className={styles.mobileRsvp}
            onClick={() => handleNav("rsvp")}
          >
            RSVP
          </button>
        </div>
      )}
    </nav>
  );
}
