import Image from "next/image";
import { Ban } from "lucide-react";
import { Section, Container } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { dressCode, type DressSwatch } from "@/content/dresscode";

// Look up palette swatches by name so each column can order its color chips to
// match the figures in its illustration (left-to-right).
const byName = new Map(dressCode.wear.map((s) => [s.name, s]));
const order = (names: string[]) =>
  names.map((n) => byName.get(n)).filter((s): s is DressSwatch => Boolean(s));

const columns = [
  {
    label: "Ladies",
    text: dressCode.ladies,
    src: "/images/attire/ladies.png",
    swatches: order(["Olive Green", "Champagne", "Tan Gold", "Cocoa"]),
  },
  {
    label: "Gentlemen",
    text: dressCode.gentlemen,
    src: "/images/attire/gentlemen.png",
    swatches: order(["Olive Green", "Champagne", "Cocoa", "Tan Gold"]),
  },
];

/** Circular swatch for the "avoid" palette — adds a diagonal "no" strike. */
function AvoidSwatch({ swatch }: { swatch: DressSwatch }) {
  return (
    <RevealItem
      as="li"
      className="flex w-20 flex-col items-center gap-3 text-center"
    >
      <span
        className="relative size-16 rounded-full shadow-sm ring-1 ring-border/70"
        // Content-driven color (the couple's palette), not a design token.
        style={{ backgroundColor: swatch.hex }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rotate-45 bg-destructive"
        />
      </span>
      <span className="text-caption text-muted-foreground">{swatch.name}</span>
    </RevealItem>
  );
}

/** Small heading used above the "avoid" palette. */
function PaletteLabel({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col items-center gap-3">
      <p className="flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.25em] text-accent-foreground/80">
        {icon}
        {children}
      </p>
      <div aria-hidden="true" className="hairline-gold w-10" />
    </div>
  );
}

export function DressCode() {
  return (
    <Section id="dress-code" surface="default">
      <Container>
        <SectionHeading
          script={dressCode.script}
          eyebrow={dressCode.eyebrow}
          title={dressCode.title}
          description={dressCode.intro}
        />

        <div className="mx-auto max-w-5xl">
          {/* Ladies & Gentlemen attire guide */}
          <RevealGroup
            stagger={0.12}
            className="grid gap-10 md:grid-cols-2 md:gap-12"
          >
            {columns.map((col) => (
              <RevealItem key={col.label} className="flex flex-col items-center">
                <p className="text-caption font-semibold uppercase tracking-[0.25em] text-accent-foreground/80">
                  {col.label}
                </p>
                <div aria-hidden="true" className="hairline-gold mt-3 w-10" />

                <div className="relative mt-6 aspect-[28/25] w-full max-w-md">
                  <Image
                    src={col.src}
                    alt={`${col.label} attire in our wedding colors: ${col.swatches
                      .map((s) => s.name)
                      .join(", ")}.`}
                    fill
                    sizes="(min-width: 768px) 40vw, 90vw"
                    className="object-contain object-bottom"
                  />
                </div>

                <ul className="mt-6 grid w-full max-w-md grid-cols-4 gap-2">
                  {col.swatches.map((swatch) => (
                    <li
                      key={swatch.name}
                      className="flex flex-col items-center gap-2 text-center"
                    >
                      <span
                        className="size-8 rounded-full shadow-sm ring-1 ring-border/70"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span className="text-caption leading-tight text-muted-foreground">
                        {swatch.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 max-w-sm text-center text-caption text-muted-foreground">
                  {col.text}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Encouraging closing line */}
          <Reveal className="mt-12">
            <p className="mx-auto max-w-xl text-center text-caption uppercase tracking-[0.2em] text-muted-foreground">
              {dressCode.encourage}
            </p>
          </Reveal>

          {/* Avoid palette */}
          <Reveal className="mt-16">
            <PaletteLabel
              icon={<Ban aria-hidden="true" className="size-4 text-destructive" />}
            >
              Kindly avoid
            </PaletteLabel>
            <RevealGroup
              as="ul"
              stagger={0.06}
              className="flex flex-wrap items-start justify-center gap-6 md:gap-8"
            >
              {dressCode.avoid.map((swatch) => (
                <AvoidSwatch key={swatch.name} swatch={swatch} />
              ))}
            </RevealGroup>
            <p className="mx-auto mt-8 max-w-xl text-center text-caption text-muted-foreground">
              {dressCode.avoidNote}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
