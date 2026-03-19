import type { Metadata, Viewport } from "next";
import { WEDDING } from "@/lib/constants";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: `${WEDDING.groom} & ${WEDDING.bride} — ${WEDDING.displayDate}`,
  description: `You are invited to the wedding of ${WEDDING.groomFullName} and ${WEDDING.brideFullName} on ${WEDDING.displayDate}.`,
  openGraph: {
    title: `${WEDDING.groom} & ${WEDDING.bride} — Wedding Invitation`,
    description: `Join us on ${WEDDING.displayDate} as we celebrate our love.`,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#090908",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
