import { z } from "zod";

/**
 * RSVP validation — shared by the client form and the API route.
 * Fields mirror the Google Form: Name of Guest, Contact Number,
 * Will you attend?, Message.
 */
export const rsvpSchema = z.object({
  guestName: z
    .string()
    .trim()
    .min(1, "Please enter your name")
    .max(120, "That name looks a little long"),
  contactNumber: z
    .string()
    .trim()
    .min(7, "Please enter a valid contact number")
    .max(20, "Please enter a valid contact number")
    .regex(/^[+\d][\d\s()-]+$/, "Please enter a valid contact number"),
  attendance: z.enum(["yes", "no"], {
    error: "Please let us know if you can attend",
  }),
  message: z
    .string()
    .trim()
    .max(1000, "Please keep it under 1000 characters")
    .optional(),
  /**
   * Honeypot — humans never fill this. Accept any value so a filled field
   * passes validation; the API route detects it and silently drops the
   * submission (see route.ts).
   */
  website: z.string().optional(),
});

export type RsvpInput = z.input<typeof rsvpSchema>;
export type RsvpData = z.output<typeof rsvpSchema>;
