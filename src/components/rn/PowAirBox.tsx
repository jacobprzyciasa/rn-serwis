import { ArrowRight, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";

const POWAIR = "https://media.base44.com/images/public/6a82d6c0df5c8c71096f3b12/8459163b2_generated_b6632444.png";

export default function PowAirBox() {
  return (
    <section className="relative py-20 lg:py-32 bg-[#F1F4F6] overflow-hidden">
      {/* cyan left stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0891B2]" />
      <div className="absolute inset-0 tech-grid-bg opacity-50" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden border border-black/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={POWAIR}
                alt="Urządzenie powAirBox — specjalistyczna naprawa dla straży pożarnej"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-white/85 backdrop-blur border border-[#0891B2]/30 font-mono-tech text-[10px] text-[#0891B2]">
                POWAIRBOX · FIRE RESCUE UNIT
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <span className="font-mono-tech text-[11px] text-[#0891B2] tracking-wider">[SEC: 04 · SPECJALIZACJA]</span>
              <h2 className="mt-3 text-[#0A0E14] font-extrabold tracking-tight text-3xl lg:text-[2.6rem] leading-[1.1]">
                Naprawa urządzeń powAirBox dla straży pożarnej
              </h2>
              <p className="mt-6 text-[#5A6770] text-lg leading-relaxed">
                Posiadamy duże doświadczenie w naprawie urządzeń powAirBox
                wykorzystywanych przez jednostki straży pożarnej. Jesteśmy jednym z
                niewielu serwisów oferujących naprawę tego typu urządzeń.
              </p>

              <div className="mt-7 flex items-center gap-3 p-4 rounded-lg border border-[#0891B2]/20 bg-[#0891B2]/5">
                <ShieldCheck className="w-6 h-6 text-[#0891B2] shrink-0" strokeWidth={1.8} />
                <p className="text-[#1A2330] text-[15px] font-medium">
                  Jeden z nielicznych serwisów w Polsce obsługujących jednostki Straży Pożarnej.
                </p>
              </div>

              <a
                href="#kontakt"
                className="mt-8 inline-flex items-center gap-2 px-6 py-4 rounded-md bg-[#0891B2] text-white font-bold text-[15px] hover:bg-[#0E7A95] active:scale-[0.98] transition-all shadow-[0_10px_32px_rgba(8,145,178,0.22)]"
              >
                Zapytaj o naprawę powAirBox
                <ArrowRight className="w-5 h-5" strokeWidth={2.4} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
