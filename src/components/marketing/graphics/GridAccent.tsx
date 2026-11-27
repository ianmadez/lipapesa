import React from "react";

/**
 * Geometric node-and-grid accents for section headers and cards.
 * Decorative only (aria-hidden). Brand colours: #0084D6, #0095E8, #061526.
 */

/** Blueprint grid that fades out toward the bottom-left. Place inside a `relative` parent. */
export const GridField: React.FC<{ className?: string; dark?: boolean }> = ({ className = "", dark }) => (
  <svg aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
    <defs>
      <pattern id={dark ? "gf-d" : "gf-l"} width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M32 0H0V32" fill="none" stroke={dark ? "#ffffff" : "#0084D6"} strokeOpacity={dark ? 0.06 : 0.09} />
      </pattern>
      <radialGradient id={dark ? "gf-md" : "gf-ml"} cx="85%" cy="0%" r="90%">
        <stop offset="0" stopColor="#fff" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <mask id={dark ? "gf-kd" : "gf-kl"}>
        <rect width="100%" height="100%" fill={`url(#${dark ? "gf-md" : "gf-ml"})`} />
      </mask>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${dark ? "gf-d" : "gf-l"})`} mask={`url(#${dark ? "gf-kd" : "gf-kl"})`} />
  </svg>
);

/** Small node cluster: three linked nodes, used beside section kickers and in card corners. */
export const NodeCluster: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 56 }) => (
  <svg aria-hidden width={size} height={size} viewBox="0 0 56 56" className={className}>
    <path d="M10 44L28 14L46 36Z" fill="none" stroke="#0084D6" strokeOpacity="0.35" strokeDasharray="2 3" />
    <path d="M28 14V36H46" fill="none" stroke="#0095E8" strokeOpacity="0.5" />
    <circle cx="10" cy="44" r="4" fill="#fff" stroke="#0084D6" strokeWidth="1.5" />
    <circle cx="28" cy="14" r="5" fill="#0084D6" />
    <circle cx="46" cy="36" r="4" fill="#fff" stroke="#0095E8" strokeWidth="1.5" />
    <circle cx="28" cy="36" r="2.5" fill="#061526" />
  </svg>
);
