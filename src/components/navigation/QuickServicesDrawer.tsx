"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { QUICK_SERVICES, MARKETING_NAV_ITEMS, AUTH_NAV_ACTIONS } from "@/config/navigation";
import { SERVICE_ICONS, IconBolt, IconArrow } from "@/components/ui/icons";

interface QuickServicesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilterCategory = "ALL" | "PAYMENT" | "TRANSFER" | "TELECOM" | "UTILITY";

const CATEGORIES: { id: FilterCategory; en: string; sw: string }[] = [
  { id: "ALL", en: "All", sw: "Zote" },
  { id: "PAYMENT", en: "Pay", sw: "Malipo" },
  { id: "TRANSFER", en: "Transfer", sw: "Uhamisho" },
  { id: "TELECOM", en: "Telecom", sw: "Mawasiliano" },
  { id: "UTILITY", en: "Bills", sw: "Bili" },
];

/**
 * Quick Services panel. Anchored directly under the navbar trigger (left side),
 * not a slide-over from the opposite edge. Full-width sheet below the header on mobile.
 */
export const QuickServicesDrawer: React.FC<QuickServicesDrawerProps> = ({ isOpen, onClose }) => {
  const { language, dict } = useLanguage();
  const en = language === "en";
  const [cat, setCat] = useState<FilterCategory>("ALL");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = cat === "ALL" ? QUICK_SERVICES : QUICK_SERVICES.filter((s) => s.category === cat);

  return (
    <>
      <div className="fixed inset-0 top-16 z-30 bg-brand-navy/30" onClick={onClose} aria-hidden="true" />
      <div
        id="quick-services"
        ref={panelRef}
        role="dialog"
        aria-label={dict.nav.quickServices}
        className="drawer-in z-40 fixed left-0 right-0 top-16 max-h-[calc(100dvh-4rem)] sm:absolute sm:top-[calc(100%+12px)] sm:left-0 sm:right-auto sm:w-[440px] sm:max-h-[70vh] flex flex-col bg-white border border-border-subtle sm:rounded-xl shadow-[var(--shadow-elevated)] overflow-hidden"
      >
        <div className="px-5 pt-5 pb-3">
          <p className="font-heading font-bold text-lg">{dict.nav.quickServices}</p>
          <p className="text-[13px] text-text-muted">{dict.nav.quickServicesSubtitle}</p>
          <div className="mt-4 flex gap-1.5 overflow-x-auto">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCat(c.id)}
                aria-pressed={cat === c.id}
                className={`px-3 h-8 rounded-md text-[12px] font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  cat === c.id ? "bg-brand-navy text-white" : "bg-bg-canvas text-text-secondary hover:bg-border-subtle"
                }`}
              >
                {en ? c.en : c.sw}
              </button>
            ))}
          </div>
        </div>

        <ul className="flex-1 overflow-y-auto px-3 pb-3 grid grid-cols-1 gap-1">
          {items.map((s) => {
            const Icon = SERVICE_ICONS[s.iconName] ?? IconBolt;
            return (
              <li key={s.id}>
                <Link
                  href={s.href}
                  onClick={onClose}
                  className="group flex items-center gap-3 p-2.5 rounded-lg hover:bg-bg-canvas transition-colors"
                >
                  <span className="h-9 w-9 shrink-0 grid place-items-center rounded-md border border-border-subtle text-brand-primary group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-colors">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-[14px] font-medium text-brand-navy">
                      {en ? s.labelEn : s.labelSw}
                      {s.popular && (
                        <span className="text-[10px] font-mono text-status-success">{en ? "popular" : "maarufu"}</span>
                      )}
                    </span>
                    <span className="block text-[12px] text-text-muted truncate">{en ? s.descriptionEn : s.descriptionSw}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile only: primary nav lives here since the centre links are hidden */}
        <nav aria-label="Primary" className="lg:hidden grid grid-cols-2 gap-px bg-border-subtle border-t border-border-subtle">
          {[...MARKETING_NAV_ITEMS, AUTH_NAV_ACTIONS.login].map((item) => (
            <Link key={item.href} href={item.href} onClick={onClose} className="bg-white h-12 grid place-items-center text-[13px] font-medium text-brand-navy hover:text-brand-primary">
              {en ? item.labelEn : item.labelSw}
            </Link>
          ))}
          <Link href={AUTH_NAV_ACTIONS.signup.href} onClick={onClose} className="sm:hidden col-span-2 h-12 grid place-items-center bg-brand-primary text-white text-[14px] font-medium">
            {en ? AUTH_NAV_ACTIONS.signup.labelEn : AUTH_NAV_ACTIONS.signup.labelSw}
          </Link>
        </nav>

        <div className="px-5 py-3 border-t border-border-subtle flex items-center justify-between text-[12px] text-text-muted">
          <span className="font-mono">BOT · PDPA 2022</span>
          <Link href="/portal/pay" onClick={onClose} className="inline-flex items-center gap-1 text-brand-primary font-medium hover:underline">
            {en ? "All services" : "Huduma zote"} <IconArrow size={13} />
          </Link>
        </div>
      </div>
    </>
  );
};
