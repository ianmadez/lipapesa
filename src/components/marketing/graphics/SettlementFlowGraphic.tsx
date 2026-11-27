"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { BRAND_METRICS } from "@/config/brand";
import { mockMerchantService } from "@/services/mock";
import { DEMO_ROLE_PRESETS } from "@/config/navigation";

type TillPreset = Extract<(typeof DEMO_ROLE_PRESETS)[number], { tillNumber: string }>;
const DEMO_TILL = DEMO_ROLE_PRESETS.find((p): p is TillPreset => "tillNumber" in p)?.tillNumber ?? "";

const fmt = (n: number) => `TZS ${n.toLocaleString("en-US")}`;
const RATES = [BRAND_METRICS.minMdrPercent, BRAND_METRICS.defaultMdrPercent, BRAND_METRICS.maxMdrPercent];

/**
 * Till Collection -> MDR deduction -> Monthly settlement -> Webhook sync.
 * MDR math comes from `mockMerchantService.calculateMdr`. The viewer can switch the rate (5.0 / 5.5 / 6.0%).
 */
export const SettlementFlowGraphic: React.FC<{ grossTzs?: number; className?: string }> = ({
  grossTzs = BRAND_METRICS.demoMonthlyGrossTzs,
  className = "",
}) => {
  const { dict } = useLanguage();
  const g = dict.pages.graphics;
  const [rate, setRate] = useState<number>(BRAND_METRICS.defaultMdrPercent);
  const calc = mockMerchantService.calculateMdr(grossTzs, rate);
  const netShare = calc.netAmountTzs / calc.grossAmountTzs;

  const stages = [
    { n: "01", title: g.tillCollection, sub: g.tillSub, value: fmt(calc.grossAmountTzs), tone: "text-brand-navy" },
    { n: "02", title: g.mdrCalc, sub: g.mdrSub, value: `− ${fmt(calc.mdrFeeTzs)}`, tone: "text-status-pending" },
    { n: "03", title: g.settlement, sub: g.settlementSub, value: fmt(calc.netAmountTzs), tone: "text-status-success" },
  ];

  return (
    <div className={`rounded-xl border border-border-subtle bg-white overflow-hidden ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-border-subtle">
        <p className="font-mono text-[12px] text-text-muted">{DEMO_TILL} · {dict.pages.shared.perMonth}</p>
        <div role="radiogroup" aria-label="MDR" className="flex rounded-lg border border-border-subtle overflow-hidden font-mono text-[12px]">
          {RATES.map((r) => (
            <button
              key={r}
              type="button"
              role="radio"
              aria-checked={rate === r}
              onClick={() => setRate(r)}
              className={`px-3 h-8 tabular-nums cursor-pointer transition-colors ${rate === r ? "bg-brand-primary text-white" : "text-text-secondary hover:text-brand-primary"}`}
            >
              {r.toFixed(1)}%
            </button>
          ))}
        </div>
      </div>

      <ol className="grid sm:grid-cols-3">
        {stages.map((s, i) => (
          <li key={s.n} className="relative p-5 border-b sm:border-b-0 sm:border-r last:border-0 border-border-subtle">
            <span className="font-mono text-[11px] text-brand-primary">{s.n}</span>
            <p className="font-heading font-bold text-[17px] mt-1">{s.title}</p>
            <p className="text-[13px] text-text-muted">{s.sub}</p>
            <p className={`font-mono tabular-nums text-[18px] mt-4 ${s.tone}`}>{s.value}</p>
            {i < 2 && (
              <svg aria-hidden className="hidden sm:block absolute -right-[9px] top-1/2 -translate-y-1/2 z-10" width="18" height="18" viewBox="0 0 18 18">
                <circle cx="9" cy="9" r="8.5" fill="#fff" stroke="#E2E8F0" />
                <path d="M7 5.5L10.5 9 7 12.5" fill="none" stroke="#0084D6" strokeWidth="1.5" />
              </svg>
            )}
          </li>
        ))}
      </ol>

      {/* Proportion bar: net vs MDR */}
      <div className="px-5 pt-1 pb-5">
        <div className="h-2 rounded-sm bg-status-pending/25 overflow-hidden flex">
          <div className="h-full bg-status-success transition-[width] duration-500" style={{ width: `${netShare * 100}%` }} />
        </div>
      </div>

      <div className="bg-brand-navy text-white/80 px-5 py-4 font-mono text-[12px] leading-relaxed">
        <p className="text-white/50">
          {"// "}
          {g.webhook} — {g.webhookSub}
        </p>
        <p>
          <span className="text-brand-cyan">POST</span> /webhooks/lipapesa{" "}
          <span className="text-status-success">200</span>
        </p>
        <p className="break-all">
          {`{ "event": "payment.settled", "gross": ${calc.grossAmountTzs}, "mdr_rate": ${calc.mdrRatePercent}, "net": ${calc.netAmountTzs} }`}
        </p>
      </div>
    </div>
  );
};
