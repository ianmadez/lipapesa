# 04 â€” Developer Portal Preview (`/developers`) Specification

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
