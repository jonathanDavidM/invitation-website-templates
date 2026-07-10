import { Section, Container } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqs } from "@/content/faq";

/** FAQ accordion — quiet, single-column, one reveal for the whole list. */
export function Faq() {
  return (
    <Section id="faq" surface="default">
      <Container>
        <SectionHeading
          script="good to know"
          eyebrow="Questions"
          title="Frequently Asked Questions"
        />

        <Reveal className="mx-auto max-w-2xl">
          <Accordion type="single" collapsible className="border-t border-border">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {Array.isArray(faq.answer) ? (
                    <div className="space-y-3">
                      {faq.answer.map((paragraph, j) => (
                        <p key={j}>{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    faq.answer
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="mt-12 text-center text-caption text-muted-foreground">
            Have another question? Reach us through the contact details on your
            invitation.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
