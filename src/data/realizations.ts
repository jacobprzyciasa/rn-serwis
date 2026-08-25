import { fetchRealizationEntries, type RealizationEntry } from "@/lib/contentful";

export type CategorySlug = "straz" | "audio" | "motoryzacja" | "sterowniki";

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
  date: string;
}

export const CATEGORIES: Record<CategorySlug, CategoryInfo> = {
  straz: {
    slug: "straz",
    label: "Straż",
    title: "Naprawa elektroniki dla Straży Pożarnej",
    description:
      "Serwis i naprawa sterowników oraz urządzeń wykorzystywanych przez jednostki Straży Pożarnej, w tym systemów PowAirBox.",
  },
  audio: {
    slug: "audio",
    label: "Audio",
    title: "Naprawa sprzętu audio",
    description:
      "Naprawa wzmacniaczy, zasilaczy i modułów sterujących sprzętu audio — od domowego po estradowy.",
  },
  motoryzacja: {
    slug: "motoryzacja",
    label: "Motoryzacja",
    title: "Naprawa elektroniki samochodowej",
    description:
      "Diagnostyka i naprawa modułów sterujących (ECU) oraz elektroniki samochodów osobowych, ciężarowych i pojazdów specjalnych.",
  },
  sterowniki: {
    slug: "sterowniki",
    label: "Sterowniki",
    title: "Naprawa sterowników i automatyki przemysłowej",
    description:
      "Naprawa sterowników maszyn, falowników, zasilaczy przemysłowych oraz sterowników sprzętu AGD.",
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

  return {
    slug: f.slug,
    category: f.category,
    title: f.title,
    fix: f.fix,
    image: fileUrl.startsWith("//") ? `https:${fileUrl}` : fileUrl,
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
