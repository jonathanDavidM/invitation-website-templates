import { Section, Container } from "@/components/section";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { couple } from "@/content/couple";

/**
 * Welcome — the quiet, letter-like opening beneath the hero.
 * Narrow centered column: script flourish → eyebrow → serif title →
 * two body paragraphs → hashtag + short gold hairline.
 */
export function Welcome() {
  return (
    <Section id="welcome" surface="default">
      <Container>
        <RevealGroup
          stagger={0.12}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <RevealItem>
            <p
              aria-hidden="true"
              className="font-script text-title text-accent-foreground/80"
            >
              {couple.welcome.script}
            </p>
          </RevealItem>

          <RevealItem className="mt-6">
            <p className="text-caption font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              {couple.welcome.eyebrow}
            </p>
          </RevealItem>

          <RevealItem className="mt-4">
            <h2 className="font-serif text-title font-semibold text-foreground">
              {couple.welcome.title}
            </h2>
          </RevealItem>

          <RevealItem className="mt-8">
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

          <RevealItem className="mt-6 w-full">
            <div aria-hidden="true" className="hairline-gold mx-auto w-16" />
          </RevealItem>
        </RevealGroup>
      </Container>
    </Section>
  );
}
