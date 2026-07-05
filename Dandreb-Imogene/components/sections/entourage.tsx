import { Section, Container } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { entourage } from "@/content/entourage";
import type { EntourageGroup } from "@/types";
import { cn } from "@/lib/utils";

const CARD = "rounded-2xl border border-border bg-card p-8 text-center";

/** Shared card body: gold-eyebrow title, tiny hairline, then the names. */
function GroupCard({
  group,
  columns = false,
}: {
  group: EntourageGroup;
  /** Lay the names out in two columns (for the wide roster card). */
  columns?: boolean;
}) {
  return (
    <>
      <h3 className="text-caption font-semibold uppercase tracking-[0.25em] text-accent-foreground/80">
        {group.title}
      </h3>
      <div aria-hidden="true" className="hairline-gold mx-auto mt-3 w-10" />
      <ul
        className={cn(
          "mt-6",
          columns
            ? "mx-auto grid max-w-2xl gap-x-8 gap-y-2 sm:grid-cols-2"
            : "space-y-2",
        )}
      >
        {group.members.map((member) => (
          <li key={member.name}>
            <p className="font-serif text-body font-semibold text-foreground">
              {member.name}
            </p>
            {member.role ? (
              <p className="mt-1 text-caption text-muted-foreground">
                {member.role}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * Wedding entourage — an editorial hierarchy driven by the data, not titles:
 * 1. size:"large" groups as prominent paired cards (parents, best man, maid of honor)
 * 2. the single biggest remaining group as a wide two-column roster card
 * 3. everything else in a ragged-height (masonry-ish) card flow
 */
export function Entourage() {
  const large = entourage.filter((group) => group.size === "large");
  const rest = entourage.filter((group) => group.size !== "large");

  // The largest remaining group (first wins ties) earns the wide roster card,
  // but only when it has enough names to justify two columns.
  let wide: EntourageGroup | null = null;
  if (rest.length > 0) {
    const biggest = rest.reduce((a, b) =>
      b.members.length > a.members.length ? b : a,
    );
    if (biggest.members.length >= 5) wide = biggest;
  }
  const flow = wide ? rest.filter((group) => group !== wide) : rest;

  return (
    <Section id="entourage" surface="default">
      <Container>
        <SectionHeading
          script="our beloved"
          eyebrow="The Entourage"
          title="The People Standing With Us"
        />

        <div className="space-y-6 md:space-y-8">
          {large.length > 0 ? (
            <RevealGroup
              as="ul"
              stagger={0.06}
              className="grid gap-6 md:grid-cols-2 md:gap-8"
            >
              {large.map((group) => (
                <RevealItem key={group.title} as="li" className={CARD}>
                  <GroupCard group={group} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : null}

          {wide ? (
            <Reveal className={CARD}>
              <GroupCard group={wide} columns />
            </Reveal>
          ) : null}

          {flow.length > 0 ? (
            <RevealGroup
              as="ul"
              stagger={0.06}
              className="grid items-start gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
            >
              {flow.map((group) => (
                <RevealItem key={group.title} as="li" className={CARD}>
                  <GroupCard group={group} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
