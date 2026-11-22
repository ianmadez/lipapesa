"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { dictionaries, Dictionary, Language } from "./dictionaries";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  dict: Dictionary;
  t: (keyPath: string) => string;
}

const STORAGE_KEY = "lipapesa_lang";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (savedLang === "en" || savedLang === "sw") {
        setLanguageState(savedLang);
      }
    } catch {
      // Ignore localStorage read errors in restricted contexts
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      // Dispatch storage event so all tabs or subcomponents update
      window.dispatchEvent(new Event("lipapesa_lang_change"));
    } catch {
      // Ignore localStorage write errors
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === "en" ? "sw" : "en";
    setLanguage(nextLang);
  };

  const dict = dictionaries[language];

  // Helper function to resolve dot-notation paths like "nav.solutions" or "common.confirm"
  const t = (keyPath: string): string => {
    const segments = keyPath.split(".");
    let current: unknown = dict;

    for (const segment of segments) {
      if (current && typeof current === "object" && segment in current) {
        current = (current as Record<string, unknown>)[segment];
      } else {
        // Fallback to English dictionary if key is missing in active language
        let fallback: unknown = dictionaries.en;
        for (const fbSegment of segments) {
          if (fallback && typeof fallback === "object" && fbSegment in fallback) {
            fallback = (fallback as Record<string, unknown>)[fbSegment];
          } else {
            return keyPath;
          }
        }
        return typeof fallback === "string" ? fallback : keyPath;
      }
    }

    return typeof current === "string" ? current : keyPath;
  };

  return (
    <LanguageContext.Provider
      value={{
        language: mounted ? language : "en",
        setLanguage,
        toggleLanguage,
        dict,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
