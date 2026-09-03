export interface NavLink {
  label: string;
  href: string;
}

export interface NavDropdown {
  label: string;
  children: NavLink[];
}

export type NavItem = NavLink | NavDropdown;

export function isNavDropdown(item: NavItem): item is NavDropdown {
  return "children" in item;
}

export const CATEGORY_LINKS: NavLink[] = [
  { label: "Straż Pożarna", href: "/straz" },
  { label: "Audio", href: "/audio" },
  { label: "Motoryzacja", href: "/motoryzacja" },
  { label: "Przemysł", href: "/przemysl" },
  { label: "Różne", href: "/rozne" },
];

// Desktop nav: category pages are grouped under a single "Realizacje" dropdown.
export const NAV_ITEMS: NavItem[] = [
  { label: "Start", href: "/" },
  { label: "Realizacje", children: CATEGORY_LINKS },
  { label: "Galeria", href: "/galeria" },
  { label: "O mnie", href: "/o-mnie" },
  { label: "Kontakt", href: "/kontakt" },
];

// Flat list for contexts without dropdown UI (mobile menu, footer).
export const SUBPAGES: NavLink[] = [
  { label: "Start", href: "/" },
  ...CATEGORY_LINKS,
  { label: "Galeria", href: "/galeria" },
  { label: "O mnie", href: "/o-mnie" },
  { label: "Kontakt", href: "/kontakt" },
];
