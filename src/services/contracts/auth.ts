/**
 * Authentication Service Contract
 * Spec: docs/00-DOCUMENTATION-STANDARD.md & docs/03-SYSTEM-ARCHITECTURE.md
 */

import { MerchantVertical, UserRole, UserSession } from "@/types/fintech";

export interface LoginCredentials {
  phone: string;
  pin: string;
}

export interface SignupData {
  role: UserRole;
  fullName: string;
  phone: string;
  pin: string;
  businessName?: string;
  vertical?: MerchantVertical;
  agentLocation?: string;
  tinNumber?: string;
}

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<UserSession>;
  signup(data: SignupData): Promise<UserSession>;
  getCurrentSession(): Promise<UserSession | null>;
  logout(): Promise<void>;
  switchDemoRole(role: UserRole, vertical?: MerchantVertical): Promise<UserSession>;
}
