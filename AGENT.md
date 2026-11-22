# AGENT.md â€” LipaPesa Engineering & Design Directive

You are building the **LipaPesa Digital Financial Suite** (`www.lipapesa.co.tz`), a Tanzanian fintech web application connecting Mobile Wallets (Vodacom M-Pesa, Mix by Yas, Airtel Money, Halopesa) and VISA API rails for Consumers, Restaurants, Hotels, E-Commerce/School Merchants, and Wakala Agents.

## 1. Context Loading Rules (Strict Quota Conservation)

- **Documentation style (ASD-STE100 + Modular Task Cards)** -> Read [`docs/00-DOCUMENTATION-STANDARD.md`](./docs/00-DOCUMENTATION-STANDARD.md)

Do **NOT** read every file in `docs/` upfront. Read only the specific linked document required for your current task:

- **Typography (`Schibsted Grotesk` + `Geist` + `Geist Mono`), brand blues, anti-slop rules** -> Read [`docs/01-DESIGN-SYSTEM.md`](./docs/01-DESIGN-SYSTEM.md)
- **User funnel, Wakala Chap Chap, Merchant/Edu-Pay Tills & 5-6% MDR** -> Read [`docs/02-PRODUCT-REQUIREMENTS.md`](./docs/02-PRODUCT-REQUIREMENTS.md)
- **Folder structure, TypeScript interfaces, mock adapters, EN/SW (`Badili Lugha`) toggle** -> Read [`docs/03-SYSTEM-ARCHITECTURE.md`](./docs/03-SYSTEM-ARCHITECTURE.md)
- **Public `/developers` API & Webhook preview page** -> Read [`docs/04-DEVELOPER-PORTAL-SPEC.md`](./docs/04-DEVELOPER-PORTAL-SPEC.md)
- **Project milestones & stakeholder sign-off status** -> Read [`ROADMAP.md`](./ROADMAP.md)
- **Why architectural/design choices were made** -> Read & append to [`ARCHITECTURE_DECISIONS.md`](./ARCHITECTURE_DECISIONS.md)

## 2. Non-Negotiable Engineering Guardrails

1. **Zero Hardcoded Data in UI:** Never hardcode transactions, vouchers, Till numbers, user sessions, or MDR calculations inside `.tsx` components. Import from `src/services/mock/` via interfaces in `src/services/contracts/`.
2. **Brand Color Fidelity + Anti-Slop Craft:** Preserve LipaPesa's signature Azure/Cerulean Blues (`#0084D6` / `#0095E8`) defined in `src/config/brand.ts`, anchored by Deep Obsidian Navy (`#061526`), `1px solid #E2E8F0` architectural borders, and `Schibsted Grotesk` + `Geist` + `Geist Mono`. Never use Inter or Plus Jakarta Sans.
3. **Clean Funnel Architecture:** Keep the Landing Page (`/`) uncluttered. House legacy quick-action tiles (`Airtime`, `Pay Bills`, `Scan to Pay`, `Transaction Bundles`, etc.) inside the desktop + mobile **Burger Quick-Services Drawer** (`src/components/navigation/QuickServicesDrawer.tsx`).
4. **Bilingual Ready (`Badili Lugha`):** Every user-facing nav item, headline, and CTA must read from the `EN` / `SW` dictionary in `src/i18n/dictionaries.ts`.
5. **Log Architectural Choices:** Whenever you introduce a new pattern, state mechanism, or route, append an entry to `ARCHITECTURE_DECISIONS.md`.

6. **AMM / STE Documentation Rule:** Write all new or updated documentation, READMEs, and developer guides using **ASD-STE100 (Simplified Technical English)** and the numbered **Task Card** format in [`docs/00-DOCUMENTATION-STANDARD.md`](./docs/00-DOCUMENTATION-STANDARD.md).

