/**
 * Payment Rail Service Contract (Mobile Wallets & VISA Direct)
 * Spec: docs/00-DOCUMENTATION-STANDARD.md & docs/03-SYSTEM-ARCHITECTURE.md
 */

import { PaymentRail, ServiceCategory, Transaction } from "@/types/fintech";

export interface StkPushRequest {
  customerPhone: string;
  amountTzs: number;
  rail: PaymentRail;
  tillNumber?: string;
  category?: ServiceCategory;
  description?: string;
}

export interface DisbursementRequest {
  recipientPhone: string;
  amountTzs: number;
  rail: PaymentRail;
  description?: string;
}

export interface TransactionFilter {
  tillNumber?: string;
  agentCode?: string;
  rail?: PaymentRail;
  status?: string;
  limit?: number;
}

export interface IPaymentService {
  sendStkPush(req: StkPushRequest): Promise<Transaction>;
  disburse(req: DisbursementRequest): Promise<Transaction>;
  getTransactions(filter?: TransactionFilter): Promise<Transaction[]>;
  getTransactionById(id: string): Promise<Transaction | null>;
}
