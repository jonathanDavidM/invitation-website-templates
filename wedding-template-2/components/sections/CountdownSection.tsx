"use client";
// components/sections/CountdownSection.tsx
import { useEffect, useState } from "react";
import { getCountdownValues } from "@/lib/utils";
import { WEDDING } from "@/lib/wedding-data";

interface CountdownUnit {
  value: number;
  label: string;
}

function CountdownBox({ value, label }: CountdownUnit) {
  return (
    <div className="flex flex-col items-center gap-3 group">
      <div className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center border border-gold/20 bg-forest-light/10 group-hover:border-gold/40 transition-colors duration-300">
        {/* Corner accents */}
        <div className="absolute -top-0.5 -left-0.5 w-3 h-3 border-t border-l border-gold/60" />
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 border-t border-r border-gold/60" />
        <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 border-b border-l border-gold/60" />
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-b border-r border-gold/60" />
        <span className="font-display text-4xl md:text-5xl text-cream font-light">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <p className="font-heading text-[9px] tracking-[0.3em] uppercase text-gold/60">{label}</p>
    </div>
  );
}

export function CountdownSection() {
  const [countdown, setCountdown] = useState(getCountdownValues(WEDDING.date.iso));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdownValues(WEDDING.date.iso));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units: CountdownUnit[] = [
    { value: countdown.days, label: "Days" },
    { value: countdown.hours, label: "Hours" },
    { value: countdown.minutes, label: "Minutes" },
    { value: countdown.seconds, label: "Seconds" },
  ];

  return (
    <section className="relative py-20 px-6 bg-forest-dark overflow-hidden">
      {/* Background emerald shimmer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#1a5c3a15_0%,_transparent_70%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <p className="font-heading text-gold tracking-[0.4em] text-[10px] uppercase mb-3">
          Counting down to
        </p>
        <p className="font-display italic text-cream/80 text-2xl mb-12">
          {WEDDING.date.dayOfWeek}, {WEDDING.date.display}
        </p>

        <div className="flex items-start justify-center gap-4 md:gap-8">
          {units.map((unit, i) => (
            <div key={unit.label} className="flex items-start gap-4 md:gap-8">
              <CountdownBox value={unit.value} label={unit.label} />
              {i < units.length - 1 && (
                <span className="font-display text-gold/40 text-3xl mt-6 hidden sm:block">:</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
