// app/layout.tsx
import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Quicksand } from "next/font/google";
import "@/styles/globals.css";
import { WEDDING } from "@/lib/wedding-data";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${WEDDING.couple.combinedNames} | ${WEDDING.date.display}`,
  description: `You are cordially invited to the wedding of ${WEDDING.couple.partner1.fullName} and ${WEDDING.couple.partner2.fullName} on ${WEDDING.date.display} at ${WEDDING.ceremony.name}.`,
  keywords: ["wedding", "Dandreb Potante", "Rose Imogin Agustin", "Tagaytay", "2026"],
  openGraph: {
    title: `${WEDDING.couple.combinedNames} — ${WEDDING.date.display}`,
    description: `Join us as we celebrate our love. ${WEDDING.ceremony.name} at ${WEDDING.ceremony.time} | Reception at ${WEDDING.reception.name}`,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${cinzel.variable} ${quicksand.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
