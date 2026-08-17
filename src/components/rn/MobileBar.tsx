import { Phone, MessageCircle } from "lucide-react";
import { PHONE_TEL } from "./constants";

export default function MobileBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-50">
      <div className="mx-3 mb-3 grid grid-cols-2 gap-2 p-1.5 rounded-xl border border-black/10 bg-white/90 backdrop-blur-xl shadow-[0_-4px_30px_rgba(10,14,20,0.12)]">
        <a
          href={`tel:${PHONE_TEL}`}
          className="flex items-center justify-center gap-2 py-3 rounded-lg bg-[#0891B2] text-white font-bold text-sm active:scale-[0.98] transition-transform"
        >
          <Phone className="w-4 h-4" strokeWidth={2.4} />
          Zadzwoń
        </a>
        <a
          href="#kontakt"
          className="flex items-center justify-center gap-2 py-3 rounded-lg border border-black/15 text-[#0A0E14] font-semibold text-sm active:scale-[0.98] transition-transform"
        >
          <MessageCircle className="w-4 h-4" strokeWidth={2.2} />
          Zapytaj o naprawę
        </a>
      </div>
    </div>
  );
}
