"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { translations, type Language } from "@/data/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof translations)[Language];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const languageMap: { [key in Language]: string } = {
  fr: "fr",
  en: "en",
  es: "es",
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr");
  const [mounted, setMounted] = useState(false);

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "forges-language"
    ) as Language | null;
    if (
      savedLanguage &&
      (savedLanguage === "fr" ||
        savedLanguage === "en" ||
        savedLanguage === "es")
    ) {
      setLanguage(savedLanguage);
      updateHtmlLang(savedLanguage);
    }
    setMounted(true);
  }, []);

  const updateHtmlLang = (lang: Language) => {
    const htmlLang = languageMap[lang];
    if (typeof document !== "undefined") {
      document.documentElement.lang = htmlLang;
    }
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("forges-language", lang);
    updateHtmlLang(lang);
  };

  // Avoid hydration issues
  if (!mounted) {
    return (
      <LanguageContext.Provider
        value={{
          language,
          setLanguage: handleSetLanguage,
          t: translations[language],
        }}
      >
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
