// Подключение к Sanity. Project ID не секрет; датасет публичный, токен не нужен.
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { Lang, Localized } from '../i18n';

export const sanity = createClient({
  projectId: 'remz4bc3',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false, // сборка берёт свежие данные, а не кэш CDN
});

const builder = imageUrlBuilder(sanity);

/** Адрес картинки из Sanity нужной ширины (WebP/AVIF сам). */
export const imageUrl = (source: unknown, width: number): string =>
  builder.image(source as never).width(width).auto('format').url();

export type SanityLocalized = Partial<Localized> | null | undefined;

/** Текст на нужном языке; если перевода нет, русский. */
export const loc = (value: SanityLocalized, lang: Lang): string => value?.[lang] || value?.ru || '';

export interface HomeHero {
  headline?: SanityLocalized;
  headlineAccent?: SanityLocalized;
  subheadline?: SanityLocalized;
  imageClay?: unknown;
  imageWire?: unknown;
  imageAlt?: SanityLocalized;
  tools?: string;
  verts?: number;
  faces?: number;
  quadsPercent?: number;
}

export type IntakeStatus = 'open' | 'closing_soon' | 'waitlist' | 'closed';

export interface Intake {
  status?: IntakeStatus;
  slotsTotal?: number;
  slotsTaken?: number;
}

/** Опубликованные «Главная → Первый экран» и «Набор на менторство» (null, если ещё не заполнены). */
export async function fetchHomeHero(): Promise<{ hero: HomeHero | null; intake: Intake | null }> {
  return sanity.fetch(`{
    "hero": *[_id == "homeHero"][0],
    "intake": *[_id == "intake"][0]{ status, slotsTotal, slotsTaken }
  }`);
}
