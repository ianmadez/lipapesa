/**
 * Mock Wakala Chap Chap Agent Adapter
 * Spec: docs/02-PRODUCT-REQUIREMENTS.md, docs/03-SYSTEM-ARCHITECTURE.md
 */

import {
  IWakalaService,
  TopUpFloatRequest,
  VendVouchersRequest,
} from "@/services/contracts/wakala";
import { VoucherBatch, WakalaFloat } from "@/types/fintech";
import { mockStorage } from "./store";

export class MockWakalaService implements IWakalaService {
  private readonly commissionRate = 0.055; // 5.5% agent commission on voucher vend

  public async getFloatBalance(agentCode: string): Promise<WakalaFloat> {
    const state = mockStorage.getState();
    const found = state.wakalaFloats.find((w) => w.agentCode === agentCode);

    if (found) {
      return found;
    }

    // Default fallback float for active session
    return {
      agentCode,
      agentName: "Kariakoo Express Wakala",
      floatBalanceTzs: 3500000,
      commissionEarnedTzs: 192500,
      totalVouchersVended: 1420,
      lastTopUpDate: new Date().toISOString(),
      tier: "GOLD",
    };
  }

  public async vendVouchers(req: VendVouchersRequest): Promise<VoucherBatch[]> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const totalCost = req.denominationTzs * req.quantity;
    const commission = Math.round(totalCost * this.commissionRate);

    const generatedVouchers: VoucherBatch[] = [];
    const now = new Date().toISOString();

    for (let i = 0; i < req.quantity; i++) {
      const serialNumber = `SN-${req.network.slice(0, 4).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const prefix = Math.floor(1000 + Math.random() * 9000);
      const suffix = Math.floor(1000 + Math.random() * 9000);

      generatedVouchers.push({
        id: `vch_${Date.now()}_${i}`,
        serialNumber,
        pinMasked: `${prefix}-****-${suffix}`,
        denominationTzs: req.denominationTzs,
        network: req.network,
        status: "AVAILABLE",
        issuedAt: now,
        agentCode: req.agentCode,
      });
    }

    mockStorage.updateState((prev) => {
      const updatedFloats = prev.wakalaFloats.map((wf) => {
        if (wf.agentCode === req.agentCode) {
          return {
            ...wf,
            floatBalanceTzs: Math.max(0, wf.floatBalanceTzs - totalCost),
            commissionEarnedTzs: wf.commissionEarnedTzs + commission,
            totalVouchersVended: wf.totalVouchersVended + req.quantity,
          };
        }
        return wf;
      });

      return {
        ...prev,
        wakalaFloats: updatedFloats,
        vouchers: [...generatedVouchers, ...prev.vouchers],
      };
    });

    return generatedVouchers;
  }

  public async topUpFloat(req: TopUpFloatRequest): Promise<WakalaFloat> {
    await new Promise((resolve) => setTimeout(resolve, 700));

    let updatedFloat: WakalaFloat | null = null;

    mockStorage.updateState((prev) => {
      const updatedFloats = prev.wakalaFloats.map((wf) => {
        if (wf.agentCode === req.agentCode) {
          const nextBalance = wf.floatBalanceTzs + req.amountTzs;
          updatedFloat = {
            ...wf,
            floatBalanceTzs: nextBalance,
            lastTopUpDate: new Date().toISOString(),
          };
          return updatedFloat;
        }
        return wf;
      });

      return {
        ...prev,
        wakalaFloats: updatedFloats,
      };
    });

    return (
      updatedFloat || {
        agentCode: req.agentCode,
        agentName: "Kariakoo Express Wakala",
        floatBalanceTzs: req.amountTzs,
        commissionEarnedTzs: 0,
        totalVouchersVended: 0,
        lastTopUpDate: new Date().toISOString(),
        tier: "SILVER",
      }
    );
  }

  public async getInventory(agentCode: string): Promise<VoucherBatch[]> {
    const state = mockStorage.getState();
    return state.vouchers.filter((v) => !v.agentCode || v.agentCode === agentCode);
  }
}

export const mockWakalaService = new MockWakalaService();
