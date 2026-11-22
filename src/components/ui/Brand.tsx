import React from "react";
import Image from "next/image";
import logo from "@/assets/lipapesa-logo.webp";

/** Wordmark. Static import so the path works under a GitHub Pages basePath. */
export const Logo: React.FC<{ className?: string; priority?: boolean }> = ({ className = "h-8 w-auto", priority }) => (
  <Image src={logo} alt="LipaPesa" className={className} priority={priority} />
);

/** The LipaPesa curled-note mark, redrawn as vector from the wordmark. Inherits currentColor. */
export const LogoMark: React.FC<{ size?: number; className?: string }> = ({ size = 64, className }) => (
  <svg width={size} height={(size * 76) / 96} viewBox="14 -2 96 76" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17 8C36 0 55 12 57 71H51C50 24 37 12 17 10Z" /><path d="M57 11C76 1 101 8 107 45L64 57C65 37 63 22 57 11Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" /><rect x="73" y="31" width="9" height="11.5" transform="rotate(-10 77 37)" /><path d="M51 70.5H98V56" fill="none" stroke="currentColor" strokeWidth="5" />
  </svg>
);
