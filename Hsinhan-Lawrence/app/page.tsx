import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import InviteBody from "@/components/InviteBody";
import Gallery from "@/components/Gallery";
import Schedule from "@/components/Schedule";
import RSVP from "@/components/RSVP";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Countdown />
      <InviteBody />
      <Gallery />
      <Schedule />
      <RSVP />
      <Footer />
    </main>
  );
}
