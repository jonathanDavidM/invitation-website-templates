// components/sections/ScheduleSection.tsx
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { WEDDING } from "@/lib/wedding-data";
import { Users, Church, Camera, Wine, Utensils, Music } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  users: Users,
  church: Church,
  camera: Camera,
  wine: Wine,
  utensils: Utensils,
  music: Music,
};

export function ScheduleSection() {
  return (
    <SectionWrapper id="schedule">
      <SectionHeader
        eyebrow="Programme"
        title="Day of Events"
        subtitle="A moment-by-moment guide to celebrating with us"
      />

      <div className="max-w-2xl mx-auto">
        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-[22px] top-4 bottom-4 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />

          <div className="space-y-0">
            {WEDDING.schedule.map((item, index) => {
              const Icon = ICON_MAP[item.icon] ?? Music;
              const isLast = index === WEDDING.schedule.length - 1;

              return (
                <div
                  key={index}
                  className="group relative flex items-start gap-6 pb-8"
                >
                  {/* Icon node */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-11 h-11 border border-gold/25 bg-forest-deep flex items-center justify-center group-hover:border-gold/60 group-hover:bg-forest-light/20 transition-all duration-300">
                      <Icon className="w-4 h-4 text-gold/60 group-hover:text-gold transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-baseline gap-4 flex-wrap">
                      <span className="font-heading text-gold text-xs tracking-widest">
                        {item.time}
                      </span>
                      <span className="w-4 h-px bg-gold/30" />
                      <span className="font-display italic text-cream text-xl font-light">
                        {item.event}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-4 pt-8 border-t border-gold/10 text-center">
          <p className="font-body text-cream/30 text-xs tracking-wide">
            Schedule is subject to change. Please be seated before the ceremony begins.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
