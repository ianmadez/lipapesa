
$ErrorActionPreference = "Stop"

$ProjectDir = "C:\Users\ianth\OneDrive\Documents\lipapesa"

if (-not (Test-Path $ProjectDir)) {
    throw "Project directory does not exist: $ProjectDir"
}

Set-Location $ProjectDir

$DocsDir = Join-Path $ProjectDir "docs"
$AgentPath = Join-Path $ProjectDir "AGENT.md"
$AdrPath = Join-Path $ProjectDir "ARCHITECTURE_DECISIONS.md"

# Verify required files exist.
foreach ($RequiredFile in @($AgentPath, $AdrPath)) {
    if (-not (Test-Path $RequiredFile -PathType Leaf)) {
        throw "Required file is missing: $RequiredFile"
    }
}

# Create docs directory if required.
New-Item -ItemType Directory -Force -Path $DocsDir | Out-Null

# --------------------------------------------------
# 1. CREATE DOCUMENTATION STANDARD
# --------------------------------------------------

$StandardPath = Join-Path $DocsDir "00-DOCUMENTATION-STANDARD.md"

@'
# 00 — Documentation Standard (ASD-STE100 + Modular Task Cards)

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
## [System Code] — [Module or Task Name]

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

'@ | Set-Content -Path $StandardPath -Encoding UTF8

# --------------------------------------------------
# 2. UPDATE AGENT.md
# --------------------------------------------------

$AgentContent = Get-Content -Path $AgentPath -Raw

$AgentRule = '- **Documentation style (ASD-STE100 + Modular Task Cards)** -> Read [`docs/00-DOCUMENTATION-STANDARD.md`](./docs/00-DOCUMENTATION-STANDARD.md)'

if ($AgentContent -notmatch [regex]::Escape("00-DOCUMENTATION-STANDARD.md")) {

    # Insert the new documentation reference at the beginning
    # of the Context Loading Rules section.
    $ContextHeading = "## 1. Context Loading Rules (Strict Quota Conservation)"

    if ($AgentContent.Contains($ContextHeading)) {
        $AgentContent = $AgentContent.Replace(
            $ContextHeading,
            "$ContextHeading`r`n`r`n$AgentRule"
        )
    }
    else {
        throw "Could not find Context Loading Rules heading in AGENT.md."
    }
}

$AgentDirective = '6. **AMM / STE Documentation Rule:** Write all new or updated documentation, READMEs, and developer guides using **ASD-STE100 (Simplified Technical English)** and the numbered **Task Card** format in [`docs/00-DOCUMENTATION-STANDARD.md`](./docs/00-DOCUMENTATION-STANDARD.md).'

if ($AgentContent -notmatch [regex]::Escape("AMM / STE Documentation Rule")) {
    $AgentContent = $AgentContent.TrimEnd() + "`r`n`r`n" + $AgentDirective + "`r`n"
}

Set-Content -Path $AgentPath -Value $AgentContent -Encoding UTF8

# --------------------------------------------------
# 3. APPEND ADR-008
# --------------------------------------------------

$AdrContent = Get-Content -Path $AdrPath -Raw

if ($AdrContent -notmatch '(?m)^## ADR-008:') {

    $AdrEntry = @'

## ADR-008: Adopt ASD-STE100 & Aircraft Maintenance Manual (AMM) Task Card Documentation

- **Status:** Accepted
- **Context:** LipaPesa spans multiple payment rails (Vodacom M-Pesa, cross-network mobile wallets, VISA) and diverse stakeholders (local leadership, developers, interns, and AI agents). Traditional prose documentation can create ambiguity and slow down onboarding.
- **Decision:** Enforce **ASD-STE100 (Simplified Technical English)** and modular **ATA/S1000D-style Task Cards** (`Purpose -> Prerequisites -> Step-by-Step Procedure -> Verification`) across all `.md` files and developer guides via `docs/00-DOCUMENTATION-STANDARD.md`.
- **Why:** Establishes consistent technical documentation and makes specifications easier for engineers and AI coding agents to interpret.
'@

    Add-Content -Path $AdrPath -Value $AdrEntry -Encoding UTF8
}

# --------------------------------------------------
# 4. VERIFY RESULTS
# --------------------------------------------------

$ExpectedFiles = @(
    $StandardPath,
    $AgentPath,
    $AdrPath
)

foreach ($File in $ExpectedFiles) {
    if (-not (Test-Path $File -PathType Leaf)) {
        throw "Verification failed. Missing file: $File"
    }
}

$VerifiedAgent = Get-Content -Path $AgentPath -Raw
$VerifiedAdr = Get-Content -Path $AdrPath -Raw
$VerifiedStandard = Get-Content -Path $StandardPath -Raw

if ($VerifiedAgent -notmatch "00-DOCUMENTATION-STANDARD.md") {
    throw "Verification failed: AGENT.md does not reference the documentation standard."
}

if ($VerifiedAgent -notmatch "AMM / STE Documentation Rule") {
    throw "Verification failed: AGENT.md is missing its documentation directive."
}

if ($VerifiedAdr -notmatch '(?m)^## ADR-008:') {
    throw "Verification failed: ADR-008 was not found."
}

if ($VerifiedStandard -notmatch "ASD-STE100") {
    throw "Verification failed: Documentation standard content is missing."
}

Write-Host ""
Write-Host ">>> SUCCESS! Documentation standard installed." -ForegroundColor Green
Write-Host ""
Write-Host "Verified files:" -ForegroundColor Cyan

foreach ($File in $ExpectedFiles) {
    Write-Host " [OK] $File" -ForegroundColor Green
}

Write-Host ""
Write-Host "Documentation standard: CREATED" -ForegroundColor Green
Write-Host "AGENT.md directives: VERIFIED" -ForegroundColor Green
Write-Host "ADR-008: VERIFIED" -ForegroundColor Green
Write-Host ""
Write-Host "Safe to execute again: YES" -ForegroundColor Cyan
