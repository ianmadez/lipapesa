# 00 â€” Documentation Standard (ASD-STE100 + Modular Task Cards)

All repository documentation (`docs/*.md`, `README.md`, inline module headers, and `/developers` guides) MUST follow **ASD-STE100 (Simplified Technical English)** and **ATA/S1000D Modular Task Card** structure so any engineer, intern, or partner can understand and execute tasks without ambiguity.

## 1. ASD-STE100 Writing Rules

1. **One Word, One Meaning:** Use the exact canonical term from the LipaPesa Glossary below. Never swap synonyms. For example, do not alternate between *gateway*, *pipe*, *channel*, and *rail*. Always use **Payment Rail**.
2. **Imperative Verbs for Procedures:** Start every procedural step with a direct action verb (*Configure*, *Verify*, *Execute*, *Replace*, *Confirm*).
3. **Short, Single-Action Sentences:** Maximum 20 words per sentence. Put only one instruction in each numbered step.
4. **Active Voice Only:** Write "The adapter sends an STK Push to Vodacom M-Pesa." Never write "An STK Push is sent to Vodacom M-Pesa by the adapter."
5. **Zero Filler or Idioms:** Avoid marketing adjectives (*seamless, cutting-edge, robust, revolutionary*) and regional slang. State exact inputs, outputs, types, and failure states.

## 2. Canonical LipaPesa Domain Glossary

- **Payment Rail:** An external settlement network (`MPESA`, `YAS`, `AIRTEL`, `HALOPESA`, `VISA`).
- **Collection (C2B):** Money moving from a customer or student into a LipaPesa Merchant Till or Billable Account.
- **Disbursement (B2C):** Money moving from a LipaPesa account to a recipient wallet or bank.
- **Merchant Till:** A unique numeric collection identifier assigned to an e-commerce store or school (`Edu-Pay`).
- **Wakala / Chap Chap:** An authorized LipaPesa agent who purchases wholesale float and vends Virtual Vouchers or Airtime.
- **MDR (Merchant Discount Rate):** The `5.0%` to `6.0%` platform fee deducted from gross collections on a monthly calendar cycle.
- **Adapter:** A TypeScript module in `src/services/mock/` or `src/services/live/` implementing an interface from `src/services/contracts/`.

## 3. Mandatory Task Card Template

Use this template for every feature, API, or setup document.

```markdown
## [System Code] â€” [Module or Task Name]

- **System:** [e.g., 02-COLLECTIONS / 03-WAKALA / 04-DEVELOPER-API]
- **Status:** [Active Mock | Ready for Live Cutover]

### 1. Purpose

[1-2 sentences stating what this module does and what problem it solves.]

### 2. Prerequisites & Inputs

- [Required files, environment variables, interfaces, or user roles]

### 3. Step-by-Step Procedure

1. [Imperative verb] [single clear action].
2. [Imperative verb] [single clear action].

### 4. Verification & Expected Output

- **Pass Criteria:** [Exact observable UI state, HTTP status, or JSON payload]
- **Failure Mode:** [Exact error state and fallback behavior]
```

