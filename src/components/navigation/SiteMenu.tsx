"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { MARKETING_NAV_ITEMS, AUTH_NAV_ACTIONS } from "@/config/navigation";
import { IconArrow } from "@/components/ui/icons";

/** True when `href` is the page the user is on. Home only matches "/" exactly. */
export const isActivePath = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

/** Hamburger glyph that morphs into a close cross. */
export const MenuGlyph: React.FC<{ open: boolean }> = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <path d={open ? "M4 4l10 10" : "M2.5 5h13"} className="transition-all" />
    {!open && <path d="M2.5 9h13" />}
    <path d={open ? "M14 4L4 14" : "M2.5 13h13"} className="transition-all" />
  </svg>
);

/**
 * Site navigation menu (below the xl breakpoint). Opens from the right-hand trigger,
 * separate from the Quick Services panel on the left (ADR-013).
 */
export const SiteMenu: React.FC<{ isOpen: boolean; onClose: () => void; pathname: string }> = ({ isOpen, onClose, pathname }) => {
  const { language } = useLanguage();
  const en = language === "en";
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 top-16 z-30 bg-brand-navy/30" onClick={onClose} aria-hidden="true" />
      <div
        id="site-menu"
        ref={panelRef}
        role="dialog"
        aria-label={en ? "Site menu" : "Menyu ya tovuti"}
        className="drawer-in z-40 fixed left-0 right-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto sm:absolute sm:left-auto sm:right-0 sm:top-[calc(100%+12px)] sm:w-[320px] bg-white border border-border-subtle sm:rounded-xl shadow-[var(--shadow-elevated)]"
      >
        <nav aria-label="Primary" className="p-2">
          {MARKETING_NAV_ITEMS.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={`relative flex items-center justify-between h-12 px-4 rounded-lg text-[15px] font-medium transition-colors ${
                  active ? "bg-azure-mist text-brand-primary" : "text-brand-navy hover:bg-bg-canvas"
                }`}
              >
                {active && <span aria-hidden className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-r bg-brand-primary" />}
                {en ? item.labelEn : item.labelSw}
                {active ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" aria-hidden />
                ) : (
                  <IconArrow size={15} className="text-text-muted" />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="grid grid-cols-2 gap-2 p-3 border-t border-border-subtle">
          <Link
            href={AUTH_NAV_ACTIONS.login.href}
            onClick={onClose}
            className="h-11 grid place-items-center rounded-lg border border-border-subtle text-[14px] font-medium text-brand-navy hover:border-brand-primary"
          >
            {en ? AUTH_NAV_ACTIONS.login.labelEn : AUTH_NAV_ACTIONS.login.labelSw}
          </Link>
          <Link
            href={AUTH_NAV_ACTIONS.signup.href}
            onClick={onClose}
            className="h-11 grid place-items-center rounded-lg bg-brand-primary hover:bg-brand-primary-dark text-white text-[14px] font-medium"
          >
            {en ? AUTH_NAV_ACTIONS.signup.labelEn : AUTH_NAV_ACTIONS.signup.labelSw}
          </Link>
        </div>
      </div>
    </>
  );
};
