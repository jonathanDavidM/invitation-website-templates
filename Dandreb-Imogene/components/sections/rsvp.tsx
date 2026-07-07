"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Container, Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioChip, RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { fade, scaleIn } from "@/lib/motion";
import { rsvpSchema, type RsvpData, type RsvpInput } from "@/lib/rsvp-schema";
import { basePath } from "@/lib/base-path";
import { couple } from "@/content/couple";

const FALLBACK_ERROR =
  "Something went wrong sending your response. Please try again in a moment.";

/** Form-order list used to map server field errors and focus the first one. */
const FIELD_ORDER = [
  "guestName",
  "contactNumber",
  "email",
  "attendance",
  "message",
] as const;

interface RsvpResponseBody {
  ok?: boolean;
  message?: string;
  fieldErrors?: Partial<Record<string, string>>;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-caption text-destructive">
      {message}
    </p>
  );
}

export function Rsvp() {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null,
  );
  const successRef = React.useRef<HTMLDivElement>(null);

  // The form (and its focused submit button) unmounts on success — move focus
  // to the success panel so keyboard/AT users aren't dropped to <body>.
  React.useEffect(() => {
    if (successMessage) successRef.current?.focus();
  }, [successMessage]);

  const {
    control,
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RsvpInput, unknown, RsvpData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      guestName: "",
      contactNumber: "",
      email: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setServerError(null);
    try {
      const response = await fetch(`${basePath}/api/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await response.json().catch(() => null)) as
        | RsvpResponseBody
        | null;

      if (response.ok) {
        setSuccessMessage(
          body?.message ?? "Thank you! Your response has been recorded.",
        );
        return;
      }

      if (response.status === 422 && body?.fieldErrors) {
        let focused = false;
        for (const name of FIELD_ORDER) {
          const message = body.fieldErrors[name];
          if (!message) continue;
          setError(name, { type: "server", message }, { shouldFocus: !focused });
          focused = true;
        }
        if (focused) return;
      }

      setServerError(body?.message ?? FALLBACK_ERROR);
    } catch {
      setServerError(FALLBACK_ERROR);
    }
  });

  const handleReset = () => {
    reset();
    setServerError(null);
    setSuccessMessage(null);
  };

  return (
    <Section id="rsvp" surface="card">
      <Container>
        <SectionHeading
          script="join us"
          eyebrow="RSVP"
          title="Kindly Respond"
          description={couple.rsvp.deadlineLabel}
        />

        <Reveal className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-border bg-background p-8 shadow-sm md:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {successMessage ? (
                <motion.div
                  key="success"
                  role="status"
                  ref={successRef}
                  tabIndex={-1}
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="flex flex-col items-center gap-6 py-8 text-center focus:outline-none"
                >
                  <span className="flex size-16 items-center justify-center rounded-full border border-accent/60 bg-accent-soft">
                    <Check
                      className="size-8 text-accent-foreground"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="font-serif text-title font-semibold text-foreground">
                    Thank you!
                  </h3>
                  <p className="max-w-md text-body text-muted-foreground">
                    {successMessage}
                  </p>
                  <Button type="button" variant="ghost" onClick={handleReset}>
                    Send another response
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  variants={fade}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  onSubmit={onSubmit}
                  noValidate
                  className="grid gap-6"
                >
                  <div className="grid gap-2">
                    <Label htmlFor="rsvp-name">Name of guest</Label>
                    <Input
                      id="rsvp-name"
                      autoComplete="name"
                      aria-invalid={errors.guestName ? true : undefined}
                      aria-describedby={
                        errors.guestName ? "rsvp-name-error" : undefined
                      }
                      {...register("guestName")}
                    />
                    <FieldError
                      id="rsvp-name-error"
                      message={errors.guestName?.message}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="rsvp-contact">Contact number</Label>
                      <Input
                        id="rsvp-contact"
                        type="tel"
                        autoComplete="tel"
                        aria-invalid={errors.contactNumber ? true : undefined}
                        aria-describedby={
                          errors.contactNumber ? "rsvp-contact-error" : undefined
                        }
                        {...register("contactNumber")}
                      />
                      <FieldError
                        id="rsvp-contact-error"
                        message={errors.contactNumber?.message}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="rsvp-email">Email</Label>
                      <Input
                        id="rsvp-email"
                        type="email"
                        autoComplete="email"
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={
                          errors.email ? "rsvp-email-error" : undefined
                        }
                        {...register("email")}
                      />
                      <FieldError
                        id="rsvp-email-error"
                        message={errors.email?.message}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <p
                      id="rsvp-attendance-label"
                      className="text-caption font-semibold text-foreground"
                    >
                      Will you attend?
                    </p>
                    <Controller
                      control={control}
                      name="attendance"
                      render={({ field }) => (
                        <RadioGroup
                          value={field.value ?? ""}
                          onValueChange={field.onChange}
                          onBlur={field.onBlur}
                          aria-labelledby="rsvp-attendance-label"
                          aria-invalid={errors.attendance ? true : undefined}
                          aria-describedby={
                            errors.attendance ? "rsvp-attendance-error" : undefined
                          }
                          className="grid gap-4 md:grid-cols-2"
                        >
                          <RadioChip ref={field.ref} value="yes" className="h-14">
                            Joyfully accepts
                          </RadioChip>
                          <RadioChip value="no" className="h-14">
                            Regretfully declines
                          </RadioChip>
                        </RadioGroup>
                      )}
                    />
                    <FieldError
                      id="rsvp-attendance-error"
                      message={errors.attendance?.message}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="rsvp-message">
                      Message for the couple{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </Label>
                    <Textarea
                      id="rsvp-message"
                      rows={4}
                      aria-invalid={errors.message ? true : undefined}
                      aria-describedby={
                        errors.message ? "rsvp-message-error" : undefined
                      }
                      {...register("message")}
                    />
                    <FieldError
                      id="rsvp-message-error"
                      message={errors.message?.message}
                    />
                  </div>

                  {/* Honeypot — hidden from humans and assistive tech. */}
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="rsvp-website">Leave this field empty</label>
                    <input
                      id="rsvp-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register("website")}
                    />
                  </div>

                  {serverError ? (
                    <div
                      role="alert"
                      className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-caption text-destructive"
                    >
                      {serverError}
                    </div>
                  ) : null}

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" aria-hidden="true" />
                        Sending...
                      </>
                    ) : (
                      "Send RSVP"
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <p className="mt-8 text-center text-caption text-muted-foreground">
            {couple.rsvp.contactNote}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
