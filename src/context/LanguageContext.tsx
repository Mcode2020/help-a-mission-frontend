import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SUPPORTED_LANGUAGES, type Language, DEFAULT_LANGUAGE, isSupportedLanguage } from '../constants/language';
import enTranslations from '../locales/en.json';
import hiTranslations from '../locales/hi.json';

const translationsMap: Record<Language, Record<string, unknown>> = {
  en: enTranslations as Record<string, unknown>,
  hi: hiTranslations as Record<string, unknown>,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract language from current pathname (e.g. /en/about or /hi/our-work)
  const pathParts = location.pathname.split('/').filter(Boolean);
  const pathLang = pathParts[0];

  const derivedLanguage: Language = isSupportedLanguage(pathLang) ? pathLang : DEFAULT_LANGUAGE;
  const [language, setLanguageState] = useState<Language>(derivedLanguage);

  // Sync state during render if pathLang changes
  if (isSupportedLanguage(pathLang) && pathLang !== language) {
    setLanguageState(pathLang);
  }

  // Update HTML lang attribute and hreflang meta tags on language change
  useEffect(() => {
    document.documentElement.lang = language;

    // Manage canonical & hreflang link tags for SEO
    const origin = window.location.origin;
    const currentPathWithoutLang = '/' + pathParts.slice(isSupportedLanguage(pathLang) ? 1 : 0).join('/');

    SUPPORTED_LANGUAGES.forEach((lang) => {
      let linkEl = document.querySelector(`link[hreflang="${lang}"]`) as HTMLLinkElement | null;
      if (!linkEl) {
        linkEl = document.createElement('link');
        linkEl.rel = 'alternate';
        linkEl.hreflang = lang;
        document.head.appendChild(linkEl);
      }
      linkEl.href = `${origin}/${lang}${currentPathWithoutLang === '/' ? '' : currentPathWithoutLang}`;
    });
  }, [language, location.pathname, pathLang, pathParts]);

  const setLanguage = (newLang: Language) => {
    if (!isSupportedLanguage(newLang)) return;
    setLanguageState(newLang);

    // Preserve sub-path when changing language (e.g., /en/about -> /hi/about)
    const subPath = '/' + pathParts.slice(isSupportedLanguage(pathLang) ? 1 : 0).join('/');
    const newPath = `/${newLang}${subPath === '/' ? '' : subPath}`;
    if (location.pathname !== newPath) {
      navigate(newPath);
    }
  };

  const t = useMemo(() => {
    return (path: string, fallback?: string): string => {
      const keys = path.split('.');
      let current: unknown = translationsMap[language] || translationsMap[DEFAULT_LANGUAGE];
      for (const key of keys) {
        if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
          current = (current as Record<string, unknown>)[key];
        } else {
          current = undefined;
          break;
        }
      }
      if (typeof current === 'string') return current;

      // Try default fallback language 'en' if missing in Hindi
      if (language !== DEFAULT_LANGUAGE) {
        let defaultCurrent: unknown = translationsMap[DEFAULT_LANGUAGE];
        for (const key of keys) {
          if (defaultCurrent && typeof defaultCurrent === 'object' && key in (defaultCurrent as Record<string, unknown>)) {
            defaultCurrent = (defaultCurrent as Record<string, unknown>)[key];
          } else {
            defaultCurrent = undefined;
            break;
          }
        }
        if (typeof defaultCurrent === 'string') return defaultCurrent;
      }

      return fallback || path;
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
