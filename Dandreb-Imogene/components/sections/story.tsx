import Image from "next/image";
import type { Variants } from "framer-motion";
import { Section, Container } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { DURATION, EASE_LUXE } from "@/lib/motion";
import { story } from "@/content/story";
import { gallery } from "@/content/gallery";
import { cn } from "@/lib/utils";

/** Slide in from the left, settling toward the timeline spine. */
const fromLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION, ease: EASE_LUXE },
  },
};

/** Slide in from the right, settling toward the timeline spine. */
const fromRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION, ease: EASE_LUXE },
  },
};

/** Gallery metadata (orientation, blur placeholder, alt) keyed by src. */
const galleryBySrc = new Map(gallery.map((img) => [img.src, img]));

/**
 * Our Story — a vertical timeline on the tinted surface. Desktop alternates
 * photo/card around a central hairline pinned with gold dots; mobile stacks
 * everything in one column against a left-hand line.
 */
export function Story() {
  return (
    <Section id="story" surface="tinted">
      <Container>
        <SectionHeading
          script="our story"
          eyebrow="How we got here"
          title="A Love Story Written in Two Cities"
          description="From bustling boulevards to golden dunes, every chapter has quietly been leading us home — to this day, and to you."
        />

        <div className="relative">
          {/* Timeline spine */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-4 w-px -translate-x-1/2 bg-border md:left-1/2"
          />

          <ol className="space-y-16 md:space-y-24">
            {story.map((milestone, index) => {
              const isEven = index % 2 === 0;
              const meta = milestone.image
                ? galleryBySrc.get(milestone.image)
                : undefined;
              const isLandscape = meta?.orientation === "landscape";

              return (
                <li key={milestone.title} className="relative">
                  {/* Gold dot pinning this chapter to the line */}
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-8 z-10 size-3 -translate-x-1/2 rounded-full bg-accent ring-4 ring-secondary md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                  />

                  <RevealGroup
                    stagger={0.15}
                    className="grid gap-6 pl-12 md:grid-cols-2 md:items-center md:gap-x-16 md:pl-0 lg:gap-x-24"
                  >
                    {milestone.image ? (
                      <RevealItem
                        variants={isEven ? fromLeft : fromRight}
                        className={cn(!isEven && "md:order-2")}
                      >
                        <div
                          className={cn(
                            "group relative overflow-hidden rounded-xl shadow-sm",
                            isLandscape ? "aspect-[3/2]" : "aspect-[4/5]",
                          )}
                        >
                          <Image
                            src={milestone.image}
                            alt={milestone.imageAlt ?? meta?.alt ?? ""}
                            fill
                            sizes="(min-width: 768px) 40vw, 90vw"
                            placeholder={meta?.blurDataURL ? "blur" : "empty"}
                            blurDataURL={meta?.blurDataURL}
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                        </div>
                      </RevealItem>
                    ) : null}

                    <RevealItem
                      variants={isEven ? fromRight : fromLeft}
                      className={cn(
                        !isEven && "md:order-1",
                        !milestone.image && "md:col-span-2",
                      )}
                    >
                      <article className="rounded-2xl border border-border bg-card p-8 shadow-sm md:p-10">
                        <p className="text-caption font-semibold uppercase tracking-[0.25em] text-accent-foreground/80">
                          {milestone.date}
                        </p>
                        <h3 className="mt-3 font-serif text-title font-semibold text-foreground">
                          {milestone.title}
                        </h3>
                        <p className="mt-4 text-body text-muted-foreground">
                          {milestone.body}
                        </p>
                      </article>
                    </RevealItem>
                  </RevealGroup>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
