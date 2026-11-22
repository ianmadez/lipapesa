import { Placeholder } from "@/components/marketing/Placeholder";

// Covers /portal, /portal/pay, /portal/wakala, /portal/merchant until Phase 3.
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ slug: [] }, { slug: ["pay"] }, { slug: ["wakala"] }, { slug: ["merchant"] }];
}

export default function PortalPlaceholder() {
  return <Placeholder code="/portal" phase="Phase 3" />;
}
