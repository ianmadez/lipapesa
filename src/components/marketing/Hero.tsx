"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useLanguage } from "@/i18n/LanguageContext";
import { BRAND_INFO } from "@/config/brand";
import { PhoneSimulator } from "./PhoneSimulator";
import { IconArrow, IconBolt } from "@/components/ui/icons";

// Modal code loads only when someone opens it.
const DemoModal = dynamic(() => import("./DemoModal").then((m) => m.DemoModal), { ssr: false });

export const Hero: React.FC = () => {
  const { dict } = useLanguage();
  const t = dict.landing;
  const [demo, setDemo] = useState(false);
  const [showBar, setShowBar] = useState(false);

  // Mobile only: sticky action bar appears once the hero CTAs scroll away.
  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <section className="hero-field text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-12 sm:pt-20 lg:pt-24 pb-10 sm:pb-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-8 items-start">
          <div className="lg:pt-6">
            <p className="rise inline-flex items-center gap-2 h-7 px-3 rounded-full bg-white/10 border border-white/15 font-mono text-[11px] tracking-[0.06em] uppercase text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-[#34D399] animate-pulse" />
              {t.eyebrow}
            </p>
            <h1 className="rise rise-2 font-heading font-extrabold text-[42px] sm:text-[64px] lg:text-[78px] leading-[0.98] tracking-[-0.035em] mt-6">
              {t.title}
              <br />
              <span className="text-brand-cyan">{t.titleAccent}</span>
            </h1>
            <p className="rise rise-3 mt-5 sm:mt-6 max-w-xl text-[16px] sm:text-[18px] leading-relaxed text-white/75">{t.sub}</p>

            <div className="rise rise-3 mt-8 sm:mt-10 grid sm:flex gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white text-brand-navy font-medium hover:bg-brand-cyan hover:text-white transition-colors"
              >
                {t.ctaPrimary} <IconArrow size={16} />
              </Link>
              <button
                type="button"
                onClick={() => setDemo(true)}
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border border-white/30 bg-white/5 text-white font-medium hover:bg-white/15 hover:border-white transition-colors cursor-pointer"
              >
                <IconBolt size={16} className="text-brand-cyan" /> {t.ctaDemo}
              </button>
            </div>
            <Link href="/developers" className="rise rise-3 mt-5 inline-flex items-center gap-1.5 text-[14px] text-white/65 hover:text-white">
              {t.ctaSecondary} <IconArrow size={13} />
            </Link>
          </div>

          {/* Desktop: live phone. Mobile: a cropped peek that opens the full-screen demo. */}
          <div className="rise rise-2 hidden sm:flex justify-center lg:justify-end">
            <PhoneSimulator />
          </div>
          <button
            type="button"
            onClick={() => setDemo(true)}
            className="sm:hidden relative h-[300px] -mx-5 overflow-hidden cursor-pointer"
            aria-label={t.ctaDemo}
          >
            <div className="absolute left-1/2 top-0 -translate-x-1/2 scale-[0.82] origin-top pointer-events-none" aria-hidden="true">
              <PhoneSimulator />
            </div>
            <span className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#8FD0F5] via-[#8FD0F5]/80 to-transparent" />
            <span className="absolute left-1/2 -translate-x-1/2 bottom-6 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-brand-navy text-white text-[14px] font-medium shadow-lg">
              <IconBolt size={15} className="text-brand-cyan" /> {t.mobileTry}
            </span>
          </button>
        </div>

        {/* Rails: sits in the light-azure part of the fade, so text is dark */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-10 sm:pb-14">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 pt-6 border-t border-brand-navy/10">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-brand-navy/60 shrink-0">{t.railsLabel}</p>
            <ul className="flex flex-wrap gap-2 md:gap-x-8 md:gap-y-2">
              {BRAND_INFO.supportedRails.map((r) => (
                <li key={r.id} className="flex items-center gap-2 h-8 px-3 md:px-0 rounded-full md:rounded-none bg-white/70 md:bg-transparent text-[13px] md:text-[15px] font-semibold text-brand-navy">
                  <span className="h-2 w-2 rounded-full" style={{ background: r.color }} />
                  {r.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Mobile-only sticky action bar */}
      <div
        className={`sm:hidden fixed inset-x-3 bottom-3 z-30 grid grid-cols-2 gap-2 p-2 rounded-2xl bg-brand-navy/95 backdrop-blur shadow-2xl transition-all duration-300 ${
          showBar && !demo ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        <button type="button" onClick={() => setDemo(true)} className="h-11 rounded-xl border border-white/20 text-white text-[14px] font-medium inline-flex items-center justify-center gap-1.5 cursor-pointer">
          <IconBolt size={14} className="text-brand-cyan" /> {t.mobileTry}
        </button>
        <Link href="/signup" className="h-11 rounded-xl bg-brand-primary text-white text-[14px] font-medium inline-flex items-center justify-center">
          {t.ctaPrimary}
        </Link>
      </div>

      {demo && <DemoModal open={demo} onClose={() => setDemo(false)} />}
    </>
  );
};
