import { wedding } from "@/wedding.config";

export default function Schedule() {
  return (
    <section className="bg-cream py-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-jost font-thin text-[9px] tracking-[0.44em] uppercase text-champagne mb-3">
            Programme
          </p>
          <h3
            className="font-cormorant font-light text-ink"
            style={{ fontSize: "clamp(32px, 6vw, 48px)" }}
          >
            Day of Celebrations
          </h3>
          <div className="gold-divider mt-5">
            <div className="w-[5px] h-[5px] rounded-full bg-gold" />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[88px] top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #8EB4CB 8%, #8EB4CB 92%, transparent)",
            }}
          />

          <div className="flex flex-col">
            {wedding.schedule.map((item, i) => (
              <div key={i} className="flex items-start gap-6 py-5 group">
                {/* Time */}
                <div className="min-w-[88px] text-right pt-0.5">
                  <span className="font-jost font-light text-[11px] tracking-[0.1em] text-champagne">
                    {item.time}
                  </span>
                </div>

                {/* Dot */}
                <div className="relative flex-shrink-0 mt-1.5 z-10">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-blush bg-cream
                    group-hover:bg-blush transition-colors duration-300"
                  />
                </div>

                {/* Content */}
                <div className="pt-0">
                  <p className="font-cormorant font-semibold text-ink text-[17px] leading-snug">
                    {item.event}
                  </p>
                  <p className="font-jost font-light text-[11px] tracking-wider text-muted mt-0.5">
                    {item.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Venue map link */}
        <div className="mt-16 p-6 border border-blush/30 bg-ivory text-center">
          <p className="font-jost font-thin text-[9px] tracking-[0.38em] uppercase text-champagne mb-2">
            Getting There
          </p>
          <p className="font-cormorant font-light text-ink text-lg mb-1">
            {wedding.venueName}
          </p>
          <p className="font-jost font-light text-muted text-xs tracking-wider mb-4">
            {wedding.venueAddress}
          </p>
          <a
            href={wedding.venueMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-ink/25 text-ink font-jost font-light text-[10px]
              tracking-[0.35em] uppercase px-7 py-3 hover:bg-ink hover:text-ivory transition-all duration-300"
          >
            View on Map
          </a>
        </div>
      </div>
    </section>
  );
}
