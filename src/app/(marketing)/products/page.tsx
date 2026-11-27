import type { Metadata } from "next";
import ProductsPage from "@/components/marketing/pages/ProductsPage";

export const metadata: Metadata = {
  title: "Our Products",
  description: "Mobile wallet switching, Merchant Till gateway, Edu-Pay, Wakala Chap Chap and eKYC on one LipaPesa engine.",
  alternates: { canonical: "./" },
};

export default function Page() {
  return <ProductsPage />;
}
