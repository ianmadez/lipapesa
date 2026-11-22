"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { BRAND_INFO } from "@/config/brand";
import {
  IconShield as ShieldCheck,
  IconStore as Building2,
  IconSignal as Network,
  IconLock as Lock,
  IconArrow as ArrowRight,
  IconPin as MapPin,
  IconMail as Mail,
  IconCheck as CheckCircle2,
} from "@/components/ui/icons";

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#061526] font-sans antialiased selection:bg-[#0084D6] selection:text-white">
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Hero Section */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0084D6]/10 text-[#0084D6] text-xs font-semibold">
              <Building2 className="w-4 h-4" />
              <span>{BRAND_INFO.legalName}</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#061526] tracking-tight leading-tight">
              {language === "en"
                ? "Connecting Tanzania's Financial Rails with Architectural Precision"
                : "Kuunganisha Mifumo ya Kifedha ya Tanzania kwa Ufanisi wa Juu"}
            </h1>
            <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
              {language === "en"
                ? "Headquartered in Dar es Salaam, LipaPesa is an institutional digital financial suite engineered to bridge Mobile Wallets (Vodacom M-Pesa, Mix by Yas, Airtel Money, Halopesa) and global VISA rails for businesses, schools, and agents."
                : "Makao makuu yakiwa Dar es Salaam, LipaPesa ni mfumo wa kidijitali wa huduma za kifedha unaounganisha pochi zote za simu na mtandao wa kimataifa wa VISA kwa wafanyabiashara, shule na mawakala."}
            </p>
          </div>

          {/* Three Key Pillars: HQ, Rail Switching, Compliance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-architectural p-6 bg-white space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[#0084D6]/10 text-[#0084D6] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#061526]">
                {language === "en" ? "Dar es Salaam HQ" : "Makao Makuu Dar es Salaam"}
              </h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                {BRAND_INFO.address}. Fully licensed and registered under the laws of the United Republic of Tanzania.
              </p>
            </div>

            <div className="card-architectural p-6 bg-white space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[#0095E8]/10 text-[#0095E8] flex items-center justify-center">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#061526]">
                {language === "en" ? "Multi-Rail Switching" : "Muungano wa Mitandao"}
              </h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Seamless interoperability across Vodacom M-Pesa, Mix by Yas, Airtel Money, Halopesa, and VISA Direct APIs.
              </p>
            </div>

            <div className="card-architectural p-6 bg-white space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[#059669]/10 text-[#059669] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#061526]">
                {language === "en" ? "BOT & PDPA 2022" : "BOT & PDPA 2022"}
              </h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                In strict compliance with Bank of Tanzania payment system standards and local PDPA 2022 data residency mandates.
              </p>
            </div>
          </div>

          {/* Strategic Partnership & Vision Section */}
          <div className="card-architectural p-8 sm:p-10 bg-white space-y-6">
            <h2 className="font-heading font-bold text-2xl text-[#061526]">
              {language === "en"
                ? "Enterprise Telecom Partnership & Institutional Trust"
                : "Ushirikiano wa Kimkakati na Uaminifu wa Kitaasisi"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#334155] leading-relaxed">
              <div className="space-y-4">
                <p>
                  {language === "en"
                    ? "Through our enterprise integration with Vodacom M-Pesa OpenAPI and interoperable mobile payment rails, LipaPesa processes high-frequency C2B collections and automated B2C disbursements with sub-second latency."
                    : "Kupitia ushirikiano wetu na mfumo wa Vodacom M-Pesa OpenAPI na mitandao ya simu nchini, LipaPesa inashughulikia makusanyo ya wateja (C2B) na ulipaji wa fedha (B2C) kwa kasi ya kipekee."}
                </p>
                <p>
                  {language === "en"
                    ? "Our unique 5.0% - 6.0% MDR calendar settlement engine enables merchants and educational institutions (Edu-Pay) to automate their reconciliation cycles without manual intervention."
                    : "Mfumo wetu wa makazi ya mwezi wa 5.0% - 6.0% MDR unaziwezesha biashara na shule (Edu-Pay) kusawazisha mahesabu yao ya fedha kiotomatiki bila usumbufu."}
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 font-mono text-xs">
                <span className="font-heading font-bold text-sm text-[#061526] block">
                  Regulatory Compliance Checklist
                </span>
                <ul className="space-y-2 text-[#334155]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Bank of Tanzania (BOT) Guidelines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>PDPA 2022 In-Country Data Residency</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Mandatory 2FA on Voucher & Float Vends</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>HMAC-SHA256 Webhook Verification</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs font-mono text-[#334155]">
                <span>Contact: {BRAND_INFO.supportEmail}</span>
                <span>&bull;</span>
                <span>{BRAND_INFO.supportPhone}</span>
              </div>
              <Link
                href="/developers"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#0084D6] hover:underline"
              >
                <span>{language === "en" ? "Explore Developer API →" : "Tazama Mwongozo wa API →"}</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
