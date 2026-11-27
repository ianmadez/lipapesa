"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { BRAND_INFO } from "@/config/brand";

/**
 * Payers -> LipaPesa Core -> Payment Rails.
 * Two layouts: horizontal (sm and up) and vertical (phones), so nothing is cut off or scrolled.
 * Pure SVG. Dots travel along each route with <animateMotion>; `motion-reduce` hides them.
 * Gradients use userSpaceOnUse: a bounding-box gradient on a perfectly straight path has a zero-size box and renders nothing.
 */

type Box = { x: number; y: number; w: number; h: number };
type Layout = {
  id: string;
  W: number;
  H: number;
  payers: Box[];
  core: Box;
  rails: Box[];
  inPaths: string[];
  outPaths: string[];
  compact: boolean;
};

const curveH = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
};
const curveV = (x1: number, y1: number, x2: number, y2: number) => {
  const my = (y1 + y2) / 2;
  return `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`;
};

/** Horizontal: payers left, core centre, rails right. */
const wide: Layout = (() => {
  const payers = [70, 184, 298].map((y) => ({ x: 24, y, w: 150, h: 52 }));
  const core = { x: 300, y: 150, w: 170, h: 120 };
  const rails = [24, 106, 188, 270, 352].map((y) => ({ x: 590, y, w: 150, h: 46 }));
  const cy = core.y + core.h / 2;
  return {
    id: "w",
    W: 760,
    H: 420,
    payers,
    core,
    rails,
    inPaths: payers.map((p) => curveH(p.x + p.w, p.y + p.h / 2, core.x, cy)),
    outPaths: rails.map((r) => curveH(core.x + core.w, cy, r.x, r.y + r.h / 2)),
    compact: false,
  };
})();

/** Vertical: payers row on top, core in the middle, rails stacked below on a trunk line. */
const tall: Layout = (() => {
  const payers = [6, 126, 246].map((x) => ({ x, y: 34, w: 108, h: 44 }));
  const core = { x: 95, y: 150, w: 170, h: 100 };
  const rails = [0, 1, 2, 3, 4].map((i) => ({ x: 70, y: 310 + i * 52, w: 250, h: 42 }));
  const cx = core.x + core.w / 2;
  const trunkX = 40;
  return {
    id: "t",
    W: 360,
    H: 580,
    payers,
    core,
    rails,
    inPaths: payers.map((p) => curveV(p.x + p.w / 2, p.y + p.h, cx, core.y)),
    // Core bottom -> down -> left to the trunk -> down the trunk -> right into each rail.
    outPaths: rails.map((r) => {
      const ry = r.y + r.h / 2;
      return `M${cx},${core.y + core.h} V280 H${trunkX + 8} Q${trunkX},280 ${trunkX},288 V${ry - 8} Q${trunkX},${ry} ${trunkX + 8},${ry} H${r.x}`;
    }),
    compact: true,
  };
})();

const Diagram: React.FC<{ L: Layout; className: string }> = ({ L, className }) => {
  const g = useLanguage().dict.pages.graphics;
  const labels = [g.customers, g.students, g.shoppers];
  const { core, compact } = L;
  const gid = (n: string) => `rsd-${L.id}-${n}`;

  return (
    <svg
      viewBox={`0 0 ${L.W} ${L.H}`}
      role="img"
      aria-label={`${g.payers} → ${g.core} → ${g.rails}: ${BRAND_INFO.supportedRails.map((r) => r.name).join(", ")}`}
      className={`w-full h-auto font-sans ${className}`}
    >
      <defs>
        <pattern id={gid("grid")} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#E2E8F0" strokeWidth="0.75" />
        </pattern>
        <linearGradient id={gid("core")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0B2440" />
          <stop offset="1" stopColor="#061526" />
        </linearGradient>
        <linearGradient
          id={gid("line")}
          gradientUnits="userSpaceOnUse"
          x1={0}
          y1={0}
          x2={compact ? 0 : L.W}
          y2={compact ? L.H : 0}
        >
          <stop offset="0" stopColor="#0084D6" stopOpacity="0.45" />
          <stop offset="1" stopColor="#0095E8" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      <rect width={L.W} height={L.H} fill={`url(#${gid("grid")})`} rx="12" />

      {/* Column / row labels */}
      {(compact
        ? [
            [6, 20, g.payers],
            [6, 140, g.core],
            [6, 300, g.rails],
          ]
        : [
            [L.payers[0].x, 14, g.payers],
            [core.x, 14, g.core],
            [L.rails[0].x, 14, g.rails],
          ]
      ).map(([x, y, label]) => (
        <text key={String(label)} x={Number(x)} y={Number(y)} fill="#64748B" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.08em">
          {String(label).toUpperCase()}
        </text>
      ))}

      {/* Routes */}
      {[...L.inPaths, ...L.outPaths].map((d, i) => (
        <path key={i} d={d} fill="none" stroke={`url(#${gid("line")})`} strokeWidth="1.5" strokeDasharray="4 5" className="rsd-flow" />
      ))}

      {/* Travelling packets */}
      <g className="motion-reduce:hidden">
        {L.inPaths.map((d, i) => (
          <circle key={`i${i}`} r="3.5" fill="#0095E8">
            <animateMotion dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={d} />
          </circle>
        ))}
        {L.outPaths.map((d, i) => (
          <circle key={`o${i}`} r="3.5" fill="#0084D6">
            <animateMotion dur={compact ? "3s" : "2.4s"} begin={`${1.2 + i * 0.35}s`} repeatCount="indefinite" path={d} />
          </circle>
        ))}
      </g>

      {/* Payers */}
      {L.payers.map((p, i) => {
        const ix = compact ? 18 : 24;
        const cy = p.h / 2;
        return (
          <g key={labels[i]} transform={`translate(${p.x} ${p.y})`}>
            <rect width={p.w} height={p.h} rx="8" fill="#fff" stroke="#E2E8F0" />
            <circle cx={ix} cy={cy} r={compact ? 9 : 11} fill="#E3F3FD" />
            <circle cx={ix} cy={cy - 2.5} r="2.6" fill="none" stroke="#0084D6" strokeWidth="1.5" />
            <path d={`M${ix - 5} ${cy + 5.5}a5 4.5 0 0 1 10 0`} fill="none" stroke="#0084D6" strokeWidth="1.5" strokeLinecap="round" />
            <text x={compact ? 33 : 44} y={cy + 4.5} fontSize={compact ? 11.5 : 13} fontWeight="600" fill="#061526">
              {labels[i]}
            </text>
          </g>
        );
      })}

      {/* Core engine */}
      <g transform={`translate(${core.x} ${core.y})`}>
        <rect width={core.w} height={core.h} rx="12" fill={`url(#${gid("core")})`} />
        <rect x="0.5" y="0.5" width={core.w - 1} height={core.h - 1} rx="11.5" fill="none" stroke="#0095E8" strokeOpacity="0.35" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3, 4, 5].map((c) => (
            <rect
              key={`${r}${c}`}
              x={22 + c * 22}
              y={(compact ? 54 : 62) + r * 12}
              width="14"
              height="6"
              rx="1.5"
              fill="#0095E8"
              opacity={(r + c) % 3 === 0 ? 0.9 : 0.25}
              className={(r + c) % 3 === 0 ? "rsd-blink" : undefined}
              style={{ animationDelay: `${(r * 6 + c) * 0.12}s` }}
            />
          )),
        )}
        <text x="20" y="28" fontSize="15" fontWeight="700" fill="#fff" fontFamily="var(--font-heading)">
          {g.core}
        </text>
        <text x="20" y="44" fontSize="10.5" fill="#fff" fillOpacity="0.6" fontFamily="var(--font-mono)">
          {g.coreSub}
        </text>
      </g>

      {/* Rails */}
      {BRAND_INFO.supportedRails.map((rail, i) => {
        const r = L.rails[i];
        return (
          <g key={rail.id} transform={`translate(${r.x} ${r.y})`}>
            <rect width={r.w} height={r.h} rx="8" fill="#fff" stroke="#E2E8F0" />
            <rect x="0" y="10" width="3" height={r.h - 20} rx="1.5" fill={rail.color} />
            {compact ? (
              <>
                <text x="16" y={r.h / 2 + 4.5} fontSize="13" fontWeight="600" fill="#061526">
                  {rail.name}
                </text>
                <text x={r.w - 12} y={r.h / 2 + 4} textAnchor="end" fontSize="9.5" fill="#64748B" fontFamily="var(--font-mono)">
                  {rail.id}
                </text>
              </>
            ) : (
              <>
                <text x="16" y="20" fontSize="12.5" fontWeight="600" fill="#061526">
                  {rail.name}
                </text>
                <text x="16" y="35" fontSize="9.5" fill="#64748B" fontFamily="var(--font-mono)">
                  {rail.id}
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export const RailSwitchingDiagram: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={className}>
    <Diagram L={wide} className="hidden sm:block" />
    <Diagram L={tall} className="sm:hidden max-w-[420px] mx-auto" />
  </div>
);
