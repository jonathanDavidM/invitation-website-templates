import type { Metadata } from "next";
import { WEDDING } from "@/lib/constants";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: `${WEDDING.bride} & ${WEDDING.groom} — ${WEDDING.displayDate}`,
  description: `You're invited to the wedding of ${WEDDING.bride} and ${WEDDING.groom} on ${WEDDING.displayDate} in London.`,
  keywords: ["wedding", "invitation", WEDDING.bride, WEDDING.groom, "London"],
  openGraph: {
    title: `${WEDDING.bride} & ${WEDDING.groom} — Wedding Invitation`,
    description: `Join us to celebrate our wedding on ${WEDDING.displayDate} in London.`,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Cormorant+Upright:ital,wght@0,300;0,400;1,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
