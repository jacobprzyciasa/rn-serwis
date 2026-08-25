import type { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/rn/Contact";
import MapSection from "@/components/rn/MapSection";
import Reveal from "@/components/rn/Reveal";
import { SITE_URL } from "@/utils/constants";

const TITLE = "Kontakt";
const DESCRIPTION =
  "Skontaktuj się z RN Serwis Elektroniki w Sosnowcu — telefonicznie, przez formularz lub wysyłkowo. Odpowiadam na zapytania o naprawę elektroniki.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/kontakt" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/kontakt`,
  },
};

export default function KontaktPage() {
  return (
    <main>
      <div className="pt-28 lg:pt-36 bg-white tech-grid-bg">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <nav aria-label="Breadcrumb" className="font-mono-tech text-[11px] text-[#616B75]">
              <Link href="/" className="hover:text-[#0891B2] transition-colors">Start</Link>
              <span className="mx-2">/</span>
              <span className="text-[#5A6770]">Kontakt</span>
            </nav>
            <h1 className="mt-4 text-[#0A0E14] font-extrabold tracking-tight text-3xl lg:text-[2.6rem] leading-[1.1] max-w-2xl">
              Skontaktuj się ze mną
            </h1>
          </Reveal>
        </div>
      </div>
      <Contact compact />
      <MapSection />
    </main>
  );
}
