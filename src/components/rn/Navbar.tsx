"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { PHONE, PHONE_TEL } from "@/utils/constants";
import { NAV_ITEMS, SUBPAGES, isNavDropdown } from "@/utils/nav"
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/rn_final_combo_white_trans.png";

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
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="RN Serwis Elektroniki — strona główna">
            <Image src={Logo} alt="RN Serwis Elektroniki" sizes="120px" className="w-30 invert-100" />
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) =>
              isNavDropdown(item) ? (
                <li key={item.label} className="relative group">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 px-3.5 py-2 text-[13.5px] font-medium text-[#5A6770] hover:text-[#0A0E14] transition-colors rounded-md hover:bg-black/5"
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" strokeWidth={2} />
                  </button>
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                    <div className="min-w-47.5 rounded-lg border border-black/10 bg-white shadow-[0_12px_32px_rgba(10,14,20,0.12)] p-1.5">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3.5 py-2.5 rounded-md text-[13.5px] font-medium text-[#5A6770] hover:text-[#0A0E14] hover:bg-black/5 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="px-3.5 py-2 text-[13.5px] font-medium text-[#5A6770] hover:text-[#0A0E14] transition-colors rounded-md hover:bg-black/5"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${PHONE_TEL}`}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#0E7A95] text-white font-semibold text-[13px] hover:bg-[#0A6880] active:scale-[0.98] transition-all shadow-[0_8px_24px_rgba(8,145,178,0.25)]"
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
        className={`fixed inset-0 z-[60] overflow-hidden lg:hidden transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[#F7F8FA]/95 backdrop-blur-xl" onClick={() => setOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-[82%] max-w-sm bg-white border-l border-black/10 p-6 flex flex-col transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-end mb-10">
            <button
              onClick={() => setOpen(false)}
              className="grid place-items-center w-10 h-10 rounded-md border border-black/10 text-[#0A0E14]"
              aria-label="Zamknij menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <ul className="flex flex-col gap-1">
            {SUBPAGES.map((l, i) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 py-3.5 text-lg font-semibold text-[#0A0E14] border-b border-black/5"
                >
                  <span className="font-mono-tech text-[11px] text-[#0C6E86]">0{i + 1}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={`tel:${PHONE_TEL}`}
            onClick={() => setOpen(false)}
            className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-md bg-[#0E7A95] text-white font-bold"
          >
            <Phone className="w-5 h-5" strokeWidth={2.4} />
            Zadzwoń: {PHONE}
          </a>
        </div>
      </div>
    </>
  );
}
