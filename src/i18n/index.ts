import { en, type Dict } from './en';
import { ru } from './ru';
import { ua } from './ua';

export const locales = ['ru', 'ua', 'en'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'ru';

/** Значение атрибута `lang` в HTML (для UA код языка — uk). */
export const htmlLang: Record<Lang, string> = { ru: 'ru', ua: 'uk', en: 'en' };

const dictionaries: Record<Lang, Dict> = { ru, ua, en };

/** Текст, заданный сразу на трёх языках (так же будут выглядеть поля в Sanity). */
export type Localized = Record<Lang, string>;

export const t = (lang: Lang): Dict => dictionaries[lang];
export const pick = (value: Localized, lang: Lang): string => value[lang];

/** Адрес внутри сайта с языковым префиксом: path('ua', 'portfolio') → /ua/portfolio */
export const path = (lang: Lang, page = ''): string => `/${lang}/${page}`.replace(/\/+$/, '') || `/${lang}`;
