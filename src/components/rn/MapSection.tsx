import { MapPin, Phone, Navigation } from "lucide-react";
import { PHONE, PHONE_TEL } from "@/utils/constants";
import Reveal from "./Reveal";

const MAPS_QUERY = encodeURIComponent("RN Serwis Elektroniki, Dworska 12, 41-219 Sosnowiec");
const MAPS_DIR = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;

export default function MapSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#F1F4F6]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full border border-[#0891B2]/30 bg-[#0891B2]/5">
              <span className="font-mono-tech text-[12px] text-[#0C6E86] font-semibold">
                LOKALIZACJA
              </span>
            </div>
            <h2 className="mt-3 text-[#0A0E14] font-extrabold tracking-tight text-3xl lg:text-[2.6rem] leading-[1.1]">
              Znajdź serwis
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid lg:grid-cols-[1fr_1fr] gap-6">
          <Reveal>
            <div className="h-[300px] lg:h-full min-h-[320px] rounded-2xl overflow-hidden border border-black/10 bg-white">
              <iframe
                title="Mapa — RN Serwis Elektroniki, Dworska 12, Sosnowiec"
                src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
                className="w-full h-full contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-black/8 bg-white p-7 lg:p-9 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#0891B2] shrink-0 mt-0.5" strokeWidth={1.8} />
                  <div>
                    <p className="text-[#5A6770] text-sm">Adres</p>
                    <p className="text-[#0A0E14] text-[16px] mt-0.5">Dworska 12, 41-219 Sosnowiec</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#0891B2] shrink-0 mt-0.5" strokeWidth={1.8} />
                  <div>
                    <p className="text-[#5A6770] text-sm">Telefon</p>
                    <a href={`tel:${PHONE_TEL}`} className="text-[#0A0E14] text-[16px] mt-0.5 hover:text-[#0891B2] transition-colors block">
                      {PHONE}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Navigation className="w-5 h-5 text-[#0891B2] shrink-0 mt-0.5" strokeWidth={1.8} />
                  <div>
                    <p className="text-[#5A6770] text-sm">Dojazd</p>
                    <p className="text-[#0A0E14] text-[16px] mt-0.5">Możliwy dojazd do klienta - Sosnowiec i okolice.</p>
                  </div>
                </div>
              </div>

              <a
                href={MAPS_DIR}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md border border-[#0891B2]/40 text-[#0C6E86] font-semibold text-sm hover:bg-[#0891B2] hover:text-white transition-colors"
              >
                <Navigation className="w-4 h-4" strokeWidth={2.2} />
                Wyznacz trasę
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
