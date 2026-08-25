import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { CATEGORIES, getLatestRealizations } from "@/data/realizations";

export default async function Realizations() {
  const items = await getLatestRealizations(4);

  return (
    <section id="realizacje" className="relative py-20 lg:py-32 bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full border border-[#0891B2]/30 bg-[#0891B2]/5">
                <span className="font-mono-tech text-[12px] text-[#0891B2] font-semibold">
                  REALIZACJE
                </span>
              </div>
              <h2 className="mt-3 text-[#0A0E14] font-extrabold tracking-tight text-3xl lg:text-[2.6rem] leading-[1.1]">
                Wybrane realizacje
              </h2>
              <p className="mt-4 text-[#5A6770] text-lg leading-relaxed">
                Zobacz najciekawsze realizacje mojego serwisu!
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <Reveal key={it.slug} delay={(i % 4) * 0.07}>
              <Link
                href={`/${it.category}/${it.slug}`}
                className="group block h-full rounded-xl overflow-hidden border border-black/8 bg-white hover:border-[#0891B2]/40 transition-colors"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.image}
                    alt={it.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-white/85 backdrop-blur border border-black/10 font-mono-tech text-[9px] text-[#0891B2]">
                    {CATEGORIES[it.category].label.toUpperCase()}
                  </div>
                  <ArrowUpRight className="absolute top-2.5 right-2.5 w-5 h-5 text-[#0891B2]/0 group-hover:text-[#0891B2] transition-colors" />
                </div>
                <div className="p-5 h-40 overflow-hidden">
                  <span className="font-mono-tech text-[10px] text-[#8A95A0] uppercase tracking-wider">REALIZACJA</span>
                  <h3 className="mt-1 text-[#0A0E14] font-semibold text-[16px] line-clamp-2">{it.title}</h3>
                  <p className="mt-3 text-[13px] text-[#5A6770] leading-relaxed line-clamp-2">
                    <span className="text-[#0891B2]">Naprawa:</span> {it.fix}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {Object.values(CATEGORIES).map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="px-4 py-2 rounded-full border border-black/10 text-[13px] font-medium text-[#5A6770] hover:border-[#0891B2]/40 hover:text-[#0891B2] transition-colors"
              >
                Realizacje: {cat.label}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
