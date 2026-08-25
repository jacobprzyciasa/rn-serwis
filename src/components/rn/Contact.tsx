"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { MapPin, Phone, Truck, Upload, Send, Check } from "lucide-react";
import { PHONE, PHONE_TEL } from "@/utils/constants";
import Reveal from "./Reveal";

const INPUT_CLS =
  "w-full bg-transparent border-b border-black/15 focus:border-[#0891B2] py-3 text-[#0A0E14] placeholder:text-[#616B75] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0891B2] transition-colors text-[15px]";

type FormState = {
  name: string;
  phone: string;
  email: string;
  device: string;
  desc: string;
  file: File | null;
  consent: boolean;
};

const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  email: "",
  device: "",
  desc: "",
  file: null,
  consent: false,
};

export default function Contact({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set =
    (k: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val =
        k === "file"
          ? (e.target as HTMLInputElement).files?.[0] ?? null
          : k === "consent"
            ? (e.target as HTMLInputElement).checked
            : e.target.value;
      setForm((f) => ({ ...f, [k]: val }));
    };

  const valid =
    form.name && form.phone && form.email && form.desc && form.consent;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    setError(null);

    const body = new FormData();
    body.set("name", form.name);
    body.set("phone", form.phone);
    body.set("email", form.email);
    body.set("device", form.device);
    body.set("desc", form.desc);
    body.set("consent", String(form.consent));
    if (form.file) body.set("file", form.file);

    try {
      const res = await fetch("/api/contact", { method: "POST", body });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Nie udało się wysłać zapytania.");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nie udało się wysłać zapytania.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="kontakt"
      className={`relative bg-white tech-grid-bg ${compact ? "pt-10 pb-20 lg:pb-32" : "py-20 lg:py-32"}`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full border border-[#0891B2]/30 bg-[#0891B2]/5">
              <span className="font-mono-tech text-[12px] text-[#0C6E86] font-semibold">
                KONTAKT
              </span>
            </div>
            <h2 className="mt-3 text-[#0A0E14] font-extrabold tracking-tight text-3xl lg:text-[2.6rem] leading-[1.1]">
              Zapytaj o naprawę
            </h2>
            <p className="mt-4 text-[#5A6770] text-lg leading-relaxed">
              Opisz urządzenie i usterkę. Odpowiem telefonicznie lub e-mailem.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
          {/* Form */}
          <Reveal>
            <div className="rounded-2xl border border-black/8 bg-[#F7F8FA] p-6 lg:p-9">
              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <span className="grid place-items-center w-16 h-16 rounded-full bg-[#0891B2]/10 text-[#0891B2] mb-5">
                    <Check className="w-8 h-8" strokeWidth={2.5} />
                  </span>
                  <h3 className="text-[#0A0E14] font-semibold text-xl">Zapytanie wysłane</h3>
                  <p className="mt-2 text-[#5A6770]">Skontaktujemy się z Tobą wkrótce.</p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm(EMPTY_FORM);
                    }}
                    className="mt-6 text-[#0C6E86] text-sm font-medium hover:underline"
                  >
                    Wyślij kolejne zapytanie
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <label className="block">
                      <span className="font-mono-tech text-[10px] text-[#5A6770] uppercase tracking-wider">Imię i nazwisko</span>
                      <input className={INPUT_CLS} value={form.name} onChange={set("name")} placeholder="Jan Kowalski" required />
                    </label>
                    <label className="block">
                      <span className="font-mono-tech text-[10px] text-[#5A6770] uppercase tracking-wider">Telefon</span>
                      <input className={INPUT_CLS} value={form.phone} onChange={set("phone")} placeholder="123 456 789" inputMode="tel" required />
                    </label>
                  </div>
                  <label className="block">
                    <span className="font-mono-tech text-[10px] text-[#5A6770] uppercase tracking-wider">E-mail</span>
                    <input className={INPUT_CLS} value={form.email} onChange={set("email")} placeholder="jan@kowalski.com" type="email" required />
                  </label>
                  <label className="block">
                    <span className="font-mono-tech text-[10px] text-[#5A6770] uppercase tracking-wider">Rodzaj urządzenia</span>
                    <input className={INPUT_CLS} value={form.device} onChange={set("device")} placeholder="np. sterownik pralki, falownik, moduł ECU" />
                  </label>
                  <label className="block">
                    <span className="font-mono-tech text-[10px] text-[#5A6770] uppercase tracking-wider">Opis usterki</span>
                    <textarea className={INPUT_CLS + " resize-none min-h-[100px]"} value={form.desc} onChange={set("desc")} placeholder="Opisz objawy i historię usterki" required />
                  </label>

                  <label className="block">
                    <span className="font-mono-tech text-[10px] text-[#5A6770] uppercase tracking-wider">Zdjęcie / plik (opcjonalnie)</span>
                    <label className="mt-2 flex items-center gap-3 px-4 py-3.5 rounded-lg border border-dashed border-black/15 hover:border-[#0891B2]/50 transition-colors cursor-pointer">
                      <Upload className="w-5 h-5 text-[#0891B2]" strokeWidth={1.8} />
                      <span className="min-w-0 flex-1 text-[14px] text-[#5A6770] truncate">
                        {form.file ? form.file.name : "Kliknij, aby dodać zdjęcie uszkodzonego modułu"}
                      </span>
                      <input type="file" accept="image/*,.pdf" onChange={set("file")} className="hidden" />
                    </label>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={set("consent")}
                      className="mt-0.5 w-4 h-4 rounded border-black/20 bg-transparent accent-[#0891B2] shrink-0"
                      required
                    />
                    <span className="text-[12.5px] text-[#5A6770] leading-relaxed">
                      Wyrażam zgodę na wykorzystanie danych przesłanych w formularzu w zakresie potrzebnym do realizacji usługi.{" "}
                    </span>
                  </label>

                  {error && (
                    <p className="text-[13px] text-red-600 leading-relaxed">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={!valid || loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-[#0E7A95] text-white font-bold text-[15px] hover:bg-[#0A6880] active:scale-[0.99] transition-all shadow-[0_10px_32px_rgba(8,145,178,0.18)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    {loading ? "Wysyłanie…" : "Wyślij zapytanie"}
                    {!loading && <Send className="w-4 h-4" strokeWidth={2.2} />}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Contact details */}
          <Reveal delay={0.12}>
            <div className="space-y-4">
              <div className="rounded-2xl border border-black/8 bg-[#F7F8FA] p-7">
                <h3 className="text-[#0A0E14] font-semibold text-lg">RN Serwis Elektroniki</h3>
                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#0891B2] shrink-0 mt-0.5" strokeWidth={1.8} />
                    <div>
                      <p className="text-[#5A6770] text-sm">Adres</p>
                      <p className="text-[#0A0E14] text-[15px] mt-0.5">Dworska 12</p>
                      <p className="text-[#0A0E14] text-[15px]">41-219 Sosnowiec</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#0891B2] shrink-0 mt-0.5" strokeWidth={1.8} />
                    <div>
                      <p className="text-[#5A6770] text-sm">Telefon</p>
                      <a href={`tel:${PHONE_TEL}`} className="text-[#0A0E14] text-[15px] mt-0.5 hover:text-[#0891B2] transition-colors block">
                        {PHONE}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#0891B2]/20 bg-[#0891B2]/5 p-7">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-[#0891B2] shrink-0 mt-0.5" strokeWidth={1.8} />
                  <div>
                    <p className="text-[#1A2330] text-[15px] font-medium leading-relaxed">
                      Możliwe naprawy wysyłkowe oraz dojazd do klienta w Sosnowcu i okolicach.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
