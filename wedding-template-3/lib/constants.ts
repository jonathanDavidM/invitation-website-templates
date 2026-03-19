// ─── lib/constants.ts ───────────────────────────────────────────────────────
// Edit this file to update all content across the site.

export const WEDDING = {
  bride: "Lei",
  groom: "Lj",
  brideFullName: "Lei Santos",
  groomFullName: "Lj Reyes",
  hashtag: "#LjAndLei",
  tagline: "Two hearts. One story.",

  // Dates
  date: "2025-11-22T17:00:00",
  displayDate: "November 22, 2025",
  displayDateLong: "Saturday, the Twenty-Second of November, Two Thousand and Twenty-Five",
  dayOfWeek: "Saturday",
  year: "2025",

  // Ceremony
  ceremony: {
    time: "5:00 PM",
    venue: "San Antonio de Padua Parish",
    address: "Poblacion, Makati City",
    mapsUrl: "https://maps.google.com",
  },

  // Reception
  reception: {
    time: "7:00 PM",
    venue: "The Penthouse at The Palace",
    address: "The Fort Strip, BGC, Taguig City",
    mapsUrl: "https://maps.google.com",
  },

  // RSVP
  rsvpDeadline: "October 15, 2025",
  rsvpEmail: "rsvp@ljandlei.com",

  // Programme
  programme: [
    { time: "5:00 PM", event: "Guest Arrival" },
    { time: "5:30 PM", event: "Ceremony Begins" },
    { time: "6:30 PM", event: "Cocktail Hour" },
    { time: "7:00 PM", event: "Reception Opens" },
    { time: "7:30 PM", event: "Dinner Service" },
    { time: "8:30 PM", event: "First Dance" },
    { time: "9:00 PM", event: "Open Dancing" },
    { time: "11:00 PM", event: "Last Song & Send-Off" },
  ],

  // Love story
  story: [
    {
      year: "2018",
      title: "The Beginning",
      body: "They met at a mutual friend's birthday party in Poblacion on a warm September night. Lj noticed Lei laughing from across the room and knew he had to introduce himself.",
    },
    {
      year: "2019",
      title: "First Adventure",
      body: "Their first trip together was to Siargao — surfing by day, watching sunsets by night. By the end of the week, they both knew this was something special.",
    },
    {
      year: "2022",
      title: "Building a Life",
      body: "After years of adventures, late-night conversations, and growing together, they moved into their first home in BGC — planting roots and building their future.",
    },
    {
      year: "2024",
      title: "The Proposal",
      body: "On a rooftop in El Nido, beneath a sky full of stars, Lj got down on one knee. Lei said yes before he could even finish the question.",
    },
  ],
} as const;

export type WeddingConfig = typeof WEDDING;
