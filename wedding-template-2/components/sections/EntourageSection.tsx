// components/sections/EntourageSection.tsx
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { WEDDING } from "@/lib/wedding-data";

interface RoleGroupProps {
  title: string;
  names: string | string[];
}

function RoleGroup({ title, names }: RoleGroupProps) {
  const nameList = Array.isArray(names) ? names : [names];
  return (
    <div className="text-center group">
      <p className="font-heading text-[9px] tracking-[0.3em] uppercase text-gold/50 mb-2">
        {title}
      </p>
      {nameList.map((name, i) => (
        <p key={i} className="font-display italic text-cream/80 text-lg font-light">
          {name}
        </p>
      ))}
    </div>
  );
}

interface EntouragePanelProps {
  title: string;
  side: "groom" | "bride";
  bestLabel: string;
  bestName: string;
  court: string[];
  courtLabel: string;
}

function EntouragePanel({ title, side, bestLabel, bestName, court, courtLabel }: EntouragePanelProps) {
  return (
    <div className="relative border border-gold/15 bg-forest-light/5 p-8 flex-1">
      {/* Top accent */}
      <div
        className={`absolute top-0 ${side === "groom" ? "left-8 right-full/2" : "left-0 right-8"} h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent`}
      />

      <h3 className="font-heading text-gold tracking-[0.25em] text-xs uppercase text-center mb-8">
        {title}
      </h3>

      <div className="space-y-6">
        <RoleGroup title={bestLabel} names={bestName} />
        <div className="w-16 h-px bg-gold/20 mx-auto" />
        <div className="space-y-3">
          <p className="font-heading text-[9px] tracking-[0.25em] uppercase text-gold/40 text-center">
            {courtLabel}
          </p>
          {court.map((name, i) => (
            <p key={i} className="font-display italic text-cream/60 text-base text-center font-light">
              {name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EntourageSection() {
  const { entourage, couple } = WEDDING;

  return (
    <SectionWrapper id="entourage" darkBg>
      <SectionHeader
        eyebrow="The Wedding Party"
        title="Our Entourage"
        subtitle="The cherished family and friends standing beside us on this momentous day"
      />

      {/* Parents */}
      <div className="mb-16">
        <p className="font-heading text-gold/50 tracking-[0.3em] text-[9px] uppercase text-center mb-8">
          Parents
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {entourage.parents.map((parent, i) => (
            <div
              key={i}
              className="text-center border border-gold/10 py-6 px-8 bg-forest-light/5"
            >
              <p className="font-heading text-[9px] tracking-[0.25em] uppercase text-gold/40 mb-2">
                {parent.role}
              </p>
              <p className="font-display italic text-cream/80 text-xl">{parent.names}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Court */}
      <div className="flex flex-col md:flex-row gap-6">
        <EntouragePanel
          title="Groom's Side"
          side="groom"
          bestLabel="Best Man"
          bestName={entourage.bestMan}
          court={entourage.groomsmen}
          courtLabel="Groomsmen"
        />

        {/* Center motif */}
        <div className="hidden md:flex flex-col items-center justify-center gap-2 px-4">
          <div className="font-display text-gold/20 text-4xl italic">✦</div>
        </div>

        <EntouragePanel
          title="Bride's Side"
          side="bride"
          bestLabel="Maid of Honor"
          bestName={entourage.maidOfHonor}
          court={entourage.bridesmaids}
          courtLabel="Bridesmaids"
        />
      </div>

      {/* Principal Sponsors */}
      <div className="mt-16">
        <p className="font-heading text-gold/50 tracking-[0.3em] text-[9px] uppercase text-center mb-8">
          Principal Sponsors
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {entourage.sponsors.principal.map((name, i) => (
            <div key={i} className="text-center border border-gold/10 py-4 px-6">
              <p className="font-display italic text-cream/60 text-lg">{name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary Sponsors */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Cord Sponsors", names: entourage.sponsors.cord },
          { label: "Veil Sponsors", names: entourage.sponsors.veil },
          { label: "Candle Sponsors", names: entourage.sponsors.candle },
        ].map((group) => (
          <div key={group.label} className="text-center">
            <p className="font-heading text-[9px] tracking-[0.25em] uppercase text-gold/40 mb-3">
              {group.label}
            </p>
            {group.names.map((name, i) => (
              <p key={i} className="font-display italic text-cream/50 text-base">
                {name}
              </p>
            ))}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
