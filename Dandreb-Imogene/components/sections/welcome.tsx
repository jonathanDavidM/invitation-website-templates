import { Section, Container } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { couple } from "@/content/couple";

/**
 * Welcome — the quiet, letter-like opening beneath the hero.
 * Uses the shared SectionHeading (script → eyebrow → title → hairline),
 * then two body paragraphs and the hashtag.
 */
export function Welcome() {
  return (
    <Section id="welcome" surface="default">
      <Container>
        <SectionHeading
          script={couple.welcome.script}
          eyebrow={couple.welcome.eyebrow}
          title={couple.welcome.title}
        />

        <RevealGroup
          stagger={0.12}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <RevealItem>
            <div className="mx-auto max-w-prose space-y-6">
              {couple.welcome.body.map((paragraph) => (
                <p key={paragraph} className="text-body text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </RevealItem>

          <RevealItem className="mt-12">
            <p className="text-caption uppercase tracking-[0.25em] text-accent-foreground/70">
              {couple.hashtag}
            </p>
          </RevealItem>
        </RevealGroup>
      </Container>
    </Section>
  );
}
