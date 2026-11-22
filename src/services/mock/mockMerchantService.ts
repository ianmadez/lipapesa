/**
 * Mock Merchant Collections & Settlement Adapter
 * Spec: docs/00-DOCUMENTATION-STANDARD.md, docs/02-PRODUCT-REQUIREMENTS.md, docs/03-SYSTEM-ARCHITECTURE.md
 * Implements 5.5% MDR monthly calendar settlement math.
 */

import { IMerchantService, MdrCalculation } from "@/services/contracts/merchant";
import { MerchantTill, SettlementSummary } from "@/types/fintech";
import { mockStorage } from "./store";

export class MockMerchantService implements IMerchantService {
  private readonly defaultMdrRate = 5.5;

  public async getTill(tillNumber: string): Promise<MerchantTill | null> {
    const state = mockStorage.getState();
    return state.merchantTills.find((t) => t.tillNumber === tillNumber) || null;
  }

  public async getAllTills(): Promise<MerchantTill[]> {
    const state = mockStorage.getState();
    return state.merchantTills;
  }

  /**
   * Pure 5.5% MDR Calculation Engine
   * Gross collections minus 5.5% monthly calendar deduction yields net merchant settlement.
   */
  public calculateMdr(
    grossAmountTzs: number,
    mdrRatePercent: number = this.defaultMdrRate
  ): MdrCalculation {
    const rate = mdrRatePercent / 100;
    const mdrFeeTzs = Math.round(grossAmountTzs * rate);
    const netAmountTzs = Math.max(0, grossAmountTzs - mdrFeeTzs);

    return {
      grossAmountTzs,
      mdrRatePercent,
      mdrFeeTzs,
      netAmountTzs,
    };
  }

  public async getSettlementSummary(
    tillNumber: string,
    month: string = "November 2026"
  ): Promise<SettlementSummary> {
    const state = mockStorage.getState();
    const existing = state.settlements.find(
      (s) => s.tillNumber === tillNumber && s.cycleMonth === month
    );

    if (existing) {
      return existing;
    }

    const till = state.merchantTills.find((t) => t.tillNumber === tillNumber);
    const gross = till ? till.monthlyGrossTzs : 14250000;
    const mdrCalc = this.calculateMdr(gross, till?.mdrRatePercent || this.defaultMdrRate);

    return {
      id: `stl_${Date.now()}`,
      cycleMonth: month,
      tillNumber,
      businessName: till?.businessName || "Registered Merchant",
      grossCollectionsTzs: mdrCalc.grossAmountTzs,
      mdrPercent: mdrCalc.mdrRatePercent,
      totalMdrFeeTzs: mdrCalc.mdrFeeTzs,
      netSettlementTzs: mdrCalc.netAmountTzs,
      status: "PENDING",
      settlementDate: till?.nextSettlementDate || "2026-11-30",
      payoutAccount: till?.bankAccountMasked || "CRDB Bank - ****4821",
      transactionCount: 88,
    };
  }

  public async getSettlementHistory(tillNumber: string): Promise<SettlementSummary[]> {
    const state = mockStorage.getState();
    return state.settlements.filter((s) => s.tillNumber === tillNumber);
  }

  public async createCheckoutLink(
    tillNumber: string,
    amountTzs: number,
    reference: string
  ): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return `https://pay.lipapesa.co.tz/checkout?till=${tillNumber}&amount=${amountTzs}&ref=${encodeURIComponent(reference)}`;
  }
}

export const mockMerchantService = new MockMerchantService();
