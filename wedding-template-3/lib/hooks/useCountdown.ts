"use client";
import { useState, useEffect } from "react";
import type { CountdownTime } from "@/lib/types";

export function useCountdown(target: string): CountdownTime {
  const [time, setTime] = useState<CountdownTime>({ days: "--", hours: "--", mins: "--", secs: "--" });
  useEffect(() => {
    const t = new Date(target).getTime();
    const tick = () => {
      const diff = t - Date.now();
      if (diff <= 0) { setTime({ days: "00", hours: "00", mins: "00", secs: "00" }); return; }
      const pad = (n: number) => String(n).padStart(2, "0");
      setTime({
        days:  pad(Math.floor(diff / 86400000)),
        hours: pad(Math.floor((diff % 86400000) / 3600000)),
        mins:  pad(Math.floor((diff % 3600000) / 60000)),
        secs:  pad(Math.floor((diff % 60000) / 1000)),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}
