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
  device: string;
  title: string;
  problem: string;
  fix: string;
  excerpt: string;
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
      "Naprawa wzmacniaczy, zasilaczy i modułów sterujących sprzętu audio - od domowego po estradowy.",
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

export const REALIZATIONS: Realization[] = [
  {
    slug: "falownik-regeneracja-modulu-mocy",
    category: "sterowniki",
    device: "Falownik",
    title: "Falownik — regeneracja modułu mocy",
    problem: "Brak napięcia wyjściowego, błąd overcurrent.",
    fix: "Regeneracja modułu mocy i sekcji sterującej.",
    excerpt:
      "Naprawa falownika zgłaszającego błąd overcurrent - regeneracja modułu mocy i sekcji sterującej.",
    image:
      "https://media.base44.com/images/public/6a82d6c0df5c8c71096f3b12/eacf23f7d_generated_93f965aa.png",
    date: "2026-06-01",
  },
  {
    slug: "sterownik-pralki-naprawa-po-zalaniu",
    category: "sterowniki",
    device: "Sterownik pralki",
    title: "Sterownik pralki — naprawa po zalaniu",
    problem: "Nie uruchamia się, ślady zalania.",
    fix: "Czyszczenie, naprawa ścieżek i wymiana uszkodzonych elementów.",
    excerpt:
      "Naprawa sterownika pralki po zalaniu - czyszczenie, regeneracja ścieżek i wymiana elementów.",
    image:
      "https://media.base44.com/images/public/6a82d6c0df5c8c71096f3b12/d33bb51cd_generated_c1f98b77.png",
    date: "2026-05-20",
  },
  {
    slug: "zasilacz-przemyslowy-niestabilne-napiecie",
    category: "sterowniki",
    device: "Zasilacz przemysłowy",
    title: "Zasilacz przemysłowy - niestabilne napięcie",
    problem: "Niestabilne napięcie, wyłącza się pod obciążeniem.",
    fix: "Wymiana kondensatorów i przebudowa sekcji zasilania.",
    excerpt:
      "Naprawa zasilacza przemysłowego wyłączającego się pod obciążeniem - wymiana kondensatorów.",
    image:
      "https://media.base44.com/images/public/6a82d6c0df5c8c71096f3b12/d8d340ed4_generated_556358f9.png",
    date: "2026-05-05",
  },
  {
    slug: "modul-ecu-blad-komunikacji",
    category: "motoryzacja",
    device: "Moduł samochodowy (ECU)",
    title: "Moduł ECU - błąd komunikacji, brak startu silnika",
    problem: "Błąd komunikacji, brak startu silnika.",
    fix: "Diagnostyka i ponowne wlutowanie układów sterujących.",
    excerpt:
      "Naprawa modułu ECU z błędem komunikacji uniemożliwiającym uruchomienie silnika.",
    image:
      "https://media.base44.com/images/public/6a82d6c0df5c8c71096f3b12/3b1ffa09d_generated_74a47bc5.png",
    date: "2026-04-18",
  },
  {
    slug: "powairbox-brak-lacznosci-z-centrala",
    category: "straz",
    device: "PowAirBox",
    title: "PowAirBox — brak łączności z centralą",
    problem: "Brak łączności z centralą, błąd czujnika ciśnienia.",
    fix: "Diagnostyka modułu sterującego i wymiana uszkodzonego czujnika.",
    excerpt:
      "Naprawa systemu PowAirBox wykorzystywanego przez jednostki Straży Pożarnej.",
    image: "/fire.jpg",
    date: "2026-03-10",
  },
  {
    slug: "wzmacniacz-audio-brak-sygnalu-na-kanale",
    category: "audio",
    device: "Wzmacniacz audio",
    title: "Wzmacniacz audio — brak sygnału na jednym kanale",
    problem: "Brak sygnału na jednym z kanałów, przydźwięk sieciowy.",
    fix: "Wymiana uszkodzonych tranzystorów mocy i kondensatorów filtrujących.",
    excerpt:
      "Naprawa wzmacniacza audio z brakiem sygnału na jednym kanale i przydźwiękiem sieciowym.",
    image: "/expertise.jpg",
    date: "2026-02-22",
  },
];

export function getCategorySlugs(): CategorySlug[] {
  return Object.keys(CATEGORIES) as CategorySlug[];
}

export function isCategorySlug(value: string): value is CategorySlug {
  return Object.prototype.hasOwnProperty.call(CATEGORIES, value);
}

export function getRealizationsByCategory(category: CategorySlug): Realization[] {
  return REALIZATIONS.filter((r) => r.category === category).sort((a, b) =>
    b.date.localeCompare(a.date),
  );
}

export function getRealization(category: CategorySlug, slug: string): Realization | undefined {
  return REALIZATIONS.find((r) => r.category === category && r.slug === slug);
}

export function getLatestRealizations(limit: number): Realization[] {
  return [...REALIZATIONS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

export function getRelatedRealizations(realization: Realization, limit = 3): Realization[] {
  return getRealizationsByCategory(realization.category)
    .filter((r) => r.slug !== realization.slug)
    .slice(0, limit);
}
