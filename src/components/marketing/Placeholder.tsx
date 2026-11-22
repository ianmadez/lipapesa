"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { IconArrow } from "@/components/ui/icons";
import { LogoMark } from "@/components/ui/Brand";

/** Shared Navbar + Footer frame for secondary pages. */
export const PageShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

interface PlaceholderProps {
  code: string;
  title?: string;
  desc?: string;
  phase?: string;
}

/** Placeholder for routes that ship in a later roadmap phase, and for the 404 page. */
export const Placeholder: React.FC<PlaceholderProps> = ({ code, title, desc, phase }) => {
  const t = useLanguage().dict.landing;
  return (
    <PageShell>
      <section className="hero-solid text-white min-h-[70vh] flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-brand-cyan">{code}{phase && ` · ${phase}`}</p>
          <h1 className="font-heading font-extrabold text-5xl sm:text-7xl mt-5 max-w-3xl leading-[0.98]">{title ?? t.comingSoon}</h1>
          <p className="mt-6 text-lg text-white/70 max-w-lg">{desc ?? t.comingSoonDesc}</p>
          <Link href="/" className="mt-10 inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-white text-brand-navy font-medium hover:bg-brand-cyan hover:text-white transition-colors">
            {t.backHome} <IconArrow size={16} />
          </Link>
        </div>
        <LogoMark size={420} className="hidden lg:block absolute right-[5%] top-1/2 -translate-y-1/2 text-white/10" />
      </section>
    </PageShell>
  );
};
