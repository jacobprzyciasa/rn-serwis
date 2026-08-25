import { Star, ExternalLink } from "lucide-react";
import Reveal from "./Reveal";

const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=RN+Serwis+Elektroniki+Sosnowiec";
const SOCIABLEKIT_EMBED_ID = "25708170";

export default function Reviews() {
  return (
    <section id="opinie" className="relative py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full border border-[#0891B2]/30 bg-[#0891B2]/5">
              <span className="font-mono-tech text-[12px] text-[#0C6E86] font-semibold">
                OPINIE
              </span>
            </div>
            <h2 className="mt-6 text-[#0A0E14] font-extrabold tracking-tight text-3xl lg:text-[2.4rem] leading-[1.1]">
              Co mówią klienci?
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-xl border border-black/8 bg-[#F1F4F6] p-4 lg:p-6 overflow-hidden">
            {/* suppressHydrationWarning: SociableKit's script mutates this
                node's contents directly, outside React — without this, React
                treats that as a hydration mismatch and tears the subtree
                down. Plain <script>, matching their embed snippet exactly
                (order, defer) rather than next/script's client-side
                injection, in case their loader is sensitive to that. */}
            <div
              className="sk-ww-google-reviews"
              data-embed-id={SOCIABLEKIT_EMBED_ID}
              suppressHydrationWarning
            />
            <script src="https://widgets.sociablekit.com/google-reviews/widget.js" defer />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-6 text-center">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-black/15 text-[#0A0E14] font-semibold text-sm hover:border-[#0891B2] hover:text-[#0891B2] transition-colors"
            >
              <Star className="w-4 h-4 fill-[#0891B2] text-[#0891B2]" />
              Zobacz wszystkie opinie w Google
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
