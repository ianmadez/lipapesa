/**
 * LipaPesa Brand Configuration
 * Spec: docs/01-DESIGN-SYSTEM.md & docs/03-SYSTEM-ARCHITECTURE.md
 * Locks official LipaPesa Azure Blue (#0084D6) and Sky Cyan (#0095E8)
 */

export const BRAND_COLORS = {
  // Primary brand blues
  azure: "#0084D6",
  azureHover: "#006BB0",
  skyCyan: "#0095E8",

  // Core neutral anchors
  obsidianNavy: "#061526",
  slateInk: "#334155",
  canvasAlabaster: "#F8FAFC",
  pureSurface: "#FFFFFF",
  hairlineBorder: "#E2E8F0",

  // Financial status tokens
  emeraldSettlement: "#059669",
  amberPending: "#D97706",
  roseError: "#E11D48",
} as const;

export const BRAND_FONTS = {
  heading: "var(--font-display), sans-serif",
  sans: "var(--font-geist), sans-serif",
  mono: "var(--font-geist-mono), monospace",
} as const;

export const BRAND_METRICS = {
  defaultMdrPercent: 5.5,
  minMdrPercent: 5.0,
  maxMdrPercent: 6.0,
  currency: "TZS",
  currencySymbol: "TSh",
  countryCode: "+255",
} as const;

export const BRAND_INFO = {
  name: "LipaPesa",
  legalName: "LIPATECH Tanzania Limited",
  tagline: "Digital Financial Suite",
  taglineSwahili: "Mfumo wa Huduma za Kifedha za Kidijitali",
  domain: "www.lipapesa.co.tz",
  supportEmail: "info@lipapesa.co.tz",
  supportPhone: "+255 745 000 000",
  address: "Ali Hassan Mwinyi Road, Dar es Salaam, Tanzania",
  regulations: [
    "National Payment Systems Act, Bank of Tanzania (BOT)",
    "Personal Data Protection Act (PDPA 2022)",
    "Mandatory 2FA & Multi-Network Wallet Interoperability",
  ],
  supportedRails: [
    { id: "MPESA", name: "Vodacom M-Pesa", color: "#E60000" },
    { id: "YAS", name: "Mix by Yas", color: "#FFCB05" },
    { id: "AIRTEL", name: "Airtel Money", color: "#FF0000" },
    { id: "HALOPESA", name: "Halopesa", color: "#FA5400" },
    { id: "VISA", name: "VISA Direct", color: "#1A1F71" },
  ],
} as const;

export default BRAND_COLORS;
