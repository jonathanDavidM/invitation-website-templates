import { wedding } from "@/wedding.config";

export default function Footer() {
  return (
    <footer className="bg-ivory border-t border-cream py-16 px-6 text-center">
      <div className="max-w-lg mx-auto">

        {/* Ornament */}
        <div className="font-cormorant italic text-3xl text-blush mb-6 leading-none select-none">✦</div>

        {/* Names */}
        <p className="font-cormorant italic font-light text-muted mb-2"
          style={{ fontSize: "clamp(24px, 5vw, 36px)" }}>
          {wedding.groom} &amp; {wedding.bride}
        </p>

        {/* Date & venue */}
        <p className="font-jost font-thin text-[10px] tracking-[0.28em] uppercase text-muted/50 mb-8">
          {wedding.datePretty} · {wedding.venueCity}
        </p>

        <div className="gold-divider mb-8">
          <div className="w-[4px] h-[4px] rounded-full bg-gold/40" />
        </div>

        {/* Hashtag */}
        <p className="font-cormorant italic font-light text-champagne text-lg mb-6">
          {wedding.hashtag}
        </p>

        {/* Legal */}
        <p className="font-jost font-thin text-[9px] tracking-wider text-muted/30 uppercase">
          Made with love · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
