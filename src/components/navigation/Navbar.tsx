"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";
import { MARKETING_NAV_ITEMS, AUTH_NAV_ACTIONS } from "@/config/navigation";
import { QuickServicesDrawer } from "./QuickServicesDrawer";
import { SiteMenu, MenuGlyph, isActivePath } from "./SiteMenu";
import { IconArrow, IconGlobe, IconGrid, IconClose } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Brand";

/** Site header. Owns the Quick Services drawer, which opens anchored under its trigger. */
export const Navbar: React.FC = () => {
  const { language, toggleLanguage, dict } = useLanguage();
  const [menu, setMenu] = useState<"services" | "site" | null>(null);
  const open = menu === "services";
  const close = () => setMenu(null);
  const en = language === "en";
  const pathname = usePathname() || "/";
  const isActive = (href: string) => isActivePath(pathname, href);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-border-subtle">
      <div className="w-full px-4 sm:px-6 lg:px-10 h-16 grid grid-cols-[1fr_auto] xl:grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="flex items-center gap-3 sm:gap-4 justify-self-start">
          <Link href="/" aria-label="LipaPesa home" className="shrink-0">
            <Logo priority className="h-7 sm:h-8 w-auto" />
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenu((m) => (m === "services" ? null : "services"))}
              aria-expanded={open}
              aria-controls="quick-services"
              className={`flex items-center gap-2 h-9 px-3 rounded-lg border text-[13px] font-medium transition-colors cursor-pointer ${
                open
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "border-border-subtle text-brand-navy hover:border-brand-primary hover:text-brand-primary"
              }`}
            >
              {open ? <IconClose size={16} /> : <IconGrid size={16} />}
              <span className="hidden md:inline">{dict.nav.quickServices}</span>
            </button>
            <QuickServicesDrawer isOpen={open} onClose={close} />
          </div>
        </div>

        <nav aria-label="Primary" className="hidden xl:flex items-center gap-6 text-[14px] font-medium text-text-secondary">
          {MARKETING_NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative py-1 transition-colors hover:text-brand-primary ${
                isActive(item.href) ? "text-brand-navy after:absolute after:left-0 after:right-0 after:-bottom-[21px] after:h-0.5 after:bg-brand-primary" : ""
              }`}
            >
              {en ? item.labelEn : item.labelSw}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 justify-self-end">
          <button
            type="button"
            onClick={toggleLanguage}
            title="Badili Lugha / Switch Language"
            className="flex items-center gap-1.5 h-9 px-2.5 rounded-lg border border-border-subtle hover:border-brand-primary text-[13px] font-medium transition-colors cursor-pointer"
          >
            <IconGlobe size={15} className="text-brand-primary" />
            <span className="font-mono text-[12px]">{language.toUpperCase()}</span>
          </button>
          <Link
            href={AUTH_NAV_ACTIONS.login.href}
            className="hidden sm:inline-flex text-[13px] font-medium text-text-secondary hover:text-brand-primary px-2 transition-colors"
          >
            {en ? AUTH_NAV_ACTIONS.login.labelEn : AUTH_NAV_ACTIONS.login.labelSw}
          </Link>
          <Link
            href={AUTH_NAV_ACTIONS.signup.href}
            className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-brand-primary hover:bg-brand-primary-dark text-white text-[13px] font-medium transition-colors"
          >
            {en ? AUTH_NAV_ACTIONS.signup.labelEn : AUTH_NAV_ACTIONS.signup.labelSw}
            <IconArrow size={14} />
          </Link>
          <div className="relative xl:hidden">
            <button
              type="button"
              onClick={() => setMenu((m) => (m === "site" ? null : "site"))}
              aria-expanded={menu === "site"}
              aria-controls="site-menu"
              aria-label={en ? "Menu" : "Menyu"}
              className={`grid place-items-center h-9 w-9 rounded-lg border transition-colors cursor-pointer ${
                menu === "site" ? "border-brand-navy bg-brand-navy text-white" : "border-border-subtle text-brand-navy hover:border-brand-primary"
              }`}
            >
              <MenuGlyph open={menu === "site"} />
            </button>
            <SiteMenu isOpen={menu === "site"} onClose={close} pathname={pathname} />
          </div>
        </div>
      </div>
    </header>
  );
};
