import { Star, ExternalLink } from "lucide-react";
import Reveal from "./Reveal";

const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=RN+Serwis+Elektroniki+Sosnowiec";

export default function Reviews() {
  return (
    <section id="opinie" className="relative py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-mono-tech text-[11px] text-[#0891B2] tracking-wider">[SEC: 07 · OPINIE]</span>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-[#0A0E14] font-extrabold text-4xl lg:text-5xl">5,0</span>
              <div className="flex flex-col items-start">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#0891B2] text-[#0891B2]" />
                  ))}
                </div>
                <span className="font-mono-tech text-[11px] text-[#5A6770] mt-1">4 opinie w Google</span>
              </div>
            </div>
            <h2 className="mt-6 text-[#0A0E14] font-extrabold tracking-tight text-3xl lg:text-[2.4rem] leading-[1.1]">
              Opinie naszych klientów
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 p-6 lg:p-8 rounded-xl border border-black/8 bg-[#F1F4F6] text-center">
            <p className="text-[#5A6770] text-[15px] leading-relaxed max-w-xl mx-auto">
              Tu pojawią się opinie klientów z Google. Nie publikujemy wymyślonych
              recenzji — prawdziwe opinie zostaną dodane wkrótce.
            </p>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-md border border-black/15 text-[#0A0E14] font-semibold text-sm hover:border-[#0891B2] hover:text-[#0891B2] transition-colors"
            >
              <Star className="w-4 h-4 fill-[#0891B2] text-[#0891B2]" />
              Zobacz wszystkie opinie w Google
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
