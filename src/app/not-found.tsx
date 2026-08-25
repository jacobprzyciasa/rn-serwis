import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { PHONE, PHONE_TEL } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Strona nie została znaleziona",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative min-h-[70vh] py-28 lg:py-36 tech-grid-bg flex items-center">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
        <span className="font-mono-tech text-[12px] text-[#0C6E86] tracking-wider">
          BŁĄD 404
        </span>
        <h1 className="mt-4 text-[#0A0E14] font-extrabold tracking-tight text-3xl lg:text-[2.6rem] leading-[1.1]">
          Nie znaleziono takiej strony
        </h1>
        <p className="mt-4 text-[#5A6770] text-lg leading-relaxed max-w-xl mx-auto">
          Strona, której szukasz, mogła zostać przeniesiona albo usunięta.
          Sprawdź adres albo wróć na stronę główną.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-[#0E7A95] text-white font-bold text-[15px] hover:bg-[#0A6880] active:scale-[0.98] transition-all shadow-[0_10px_32px_rgba(8,145,178,0.28)]"
          >
            Wróć na stronę główną
            <ArrowRight className="w-5 h-5" strokeWidth={2.4} />
          </Link>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md border border-black/15 text-[#0A0E14] font-semibold text-[15px] hover:border-[#0891B2] hover:text-[#0891B2] transition-colors"
          >
            <Phone className="w-5 h-5" strokeWidth={2.2} />
            Zadzwoń {PHONE}
          </a>
        </div>
      </div>
    </main>
  );
}
