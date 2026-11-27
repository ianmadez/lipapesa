"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Brand";
import { useLanguage } from "@/i18n/LanguageContext";
import { BRAND_INFO } from "@/config/brand";
import { DEMO_ROLE_PRESETS } from "@/config/navigation";
import { mockAuthService, mockStorage } from "@/services/mock";
import type { LipaPesaState, MerchantVertical, UserRole } from "@/types/fintech";
import { IconMail, IconPin, IconPhone } from "@/components/ui/icons";

export const Footer: React.FC = () => {
  const { language, dict } = useLanguage();
  const en = language === "en";
  const t = dict.landing;
  const [state, setState] = useState<LipaPesaState>(() => mockStorage.getState());

  useEffect(() => mockStorage.subscribe(setState), []);

  const switchRole = async (role: UserRole, vertical?: MerchantVertical) => {
    await mockAuthService.switchDemoRole(role, vertical);
    setState(mockStorage.getState());
  };

  const cols: { title: string; links: [string, string][] }[] = [
    {
      title: t.footerProducts,
      links: [
        [en ? "Consumer Pay" : "Malipo ya Mteja", "/portal/pay"],
        ["Wakala Chap Chap", "/portal/wakala"],
        [en ? "Merchant Tills" : "Till za Biashara", "/portal/merchant"],
        ["Edu-Pay", "/portal/merchant?vertical=school"],
      ],
    },
    {
      title: t.footerDevelopers,
      links: [
        [en ? "API preview" : "Hakikisho la API", "/developers"],
        ["Webhooks", "/developers#webhooks"],
        ["Sandbox", "/developers#sandbox"],
        [en ? "Status" : "Hali", "/developers#status"],
      ],
    },
    {
      title: t.footerCompany,
      links: [
        [dict.nav.company, "/company"],
        [dict.nav.products, "/products"],
        [dict.nav.services, "/services"],
        [dict.nav.clients, "/clients"],
        [dict.nav.login, "/login"],
        [dict.nav.signup, "/signup"],
      ],
    },
  ];

  return (
    <footer className="bg-brand-navy text-white/70 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo className="h-9 w-auto brightness-0 invert" />
            <p className="mt-4 text-white text-lg font-heading font-bold max-w-xs">{t.footerTagline}</p>
            <ul className="mt-6 space-y-2.5 text-[14px]">
              <li className="flex gap-2.5"><IconPin size={16} className="mt-0.5 text-brand-cyan shrink-0" />{BRAND_INFO.address}</li>
              <li className="flex gap-2.5"><IconMail size={16} className="mt-0.5 text-brand-cyan shrink-0" />
                <a href={`mailto:${BRAND_INFO.supportEmail}`} className="hover:text-white">{BRAND_INFO.supportEmail}</a>
              </li>
              <li className="flex gap-2.5"><IconPhone size={16} className="mt-0.5 text-brand-cyan shrink-0" /><span className="font-mono">{BRAND_INFO.supportPhone}</span></li>
            </ul>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {cols.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/40">{c.title}</p>
                <ul className="mt-4 space-y-2.5 text-[14px]">
                  {c.links.map(([label, href]) => (
                    <li key={href + label}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Demo role switcher, kept for stakeholder walkthroughs */}
        <div className="mt-14 py-5 border-y border-white/10 flex flex-col md:flex-row md:items-center gap-3 justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/40">{t.footerDemo}</p>
          <div className="flex flex-wrap gap-1.5">
            {DEMO_ROLE_PRESETS.map((p) => {
              const vertical = "vertical" in p ? p.vertical : undefined;
              const active = state.session?.role === p.role && (!vertical || state.session?.merchantVertical === vertical);
              return (
                <button
                  key={p.labelEn}
                  type="button"
                  aria-pressed={active}
                  onClick={() => switchRole(p.role, vertical)}
                  className={`h-8 px-3 rounded-md text-[12px] font-mono cursor-pointer transition-colors ${
                    active ? "bg-brand-primary text-white" : "border border-white/15 hover:border-white/40"
                  }`}
                >
                  {en ? p.labelEn : p.labelSw}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row justify-between gap-3 text-[12px] text-white/40">
          <p>© {new Date().getFullYear()} {BRAND_INFO.legalName} · {BRAND_INFO.domain}</p>
          <p className="font-mono">{BRAND_INFO.regulations.slice(0, 2).join(" · ")}</p>
        </div>
      </div>
    </footer>
  );
};
