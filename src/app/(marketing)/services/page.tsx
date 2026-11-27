import type { Metadata } from "next";
import ServicesPage from "@/components/marketing/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Our Services",
  description: "C2B collections, B2C disbursements, utilities vending, Vodacom enterprise integration and omnichannel checkout.",
  alternates: { canonical: "./" },
};

export default function Page() {
  return <ServicesPage />;
}
