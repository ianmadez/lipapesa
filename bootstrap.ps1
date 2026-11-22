
$ErrorActionPreference = "Stop"

$ProjectDir = "C:\Users\ianth\OneDrive\Documents\lipapesa"

if (-not (Test-Path $ProjectDir)) {
    throw "Project directory does not exist: $ProjectDir"
}

Set-Location $ProjectDir

$Folders = @(
    "docs",
    "src\app\(marketing)\about",
    "src\app\(marketing)\developers",
    "src\app\(auth)\login",
    "src\app\(auth)\signup",
    "src\app\portal\pay",
    "src\app\portal\wakala",
    "src\app\portal\merchant",
    "src\app\api\webhooks",
    "src\components\ui",
    "src\components\navigation",
    "src\components\marketing",
    "src\components\portal",
    "src\components\developers",
    "src\config",
    "src\i18n",
    "src\services\contracts",
    "src\services\mock",
    "src\services\live",
    "src\types"
)

foreach ($Folder in $Folders) {
    $Path = Join-Path $ProjectDir $Folder
    New-Item -ItemType Directory -Force -Path $Path | Out-Null
}

@'
# AGENT.md — LipaPesa Engineering & Design Directive

You are building the **LipaPesa Digital Financial Suite** (`www.lipapesa.co.tz`), a Tanzanian fintech web application connecting Mobile Wallets (Vodacom M-Pesa, Mix by Yas, Airtel Money, Halopesa) and VISA API rails for Consumers, E-Commerce/School Merchants, and Wakala Agents.

## 1. Context Loading Rules (Strict Quota Conservation)

Do **NOT** read every file in `docs/` upfront. Read only the specific linked document required for your current task:

- **Typography (`Bricolage Grotesque` + `Instrument Sans` + `IBM Plex Mono`), brand blues, anti-slop rules** -> Read [`docs/01-DESIGN-SYSTEM.md`](./docs/01-DESIGN-SYSTEM.md)
- **User funnel, Wakala Chap Chap, Merchant/Edu-Pay Tills & 5-6% MDR** -> Read [`docs/02-PRODUCT-REQUIREMENTS.md`](./docs/02-PRODUCT-REQUIREMENTS.md)
- **Folder structure, TypeScript interfaces, mock adapters, EN/SW (`Badili Lugha`) toggle** -> Read [`docs/03-SYSTEM-ARCHITECTURE.md`](./docs/03-SYSTEM-ARCHITECTURE.md)
- **Public `/developers` API & Webhook preview page** -> Read [`docs/04-DEVELOPER-PORTAL-SPEC.md`](./docs/04-DEVELOPER-PORTAL-SPEC.md)
- **Project milestones & stakeholder sign-off status** -> Read [`ROADMAP.md`](./ROADMAP.md)
- **Why architectural/design choices were made** -> Read & append to [`ARCHITECTURE_DECISIONS.md`](./ARCHITECTURE_DECISIONS.md)

## 2. Non-Negotiable Engineering Guardrails

1. **Zero Hardcoded Data in UI:** Never hardcode transactions, vouchers, Till numbers, user sessions, or MDR calculations inside `.tsx` components. Import from `src/services/mock/` via interfaces in `src/services/contracts/`.
2. **Brand Color Fidelity + Anti-Slop Craft:** Preserve LipaPesa's signature Azure/Cerulean Blues (`#0084D6` / `#0095E8`) defined in `src/config/brand.ts`, anchored by Deep Obsidian Navy (`#061526`), `1px solid #E2E8F0` architectural borders, and `Bricolage Grotesque` + `Instrument Sans` + `IBM Plex Mono`. Never use Inter or Plus Jakarta Sans.
3. **Clean Funnel Architecture:** Keep the Landing Page (`/`) uncluttered. House legacy quick-action tiles (`Airtime`, `Pay Bills`, `Scan to Pay`, `Transaction Bundles`, etc.) inside the desktop + mobile **Burger Quick-Services Drawer** (`src/components/navigation/QuickServicesDrawer.tsx`).
4. **Bilingual Ready (`Badili Lugha`):** Every user-facing nav item, headline, and CTA must read from the `EN` / `SW` dictionary in `src/i18n/dictionaries.ts`.
5. **Log Architectural Choices:** Whenever you introduce a new pattern, state mechanism, or route, append an entry to `ARCHITECTURE_DECISIONS.md`.
'@ | Set-Content -Path "$ProjectDir\AGENT.md" -Encoding UTF8

@'
# ROADMAP.md — LipaPesa Modernization Mission & Execution Plan

## Mission Statement

Transform `www.lipapesa.co.tz` from a static brochure site into a high-trust Tanzanian fintech platform structured around a clean **Landing -> Sign Up -> Authenticated Portal** journey, while preserving legacy quick-pay utilities inside a desktop & mobile burger drawer and building on a single general Collections & Disbursements core engine ready for Vodacom M-Pesa and VISA APIs.

## Stakeholder Sign-Off & Delivery Workflow

- **Design & Frontend Architecture:** Ian (Staging preview on Vercel + modular GitHub repo)
- **Copy & Content Revisions:** Haji (LIPATECH) — structured bilingual copy ready for 1-click swap
- **Executive Approval:** Moses & Juliana
- **Production Cutover:** Merge staging branch into client GitHub repository and bind `lipapesa.co.tz`

## Execution Phases

### Phase 0: Foundation, Tokens & Documentation (Current)

- [x] Scaffold Next.js App Router + TypeScript + Tailwind CSS
- [x] Establish deep-linked docs (`AGENT.md`, `ROADMAP.md`, `ARCHITECTURE_DECISIONS.md`, `docs/*`)
- [ ] Configure `Bricolage Grotesque`, `Instrument Sans`, and `IBM Plex Mono` in `src/app/layout.tsx`
- [ ] Implement `EN` / `SW` (`Badili Lugha`) context provider and `localStorage`-backed mock services
- *Spec refs:* [`docs/01-DESIGN-SYSTEM.md`](./docs/01-DESIGN-SYSTEM.md), [`docs/03-SYSTEM-ARCHITECTURE.md`](./docs/03-SYSTEM-ARCHITECTURE.md)

### Phase 1: Uncluttered Landing Page & Desktop Burger Quick-Services Drawer

- [ ] Precision Navbar with Logo, primary links (`Solutions`, `About`, `Developers`), `Badili Lugha` EN/SW toggle, `Log In` / `Sign Up` CTAs, and **Desktop + Mobile Burger Menu** opening `QuickServicesDrawer`
- [ ] Asymmetric Split Hero with **Live Multi-Rail Payment Simulator** (C2B STK Push & B2C Disbursement across M-Pesa, Mix by Yas, Airtel Money, Halopesa, and VISA)
- [ ] Explicit **Mobile Wallets & VISA API Integration Strip** + architectural product pillars
- [ ] Upgraded `/about` page (Dar es Salaam HQ, Vodacom enterprise partnership & East African network switching vision, PDPA 2022 & 2FA security posture)
- *Spec refs:* [`docs/01-DESIGN-SYSTEM.md`](./docs/01-DESIGN-SYSTEM.md), [`docs/02-PRODUCT-REQUIREMENTS.md`](./docs/02-PRODUCT-REQUIREMENTS.md)

### Phase 2: Role-Based Sign Up (`/signup`, `/login`) & Authenticated Portal (`/portal`)

- [ ] `/signup` & `/login`: Role-aware onboarding (**Consumer**, **LipaPesa Wakala / Chap Chap Agent**, **E-Commerce & School Merchant**) with simulated 2FA/eKYC & Till provisioning that routes directly into `/portal`
- [ ] `/portal`: Authenticated sidebar workspace with live demo role-switcher (for stakeholder walkthroughs)
- [ ] `/portal/pay`: Consumer Quick-Pay (Airtime, Virtual Vouchers, Fiber, Wi-Fi/MiFi, Utilities) + digital receipts
- [ ] `/portal/wakala`: **LipaPesa Wakala / Chap Chap** wholesale voucher & airtime batch dispenser + float tracker
- [ ] `/portal/merchant`: E-Commerce & Edu-Pay (School) Till/Billable Number collections + **5%-6% MDR monthly calendar settlement**
- *Spec refs:* [`docs/02-PRODUCT-REQUIREMENTS.md`](./docs/02-PRODUCT-REQUIREMENTS.md)

### Phase 3: Interactive Developer Portal Preview (`/developers`)

- [ ] Sandbox API key generator, interactive endpoint explorer (`STK Push`, `VISA Checkout`, `Voucher Vend`, `MDR Summary`), `cURL` / `TypeScript` / `Webhook` tabs, and live simulated `200 OK` JSON console
- *Spec refs:* [`docs/04-DEVELOPER-PORTAL-SPEC.md`](./docs/04-DEVELOPER-PORTAL-SPEC.md)

### Phase 4: Live Rail Adapter Swap & Production Merge

- [ ] Replace `src/services/mock/*` bindings with `src/services/live/*` (Vodacom M-Pesa OpenAPI, cross-network wallet interoperability, VISA API, webhook HMAC verification)
- [ ] Swap final Haji/Moses/Juliana-approved English & Swahili copy
'@ | Set-Content -Path "$ProjectDir\ROADMAP.md" -Encoding UTF8

@'
# ARCHITECTURE_DECISIONS.md — Architectural Decision Log

Record every significant technical, structural, or visual decision here so human engineers and AI agents understand *what* was chosen and *why*.

---

## ADR-001: Next.js (App Router) + TypeScript as Canonical Frontend Stack

- **Status:** Accepted
- **Context:** Client (`lipapesa.co.tz`) has not yet shared repository access, and their existing site lacks modern modularity.
- **Decision:** Build the staging application in Next.js (App Router) with strict TypeScript and distinct route groups: `(marketing)`, `(auth)`, and `portal`.
- **Why:** Guarantees full code ownership, clean component isolation, and effortless porting once client GitHub access arrives.

## ADR-002: Preserve LipaPesa Brand Blues + Distinctive Editorial-Fintech Typography

- **Status:** Accepted
- **Context:** Client leadership mandated keeping their exact brand colors ("RANGI zetu ni hizo hizo"), while generic AI-template fonts (`Inter` / `Plus Jakarta Sans`) undermine visual authority.
- **Decision:** Lock LipaPesa's core Azure Blue (`#0084D6`) and Sky Cyan (`#0095E8`) into CSS variables, anchor them with Deep Obsidian Navy (`#061526`), and enforce **`Bricolage Grotesque`** (headings), **`Instrument Sans`** (body/UI), and **`IBM Plex Mono`** (TZS figures, Till IDs, JSON payloads).
- **Why:** Honors brand recognition for Haji, Moses, and Juliana while establishing an unmistakable, non-template fintech identity.

## ADR-003: Landing -> Desktop Burger Quick-Drawer -> Sign Up -> Portal Funnel

- **Status:** Accepted
- **Context:** Dumping 8+ consumer quick-action tiles onto the homepage makes the site feel like an outdated utility directory rather than an institutional fintech platform.
- **Decision:** Keep `/` focused on high-trust brand positioning and the live multi-rail simulator, tuck all legacy quick-action tiles (`Transaction Bundles`, `Pay Merchant`, `Scan to Pay`, `Send Money`, `Pay Bills`, `Airtime`) into a desktop + mobile **Burger Quick-Services Drawer**, and guide users through `/signup` into the authenticated `/portal` workspace.
- **Why:** Preserves 100% functional parity with existing `lipapesa.co.tz` quick actions while delivering a proper fintech onboarding and portal hierarchy.

## ADR-004: General Collections & Disbursements Core with Lightweight Vertical Presets

- **Status:** Accepted
- **Context:** LipaPesa serves both general e-commerce merchants and targeted verticals like Schools (Edu-Pay) on top of its Vodacom enterprise partnership.
- **Decision:** Use a single unified Merchant Collections & Disbursements architecture (`Till` / `Billable Reference` + `5%-6% MDR` engine) with lightweight UI presets (`General E-Commerce` vs `School / Edu-Pay`) rather than separate codebases.
- **Why:** Prevents code duplication while letting stakeholders demo school fee collections alongside retail checkout seamlessly.

## ADR-005: Adapter Pattern (`contracts/` -> `mock/` -> `live/`) for Payment Rails

- **Status:** Accepted
- **Context:** Vodacom M-Pesa, cross-network mobile wallets, and VISA API credentials are pending agreement handover, but the staging app must be fully interactive for stakeholder approval.
- **Decision:** All UI components communicate strictly through TypeScript interfaces in `src/services/contracts/`. `src/services/mock/` simulates realistic TZS latencies, STK Push states, voucher PINs, auth sessions, and 5%-6% MDR math via `localStorage`.
- **Why:** Production cutover requires implementing `src/services/live/` with zero rewrites to React components.

## ADR-006: First-Class Bilingual Support (`EN` / `SW` — `Badili Lugha`)

- **Status:** Accepted
- **Context:** The existing `lipapesa.co.tz` header features a `Badili Lugha` toggle, and Tanzanian consumers/wakala agents operate across Swahili and English.
- **Decision:** Centralize UI strings in `src/i18n/dictionaries.ts` with a persistent language toggle in the navbar.
- **Why:** Maintains parity with the live site and makes Haji's upcoming copy updates clean across both languages.

## ADR-007: Public `/developers` Preview Page in Staging MVP

- **Status:** Accepted
- **Context:** LipaPesa's commercial moat is acting as a unified e-commerce collection & wallet aggregation layer for businesses.
- **Decision:** Include an interactive `/developers` portal showcasing REST endpoints, STK Push simulators, and webhook payloads.
- **Why:** Demonstrates immediate technical credibility to stakeholders and merchant CTOs.
'@ | Set-Content -Path "$ProjectDir\ARCHITECTURE_DECISIONS.md" -Encoding UTF8

@'
# 01 — Design System & Visual Craft Specification

## 1. Brand Color Tokens (Locked to LipaPesa Identity)

Extracted from `www.lipapesa.co.tz` and calibrated for WCAG AA+ contrast:

| Token Name | Hex | CSS Variable | Usage |
| :--- | :--- | :--- | :--- |
| **LipaPesa Azure (Primary)** | `#0084D6` | `--brand-primary` | Primary CTAs, active tabs, brand highlights |
| **LipaPesa Azure Hover** | `#006BB0` | `--brand-primary-dark` | Button hover states, active borders |
| **LipaPesa Sky Cyan** | `#0095E8` | `--brand-cyan` | Subtle gradients, live status indicators, icon accents |
| **Obsidian Navy (Anchor)** | `#061526` | `--brand-navy` | High-contrast hero typography, dark API console, portal sidebar |
| **Slate Ink (Body)** | `#334155` | `--text-secondary` | Secondary descriptions, table labels |
| **Canvas Alabaster** | `#F8FAFC` | `--bg-canvas` | Page background |
| **Pure Surface** | `#FFFFFF` | `--bg-surface` | Elevated cards, simulator panels, modals |
| **Hairline Border** | `#E2E8F0` | `--border-subtle` | Crisp `1px` architectural card & grid dividers |
| **Emerald Settlement** | `#059669` | `--status-success` | Successful STK Push, settled MDR badges |
| **Amber Pending** | `#D97706` | `--status-pending` | Awaiting PIN / processing states |

## 2. Typography Pairing (Google Fonts via `next/font/google`)

- **Display & Headings:** `Bricolage Grotesque` (Weights: `600`, `700`, `800`; tight tracking `-0.03em`)
- **Body & UI Controls:** `Instrument Sans` (Weights: `400`, `500`, `600`)
- **Financial & Technical Data:** `IBM Plex Mono` (Weights: `400`, `500`, `600`; `tabular-nums` mandatory for all `TZS` amounts, Till numbers, voucher PINs, and JSON payloads)

## 3. Anti-Slop Craft Rules

1. **Architectural Precision Over Generic Pill Templates:** Use crisp `8px` (`rounded-lg`) or `12px` (`rounded-xl`) card radii with `1px solid #E2E8F0` borders and directional shadows (`0 12px 32px -8px rgba(6, 21, 38, 0.08)`). Reserve full pills strictly for micro status badges (`Live API`, `5.5% MDR`).
2. **Tactile Financial Feedback:** Every interactive widget (STK Push simulator, Airtime/Voucher buyer, MDR calculator) must display live formatted currency (`TZS 125,000`), network badges, and realistic step transitions (`Idle` -> `Sending STK Push to +255...` -> `Confirmed`).
3. **Restraint on the Landing Canvas:** Keep `/` spacious and editorial; house quick-pay utility tiles inside the slide-over burger drawer rather than crowding the landing hero.
'@ | Set-Content -Path "$ProjectDir\docs\01-DESIGN-SYSTEM.md" -Encoding UTF8

@'
# 02 — Product Requirements & User Journey

Derived from stakeholder specifications (Haji, Moses, Juliana) and existing `lipapesa.co.tz` functionality.

## 1. End-to-End User Funnel

### Stage 1: Public Landing & Navigation (`/`, `/about`, `/developers`)

- **Header Controls:**
  - LipaPesa wordmark/logo
  - Primary nav: `Solutions`, `About Us`, `Developers`
  - `Badili Lugha` (`EN` / `SW` language toggle)
  - Auth CTAs: `Log In` (`/login`) & `Create Account` (`/signup`)
  - **Burger Menu Trigger (Visible on BOTH Desktop & Mobile):** Opens `QuickServicesDrawer`—a sleek slide-over panel housing all legacy LipaPesa quick-action tiles (`Transaction Bundles`, `Pay Merchant`, `Scan to Pay`, `Send Money`, `Withdraw Money`, `Pay Bills`, `Airtime`, `Virtual Vouchers`, `Fiber / Wi-Fi / MiFi`) that deep-link straight into `/portal/pay?service=...`.

- **Landing Page Sections:**
  1. **Asymmetric Split Hero:** Editorial headline + **Live Multi-Rail Payment Simulator** (C2B STK Push & B2C Disbursement across Vodacom M-Pesa, Mix by Yas, Airtel Money, Halopesa, and VISA).
  2. **Explicit Payment Rail & Trust Strip:** Prominently tags **Mobile Wallets** (Vodacom M-Pesa primary + cross-network interoperability) and **VISA API** inclusion, plus 2FA/KYC and PDPA 2022 security compliance.
  3. **Three-Pillar Ecosystem Overview:** Cards explaining **Consumer Digital Services**, **LipaPesa Wakala / Chap Chap**, and **E-Commerce & School (Edu-Pay) Collections**, each with a CTA into `/signup?role=...`.

### Stage 2: Authentication & Role-Based Onboarding (`/signup`, `/login`)

- **Role Selection at Sign Up:**
  1. **Personal / Consumer** (Phone + Name + PIN + simulated 2FA verification)
  2. **LipaPesa Wakala / Chap Chap Agent** (Agent ID / NIDA + Business Location + Float Tier)
  3. **Merchant (E-Commerce or School / Edu-Pay)** (Business/Institution Name + TIN/Registration + Auto-assigned **LipaPesa TILL Number** & Billable Account prefix)

- Submitting `/signup` or `/login` stores a mock session via `src/services/mock/` and redirects immediately into `/portal`.

### Stage 3: Authenticated Fintech Portal (`/portal`)

- **Portal Shell:** Persistent Obsidian Navy sidebar with active user badge, active Till/Agent ID, `Badili Lugha` toggle, and a subtle **"Demo Role Switcher"** pill in the top bar so the developer can switch live between *Consumer*, *Wakala*, and *Merchant* views during stakeholder demos.

- **Portal Modules:**
  - `/portal` (Dashboard Overview: balances, recent activity, quick actions)
  - `/portal/pay` (**Consumer Services:** Virtual Vouchers, Airtime, Fiber Internet, Wi-Fi, MiFi, and Utility Bills with instant printable/downloadable digital receipts)
  - `/portal/wakala` (**LipaPesa Wakala / Chap Chap:** Wholesale float balance, batch Virtual Voucher & Airtime PIN dispenser, and agent commission ledger)
  - `/portal/merchant` (**Collections & Disbursements:** TILL number & billable account manager with toggleable `E-Commerce` / `School (Edu-Pay)` view, Mobile Wallet + VISA checkout link generator, live transaction ledger, and **5.0%-6.0% MDR monthly calendar settlement tracker**)
'@ | Set-Content -Path "$ProjectDir\docs\02-PRODUCT-REQUIREMENTS.md" -Encoding UTF8

@'
# 03 — System Architecture & Service Contracts

## 1. Directory Structure

```text
src/
├── app/
│   ├── (marketing)/             # Public Navbar + Footer
│   │   ├── page.tsx             # Uncluttered Landing
│   │   ├── about/page.tsx
│   │   └── developers/page.tsx
│   ├── (auth)/                  # Clean split-screen auth layout
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── portal/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── pay/page.tsx
│   │   ├── wakala/page.tsx
│   │   └── merchant/page.tsx
│   └── api/webhooks/route.ts
├── components/
│   ├── navigation/
│   ├── marketing/
│   ├── portal/
│   └── developers/
├── config/
│   ├── brand.ts
│   └── navigation.ts
├── i18n/
│   ├── LanguageContext.tsx
│   └── dictionaries.ts
├── services/
│   ├── contracts/
│   ├── mock/
│   └── live/
└── types/
    └── fintech.ts
```

## 2. Core Domain Types (`src/types/fintech.ts`)

```typescript
type UserRole = 'CONSUMER' | 'WAKALA' | 'MERCHANT';

type MerchantVertical = 'ECOMMERCE' | 'SCHOOL_EDUPAY';

type UserSession = {
  id: string;
  fullName: string;
  phone: string;
  role: UserRole;
  merchantVertical?: MerchantVertical;
  businessName?: string;
  tillNumber?: string;
  agentCode?: string;
  walletBalanceTzs: number;
};

type PaymentRail = 'MPESA' | 'YAS' | 'AIRTEL' | 'HALOPESA' | 'VISA';

type ServiceCategory =
  | 'AIRTIME'
  | 'VIRTUAL_VOUCHER'
  | 'FIBER'
  | 'WIFI_MIFI'
  | 'UTILITY'
  | 'MERCHANT_TILL'
  | 'SCHOOL_FEE'
  | 'SEND_MONEY';

type Transaction = {
  id: string;
  reference: string;
  rail: PaymentRail;
  category: ServiceCategory;
  grossAmountTzs: number;
  mdrRatePercent: number;
  mdrFeeTzs: number;
  netAmountTzs: number;
  status: string;
  customerPhone: string;
  tillNumber?: string;
  createdAt: string;
};

type VoucherBatch = {
  id: string;
  serialNumber: string;
  pinMasked: string;
  denominationTzs: number;
  network: string;
  status: 'AVAILABLE' | 'SOLD';
  issuedAt: string;
};

type MerchantTill = {
  tillNumber: string;
  businessName: string;
  vertical: MerchantVertical;
  billablePrefix: string;
  mdrRatePercent: 5 | 5.5 | 6;
  monthlyGrossTzs: number;
  monthlyMdrTzs: number;
  nextSettlementDate: string;
};
```

## 3. Shared localStorage State Rule

All mock services in `src/services/mock/` read and write to a unified versioned localStorage store (`lipapesa_v1_state`) so actions taken on the Landing Simulator, Burger Quick-Services Drawer, `/signup`, `/portal/wakala`, or `/portal/merchant` stay synchronized in real time during demos.
'@ | Set-Content -Path "$ProjectDir\docs\03-SYSTEM-ARCHITECTURE.md" -Encoding UTF8

@'
# 04 — Developer Portal Preview (`/developers`) Specification

## Purpose

Position LipaPesa as East Africa's cleanest programmable payment aggregator, giving merchant CTOs and technical evaluators a live sandbox preview.

## Required Interactive Modules

### API Hero & Quickstart Strip

- Sandbox Base URL badge: `https://sandbox.api.lipapesa.co.tz/v1` with 1-click copy.
- Interactive Generate Test API Key button (example: `lp_test_live_98a7f...`) stored in component state.

### Interactive Endpoint & Rail Explorer

**Left Column (Endpoint Selector):**
- `POST /v1/collections/stk-push` (Mobile Wallet C2B Prompt)
- `POST /v1/collections/visa-checkout` (VISA Card Authorization)
- `POST /v1/vouchers/vend` (Wakala Virtual Voucher & Airtime)
- `GET /v1/settlements/mdr-summary` (Monthly MDR & Payout Breakdown)

**Right Column (Live Interactive Console):**
- Tabs: cURL, TypeScript SDK, Webhook Event JSON.
- "Simulate Request" button: Runs an approximately 600ms mock call and renders a syntax-highlighted 200 OK JSON response including calculated `mdr_fee_tzs` (5.5%) and `net_settlement_tzs`.

### Webhook Event Inspector

- Displays sample `payment.succeeded` and `settlement.monthly_closed` payloads with `X-LipaPesa-Signature` HMAC header documentation.
'@ | Set-Content -Path "$ProjectDir\docs\04-DEVELOPER-PORTAL-SPEC.md" -Encoding UTF8

Write-Host ""
Write-Host ">>> SUCCESS! All folders and documentation files created in:" -ForegroundColor Green
Write-Host $ProjectDir -ForegroundColor Cyan

Write-Host ""
Write-Host "Created files:"
Get-ChildItem $ProjectDir -Recurse -File |
    Where-Object {
        $_.Name -in @(
            "AGENT.md",
            "ROADMAP.md",
            "ARCHITECTURE_DECISIONS.md",
            "01-DESIGN-SYSTEM.md",
            "02-PRODUCT-REQUIREMENTS.md",
            "03-SYSTEM-ARCHITECTURE.md",
            "04-DEVELOPER-PORTAL-SPEC.md"
        )
    } |
    Select-Object FullName
