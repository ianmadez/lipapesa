/**
 * LipaPesa Navigation Architecture
 * Spec: docs/02-PRODUCT-REQUIREMENTS.md & docs/03-SYSTEM-ARCHITECTURE.md
 */

export interface NavItem {
  id: string;
  labelEn: string;
  labelSw: string;
  href: string;
  badge?: string;
  iconName?: string;
}

export interface QuickServiceItem {
  id: string;
  labelEn: string;
  labelSw: string;
  descriptionEn: string;
  descriptionSw: string;
  href: string;
  iconName: string;
  category: "PAYMENT" | "TRANSFER" | "VOUCHER" | "TELECOM" | "UTILITY";
  popular?: boolean;
}

/** Top-level marketing nav (ADR-013). `/about` redirects to `/company`. */
export const MARKETING_NAV_ITEMS: NavItem[] = [
  { id: "home", labelEn: "Home", labelSw: "Nyumbani", href: "/" },
  { id: "products", labelEn: "Our Products", labelSw: "Bidhaa Zetu", href: "/products" },
  { id: "services", labelEn: "Our Services", labelSw: "Huduma Zetu", href: "/services" },
  { id: "company", labelEn: "Our Company", labelSw: "Kampuni Yetu", href: "/company" },
  { id: "clients", labelEn: "Our Clients", labelSw: "Wateja Wetu", href: "/clients" },
  { id: "developers", labelEn: "Developers", labelSw: "Wasanidi Programu", href: "/developers" },
];

export const AUTH_NAV_ACTIONS = {
  login: {
    id: "login",
    labelEn: "Log In",
    labelSw: "Ingia",
    href: "/login",
  },
  signup: {
    id: "signup",
    labelEn: "Sign Up",
    labelSw: "Jisajili",
    href: "/signup",
  },
} as const;

export const QUICK_SERVICES: QuickServiceItem[] = [
  {
    id: "bundles",
    labelEn: "Transaction Bundles",
    labelSw: "Vifurushi vya Miamala",
    descriptionEn: "Discounted bulk fee packages for high-frequency transfers",
    descriptionSw: "Vifurushi vya bei nafuu kwa miamala ya mara kwa mara",
    href: "/portal/pay?service=bundles",
    iconName: "Package",
    category: "PAYMENT",
    popular: true,
  },
  {
    id: "merchant",
    labelEn: "Pay Merchant / Till",
    labelSw: "Lipa Namba ya Till",
    descriptionEn: "Instant C2B checkout to verified business Till numbers",
    descriptionSw: "Malipo ya haraka kwa namba rasmi za biashara",
    href: "/portal/pay?service=merchant",
    iconName: "Store",
    category: "PAYMENT",
    popular: true,
  },
  {
    id: "qr",
    labelEn: "Scan to Pay",
    labelSw: "Skani Kulipa",
    descriptionEn: "Dynamic QR code payment across M-Pesa, Yas, Airtel & VISA",
    descriptionSw: "Lipa kupitia QR kwa M-Pesa, Yas, Airtel na VISA",
    href: "/portal/pay?service=qr",
    iconName: "QrCode",
    category: "PAYMENT",
  },
  {
    id: "send",
    labelEn: "Send Money",
    labelSw: "Tuma Pesa",
    descriptionEn: "Cross-network wallet to wallet instant disbursements",
    descriptionSw: "Uhamisho wa papo hapo kwenda mitandao yote",
    href: "/portal/pay?service=send",
    iconName: "Send",
    category: "TRANSFER",
  },
  {
    id: "withdraw",
    labelEn: "Withdraw Money",
    labelSw: "Toa Pesa",
    descriptionEn: "Cash-out via authorized LipaPesa Wakala agents nationwide",
    descriptionSw: "Kutoa pesa kupitia mawakala wa LipaPesa kote nchini",
    href: "/portal/pay?service=withdraw",
    iconName: "ArrowDownToLine",
    category: "TRANSFER",
  },
  {
    id: "bills",
    labelEn: "Pay Bills",
    labelSw: "Lipia Bili",
    descriptionEn: "LUKU tokens, DAWASCO water, DSTV, AzamTV & government taxes",
    descriptionSw: "Umeme LUKU, DAWASCO, DSTV, AzamTV na kodi za serikali",
    href: "/portal/pay?service=bills",
    iconName: "Receipt",
    category: "UTILITY",
    popular: true,
  },
  {
    id: "airtime",
    labelEn: "Airtime Recharge",
    labelSw: "Nunua Salio",
    descriptionEn: "Instant top-up for Vodacom, Yas, Airtel, and Halotel",
    descriptionSw: "Salio la papo hapo kwa Vodacom, Yas, Airtel na Halotel",
    href: "/portal/pay?service=airtime",
    iconName: "Smartphone",
    category: "TELECOM",
    popular: true,
  },
  {
    id: "vouchers",
    labelEn: "Virtual Vouchers",
    labelSw: "Vocha za Kidijitali",
    descriptionEn: "Encrypted digital PIN vouchers vended by Chap Chap agents",
    descriptionSw: "Vocha salama za nambari ya siri kutoka wakala Chap Chap",
    href: "/portal/pay?service=vouchers",
    iconName: "Ticket",
    category: "VOUCHER",
  },
  {
    id: "connectivity",
    labelEn: "Fiber / Wi-Fi / MiFi",
    labelSw: "Mtandao wa Fiber / Wi-Fi",
    descriptionEn: "Residential & enterprise high-speed broadband subscriptions",
    descriptionSw: "Vifurushi vya intaneti ya kasi ya juu kwa nyumbani na ofisini",
    href: "/portal/pay?service=connectivity",
    iconName: "Wifi",
    category: "TELECOM",
  },
];

export const PORTAL_NAV_ITEMS: NavItem[] = [
  {
    id: "overview",
    labelEn: "Dashboard Overview",
    labelSw: "Muhtasari wa Dashibodi",
    href: "/portal",
    iconName: "LayoutDashboard",
  },
  {
    id: "pay",
    labelEn: "Consumer Services",
    labelSw: "Huduma za Mteja",
    href: "/portal/pay",
    iconName: "CreditCard",
  },
  {
    id: "wakala",
    labelEn: "Wakala Chap Chap",
    labelSw: "Wakala Chap Chap",
    href: "/portal/wakala",
    iconName: "Users",
    badge: "Float Ledger",
  },
  {
    id: "merchant",
    labelEn: "Merchant Collections",
    labelSw: "Makusanyo ya Biashara",
    href: "/portal/merchant",
    iconName: "Landmark",
    badge: "5.5% MDR",
  },
];

export const DEMO_ROLE_PRESETS = [
  {
    role: "CONSUMER" as const,
    labelEn: "Consumer (Personal)",
    labelSw: "Mteja (Binafsi)",
    phone: "+255 754 112 233",
    name: "Baraka Juma",
  },
  {
    role: "WAKALA" as const,
    labelEn: "Wakala Chap Chap Agent",
    labelSw: "Wakala Chap Chap",
    phone: "+255 745 998 877",
    name: "Kariakoo Express Wakala",
    agentCode: "WK-77401",
  },
  {
    role: "MERCHANT" as const,
    vertical: "ECOMMERCE" as const,
    labelEn: "Merchant (E-Commerce)",
    labelSw: "Mfanyabiashara (Maduka Mtandaoni)",
    phone: "+255 784 556 677",
    name: "Swahili Apparel Co.",
    tillNumber: "TILL-882109",
  },
  {
    role: "MERCHANT" as const,
    vertical: "SCHOOL_EDUPAY" as const,
    labelEn: "Merchant (Edu-Pay School)",
    labelSw: "Mfanyabiashara (Ada za Shule)",
    phone: "+255 713 445 566",
    name: "Dar es Salaam Academy",
    tillNumber: "TILL-440912",
  },
] as const;
