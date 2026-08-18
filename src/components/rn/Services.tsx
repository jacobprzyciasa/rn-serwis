"use client";

import { useState } from "react";
import {
  Speaker,
  Car,
  Cpu,
  Snowflake,
  HeartPulse,
  HelpCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";

const GROUPS: { icon: LucideIcon; title: string; items: string[] }[] = [
  {
    icon: Speaker,
    title: "Elektronika użytkowa",
    items: ["Sprzęt audio", "AGD", "Sterowniki pralek", "Sterowniki zmywarek"],
  },
  {
    icon: Car,
    title: "Motoryzacja",
    items: [
      "Moduły samochodów osobowych",
      "Moduły samochodów ciężarowych",
      "Moduły pojazdów specjalnych",
    ],
  },
  {
    icon: Cpu,
    title: "Automatyka i przemysł",
    items: [
      "Sterowniki maszyn budowlanych i przemysłowych",
      "Falowniki",
      "Zasilacze",
      "Ładowarki przemysłowe",
    ],
  },
  {
    icon: Snowflake,
    title: "HVAC i urządzenia specjalistyczne",
    items: [
      "Sterowniki klimatyzatorów",
      "Sterowniki pomp ciepła",
      "Sterowniki jacuzzi i saun",
      "Ogrzewanie podłogowe",
      "Bramy garażowe i przesuwne",
    ],
  },
  {
    icon: HeartPulse,
    title: "Urządzenia medyczne i fitness",
    items: ["Sterowniki urządzeń fitness", "Sterowniki urządzeń medycznych"],
  },
  {
    icon: HelpCircle,
    title: "Naprawy nietypowe",
    items: [
      "Urządzenia już nieprodukowane",
      "Niestandardowa elektronika",
      "Urządzenia bez dostępnego serwisu",
    ],
  },
];

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="uslugi" className="relative py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full border border-[#0891B2]/30 bg-[#0891B2]/5">
              <span className="font-mono-tech text-[12px] text-[#0891B2] font-semibold">
                CO NAPRAWIAMY
              </span>
            </div>
            <h2 className="mt-3 text-[#0A0E14] font-extrabold tracking-tight text-3xl lg:text-[2.6rem] leading-[1.1]">
              Szeroki zakres napraw elektroniki
            </h2>
            <p className="mt-4 text-[#5A6770] text-lg leading-relaxed">
              Od sprzętu AGD i sprzętów audio aż po elektronikę przemysłową i
              motoryzacyjną. Wszystko, co wymaga serwisu.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 0.08}>
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative h-full rounded-xl border p-6 transition-all duration-300 cursor-default ${
                  hovered === i
                    ? "border-[#0891B2]/40 bg-[#F1F4F6] shadow-[0_10px_32px_rgba(8,145,178,0.08)]"
                    : "border-black/8 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="grid place-items-center w-11 h-11 rounded-lg border border-black/10 text-[#0891B2] group-hover:border-[#0891B2]/40 transition-colors">
                    <g.icon className="w-5 h-5" strokeWidth={1.6} />
                  </span>
                </div>
                <h3 className="text-[#0A0E14] font-semibold text-[17px] mb-4">
                  {g.title}
                </h3>
                <ul className="space-y-2">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2 text-[14px] text-[#5A6770]"
                    >
                      <span className="mt-2 w-1 h-1 rounded-full bg-[#0891B2]/60 shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-[#0891B2]/0 via-[#0891B2]/60 to-[#0891B2]/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center p-7 rounded-xl border border-black/8 bg-white">
            <p className="text-[#5A6770] text-lg">
              Nie widzisz swojego urządzenia?{" "}
              <span className="text-[#0A0E14] font-medium">
                Zapytaj - być może potrafię je naprawić.
              </span>
            </p>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-[#0891B2]/40 text-[#0891B2] font-semibold text-sm hover:bg-[#0891B2] hover:text-white transition-colors whitespace-nowrap"
            >
              Zapytaj o naprawę
              <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
