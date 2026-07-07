import Image from "next/image";
import { MapPin, Clock, Navigation } from "lucide-react";
import { Section, Container } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { venues } from "@/content/wedding";
import manifest from "@/content/image-manifest.json";
import { cn } from "@/lib/utils";

/** Blur placeholder for a venue photo, if the pipeline generated one. */
const manifestMap = manifest as unknown as Record<
  string,
  { blurDataURL?: string }
>;
function blurFor(src: string): string | undefined {
  return manifestMap[src]?.blurDataURL;
}

/** Builds a universal Google Maps directions link for a venue. */
function directionsUrl(name: string, address: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${name} ${address}`,
  )}`;
}

/**
 * Ceremony & reception venues — two premium cards on the tinted surface,
 * photo on top, details and map actions below.
 */
export function Venues() {
  return (
    <Section id="venues" surface="tinted">
      <Container>
        <SectionHeading
          script="where we say I do"
          eyebrow="The Venues"
          title="Ceremony & Reception"
        />

        <RevealGroup stagger={0.15} className="grid gap-8 md:grid-cols-2">
          {venues.map((venue) => (
            <RevealItem key={venue.name}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md">
                <div className="relative aspect-[3/2] overflow-hidden rounded-t-2xl">
                  <Image
                    src={venue.image}
                    alt={venue.imageAlt}
                    fill
                    sizes="(min-width: 768px) 45vw, 90vw"
                    placeholder={blurFor(venue.image) ? "blur" : "empty"}
                    blurDataURL={blurFor(venue.image)}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-8">
                  <p className="text-caption font-semibold uppercase tracking-[0.25em] text-accent-foreground/80">
                    {venue.label}
                  </p>
                  <h3 className="mt-3 font-serif text-title font-semibold text-foreground">
                    {venue.name}
                  </h3>

                  <ul className="mt-6 space-y-3">
                    <li className="flex items-start gap-3 text-body text-muted-foreground">
                      <MapPin
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-accent"
                      />
                      <span>{venue.address}</span>
                    </li>
                    <li className="flex items-start gap-3 text-body text-muted-foreground">
                      <Clock
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-accent"
                      />
                      <span>{venue.time}</span>
                    </li>
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-3 pt-2">
                    <a
                      href={venue.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ variant: "outline" }))}
                    >
                      <MapPin aria-hidden="true" />
                      Open in Google Maps
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                    <a
                      href={directionsUrl(venue.name, venue.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ variant: "gold" }))}
                    >
                      <Navigation aria-hidden="true" />
                      Get Directions
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
