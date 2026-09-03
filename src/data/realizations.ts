import { fetchRealizationEntries, type RealizationEntry } from "@/lib/contentful";

export type CategorySlug = "straz" | "audio" | "motoryzacja" | "przemysl" | "rozne";

export interface CategoryInfo {
  slug: CategorySlug;
  label: string;
  title: string;
  description: string;
}

export interface Realization {
  slug: string;
  category: CategorySlug;
  title: string;
  fix: string;
  image: string;
  additionalPhotos: string[];
  date: string;
}

export const CATEGORIES: Record<CategorySlug, CategoryInfo> = {
  straz: {
    slug: "straz",
    label: "Straż Pożarna",
    title: "Serwis PowAirBox i elektroniki dla Straży Pożarnej",
    description:
      "Serwis urządzeń PowAirBox marki LEAB oraz pozostałej elektroniki pojazdów ratowniczo-gaśniczych - modulatorów, oświetlenia i systemów powiadamiania. Naprawa zwykle w ciągu 1 dnia roboczego, z gwarancją i fakturą z odroczonym terminem płatności.",
  },
  audio: {
    slug: "audio",
    label: "Audio",
    title: "Naprawa sprzętu audio vintage",
    description:
      "Naprawa wzmacniaczy, gramofonów i innego sprzętu audio vintage - przywracam klasycznemu brzmieniu dawny blask.",
  },
  motoryzacja: {
    slug: "motoryzacja",
    label: "Motoryzacja",
    title: "Naprawa elektroniki samochodowej",
    description:
      "Diagnostyka i naprawa modułów sterujących (ECU) oraz elektroniki samochodów osobowych, ciężarowych i pojazdów specjalnych.",
  },
  przemysl: {
    slug: "przemysl",
    label: "Przemysł",
    title: "Naprawa sterowników i automatyki przemysłowej",
    description:
      "Naprawa sterowników maszyn, falowników, zasilaczy przemysłowych oraz urządzeń gastronomicznych.",
  },
  rozne: {
    slug: "rozne",
    label: "Różne",
    title: "Różne urządzenia elektroniczne",
    description:
      "Naprawa urządzeń elektronicznych różnych typów.",
  },
};

export function getCategorySlugs(): CategorySlug[] {
  return Object.keys(CATEGORIES) as CategorySlug[];
}

export function isCategorySlug(value: string): value is CategorySlug {
  return Object.prototype.hasOwnProperty.call(CATEGORIES, value);
}

function mapEntry(entry: RealizationEntry): Realization | null {
  const f = entry.fields;

  if (!f.category || !isCategorySlug(f.category)) {
    console.warn(
      `[contentful] Realizacja "${f.title ?? entry.sys.id}" ma nieprawidłową kategorię ("${f.category}") — pomijam. Dozwolone: ${getCategorySlugs().join(", ")}.`,
    );
    return null;
  }

  const photo = f.photo && "fields" in f.photo ? f.photo : undefined;
  const fileUrl = photo?.fields?.file?.url;
  if (!fileUrl) {
    console.warn(
      `[contentful] Realizacja "${f.title ?? entry.sys.id}" nie ma zdjęcia (pole "photo") — pomijam.`,
    );
    return null;
  }

  const additionalPhotos = (f.additionalPhotos ?? [])
    .map((asset) => {
      const additionalFileUrl = asset && "fields" in asset ? asset.fields?.file?.url : undefined;
      return additionalFileUrl
        ? additionalFileUrl.startsWith("//")
          ? `https:${additionalFileUrl}`
          : additionalFileUrl
        : null;
    })
    .filter((url): url is string => url !== null);

  return {
    slug: f.slug,
    category: f.category,
    title: f.title,
    fix: f.fix,
    image: fileUrl.startsWith("//") ? `https:${fileUrl}` : fileUrl,
    additionalPhotos,
    date: f.realizationDate.slice(0, 10),
  };
}

// Contentful query already orders by -fields.realizationDate, so results
// arrive newest-first — no need to re-sort here.
export async function getAllRealizations(): Promise<Realization[]> {
  const entries = await fetchRealizationEntries();
  return entries.map(mapEntry).filter((r): r is Realization => r !== null);
}

export async function getRealizationsByCategory(category: CategorySlug): Promise<Realization[]> {
  const all = await getAllRealizations();
  return all.filter((r) => r.category === category);
}

export async function getRealization(
  category: CategorySlug,
  slug: string,
): Promise<Realization | undefined> {
  const all = await getAllRealizations();
  return all.find((r) => r.category === category && r.slug === slug);
}

export async function getLatestRealizations(limit: number): Promise<Realization[]> {
  const all = await getAllRealizations();
  return all.slice(0, limit);
}

export async function getRelatedRealizations(
  realization: Realization,
  limit = 3,
): Promise<Realization[]> {
  const categoryItems = await getRealizationsByCategory(realization.category);
  return categoryItems.filter((r) => r.slug !== realization.slug).slice(0, limit);
}
