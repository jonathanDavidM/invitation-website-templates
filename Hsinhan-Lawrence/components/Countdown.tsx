"use client";
import { useEffect, useState } from "react";
import { wedding } from "@/wedding.config";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function pad(n: number, len = 2) {
  return String(n).padStart(len, "0");
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(wedding.dateISO).getTime();

    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days",    value: mounted ? pad(time.days, 3) : "000" },
    { label: "Hours",   value: mounted ? pad(time.hours)   : "00"  },
    { label: "Minutes", value: mounted ? pad(time.minutes) : "00"  },
    { label: "Seconds", value: mounted ? pad(time.seconds) : "00"  },
  ];

  return (
    <section className="bg-ink py-20 px-6 text-center">
      {/* Section label */}
      <p className="font-jost font-thin text-[10px] tracking-[0.42em] uppercase text-gold mb-3">
        Counting Down
      </p>
      <p className="font-cormorant font-light text-ivory/60 text-lg mb-12 tracking-widest">
        to our wedding day
      </p>

      {/* Grid */}
      <div className="flex items-start justify-center gap-2 flex-wrap max-w-2xl mx-auto">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-start gap-2">
            {/* Unit block */}
            <div className="flex flex-col items-center min-w-[72px]">
              {/* Number card */}
              <div className="relative">
                {/* Top half */}
                <div className="bg-white/[0.04] border border-gold/15 rounded-t-sm px-4 pt-4 pb-2 min-w-[80px]">
                  <span className="font-cormorant font-light text-ivory block text-center"
                    style={{ fontSize: "clamp(38px, 8vw, 60px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
                    {u.value}
                  </span>
                </div>
                {/* Separator line */}
                <div className="h-px bg-ink relative z-10" />
                {/* Bottom half */}
                <div className="bg-white/[0.03] border border-t-0 border-gold/10 rounded-b-sm px-4 pb-4 pt-2 min-w-[80px]">
                  <span className="font-cormorant font-light text-ivory block text-center"
                    style={{ fontSize: "clamp(38px, 8vw, 60px)", lineHeight: 1, letterSpacing: "-0.02em", opacity: 0.15 }}>
                    {u.value}
                  </span>
                </div>
              </div>
              <span className="font-jost font-thin text-[9px] tracking-[0.32em] uppercase text-ivory/25 mt-3">
                {u.label}
              </span>
            </div>

            {/* Separator colon */}
            {i < units.length - 1 && (
              <span className="font-cormorant font-light text-gold/25 mt-3"
                style={{ fontSize: "clamp(32px, 6vw, 48px)", lineHeight: 1 }}>
                :
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Wedding date reminder */}
      <div className="mt-14 inline-flex items-center gap-4">
        <div className="h-px w-12 bg-gold/20" />
        <span className="font-cormorant italic font-light text-ivory/40 text-base tracking-widest">
          {wedding.datePretty}
        </span>
        <div className="h-px w-12 bg-gold/20" />
      </div>
    </section>
  );
}
