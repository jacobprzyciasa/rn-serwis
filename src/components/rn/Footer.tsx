import { MapPin, Phone, ShieldCheck } from "lucide-react";
import { PHONE, PHONE_TEL } from "./constants";
import Image from "next/image";
import Logo from "../../../public/rn_final_combo_white_trans.png"

const LINKS = [
  { label: "Start", href: "#start" },
  { label: "O serwisie", href: "#o-serwisie" },
  { label: "Usługi", href: "#uslugi" },
  { label: "Realizacje", href: "#realizacje" },
  { label: "Opinie", href: "#opinie" },
  { label: "Kontakt", href: "#kontakt" },
];

const REVIEWS_URL = "https://www.google.com/search?q=RN+Serwis+Elektroniki+Sosnowiec";
const MAPS_URL = "https://www.google.com/maps?q=" + encodeURIComponent("RN Serwis Elektroniki, Dworska 12, 41-219 Sosnowiec");

export default function Footer() {
  return (
    <footer className="relative bg-[#ECEFF3] border-t border-black/5 pt-16 pb-28 lg:pb-12">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2.5 group" aria-label="RN Serwis Elektroniki — strona główna">
            <Image src={Logo} alt="Logo" className="w-30 invert-100" />
          </a>
            <p className="mt-4 text-[#5A6770] text-sm leading-relaxed max-w-xs">
              Serwis i naprawa elektroniki z 25-letnim doświadczeniem. Sterowniki,
              moduły, falowniki, zasilacze i urządzenia nietypowe.
            </p>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-mono-tech text-[11px] text-[#0891B2] uppercase tracking-wider">Adres</h4>
            <div className="mt-4 space-y-2.5">
              <p className="flex items-start gap-2.5 text-[#5A6770] text-sm">
                <MapPin className="w-4 h-4 text-[#0891B2] shrink-0 mt-0.5" strokeWidth={1.8} />
                <span>Dworska 12<br />41-219 Sosnowiec</span>
              </p>
              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2.5 text-[#5A6770] text-sm hover:text-[#0891B2] transition-colors">
                <Phone className="w-4 h-4 text-[#0891B2] shrink-0" strokeWidth={1.8} />
                {PHONE}
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-mono-tech text-[11px] text-[#0891B2] uppercase tracking-wider">Realizacje</h4>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[#5A6770] text-sm hover:text-[#0A0E14] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mapy / opinie / RODO */}
          <div>
            <h4 className="font-mono-tech text-[11px] text-[#0891B2] uppercase tracking-wider">Sprawdź mnie</h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-[#5A6770] text-sm hover:text-[#0A0E14] transition-colors">
                  Google Maps
                </a>
              </li>
              <li>
                <a href={REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="text-[#5A6770] text-sm hover:text-[#0A0E14] transition-colors">
                  Google Reviews
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-7 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#7A8590] text-[12.5px] font-mono-tech">
            © RN Serwis Elektroniki - wszelkie prawa zastrzeżone
          </p>
          <p className="flex items-center gap-2 text-[#7A8590] text-[12px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0891B2]/70" strokeWidth={1.8} />
            Podanie danych w formularzu jest dobrowolne
          </p>
        </div>
      </div>
    </footer>
  );
}
