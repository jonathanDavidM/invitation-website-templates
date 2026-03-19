"use client";

import { useState, useEffect } from "react";
import type { CountdownTime } from "@/lib/types";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function useCountdown(targetDate: string): CountdownTime {
  const [time, setTime] = useState<CountdownTime>({
    days: "--",
    hours: "--",
    mins: "--",
    secs: "--",
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const tick = () => {
      const diff = target - Date.now();

      if (diff <= 0) {
        setTime({ days: "00", hours: "00", mins: "00", secs: "00" });
        return;
      }

      setTime({
        days: pad(Math.floor(diff / 86_400_000)),
        hours: pad(Math.floor((diff % 86_400_000) / 3_600_000)),
        mins: pad(Math.floor((diff % 3_600_000) / 60_000)),
        secs: pad(Math.floor((diff % 60_000) / 1_000)),
      });
    };

    tick();
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, [targetDate]);

  return time;
}
