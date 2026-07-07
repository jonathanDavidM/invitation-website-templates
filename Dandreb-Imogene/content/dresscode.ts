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

  ladies: "Long dress or elegant cocktail attire in the tones below.",
  gentlemen: "Suit or barong in neutral or earthy shades.",

  /** Encouraged colors — guests are invited to wear these. */
  wear: [
    { name: "Sage", hex: "#A3B18A" },
    { name: "Champagne", hex: "#E8C76A" },
    { name: "Terracotta", hex: "#C57B57" },
    { name: "Dusty Rose", hex: "#C9A0A0" },
    { name: "Taupe", hex: "#B8A99A" },
    { name: "Dusty Blue", hex: "#8FA1B3" },
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
