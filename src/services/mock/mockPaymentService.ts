/**
 * Mock Payment Rail Adapter (Mobile Wallets & VISA Direct)
 * Spec: docs/00-DOCUMENTATION-STANDARD.md, docs/02-PRODUCT-REQUIREMENTS.md, docs/03-SYSTEM-ARCHITECTURE.md
 * Applies standard 5.5% MDR to all transactions.
 */

import {
  DisbursementRequest,
  IPaymentService,
  StkPushRequest,
  TransactionFilter,
} from "@/services/contracts/payments";
import { Transaction } from "@/types/fintech";
import { mockStorage } from "./store";

export class MockPaymentService implements IPaymentService {
  private readonly defaultMdrRate = 5.5;

  public async sendStkPush(req: StkPushRequest): Promise<Transaction> {
    // Realistic STK Push push-to-handset network latency simulation
    await new Promise((resolve) => setTimeout(resolve, 750));

    const mdrFeeTzs = Math.round(req.amountTzs * (this.defaultMdrRate / 100));
    const netAmountTzs = req.amountTzs - mdrFeeTzs;

    const reference = `LP-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      reference,
      rail: req.rail,
      category: req.category || (req.tillNumber ? "MERCHANT_TILL" : "SEND_MONEY"),
      grossAmountTzs: req.amountTzs,
      mdrRatePercent: this.defaultMdrRate,
      mdrFeeTzs,
      netAmountTzs,
      status: "SUCCESS",
      customerPhone: req.customerPhone,
      tillNumber: req.tillNumber,
      description: req.description || `C2B STK Collection via ${req.rail}`,
      createdAt: new Date().toISOString(),
      settledAt: new Date().toISOString(),
    };

    mockStorage.updateState((prev) => {
      const updatedTills = prev.merchantTills.map((till) => {
        if (req.tillNumber && till.tillNumber === req.tillNumber) {
          return {
            ...till,
            monthlyGrossTzs: till.monthlyGrossTzs + req.amountTzs,
            monthlyMdrTzs: till.monthlyMdrTzs + mdrFeeTzs,
          };
        }
        return till;
      });

      return {
        ...prev,
        transactions: [newTx, ...prev.transactions],
        merchantTills: updatedTills,
      };
    });

    return newTx;
  }

  public async disburse(req: DisbursementRequest): Promise<Transaction> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const mdrFeeTzs = 0; // Standard B2C disbursements typically bear zero merchant MDR
    const netAmountTzs = req.amountTzs;
    const reference = `LP-B2C-${Date.now().toString().slice(-6)}`;

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      reference,
      rail: req.rail,
      category: "SEND_MONEY",
      grossAmountTzs: req.amountTzs,
      mdrRatePercent: 0,
      mdrFeeTzs,
      netAmountTzs,
      status: "SUCCESS",
      customerPhone: req.recipientPhone,
      recipientPhone: req.recipientPhone,
      description: req.description || `B2C Disbursement via ${req.rail}`,
      createdAt: new Date().toISOString(),
      settledAt: new Date().toISOString(),
    };

    mockStorage.updateState((prev) => ({
      ...prev,
      transactions: [newTx, ...prev.transactions],
    }));

    return newTx;
  }

  public async getTransactions(filter?: TransactionFilter): Promise<Transaction[]> {
    const state = mockStorage.getState();
    let txs = [...state.transactions];

    if (filter) {
      if (filter.tillNumber) {
        txs = txs.filter((t) => t.tillNumber === filter.tillNumber);
      }
      if (filter.agentCode) {
        txs = txs.filter((t) => t.agentCode === filter.agentCode);
      }
      if (filter.rail) {
        txs = txs.filter((t) => t.rail === filter.rail);
      }
      if (filter.status) {
        txs = txs.filter((t) => t.status === filter.status);
      }
      if (filter.limit) {
        txs = txs.slice(0, filter.limit);
      }
    }

    return txs;
  }

  public async getTransactionById(id: string): Promise<Transaction | null> {
    const state = mockStorage.getState();
    return state.transactions.find((t) => t.id === id || t.reference === id) || null;
  }
}

export const mockPaymentService = new MockPaymentService();
