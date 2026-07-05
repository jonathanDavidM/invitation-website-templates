"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Section, Container } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { EASE_LUXE } from "@/lib/motion";
import { couple } from "@/content/couple";

interface Remaining {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const UNITS: ReadonlyArray<{ key: keyof Remaining; label: string }> = [
  { key: "months", label: "Months" },
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

function addMonths(date: Date, months: number): Date {
  const result = new Date(date.getTime());
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Calendar-aware breakdown: whole calendar months until the date first,
 * then the remaining days/hours/minutes/seconds past the month anchor.
 * Returns null once the date has passed.
 */
function getRemaining(target: Date, now: Date): Remaining | null {
  if (now.getTime() >= target.getTime()) return null;

  let months =
    (target.getFullYear() - now.getFullYear()) * 12 +
    (target.getMonth() - now.getMonth());
  let anchor = addMonths(now, months);
  if (anchor.getTime() > target.getTime()) {
    months -= 1;
    anchor = addMonths(now, months);
  }
  if (months < 0) {
    months = 0;
    anchor = now;
  }

  const totalSeconds = Math.floor((target.getTime() - anchor.getTime()) / 1000);
  return {
    months,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

interface UnitProps {
  label: string;
  /** null while waiting for the first client tick — renders a fixed-width dash */
  value: number | null;
  crossfade: boolean;
}

function CountdownUnit({ label, value, crossfade }: UnitProps) {
  const display = value === null ? "—" : String(value).padStart(2, "0");

  return (
    <div className="flex min-w-16 flex-col items-center gap-2 md:min-w-24">
      <span className="relative block overflow-hidden font-serif text-display font-normal tabular-nums text-forest-foreground">
        {crossfade && value !== null ? (
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={display}
              initial={{ opacity: 0, y: "0.3em" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-0.3em" }}
              transition={{ duration: 0.3, ease: EASE_LUXE }}
              className="block"
            >
              {display}
            </motion.span>
          </AnimatePresence>
        ) : (
          <span className="block">{display}</span>
        )}
      </span>
      <span className="text-caption uppercase tracking-[0.25em] text-forest-muted">
        {label}
      </span>
    </div>
  );
}

/** Live countdown to the wedding day on the dark evergreen surface. */
export function Countdown() {
  const reduceMotion = useReducedMotion();
  // null = not yet hydrated (nothing date-based is computed during SSR).
  const [remaining, setRemaining] = React.useState<Remaining | "past" | null>(
    null,
  );

  React.useEffect(() => {
    const target = new Date(couple.dateISO);
    const tick = () => {
      setRemaining(getRemaining(target, new Date()) ?? "past");
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const isPast = remaining === "past";
  const parts = remaining !== null && remaining !== "past" ? remaining : null;

  return (
    <Section id="countdown" surface="forest">
      <Container>
        <SectionHeading
          onDark
          script="save the date"
          eyebrow="Counting Down"
          title="Until We Say I Do"
        />

        <Reveal className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-forest-foreground/15 bg-forest-foreground/10 p-8 shadow-lg backdrop-blur-md md:p-12">
            {isPast ? (
              <div className="flex flex-col items-center gap-2 text-center">
                <p
                  aria-hidden="true"
                  className="font-script text-title text-accent"
                >
                  happily ever after
                </p>
                <p className="font-serif text-title font-semibold text-forest-foreground">
                  We&rsquo;re married!
                </p>
              </div>
            ) : (
              <>
                {/* Static sentence for screen readers; the ticking digits below are hidden. */}
                <p className="sr-only">
                  Our wedding is on {couple.dateLabel}.
                </p>
                <div
                  aria-hidden="true"
                  className="flex flex-col items-center gap-8"
                >
                  <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-8 md:gap-x-8">
                    {UNITS.map((unit, index) => (
                      <React.Fragment key={unit.key}>
                        {index > 0 ? (
                          <span className="hidden h-16 w-px bg-accent/40 md:block" />
                        ) : null}
                        <CountdownUnit
                          label={unit.label}
                          value={parts ? parts[unit.key] : null}
                          crossfade={!reduceMotion}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="text-caption uppercase tracking-[0.25em] text-forest-muted">
                    {couple.dayLabel} &middot; {couple.dateLabel}
                  </p>
                </div>
              </>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
