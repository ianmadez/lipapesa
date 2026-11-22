"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { BRAND_INFO } from "@/config/brand";
import { mockPaymentService } from "@/services/mock";
import type { PaymentRail, Transaction } from "@/types/fintech";
import { IconCheck, IconLock, IconSend, IconWithdraw } from "@/components/ui/icons";

type Mode = "C2B" | "B2C";
type Step = "idle" | "sent" | "pin" | "confirming" | "done";
const QUICK_AMOUNTS = [5000, 12500, 30000, 100000];
const TILL = "558120";
const fmt = (n: number) => `TZS ${n.toLocaleString("en-US")}`;
const fmtPhone = (raw: string) => `+255 ${raw.replace(/\D/g, "").replace(/^0/, "").replace(/(\d{3})(\d{3})(\d{0,3})/, "$1 $2 $3").trim()}`;

const StatusBar: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <div className={`relative z-20 flex justify-between items-center px-7 pt-[15px] h-11 text-[12px] font-semibold ${dark ? "text-white" : "text-brand-navy"}`}>
    <span className="font-mono">9:41</span>
    <span className="flex items-center gap-1.5" aria-hidden="true">
      <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="5" width="3" height="6" rx="1" /><rect x="9" y="2.5" width="3" height="8.5" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" /></svg>
      <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x=".5" y=".5" width="21" height="11" rx="3.5" stroke="currentColor" opacity=".45" /><rect x="2" y="2" width="15" height="8" rx="2" fill="currentColor" /><rect x="23" y="4" width="1.5" height="4" rx=".75" fill="currentColor" opacity=".45" /></svg>
    </span>
  </div>
);

/** The interactive screen. Rendered inside a phone frame (desktop) or full-screen (mobile). */
const SimulatorScreen: React.FC<{ frameless?: boolean }> = ({ frameless }) => {
  const { dict } = useLanguage();
  const t = dict.landing;
  const s = dict.simulator;
  const [mode, setMode] = useState<Mode>("C2B");
  const [rail, setRail] = useState<PaymentRail>("MPESA");
  const [phone, setPhone] = useState("754 112 233");
  const [amount, setAmount] = useState(12500);
  const [step, setStep] = useState<Step>("idle");
  const [pin, setPin] = useState("");
  const [tx, setTx] = useState<Transaction | null>(null);
  const railMeta = BRAND_INFO.supportedRails.find((r) => r.id === rail)!;
  const fullPhone = `+255${phone.replace(/\D/g, "").replace(/^0/, "")}`;
  const busy = step !== "idle";
  const valid = amount >= 500 && phone.replace(/\D/g, "").length >= 9;

  const start = async () => {
    if (!valid) return;
    setStep("sent");
    if (mode === "C2B") {
      setTimeout(() => setStep("pin"), 1100);
    } else {
      const result = await mockPaymentService.disburse({ recipientPhone: fullPhone, amountTzs: amount, rail, description: "B2C payout" });
      setTx(result);
      setStep("done");
    }
  };

  const press = async (d: string) => {
    if (d === "del") return setPin((p) => p.slice(0, -1));
    const next = (pin + d).slice(0, 4);
    setPin(next);
    if (next.length < 4) return;
    setStep("confirming");
    const result = await mockPaymentService.sendStkPush({
      customerPhone: fullPhone,
      amountTzs: amount,
      rail,
      tillNumber: TILL,
      category: "MERCHANT_TILL",
      description: t.phoneMerchant,
    });
    setTx(result);
    setStep("done");
  };

  const reset = () => {
    setStep("idle");
    setPin("");
    setTx(null);
  };

  const stepIndex = { idle: 0, sent: 1, pin: 2, confirming: 2, done: 3 }[step];
  const steps = mode === "C2B" ? [t.stepIdle, t.stepSent, t.stepPin, t.stepDone] : [t.stepIdle, t.stepSent, t.stepDone];
  const shownIndex = mode === "C2B" ? stepIndex : Math.min(stepIndex, 2);

  return (
    <div className="relative h-full flex flex-col bg-bg-canvas">
      {/* Header */}
      <div className="bg-brand-navy text-white pb-4">
        {frameless ? <div className="h-14" /> : <StatusBar dark />}
        <div className="px-5 pt-2">
          <div className="grid grid-cols-2 p-1 rounded-xl bg-white/10 text-[12px] font-medium" role="tablist">
            {(["C2B", "B2C"] as Mode[]).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                disabled={busy}
                onClick={() => setMode(m)}
                className={`h-8 rounded-lg inline-flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-default transition-colors ${mode === m ? "bg-white text-brand-navy" : "text-white/70 hover:text-white"}`}
              >
                {m === "C2B" ? <IconWithdraw size={13} /> : <IconSend size={13} />}
                {m === "C2B" ? t.tabCollect : t.tabPayout}
                <span className="font-mono text-[9px] opacity-60">{m}</span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-white/50">{mode === "C2B" ? t.phonePayTo : s.tabB2C}</p>
          <p className="font-heading font-bold text-[17px] leading-tight">{mode === "C2B" ? t.phoneMerchant : t.recipientPhone}</p>
          <p className="font-mono text-[11px] text-white/55">{mode === "C2B" ? `Till ${TILL}` : fmtPhone(phone)}</p>
          {/* Stepper */}
          <ol className="mt-3 flex items-center gap-1.5" aria-label="Progress">
            {steps.map((label, i) => (
              <li key={label} className="flex-1">
                <span className={`block h-1 rounded-full transition-colors duration-500 ${i <= shownIndex ? "bg-brand-cyan" : "bg-white/15"}`} />
                <span className={`block mt-1 text-[9px] font-mono ${i <= shownIndex ? "text-white" : "text-white/40"}`}>{label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-5 py-3.5 flex flex-col gap-3 min-h-0">
        <div>
          <p className="text-[10.5px] font-medium text-text-muted mb-1.5">{s.selectRail}</p>
          <div className="grid grid-cols-5 gap-1.5">
            {BRAND_INFO.supportedRails.map((r) => (
              <button
                key={r.id}
                type="button"
                disabled={busy}
                onClick={() => setRail(r.id)}
                aria-pressed={rail === r.id}
                aria-label={r.name}
                title={r.name}
                className={`h-10 rounded-lg border flex flex-col items-center justify-center gap-1 cursor-pointer disabled:cursor-default transition-all ${
                  rail === r.id ? "border-brand-navy bg-white shadow-sm" : "border-border-subtle bg-white/70"
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} />
                <span className="text-[8.5px] font-mono leading-none text-brand-navy">{r.id === "HALOPESA" ? "HALO" : r.id}</span>
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="block text-[10.5px] font-medium text-text-muted mb-1.5">{mode === "C2B" ? t.customerPhone : t.recipientPhone}</span>
          <span className="flex h-10 rounded-lg border border-border-subtle bg-white focus-within:border-brand-primary overflow-hidden">
            <span className="px-2.5 grid place-items-center font-mono text-[12px] text-text-muted border-r border-border-subtle">+255</span>
            <input
              value={phone}
              disabled={busy}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              aria-label={mode === "C2B" ? t.customerPhone : t.recipientPhone}
              className="flex-1 min-w-0 px-2.5 font-mono text-[13px] text-brand-navy bg-transparent focus:outline-none"
            />
          </span>
        </label>

        <div>
          <span className="block text-[10.5px] font-medium text-text-muted mb-1">{s.amountLabel}</span>
          <div className="flex items-baseline gap-1.5 border-b border-border-subtle focus-within:border-brand-primary">
            <span className="font-mono text-[13px] text-text-muted">TZS</span>
            <input
              value={amount ? amount.toLocaleString("en-US") : ""}
              disabled={busy}
              onChange={(e) => setAmount(Number(e.target.value.replace(/\D/g, "")) || 0)}
              inputMode="numeric"
              aria-label={s.amountLabel}
              className="w-full font-mono text-[26px] font-medium tracking-tight text-brand-navy bg-transparent focus:outline-none py-0.5"
            />
          </div>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {QUICK_AMOUNTS.map((a) => (
              <button
                key={a}
                type="button"
                disabled={busy}
                onClick={() => setAmount(a)}
                className={`h-7 rounded-md text-[10.5px] font-mono cursor-pointer disabled:cursor-default transition-colors ${
                  amount === a ? "bg-brand-primary text-white" : "bg-white border border-border-subtle text-brand-navy hover:border-brand-primary"
                }`}
              >
                {a >= 1000 ? `${a / 1000}K` : a}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto pb-3">
          <button
            type="button"
            onClick={start}
            disabled={busy || !valid}
            className="w-full h-12 rounded-2xl bg-brand-primary hover:bg-brand-primary-dark disabled:bg-brand-primary/60 text-white font-medium text-[14px] cursor-pointer disabled:cursor-default transition-colors"
          >
            {step === "sent"
              ? `${mode === "C2B" ? t.sendingTo : t.disbursingTo} ${fmtPhone(phone)}…`
              : mode === "C2B"
                ? s.simulateButton
                : s.disburseButton}
          </button>
          <p className="text-center text-[10px] text-text-muted mt-1.5">{t.phoneHint}</p>
        </div>
      </div>

      {/* Network PIN prompt (C2B) */}
      {(step === "pin" || step === "confirming") && (
        <div className="fade-in absolute inset-0 z-20 bg-brand-navy/55 backdrop-blur-[2px] flex items-end">
          <div className="sheet-up w-full bg-white rounded-t-[28px] px-5 pt-3 pb-7">
            <span className="block mx-auto h-1 w-9 rounded-full bg-border-subtle" />
            <p className="mt-3 flex items-center gap-2 text-[13px] font-semibold text-brand-navy">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: railMeta.color }} />
              {railMeta.name}
              <IconLock size={13} className="ml-auto text-text-muted" />
            </p>
            <p className="text-[12px] text-text-secondary mt-1.5 leading-snug">
              {t.phonePayTo} <b>{t.phoneMerchant}</b> · <span className="font-mono">{fmt(amount)}</span>
            </p>
            <p className="text-[11px] text-text-muted mt-1">{step === "confirming" ? t.confirming : t.phonePin}</p>
            <div className="flex justify-center gap-3 my-4" aria-live="polite">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={`h-3 w-3 rounded-full transition-colors ${i < pin.length ? "bg-brand-navy" : "bg-border-subtle"}`} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"].map((d, i) =>
                d ? (
                  <button
                    key={i}
                    type="button"
                    disabled={step === "confirming"}
                    onClick={() => press(d)}
                    aria-label={d === "del" ? "Delete" : d}
                    className="h-11 rounded-xl bg-bg-canvas hover:bg-border-subtle font-mono text-lg text-brand-navy cursor-pointer disabled:opacity-50"
                  >
                    {d === "del" ? "⌫" : d}
                  </button>
                ) : (
                  <span key={i} />
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Receipt */}
      {step === "done" && tx && (
        <div className="fade-in absolute inset-0 z-20 bg-white flex flex-col px-6 pt-16 pb-7">
          <span className="h-14 w-14 rounded-full bg-status-success/10 text-status-success grid place-items-center">
            <IconCheck size={28} />
          </span>
          <p className="font-heading font-bold text-[22px] mt-4 text-brand-navy">{mode === "C2B" ? s.successHeader : t.paidOut}</p>
          <p className="font-mono text-[28px] mt-1 text-brand-navy">{fmt(tx.grossAmountTzs)}</p>
          <dl className="mt-5 text-[12px] divide-y divide-border-subtle border-y border-border-subtle">
            {(mode === "C2B"
              ? [
                  [s.receiptRef, tx.reference],
                  [s.receiptTill, tx.tillNumber ?? TILL],
                  [t.phoneNetwork, railMeta.name],
                  [s.receiptMdr, fmt(tx.mdrFeeTzs)],
                  [s.receiptNet, fmt(tx.netAmountTzs)],
                ]
              : [
                  [s.receiptRef, tx.reference],
                  [t.recipientPhone, fmtPhone(phone)],
                  [t.phoneNetwork, railMeta.name],
                  [dict.common.status, dict.common.success],
                ]
            ).map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 gap-3">
                <dt className="text-text-muted">{k}</dt>
                <dd className="font-mono text-right truncate text-brand-navy">{v}</dd>
              </div>
            ))}
          </dl>
          {mode === "C2B" && <p className="mt-3 text-[10px] text-text-muted">{s.mdrNote}</p>}
          <button
            type="button"
            onClick={reset}
            className="mt-auto h-12 rounded-2xl border border-brand-navy text-brand-navy font-medium text-[14px] cursor-pointer hover:bg-bg-canvas"
          >
            {s.newSimulation}
          </button>
        </div>
      )}
    </div>
  );
};

/** Phone frame (desktop / hero) or full-bleed screen (mobile full-screen demo). */
export const PhoneSimulator: React.FC<{ frameless?: boolean }> = ({ frameless }) =>
  frameless ? (
    <div className="h-full" role="group" aria-label="Payment demo">
      <SimulatorScreen frameless />
    </div>
  ) : (
    <div className="phone" role="group" aria-label="Payment demo">
      <div className="phone-screen">
        <div className="phone-island" />
        <SimulatorScreen />
        <div className="phone-homebar" />
      </div>
    </div>
  );
