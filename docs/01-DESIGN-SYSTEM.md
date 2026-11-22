# 01 â€” Design System & Visual Craft Specification

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

- **Display & Headings:** `Schibsted Grotesk` (Weights: `600`–`900`; tracking `-0.02em`)
- **Body & UI Controls:** `Geist`
- **Financial & Technical Data:** `Geist Mono` ( `tabular-nums` mandatory for all `TZS` amounts, Till numbers, voucher PINs, and JSON payloads)

## 3. Anti-Slop Craft Rules

1. **Architectural Precision Over Generic Pill Templates:** Use crisp `8px` (`rounded-lg`) or `12px` (`rounded-xl`) card radii with `1px solid #E2E8F0` borders and directional shadows (`0 12px 32px -8px rgba(6, 21, 38, 0.08)`). Reserve full pills strictly for micro status badges (`Live API`, `5.5% MDR`).
2. **Tactile Financial Feedback:** Every interactive widget (STK Push simulator, Airtime/Voucher buyer, MDR calculator) must display live formatted currency (`TZS 125,000`), network badges, and realistic step transitions (`Idle` -> `Sending STK Push to +255...` -> `Confirmed`).
3. **Restraint on the Landing Canvas:** Keep `/` spacious and editorial; house quick-pay utility tiles inside the slide-over burger drawer rather than crowding the landing hero.
