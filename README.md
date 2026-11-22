# LipaPesa Digital Financial Suite (`lipapesa.co.tz`)

## 1. Purpose
Frontend web application for LipaPesa. Connects Mobile Wallets (Vodacom M-Pesa, Mix by Yas, Airtel Money, Halopesa) and VISA Payment Rails for Consumers, Wakala Agents, and Merchants.

## 2. Prerequisites
- Node.js `18.18+` or `20+`
- `npm` package manager

## 3. Step-by-Step Procedure
1. Open a terminal in the project root directory.
2. Install project dependencies:
   ```bash
   npm install

    Start the local development server:
    Bash

    npm run dev

    Open http://localhost:3000 in your browser.

4. Repository Map

    AGENT.md — AI agent routing rules and engineering guardrails

    ROADMAP.md — Phased delivery milestones and stakeholder sign-off log

    ARCHITECTURE_DECISIONS.md — Architectural Decision Records (ADR-001 to ADR-008)

    docs/ — Modular specifications (00-DOCUMENTATION-STANDARD.md through 04-DEVELOPER-PORTAL-SPEC.md)

    src/app/ — Next.js App Router routes ((marketing), (auth), portal)

    src/services/ — Payment Rail contracts (contracts/), localStorage simulators (mock/), and production stubs (live/)

5. Verification

    Pass Criteria: The landing page loads at http://localhost:3000 with the interactive Payment Rail simulator, EN/SW (Badili Lugha) toggle, and desktop/mobile quick-services drawer.