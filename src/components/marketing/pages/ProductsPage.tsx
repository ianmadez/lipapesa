"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { IconArrow, IconSignal, IconStore, IconReceipt, IconTicket, IconShield, IconCode } from "@/components/ui/icons";
import { PageShell } from "@/components/marketing/Placeholder";
import { Wrap, SectionHead, PageHero, PrimaryCta, SecondaryCta, PhotoFrame, MetricBadge, FeatureList, CtaBand } from "@/components/marketing/PageKit";
import { RailSwitchingDiagram } from "@/components/marketing/graphics/RailSwitchingDiagram";
import { SettlementFlowGraphic } from "@/components/marketing/graphics/SettlementFlowGraphic";
import { NodeCluster, GridField } from "@/components/marketing/graphics/GridAccent";

type Category = "all" | "consumers" | "business" | "schools" | "agents" | "compliance";

const PRODUCTS = [
  { key: "wallet", Icon: IconSignal, cats: ["consumers", "business"], role: "CONSUMER" },
  { key: "merchant", Icon: IconStore, cats: ["business"], role: "MERCHANT" },
  { key: "edupay", Icon: IconReceipt, cats: ["schools"], role: "MERCHANT" },
  { key: "wakala", Icon: IconTicket, cats: ["agents"], role: "WAKALA" },
  { key: "ekyc", Icon: IconShield, cats: ["compliance", "business"], role: "MERCHANT" },
] as const;

export default function ProductsPage() {
  const { dict } = useLanguage();
  const p = dict.pages.products;
  const s = dict.pages.shared;
  const [cat, setCat] = useState<Category>("all");

  const filters: [Category, string][] = [
    ["all", p.filterAll],
    ["consumers", p.filterConsumers],
    ["business", p.filterBusiness],
    ["schools", p.filterSchools],
    ["agents", p.filterAgents],
    ["compliance", p.filterCompliance],
  ];
  const visible = PRODUCTS.filter((x) => cat === "all" || (x.cats as readonly string[]).includes(cat));

  return (
    <PageShell>
      <PageHero
        kicker={p.kicker}
        title={p.title}
        sub={p.sub}
        actions={
          <>
            <PrimaryCta href="/signup">{s.ctaSignup}</PrimaryCta>
            <SecondaryCta href="/developers">{s.ctaDevelopers}</SecondaryCta>
          </>
        }
        aside={
          <PhotoFrame photo="heroMerchant" priority aspect="aspect-[5/4]">
            <MetricBadge label={dict.pages.landingStories.badgePaid} value={s.samplePaid} className="left-3 bottom-3 sm:-left-5 sm:bottom-8" />
            <MetricBadge label="STK Push" value={s.sampleLatency} className="right-3 top-3 sm:-right-4 sm:top-8" />
          </PhotoFrame>
        }
      />

      {/* Category filter + product grid */}
      <Wrap className="py-16 sm:py-24">
        <div role="tablist" aria-label={p.kicker} className="flex flex-wrap gap-2">
          {filters.map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={cat === id}
              onClick={() => setCat(id)}
              className={`h-10 px-3.5 sm:px-4 rounded-lg border text-[14px] font-medium transition-colors cursor-pointer ${
                cat === id ? "bg-brand-navy border-brand-navy text-white" : "bg-white border-border-subtle text-text-secondary hover:border-brand-primary hover:text-brand-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-subtle border border-border-subtle rounded-xl overflow-hidden">
          {visible.map(({ key, Icon, role }) => {
            const item = p[key];
            return (
              <article key={key} className="group relative bg-white p-6 sm:p-7 flex flex-col fade-in">
                <NodeCluster size={44} className="absolute right-5 top-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="h-11 w-11 rounded-lg bg-azure-mist text-brand-primary grid place-items-center">
                  <Icon size={22} />
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-brand-primary mt-5">{item.tag}</p>
                <h3 className="font-heading font-bold text-[22px] leading-tight mt-1.5">{item.name}</h3>
                <p className="text-text-secondary text-[15px] leading-relaxed mt-3">{item.desc}</p>
                <div className="mt-5 mb-6">
                  <FeatureList items={[item.f1, item.f2, item.f3]} />
                </div>
                <div className="mt-auto flex items-center gap-4 pt-5 border-t border-border-subtle text-[14px] font-medium">
                  <Link href={`/signup?role=${role}`} className="inline-flex items-center gap-1.5 text-brand-primary hover:gap-2.5 transition-all">
                    {s.ctaSignup} <IconArrow size={14} />
                  </Link>
                  <Link href="/developers" className="inline-flex items-center gap-1.5 text-text-muted hover:text-brand-navy">
                    <IconCode size={15} /> API
                  </Link>
                </div>
              </article>
            );
          })}
          {/* Closing tile: keeps the grid full and points builders at the API */}
          <Link href="/developers" className="group relative bg-brand-navy text-white p-6 sm:p-7 flex flex-col justify-between min-h-[220px] overflow-hidden">
            <GridField dark />
            <IconCode size={28} className="relative text-brand-cyan" />
            <div className="relative">
              <p className="font-heading font-bold text-[22px] leading-tight">{p.ctaBandTitle}</p>
              <p className="mt-2 text-white/65 text-[14px]">{p.ctaBandSub}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-brand-cyan group-hover:gap-2.5 transition-all">
                {s.ctaDevelopers} <IconArrow size={14} />
              </span>
            </div>
          </Link>
        </div>
      </Wrap>

      {/* Architecture */}
      <div className="bg-white border-y border-border-subtle">
        <Wrap className="py-16 sm:py-24">
          <SectionHead n="01" kicker={dict.pages.graphics.core} title={p.railHeading} sub={p.railSub} />
          <RailSwitchingDiagram className="mt-10" />
        </Wrap>
      </div>

      <Wrap className="py-16 sm:py-24 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
        <SectionHead n="02" kicker={p.merchant.tag} title={p.merchant.name} sub={p.merchant.desc} />
        <SettlementFlowGraphic />
      </Wrap>

      <CtaBand title={p.ctaBandTitle} sub={p.ctaBandSub} />
    </PageShell>
  );
}
