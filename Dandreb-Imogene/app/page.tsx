import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/sections/hero";
import { Welcome } from "@/components/sections/welcome";
import { Story } from "@/components/sections/story";
import { Gallery } from "@/components/sections/gallery";
import { Schedule } from "@/components/sections/schedule";
import { Venues } from "@/components/sections/venues";
import { DressCode } from "@/components/sections/dress-code";
import { Countdown } from "@/components/sections/countdown";
import { Rsvp } from "@/components/sections/rsvp";
import { Faq } from "@/components/sections/faq";
import { Gifts } from "@/components/sections/gifts";
import { Entourage } from "@/components/sections/entourage";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <Welcome />
        <Story />
        <Gallery />
        <Schedule />
        <Venues />
        <DressCode />
        <Countdown />
        <Entourage />
        <Rsvp />
        <Faq />
        <Gifts />
      </main>
      <Footer />
    </>
  );
}
