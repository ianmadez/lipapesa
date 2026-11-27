"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { BRAND_INFO } from "@/config/brand";

/**
 * Payers -> LipaPesa Core -> Payment Rails.
 * Pure SVG. Dots travel along each route with <animateMotion>; `motion-reduce` hides them.
 */
const W = 760;
const H = 420;
const PAYER = { x: 24, w: 150, h: 52 };
const CORE = { x: 300, y: 150, w: 170, h: 120 };
const RAIL = { x: 590, w: 150, h: 46 };
const payerYs = [70, 184, 298];
const railYs = [24, 106, 188, 270, 352];

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
};

export const RailSwitchingDiagram: React.FC<{ className?: string }> = ({ className = "" }) => {
  const g = useLanguage().dict.pages.graphics;
  const payers = [g.customers, g.students, g.shoppers];
  const coreMidY = CORE.y + CORE.h / 2;

  const inPaths = payerYs.map((y) => curve(PAYER.x + PAYER.w, y + PAYER.h / 2, CORE.x, coreMidY));
  const outPaths = railYs.map((y) => curve(CORE.x + CORE.w, coreMidY, RAIL.x, y + RAIL.h / 2));

  return (
    <div className={`overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 ${className}`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${g.payers} → ${g.core} → ${g.rails}: ${BRAND_INFO.supportedRails.map((r) => r.name).join(", ")}`}
        className="w-full min-w-[600px] h-auto font-sans"
      >
        <defs>
          <pattern id="rsd-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="#E2E8F0" strokeWidth="0.75" />
          </pattern>
          <linearGradient id="rsd-core" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0B2440" />
            <stop offset="1" stopColor="#061526" />
          </linearGradient>
          <linearGradient id="rsd-line" x1="0" x2="1">
            <stop offset="0" stopColor="#0084D6" stopOpacity="0.25" />
            <stop offset="1" stopColor="#0095E8" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <rect width={W} height={H} fill="url(#rsd-grid)" rx="12" />

        {/* Column labels */}
        {[
          [PAYER.x, g.payers],
          [CORE.x, g.core],
          [RAIL.x, g.rails],
        ].map(([x, label]) => (
          <text key={String(label)} x={Number(x)} y={14} className="fill-[#64748B]" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.08em">
            {String(label).toUpperCase()}
          </text>
        ))}

        {/* Routes */}
        {[...inPaths, ...outPaths].map((d, i) => (
          <path key={i} d={d} fill="none" stroke="url(#rsd-line)" strokeWidth="1.5" strokeDasharray="4 5" className="rsd-flow" />
        ))}

        {/* Travelling packets */}
        <g className="motion-reduce:hidden">
          {inPaths.map((d, i) => (
            <circle key={`i${i}`} r="3.5" fill="#0095E8">
              <animateMotion dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={d} />
            </circle>
          ))}
          {outPaths.map((d, i) => (
            <circle key={`o${i}`} r="3.5" fill="#0084D6">
              <animateMotion dur="2.4s" begin={`${1.2 + i * 0.35}s`} repeatCount="indefinite" path={d} />
            </circle>
          ))}
        </g>

        {/* Payers */}
        {payers.map((label, i) => (
          <g key={label} transform={`translate(${PAYER.x} ${payerYs[i]})`}>
            <rect width={PAYER.w} height={PAYER.h} rx="8" fill="#fff" stroke="#E2E8F0" />
            <circle cx="24" cy={PAYER.h / 2} r="11" fill="#E3F3FD" />
            <path
              d={`M24 ${PAYER.h / 2 - 5}a3.5 3.5 0 1 1 0 .01M17 ${PAYER.h / 2 + 7}a7 6 0 0 1 14 0`}
              fill="none"
              stroke="#0084D6"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <text x="44" y={PAYER.h / 2 + 4.5} fontSize="13" fontWeight="600" fill="#061526">
              {label}
            </text>
          </g>
        ))}

        {/* Core engine */}
        <g transform={`translate(${CORE.x} ${CORE.y})`}>
          <rect width={CORE.w} height={CORE.h} rx="12" fill="url(#rsd-core)" />
          <rect x="0.5" y="0.5" width={CORE.w - 1} height={CORE.h - 1} rx="11.5" fill="none" stroke="#0095E8" strokeOpacity="0.35" />
          {[0, 1, 2].map((r) =>
            [0, 1, 2, 3, 4, 5].map((c) => (
              <rect key={`${r}${c}`} x={22 + c * 22} y={62 + r * 14} width="14" height="6" rx="1.5" fill="#0095E8" opacity={((r + c) % 3 === 0 ? 0.9 : 0.25)} className={(r + c) % 3 === 0 ? "rsd-blink" : undefined} style={{ animationDelay: `${(r * 6 + c) * 0.12}s` }} />
            )),
          )}
          <text x="20" y="30" fontSize="15" fontWeight="700" fill="#fff" fontFamily="var(--font-heading)">
            {g.core}
          </text>
          <text x="20" y="47" fontSize="10.5" fill="#fff" fillOpacity="0.6" fontFamily="var(--font-mono)">
            {g.coreSub}
          </text>
        </g>

        {/* Rails */}
        {BRAND_INFO.supportedRails.map((rail, i) => (
          <g key={rail.id} transform={`translate(${RAIL.x} ${railYs[i]})`}>
            <rect width={RAIL.w} height={RAIL.h} rx="8" fill="#fff" stroke="#E2E8F0" />
            <rect x="0" y="10" width="3" height={RAIL.h - 20} rx="1.5" fill={rail.color} />
            <text x="16" y="20" fontSize="12.5" fontWeight="600" fill="#061526">
              {rail.name}
            </text>
            <text x="16" y="35" fontSize="9.5" fill="#64748B" fontFamily="var(--font-mono)">
              {rail.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
