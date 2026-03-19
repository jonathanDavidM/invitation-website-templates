// components/sections/EventsSection.tsx
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { WEDDING } from "@/lib/wedding-data";
import { MapPin, Clock, ExternalLink } from "lucide-react";

interface EventCardProps {
  type: "ceremony" | "reception";
  label: string;
  name: string;
  time: string;
  timeLabel: string;
  address: string;
  city: string;
  mapsUrl: string;
  dressCode?: string;
  dressCodeColors?: string;
}

function EventCard({
  type,
  label,
  name,
  time,
  timeLabel,
  address,
  city,
  mapsUrl,
  dressCode,
  dressCodeColors,
}: EventCardProps) {
  const icon = type === "ceremony" ? "⛪" : "🥂";

  return (
    <div className="relative group flex-1">
      {/* Card */}
      <div className="relative border border-gold/15 bg-forest-light/10 p-8 md:p-10 hover:border-gold/30 transition-all duration-500 overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        {/* Decorative corner */}
        <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-gold/20" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-gold/20" />

        {/* Background glow on hover */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#2d865320_0%,_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          {/* Icon & label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{icon}</span>
            <div>
              <p className="font-heading text-gold tracking-[0.25em] text-[10px] uppercase">
                {label}
              </p>
            </div>
          </div>

          {/* Venue name */}
          <h3 className="font-display italic text-cream text-3xl md:text-4xl font-light leading-tight mb-6">
            {name}
          </h3>

          <div className="w-10 h-px bg-gold/30 mb-6" />

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-gold/60 mt-0.5 shrink-0" />
              <div>
                <p className="font-body text-cream text-sm font-medium">{time}</p>
                <p className="font-body text-cream/40 text-xs mt-0.5">{timeLabel}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold/60 mt-0.5 shrink-0" />
              <div>
                <p className="font-body text-cream text-sm font-medium">{address}</p>
                <p className="font-body text-cream/40 text-xs mt-0.5">{city}</p>
              </div>
            </div>

            {dressCode && (
              <div className="pt-2 border-t border-gold/10">
                <p className="font-heading text-[9px] tracking-[0.2em] uppercase text-gold/50 mb-1">
                  Dress Code
                </p>
                <p className="font-body text-cream/70 text-sm">{dressCode}</p>
                {dressCodeColors && (
                  <p className="font-body text-gold/60 text-xs mt-0.5">{dressCodeColors}</p>
                )}
              </div>
            )}
          </div>

          {/* Maps link */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 font-heading text-[10px] tracking-[0.25em] uppercase text-gold border border-gold/30 px-5 py-2.5 hover:bg-gold hover:text-forest-dark transition-all duration-300"
          >
            <MapPin className="w-3 h-3" />
            View on Map
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function EventsSection() {
  return (
    <SectionWrapper id="events" darkBg>
      <SectionHeader
        eyebrow="Save the Date"
        title="The Celebration"
        subtitle={`${WEDDING.date.dayOfWeek}, ${WEDDING.date.display}`}
      />

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <EventCard
          type="ceremony"
          label="Holy Matrimony"
          name={WEDDING.ceremony.name}
          time={WEDDING.ceremony.time}
          timeLabel={WEDDING.ceremony.timeLabel}
          address={WEDDING.ceremony.address}
          city={WEDDING.ceremony.city}
          mapsUrl={WEDDING.ceremony.googleMapsUrl}
        />

        {/* Center divider */}
        <div className="hidden md:flex flex-col items-center justify-center gap-3 px-2">
          <div className="w-px flex-1 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
          <div className="w-6 h-6 border border-gold/30 rotate-45 flex items-center justify-center">
            <div className="w-2 h-2 bg-gold/40 rotate-0" />
          </div>
          <div className="w-px flex-1 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
        </div>

        <EventCard
          type="reception"
          label="Reception Dinner"
          name={WEDDING.reception.name}
          time={WEDDING.reception.time}
          timeLabel={WEDDING.reception.timeLabel}
          address={WEDDING.reception.address}
          city={WEDDING.reception.city}
          mapsUrl={WEDDING.reception.googleMapsUrl}
          dressCode={WEDDING.reception.dresscode}
          dressCodeColors={WEDDING.reception.dresscodeColors}
        />
      </div>
    </SectionWrapper>
  );
}
