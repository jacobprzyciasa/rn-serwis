import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import Reveal from "@/components/rn/Reveal";
import {
  CATEGORIES,
  REALIZATIONS,
  getRealization,
  getRelatedRealizations,
  isCategorySlug,
} from "@/data/realizations";
import { PHONE, PHONE_TEL, SITE_URL } from "@/utils/constants";

export const dynamicParams = false;

export function generateStaticParams() {
  return REALIZATIONS.map((r) => ({ category: r.category, slug: r.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await params;
  if (!isCategorySlug(category)) return {};
  const realization = getRealization(category, slug);
  if (!realization) return {};

  const url = `${SITE_URL}/${category}/${slug}`;

  return {
    title: realization.title,
    description: realization.excerpt,
    alternates: { canonical: `/${category}/${slug}` },
    openGraph: {
      type: "article",
      title: realization.title,
      description: realization.excerpt,
      url,
      images: [{ url: realization.image }],
      publishedTime: realization.date,
      section: CATEGORIES[category].label,
    },
  };
}

export default async function RealizationPage({
  params,
}: PageProps<"/[category]/[slug]">) {
  const { category, slug } = await params;
  if (!isCategorySlug(category)) notFound();

  const realization = getRealization(category, slug);
  if (!realization) notFound();

  const info = CATEGORIES[category];
  const related = getRelatedRealizations(realization);
  const url = `${SITE_URL}/${category}/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: realization.title,
    description: realization.excerpt,
    image: [realization.image],
    datePublished: realization.date,
    dateModified: realization.date,
    articleSection: info.label,
    author: { "@type": "Organization", name: "RN Serwis Elektroniki" },
    publisher: { "@type": "Organization", name: "RN Serwis Elektroniki" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: info.label, item: `${SITE_URL}/${info.slug}` },
      { "@type": "ListItem", position: 3, name: realization.title, item: url },
    ],
  };

  return (
    <main className="relative py-28 lg:py-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <article className="max-w-3xl mx-auto px-5 lg:px-8">
        <Reveal>
          <nav aria-label="Breadcrumb" className="font-mono-tech text-[11px] text-[#8A95A0]">
            <Link href="/" className="hover:text-[#0891B2] transition-colors">Start</Link>
            <span className="mx-2">/</span>
            <Link href={`/${info.slug}`} className="hover:text-[#0891B2] transition-colors">
              {info.label}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#5A6770]">{realization.device}</span>
          </nav>

          <div className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0891B2]/30 bg-[#0891B2]/5">
            <span className="font-mono-tech text-[12px] text-[#0891B2] font-semibold">
              {info.label.toUpperCase()}
            </span>
          </div>
          <h1 className="mt-4 text-[#0A0E14] font-extrabold tracking-tight text-3xl lg:text-[2.4rem] leading-[1.1]">
            {realization.title}
          </h1>
          <time
            dateTime={realization.date}
            className="mt-3 block font-mono-tech text-[12px] text-[#8A95A0]"
          >
            {new Date(realization.date).toLocaleDateString("pl-PL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 relative aspect-[16/9] rounded-2xl overflow-hidden border border-black/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={realization.image}
              alt={`${realization.device} — naprawiony moduł`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 space-y-7">
            <div>
              <h2 className="text-[#0A0E14] font-semibold text-lg">Problem</h2>
              <p className="mt-2 text-[#5A6770] text-[15px] leading-relaxed">{realization.problem}</p>
            </div>
            <div>
              <h2 className="text-[#0A0E14] font-semibold text-lg">Naprawa</h2>
              <p className="mt-2 text-[#5A6770] text-[15px] leading-relaxed">{realization.fix}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-col sm:flex-row gap-3.5">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-[#0891B2] text-white font-bold text-[15px] hover:bg-[#0E7A95] active:scale-[0.98] transition-all shadow-[0_10px_32px_rgba(8,145,178,0.22)]"
            >
              <Phone className="w-5 h-5" strokeWidth={2.4} />
              Zadzwoń {PHONE}
            </a>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md border border-black/15 text-[#0A0E14] font-semibold text-[15px] hover:border-[#0891B2] hover:text-[#0891B2] transition-colors"
            >
              Masz podobny problem? Napisz
              <ArrowRight className="w-5 h-5" strokeWidth={2.2} />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <Link
            href={`/${info.slug}`}
            className="mt-12 inline-flex items-center gap-2 text-[#0891B2] font-semibold text-sm hover:underline"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.2} />
            Zobacz wszystkie realizacje: {info.label}
          </Link>
        </Reveal>

        {related.length > 0 && (
          <Reveal delay={0.24}>
            <div className="mt-16 pt-10 border-t border-black/5">
              <h2 className="text-[#0A0E14] font-semibold text-lg mb-5">Podobne realizacje</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/${r.category}/${r.slug}`}
                    className="group rounded-xl overflow-hidden border border-black/8 bg-white hover:border-[#0891B2]/40 transition-colors"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={r.image}
                        alt={`${r.device} — naprawiony moduł`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-[#0A0E14] font-semibold text-[15px]">{r.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </article>
    </main>
  );
}
