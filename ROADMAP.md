# ROADMAP.md â€” LipaPesa Modernization Mission & Execution Plan

## Mission Statement

Transform `www.lipapesa.co.tz` from a static brochure site into a high-trust Tanzanian fintech platform structured around a clean **Landing -> Sign Up -> Authenticated Portal** journey, while preserving legacy quick-pay utilities inside a desktop & mobile burger drawer and building on a single general Collections & Disbursements core engine ready for Vodacom M-Pesa and VISA APIs.

## Stakeholder Sign-Off & Delivery Workflow

- **Design & Frontend Architecture:** Ian (Staging preview on Vercel + modular GitHub repo)
- **Copy & Content Revisions:** Haji (LIPATECH) â€” structured bilingual copy ready for 1-click swap
- **Executive Approval:** Moses & Juliana
- **Production Cutover:** Merge staging branch into client GitHub repository and bind `lipapesa.co.tz`

## Execution Phases

### Phase 0: Foundation, Tokens & Documentation (Complete)

- [x] Scaffold Next.js App Router + TypeScript + Tailwind CSS
- [x] Establish deep-linked docs (`AGENT.md`, `ROADMAP.md`, `ARCHITECTURE_DECISIONS.md`, `docs/*`)
- [x] Configure `Bricolage Grotesque`, `Instrument Sans`, and `IBM Plex Mono` in `src/app/layout.tsx` and CSS brand variables
- [x] Implement `EN` / `SW` (`Badili Lugha`) context provider and `localStorage`-backed mock services with 5.5% MDR math
- [x] Revamp (ADR-011): phone-mockup hero, left-anchored Quick Services panel, Schibsted Grotesk + Geist type, custom icons, 404 page, mock `/login` + `/signup`, placeholder `/developers` + `/portal`
- *Spec refs:* [`docs/01-DESIGN-SYSTEM.md`](./docs/01-DESIGN-SYSTEM.md), [`docs/03-SYSTEM-ARCHITECTURE.md`](./docs/03-SYSTEM-ARCHITECTURE.md)

### Phase 1: Uncluttered Landing Page & Desktop Burger Quick-Services Drawer (Complete)

- [x] Precision Navbar with Logo, primary links (`Solutions`, `About`, `Developers`), `Badili Lugha` EN/SW toggle, `Log In` / `Sign Up` CTAs, and **Desktop + Mobile Burger Menu** opening `QuickServicesDrawer`
- [x] Asymmetric Split Hero with **Live Multi-Rail Payment Simulator** (C2B STK Push & B2C Disbursement across M-Pesa, Mix by Yas, Airtel Money, Halopesa, and VISA)
- [x] Explicit **Mobile Wallets & VISA API Integration Strip** + architectural product pillars
- [x] Upgraded `/about` page (Dar es Salaam HQ, Vodacom enterprise partnership & East African network switching vision, PDPA 2022 & 2FA security posture)
- *Spec refs:* [`docs/01-DESIGN-SYSTEM.md`](./docs/01-DESIGN-SYSTEM.md), [`docs/02-PRODUCT-REQUIREMENTS.md`](./docs/02-PRODUCT-REQUIREMENTS.md)

### Phase 1.5: Corporate & Product Pages, Graphics, Photography (Complete)

- [x] Navbar: `Our Products`, `Our Services`, `Our Company`, `Our Clients`, `Developers`. Keep `Badili Lugha`, `Log In` / `Sign Up`, and the burger `QuickServicesDrawer`.
- [x] `/products`: category filter, 5 product cards, `RailSwitchingDiagram`, `SettlementFlowGraphic` (MDR from `mockMerchantService`).
- [x] `/services`: 4 service lines, 4-step onboarding flow, tier comparison table (tier tabs on mobile).
- [x] `/company`: story, vision, Dar es Salaam footprint map, security governance. `/about` redirects to `/company`.
- [x] `/clients`: 4 verticals with case stories and metrics. CTAs go to `/signup?role=...`.
- [x] Landing: `LandingStories` photo mosaic links to `/clients`.
- [x] 7 Unsplash-License photos in `public/images/` (credits in `public/images/CREDITS.md`). EN/SW alt text.
- [x] All new copy in `src/i18n/marketingPages.ts` (EN + SW), merged into `dictionaries.ts` as `pages`.
- *Spec refs:* [`ARCHITECTURE_DECISIONS.md`](./ARCHITECTURE_DECISIONS.md) (ADR-013)

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
