"use client";
// components/ui/Navigation.tsx
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { WEDDING } from "@/lib/wedding-data";

const NAV_LINKS = [
  { label: "Our Story", href: "#story" },
  { label: "Events", href: "#events" },
  { label: "Schedule", href: "#schedule" },
  { label: "Entourage", href: "#entourage" },
  { label: "RSVP", href: "#rsvp" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-forest-dark/95 backdrop-blur-md border-b border-gold/10 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display italic text-gold text-xl tracking-wide">
          D <span className="text-gold/50 text-sm">&amp;</span> R
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-heading text-[10px] tracking-[0.25em] uppercase text-cream/60 hover:text-gold transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Date pill */}
        <div className="hidden md:block font-heading text-[10px] tracking-[0.2em] text-gold/70 border border-gold/20 px-4 py-1.5">
          {WEDDING.date.display}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "block w-6 h-px bg-gold transition-all duration-300",
              menuOpen && "rotate-45 translate-y-2"
            )}
          />
          <span
            className={cn(
              "block w-6 h-px bg-gold transition-all duration-300",
              menuOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block w-6 h-px bg-gold transition-all duration-300",
              menuOpen && "-rotate-45 -translate-y-2"
            )}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-forest-dark/98 border-b border-gold/10 transition-all duration-300 overflow-hidden",
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-heading text-xs tracking-[0.25em] uppercase text-cream/70 hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
