import Reveal from "./Reveal";

const STEPS = [
  { n: "01", title: "Kontakt", desc: "Opisz urządzenie i problem - telefonicznie lub przez formularz." },
  { n: "02", title: "Diagnoza", desc: "Sprawdzam urządzenie i określam przyczynę usterki." },
  { n: "03", title: "Naprawa", desc: "Naprawiam lub regeneruję uszkodzone elementy." },
  { n: "04", title: "Odbiór / wysyłka", desc: "Odbierasz urządzenie osobiście lub otrzymujesz je przesyłką." },
];

export default function Process() {
  return (
    <section className="relative py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full border border-[#0891B2]/30 bg-[#0891B2]/5">
              <span className="font-mono-tech text-[12px] text-[#0891B2] font-semibold">
                PROCES
              </span>
            </div>
            <h2 className="mt-3 text-[#0A0E14] font-extrabold tracking-tight text-3xl lg:text-[2.6rem] leading-[1.1]">
              Jak wygląda naprawa?
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 relative">
          {/* horizontal line desktop */}
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-linear-to-r from-[#0891B2]/10 via-[#0891B2]/30 to-[#0891B2]/10" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="relative">
                  <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
                    <span className="relative grid place-items-center w-14 h-14 rounded-full bg-white border border-[#0891B2]/30 text-[#0891B2] font-mono-tech font-semibold text-lg shrink-0 z-10">
                      {s.n}
                    </span>
                    {/* vertical connector mobile */}
                    {i < STEPS.length  && (
                      <div className="lg:hidden flex-1 h-px bg-linear-to-r from-[#0891B2]/30 to-transparent" />
                    )}
                  </div>
                  <h3 className="mt-5 text-[#0A0E14] font-semibold text-lg">{s.title}</h3>
                  <p className="mt-2 text-[#5A6770] text-[15px] leading-relaxed max-w-xs">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
