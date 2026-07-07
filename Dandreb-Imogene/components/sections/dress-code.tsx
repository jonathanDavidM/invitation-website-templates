import { Ban } from "lucide-react";
import { Section, Container } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { dressCode, type DressSwatch } from "@/content/dresscode";

/** One color swatch with its name. `avoid` adds a diagonal "no" strike. */
function Swatch({ swatch, avoid }: { swatch: DressSwatch; avoid?: boolean }) {
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
        {avoid ? (
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rotate-45 bg-destructive"
          />
        ) : null}
      </span>
      <span className="text-caption text-muted-foreground">{swatch.name}</span>
    </RevealItem>
  );
}

/** Small heading used above each palette. */
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

        <div className="mx-auto max-w-3xl">
          {/* Attire guidance */}
          <RevealGroup
            stagger={0.1}
            className="grid gap-6 sm:grid-cols-2"
          >
            {[
              { label: "For the Ladies", text: dressCode.ladies },
              { label: "For the Gentlemen", text: dressCode.gentlemen },
            ].map((item) => (
              <RevealItem
                key={item.label}
                className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm"
              >
                <p className="text-caption font-semibold uppercase tracking-[0.25em] text-accent-foreground/80">
                  {item.label}
                </p>
                <p className="mt-4 text-body text-muted-foreground">
                  {item.text}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Encouraged palette */}
          <Reveal className="mt-16">
            <PaletteLabel>Wear these tones</PaletteLabel>
            <RevealGroup
              as="ul"
              stagger={0.06}
              className="flex flex-wrap items-start justify-center gap-6 md:gap-8"
            >
              {dressCode.wear.map((swatch) => (
                <Swatch key={swatch.name} swatch={swatch} />
              ))}
            </RevealGroup>
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
                <Swatch key={swatch.name} swatch={swatch} avoid />
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
