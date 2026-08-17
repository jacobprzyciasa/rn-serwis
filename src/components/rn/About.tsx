import { Check } from "lucide-react";
import Reveal from "./Reveal";
import Image from "next/image";
import expertise from "../../../public/expertise.jpg";

const WORKSTATION = "https://media.base44.com/images/public/6a82d6c0df5c8c71096f3b12/035b71127_generated_c275d0d0.png";

const POINTS = [
  "Elektronika przemysłowa i specjalistyczna",
  "Indywidualne podejście do każdej naprawy",
  "Podejmuję się nietypowych przypadków",
  "Urządzenia, których inni nie potrafią naprawić",
];

export default function About() {
  return (
    <section id="o-serwisie" className="relative py-20 lg:py-32 tech-grid-bg bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full border border-[#0891B2]/30 bg-[#0891B2]/5">
                <span className="font-mono-tech text-[12px] text-[#0891B2] font-semibold">25+ LAT DOŚWIADCZENIA</span>
              </div>
              <h2 className="mt-5 text-[#0A0E14] font-extrabold tracking-tight text-3xl lg:text-[2.6rem] leading-[1.1]">
                Doświadczenie, którego nie da się zastąpić
              </h2>
              <p className="mt-6 text-[#5A6770] text-lg leading-relaxed">
                Od ponad ćwierć wieku zajmuję się naprawą elektroniki - od sprzętu
                użytkowego po zaawansowane sterowniki przemysłowe, falowniki i moduły
                samochodowe. Pracuję z układami, których nie znajdziesz w typowym serwisie.
              </p>
              <ul className="mt-7 space-y-3.5">
                {POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-[#0891B2]/10 text-[#0891B2] shrink-0">
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-[#1A2330] text-[15px] leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-black/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  src={expertise}
                  alt="Profesjonalne stanowisko serwisowe RN Serwis Elektroniki"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              {/* circuit trace accent */}
              <div className="absolute -bottom-px left-6 right-6 h-px bg-linear-to-r from-transparent via-[#0891B2]/40 to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
