"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { PHONE, PHONE_TEL } from "./constants";

const LINKS = [
  { label: "Start", href: "#start" },
  { label: "O serwisie", href: "#o-serwisie" },
  { label: "Usługi", href: "#uslugi" },
  { label: "Realizacje", href: "#realizacje" },
  { label: "Opinie", href: "#opinie" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#F7F8FA]/85 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
          <a href="#start" className="flex items-center gap-2.5 group" aria-label="RN Serwis Elektroniki — strona główna">
            <span className="relative grid place-items-center w-9 h-9 rounded-md border border-[#0891B2]/40 bg-white">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#0891B2" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M7 12h3l1.5-3 1.5 6 1.5-3h3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[#0A0E14] font-bold text-[15px] tracking-tight">RN Serwis Elektroniki</span>
              <span className="font-mono-tech text-[10px] text-[#5A6770] mt-0.5">ELECTRONICS REPAIR · SOSNOWIEC</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="px-3.5 py-2 text-[13.5px] font-medium text-[#5A6770] hover:text-[#0A0E14] transition-colors rounded-md hover:bg-black/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${PHONE_TEL}`}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#0891B2] text-white font-semibold text-[13px] hover:bg-[#0E7A95] active:scale-[0.98] transition-all shadow-[0_8px_24px_rgba(8,145,178,0.25)]"
            >
              <Phone className="w-4 h-4" strokeWidth={2.4} />
              {PHONE}
            </a>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden grid place-items-center w-10 h-10 rounded-md border border-black/10 text-[#0A0E14]"
              aria-label="Otwórz menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[#F7F8FA]/95 backdrop-blur-xl" onClick={() => setOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-[82%] max-w-sm bg-white border-l border-black/10 p-6 flex flex-col transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <span className="font-mono-tech text-[10px] text-[#5A6770]">[ NAV MENU ]</span>
            <button
              onClick={() => setOpen(false)}
              className="grid place-items-center w-10 h-10 rounded-md border border-black/10 text-[#0A0E14]"
              aria-label="Zamknij menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <ul className="flex flex-col gap-1">
            {LINKS.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 py-3.5 text-lg font-semibold text-[#0A0E14] border-b border-black/5"
                >
                  <span className="font-mono-tech text-[11px] text-[#0891B2]">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`tel:${PHONE_TEL}`}
            onClick={() => setOpen(false)}
            className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-md bg-[#0891B2] text-white font-bold"
          >
            <Phone className="w-5 h-5" strokeWidth={2.4} />
            Zadzwoń: {PHONE}
          </a>
        </div>
      </div>
    </>
  );
}
