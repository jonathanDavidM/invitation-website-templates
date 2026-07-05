import type { EntourageGroup } from "@/types";

/**
 * The wedding entourage. Replace the placeholder names with real ones —
 * the layout adapts to any number of members per group.
 */
export const entourage: EntourageGroup[] = [
  {
    title: "Parents of the Groom",
    size: "large",
    members: [
      { name: "Mr. Roberto Potante", role: "Father" },
      { name: "Mrs. Maria Potante", role: "Mother" },
    ],
  },
  {
    title: "Parents of the Bride",
    size: "large",
    members: [
      { name: "Mr. Ernesto Agustin", role: "Father" },
      { name: "Mrs. Teresita Agustin", role: "Mother" },
    ],
  },
  {
    title: "Principal Sponsors",
    members: [
      { name: "Mr. Antonio dela Cruz" },
      { name: "Mrs. Carmen dela Cruz" },
      { name: "Mr. Federico Santos" },
      { name: "Mrs. Lourdes Santos" },
      { name: "Mr. Vicente Ramos" },
      { name: "Mrs. Estrella Ramos" },
    ],
  },
  {
    title: "Best Man",
    size: "large",
    members: [{ name: "John Michael Potante" }],
  },
  {
    title: "Maid of Honor",
    size: "large",
    members: [{ name: "Angela Marie Agustin" }],
  },
  {
    title: "Groomsmen",
    members: [
      { name: "Carlo Mendoza" },
      { name: "Paolo Reyes" },
      { name: "Miguel Bautista" },
      { name: "Rafael Cruz" },
    ],
  },
  {
    title: "Bridesmaids",
    members: [
      { name: "Sofia Villanueva" },
      { name: "Camille Torres" },
      { name: "Bianca Navarro" },
      { name: "Patricia Lim" },
    ],
  },
  {
    title: "Secondary Sponsors",
    members: [
      { name: "Joshua Fernandez", role: "Candle" },
      { name: "Hannah Garcia", role: "Candle" },
      { name: "Nathan Aquino", role: "Veil" },
      { name: "Erika Domingo", role: "Veil" },
      { name: "Marcus Tan", role: "Cord" },
      { name: "Alyssa Robles", role: "Cord" },
    ],
  },
  {
    title: "Ring Bearer",
    members: [{ name: "Liam Potante" }],
  },
  {
    title: "Bible Bearer",
    members: [{ name: "Noah Agustin" }],
  },
  {
    title: "Coin Bearer",
    members: [{ name: "Ethan Santos" }],
  },
  {
    title: "Flower Girls",
    members: [
      { name: "Isabella Cruz" },
      { name: "Olivia Ramos" },
      { name: "Amelia Reyes" },
    ],
  },
];
