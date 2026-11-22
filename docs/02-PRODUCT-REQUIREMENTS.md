# 02 â€” Product Requirements & User Journey

Derived from stakeholder specifications (Haji, Moses, Juliana) and existing `lipapesa.co.tz` functionality.

## 1. End-to-End User Funnel

### Stage 1: Public Landing & Navigation (`/`, `/about`, `/developers`)

- **Header Controls:**
  - LipaPesa wordmark/logo
  - Primary nav: `Solutions`, `About Us`, `Developers`
  - `Badili Lugha` (`EN` / `SW` language toggle)
  - Auth CTAs: `Log In` (`/login`) & `Create Account` (`/signup`)
  - **Burger Menu Trigger (Visible on BOTH Desktop & Mobile):** Opens `QuickServicesDrawer`â€”a sleek slide-over panel housing all legacy LipaPesa quick-action tiles (`Transaction Bundles`, `Pay Merchant`, `Scan to Pay`, `Send Money`, `Withdraw Money`, `Pay Bills`, `Airtime`, `Virtual Vouchers`, `Fiber / Wi-Fi / MiFi`) that deep-link straight into `/portal/pay?service=...`.

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
