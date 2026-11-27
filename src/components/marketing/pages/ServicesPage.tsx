"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { IconSend, IconPhone, IconSignal, IconQr, IconCheck, IconClose } from "@/components/ui/icons";
import { PageShell } from "@/components/marketing/Placeholder";
import { Wrap, SectionHead, PageHero, PrimaryCta, SecondaryCta, PhotoFrame, MetricBadge, FeatureList, CtaBand } from "@/components/marketing/PageKit";
import { GridField } from "@/components/marketing/graphics/GridAccent";

const SERVICES = [
  { key: "c2b", Icon: IconSend },
  { key: "utilities", Icon: IconPhone },
  { key: "vodacom", Icon: IconSignal },
  { key: "omni", Icon: IconQr },
] as const;

type Tier = "starter" | "business" | "enterprise";
const TIERS: Tier[] = ["starter", "business", "enterprise"];
/** Feature availability per tier. */
const MATRIX: { row: "rowRails" | "rowTill" | "rowWebhooks" | "rowBulk" | "rowMaker" | "rowSla"; has: Record<Tier, boolean> }[] = [
  { row: "rowRails", has: { starter: true, business: true, enterprise: true } },
  { row: "rowTill", has: { starter: true, business: true, enterprise: true } },
  { row: "rowWebhooks", has: { starter: false, business: true, enterprise: true } },
  { row: "rowBulk", has: { starter: false, business: true, enterprise: true } },
  { row: "rowMaker", has: { starter: false, business: false, enterprise: true } },
  { row: "rowSla", has: { starter: false, business: false, enterprise: true } },
];

export default function ServicesPage() {
  const { dict } = useLanguage();
  const v = dict.pages.services;
  const s = dict.pages.shared;
  const [tier, setTier] = useState<Tier>("business");

  const tierName: Record<Tier, string> = { starter: v.tierStarter, business: v.tierBusiness, enterprise: v.tierEnterprise };
  const tierFor: Record<Tier, string> = { starter: v.tierStarterFor, business: v.tierBusinessFor, enterprise: v.tierEnterpriseFor };
  const tierMdr: Record<Tier, string> = { starter: v.mdrStarter, business: v.mdrBusiness, enterprise: v.mdrEnterprise };
  const steps = [
    [v.step1, v.step1Desc],
    [v.step2, v.step2Desc],
    [v.step3, v.step3Desc],
    [v.step4, v.step4Desc],
  ];

  const Cell = ({ on }: { on: boolean }) =>
    on ? (
      <IconCheck size={18} className="text-status-success" aria-label={v.yes} />
    ) : (
      <IconClose size={16} className="text-text-muted/50" aria-label={v.no} />
    );

  return (
    <PageShell>
      <PageHero
        kicker={v.kicker}
        title={v.title}
        sub={v.sub}
        actions={
          <>
            <PrimaryCta href="/signup?role=MERCHANT">{s.ctaSignup}</PrimaryCta>
            <SecondaryCta href="/developers">{s.ctaDevelopers}</SecondaryCta>
          </>
        }
        aside={
          <PhotoFrame photo="enterprise" priority aspect="aspect-[5/4]">
            <MetricBadge label={v.rowBulk} value={s.sampleBulk} className="left-3 bottom-3 sm:-left-5 sm:bottom-8" />
          </PhotoFrame>
        }
      />

      {/* Service catalogue */}
      <Wrap className="py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-px bg-border-subtle border border-border-subtle rounded-xl overflow-hidden">
          {SERVICES.map(({ key, Icon }, i) => {
            const item = v[key];
            return (
              <article key={key} className="bg-white p-6 sm:p-9 grid sm:grid-cols-[auto_1fr] gap-5">
                <div className="flex sm:flex-col items-center sm:items-start gap-3">
                  <span className="font-mono text-[12px] text-text-muted">0{i + 1}</span>
                  <div className="h-11 w-11 rounded-lg bg-brand-navy text-brand-cyan grid place-items-center">
                    <Icon size={22} />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[22px] leading-tight">{item.name}</h3>
                  <p className="text-text-secondary text-[15px] leading-relaxed mt-3 mb-5">{item.desc}</p>
                  <FeatureList items={[item.f1, item.f2, item.f3]} />
                </div>
              </article>
            );
          })}
        </div>
      </Wrap>

      {/* Onboarding workflow */}
      <div className="relative bg-brand-navy text-white overflow-hidden">
        <GridField dark />
        <Wrap className="relative py-16 sm:py-24">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl">{v.workflowHeading}</h2>
          <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-xl overflow-hidden border border-white/10">
            {steps.map(([title, desc], i) => (
              <li key={title} className="bg-brand-navy p-6">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-lg border border-brand-cyan/40 text-brand-cyan font-mono text-[13px] grid place-items-center">{i + 1}</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-brand-cyan/40 to-transparent" />
                </div>
                <h3 className="font-heading font-bold text-xl mt-5">{title}</h3>
                <p className="text-white/65 text-[14px] mt-2 leading-relaxed">{desc}</p>
              </li>
            ))}
          </ol>
        </Wrap>
      </div>

      {/* Tier comparison */}
      <Wrap className="py-16 sm:py-24">
        <SectionHead kicker={v.kicker} title={v.tiersHeading} sub={v.tiersSub} />

        {/* Mobile: choose a tier, then read its column */}
        <div role="tablist" className="md:hidden mt-8 grid grid-cols-3 rounded-lg border border-border-subtle overflow-hidden bg-white">
          {TIERS.map((t) => (
            <button key={t} role="tab" aria-selected={tier === t} onClick={() => setTier(t)} className={`h-11 text-[13px] font-medium cursor-pointer ${tier === t ? "bg-brand-primary text-white" : "text-text-secondary"}`}>
              {tierName[t]}
            </button>
          ))}
        </div>

        <div className="mt-4 md:mt-10 rounded-xl border border-border-subtle bg-white overflow-hidden">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left font-medium text-text-muted p-4 sm:p-5 w-[44%] md:w-[34%]">{v.tierFeature}</th>
                {TIERS.map((t) => (
                  <th key={t} className={`${tier === t ? "table-cell" : "hidden"} md:table-cell text-left p-4 sm:p-5 align-bottom ${t === "business" ? "bg-azure-mist/60" : ""}`}>
                    <button onClick={() => setTier(t)} className="text-left cursor-pointer">
                      <span className="block font-heading font-bold text-[18px] text-brand-navy">{tierName[t]}</span>
                      <span className="block font-normal text-[12px] text-text-muted mt-0.5">{tierFor[t]}</span>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX.map(({ row, has }) => (
                <tr key={row} className="border-b border-border-subtle">
                  <td className="p-4 sm:px-5 text-text-secondary">{v[row]}</td>
                  {TIERS.map((t) => (
                    <td key={t} className={`${tier === t ? "table-cell" : "hidden"} md:table-cell p-4 sm:px-5 ${t === "business" ? "bg-azure-mist/60" : ""} ${tier === t ? "md:shadow-[inset_2px_0_0_#0084D6]" : ""}`}>
                      <Cell on={has[t]} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-4 sm:px-5 text-text-secondary">{v.rowMdr}</td>
                {TIERS.map((t) => (
                  <td key={t} className={`${tier === t ? "table-cell" : "hidden"} md:table-cell p-4 sm:px-5 font-mono tabular-nums text-brand-navy ${t === "business" ? "bg-azure-mist/60" : ""}`}>
                    {tierMdr[t]}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Wrap>

      <CtaBand title={dict.pages.products.ctaBandTitle} sub={dict.pages.products.ctaBandSub} primaryHref="/signup?role=MERCHANT" />
    </PageShell>
  );
}
