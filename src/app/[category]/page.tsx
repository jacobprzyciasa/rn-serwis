import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "@/components/rn/Reveal";
import CTA from "@/components/rn/CTA";
import {
  CATEGORIES,
  getCategorySlugs,
  getRealizationsByCategory,
  isCategorySlug,
} from "@/data/realizations";
import { SITE_URL } from "@/utils/constants";
import { ctfImg } from "@/utils/image";

// Extra content shown only on the "straz" category page — the PSP/OSP offer
// is much richer than a generic category blurb, so it gets a dedicated block
// instead of forcing every category into the same shape.
const STRAZ_TRUST_POINTS = [
  "Doświadczenie: kilkadziesiąt udanych napraw w jednostkach na terenie województwa śląskiego.",
  "Błyskawiczny czas reakcji: naprawę realizuję zazwyczaj w ciągu 1 dnia roboczego.",
  "Elastyczne płatności: znam procedury obiegu dokumentacji w budżetówce, wystawiam faktury z odroczonym terminem płatności.",
  "Gwarancja na każdą wykonaną naprawę.",
  "Prowadzę legalną działalność gospodarczą.",
];

const STRAZ_EQUIPMENT = [
  "Modulatory i belki sygnalizacyjne (Federal Signal, Gamet, Elektra, Elfir)",
  "Oświetlenie dodatkowe i robocze",
  "Urządzenia przenośne, mierniki, detektory i kamery",
  "Systemy powiadamiania z wyświetlaczami (DIGITEX, PLATAN, DWA)",
];

// Categories are a fixed set of 4 — unknown ones should 404, not render
// on-demand. Realization *lists* within a category still come from
// Contentful, so refresh the cached page periodically.
export const dynamicParams = false;
export const revalidate = 300;

export function generateStaticParams() {
  return getCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[category]">): Promise<Metadata> {
  const { category } = await params;
  if (!isCategorySlug(category)) return {};

  const info = CATEGORIES[category];
  return {
    title: info.title,
    description: info.description,
    alternates: { canonical: `/${info.slug}` },
    openGraph: {
      type: "website",
      title: info.title,
      description: info.description,
      url: `${SITE_URL}/${info.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps<"/[category]">) {
  const { category } = await params;
  if (!isCategorySlug(category)) notFound();

  const info = CATEGORIES[category];
  const realizations = await getRealizationsByCategory(category);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: info.label, item: `${SITE_URL}/${info.slug}` },
    ],
  };

  return (
    <main className="relative py-28 lg:py-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <nav aria-label="Breadcrumb" className="font-mono-tech text-[11px] text-[#616B75]">
            <Link href="/" className="hover:text-[#0891B2] transition-colors">Start</Link>
            <span className="mx-2">/</span>
            <span className="text-[#5A6770]">{info.label}</span>
          </nav>

          <div className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0891B2]/30 bg-[#0891B2]/5">
            <span className="font-mono-tech text-[12px] text-[#0C6E86] font-semibold">
              REALIZACJE — {info.label.toUpperCase()}
            </span>
          </div>
          <h1 className="mt-4 text-[#0A0E14] font-extrabold tracking-tight text-3xl lg:text-[2.6rem] leading-[1.1] max-w-2xl">
            {info.title}
          </h1>
          <p className="mt-4 text-[#5A6770] text-lg leading-relaxed max-w-2xl">
            {info.description}
          </p>
        </Reveal>

        {category === "straz" && (
          <Reveal delay={0.06}>
            <div className="mt-10 grid md:grid-cols-2 gap-5">
              <div className="rounded-xl border border-black/8 bg-white p-6">
                <h2 className="text-[#0A0E14] font-semibold text-lg mb-4">
                  Dlaczego warto mi zaufać?
                </h2>
                <ul className="space-y-3">
                  {STRAZ_TRUST_POINTS.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span className="mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-[#0891B2]/10 text-[#0891B2] shrink-0">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-[#5A6770] text-[14px] leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-black/8 bg-white p-6">
                <h2 className="text-[#0A0E14] font-semibold text-lg mb-4">
                  Dodatkowo serwisuję wyposażenie pojazdów bojowych
                </h2>
                <ul className="space-y-2.5">
                  {STRAZ_EQUIPMENT.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[14px] text-[#5A6770]">
                      <span className="mt-2 w-1 h-1 rounded-full bg-[#0891B2]/60 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[13px] text-[#616B75] leading-relaxed">
                  Działam lokalnie (Sosnowiec i okolice, z możliwością dojazdu) oraz
                  ogólnopolsko - naprawy realizuję również wysyłkowo.
                </p>
              </div>
            </div>
            <p className="mt-6 text-[#5A6770] text-[14px] leading-relaxed max-w-2xl">
              Chętnie nawiążę też współpracę z innymi służbami mundurowymi: Zespołami
              Ratownictwa Medycznego (Pogotowie Ratunkowe), Policją i Strażą Miejską,
              Wojskiem oraz Służbą Więzienną.
            </p>
          </Reveal>
        )}

        {realizations.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {realizations.map((it, i) => (
              <Reveal key={it.slug} delay={(i % 3) * 0.07}>
                <Link
                  href={`/${it.category}/${it.slug}`}
                  className="group block h-full rounded-xl overflow-hidden border border-black/8 bg-white hover:border-[#0891B2]/40 transition-colors"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ctfImg(it.image, 600)}
                      alt={it.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent" />
                    <ArrowUpRight className="absolute top-2.5 right-2.5 w-5 h-5 text-[#0891B2]/0 group-hover:text-[#0891B2] transition-colors" />
                  </div>
                  <div className="p-5 h-44 overflow-hidden">
                    <time
                      dateTime={it.date}
                      className="font-mono-tech text-[10px] text-[#616B75] uppercase tracking-wider"
                    >
                      {new Date(it.date).toLocaleDateString("pl-PL", {
                        year: "numeric",
                        month: "long",
                      })}
                    </time>
                    <h2 className="mt-1 text-[#0A0E14] font-semibold text-[16px] line-clamp-2">{it.title}</h2>
                    <p className="mt-3 text-[13px] text-[#5A6770] leading-relaxed line-clamp-3">
                      <span className="text-[#0C6E86]">Naprawa:</span> {it.fix}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <p className="mt-12 text-[#5A6770] text-lg">
              Pierwsze realizacje z tej kategorii pojawią się już wkrótce.
            </p>
          </Reveal>
        )}
      </div>

      <div className="mt-8">
        <CTA />
      </div>
    </main>
  );
}
