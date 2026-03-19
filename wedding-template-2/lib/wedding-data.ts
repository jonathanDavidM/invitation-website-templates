// lib/wedding-data.ts
// Central data store for the wedding — update this file to change any details

export const WEDDING = {
  couple: {
    partner1: {
      firstName: "Dandreb",
      lastName: "Potante",
      fullName: "Dandreb Potante",
    },
    partner2: {
      firstName: "Rose Imogene",
      lastName: "Agustin",
      fullName: "Rose Imogene Agustin",
    },
    combinedNames: "Dandreb & Rose Imogene",
    hashtag: "#DanDrebAndRose2026",
  },

  date: {
    iso: "2026-09-10",
    display: "September 10, 2026",
    dayOfWeek: "Thursday",
    year: 2026,
    month: 9,
    day: 10,
  },

  ceremony: {
    name: "San Antonio De Padua Parish Church",
    shortName: "San Antonio De Padua",
    time: "4:00 PM",
    timeLabel: "Ceremony Starts",
    address: "San Antonio De Padua Parish",
    city: "Philippines",
    googleMapsUrl: "https://maps.google.com/?q=San+Antonio+De+Padua+Church",
  },

  reception: {
    name: "Infinity Hotel Tagaytay",
    shortName: "Infinity Hotel",
    time: "7:00 PM",
    timeLabel: "Reception Begins",
    address: "Infinity Hotel, Tagaytay City",
    city: "Tagaytay City, Cavite",
    googleMapsUrl: "https://maps.google.com/?q=Infinity+Hotel+Tagaytay",
    dresscode: "Formal Attire",
    dresscodeColors: "Emerald Green or Black",
  },

  rsvp: {
    deadline: "August 1, 2026",
    email: "dandrebandrose2026@gmail.com",
    phone: "+63 900 000 0000",
  },

  entourage: {
    parents: [
      { role: "Parents of the Groom", names: "Mr. & Mrs. Potante" },
      { role: "Parents of the Bride", names: "Mr. & Mrs. Agustin" },
    ],
    bestMan: "TBD",
    maidOfHonor: "TBD",
    groomsmen: ["TBD", "TBD", "TBD"],
    bridesmaids: ["TBD", "TBD", "TBD"],
    sponsors: {
      principal: ["TBD Couple", "TBD Couple", "TBD Couple"],
      cord: ["TBD", "TBD"],
      veil: ["TBD", "TBD"],
      candle: ["TBD", "TBD"],
    },
  },

  schedule: [
    { time: "3:30 PM", event: "Guest Arrival", icon: "users" },
    { time: "4:00 PM", event: "Wedding Ceremony", icon: "church" },
    { time: "5:30 PM", event: "Photo Session", icon: "camera" },
    { time: "7:00 PM", event: "Cocktail Hour", icon: "wine" },
    { time: "8:00 PM", event: "Reception Dinner", icon: "utensils" },
    { time: "9:30 PM", event: "First Dance", icon: "music" },
    { time: "10:00 PM", event: "Open Dance Floor", icon: "music" },
  ],
} as const;

export type WeddingData = typeof WEDDING;
