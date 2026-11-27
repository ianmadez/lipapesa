import type { Metadata } from "next";
import CompanyPage from "@/components/marketing/pages/CompanyPage";

export const metadata: Metadata = {
  title: "Our Company",
  description: "LIPATECH Tanzania builds LipaPesa, East Africa's programmable financial power grid, from Dar es Salaam.",
  alternates: { canonical: "./" },
};

export default function Page() {
  return <CompanyPage />;
}
