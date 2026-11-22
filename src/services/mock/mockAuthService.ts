/**
 * Mock Authentication Adapter
 * Spec: docs/02-PRODUCT-REQUIREMENTS.md, docs/03-SYSTEM-ARCHITECTURE.md
 */

import { IAuthService, LoginCredentials, SignupData } from "@/services/contracts/auth";
import { mockStorage } from "./store";
import { MerchantVertical, UserRole, UserSession } from "@/types/fintech";

export class MockAuthService implements IAuthService {
  public async login(credentials: LoginCredentials): Promise<UserSession> {
    // Simulate network authentication round-trip
    await new Promise((resolve) => setTimeout(resolve, 400));

    const state = mockStorage.getState();
    if (state.session && state.session.phone === credentials.phone) {
      return state.session;
    }

    // Default session for phone login if no specific account exists
    const session: UserSession = {
      id: `usr_${Date.now().toString().slice(-6)}`,
      fullName: credentials.phone.includes("754") ? "Baraka Juma" : "LipaPesa User",
      phone: credentials.phone,
      role: "CONSUMER",
      walletBalanceTzs: 150000,
    };

    mockStorage.updateState((prev) => ({
      ...prev,
      session,
    }));

    return session;
  }

  public async signup(data: SignupData): Promise<UserSession> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let tillNumber: string | undefined;
    let agentCode: string | undefined;

    if (data.role === "MERCHANT") {
      tillNumber = `TILL-${Math.floor(100000 + Math.random() * 900000)}`;
    } else if (data.role === "WAKALA") {
      agentCode = `WK-${Math.floor(10000 + Math.random() * 90000)}`;
    }

    const session: UserSession = {
      id: `usr_${Date.now().toString().slice(-6)}`,
      fullName: data.fullName,
      phone: data.phone,
      role: data.role,
      merchantVertical: data.vertical,
      businessName: data.businessName,
      tillNumber,
      agentCode,
      walletBalanceTzs: data.role === "WAKALA" ? 2500000 : data.role === "MERCHANT" ? 500000 : 50000,
    };

    mockStorage.updateState((prev) => {
      const updatedTills = [...prev.merchantTills];
      const updatedFloats = [...prev.wakalaFloats];

      if (tillNumber && data.businessName) {
        updatedTills.push({
          tillNumber,
          businessName: data.businessName,
          vertical: data.vertical || "ECOMMERCE",
          billablePrefix: data.businessName.slice(0, 4).toUpperCase(),
          mdrRatePercent: 5.5,
          monthlyGrossTzs: 0,
          monthlyMdrTzs: 0,
          nextSettlementDate: "2026-11-30",
          status: "ACTIVE",
          bankAccountMasked: "CRDB Bank - ****0001",
        });
      }

      if (agentCode) {
        updatedFloats.push({
          agentCode,
          agentName: data.fullName,
          floatBalanceTzs: 2500000,
          commissionEarnedTzs: 0,
          totalVouchersVended: 0,
          lastTopUpDate: new Date().toISOString(),
          tier: "BRONZE",
        });
      }

      return {
        ...prev,
        session,
        merchantTills: updatedTills,
        wakalaFloats: updatedFloats,
      };
    });

    return session;
  }

  public async getCurrentSession(): Promise<UserSession | null> {
    const state = mockStorage.getState();
    return state.session;
  }

  public async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    mockStorage.updateState((prev) => ({
      ...prev,
      session: null,
    }));
  }

  public async switchDemoRole(role: UserRole, vertical?: MerchantVertical): Promise<UserSession> {
    let session: UserSession;

    if (role === "CONSUMER") {
      session = {
        id: "usr_demo_consumer",
        fullName: "Baraka Juma",
        phone: "+255 754 112 233",
        role: "CONSUMER",
        walletBalanceTzs: 385000,
      };
    } else if (role === "WAKALA") {
      session = {
        id: "usr_demo_wakala",
        fullName: "Kariakoo Express Wakala",
        phone: "+255 745 998 877",
        role: "WAKALA",
        agentCode: "WK-77401",
        walletBalanceTzs: 3500000,
      };
    } else {
      if (vertical === "SCHOOL_EDUPAY") {
        session = {
          id: "usr_demo_school",
          fullName: "Dar es Salaam Academy",
          phone: "+255 713 445 566",
          role: "MERCHANT",
          merchantVertical: "SCHOOL_EDUPAY",
          businessName: "Dar es Salaam Academy",
          tillNumber: "TILL-440912",
          walletBalanceTzs: 48500000,
        };
      } else {
        session = {
          id: "usr_demo_merchant",
          fullName: "Haji Mwangi",
          phone: "+255 784 556 677",
          role: "MERCHANT",
          merchantVertical: "ECOMMERCE",
          businessName: "Swahili Apparel Co.",
          tillNumber: "TILL-882109",
          walletBalanceTzs: 14250000,
        };
      }
    }

    mockStorage.updateState((prev) => ({
      ...prev,
      session,
    }));

    return session;
  }
}

export const mockAuthService = new MockAuthService();
