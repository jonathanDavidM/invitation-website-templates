import { Church, GlassWater, Utensils, PartyPopper, Heart } from "lucide-react";
import type { ScheduleEvent, Venue } from "@/types";

/** The day's programme — edit times, titles, and copy freely. */
export const schedule: ScheduleEvent[] = [
  {
    time: "3:00 PM",
    title: "Ceremony",
    description:
      "Holy Matrimony at San Antonio de Padua Parish. Kindly be seated by 2:30 PM.",
    icon: Church,
  },
  {
    time: "6:00 PM",
    title: "Cocktail Hour & Guest Arrival",
    description:
      "Join us at Infinity Tagaytay Events Place for drinks and canapés as the celebration begins.",
    icon: GlassWater,
  },
  {
    time: "7:00 PM",
    title: "Program Proper",
    description:
      "An evening of wedding traditions, games, performances, and heartfelt moments together.",
    icon: PartyPopper,
  },
  {
    time: "8:00 PM",
    title: "Dinner",
    description: "A warm, hearty meal served as the evening settles in.",
    icon: Utensils,
  },
  {
    time: "9:00 PM",
    title: "End of Celebration",
    description:
      "Our reception draws to a close — thank you for celebrating with us.",
    icon: Heart,
  },
];

/** Ceremony & reception venues. */
export const venues: Venue[] = [
  {
    label: "The Ceremony",
    name: "San Antonio de Padua Parish",
    address: "Silang, Cavite, Philippines",
    time: "3:00 PM · September 10, 2026",
    mapsUrl:
      "https://www.google.com/maps/place/San+Antonio+de+Padua+Parish/@14.1916913,120.989979,1063m/data=!3m2!1e3!4b1!4m6!3m5!1s0x33bd7c0265859361:0xa4a9b11e95646896!8m2!3d14.1916913!4d120.9925539!16s%2Fg%2F1hc4ljm34",
    image: "/images/venues/church.jpg",
    imageAlt: "San Antonio de Padua Parish church in Silang, Cavite",
  },
  {
    label: "The Reception",
    name: "Infinity Tagaytay Events Place",
    address: "Tagaytay, Cavite, Philippines",
    time: "6:00 PM · September 10, 2026",
    mapsUrl:
      "https://www.google.com/maps/place/INFINITY+TAGAYTAY+EVENTS+PLACE/@14.1229918,120.9514421,66m/data=!3m1!1e3!4m14!1m7!3m6!1s0x33bd79d5dbcc8c67:0x42213db338c3025c!2sINFINITY+TAGAYTAY+EVENTS+PLACE!8m2!3d14.1230001!4d120.9513257!16s%2Fg%2F11sd3w8lxd!3m5!1s0x33bd79d5dbcc8c67:0x42213db338c3025c!8m2!3d14.1230001!4d120.9513257!16s%2Fg%2F11sd3w8lxd",
    image: "/images/venues/reception.jpg",
    imageAlt: "Infinity Tagaytay Events Place reception venue",
  },
];
