/**
 * Dress code — edit the copy and the two color palettes freely.
 * `hex` values are content data (the couple's chosen colors), rendered as
 * swatches via inline style; they are intentionally not design tokens.
 */
export interface DressSwatch {
  name: string;
  hex: string;
}

export const dressCode = {
  script: "what to wear",
  eyebrow: "Dress Code",
  title: "Formal Attire",
  intro:
    "Help us paint a picture worth remembering. We kindly invite you to dress formally in the elegant, muted tones below.",

  ladies: "A long gown or formal dress.",
  gentlemen: "A suit, or a long-sleeves, polo and slacks.",

  /** Closing line beneath the Ladies & Gentlemen attire guide. */
  encourage:
    "We kindly encourage our guests to wear these colors for our special day.",

  /** Encouraged colors — guests are invited to wear these. */
  wear: [
    { name: "Olive Green", hex: "#67775A" },
    { name: "Tan Gold", hex: "#C9B27E" },
    { name: "Cocoa", hex: "#6D5C4C" },
    { name: "Champagne", hex: "#F5E7CE" },
  ] as DressSwatch[],

  /** Please avoid these colors. */
  avoid: [
    { name: "White", hex: "#FFFFFF" },
    { name: "Ivory", hex: "#F3ECDD" },
    { name: "Emerald", hex: "#0F5132" },
  ] as DressSwatch[],

  avoidNote:
    "White and ivory are reserved for the bride, and emerald green for our entourage. Kindly skip denim, shorts, and casual footwear.",
} as const;
