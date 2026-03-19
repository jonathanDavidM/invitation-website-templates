// ─────────────────────────────────────────────
//  lib/types.ts
//  Shared TypeScript types
// ─────────────────────────────────────────────

export interface RSVPFormData {
  firstName: string;
  lastName: string;
  email: string;
  attending: "yes" | "no";
  guests: "1" | "2" | "3" | "4";
  meal: "meat" | "fish" | "vegetarian";
  notes: string;
}

export interface CountdownTime {
  days: string;
  hours: string;
  mins: string;
  secs: string;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";

export type NavSection = "hero" | "story" | "countdown" | "details" | "gallery" | "rsvp";
