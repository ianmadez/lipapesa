import type { Metadata } from "next";
import ClientsPage from "@/components/marketing/pages/ClientsPage";

export const metadata: Metadata = {
  title: "Our Clients",
  description: "How merchants, schools, Wakala agents and enterprises in Tanzania run payments on LipaPesa.",
  alternates: { canonical: "./" },
};

export default function Page() {
  return <ClientsPage />;
}
