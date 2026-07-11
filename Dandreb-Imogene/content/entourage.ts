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
      { name: "Mr. Danilo Potante", role: "Father" },
      { name: "Mrs. Lucila Potante", role: "Mother" },
    ],
  },
  {
    title: "Parents of the Bride",
    size: "large",
    members: [
      { name: "Mr. Roselito Agustin", role: "Father" },
      { name: "Mrs. Rosalie Agustin", role: "Mother" },
    ],
  },
  {
    title: "Principal Sponsors",
    members: [
      { name: "Mr. Armando Magno" },
      { name: "Mrs. Juliet Dayrit" },
      { name: "Mr. Ryan Santor" },
      { name: "Mrs. Jackie Santor" },
      { name: "Mr. Ernesto Agustin" },
      { name: "Mrs. Cecilia De Guia" },
      { name: "Mr. Cesar Sicat" },
      { name: "Mrs. Marlyn Sicat" },
      { name: "Mr. Joel Alipio" },
      { name: "Mrs. Gilda Alipio" },
      { name: "Mr. Jaime Clamosa" },
      { name: "Mrs. Carilagan Clamosa" },
      { name: "Mr. Lorenzo Agsaway" },
      { name: "Mrs. Amelia Mendoza" },
      { name: "Mr. Ricardo Madlangbayan" },
      { name: "Mrs. Violeta Veluz" },
      { name: "Mr. Redentor Alipio" },
      { name: "Mrs. Normita Gallanosa" },
      { name: "Mr. Rolando Alipio" },
      { name: "Mrs. Rosario Alipio" },
    ],
  },
  {
    title: "Best Man",
    size: "large",
    members: [{ name: "Darwin Potante" }, { name: "Jonathan Magno" }],
  },
  {
    title: "Matron of Honor",
    size: "large",
    members: [{ name: "Jonellaine Huerta" }],
  },
  {
    title: "Groomsmen",
    members: [
      { name: "Teejay Magno" },
      { name: "Rexon Perea" },
      { name: "Roland Vincent Alipio" },
      { name: "Lester Alipio" },
    ],
  },
  {
    title: "Bridesmaids",
    members: [
      { name: "Bianca Michelle Tellez" },
      { name: "Cynthia Nicole Magno" },
      { name: "Melissa Batuhan" },
      { name: "Maica Angeli Costales" },
    ],
  },
  {
    title: "Secondary Sponsors",
    members: [
      { name: "Mark Prince Angelo Alipio", role: "Candle" },
      { name: "Lani Rose Alipio", role: "Candle" },
      { name: "Jay Agustin", role: "Veil" },
      { name: "Ina Agustin", role: "Veil" },
      { name: "Von Carlo Clamosa", role: "Cord" },
      { name: "Julie Ann Magno", role: "Cord" },
    ],
  },
  {
    title: "Ring Bearer",
    members: [{ name: "Simon Rafael Potante" }],
  },
  {
    title: "Bible Bearer",
    members: [{ name: "Juan Lucas Torres" }],
  },
  {
    title: "Coin Bearer",
    members: [{ name: "King Jefferson Mendoza" }],
  },
  {
    title: "Flower Girls",
    members: [
      { name: "Avrielle Summer Tejada" },
      { name: "Pauline Gayle Pagtalunan" },
      { name: "Bliss Qyanna Clementine Nicolas" },
      { name: "Natalia Arielle Magno" },
    ],
  },
];
