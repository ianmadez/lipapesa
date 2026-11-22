/**
 * Merchant Collections & Settlement Service Contract
 * Spec: docs/00-DOCUMENTATION-STANDARD.md, docs/02-PRODUCT-REQUIREMENTS.md, docs/03-SYSTEM-ARCHITECTURE.md
 * Locks standard 5.5% MDR monthly settlement calculation.
 */

import { MerchantTill, SettlementSummary } from "@/types/fintech";

export interface MdrCalculation {
  grossAmountTzs: number;
  mdrRatePercent: number; // Defaults to 5.5%
  mdrFeeTzs: number;
  netAmountTzs: number;
}

export interface IMerchantService {
  getTill(tillNumber: string): Promise<MerchantTill | null>;
  getAllTills(): Promise<MerchantTill[]>;
  calculateMdr(grossAmountTzs: number, mdrRatePercent?: number): MdrCalculation;
  getSettlementSummary(tillNumber: string, month?: string): Promise<SettlementSummary>;
  getSettlementHistory(tillNumber: string): Promise<SettlementSummary[]>;
  createCheckoutLink(tillNumber: string, amountTzs: number, reference: string): Promise<string>;
}
