import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/rn/Navbar";
import Footer from "@/components/rn/Footer";
import MobileBar from "@/components/rn/MobileBar";
import { BUSINESS_ADDRESS, INSTAGRAM_URL, PHONE_TEL, SITE_NAME, SITE_URL } from "@/utils/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "latin-ext"],
});

const DESCRIPTION =
  "25 lat doświadczenia w naprawie elektroniki użytkowej, przemysłowej, motoryzacyjnej oraz urządzeń dla służb mundurowych (PowAirBox). Sosnowiec i okolice, naprawy wysyłkowe.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - naprawa elektroniki Sosnowiec`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: SITE_NAME,
    title: `${SITE_NAME} - naprawa elektroniki Sosnowiec`,
    description: DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - naprawa elektroniki Sosnowiec`,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F8FA",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  url: SITE_URL,
  telephone: PHONE_TEL,
  address: {
    "@type": "PostalAddress",
    ...BUSINESS_ADDRESS,
  },
  areaServed: "Sosnowiec i okolice",
  sameAs: [INSTAGRAM_URL],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F8FA]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Navbar />
        {children}
        <Footer />
        <MobileBar />
        <Analytics />
      </body>
    </html>
  );
}
