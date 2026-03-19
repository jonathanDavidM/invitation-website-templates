import Image from "next/image";
import { wedding } from "@/wedding.config";

export default function Gallery() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-3 gap-1 h-[320px] sm:h-[400px]">
        <div className="photo-item relative overflow-hidden">
          <Image
            src={wedding.photo1}
            alt="Couple photo 1"
            fill
            sizes="33vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
            style={{ objectPosition: "center" }}
          />
        </div>
        <div className="photo-item relative overflow-hidden">
          <Image
            src={wedding.photo2}
            alt="Couple photo 2"
            fill
            sizes="34vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
            style={{ objectPosition: "center top" }}
          />
        </div>
        <div className="photo-item relative overflow-hidden">
          <Image
            src={wedding.photo3}
            alt="Couple photo 3"
            fill
            sizes="33vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
            style={{ objectPosition: "center" }}
          />
        </div>
      </div>

      {/* Caption bar */}
      <div className="bg-ink py-4 flex items-center justify-center gap-3">
        <div className="h-px w-10 bg-gold/25" />
        <p className="font-jost font-thin text-[9px] tracking-[0.4em] uppercase text-ivory/30">
          {wedding.groom} &amp; {wedding.bride} · {wedding.venueCity}
        </p>
        <div className="h-px w-10 bg-gold/25" />
      </div>
    </section>
  );
}
