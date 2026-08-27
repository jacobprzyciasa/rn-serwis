import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/rn/Reveal";
import CTA from "@/components/rn/CTA";
import { SITE_URL } from "@/utils/constants";

const TITLE = "O mnie";
const DESCRIPTION =
  "25 lat doświadczenia w naprawie elektroniki użytkowej, przemysłowej, motoryzacyjnej oraz sprzętu audio vintage. Poznaj RN Serwis Elektroniki z Sosnowca.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/o-mnie" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/o-mnie`,
  },
};

const REASONS = [
  {
    title: "25 lat praktyki",
    desc: "Przez ćwierć wieku naprawiłem tysiące urządzeń - od elektroniki użytkowej i sprzętu audio vintage po zaawansowaną elektronikę przemysłową. Każda kolejna nietypowa usterka to kolejne doświadczenie, którego nie da się wyczytać z instrukcji serwisowej.",
  },
  {
    title: "Podejmuję się tego, czego inni nie chcą",
    desc: "Specjalizuję się w przypadkach, które trafiają do mnie po tym, jak inne serwisy odmówiły naprawy - urządzenia nieprodukowane, niestandardowa elektronika, sprzęt bez dostępnej dokumentacji serwisowej.",
  },
  {
    title: "Legalna działalność i gwarancja",
    desc: "Prowadzę legalną działalność gospodarczą i na każdą wykonaną naprawę udzielam gwarancji - możesz liczyć na fakturę i rzetelne rozliczenie.",
  },
  {
    title: "Jeden z nielicznych serwisów obsługujących służby mundurowe",
    desc: "Mam duże doświadczenie w naprawie systemów PowAirBox wykorzystywanych przez jednostki Państwowej Straży Pożarnej - wąska specjalizacja, którą oferuje niewiele serwisów w Polsce.",
  },
  {
    title: "Naprawy wysyłkowe z całej Polski",
    desc: "Nie musisz mieszkać w Sosnowcu, żeby skorzystać z serwisu - urządzenie możesz wysłać kurierem z dowolnego miejsca w kraju, a w obrębie okolicznych miast możliwy jest też dojazd do klienta.",
  },
];

export default function OMniePage() {
  return (
    <main className="relative py-28 lg:py-36 tech-grid-bg">
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        <Reveal>
          <nav aria-label="Breadcrumb" className="font-mono-tech text-[11px] text-[#616B75]">
            <Link href="/" className="hover:text-[#0891B2] transition-colors">Start</Link>
            <span className="mx-2">/</span>
            <span className="text-[#5A6770]">O mnie</span>
          </nav>

          <div className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0891B2]/30 bg-[#0891B2]/5">
            <span className="font-mono-tech text-[12px] text-[#0C6E86] font-semibold">O MNIE</span>
          </div>
          <h1 className="mt-4 text-[#0A0E14] font-extrabold tracking-tight text-3xl lg:text-[2.6rem] leading-[1.1]">
            25 lat naprawiam elektronikę, której inni się nie podejmują
          </h1>
          <p className="mt-6 text-[#5A6770] text-lg leading-relaxed">
            Oferuję usługę naprawy urządzeń elektronicznych z 25-letnim doświadczeniem.
            Łączę pasję do technologii z rzetelną wiedzą techniczną - prowadzę RN Serwis
            Elektroniki w Sosnowcu jako jednoosobowy serwis, więc każde urządzenie
            osobiście diagnozuję i naprawiam od początku do końca.
          </p>
          <p className="mt-4 text-[#5A6770] text-lg leading-relaxed">
            Moim głównym celem jest przywracanie urządzeniom pełnej sprawności -
            zwłaszcza tam, gdzie inni rozkładają ręce. Specjalizuję się w zaawansowanej
            elektronice przemysłowej i użytkowej: sprzęcie audio vintage, elektronice
            motoryzacyjnej, automatyce domowej i HVAC, maszynach budowlanych
            i przemysłowych oraz urządzeniach unikalnych, które gdzie indziej trafiłyby
            na złom.
          </p>
        </Reveal>

        <div className="mt-14 space-y-8">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <div className="flex items-start gap-4">
                <span className="mt-1 grid place-items-center w-7 h-7 rounded-full bg-[#0891B2]/10 text-[#0891B2] shrink-0">
                  <Check className="w-4 h-4" strokeWidth={3} />
                </span>
                <div>
                  <h2 className="text-[#0A0E14] font-semibold text-lg">{r.title}</h2>
                  <p className="mt-1.5 text-[#5A6770] text-[15px] leading-relaxed">{r.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <Link
            href="/sterowniki"
            className="mt-14 inline-flex items-center gap-2 text-[#0C6E86] font-semibold text-sm hover:underline"
          >
            Zobacz moje najciekawsze realizacje
            <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
          </Link>
        </Reveal>
      </div>

      <div className="mt-16">
        <CTA />
      </div>
    </main>
  );
}
