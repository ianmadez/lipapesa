import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/config/site";
import { Schibsted_Grotesk, Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/i18n/LanguageContext";
import "./globals.css";

// Display: Schibsted Grotesk (editorial). Body/UI: Geist. Data: Geist Mono. See ADR-011.
const display = Schibsted_Grotesk({ subsets: ["latin"], weight: ["600", "700", "800", "900"], variable: "--font-display" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL + "/"),
  title: {
    default: "LipaPesa — Affordable and accessible digital payments",
    template: "%s · LipaPesa",
  },
  description:
    "Affordable and accessible digital payments in Tanzania. Take payments from Vodacom M-Pesa, Mix by Yas, Airtel Money, Halopesa and VISA with one integration. Pay bills, send money and buy airtime in Tanzania.",
  applicationName: "LipaPesa",
  keywords: ["LipaPesa", "Tanzania payments", "M-Pesa API", "Airtel Money", "Mix by Yas", "Halopesa", "STK Push", "Lipa Namba", "Wakala", "Edu-Pay", "malipo ya simu"],
  authors: [{ name: "LIPATECH Tanzania Limited" }],
  alternates: { canonical: "./", languages: { "en-TZ": "./", "sw-TZ": "./" } },
  openGraph: {
    type: "website",
    siteName: "LipaPesa",
    locale: "en_TZ",
    alternateLocale: ["sw_TZ"],
    url: "./",
    images: [{ url: "og.png", width: 1200, height: 630, alt: "LipaPesa — Affordable and accessible digital payments" }],
  },
  twitter: { card: "summary_large_image", images: ["og.png"] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#061526",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "LipaPesa",
  legalName: "LIPATECH Tanzania Limited",
  url: SITE_URL,
  email: "info@lipapesa.co.tz",
  areaServed: "TZ",
  address: { "@type": "PostalAddress", streetAddress: "Ali Hassan Mwinyi Road", addressLocality: "Dar es Salaam", addressCountry: "TZ" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${display.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-full flex flex-col font-sans bg-bg-canvas text-brand-navy">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
