"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { LogoMark } from "@/components/ui/Brand";
import { IconArrow, IconPhone, IconStore, IconTicket, IconCode, IconShield, IconSignal } from "@/components/ui/icons";

const Wrap: React.FC<{ id?: string; className?: string; children: React.ReactNode }> = ({ id, className = "", children }) => (
  <section id={id} className={`max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

const Kicker: React.FC<{ n: string; children: React.ReactNode }> = ({ n, children }) => (
  <p className="font-mono text-[12px] text-brand-primary flex items-center gap-3">
    <span>{n}</span>
    <span className="h-px w-8 bg-brand-primary/40" />
    <span className="uppercase tracking-[0.08em]">{children}</span>
  </p>
);

/** 01 — How a payment moves */
export const HowItWorks: React.FC = () => {
  const t = useLanguage().dict.landing;
  const steps = [
    [t.how1Title, t.how1Desc],
    [t.how2Title, t.how2Desc],
    [t.how3Title, t.how3Desc],
  ];
  return (
    <Wrap className="py-20 sm:py-28">
      <Kicker n="01">{t.howHeading}</Kicker>
      <ol className="mt-10 grid md:grid-cols-3 border-t border-border-subtle">
        {steps.map(([title, desc], i) => (
          <li key={title} className="pt-8 pb-4 md:pr-10 md:border-r last:border-r-0 border-border-subtle md:[&:not(:first-child)]:pl-10">
            <span className="font-mono text-[13px] text-text-muted">0{i + 1}</span>
            <h3 className="font-heading font-bold text-2xl mt-3">{title}</h3>
            <p className="mt-2 text-text-secondary leading-relaxed">{desc}</p>
          </li>
        ))}
      </ol>
    </Wrap>
  );
};

/** 02 — Three account types */
export const Pillars: React.FC = () => {
  const { dict } = useLanguage();
  const p = dict.pillars;
  const t = dict.landing;
  const cards = [
    { Icon: IconPhone, title: p.consumerTitle, desc: p.consumerDesc, cta: p.consumerCta, href: "/portal/pay" },
    { Icon: IconTicket, title: p.wakalaTitle, desc: p.wakalaDesc, cta: p.wakalaCta, href: "/portal/wakala" },
    { Icon: IconStore, title: p.merchantTitle, desc: p.merchantDesc, cta: p.merchantCta, href: "/portal/merchant" },
  ];
  return (
    <Wrap id="solutions" className="py-20 sm:py-28 scroll-mt-20">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-end">
        <div>
          <Kicker n="02">{dict.nav.solutions}</Kicker>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl mt-5 leading-[1.02]">{t.pillarsHeading}</h2>
        </div>
        <p className="text-text-secondary text-lg lg:text-right">{t.pillarsSub}</p>
      </div>
      {/* Mobile: swipeable cards. md+: joined three-column grid. */}
      <div className="mt-10 md:mt-12 -mx-5 px-5 md:mx-0 md:px-0 flex md:grid md:grid-cols-3 gap-3 md:gap-px overflow-x-auto snap-x snap-mandatory no-scrollbar md:bg-border-subtle md:border md:border-border-subtle md:rounded-xl md:overflow-hidden">
        {cards.map(({ Icon, title, desc, cta, href }) => (
          <Link key={title} href={href} className="group snap-center shrink-0 w-[82%] md:w-auto bg-white border border-border-subtle md:border-0 rounded-xl md:rounded-none p-7 sm:p-8 flex flex-col min-h-[300px] hover:bg-brand-navy transition-colors duration-300">
            <Icon size={28} className="text-brand-primary group-hover:text-brand-cyan" />
            <h3 className="font-heading font-bold text-xl mt-8 group-hover:text-white">{title}</h3>
            <p className="mt-3 text-[15px] text-text-secondary leading-relaxed group-hover:text-white/65">{desc}</p>
            <span className="mt-auto pt-8 inline-flex items-center gap-2 text-[14px] font-medium text-brand-primary group-hover:text-brand-cyan">
              {cta} <IconArrow size={15} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </Wrap>
  );
};

/** 03 — Stats band */
export const Stats: React.FC = () => {
  const { dict } = useLanguage();
  const h = dict.hero;
  const stats = [
    [h.stat1Value, h.stat1Label],
    [h.stat2Value, h.stat2Label],
    [h.stat3Value, h.stat3Label],
    [h.stat4Value, h.stat4Label],
  ];
  return (
    <section className="bg-brand-navy text-white">
      <Wrap className="py-16 sm:py-20">
        <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-brand-cyan">03 — {dict.landing.statsHeading}</p>
        <dl className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-y-10">
          {stats.map(([v, l]) => (
            <div key={l} className="pr-6 border-l border-white/15 pl-5">
              <dt className="sr-only">{l}</dt>
              <dd className="font-heading font-extrabold text-4xl sm:text-5xl">{v}</dd>
              <dd className="mt-2 text-[13px] text-white/55">{l}</dd>
            </div>
          ))}
        </dl>
      </Wrap>
    </section>
  );
};

/** 04 — Developer teaser with code sample */
export const DeveloperTeaser: React.FC = () => {
  const t = useLanguage().dict.landing;
  return (
    <Wrap className="py-20 sm:py-28 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <Kicker n="04">API</Kicker>
        <h2 className="font-heading font-extrabold text-4xl sm:text-5xl mt-5 leading-[1.02]">{t.devHeading}</h2>
        <p className="mt-5 text-lg text-text-secondary max-w-md">{t.devDesc}</p>
        <Link href="/developers" className="mt-8 inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-brand-navy text-white font-medium hover:bg-brand-primary transition-colors">
          <IconCode size={16} /> {t.devCta}
        </Link>
      </div>
      <pre className="rounded-xl bg-brand-navy text-[13px] leading-relaxed text-white/80 p-6 overflow-x-auto shadow-[var(--shadow-elevated)]">
        <code>
          <span className="text-white/40"># Request a payment from any network</span>
          {"\n"}<span className="text-brand-cyan">POST</span> /v1/payments/stk-push
          {"\n\n"}{"{"}
          {"\n"}  <span className="text-brand-cyan">&quot;rail&quot;</span>: &quot;AIRTEL&quot;,
          {"\n"}  <span className="text-brand-cyan">&quot;phone&quot;</span>: &quot;+255754112233&quot;,
          {"\n"}  <span className="text-brand-cyan">&quot;amount_tzs&quot;</span>: 12500,
          {"\n"}  <span className="text-brand-cyan">&quot;till&quot;</span>: &quot;558120&quot;
          {"\n"}{"}"}
          {"\n\n"}<span className="text-white/40"># → webhook</span>
          {"\n"}payment.succeeded  <span className="text-[#34D399]">200 OK</span>
        </code>
      </pre>
    </Wrap>
  );
};

/** 05 — FAQ (native details/summary, keyboard accessible) */
export const Faq: React.FC = () => {
  const t = useLanguage().dict.landing;
  const qa = [
    [t.faq1Q, t.faq1A],
    [t.faq2Q, t.faq2A],
    [t.faq3Q, t.faq3A],
    [t.faq4Q, t.faq4A],
    [t.faq5Q, t.faq5A],
    [t.faq6Q, t.faq6A],
    [t.faq7Q, t.faq7A],
    [t.faq8Q, t.faq8A],
    [t.faq9Q, t.faq9A],
    [t.faq10Q, t.faq10A],
  ];
  return (
    <Wrap className="pb-20 sm:pb-28 grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
      <div>
        <Kicker n="05">FAQ</Kicker>
        <h2 className="font-heading font-extrabold text-4xl sm:text-5xl mt-5">{t.faqHeading}</h2>
      </div>
      <div className="border-t border-border-subtle">
        {qa.map(([q, a]) => (
          <details key={q} className="group border-b border-border-subtle py-5">
            <summary className="flex justify-between items-center gap-4 cursor-pointer list-none font-medium text-lg">
              {q}
              <span className="font-mono text-brand-primary text-xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-text-secondary leading-relaxed max-w-xl">{a}</p>
          </details>
        ))}
      </div>
    </Wrap>
  );
};

/** Closing CTA */
export const ClosingCta: React.FC = () => {
  const t = useLanguage().dict.landing;
  return (
    <Wrap className="pb-24">
      <div className="hero-solid rounded-2xl px-7 py-12 sm:px-14 sm:py-20 text-white overflow-hidden grid md:grid-cols-[1fr_auto] gap-8 items-center">
        <div>
        <h2 className="font-heading font-extrabold text-4xl sm:text-6xl max-w-2xl leading-[1]">{t.ctaHeading}</h2>
        <Link href="/signup" className="mt-10 inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-white text-brand-navy font-medium hover:bg-brand-cyan hover:text-white transition-colors">
          {t.ctaButton} <IconArrow size={16} />
        </Link>
        </div>
        <LogoMark size={200} className="hidden md:block text-brand-cyan drop-shadow-2xl" />
      </div>
    </Wrap>
  );
};

/** Consumer promises (from the original lipapesa.co.tz carousel), shown all at once on an azure band. */
export const Promises: React.FC = () => {
  const t = useLanguage().dict.landing;
  const items = [
    { Icon: BillsGlyph, title: t.promise1T, desc: t.promise1D },
    { Icon: IconShield, title: t.promise2T, desc: t.promise2D },
    { Icon: IconSignal, title: t.promise3T, desc: t.promise3D },
  ];
  return (
    <section className="relative overflow-hidden text-white" style={{ background: "linear-gradient(115deg, #0070C0 0%, var(--brand-primary) 45%, #4FB4F0 100%)" }}>
      {/* Watermark wordmark, echoing the original site */}
      <p aria-hidden="true" className="pointer-events-none select-none absolute -bottom-[0.22em] left-1/2 -translate-x-1/2 font-heading font-extrabold leading-none tracking-[-0.06em] text-[34vw] lg:text-[26vw] text-white/[0.07] whitespace-nowrap">
        lipapesa
      </p>
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-20 sm:py-28">
        <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-white/75">{t.promiseKicker}</p>
        <div className="mt-10 grid md:grid-cols-3 gap-4 md:gap-5">
          {items.map(({ Icon, title, desc }, i) => (
            <article key={title} className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm p-7 flex flex-col min-h-[240px] hover:bg-white/15 transition-colors">
              <div className="flex items-center justify-between">
                <span className="h-12 w-12 rounded-xl bg-white text-brand-primary grid place-items-center shadow-lg"><Icon size={24} /></span>
                <span className="font-mono text-[12px] text-white/60">0{i + 1}/03</span>
              </div>
              <h3 className="font-heading font-extrabold text-[26px] leading-[1.05] mt-auto pt-10">{title}</h3>
              <p className="mt-2 text-[15px] text-white/85 leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const BillsGlyph: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
    <rect x="3" y="5" width="15" height="9" rx="2" transform="rotate(-10 10 9)" />
    <rect x="6" y="10" width="15" height="9" rx="2" />
    <circle cx="13.5" cy="14.5" r="2" />
  </svg>
);
