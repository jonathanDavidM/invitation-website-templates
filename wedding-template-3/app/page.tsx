"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Nav } from "@/components/ui/Nav";
import { Hero } from "@/components/sections/Hero";
import { SaveTheDate } from "@/components/sections/SaveTheDate";
import { OurStory } from "@/components/sections/OurStory";
import { EventDetails } from "@/components/sections/EventDetails";
import { Programme } from "@/components/sections/Programme";
import { Gallery } from "@/components/sections/Gallery";
import { RSVPSection } from "@/components/sections/RSVPSection";
import { Footer } from "@/components/ui/Footer";

const SECTIONS = ["hero", "story", "details", "programme", "gallery", "rsvp"] as const;
type SectionId = typeof SECTIONS[number];

export default function Home() {
  const [active, setActive] = useState<SectionId>("hero");
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    // Show nav after initial scroll
    const onScroll = () => setNavVisible(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Track active section
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as SectionId);
        });
      },
      { threshold: 0.3 }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <Nav active={active} visible={navVisible} onNav={scrollTo} />
      <main>
        <Hero onScroll={() => scrollTo("story")} />
        <SaveTheDate />
        <OurStory />
        <EventDetails />
        <Programme />
        <Gallery />
        <RSVPSection />
      </main>
      <Footer />
    </>
  );
}
