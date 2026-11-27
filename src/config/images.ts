/**
 * Local royalty-free photography (Unsplash License). Files live in `public/images/`.
 * Static imports keep the GitHub Pages base path correct (ADR-012) and give next/image intrinsic sizes.
 * Credits: public/images/CREDITS.md. Alt text: `dict.pages.alts[altKey]`.
 */
import heroMerchant from "../../public/images/hero-merchant.jpg";
import wakalaAgent from "../../public/images/wakala-agent.jpg";
import eduPay from "../../public/images/edupay-parent-student.jpg";
import companyTeam from "../../public/images/company-team.jpg";
import ecommerce from "../../public/images/ecommerce-founder.jpg";
import enterprise from "../../public/images/enterprise-ops.jpg";
import streetVendor from "../../public/images/street-vendor.jpg";

export const PHOTOS = {
  heroMerchant,
  wakalaAgent,
  eduPay,
  companyTeam,
  ecommerce,
  enterprise,
  streetVendor,
} as const;

export type PhotoKey = keyof typeof PHOTOS;
