# 03 â€” System Architecture & Service Contracts

## 1. Directory Structure

```text
src/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ (marketing)/             # Public Navbar + Footer
â”‚   â”‚   â”œâ”€â”€ page.tsx             # Uncluttered Landing
â”‚   â”‚   â”œâ”€â”€ about/page.tsx
â”‚   â”‚   â””â”€â”€ developers/page.tsx
â”‚   â”œâ”€â”€ (auth)/                  # Clean split-screen auth layout
â”‚   â”‚   â”œâ”€â”€ login/page.tsx
â”‚   â”‚   â””â”€â”€ signup/page.tsx
â”‚   â”œâ”€â”€ portal/
â”‚   â”‚   â”œâ”€â”€ layout.tsx
â”‚   â”‚   â”œâ”€â”€ page.tsx
â”‚   â”‚   â”œâ”€â”€ pay/page.tsx
â”‚   â”‚   â”œâ”€â”€ wakala/page.tsx
â”‚   â”‚   â””â”€â”€ merchant/page.tsx
â”‚   â””â”€â”€ api/webhooks/route.ts
â”œâ”€â”€ components/
â”‚   â”œâ”€â”€ navigation/
â”‚   â”œâ”€â”€ marketing/
â”‚   â”œâ”€â”€ portal/
â”‚   â””â”€â”€ developers/
â”œâ”€â”€ config/
â”‚   â”œâ”€â”€ brand.ts
â”‚   â””â”€â”€ navigation.ts
â”œâ”€â”€ i18n/
â”‚   â”œâ”€â”€ LanguageContext.tsx
â”‚   â””â”€â”€ dictionaries.ts
â”œâ”€â”€ services/
â”‚   â”œâ”€â”€ contracts/
â”‚   â”œâ”€â”€ mock/
â”‚   â””â”€â”€ live/
â””â”€â”€ types/
    â””â”€â”€ fintech.ts
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
