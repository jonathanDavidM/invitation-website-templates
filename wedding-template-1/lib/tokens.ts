// ─────────────────────────────────────────────
//  lib/tokens.ts
//  Design tokens — colors, typography, spacing
// ─────────────────────────────────────────────

export const colors = {
  // Emerald palette
  emerald: "#1a5c3a",
  emeraldDeep: "#0d3d26",
  emeraldMid: "#236649",
  emeraldPale: "#4a9e6e",
  emeraldGhost: "rgba(26,92,58,0.08)",

  // Gold palette
  gold: "#c9a84c",
  goldLight: "#e8d09a",
  goldDim: "rgba(201,168,76,0.3)",
  goldFaint: "rgba(201,168,76,0.12)",

  // Neutrals
  cream: "#f8f4ec",
  creamDark: "#ede5d0",
  ink: "#1c1c1c",
  muted: "#6b6b5e",
  white: "#ffffff",
  black: "#050f09",
} as const;

export const fonts = {
  display: "'Cormorant Garamond', Georgia, serif",
  heading: "'Cinzel', 'Palatino Linotype', serif",
  upright: "'Cormorant Upright', Georgia, serif",
} as const;

export const fontUrls =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Cormorant+Upright:ital,wght@0,300;0,400;1,300&display=swap";

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;

export const zIndex = {
  nav: 100,
  overlay: 50,
  above: 10,
  base: 1,
} as const;

export type ColorKey = keyof typeof colors;
export type FontKey = keyof typeof fonts;
