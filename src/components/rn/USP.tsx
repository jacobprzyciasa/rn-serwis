import { Clock, Wrench, Package, MapPin, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";

const ITEMS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Clock,
    title: "25 lat doświadczenia",
    desc: "Wiedza zdobywana przez lata pracy z elektroniką użytkową i przemysłową.",
  },
  {
    icon: Wrench,
    title: "Nietypowe naprawy",
    desc: "Podejmuję się napraw urządzeń, których nie obsługują standardowe serwisy.",
  },
  {
    icon: Package,
    title: "Naprawy wysyłkowe",
    desc: "Wyślij urządzenie z dowolnego miejsca w Polsce.",
  },
  {
    icon: MapPin,
    title: "Dojazd do klienta",
    desc: "Sosnowiec i okoliczne miasta.",
  },
];

export default function USP() {
  return (
    <section className="relative py-16 lg:py-20 border-y border-black/5 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <h2 className="sr-only">Dlaczego warto mi zaufać</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5 rounded-xl overflow-hidden border border-black/5">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <div className="group h-full bg-white p-7 hover:bg-[#F1F4F6] transition-colors">
                <div className="flex items-center justify-between mb-5">
                  <span className="grid place-items-center w-11 h-11 rounded-lg border border-black/10 text-[#0891B2] group-hover:border-[#0891B2]/50 group-hover:bg-[#0891B2]/5 transition-all">
                    <it.icon className="w-5 h-5" strokeWidth={1.7} />
                  </span>
                </div>
                <h3 className="text-[#0A0E14] font-semibold text-[17px] mb-2">{it.title}</h3>
                <p className="text-[#5A6770] text-sm leading-relaxed">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
