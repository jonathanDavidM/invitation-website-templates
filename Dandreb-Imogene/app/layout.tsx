import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Great_Vibes } from "next/font/google";
import { couple } from "@/content/couple";
import { siteUrl } from "@/lib/site";
import { basePath } from "@/lib/base-path";
import { MusicPlayer } from "@/components/music-player";
import { Entrance } from "@/components/entrance";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

const title = `${couple.shortNames} — ${couple.dateLabel}`;
const description = `Together with our families, ${couple.groom.fullName} and ${couple.bride.fullName} invite you to celebrate their wedding on ${couple.dateLabel} in ${couple.location}. RSVP and find every detail here.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · ${couple.shortNames}`,
  },
  description,
  keywords: [
    "wedding",
    "wedding invitation",
    couple.groom.fullName,
    couple.bride.fullName,
    "Silang Cavite wedding",
    "Tagaytay wedding",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: couple.shortNames,
    images: [
      {
        url: `${basePath}/images/og.jpg`,
        width: 1200,
        height: 630,
        alt: `${couple.shortNames} — ${couple.dateLabel}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${basePath}/images/og.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0F5132",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${inter.variable} ${greatVibes.variable} font-sans text-body antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-caption focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>
        {children}
        <MusicPlayer />
        <Entrance />
      </body>
    </html>
  );
}
