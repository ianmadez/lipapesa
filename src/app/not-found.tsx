"use client";

import { Placeholder } from "@/components/marketing/Placeholder";
import { useLanguage } from "@/i18n/LanguageContext";

export default function NotFound() {
  const t = useLanguage().dict.landing;
  return <Placeholder code="404" title={t.notFoundTitle} desc={t.notFoundDesc} />;
}
