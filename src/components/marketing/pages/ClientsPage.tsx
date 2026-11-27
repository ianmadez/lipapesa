"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import type { PhotoKey } from "@/config/images";
import { IconArrow } from "@/components/ui/icons";
import { PageShell } from "@/components/marketing/Placeholder";
import { Wrap, PageHero, PrimaryCta, SecondaryCta, PhotoFrame, MetricBadge, CtaBand } from "@/components/marketing/PageKit";

const VERTICALS: { key: "ecom" | "schools" | "agents" | "enterprise"; photo: PhotoKey; role: string; position?: string }[] = [
  { key: "ecom", photo: "ecommerce", role: "MERCHANT" },
  { key: "schools", photo: "eduPay", role: "MERCHANT" },
  { key: "agents", photo: "streetVendor", role: "WAKALA", position: "center 35%" },
  { key: "enterprise", photo: "enterprise", role: "MERCHANT" },
];

export default function ClientsPage() {
  const { dict } = useLanguage();
  const c = dict.pages.clients;
  const s = dict.pages.shared;

  return (
    <PageShell>
      <PageHero
        kicker={c.kicker}
        title={c.title}
        sub={c.sub}
        actions={
          <>
            <PrimaryCta href="/signup">{s.ctaSignup}</PrimaryCta>
            <SecondaryCta href="#stories">{s.learnMore}</SecondaryCta>
          </>
        }
        aside={
          <PhotoFrame photo="wakalaAgent" priority aspect="aspect-[5/4]">
            <MetricBadge label={dict.pages.landingStories.badgeCommission} value={s.sampleCommission} className="left-3 bottom-3 sm:-left-5 sm:bottom-8" />
          </PhotoFrame>
        }
      />

      {/* Vertical index */}
      <Wrap className="pt-16 sm:pt-24">
        <nav aria-label={c.kicker} className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border-subtle border border-border-subtle rounded-xl overflow-hidden">
          {VERTICALS.map(({ key }, i) => (
            <a key={key} href={`#${key}`} className="group bg-white p-5 sm:p-6 hover:bg-azure-mist/50 transition-colors">
              <span className="font-mono text-[12px] text-text-muted">0{i + 1}</span>
              <p className="font-heading font-bold text-[16px] sm:text-[18px] leading-snug mt-2 group-hover:text-brand-primary">{c[key].name}</p>
            </a>
          ))}
        </nav>
      </Wrap>

      {/* Stories */}
      <div id="stories" className="scroll-mt-20">
        {VERTICALS.map(({ key, photo, role, position }, i) => {
          const v = c[key];
          const flip = i % 2 === 1;
          return (
            <Wrap key={key} id={key} className="py-14 sm:py-20 border-b border-border-subtle last:border-0">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <PhotoFrame photo={photo} aspect="aspect-[4/3]" position={position} className={flip ? "lg:order-2" : ""}>
                  <MetricBadge label={v.m1Label} value={v.m1} className={`bottom-3 ${flip ? "right-3 sm:-right-5" : "left-3 sm:-left-5"} sm:bottom-8`} />
                </PhotoFrame>
                <div>
                  <p className="font-mono text-[12px] text-brand-primary">0{i + 1}</p>
                  <h2 className="font-heading font-extrabold text-3xl sm:text-[40px] leading-[1.05] mt-3">{v.name}</h2>
                  <p className="mt-4 text-text-secondary text-[17px] leading-relaxed">{v.desc}</p>

                  <blockquote className="mt-7 border-l-2 border-brand-primary pl-5">
                    <p className="font-heading font-bold text-[18px]">{v.storyTitle}</p>
                    <p className="mt-2 text-text-secondary leading-relaxed">{v.story}</p>
                  </blockquote>

                  <dl className="mt-7 grid grid-cols-2 border border-border-subtle rounded-xl overflow-hidden bg-white">
                    {[
                      [v.m1, v.m1Label],
                      [v.m2, v.m2Label],
                    ].map(([val, label], j) => (
                      <div key={label} className={`p-4 sm:p-5 ${j === 0 ? "border-r border-border-subtle" : ""}`}>
                        <dt className="font-mono tabular-nums text-[20px] sm:text-[24px] text-brand-navy">{val}</dt>
                        <dd className="text-[13px] text-text-muted mt-1">{label}</dd>
                      </div>
                    ))}
                  </dl>

                  <Link href={`/signup?role=${role}`} className="mt-7 inline-flex items-center gap-1.5 text-[14px] font-medium text-brand-primary hover:gap-2.5 transition-all">
                    {s.ctaSignup} <IconArrow size={14} />
                  </Link>
                </div>
              </div>
            </Wrap>
          );
        })}
        <Wrap>
          <p className="text-[12px] text-text-muted pt-2">{c.note}</p>
        </Wrap>
      </div>

      <CtaBand title={c.ctaTitle} sub={c.ctaSub} />
    </PageShell>
  );
}
