import type { Metadata } from "next";
import { AboutRedirect } from "./AboutRedirect";

/** `/about` is an alias of `/company` (ADR-013). Static export cannot send HTTP 301, so we redirect on the client. */
export const metadata: Metadata = {
  title: "Our Company",
  robots: { index: false, follow: true },
  alternates: { canonical: "../company/" },
};

export default function AboutPage() {
  return <AboutRedirect />;
}
