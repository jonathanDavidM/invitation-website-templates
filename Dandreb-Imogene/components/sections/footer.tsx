import { Container } from "@/components/section";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { couple } from "@/content/couple";

/** Small botanical sprig with a heart at its center — purely decorative. */
function BotanicalOrnament() {
  return (
    <svg
      viewBox="0 0 96 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-24 text-accent/60"
    >
      {/* left vine + leaves */}
      <path d="M6 12h26" />
      <path d="M14 12c1.5-3.2 4-4.8 7.2-4.8-1.5 3.2-4 4.8-7.2 4.8Z" />
      <path d="M22 12c1.5 3.2 4 4.8 7.2 4.8-1.5-3.2-4-4.8-7.2-4.8Z" />
      {/* heart */}
      <path d="M48 17.6c-3.5-2.7-5.8-4.9-5.8-7.4 0-1.9 1.5-3.4 3.3-3.4 1 0 1.9.5 2.5 1.3.6-.8 1.5-1.3 2.5-1.3 1.8 0 3.3 1.5 3.3 3.4 0 2.5-2.3 4.7-5.8 7.4Z" />
      {/* right vine + leaves (mirrored) */}
      <path d="M64 12h26" />
      <path d="M82 12c-1.5-3.2-4-4.8-7.2-4.8 1.5 3.2 4 4.8 7.2 4.8Z" />
      <path d="M74 12c-1.5 3.2-4 4.8-7.2 4.8 1.5-3.2 4-4.8 7.2-4.8Z" />
    </svg>
  );
}

/**
 * Footer — the closing note on the dark evergreen surface.
 * Centered sign-off with the couple's names in script gold,
 * then a hairline and a tiny meta row.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest py-24 text-forest-foreground md:py-32">
      <Container>
        <RevealGroup
          stagger={0.1}
          className="flex flex-col items-center text-center"
        >
          <RevealItem>
            <BotanicalOrnament />
          </RevealItem>

          <RevealItem className="mt-8">
            <p className="font-serif text-title font-semibold text-forest-foreground">
              {couple.footer.line}
            </p>
          </RevealItem>

          <RevealItem className="mt-8">
            <p className="text-body text-forest-muted">
              {couple.footer.signOff}
            </p>
          </RevealItem>

          <RevealItem className="mt-4">
            <p className="font-script text-display text-accent">
              {couple.shortNames}
            </p>
          </RevealItem>

          <RevealItem className="mt-8">
            <p className="text-caption uppercase tracking-[0.25em] text-forest-muted">
              {couple.dateLabel}
            </p>
            <p className="mt-2 text-caption text-forest-muted">
              {couple.location}
            </p>
          </RevealItem>

          <RevealItem className="mt-6">
            <p className="text-caption uppercase tracking-[0.25em] text-accent/70">
              {couple.hashtag}
            </p>
          </RevealItem>
        </RevealGroup>

        <div className="mt-16 border-t border-forest-foreground/15 pt-8 md:mt-24">
          <div className="flex flex-col items-center gap-2 text-caption text-forest-muted sm:flex-row sm:justify-between">
            <p>
              {couple.dateLabel} &middot; {couple.location}
            </p>
            <p>Made with love</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
