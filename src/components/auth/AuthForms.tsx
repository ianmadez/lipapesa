"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";
import { BRAND_INFO } from "@/config/brand";
import { mockAuthService, mockPaymentService } from "@/services/mock";
import type { MerchantVertical, Transaction, UserRole } from "@/types/fintech";
import { IconArrow, IconPhone, IconStore, IconTicket, IconShield, IconCheck } from "@/components/ui/icons";
import { Logo, LogoMark } from "@/components/ui/Brand";

const input =
  "w-full h-11 px-3.5 rounded-lg border border-border-subtle bg-white text-[16px] sm:text-[14px] text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20";
const label = "block text-[12px] font-medium text-text-secondary mb-1";

/** Recent ledger entries, read from the mock payment service (no hardcoded rows). */
const LedgerCard: React.FC = () => {
  const t = useLanguage().dict.landing;
  const [rows, setRows] = useState<Transaction[]>([]);
  useEffect(() => {
    mockPaymentService.getTransactions({ limit: 3 }).then(setRows);
  }, []);
  if (!rows.length) return null;
  return (
    <div className="w-full max-w-sm rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md p-4">
      <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/60">
        <span className="h-1.5 w-1.5 rounded-full bg-[#34D399] animate-pulse" /> {t.recentLabel}
      </p>
      <ul className="mt-3 space-y-2.5">
        {rows.map((r) => {
          const rail = BRAND_INFO.supportedRails.find((x) => x.id === r.rail);
          return (
            <li key={r.id} className="flex items-center gap-3 text-[13px]">
              <span className="h-7 w-7 rounded-full grid place-items-center bg-white/10 text-[#34D399] shrink-0">
                <IconCheck size={14} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-white truncate">{rail?.name}</span>
                <span className="block font-mono text-[10px] text-white/50 truncate">{r.reference}</span>
              </span>
              <span className="font-mono text-white">{r.grossAmountTzs.toLocaleString("en-US")}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/**
 * Viewport-locked layout (h-dvh, no page scroll).
 * Desktop: navy panel (logo / illustration + ledger / tagline) + form. Mobile: form only, compact.
 */
const AuthLayout: React.FC<{ title: string; sub: string; children: React.ReactNode; footer: React.ReactNode }> = ({ title, sub, children, footer }) => {
  const t = useLanguage().dict.landing;
  return (
    <div className="h-dvh overflow-hidden grid grid-rows-1 lg:grid-cols-[0.95fr_1.05fr] bg-white">
      <aside className="hero-solid hidden lg:grid grid-rows-[auto_1fr_auto] p-10 xl:p-12 text-white overflow-hidden">
        <Link href="/" aria-label="LipaPesa home" className="w-fit">
          <Logo className="h-9 w-auto brightness-0 invert" />
        </Link>
        <div className="flex flex-col items-center justify-center gap-8 min-h-0">
          <LogoMark size={190} className="text-brand-cyan drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]" />
          <LedgerCard />
        </div>
        <div>
          <p className="font-heading font-extrabold text-4xl xl:text-5xl leading-[1]">
            {t.title}
            <br />
            <span className="text-brand-cyan">{t.titleAccent}</span>
          </p>
          <p className="mt-5 flex items-center gap-2 text-white/60 text-[13px]">
            <IconShield size={15} /> BOT · PDPA 2022 · 2FA
          </p>
        </div>
      </aside>

      {/* Mobile: navy header with title, form in an overlapping white sheet. Desktop: plain form column. */}
      <main className="flex flex-col min-h-0 bg-brand-navy lg:bg-white">
        <div className="hero-solid lg-plain text-white lg:text-brand-navy px-5 sm:px-10 pt-[max(0.875rem,env(safe-area-inset-top))] pb-8 lg:pb-0 lg:pt-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="lg:hidden" aria-label="LipaPesa home">
              <Logo className="h-7 w-auto brightness-0 invert" />
            </Link>
            <Link href="/" className="ml-auto text-[13px] text-white/70 lg:text-text-muted hover:text-brand-cyan lg:hover:text-brand-primary">← {t.backHome}</Link>
          </div>
          <div className="lg:hidden mt-4">
            <h1 className="font-heading font-extrabold text-[24px] sm:text-[30px] leading-tight">{title}</h1>
            <p className="hidden sm:block mt-1 text-[14px] text-white/70">{sub}</p>
          </div>
        </div>
        <div className="relative z-10 flex-1 min-h-0 -mt-5 lg:mt-0 rounded-t-3xl lg:rounded-none bg-white overflow-y-auto overscroll-contain px-5 sm:px-10 pt-5 lg:pt-0 pb-[max(1rem,env(safe-area-inset-bottom))] flex flex-col">
          <div className="flex-1 flex flex-col justify-start lg:justify-center w-full max-w-md mx-auto">
            <div className="hidden lg:block">
              <h1 className="font-heading font-extrabold text-4xl leading-tight">{title}</h1>
              <p className="mt-1 text-[14px] text-text-secondary">{sub}</p>
            </div>
            <div className="lg:mt-7">{children}</div>
            <div className="mt-3 sm:mt-4 text-[14px] text-text-secondary">{footer}</div>
          </div>
          <p className="mt-3 lg:mt-0 lg:pb-6 text-center text-[11px] font-mono text-text-muted">{t.demoNotice}</p>
        </div>
      </main>
    </div>
  );
};

const PinInput: React.FC<{ id: string; value: string; onChange: (v: string) => void; text: string; autoComplete: string }> = ({ id, value, onChange, text, autoComplete }) => (
  <div>
    <label htmlFor={id} className={label}>{text}</label>
    <input
      id={id}
      type="password"
      inputMode="numeric"
      autoComplete={autoComplete}
      pattern="\d{4}"
      minLength={4}
      maxLength={4}
      required
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
      className={`${input} font-mono tracking-[0.5em]`}
      placeholder="••••"
    />
  </div>
);

const PhoneField: React.FC<{ id: string; value: string; onChange: (v: string) => void; text: string }> = ({ id, value, onChange, text }) => (
  <div>
    <label htmlFor={id} className={label}>{text}</label>
    <div className="flex">
      <span className="h-11 px-2.5 grid place-items-center rounded-l-lg border border-r-0 border-border-subtle bg-bg-canvas font-mono text-[13px] text-text-muted">+255</span>
      <input id={id} type="tel" inputMode="tel" autoComplete="tel-national" required value={value}
        onChange={(e) => onChange(e.target.value)} placeholder="754 112 233" className={`${input} rounded-l-none font-mono`} />
    </div>
  </div>
);

const Submit: React.FC<{ busy: boolean; text: string }> = ({ busy, text }) => (
  <button
    type="submit"
    disabled={busy}
    className="w-full h-12 mt-1 rounded-lg bg-brand-primary hover:bg-brand-primary-dark disabled:opacity-60 text-white font-medium inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
  >
    {busy ? "…" : text} {!busy && <IconArrow size={16} />}
  </button>
);

const toE164 = (p: string) => `+255${p.replace(/\D/g, "").replace(/^0/, "")}`;

export const LoginForm: React.FC = () => {
  const { dict } = useLanguage();
  const a = dict.auth;
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await mockAuthService.login({ phone: toE164(phone), pin });
      router.push("/portal");
    } catch {
      setError(dict.common.failed);
      setBusy(false);
    }
  };

  return (
    <AuthLayout
      title={a.loginTitle}
      sub={a.loginSubtitle}
      footer={<>{a.noAccount} <Link href="/signup" className="text-brand-primary font-medium hover:underline">{dict.nav.signup}</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        <PhoneField id="phone" value={phone} onChange={setPhone} text={a.phoneLabel} />
        <PinInput id="pin" value={pin} onChange={setPin} text={a.pinLabel} autoComplete="current-password" />
        {error && <p role="alert" className="text-[13px] text-status-error">{error}</p>}
        <Submit busy={busy} text={a.submitLogin} />
      </form>
    </AuthLayout>
  );
};

export const SignupForm: React.FC = () => {
  const { dict } = useLanguage();
  const a = dict.auth;
  const t = dict.landing;
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("CONSUMER");
  const [vertical, setVertical] = useState<MerchantVertical>("ECOMMERCE");
  const [form, setForm] = useState({ fullName: "", phone: "", pin: "", businessName: "", tinNumber: "" });
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const roles = [
    { id: "CONSUMER" as const, Icon: IconPhone, short: t.roleConsumer, desc: a.consumerRoleDesc },
    { id: "WAKALA" as const, Icon: IconTicket, short: t.roleWakala, desc: a.wakalaRoleDesc },
    { id: "MERCHANT" as const, Icon: IconStore, short: t.roleMerchant, desc: a.merchantRoleDesc },
  ];
  const merchant = role === "MERCHANT";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    await mockAuthService.signup({
      role,
      fullName: form.fullName,
      phone: toE164(form.phone),
      pin: form.pin,
      ...(merchant && { businessName: form.businessName, vertical, tinNumber: form.tinNumber }),
    });
    router.push("/portal");
  };

  return (
    <AuthLayout
      title={a.signupTitle}
      sub={a.signupSubtitle}
      footer={<>{a.haveAccount} <Link href="/login" className="text-brand-primary font-medium hover:underline">{dict.nav.login}</Link></>}
    >
      <form onSubmit={submit} className="space-y-3 sm:space-y-3.5">
        <fieldset>
          <legend className={label}>{a.selectRoleLabel}</legend>
          <div className="grid grid-cols-3 gap-2">
            {roles.map(({ id, Icon, short }) => (
              <label
                key={id}
                className={`h-14 sm:h-16 rounded-lg border flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-primary ${
                  role === id ? "border-brand-primary bg-brand-primary/5 text-brand-primary" : "border-border-subtle text-brand-navy hover:border-text-muted"
                }`}
              >
                <input type="radio" name="role" value={id} checked={role === id} onChange={() => setRole(id)} className="sr-only" />
                <Icon size={20} />
                <span className="text-[13px] font-medium">{short}</span>
              </label>
            ))}
          </div>
          <p className="hidden sm:block mt-1.5 text-[12px] text-text-muted truncate">{roles.find((r) => r.id === role)!.desc}</p>
        </fieldset>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="fullName" className={label}>{a.fullNameLabel}</label>
            <input id="fullName" required autoComplete="name" value={form.fullName} onChange={(e) => set("fullName")(e.target.value)} className={input} />
          </div>
          <PhoneField id="sphone" value={form.phone} onChange={set("phone")} text={a.phoneLabel} />
        </div>

        {merchant && (
          <div className="grid grid-cols-[1.4fr_1fr] gap-3">
            <div>
              <label htmlFor="biz" className={label}>{a.businessNameLabel}</label>
              <input id="biz" required value={form.businessName} onChange={(e) => set("businessName")(e.target.value)} className={input} />
            </div>
            <div>
              <label htmlFor="tin" className={label}>{a.tinNumberLabel}</label>
              <input id="tin" value={form.tinNumber} onChange={(e) => set("tinNumber")(e.target.value)} className={`${input} font-mono`} />
            </div>
          </div>
        )}

        <div className={`grid gap-3 ${merchant ? "sm:grid-cols-2" : ""}`}>
          {merchant && (
            <div>
              <label htmlFor="vertical" className={label}>{a.verticalLabel}</label>
              <select id="vertical" value={vertical} onChange={(e) => setVertical(e.target.value as MerchantVertical)} className={input}>
                <option value="ECOMMERCE">{a.verticalEcommerce}</option>
                <option value="SCHOOL_EDUPAY">{a.verticalSchool}</option>
              </select>
            </div>
          )}
          <PinInput id="spin" value={form.pin} onChange={set("pin")} text={a.pinLabel} autoComplete="new-password" />
        </div>

        <Submit busy={busy} text={a.submitSignup} />
      </form>
    </AuthLayout>
  );
};
