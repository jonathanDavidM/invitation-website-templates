import { wedding } from "@/wedding.config";

export default function InviteBody() {
  return (
    <section className="bg-ivory py-24 px-6 text-center">
      <div className="max-w-2xl mx-auto">

        {/* Eyebrow */}
        <p className="font-jost font-thin text-[9px] tracking-[0.44em] uppercase text-champagne mb-6">
          You are cordially invited
        </p>

        {/* Ornament */}
        <div className="font-cormorant italic text-4xl text-blush mb-8 leading-none select-none">❧</div>

        {/* Formal text */}
        <p className="font-cormorant font-light text-muted leading-relaxed mb-2"
          style={{ fontSize: "clamp(16px, 2.4vw, 20px)" }}>
          {wedding.groomParents} and {wedding.brideParents}
        </p>
        <p className="font-cormorant font-light text-muted leading-relaxed mb-8"
          style={{ fontSize: "clamp(14px, 2vw, 17px)" }}>
          joyfully request the honour of your presence at the marriage of their children
        </p>

        {/* Names large */}
        <h2 className="font-cormorant font-light text-ink leading-tight mb-1"
          style={{ fontSize: "clamp(44px, 8vw, 72px)", letterSpacing: "-0.01em" }}>
          {wedding.groom} {wedding.groomLastName}
        </h2>
        <p className="font-cormorant italic text-blush text-3xl mb-1">&amp;</p>
        <h2 className="font-cormorant font-light text-ink leading-tight mb-10"
          style={{ fontSize: "clamp(44px, 8vw, 72px)", letterSpacing: "-0.01em" }}>
          {wedding.bride} {wedding.brideLastName}
        </h2>

        {/* Gold divider */}
        <div className="gold-divider mb-10">
          <div className="w-[5px] h-[5px] rounded-full bg-gold" />
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-3 border border-cream divide-x divide-cream mb-12">
          {[
            { icon: "📅", label: "Date",     value: wedding.datePretty },
            { icon: "🕔", label: "Ceremony", value: `${wedding.ceremonyTime}\nReception ${wedding.receptionTime}` },
            { icon: "📍", label: "Venue",    value: `${wedding.venueName}\n${wedding.venueCity}` },
          ].map(({ icon, label, value }) => (
            <div key={label} className="py-8 px-4 flex flex-col items-center gap-2">
              <span className="text-xl opacity-50">{icon}</span>
              <p className="font-jost font-thin text-[9px] tracking-[0.35em] uppercase text-champagne">
                {label}
              </p>
              <p className="font-cormorant text-ink text-base leading-snug whitespace-pre-line">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Dress code row */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <div className="text-center">
            <p className="font-jost font-thin text-[9px] tracking-[0.35em] uppercase text-champagne mb-1">Dress Code</p>
            <p className="font-cormorant text-ink text-lg">{wedding.dresscode}</p>
          </div>
          <div className="w-px h-8 bg-cream" />
          <div className="text-center">
            <p className="font-jost font-thin text-[9px] tracking-[0.35em] uppercase text-champagne mb-1">Hashtag</p>
            <p className="font-cormorant text-ink text-lg">{wedding.hashtag}</p>
          </div>
          <div className="w-px h-8 bg-cream" />
          <div className="text-center">
            <p className="font-jost font-thin text-[9px] tracking-[0.35em] uppercase text-champagne mb-1">RSVP by</p>
            <p className="font-cormorant text-ink text-lg">{wedding.rsvpDeadline}</p>
          </div>
        </div>

        {/* Quote */}
        <blockquote className="border-l-2 border-blush pl-5 text-left max-w-md mx-auto">
          <p className="font-cormorant italic font-light text-muted text-xl leading-relaxed mb-1">
            "{wedding.quote}"
          </p>
          <cite className="font-jost font-thin text-[10px] tracking-widest text-champagne not-italic uppercase">
            — {wedding.verse}
          </cite>
        </blockquote>

      </div>
    </section>
  );
}
