import ru from './ru';
import kk from './kk';
import en from './en';
import type { Dict } from './ru';

export const langs = ['ru', 'kk', 'en'] as const;

export type Lang = (typeof langs)[number];

export const dict: Record<Lang, Dict> = { ru, kk, en };

export const langNames: Record<Lang, string> = {
  ru: 'Рус',
  kk: 'Қаз',
  en: 'Eng',
};

export const langPath = (lang: Lang): string => (lang === 'ru' ? '/' : `/${lang}/`);

export type { Dict };
