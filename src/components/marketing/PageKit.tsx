"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { PHOTOS, PhotoKey } from "@/config/images";
import { IconArrow, IconCheck } from "@/components/ui/icons";
import { GridField, NodeCluster } from "./graphics/GridAccent";

/** Shared building blocks for /products, /services, /company, /clients (ADR-013). */

export const Wrap: React.FC<{ id?: string; className?: string; children: React.ReactNode }> = ({ id, className = "", children }) => (
  <section id={id} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 ${className}`}>{children}</section>
);

export const Kicker: React.FC<{ n?: string; children: React.ReactNode; light?: boolean }> = ({ n, children, light }) => (
  <p className={`font-mono text-[12px] flex items-center gap-3 ${light ? "text-brand-cyan" : "text-brand-primary"}`}>
    {n && <span>{n}</span>}
    <span className={`h-px w-8 ${light ? "bg-brand-cyan/50" : "bg-brand-primary/40"}`} />
    <span className="uppercase tracking-[0.08em]">{children}</span>
  </p>
);

export const SectionHead: React.FC<{ n?: string; kicker: string; title: string; sub?: string; className?: string }> = ({ n, kicker, title, sub, className = "" }) => (
  <div className={`relative max-w-3xl ${className}`}>
    <Kicker n={n}>{kicker}</Kicker>
    <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[44px] mt-4 leading-[1.05]">{title}</h2>
    {sub && <p className="mt-4 text-text-secondary text-[17px] leading-relaxed">{sub}</p>}
  </div>
);

/** Page hero: copy on the left, a photo or graphic on the right. Blueprint grid behind. */
export const PageHero: React.FC<{ kicker: string; title: React.ReactNode; sub: string; aside?: React.ReactNode; actions?: React.ReactNode }> = ({ kicker, title, sub, aside, actions }) => (
  <div className="relative border-b border-border-subtle bg-white overflow-hidden">
    <GridField />
    <Wrap className="relative py-14 sm:py-20 lg:py-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
      <div className="rise">
        <div className="flex items-center gap-3">
          <NodeCluster size={28} />
          <Kicker>{kicker}</Kicker>
        </div>
        <h1 className="font-heading font-extrabold text-[40px] sm:text-5xl lg:text-[60px] leading-[1.0] mt-5">{title}</h1>
        <p className="mt-5 text-[17px] sm:text-lg text-text-secondary leading-relaxed max-w-xl">{sub}</p>
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </div>
      {aside && <div className="rise rise-2">{aside}</div>}
    </Wrap>
  </div>
);

export const PrimaryCta: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <Link href={href} className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-brand-primary hover:bg-brand-primary-dark text-white text-[14px] font-medium transition-colors">
    {children}
    <IconArrow size={15} />
  </Link>
);

export const SecondaryCta: React.FC<{ href: string; children: React.ReactNode; light?: boolean }> = ({ href, children, light }) => (
  <Link
    href={href}
    className={`inline-flex items-center gap-2 h-11 px-5 rounded-lg border text-[14px] font-medium transition-colors ${
      light ? "border-white/25 text-white hover:border-white" : "border-border-subtle bg-white text-brand-navy hover:border-brand-primary hover:text-brand-primary"
    }`}
  >
    {children}
  </Link>
);

/** Floating live metric badge for photo corners. */
export const MetricBadge: React.FC<{ label: string; value: string; className?: string }> = ({ label, value, className = "" }) => (
  <div className={`absolute bg-white/95 backdrop-blur rounded-lg border border-border-subtle shadow-[0_12px_32px_-8px_rgba(6,21,38,0.25)] px-3.5 py-2.5 ${className}`}>
    <p className="flex items-center gap-1.5 text-[11px] text-text-muted">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 rounded-full bg-status-success animate-ping opacity-60 motion-reduce:hidden" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-status-success" />
      </span>
      {label}
    </p>
    <p className="font-mono tabular-nums text-[14px] font-medium text-brand-navy mt-0.5">{value}</p>
  </div>
);

/** next/image in a 12px frame with a navy-to-azure overlay. Alt text comes from the dictionary. */
export const PhotoFrame: React.FC<{
  photo: PhotoKey;
  className?: string;
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  overlay?: boolean;
  position?: string;
  children?: React.ReactNode;
}> = ({ photo, className = "", aspect = "aspect-[4/3]", priority, sizes = "(min-width: 1024px) 45vw, 100vw", overlay = true, position = "center", children }) => {
  const alts = useLanguage().dict.pages.alts;
  return (
    <figure className={`relative ${aspect} ${className}`}>
      <div className="absolute inset-0 rounded-xl overflow-hidden border border-border-subtle bg-azure-mist">
        <Image src={PHOTOS[photo]} alt={alts[photo]} fill priority={priority} sizes={sizes} placeholder="blur" className="object-cover" style={{ objectPosition: position }} />
        {overlay && <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-brand-navy/55 via-brand-navy/5 to-brand-primary/10" />}
      </div>
      {children}
    </figure>
  );
};

export const FeatureList: React.FC<{ items: string[]; light?: boolean }> = ({ items, light }) => (
  <ul className="space-y-2.5">
    {items.map((f) => (
      <li key={f} className={`flex gap-2.5 text-[14px] leading-snug ${light ? "text-white/80" : "text-text-secondary"}`}>
        <IconCheck size={16} className={`mt-0.5 shrink-0 ${light ? "text-brand-cyan" : "text-brand-primary"}`} />
        {f}
      </li>
    ))}
  </ul>
);

/** Navy closing band with two CTAs. */
export const CtaBand: React.FC<{ title: string; sub: string; primaryHref?: string; secondaryHref?: string }> = ({ title, sub, primaryHref = "/signup", secondaryHref = "/developers" }) => {
  const s = useLanguage().dict.pages.shared;
  return (
    <Wrap className="py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-xl bg-brand-navy text-white px-6 py-12 sm:px-12 sm:py-16">
        <GridField dark />
        <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 items-end">
          <div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-[44px] leading-[1.05]">{title}</h2>
            <p className="mt-4 text-white/70 text-[17px] max-w-xl">{sub}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <PrimaryCta href={primaryHref}>{s.ctaSignup}</PrimaryCta>
            <SecondaryCta href={secondaryHref} light>{s.ctaDevelopers}</SecondaryCta>
          </div>
        </div>
      </div>
    </Wrap>
  );
};
