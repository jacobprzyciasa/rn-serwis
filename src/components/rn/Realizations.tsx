import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const ITEMS = [
  {
    img: "https://media.base44.com/images/public/6a82d6c0df5c8c71096f3b12/eacf23f7d_generated_93f965aa.png",
    cat: "Falownik",
    ref: "06.A",
    problem: "Brak napięcia wyjściowego, błąd overcurrent.",
    fix: "Regeneracja modułu mocy i sekcji sterującej.",
  },
  {
    img: "https://media.base44.com/images/public/6a82d6c0df5c8c71096f3b12/d33bb51cd_generated_c1f98b77.png",
    cat: "Sterownik pralki",
    ref: "06.B",
    problem: "Nie uruchamia się, ślady zalania.",
    fix: "Czyszczenie, naprawa ścieżek i wymiana uszkodzonych elementów.",
  },
  {
    img: "https://media.base44.com/images/public/6a82d6c0df5c8c71096f3b12/d8d340ed4_generated_556358f9.png",
    cat: "Zasilacz przemysłowy",
    ref: "06.C",
    problem: "Niestabilne napięcie, wyłącza się pod obciążeniem.",
    fix: "Wymiana kondensatorów i przebudowa sekcji zasilania.",
  },
  {
    img: "https://media.base44.com/images/public/6a82d6c0df5c8c71096f3b12/3b1ffa09d_generated_74a47bc5.png",
    cat: "Moduł samochodowy (ECU)",
    ref: "06.D",
    problem: "Błąd komunikacji, brak startu silnika.",
    fix: "Diagnostyka i ponowne wlutowanie układów sterujących.",
  },
];

export default function Realizations() {
  return (
    <section id="realizacje" className="relative py-20 lg:py-32 bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full border border-[#0891B2]/30 bg-[#0891B2]/5">
              <span className="font-mono-tech text-[12px] text-[#0891B2] font-semibold">
                REALIZACJE
              </span>
            </div>
              <h2 className="mt-3 text-[#0A0E14] font-extrabold tracking-tight text-3xl lg:text-[2.6rem] leading-[1.1]">
                Wybrane realizacje
              </h2>
              <p className="mt-4 text-[#5A6770] text-lg leading-relaxed">
                Zobacz najciekawsze realizacje mojego serwisu!
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ITEMS.map((it, i) => (
            <Reveal key={it.cat} delay={(i % 4) * 0.07}>
              <div className="group h-full rounded-xl overflow-hidden border border-black/8 bg-white hover:border-[#0891B2]/40 transition-colors">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.img}
                    alt={`${it.cat} — naprawiony moduł`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-white/85 backdrop-blur border border-black/10 font-mono-tech text-[9px] text-[#0891B2]">
                    {it.ref}
                  </div>
                  <ArrowUpRight className="absolute top-2.5 right-2.5 w-5 h-5 text-[#0891B2]/0 group-hover:text-[#0891B2] transition-colors" />
                </div>
                <div className="p-5">
                  <span className="font-mono-tech text-[10px] text-[#8A95A0] uppercase tracking-wider">REALIZACJA</span>
                  <h3 className="mt-1 text-[#0A0E14] font-semibold text-[16px]">{it.cat}</h3>
                  <p className="mt-3 text-[13px] text-[#5A6770] leading-relaxed">
                    <span className="text-[#7A8590]">Problem:</span> {it.problem}
                  </p>
                  <p className="mt-1.5 text-[13px] text-[#5A6770] leading-relaxed">
                    <span className="text-[#0891B2]">Naprawa:</span> {it.fix}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
