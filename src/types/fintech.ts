/**
 * LipaPesa Fintech Domain Models
 * Spec: docs/02-PRODUCT-REQUIREMENTS.md & docs/03-SYSTEM-ARCHITECTURE.md
 */

export type UserRole = "CONSUMER" | "WAKALA" | "MERCHANT";

export type MerchantVertical = "ECOMMERCE" | "SCHOOL_EDUPAY";

export type PaymentRail = "MPESA" | "YAS" | "AIRTEL" | "HALOPESA" | "VISA";

export type ServiceCategory =
  | "AIRTIME"
  | "VIRTUAL_VOUCHER"
  | "FIBER"
  | "WIFI_MIFI"
  | "UTILITY"
  | "MERCHANT_TILL"
  | "SCHOOL_FEE"
  | "SEND_MONEY";

export type TransactionStatus =
  | "PENDING"
  | "SENDING_PUSH"
  | "AWAITING_PIN"
  | "SUCCESS"
  | "FAILED"
  | "REVERSED";

export interface UserSession {
  id: string;
  fullName: string;
  phone: string;
  role: UserRole;
  merchantVertical?: MerchantVertical;
  businessName?: string;
  tillNumber?: string;
  agentCode?: string;
  walletBalanceTzs: number;
  token?: string;
  avatarUrl?: string;
}

export interface Transaction {
  id: string;
  reference: string;
  rail: PaymentRail;
  category: ServiceCategory;
  grossAmountTzs: number;
  mdrRatePercent: number; // e.g. 5.5
  mdrFeeTzs: number;
  netAmountTzs: number;
  status: TransactionStatus;
  customerPhone: string;
  customerName?: string;
  recipientPhone?: string;
  tillNumber?: string;
  agentCode?: string;
  description?: string;
  createdAt: string;
  settledAt?: string;
}

export interface VoucherBatch {
  id: string;
  serialNumber: string;
  pinMasked: string;
  denominationTzs: number;
  network: "Vodacom" | "Yas" | "Airtel" | "Halopesa" | string;
  status: "AVAILABLE" | "SOLD";
  issuedAt: string;
  soldToPhone?: string;
  agentCode?: string;
}

export interface MerchantTill {
  tillNumber: string;
  businessName: string;
  vertical: MerchantVertical;
  billablePrefix: string;
  mdrRatePercent: 5 | 5.5 | 6;
  monthlyGrossTzs: number;
  monthlyMdrTzs: number;
  nextSettlementDate: string;
  status: "ACTIVE" | "SUSPENDED";
  bankAccountMasked?: string;
}

export interface WakalaFloat {
  agentCode: string;
  agentName: string;
  floatBalanceTzs: number;
  commissionEarnedTzs: number;
  totalVouchersVended: number;
  lastTopUpDate: string;
  tier: "BRONZE" | "SILVER" | "GOLD";
}

export interface SettlementSummary {
  id: string;
  cycleMonth: string; // e.g., "November 2026"
  tillNumber: string;
  businessName: string;
  grossCollectionsTzs: number;
  mdrPercent: number; // 5.5
  totalMdrFeeTzs: number;
  netSettlementTzs: number;
  status: "SETTLED" | "PENDING" | "PROCESSING";
  settlementDate: string;
  payoutAccount: string;
  transactionCount: number;
}

export interface LipaPesaState {
  session: UserSession | null;
  transactions: Transaction[];
  vouchers: VoucherBatch[];
  merchantTills: MerchantTill[];
  wakalaFloats: WakalaFloat[];
  settlements: SettlementSummary[];
}
