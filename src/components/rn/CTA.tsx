import { Phone, ArrowRight } from "lucide-react";
import { PHONE, PHONE_TEL } from "./constants";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section className="relative py-16 lg:py-24 bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-[#0891B2]/20 bg-linear-to-br from-white to-[#F1F4F6] p-8 lg:p-14">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0891B2]" />
            <div className="absolute inset-0 tech-grid-bg opacity-40 pointer-events-none" />
            <div className="relative max-w-2xl">
              <h2 className="mt-4 text-[#0A0E14] font-extrabold tracking-tight text-3xl lg:text-[2.8rem] leading-[1.08]">
                Masz urządzenie, którego nikt nie chce się podjąć?
              </h2>
              <p className="mt-5 text-[#5A6770] text-lg leading-relaxed">
                Opisz problem, a postaram się pomóc.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-[#0891B2] text-white font-bold text-[15px] hover:bg-[#0E7A95] active:scale-[0.98] transition-all shadow-[0_10px_32px_rgba(8,145,178,0.22)]"
                >
                  <Phone className="w-5 h-5" strokeWidth={2.4} />
                  Zadzwoń {PHONE}
                </a>
                <a
                  href="#kontakt"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md border border-black/15 text-[#0A0E14] font-semibold text-[15px] hover:border-[#0891B2] hover:text-[#0891B2] transition-colors"
                >
                  Wyślij zapytanie
                  <ArrowRight className="w-5 h-5" strokeWidth={2.2} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
