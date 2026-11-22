/**
 * Wakala Chap Chap Agent Service Contract
 * Spec: docs/00-DOCUMENTATION-STANDARD.md & docs/03-SYSTEM-ARCHITECTURE.md
 */

import { PaymentRail, VoucherBatch, WakalaFloat } from "@/types/fintech";

export interface VendVouchersRequest {
  agentCode: string;
  network: "Vodacom" | "Yas" | "Airtel" | "Halopesa" | string;
  denominationTzs: number;
  quantity: number;
  customerPhone?: string;
}

export interface TopUpFloatRequest {
  agentCode: string;
  amountTzs: number;
  rail: PaymentRail;
  fundingPhone: string;
}

export interface IWakalaService {
  getFloatBalance(agentCode: string): Promise<WakalaFloat>;
  vendVouchers(req: VendVouchersRequest): Promise<VoucherBatch[]>;
  topUpFloat(req: TopUpFloatRequest): Promise<WakalaFloat>;
  getInventory(agentCode: string): Promise<VoucherBatch[]>;
}
