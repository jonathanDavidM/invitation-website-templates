import { QrCode } from "lucide-react";
import { Section, Container } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

/** Gift note — quiet, dignified, one reveal for the whole block. */
export function Gifts() {
  return (
    <Section id="gifts" surface="tinted" spacing="compact">
      <Container>
        <SectionHeading
          script="with gratitude"
          eyebrow="Gifts"
          title="Your Presence Is Our Present"
        />

        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="space-y-4">
            <p className="text-body text-muted-foreground">
              Having you with us as we say our vows is the greatest gift we
              could hope for, and truly all that we ask.
            </p>
            <p className="text-body text-muted-foreground">
              Should you wish to honor us with a gift, a monetary blessing
              toward our future home together would be received with deep
              gratitude.
            </p>
          </div>

          {/*
            QR placeholder — replace this card with a real code when ready:
            swap the icon block below for
            <Image src="/images/gift-qr.png" alt="Gift QR code" width={160} height={160} />
          */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex size-40 items-center justify-center rounded-xl border border-dashed border-accent/50 bg-card">
              <QrCode className="size-10 text-accent" aria-hidden="true" />
            </div>
            <p className="text-caption text-muted-foreground">
              QR code available at the reception
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
