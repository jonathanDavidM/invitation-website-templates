// app/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { ScheduleSection } from "@/components/sections/ScheduleSection";
import { EntourageSection } from "@/components/sections/EntourageSection";
import { RsvpSection } from "@/components/sections/RsvpSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { Navigation } from "@/components/ui/Navigation";
import { FloatingPetals } from "@/components/ui/FloatingPetals";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-forest-deep overflow-x-hidden">
      <FloatingPetals />
      <Navigation />
      <HeroSection />
      <CountdownSection />
      <EventsSection />
      <ScheduleSection />
      <EntourageSection />
      <RsvpSection />
      <FooterSection />
    </main>
  );
}
