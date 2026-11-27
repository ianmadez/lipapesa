"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AboutRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/company" + window.location.hash);
  }, [router]);
  return (
    <main className="min-h-screen grid place-items-center p-6 text-text-secondary">
      <Link href="/company" className="text-brand-primary underline">LipaPesa — Our Company</Link>
    </main>
  );
}
