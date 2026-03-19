// components/sections/FooterSection.tsx
import { WEDDING } from "@/lib/wedding-data";
import { Heart } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="relative py-16 px-6 bg-forest-deep overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a5c3a08_0%,_transparent_70%)]" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Ornament */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/30" />
          <span className="font-display text-gold/40 text-2xl italic">✦</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/30" />
        </div>

        {/* Names */}
        <h2 className="font-display italic text-cream/80 text-5xl md:text-6xl font-light mb-3">
          {WEDDING.couple.partner1.firstName}
        </h2>
        <p className="font-display italic text-gold/60 text-2xl mb-2">&amp;</p>
        <h2 className="font-display italic text-cream/80 text-5xl md:text-6xl font-light mb-8">
          {WEDDING.couple.partner2.firstName}
        </h2>

        {/* Date */}
        <p className="font-heading text-gold tracking-[0.35em] text-[10px] uppercase mb-2">
          {WEDDING.date.display}
        </p>
        <p className="font-body text-cream/30 text-xs tracking-wide mb-10">
          {WEDDING.ceremony.name} · {WEDDING.reception.name}
        </p>

        {/* Hashtag */}
        <div className="inline-block border border-gold/20 px-6 py-2.5 mb-10">
          <p className="font-heading text-gold/70 tracking-[0.2em] text-[10px] uppercase">
            {WEDDING.couple.hashtag}
          </p>
        </div>

        {/* Love note */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <p className="font-body text-cream/20 text-[10px] tracking-widest uppercase">
            Made with
          </p>
          <Heart className="w-3 h-3 text-gold/40 fill-gold/40" />
          <p className="font-body text-cream/20 text-[10px] tracking-widest uppercase">
            for our special day
          </p>
        </div>
      </div>
    </footer>
  );
}
