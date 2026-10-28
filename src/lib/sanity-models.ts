// Модели маркетплейса из Sanity в форме MarketModel (так их понимают карточки и страницы сайта).
import { sanity, imageUrl, type SanityLocalized } from './sanity';
import type { Lang, Localized } from '../i18n';
import type { MarketModel } from '../data/marketplace';

interface RawModel {
  slug: { current: string };
  title?: SanityLocalized;
  description?: SanityLocalized;
  image?: unknown;
  gallery?: unknown[];
  category?: { key?: string; title?: SanityLocalized } | null;
  tags?: string[];
  formats?: string[];
  polycount?: number;
  specs?: { label?: SanityLocalized; value?: SanityLocalized }[];
  badge?: SanityLocalized;
  video?: string;
  sketchfabUrl?: string;
  price?: number;
  buyUrl?: string;
  status?: 'available' | 'soon' | 'hidden';
}

const langs: Lang[] = ['ru', 'ua', 'en'];

/** Три языка с запасом на русский, если перевод не заполнен */
const toLocalized = (value?: SanityLocalized): Localized => ({
  ru: value?.ru ?? '',
  ua: value?.ua || value?.ru || '',
  en: value?.en || value?.ru || '',
});

export interface ModelCategory {
  key: string;
  title: Localized;
}

/** Категории из студии («Категории моделей») по порядку */
export async function fetchModelCategories(): Promise<ModelCategory[]> {
  const raw = await sanity.fetch<{ key?: string; title?: SanityLocalized }[]>(
    `*[_type == "modelCategory" && defined(key.current)] | order(order asc, title.en asc) { "key": key.current, title }`,
  );
  return raw.filter((c) => c.key).map((c) => ({ key: c.key as string, title: toLocalized(c.title) }));
}

/** Ссылка на страницу модели Sketchfab → адрес для iframe (id — 32 символа в конце адреса) */
const sketchfabEmbed = (url?: string): string | undefined => {
  const id = url?.match(/[0-9a-f]{32}/i)?.[0];
  return id ? `https://sketchfab.com/models/${id}/embed?ui_theme=dark&dnt=1` : undefined;
};

const toMarketModel = (raw: RawModel): MarketModel => {
  const category = raw.category?.key ?? 'other';
  const polys = raw.polycount ?? 0;
  const firstTag = raw.tags?.[0];
  const categoryTitle = toLocalized(raw.category?.title);
  const sub = Object.fromEntries(
    langs.map((lang) => [lang, firstTag ? `${categoryTitle[lang]} // ${firstTag}` : categoryTitle[lang]]),
  ) as Localized;

  return {
    slug: raw.slug.current,
    image: raw.image ? imageUrl(raw.image, 1200) : '',
    gallery: (raw.gallery ?? []).map((g) => imageUrl(g, 1600)),
    category,
    sub,
    title: toLocalized(raw.title),
    desc: toLocalized(raw.description),
    formats: raw.formats ?? [],
    extras: [],
    tags: raw.tags ?? [],
    polys,
    polyLabel: polys ? `${(polys / 1000).toFixed(1)}k` : '',
    feature: toLocalized(raw.badge),
    featureTone: 'green',
    price: raw.price ?? 0,
    likes: 0,
    status: raw.status === 'soon' ? 'soon' : 'active',
    buyUrl: raw.buyUrl ?? '',
    specs: (raw.specs ?? []).map((s) => ({ label: toLocalized(s.label), value: toLocalized(s.value) })),
    video: raw.video || undefined,
    sketchfab: sketchfabEmbed(raw.sketchfabUrl),
    fromSanity: true,
  };
};

/** Опубликованные модели, не скрытые; новые сверху */
export async function fetchSanityModels(): Promise<MarketModel[]> {
  const raw = await sanity.fetch<RawModel[]>(`*[_type == "model" && status != "hidden" && defined(slug.current)] | order(_createdAt desc) {
    slug, title, description, image, gallery, "category": category->{ "key": key.current, title }, tags, formats, polycount, specs, badge, price, buyUrl, status,
    "video": previewVideo.asset->url, sketchfabUrl
  }`);
  return raw.map(toMarketModel);
}
