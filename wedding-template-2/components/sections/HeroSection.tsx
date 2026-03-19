"use client";
// components/sections/HeroSection.tsx
import { useEffect, useState } from "react";
import { WEDDING } from "@/lib/wedding-data";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="story"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Deep layered background */}
      <div className="absolute inset-0 bg-forest-deep" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a5c3a22_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#c9a84c08_0%,_transparent_60%)]" />

      {/* Decorative arch lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[85vmin] h-[85vmin] rounded-full border border-gold/5" />
        <div className="absolute w-[70vmin] h-[70vmin] rounded-full border border-gold/5" />
        <div className="absolute w-[55vmin] h-[55vmin] rounded-full border border-emerald-800/20" />
      </div>

      {/* Vertical lines */}
      <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" />

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.1s" }}
      >
        {/* Eyebrow */}
        <p
          className="font-heading text-gold tracking-[0.5em] text-[10px] uppercase mb-8 opacity-0 animate-fade-up"
          style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
        >
          Together with their families
        </p>

        {/* Names */}
        <div
          className="opacity-0 animate-fade-up mb-2"
          style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
        >
          <h1 className="font-display italic text-cream text-7xl md:text-9xl font-light leading-none tracking-tight">
            {WEDDING.couple.partner1.firstName}
          </h1>
        </div>

        <div
          className="opacity-0 animate-fade-up flex items-center justify-center gap-6 my-4"
          style={{ animationDelay: "700ms", animationFillMode: "forwards" }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/50" />
          <span className="font-display text-gold/80 text-3xl italic">
            &amp;
          </span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/50" />
        </div>

        <div
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: "900ms", animationFillMode: "forwards" }}
        >
          <h1 className="font-display italic text-cream text-7xl md:text-9xl font-light leading-none tracking-tight">
            {WEDDING.couple.partner2.firstName}
          </h1>
          <p className="font-display text-cream/40 text-2xl mt-1 italic">
            {WEDDING.couple.partner2.lastName}
          </p>
        </div>

        {/* Date badge */}
        <div
          className="opacity-0 animate-fade-up mt-12 inline-block"
          style={{ animationDelay: "1100ms", animationFillMode: "forwards" }}
        >
          <div className="border border-gold/30 px-10 py-4 relative">
            <div className="absolute -top-px left-4 right-4 h-px bg-gold/30" />
            <div className="absolute -bottom-px left-4 right-4 h-px bg-gold/30" />
            <p className="font-heading text-gold tracking-[0.4em] text-xs uppercase">
              {WEDDING.date.display}
            </p>
          </div>
        </div>

        {/* Invitation text */}
        <div
          className="opacity-0 animate-fade-up mt-8"
          style={{ animationDelay: "1300ms", animationFillMode: "forwards" }}
        >
          <p className="font-body text-cream/40 text-xs tracking-widest uppercase">
            cordially invite you to share in their joy
          </p>
        </div>

        {/* Scroll cue */}
        {/* <div
          className="opacity-0 animate-fade-up absolute bottom-10 left-1/2 -translate-x-1/2"
          style={{ animationDelay: "1600ms", animationFillMode: "forwards" }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="font-heading text-[9px] tracking-[0.3em] uppercase text-cream/30">
              scroll
            </p>
            <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent animate-float" />
          </div>
        </div> */}
      </div>
    </section>
  );
}
