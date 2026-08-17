import { ArrowRight, Phone } from "lucide-react";
import { PHONE, PHONE_TEL } from "./constants";
import Image from "next/image";
import HERO_IMG from "../../../public/hero.png";

export default function Hero() {
  return (
    <section id="start" className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          src={HERO_IMG}
          alt="Makrofotografia płytki PCB — precyzyjna naprawa elektroniki"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#F7F8FA] via-[#F7F8FA]/72 to-[#F7F8FA]/15" />
        <div className="absolute inset-0 bg-linear-to-t from-[#F7F8FA] via-transparent to-[#F7F8FA]/70" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-5 lg:px-8 pt-28 pb-24 lg:pt-32">
        <div className="max-w-3xl">

          <h1 className="text-[#0A0E14] font-extrabold tracking-tight leading-[1.04] text-4xl sm:text-5xl lg:text-[5.2rem]">
            Naprawiam elektronikę,
            <br className="hidden sm:block" />{" "}
            której inni <span className="text-[#0891B2]">nie potrafią</span> naprawić.
          </h1>

          <p className="mt-7 text-[#5A6770] text-lg lg:text-xl leading-relaxed max-w-2xl">
            25 lat doświadczenia w naprawie sterowników, modułów elektronicznych,
            zasilaczy, falowników i urządzeń specjalistycznych.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3.5">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-[#0891B2] text-white font-bold text-[15px] hover:bg-[#0E7A95] active:scale-[0.98] transition-all shadow-[0_10px_32px_rgba(8,145,178,0.28)]"
            >
              Zleć naprawę
              <ArrowRight className="w-5 h-5" strokeWidth={2.4} />
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md border border-black/15 text-[#0A0E14] font-semibold text-[15px] hover:border-[#0891B2] hover:text-[#0891B2] transition-colors"
            >
              <Phone className="w-5 h-5" strokeWidth={2.2} />
              Zadzwoń {PHONE}
            </a>
          </div>
        </div>
      </div>

      {/* bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-linear-to-t from-[#F7F8FA] to-transparent pointer-events-none" />
    </section>
  );
}
