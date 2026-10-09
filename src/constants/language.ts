export const SUPPORTED_LANGUAGES = ['en', 'hi'] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'en';

export const isSupportedLanguage = (lang: string): lang is Language => {
  return SUPPORTED_LANGUAGES.includes(lang as Language);
};
