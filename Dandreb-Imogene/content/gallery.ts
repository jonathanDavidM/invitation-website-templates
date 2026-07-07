import type { GalleryImage } from "@/types";
import manifest from "./image-manifest.json";

/**
 * The engagement gallery, in editorial order.
 *
 * Drop the real photos into /public/images/gallery using these exact
 * filenames (see PHOTOS.md for which photo goes where), then run
 * `npm run images` to regenerate blur placeholders and dimensions.
 */
interface ManifestEntry {
  width: number;
  height: number;
  blurDataURL: string;
}

const entries: Omit<GalleryImage, "width" | "height" | "blurDataURL">[] = [
  {
    src: "/images/gallery/desert-dunes-hero.jpg",
    alt: "Dandreb and Rose Imogene embracing on a desert dune at sunset, her bronze satin gown flowing across the sand",
    orientation: "landscape",
    emphasis: "full",
    caption: "Golden hour on the dunes",
  },
  {
    src: "/images/gallery/desert-gown-billow.jpg",
    alt: "The couple standing tall on the dunes as the bronze gown billows dramatically toward the camera",
    orientation: "portrait",
    emphasis: "feature",
    caption: "The desert held its breath",
  },
  {
    src: "/images/gallery/desert-sunset-gaze.jpg",
    alt: "Dandreb and Rose Imogene face to face, the setting sun glowing between them",
    orientation: "portrait",
    emphasis: "standard",
    caption: "Just before the sun slipped away",
  },
  {
    src: "/images/gallery/desert-groom-portrait.jpg",
    alt: "Dandreb in a black suit adjusting his watch, backlit by the desert sunset",
    orientation: "portrait",
    emphasis: "standard",
  },
  {
    src: "/images/gallery/camel-road.jpg",
    alt: "The couple holding hands on an open road as a caravan of camels crosses at sunset",
    orientation: "landscape",
    emphasis: "full",
    caption: "Every road leads to you",
  },
  {
    src: "/images/gallery/city-bride-portrait.jpg",
    alt: "Rose Imogene in a white blazer dress smiling over her shoulder by a turquoise waterfront promenade",
    orientation: "portrait",
    emphasis: "standard",
  },
  {
    src: "/images/gallery/city-back-to-back.jpg",
    alt: "The couple back to back in tan and white suits against a bright blue sky and glass towers",
    orientation: "portrait",
    emphasis: "feature",
    caption: "Downtown, just us",
  },
  {
    src: "/images/gallery/city-promenade.jpg",
    alt: "Dandreb and Rose Imogene walking hand in hand along a fountain promenade, smiling at each other",
    orientation: "portrait",
    emphasis: "standard",
  },
  {
    src: "/images/gallery/tram-walk.jpg",
    alt: "The couple holding hands in front of a vintage red tram, dressed in tan and white",
    orientation: "portrait",
    emphasis: "standard",
    caption: "Old town, new beginnings",
  },
  {
    src: "/images/gallery/tram-facing.jpg",
    alt: "Dandreb and Rose Imogene holding hands face to face before a red vintage tram",
    orientation: "landscape",
    emphasis: "standard",
  },
  {
    src: "/images/gallery/city-stroll.jpg",
    alt: "The couple laughing and holding hands on a palm-lined boulevard",
    orientation: "landscape",
    emphasis: "feature",
    caption: "Somewhere between here and forever",
  },
  {
    src: "/images/gallery/city-hailing.jpg",
    alt: "The couple playfully hailing a ride beneath a road sign on a sunny boulevard",
    orientation: "portrait",
    emphasis: "standard",
  },
  {
    src: "/images/gallery/city-sign-lean.jpg",
    alt: "Dandreb and Rose Imogene at the Wings of Mexico statue, the Burj Khalifa framed between the golden wings",
    orientation: "portrait",
    emphasis: "standard",
  },
];

const manifestMap = manifest as unknown as Record<string, ManifestEntry>;

const fallbackDims = {
  portrait: { width: 1200, height: 1800 },
  landscape: { width: 1800, height: 1200 },
};

export const gallery: GalleryImage[] = entries.map((entry) => {
  const meta = manifestMap[entry.src];
  return {
    ...entry,
    width: meta?.width ?? fallbackDims[entry.orientation].width,
    height: meta?.height ?? fallbackDims[entry.orientation].height,
    blurDataURL: meta?.blurDataURL,
  };
});

/** The hero background image (also used for Open Graph). */
export const heroImage = gallery[0];
