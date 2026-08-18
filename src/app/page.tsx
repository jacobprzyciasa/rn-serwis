import Hero from "@/components/rn/Hero";
import USP from "@/components/rn/USP";
import About from "@/components/rn/About";
import Services from "@/components/rn/Services";
import PowAirBox from "@/components/rn/PowAirBox";
import Process from "@/components/rn/Process";
import Realizations from "@/components/rn/Realizations";
import Reviews from "@/components/rn/Reviews";
import CTA from "@/components/rn/CTA";
import Contact from "@/components/rn/Contact";
import MapSection from "@/components/rn/MapSection";

// The Realizations section is Contentful-backed — keep it reasonably fresh.
export const revalidate = 300;

export default function Home() {
  return (
    <main>
      <Hero />
      <USP />
      <About />
      <Services />
      <PowAirBox />
      <Process />
      <Realizations />
      <Reviews />
      <CTA />
      <Contact />
      <MapSection />
    </main>
  );
}
