import { en, type Dict } from './en';
import { ru } from './ru';
import { ua } from './ua';
import { mentoringEn, mentoringRu, mentoringUa, type MentoringDict } from './mentoring';

export const locales = ['ru', 'ua', 'en'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'ru';

/** Значение атрибута `lang` в HTML (для UA код языка — uk). */
export const htmlLang: Record<Lang, string> = { ru: 'ru', ua: 'uk', en: 'en' };

const dictionaries: Record<Lang, Dict> = { ru, ua, en };

/** Текст, заданный сразу на трёх языках (так же будут выглядеть поля в Sanity). */
export type Localized = Record<Lang, string>;

import { marketEn, marketRu, marketUa, type MarketDict } from './marketplace';

const marketDictionaries: Record<Lang, MarketDict> = { ru: marketRu, ua: marketUa, en: marketEn };
/** Тексты страниц маркетплейса */
export const tk = (lang: Lang): MarketDict => marketDictionaries[lang];

import { blogEn, blogRu, blogUa, type BlogDict } from './blog';

const blogDictionaries: Record<Lang, BlogDict> = { ru: blogRu, ua: blogUa, en: blogEn };
/** Тексты страниц блога */
export const tb = (lang: Lang): BlogDict => blogDictionaries[lang];

const mentoringDictionaries: Record<Lang, MentoringDict> = { ru: mentoringRu, ua: mentoringUa, en: mentoringEn };

export const t = (lang: Lang): Dict => dictionaries[lang];
/** Тексты страницы менторства */
export const tm = (lang: Lang): MentoringDict => mentoringDictionaries[lang];
export const pick = (value: Localized, lang: Lang): string => value[lang];

/** Адрес внутри сайта с языковым префиксом: path('ua', 'portfolio') → /ua/portfolio */
export const path = (lang: Lang, page = ''): string => `/${lang}/${page}`.replace(/\/+$/, '') || `/${lang}`;
