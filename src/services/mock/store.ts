/**
 * LipaPesa Synchronized Mock State Engine
 * Spec: docs/03-SYSTEM-ARCHITECTURE.md (lipapesa_v1_state)
 * Persists and coordinates state across Landing Simulator, Burger Drawer, Auth, and Portal.
 */

import { LipaPesaState, MerchantTill, SettlementSummary, Transaction, UserSession, VoucherBatch, WakalaFloat } from "@/types/fintech";

const STORAGE_KEY = "lipapesa_v1_state";
const STATE_EVENT = "lipapesa_state_change";

export const DEFAULT_INITIAL_STATE: LipaPesaState = {
  session: {
    id: "usr_lead_01",
    fullName: "Haji Mwangi",
    phone: "+255 754 112 233",
    role: "MERCHANT",
    merchantVertical: "ECOMMERCE",
    businessName: "Swahili Apparel Co.",
    tillNumber: "TILL-882109",
    walletBalanceTzs: 4850000,
    avatarUrl: undefined,
  },
  merchantTills: [
    {
      tillNumber: "TILL-882109",
      businessName: "Swahili Apparel Co.",
      vertical: "ECOMMERCE",
      billablePrefix: "SWAPP",
      mdrRatePercent: 5.5,
      monthlyGrossTzs: 14250000,
      monthlyMdrTzs: 783750, // 14,250,000 * 0.055
      nextSettlementDate: "2026-11-30",
      status: "ACTIVE",
      bankAccountMasked: "CRDB Bank - ****4821",
    },
    {
      tillNumber: "TILL-440912",
      businessName: "Dar es Salaam Academy",
      vertical: "SCHOOL_EDUPAY",
      billablePrefix: "DSA",
      mdrRatePercent: 5.5,
      monthlyGrossTzs: 48500000,
      monthlyMdrTzs: 2667500, // 48,500,000 * 0.055
      nextSettlementDate: "2026-11-30",
      status: "ACTIVE",
      bankAccountMasked: "NMB Bank - ****9102",
    },
  ],
  wakalaFloats: [
    {
      agentCode: "WK-77401",
      agentName: "Kariakoo Express Wakala",
      floatBalanceTzs: 3500000,
      commissionEarnedTzs: 192500,
      totalVouchersVended: 1420,
      lastTopUpDate: "2026-11-20T10:30:00Z",
      tier: "GOLD",
    },
  ],
  transactions: [
    {
      id: "tx_001",
      reference: "LP-202611-88910",
      rail: "MPESA",
      category: "MERCHANT_TILL",
      grossAmountTzs: 125000,
      mdrRatePercent: 5.5,
      mdrFeeTzs: 6875,
      netAmountTzs: 118125,
      status: "SUCCESS",
      customerPhone: "+255 754 889 001",
      customerName: "Amina Salim",
      tillNumber: "TILL-882109",
      createdAt: "2026-11-22T08:15:30Z",
      settledAt: "2026-11-22T08:15:35Z",
    },
    {
      id: "tx_002",
      reference: "LP-202611-88911",
      rail: "YAS",
      category: "MERCHANT_TILL",
      grossAmountTzs: 350000,
      mdrRatePercent: 5.5,
      mdrFeeTzs: 19250,
      netAmountTzs: 330750,
      status: "SUCCESS",
      customerPhone: "+255 784 223 445",
      customerName: "Rashid Bakari",
      tillNumber: "TILL-882109",
      createdAt: "2026-11-22T09:42:10Z",
      settledAt: "2026-11-22T09:42:14Z",
    },
    {
      id: "tx_003",
      reference: "LP-202611-88912",
      rail: "VISA",
      category: "SCHOOL_FEE",
      grossAmountTzs: 1200000,
      mdrRatePercent: 5.5,
      mdrFeeTzs: 66000,
      netAmountTzs: 1134000,
      status: "SUCCESS",
      customerPhone: "+255 713 908 123",
      customerName: "Grace Mushi",
      tillNumber: "TILL-440912",
      description: "Term 3 Tuition - Student DSA-0941",
      createdAt: "2026-11-22T10:11:00Z",
      settledAt: "2026-11-22T10:11:05Z",
    },
    {
      id: "tx_004",
      reference: "LP-202611-88913",
      rail: "AIRTEL",
      category: "AIRTIME",
      grossAmountTzs: 20000,
      mdrRatePercent: 5.5,
      mdrFeeTzs: 1100,
      netAmountTzs: 18900,
      status: "SUCCESS",
      customerPhone: "+255 787 554 433",
      agentCode: "WK-77401",
      createdAt: "2026-11-22T11:05:40Z",
      settledAt: "2026-11-22T11:05:42Z",
    },
    {
      id: "tx_005",
      reference: "LP-202611-88914",
      rail: "HALOPESA",
      category: "VIRTUAL_VOUCHER",
      grossAmountTzs: 50000,
      mdrRatePercent: 5.5,
      mdrFeeTzs: 2750,
      netAmountTzs: 47250,
      status: "SUCCESS",
      customerPhone: "+255 622 334 556",
      agentCode: "WK-77401",
      createdAt: "2026-11-22T11:50:22Z",
      settledAt: "2026-11-22T11:50:25Z",
    },
  ],
  vouchers: [
    {
      id: "vch_01",
      serialNumber: "SN-VODA-998231",
      pinMasked: "4829-****-9102",
      denominationTzs: 5000,
      network: "Vodacom",
      status: "AVAILABLE",
      issuedAt: "2026-11-22T08:00:00Z",
      agentCode: "WK-77401",
    },
    {
      id: "vch_02",
      serialNumber: "SN-VODA-998232",
      pinMasked: "3184-****-7714",
      denominationTzs: 10000,
      network: "Vodacom",
      status: "AVAILABLE",
      issuedAt: "2026-11-22T08:00:00Z",
      agentCode: "WK-77401",
    },
    {
      id: "vch_03",
      serialNumber: "SN-YAS-441098",
      pinMasked: "9021-****-4432",
      denominationTzs: 10000,
      network: "Yas",
      status: "AVAILABLE",
      issuedAt: "2026-11-22T08:00:00Z",
      agentCode: "WK-77401",
    },
    {
      id: "vch_04",
      serialNumber: "SN-AIR-771234",
      pinMasked: "7712-****-1099",
      denominationTzs: 20000,
      network: "Airtel",
      status: "SOLD",
      issuedAt: "2026-11-21T14:20:00Z",
      soldToPhone: "+255 787 554 433",
      agentCode: "WK-77401",
    },
  ],
  settlements: [
    {
      id: "stl_2026_10",
      cycleMonth: "October 2026",
      tillNumber: "TILL-882109",
      businessName: "Swahili Apparel Co.",
      grossCollectionsTzs: 28400000,
      mdrPercent: 5.5,
      totalMdrFeeTzs: 1562000, // 28,400,000 * 0.055
      netSettlementTzs: 26838000,
      status: "SETTLED",
      settlementDate: "2026-10-31",
      payoutAccount: "CRDB Bank - ****4821",
      transactionCount: 214,
    },
    {
      id: "stl_2026_11",
      cycleMonth: "November 2026",
      tillNumber: "TILL-882109",
      businessName: "Swahili Apparel Co.",
      grossCollectionsTzs: 14250000,
      mdrPercent: 5.5,
      totalMdrFeeTzs: 783750, // 14,250,000 * 0.055
      netSettlementTzs: 13466250,
      status: "PENDING",
      settlementDate: "2026-11-30",
      payoutAccount: "CRDB Bank - ****4821",
      transactionCount: 98,
    },
    {
      id: "stl_2026_11_dsa",
      cycleMonth: "November 2026",
      tillNumber: "TILL-440912",
      businessName: "Dar es Salaam Academy",
      grossCollectionsTzs: 48500000,
      mdrPercent: 5.5,
      totalMdrFeeTzs: 2667500, // 48,500,000 * 0.055
      netSettlementTzs: 45832500,
      status: "PENDING",
      settlementDate: "2026-11-30",
      payoutAccount: "NMB Bank - ****9102",
      transactionCount: 42,
    },
  ],
};

export class MockStorageEngine {
  private static instance: MockStorageEngine;

  private constructor() {}

  public static getInstance(): MockStorageEngine {
    if (!MockStorageEngine.instance) {
      MockStorageEngine.instance = new MockStorageEngine();
    }
    return MockStorageEngine.instance;
  }

  public getState(): LipaPesaState {
    if (typeof window === "undefined") {
      return DEFAULT_INITIAL_STATE;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        this.saveState(DEFAULT_INITIAL_STATE);
        return DEFAULT_INITIAL_STATE;
      }
      return JSON.parse(stored) as LipaPesaState;
    } catch {
      return DEFAULT_INITIAL_STATE;
    }
  }

  public saveState(state: LipaPesaState): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      window.dispatchEvent(new Event(STATE_EVENT));
    } catch (err) {
      console.error("Failed to persist LipaPesa mock state:", err);
    }
  }

  public updateState(updater: (prev: LipaPesaState) => LipaPesaState): LipaPesaState {
    const prev = this.getState();
    const updated = updater(prev);
    this.saveState(updated);
    return updated;
  }

  public resetState(): LipaPesaState {
    this.saveState(DEFAULT_INITIAL_STATE);
    return DEFAULT_INITIAL_STATE;
  }

  public subscribe(callback: (state: LipaPesaState) => void): () => void {
    if (typeof window === "undefined") {
      return () => {};
    }

    const handler = () => {
      callback(this.getState());
    };

    window.addEventListener(STATE_EVENT, handler);
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener(STATE_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }
}

export const mockStorage = MockStorageEngine.getInstance();
