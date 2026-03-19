"use client";

import { useState, useEffect, useCallback } from "react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Countdown } from "@/components/sections/Countdown";
import { Details } from "@/components/sections/Details";
import { Gallery } from "@/components/sections/Gallery";
import { RSVPSection } from "@/components/sections/RSVPSection";
import type { NavSection } from "@/lib/types";

const SECTIONS: NavSection[] = ["hero", "story", "countdown", "details", "gallery", "rsvp"];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<NavSection>("hero");

  // Track which section is in view
  useEffect(() => {
    const observers = SECTIONS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const handleNavigate = useCallback((id: NavSection) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <Nav activeSection={activeSection} onNavigate={handleNavigate} />
      <main>
        <Hero onNavigate={handleNavigate} />
        <Story />
        <Countdown />
        <Details />
        <Gallery />
        <RSVPSection />
      </main>
      <Footer />
    </>
  );
}
