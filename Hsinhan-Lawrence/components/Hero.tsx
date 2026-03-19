"use client";
import { wedding } from "@/wedding.config";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background photo */}
      {/* Replace heroBg in wedding.config.ts with your own photo URL */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
        style={{ backgroundImage: `url('${wedding.heroBg}')` }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to bottom, rgba(18,12,8,0.38) 0%, rgba(18,12,8,0.12) 40%, rgba(18,12,8,0.68) 82%, rgba(18,12,8,0.95) 100%)"
      }} />

      {/* Corner flourishes */}
      <div className="corner-border corner-tl" />
      <div className="corner-border corner-tr" />
      <div className="corner-border corner-bl" />
      <div className="corner-border corner-br" />

      {/* Content */}
      <div className="relative z-10 text-center text-ivory px-6 py-12 animate-fade-up">

        {/* Pre-label */}
        <p className="font-jost font-thin text-[10px] tracking-[0.42em] uppercase text-champagne mb-5">
          Together with their families
        </p>

        {/* Names */}
        <h1 className="font-cormorant font-light leading-[0.92] tracking-tight"
          style={{ fontSize: "clamp(60px, 13vw, 116px)" }}>
          {wedding.groom}
          <span className="block italic text-blush" style={{ fontSize: "0.72em", lineHeight: "1" }}>
            &amp;
          </span>
          {wedding.bride}
        </h1>

        {/* Divider */}
        <div className="gold-divider my-7">
          <div className="w-[5px] h-[5px] rounded-full bg-gold" />
        </div>

        {/* Date */}
        <p className="font-cormorant font-light text-ivory tracking-[0.18em]"
          style={{ fontSize: "clamp(16px, 3.5vw, 24px)" }}>
          {wedding.datePretty}
        </p>

        {/* Venue */}
        <p className="font-jost font-thin text-[11px] tracking-[0.28em] uppercase text-ivory/50 mt-2">
          {wedding.venueName} · {wedding.venueCity}
        </p>

        {/* Dresscode badge */}
        <div className="inline-flex items-center gap-2 mt-5 px-5 py-2 border border-gold/30 rounded-full">
          <span className="text-gold/70 text-[9px] tracking-[0.35em] uppercase font-jost font-light">
            {wedding.dresscode}
          </span>
        </div>

        {/* Scroll cue */}
        <div className="flex flex-col items-center gap-2 mt-14">
          <span className="font-jost text-[9px] tracking-[0.32em] text-ivory/30 uppercase">Scroll</span>
          <div className="w-px h-10 animate-scroll-pulse"
            style={{ background: "linear-gradient(to bottom, rgba(184,150,76,0.6), transparent)" }} />
        </div>
      </div>
    </section>
  );
}
