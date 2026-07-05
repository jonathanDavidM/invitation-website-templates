"use client";

import { motion, type Variants } from "framer-motion";
import { Container, Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { DURATION, EASE_LUXE } from "@/lib/motion";
import { schedule } from "@/content/wedding";

/**
 * Rail segment that draws itself downward as its event reveals.
 * Inherits the hidden/visible orchestration from the parent RevealGroup.
 */
const railGrow: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: DURATION, ease: EASE_LUXE },
  },
};

/** Wedding-day programme — a quiet vertical timeline. */
export function Schedule() {
  return (
    <Section id="schedule" surface="card">
      <Container>
        <SectionHeading
          script="the celebration"
          eyebrow="Wedding Day"
          title="Order of the Day"
          description="Thursday, September 10, 2026"
        />

        <RevealGroup
          as="ol"
          stagger={0.12}
          className="mx-auto flex max-w-2xl flex-col gap-10"
        >
          {schedule.map((event, index) => {
            const Icon = event.icon;
            const isLast = index === schedule.length - 1;
            return (
              <RevealItem
                as="li"
                key={event.title}
                className="relative flex items-start gap-6"
              >
                {/* Connecting rail — runs from this marker to the next one. */}
                {!isLast ? (
                  <motion.span
                    aria-hidden="true"
                    variants={railGrow}
                    className="absolute -bottom-10 left-6 top-12 w-px origin-top bg-border"
                  />
                ) : null}

                <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent-soft">
                  <Icon aria-hidden="true" className="size-5 text-accent-foreground" />
                </span>

                <div className="min-w-0 flex-1 pt-2">
                  <p className="font-serif text-body font-semibold text-primary">
                    {event.time}
                  </p>
                  <h3 className="mt-1 font-serif text-body font-semibold text-foreground">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-body text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
