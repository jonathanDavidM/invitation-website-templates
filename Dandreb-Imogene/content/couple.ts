/**
 * Everything about the couple and the day, in one place.
 * Edit this file — no component changes needed.
 */
export const couple = {
  groom: {
    displayName: "Dandreb",
    fullName: "Dandreb Potante",
  },
  bride: {
    displayName: "Rose Imogene",
    fullName: "Rose Imogene Agustin",
  },
  /** Shown as the short pairing across the site */
  shortNames: "Dandreb & Rose",
  hashtag: "#DandrebFoundHisRose",

  /** Wedding date/time — Philippine time (Asia/Manila) */
  dateISO: "2026-09-10T15:00:00+08:00",
  dateLabel: "September 10, 2026",
  dayLabel: "Thursday",

  location: "Silang, Cavite · Tagaytay, Philippines",

  heroEyebrow: "Together with our families",
  heroCta: "View Invitation",

  welcome: {
    eyebrow: "You are warmly invited",
    title: "A Love That Found Its Season",
    script: "and so, the adventure begins",
    body: [
      "With grateful hearts, we invite you to stand with us as we exchange our vows and begin the greatest chapter of our lives.",
      "From city streets to desert sunsets, every step has led us here — to a quiet church in Silang, to the people we love most, to you. Your presence is the gift we treasure above all.",
    ],
  },

  footer: {
    line: "We can't wait to celebrate with you.",
    signOff: "With love,",
  },

  rsvp: {
    /** RSVP-by date shown above the form */
    deadlineLabel: "Kindly respond on or before August 10, 2026",
    contactNote:
      "Trouble with the form? Message us directly and we will note your response ourselves.",
  },
} as const;
