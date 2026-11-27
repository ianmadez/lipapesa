"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import type { PhotoKey } from "@/config/images";
import { IconArrow } from "@/components/ui/icons";
import { Wrap, SectionHead, PhotoFrame, MetricBadge } from "./PageKit";

/** Landing: photo mosaic of the people LipaPesa serves. Links to /clients. */
export const LandingStories: React.FC = () => {
  const { dict } = useLanguage();
  const t = dict.pages.landingStories;
  const s = dict.pages.shared;

  const tiles: { photo: PhotoKey; label: string; href: string; cls: string; aspect: string; badge?: [string, string] }[] = [
    { photo: "heroMerchant", label: t.merchant, href: "/clients#ecom", cls: "md:col-span-2 md:row-span-2", aspect: "aspect-[4/3] md:aspect-auto md:h-full", badge: [t.badgePaid, s.samplePaid] },
    { photo: "eduPay", label: t.students, href: "/clients#schools", cls: "", aspect: "aspect-[4/3]", badge: [t.badgeFee, s.sampleFee] },
    { photo: "wakalaAgent", label: t.agents, href: "/clients#agents", cls: "", aspect: "aspect-[4/3]" },
  ];

  return (
    <Wrap className="py-20 sm:py-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <SectionHead kicker={t.kicker} title={t.title} sub={t.sub} />
        <Link href="/clients" className="shrink-0 inline-flex items-center gap-1.5 text-[14px] font-medium text-brand-primary hover:gap-2.5 transition-all">
          {t.seeClients} <IconArrow size={14} />
        </Link>
      </div>

      <div className="mt-10 grid md:grid-cols-3 md:grid-rows-2 gap-4 md:h-[560px]">
        {tiles.map(({ photo, label, href, cls, aspect, badge }) => (
          <Link key={photo} href={href} className={`group relative block rounded-xl transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_48px_-12px_rgba(6,21,38,0.28)] focus-visible:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary motion-reduce:transform-none ${cls}`}>
            <PhotoFrame photo={photo} aspect={aspect} className="h-full" sizes="(min-width: 768px) 33vw, 100vw">
              <figcaption className="absolute left-4 bottom-4 right-4 flex items-end justify-between gap-3 text-white">
                <span className="font-heading font-bold text-[18px]">{label}</span>
                <IconArrow size={18} className="transition-transform group-hover:translate-x-1" />
              </figcaption>
              {badge && <MetricBadge label={badge[0]} value={badge[1]} className="right-3 top-3" />}
            </PhotoFrame>
          </Link>
        ))}
      </div>
    </Wrap>
  );
};
