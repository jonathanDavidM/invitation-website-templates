import type { LucideIcon } from "lucide-react";

/** One photo in the gallery. `src` is relative to /public. */
export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  orientation: "portrait" | "landscape";
  /**
   * Editorial emphasis:
   * - "full"    → full-bleed, breaks the grid
   * - "feature" → large cell in the editorial layout
   * - "standard"→ regular cell
   */
  emphasis: "full" | "feature" | "standard";
  caption?: string;
  blurDataURL?: string;
}

export interface StoryMilestone {
  date: string;
  title: string;
  body: string;
  /** Optional photo, relative to /public */
  image?: string;
  imageAlt?: string;
}

export interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Venue {
  label: string;
  name: string;
  address: string;
  time: string;
  mapsUrl: string;
  image: string;
  imageAlt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EntourageMember {
  name: string;
  role?: string;
}

export interface EntourageGroup {
  title: string;
  members: EntourageMember[];
  /** Visual weight in the layout */
  size?: "large" | "default";
}

export type RsvpAttendance = "yes" | "no";

export interface RsvpResponse {
  ok: boolean;
  message: string;
}
