/**
 * LipaPesa custom icon set. Replaces lucide-react on marketing surfaces.
 * Geometric 24px grid, 1.75 stroke, square caps. See ADR-011.
 */
import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 20): React.SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "square",
  strokeLinejoin: "miter",
  "aria-hidden": true,
});

const make = (paths: React.ReactNode) =>
  function Icon({ size, ...rest }: IconProps) {
    return <svg {...base(size)} {...rest}>{paths}</svg>;
  };

export const IconGrid = make(<><rect x="4" y="4" width="6" height="6" /><rect x="14" y="4" width="6" height="6" /><rect x="4" y="14" width="6" height="6" /><rect x="14" y="14" width="6" height="6" /></>);
export const IconClose = make(<path d="M6 6l12 12M18 6L6 18" />);
export const IconArrow = make(<path d="M5 12h13M13 6l6 6-6 6" />);
export const IconGlobe = make(<><circle cx="12" cy="12" r="8" /><path d="M4 12h16M12 4c2.5 2.5 2.5 13.5 0 16M12 4c-2.5 2.5-2.5 13.5 0 16" /></>);
export const IconCheck = make(<path d="M5 12.5l4.5 4.5L19 7.5" />);
export const IconBox = make(<><path d="M4 8l8-4 8 4v8l-8 4-8-4z" /><path d="M4 8l8 4 8-4M12 12v8" /></>);
export const IconStore = make(<><path d="M4 9l1.5-5h13L20 9" /><path d="M4 9h16v2a3 3 0 01-6 0 3 3 0 01-4 0 3 3 0 01-6 0z" /><path d="M5 13v7h14v-7" /></>);
export const IconQr = make(<><rect x="4" y="4" width="6" height="6" /><rect x="14" y="4" width="6" height="6" /><rect x="4" y="14" width="6" height="6" /><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2" /></>);
export const IconSend = make(<path d="M4 12l16-8-6 16-3-7z" />);
export const IconWithdraw = make(<><path d="M12 4v11M7 10l5 5 5-5" /><path d="M5 20h14" /></>);
export const IconReceipt = make(<><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6" /></>);
export const IconPhone = make(<><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 17h2" /></>);
export const IconTicket = make(<><path d="M3 8a2 2 0 002-2h14a2 2 0 002 2v2a2 2 0 000 4v2a2 2 0 00-2 2H5a2 2 0 00-2-2v-2a2 2 0 000-4z" /><path d="M14 6v12" strokeDasharray="2 2" /></>);
export const IconSignal = make(<><path d="M2.5 9a14 14 0 0119 0" /><path d="M5.5 12.5a9.5 9.5 0 0113 0" /><path d="M8.75 16a5 5 0 016.5 0" /><circle cx="12" cy="19.25" r="1.1" fill="currentColor" stroke="none" /></>);
export const IconWifi = IconSignal;
export const IconShield = make(<><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></>);
export const IconLock = make(<><rect x="5" y="10" width="14" height="10" /><path d="M8 10V7a4 4 0 018 0v3" /></>);
export const IconCode = make(<path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />);
export const IconPin = make(<><path d="M12 21s-6-6-6-11a6 6 0 0112 0c0 5-6 11-6 11z" /><circle cx="12" cy="10" r="2" /></>);
export const IconMail = make(<><rect x="3" y="5" width="18" height="14" /><path d="M3 6l9 7 9-7" /></>);
export const IconBolt = make(<path d="M13 3L5 14h6l-1 7 8-11h-6z" />);

export const SERVICE_ICONS: Record<string, React.FC<IconProps>> = {
  Package: IconBox,
  Store: IconStore,
  QrCode: IconQr,
  Send: IconSend,
  ArrowDownToLine: IconWithdraw,
  Receipt: IconReceipt,
  Smartphone: IconPhone,
  Ticket: IconTicket,
  Wifi: IconWifi,
};
