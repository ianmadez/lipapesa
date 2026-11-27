"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { BRAND_INFO } from "@/config/brand";
import { IconPin, IconMail, IconShield, IconLock, IconSignal, IconCheck, IconBolt } from "@/components/ui/icons";
import { PageShell } from "@/components/marketing/Placeholder";
import { Wrap, SectionHead, PageHero, PrimaryCta, SecondaryCta, CtaBand } from "@/components/marketing/PageKit";
import { RailSwitchingDiagram } from "@/components/marketing/graphics/RailSwitchingDiagram";
import { Logo } from "@/components/ui/Brand";
import { GridField, NodeCluster } from "@/components/marketing/graphics/GridAccent";

/** Stylised East Africa footprint: Dar es Salaam hub with links to regional nodes. */
const FootprintMap: React.FC<{ hub: string }> = ({ hub }) => (
  <svg viewBox="0 0 320 300" role="img" aria-label={hub} className="w-full h-auto">
    <defs>
      <pattern id="fp-dots" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="1.1" fill="#ffffff" fillOpacity="0.16" />
      </pattern>
    </defs>
    {/* Simplified Tanzania outline */}
    <path
      d="M88 40 L170 30 L205 58 L232 62 L246 96 L262 132 L270 176 L252 214 L258 246 L214 262 L170 256 L128 238 L100 214 L74 196 L60 160 L66 118 L56 84 Z"
      fill="url(#fp-dots)"
      stroke="#0095E8"
      strokeOpacity="0.55"
      strokeWidth="1.2"
    />
    {[
      [150, 70, "Mwanza"],
      [210, 76, "Arusha"],
      [160, 150, "Dodoma"],
      [120, 220, "Mbeya"],
    ].map(([x, y, name]) => (
      <g key={String(name)}>
        <path d={`M246 168 Q${(246 + Number(x)) / 2} ${Math.min(168, Number(y)) - 30} ${x} ${y}`} fill="none" stroke="#0095E8" strokeOpacity="0.6" strokeDasharray="3 4" className="rsd-flow" />
        <circle cx={Number(x)} cy={Number(y)} r="4" fill="#061526" stroke="#0095E8" strokeWidth="1.5" />
        <text x={Number(x) + 8} y={Number(y) + 4} fontSize="10" fill="#fff" fillOpacity="0.7" fontFamily="var(--font-mono)">
          {name}
        </text>
      </g>
    ))}
    {/* Zanzibar (Unguja), northeast of Dar es Salaam */}
    <path d="M266 128 L273 122 L280 128 L282 141 L276 152 L268 148 L265 138 Z" fill="url(#fp-dots)" stroke="#0095E8" strokeOpacity="0.55" strokeWidth="1.2" />
    <path d="M246 168 Q262 160 273 138" fill="none" stroke="#0095E8" strokeOpacity="0.6" strokeDasharray="3 4" className="rsd-flow" />
    <circle cx="273" cy="138" r="4" fill="#061526" stroke="#0095E8" strokeWidth="1.5" />
    <text x="262" y="116" textAnchor="middle" fontSize="10" fill="#fff" fillOpacity="0.7" fontFamily="var(--font-mono)">
      Zanzibar
    </text>
    <circle cx="246" cy="168" r="16" fill="#0084D6" fillOpacity="0.2" className="motion-safe:animate-pulse" />
    <circle cx="246" cy="168" r="7" fill="#0095E8" stroke="#fff" strokeWidth="2" />
    <text x="196" y="196" fontSize="12" fontWeight="700" fill="#fff" fontFamily="var(--font-heading)">
      {hub}
    </text>
  </svg>
);

export default function CompanyPage() {
  const { dict } = useLanguage();
  const c = dict.pages.company;
  const s = dict.pages.shared;

  const gov = [
    { Icon: IconSignal, t: c.gov1, d: c.gov1Desc },
    { Icon: IconBolt, t: c.gov2, d: c.gov2Desc },
    { Icon: IconShield, t: c.gov3, d: c.gov3Desc },
    { Icon: IconLock, t: c.gov4, d: c.gov4Desc },
    { Icon: IconCheck, t: c.gov5, d: c.gov5Desc },
  ];

  return (
    <PageShell>
      <PageHero
        kicker={`${c.kicker} · ${BRAND_INFO.legalName}`}
        title={
          <>
            {c.title} <span className="text-brand-primary">{c.titleAccent}</span>
          </>
        }
        sub={c.sub}
        actions={
          <>
            <PrimaryCta href="/signup">{s.ctaSignup}</PrimaryCta>
            <SecondaryCta href={`mailto:${BRAND_INFO.supportEmail}`}>{s.ctaTalk}</SecondaryCta>
          </>
        }
        aside={
          <div className="relative aspect-[5/4] rounded-xl border border-border-subtle bg-white overflow-hidden grid place-items-center shadow-[0_12px_32px_-8px_rgba(6,21,38,0.08)]">
            <GridField />
            <Logo priority className="relative w-[78%] h-auto" />
          </div>
        }
      />

      {/* Who we are + vision */}
      <Wrap className="pt-16 sm:pt-24">
        <div className="grid md:grid-cols-2 gap-px bg-border-subtle border border-border-subtle rounded-xl overflow-hidden">
        {[
          [c.whoHeading, c.whoBody],
          [c.visionHeading, c.visionBody],
        ].map(([h, b], i) => (
          <div key={h} className="relative bg-white p-7 sm:p-10">
            <NodeCluster size={40} className="absolute right-6 top-6 opacity-70" />
            <span className="font-mono text-[12px] text-brand-primary">0{i + 1}</span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl mt-3">{h}</h2>
            <p className="mt-4 text-text-secondary text-[17px] leading-relaxed">{b}</p>
          </div>
        ))}
        </div>
      </Wrap>

      {/* HQ & footprint */}
      <Wrap className="py-16 sm:py-24">
        <div className="relative overflow-hidden rounded-xl bg-brand-navy text-white grid lg:grid-cols-[1.1fr_0.9fr]">
          <GridField dark />
          <div className="relative p-7 sm:p-12">
            <p className="font-mono text-[12px] text-brand-cyan uppercase tracking-[0.08em]">{c.kicker}</p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl mt-4">{c.hqHeading}</h2>
            <p className="mt-4 text-white/70 text-[17px] max-w-lg">{c.hqBody}</p>
            <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {[
                [c.hqCity, c.hqRole],
                [c.region1, c.region1Role],
                [c.region2, c.region2Role],
              ].map(([k, v]) => (
                <div key={k} className="py-4 grid sm:grid-cols-[160px_1fr] gap-1">
                  <dt className="font-heading font-bold">{k}</dt>
                  <dd className="text-white/65 text-[15px]">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-6 text-[14px] text-white/75">
              <span className="inline-flex items-center gap-2"><IconPin size={16} className="text-brand-cyan" />{BRAND_INFO.address}</span>
              <a href={`mailto:${BRAND_INFO.supportEmail}`} className="inline-flex items-center gap-2 hover:text-white"><IconMail size={16} className="text-brand-cyan" />{BRAND_INFO.supportEmail}</a>
            </div>
          </div>
          <div className="relative p-7 sm:p-12 lg:border-l border-white/10 flex items-center">
            <FootprintMap hub={c.hqCity} />
          </div>
        </div>
      </Wrap>

      {/* Governance */}
      <div className="bg-white border-y border-border-subtle">
        <Wrap className="py-16 sm:py-24">
          <SectionHead kicker={c.kicker} title={c.govHeading} sub={c.govSub} />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border-subtle border border-border-subtle rounded-xl overflow-hidden">
            {gov.map(({ Icon, t, d }) => (
              <div key={t} className="bg-white p-6">
                <div className="h-10 w-10 rounded-lg bg-azure-mist text-brand-primary grid place-items-center">
                  <Icon size={20} />
                </div>
                <h3 className="font-heading font-bold text-[17px] leading-snug mt-5">{t}</h3>
                <p className="text-text-secondary text-[14px] mt-2 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <RailSwitchingDiagram className="mt-12" />
        </Wrap>
      </div>

      <CtaBand title={dict.pages.clients.ctaTitle} sub={dict.pages.clients.ctaSub} />
    </PageShell>
  );
}
