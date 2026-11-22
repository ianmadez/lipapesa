"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { PhoneSimulator } from "./PhoneSimulator";
import { IconClose } from "@/components/ui/icons";

const mq = "(max-width: 639px)";
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(mq);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
export const useIsMobile = () =>
  useSyncExternalStore(subscribe, () => window.matchMedia(mq).matches, () => false);

/**
 * Focus mode for the simulator.
 * Desktop: phone centred over a blurred page, × button beside it.
 * Mobile: the simulator takes the whole screen (no fake phone frame inside a real phone).
 */
export const DemoModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { dict } = useLanguage();
  const isMobile = useIsMobile();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const close = (
    <button
      ref={closeRef}
      type="button"
      onClick={onClose}
      aria-label={dict.landing.closeDemo}
      className={`grid place-items-center rounded-full cursor-pointer transition-colors ${
        isMobile
          ? "absolute top-3 right-3 z-50 h-10 w-10 bg-white/15 text-white hover:bg-white/25"
          : "h-11 w-11 bg-white text-brand-navy shadow-lg hover:bg-brand-cyan hover:text-white"
      }`}
    >
      <IconClose size={18} />
    </button>
  );

  return (
    <div role="dialog" aria-modal="true" aria-label={dict.landing.ctaDemo} className="fixed inset-0 z-[60]">
      {isMobile ? (
        <div className="fade-in absolute inset-0 bg-bg-canvas">
          {close}
          <PhoneSimulator frameless />
        </div>
      ) : (
        <>
          <div className="fade-in absolute inset-0 bg-brand-navy/45 backdrop-blur-lg" onClick={onClose} aria-hidden="true" />
          <div className="relative h-full grid place-items-center p-6 pointer-events-none">
            <div className="pop-in relative pointer-events-auto flex items-start gap-4">
              <PhoneSimulator />
              {close}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
