// Модели маркетплейса из Sanity в форме MarketModel (так их понимают карточки и страницы сайта).
import { sanity, imageUrl, type SanityLocalized } from './sanity';
import { tk, type Lang, type Localized } from '../i18n';
import type { MarketCategory, MarketModel } from '../data/marketplace';

interface RawModel {
  slug: { current: string };
  title?: SanityLocalized;
  description?: SanityLocalized;
  image?: unknown;
  gallery?: unknown[];
  category?: string;
  tags?: string[];
  formats?: string[];
  polycount?: number;
  specs?: { label?: SanityLocalized; value?: SanityLocalized }[];
  badge?: SanityLocalized;
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

// Ключи из списка в студии; русские/английские подписи на случай старых записей
const categoryAliases: Record<string, MarketCategory> = {
  characters: 'characters',
  hardsurface: 'hardSurface',
  anatomy: 'anatomy',
  creatures: 'creatures',
  props: 'props',
  brushes: 'brushes',
  resources: 'resources',
  prints: 'prints',
  '3d prints': 'prints',
};

const toMarketModel = (raw: RawModel): MarketModel => {
  const category = categoryAliases[(raw.category ?? '').toLowerCase()] ?? 'props';
  const polys = raw.polycount ?? 0;
  const firstTag = raw.tags?.[0];
  const sub = Object.fromEntries(
    langs.map((lang) => {
      const label = tk(lang).list.filters.category[category];
      return [lang, firstTag ? `${label} // ${firstTag}` : label];
    }),
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
    fromSanity: true,
  };
};

/** Опубликованные модели, не скрытые; новые сверху */
export async function fetchSanityModels(): Promise<MarketModel[]> {
  const raw = await sanity.fetch<RawModel[]>(`*[_type == "model" && status != "hidden" && defined(slug.current)] | order(_createdAt desc) {
    slug, title, description, image, gallery, category, tags, formats, polycount, specs, badge, price, buyUrl, status
  }`);
  return raw.map(toMarketModel);
}
