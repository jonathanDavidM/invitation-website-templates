"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { gallery } from "@/content/gallery";
import type { GalleryImage } from "@/types";
import { Container, Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { EASE_LUXE, imageReveal } from "@/lib/motion";
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------------------------
 * Editorial layout engine
 *
 * The gallery is NOT a uniform grid. Images flow through three treatments,
 * driven by each entry's `emphasis`:
 *
 *   "full"     → cinematic full-bleed row that breaks out of the Container
 *   "feature"  → a ~2/3-width hero cell paired with one standard image,
 *                alternating sides for editorial rhythm
 *   "standard" → balanced 2–3 column flow between the statements
 *
 * The blocks are computed once from the content list, so the pattern simply
 * repeats if more photos are added.
 * -------------------------------------------------------------------------- */

const SIZES_FULL = "100vw";
const SIZES_THIRD = "(min-width: 1152px) 360px, (min-width: 768px) 33vw, 100vw";
const SIZES_HALF = "(min-width: 1152px) 540px, (min-width: 768px) 50vw, 100vw";
const SIZES_TWO_THIRDS =
  "(min-width: 1152px) 724px, (min-width: 768px) 66vw, 100vw";

/** Mobile + desktop aspect box for a photo, from its orientation. */
function aspectFor(img: GalleryImage): string {
  return img.orientation === "portrait" ? "aspect-[4/5]" : "aspect-[3/2]";
}

interface GridCell {
  /** Index into the flat `gallery` array (also the lightbox index). */
  index: number;
  className: string;
  sizes: string;
}

type Block =
  | { kind: "full"; key: string; index: number }
  | { kind: "grid"; key: string; cells: GridCell[] };

function buildBlocks(images: GalleryImage[]): Block[] {
  const blocks: Block[] = [];
  const consumed = new Set<number>();
  let run: number[] = [];
  let featureCount = 0;

  /** Lay out buffered standard images in balanced rows of 3 / 2 / 1. */
  const flushRun = () => {
    let i = 0;
    while (i < run.length) {
      const remaining = run.length - i;
      // A remainder of 4 splits into 2 + 2 so we never strand a lone image.
      const take = remaining === 4 ? 2 : remaining >= 3 ? 3 : remaining;
      const chunk = run.slice(i, i + take);
      blocks.push({
        kind: "grid",
        key: `grid-${chunk[0]}`,
        cells: chunk.map((index) => ({
          index,
          sizes: take === 3 ? SIZES_THIRD : SIZES_HALF,
          className: cn(
            aspectFor(images[index]),
            take === 3
              ? "md:col-span-4"
              : take === 2
                ? "md:col-span-6"
                : "md:col-span-6 md:col-start-4",
          ),
        })),
      });
      i += take;
    }
    run = [];
  };

  images.forEach((img, index) => {
    if (consumed.has(index)) return;

    if (img.emphasis === "full") {
      flushRun();
      blocks.push({ kind: "full", key: `full-${index}`, index });
      return;
    }

    if (img.emphasis === "standard") {
      run.push(index);
      return;
    }

    // Feature: pair it with the nearest standard neighbour (the one just
    // before it, or the one just after), preserving DOM/content order.
    let partnerIndex: number | undefined;
    let partnerFirst = false;
    if (run.length > 0) {
      partnerIndex = run.pop();
      partnerFirst = true;
    } else if (images[index + 1]?.emphasis === "standard") {
      partnerIndex = index + 1;
      consumed.add(partnerIndex);
    }
    flushRun();

    const featureOnLeft = featureCount % 2 === 0;
    featureCount += 1;

    if (partnerIndex === undefined) {
      // No partner available — center the feature on the 12-col grid.
      blocks.push({
        kind: "grid",
        key: `feature-${index}`,
        cells: [
          {
            index,
            sizes: SIZES_TWO_THIRDS,
            className: cn(aspectFor(img), "md:col-span-8 md:col-start-3"),
          },
        ],
      });
      return;
    }

    // Alternate the feature between left and right. When the desired side
    // disagrees with content order, flip visually with order utilities so
    // DOM (and focus) order still follows the story.
    const needsFlip = featureOnLeft === partnerFirst;
    const featureCell: GridCell = {
      index,
      sizes: SIZES_TWO_THIRDS,
      className: cn(
        aspectFor(img),
        "md:col-span-8",
        needsFlip && (featureOnLeft ? "md:order-1" : "md:order-2"),
      ),
    };
    const partnerCell: GridCell = {
      index: partnerIndex,
      sizes: SIZES_THIRD,
      // self-center keeps the partner's own aspect and floats it beside the
      // taller feature with breathing room — a deliberate editorial gesture.
      className: cn(
        aspectFor(images[partnerIndex]),
        "md:col-span-4 md:self-center",
        needsFlip && (featureOnLeft ? "md:order-2" : "md:order-1"),
      ),
    };
    blocks.push({
      kind: "grid",
      key: `feature-${index}`,
      cells: partnerFirst
        ? [partnerCell, featureCell]
        : [featureCell, partnerCell],
    });
  });

  flushRun();
  return blocks;
}

const BLOCKS = buildBlocks(gallery);

/* ----------------------------------------------------------------------------
 * Photo trigger — every image is a button that opens the lightbox.
 * -------------------------------------------------------------------------- */

interface PhotoButtonProps {
  img: GalleryImage;
  sizes: string;
  variant: "grid" | "full";
  onOpen: () => void;
}

function PhotoButton({ img, sizes, variant, onOpen }: PhotoButtonProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View photo: ${img.alt}`}
      className={cn(
        "group relative block h-full w-full cursor-zoom-in overflow-hidden",
        variant === "grid" && "rounded-xl",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      )}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        placeholder={img.blurDataURL ? "blur" : "empty"}
        blurDataURL={img.blurDataURL}
        className="scale-100 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      {img.caption ? (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-start bg-gradient-to-t from-forest/70 via-forest/25 to-transparent text-left",
            variant === "full"
              ? "p-6 pt-16 md:p-10 md:pt-24"
              : "p-4 pt-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100",
          )}
        >
          <span
            className={cn(
              "font-serif italic text-forest-foreground",
              variant === "full" ? "text-body" : "text-caption",
            )}
          >
            {img.caption}
          </span>
        </span>
      ) : null}
    </button>
  );
}

/* ----------------------------------------------------------------------------
 * Gallery section
 * -------------------------------------------------------------------------- */

export function Gallery() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const prefersReducedMotion = useReducedMotion();

  const total = gallery.length;
  const current = gallery[active];

  const openAt = (index: number) => {
    setActive(index);
    setOpen(true);
  };
  const showPrev = () => setActive((a) => (a - 1 + total) % total);
  const showNext = () => setActive((a) => (a + 1) % total);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  };

  return (
    <Section id="gallery" surface="default">
      <Container>
        <SectionHeading
          script="captured moments"
          eyebrow="The Gallery"
          title="Between Deserts and City Lights"
          description="A few frames from our engagement — golden dunes at dusk, and the city streets where the story keeps going."
        />
      </Container>

      <div className="flex flex-col gap-4 md:gap-6">
        {BLOCKS.map((block) => {
          if (block.kind === "full") {
            const img = gallery[block.index];
            return (
              <Reveal
                key={block.key}
                variants={imageReveal}
                className="relative aspect-[21/9] w-full overflow-hidden md:aspect-[24/9]"
              >
                <PhotoButton
                  img={img}
                  sizes={SIZES_FULL}
                  variant="full"
                  onOpen={() => openAt(block.index)}
                />
              </Reveal>
            );
          }

          return (
            <Container key={block.key}>
              <RevealGroup
                stagger={0.06}
                className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6"
              >
                {block.cells.map((cell) => (
                  <RevealItem
                    key={cell.index}
                    variants={imageReveal}
                    className={cn(
                      "relative overflow-hidden rounded-xl",
                      cell.className,
                    )}
                  >
                    <PhotoButton
                      img={gallery[cell.index]}
                      sizes={cell.sizes}
                      variant="grid"
                      onOpen={() => openAt(cell.index)}
                    />
                  </RevealItem>
                ))}
              </RevealGroup>
            </Container>
          );
        })}
      </div>

      {/* Lightbox */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onKeyDown={handleKeyDown}>
          <DialogTitle className="sr-only">Photo viewer</DialogTitle>
          <DialogDescription className="sr-only">
            Use the left and right arrow keys to move between photos.
          </DialogDescription>
          <DialogCloseButton />

          {/* Announce navigation for screen readers without re-mounting */}
          <p role="status" className="sr-only">
            Photo {active + 1} of {total}: {current.alt}
          </p>

          <div className="relative h-full w-full">
            <AnimatePresence initial={false}>
              <motion.figure
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.35,
                  ease: EASE_LUXE,
                }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 py-12 md:px-24"
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  sizes="100vw"
                  placeholder={current.blurDataURL ? "blur" : "empty"}
                  blurDataURL={current.blurDataURL}
                  className="h-auto max-h-[85svh] w-auto max-w-full rounded-lg object-contain shadow-lg"
                />
                <figcaption className="flex flex-col items-center gap-1 text-center">
                  {current.caption ? (
                    <p className="font-serif text-body italic text-forest-foreground">
                      {current.caption}
                    </p>
                  ) : null}
                  <p className="text-caption text-forest-muted">
                    {active + 1} / {total}
                  </p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <button
              type="button"
              onClick={showPrev}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-forest-foreground/10 text-forest-foreground transition-colors duration-200 hover:bg-forest-foreground/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-foreground md:left-8"
            >
              <ChevronLeft aria-hidden="true" className="size-6" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-forest-foreground/10 text-forest-foreground transition-colors duration-200 hover:bg-forest-foreground/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-foreground md:right-8"
            >
              <ChevronRight aria-hidden="true" className="size-6" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </Section>
  );
}
