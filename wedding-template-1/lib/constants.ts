// ─────────────────────────────────────────────
//  lib/constants.ts
//  Single source of truth — edit here to update
//  the entire website at once.
// ─────────────────────────────────────────────

export const WEDDING = {
  bride: "Eleanor",
  groom: "Oliver",
  monogram: "E & O",

  // ISO string used by the countdown timer
  date: "2025-06-14T16:00:00",
  // Human-readable date shown in UI
  displayDate: "Saturday, June 14, 2025",
  displayYear: "2025",
  displayShort: "14 · June · 2025",
  dayOfWeek: "Saturday",

  ceremony: {
    time: "Four o'clock in the afternoon",
    doorsOpen: "Doors open at 3:30 PM",
    venue: "St. Margaret's Church",
    address: "Westminster, London SW1P 3JX",
    mapsUrl: "https://maps.google.com/?q=St+Margaret%27s+Church+Westminster+London",
  },

  reception: {
    time: "Six o'clock onwards",
    note: "Dinner & dancing until midnight",
    venue: "The Grand Pavilion",
    address: "12 Rosewood Lane, Chelsea SW3 4AB",
    mapsUrl: "https://maps.google.com/?q=Chelsea+London",
  },

  dressCode: "Black Tie",
  dressNote: "Emerald & gold accents warmly welcomed",

  rsvpDeadline: "May 1st, 2025",
  rsvpEmail: "rsvp@eleanor-oliver.com",
  rsvpPhone: "+44 (0) 20 1234 5678",

  hashtag: "#EleanorAndOliver",
  website: "eleanor-oliver.com",
} as const;

export const TIMELINE = [
  {
    year: "2019",
    title: "First Meeting",
    desc: "A bookshop on Charing Cross Road, both reaching for the same worn García Márquez — and a laughing apology that turned into coffee.",
    side: "left" as const,
  },
  {
    year: "2020",
    title: "First Date",
    desc: "Dinner at a tiny Italian restaurant in Soho that became 'our place' before the evening was even over.",
    side: "right" as const,
  },
  {
    year: "2022",
    title: "Portugal Together",
    desc: "A spontaneous trip to Lisbon confirmed what they both already knew — they were each other's home.",
    side: "left" as const,
  },
  {
    year: "2024",
    title: "The Proposal",
    desc: "Under a sky full of stars in the Cotswolds, Oliver asked. Eleanor said yes before he'd finished the sentence.",
    side: "right" as const,
  },
] as const;

export const MEAL_OPTIONS = [
  { value: "meat", label: "Meat", emoji: "🥩" },
  { value: "fish", label: "Fish", emoji: "🐟" },
  { value: "vegetarian", label: "Vegetarian", emoji: "🌿" },
] as const;

export const GUEST_OPTIONS = [
  { value: "1", label: "1 — Just me" },
  { value: "2", label: "2 — Myself & a plus one" },
  { value: "3", label: "3 — Three guests" },
  { value: "4", label: "4 — Four guests" },
] as const;
