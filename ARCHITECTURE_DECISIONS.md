# ARCHITECTURE_DECISIONS.md â€” Architectural Decision Log

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

## ADR-006: First-Class Bilingual Support (`EN` / `SW` â€” `Badili Lugha`)

- **Status:** Accepted
- **Context:** The existing `lipapesa.co.tz` header features a `Badili Lugha` toggle, and Tanzanian consumers/wakala agents operate across Swahili and English.
- **Decision:** Centralize UI strings in `src/i18n/dictionaries.ts` with a persistent language toggle in the navbar.
- **Why:** Maintains parity with the live site and makes Haji's upcoming copy updates clean across both languages.

## ADR-007: Public `/developers` Preview Page in Staging MVP

- **Status:** Accepted
- **Context:** LipaPesa's commercial moat is acting as a unified e-commerce collection & wallet aggregation layer for businesses.
- **Decision:** Include an interactive `/developers` portal showcasing REST endpoints, STK Push simulators, and webhook payloads.
- **Why:** Demonstrates immediate technical credibility to stakeholders and merchant CTOs.

## ADR-008: Adopt ASD-STE100 & Aircraft Maintenance Manual (AMM) Task Card Documentation

- **Status:** Accepted
- **Context:** LipaPesa spans multiple payment rails (Vodacom M-Pesa, cross-network mobile wallets, VISA) and diverse stakeholders (local leadership, developers, interns, and AI agents). Traditional prose documentation can create ambiguity and slow down onboarding.
- **Decision:** Enforce **ASD-STE100 (Simplified Technical English)** and modular **ATA/S1000D-style Task Cards** (`Purpose -> Prerequisites -> Step-by-Step Procedure -> Verification`) across all `.md` files and developer guides via `docs/00-DOCUMENTATION-STANDARD.md`.
- **Why:** Establishes consistent technical documentation and makes specifications easier for engineers and AI coding agents to interpret.

## ADR-009: Phase 0 Foundation Layer & Synchronized LocalStorage State Engine

- **Status:** Accepted
- **Context:** The staging web application requires immediate localhost verification for the intern developer and leadership stakeholders before GitHub pull request and live rail integration.
- **Decision:** Execute Phase 0 Foundation by binding `Bricolage Grotesque`, `Instrument Sans`, and `IBM Plex Mono` in `src/app/layout.tsx`; locking LipaPesa Azure (`#0084D6`), Sky Cyan (`#0095E8`), and Obsidian Navy (`#061526`) in `globals.css` and `src/config/brand.ts`; deploying an `EN` / `SW` `LanguageContext`; defining core domain models in `src/types/fintech.ts`; establishing unified `lipapesa_v1_state` localStorage mock adapters implementing 5.5% MDR monthly calendar settlements; and standardizing on `next.config.mjs` with `--webpack` flag in `package.json`.
- **Why:** Delivers 100% zero-hardcoded-data compliance, guarantees brand visual fidelity, enables seamless real-time demo synchronization across landing simulators, and prevents Windows OneDrive path canonicalization failures.

## ADR-010: Phase 1 Uncluttered Landing Page, Quick-Services Drawer & Global Design Skills Integration

- **Status:** Accepted
- **Context:** The staging website requires an editorial landing page that preserves legacy quick utilities without crowding the hero layout, while integrating design playbooks globally.
- **Decision:** Deploy modular components `Navbar`, `QuickServicesDrawer`, `SplitHero`, `TrustStrip`, `ProductPillars`, and `Footer`; wire the live multi-rail payment simulator directly to `mockPaymentService`; install 2,971 agentic skills from `sickn33/agentic-awesome-skills` globally; and query skills (`anti-slop-design`, `high-end-visual-design`, `ui-ux-pro-max`) during all design cycles.
- **Why:** Guarantees an uncluttered editorial landing experience, preserves 100% functional access to legacy utilities, and enforces elite design standards.




## ADR-011: Phase 1 Revamp — Phone Hero, Anchored Drawer, New Type, Placeholder Routes

- **Decision:**
  1. Load fonts with `next/font` (they were not loaded before). Display: `Schibsted Grotesk`. Body: `Geist`. Data: `Geist Mono`. This replaces Bricolage / Instrument Sans / IBM Plex Mono.
  2. Replace `SplitHero` with `Hero` + `PhoneSimulator` (a CSS phone frame that runs the STK Push flow through `mockPaymentService`). The hero gradient fades into the canvas color.
  3. `Navbar` owns `QuickServicesDrawer`. The drawer opens as a panel under its trigger on the left side (full-width sheet on mobile). The order is logo, then Quick Services.
  4. Replace `lucide-react` with `src/components/ui/icons.tsx` (custom SVG set).
  5. Add `not-found.tsx`, mock `/login` and `/signup` (they call `mockAuthService`), and `Placeholder` pages for `/developers` and `/portal/[[...slug]]`.
  6. Move the demo role switcher into the footer.
- **Why:** The fonts fell back to system sans. The drawer opened on the opposite side from its trigger. Most links returned 404.

## ADR-012: Static Export to GitHub Pages, Demo Modal, Mobile-Specific Layouts

- **Decision:**
  1. Build with `output: "export"`. `NEXT_PUBLIC_BASE_PATH=/lipapesa` in CI. Import images statically so the base path is applied. Deploy with `.github/workflows/pages.yml`.
  2. Hero tagline: "Affordable and accessible digital payments" (from the original site). The three original carousel promises become the `Promises` band.
  3. "Test live simulator" opens `DemoModal`: a centered phone over a blurred page on desktop, a full-screen simulator on mobile.
  4. The simulator has C2B (STK Push → PIN → Confirmed, MDR receipt) and B2C (disbursement) on all five rails, through `mockPaymentService`.
  5. Mobile-only decisions: a sticky action bar after the hero, the Quick Services panel holds the primary nav and auth links, swipeable account-type cards, and auth pages use a navy header with a form sheet.
  6. Auth pages are locked to `h-dvh`. Only the form sheet can scroll, for when the mobile keyboard is open.
  7. Brand mark (`LogoMark`, `src/app/icon.svg`) is the curled-note glyph from the wordmark, redrawn as SVG. `public/og.png` is a frozen 1200×630 OG image.
- **Why:** GitHub Pages serves only static files. The original tagline matches the consumer offer. A fake phone frame inside a real phone wastes space.

## ADR-013: Corporate & Product Pages, Bespoke SVG Graphics, Local Photography

- **Status:** Accepted
- **Note:** The request named this record ADR-009. ADR-009 to ADR-012 already exist, so this record uses the next free number.

### 1. Purpose

Add the four pages that LIPATECH leadership requested in the top navigation. Show real African customers and the LipaPesa Payment Rail architecture.

### 2. Prerequisites & Inputs

- `src/config/navigation.ts` (`MARKETING_NAV_ITEMS`)
- `src/i18n/marketingPages.ts` (EN + SW copy, merged into `dictionaries.ts` under `pages`)
- `src/config/images.ts` (static imports of `public/images/*.jpg`)
- `mockMerchantService.calculateMdr` and `BRAND_METRICS.demoMonthlyGrossTzs`

### 3. Decision

1. Replace the nav items with `Our Products`, `Our Services`, `Our Company`, `Our Clients`, `Developers`.
2. Show the centre links from the `xl` breakpoint. Below `xl`, the `QuickServicesDrawer` holds the primary nav.
3. Add routes `/products`, `/services`, `/company`, `/clients`. Each `page.tsx` exports `metadata` and renders a client component from `src/components/marketing/pages/`.
4. Keep `/about` as an alias. The static export cannot send HTTP 301, so `AboutRedirect` calls `router.replace("/company")`. The page is `noindex`.
5. Put shared layout parts in `src/components/marketing/PageKit.tsx` (`PageHero`, `SectionHead`, `PhotoFrame`, `MetricBadge`, `CtaBand`).
6. Draw graphics as inline SVG in `src/components/marketing/graphics/`: `RailSwitchingDiagram`, `SettlementFlowGraphic`, `GridField`, `NodeCluster`. Read rail names and colours from `BRAND_INFO.supportedRails`. Stop all motion when `prefers-reduced-motion` is set.
7. Store photos locally in `public/images/`. Import them statically so the GitHub Pages base path applies (ADR-012). Use only Unsplash License photos and record each one in `public/images/CREDITS.md`.
8. Read `?role=` on `/signup` to preselect `CONSUMER`, `WAKALA` or `MERCHANT`.
9. Keep `Schibsted Grotesk` + `Geist` + `Geist Mono` (ADR-011). Do not reintroduce Bricolage / Instrument Sans / IBM Plex Mono.

### 4. Verification & Expected Output

- **Pass Criteria:** `npm run build` exports `/products/`, `/services/`, `/company/`, `/clients/` and `/about/` as static pages. The `EN` / `SW` toggle changes every heading, card, graphic label and image alt text.
- **Failure Mode:** If a key is missing in `marketingPagesSw`, TypeScript fails the build because the SW object has the type `typeof marketingPagesEn`.
