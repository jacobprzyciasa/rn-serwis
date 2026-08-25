import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/rn/Reveal";
import CTA from "@/components/rn/CTA";
import GalleryGrid from "@/components/rn/GalleryGrid";
import { getGalleryPhotos } from "@/data/gallery";
import { SITE_URL } from "@/utils/constants";

const TITLE = "Galeria";
const DESCRIPTION =
  "Zdjęcia z serwisu RN Serwis Elektroniki — stanowisko pracy, naprawiane urządzenia i realizacje.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/galeria" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/galeria`,
  },
};

// Photos are managed by the client in Contentful — keep the grid reasonably fresh.
export const revalidate = 300;

export default async function GaleriaPage() {
  const photos = await getGalleryPhotos();

  return (
    <main className="relative py-28 lg:py-36 tech-grid-bg">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <nav aria-label="Breadcrumb" className="font-mono-tech text-[11px] text-[#616B75]">
            <Link href="/" className="hover:text-[#0891B2] transition-colors">Start</Link>
            <span className="mx-2">/</span>
            <span className="text-[#5A6770]">Galeria</span>
          </nav>

          <div className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0891B2]/30 bg-[#0891B2]/5">
            <span className="font-mono-tech text-[12px] text-[#0C6E86] font-semibold">GALERIA</span>
          </div>
          <h1 className="mt-4 text-[#0A0E14] font-extrabold tracking-tight text-3xl lg:text-[2.6rem] leading-[1.1] max-w-2xl">
            Zdjęcia z serwisu
          </h1>
          <p className="mt-4 text-[#5A6770] text-lg leading-relaxed max-w-2xl">
            Stanowisko pracy, naprawiane urządzenia i kulisy realizacji.
          </p>
        </Reveal>

        {photos.length > 0 ? (
          <GalleryGrid photos={photos} />
        ) : (
          <Reveal>
            <p className="mt-12 text-[#5A6770] text-lg">
              Pierwsze zdjęcia pojawią się już wkrótce.
            </p>
          </Reveal>
        )}
      </div>

      <div className="mt-16">
        <CTA />
      </div>
    </main>
  );
}
