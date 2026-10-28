// Временные данные главной из макета. Форма совпадает с будущими записями Sanity (поля по языкам); потом заменить запросом.
import type { Localized } from '../i18n';
import { mockImages as img } from './mockImages';
import { SITE } from '../config';

const L = (ru: string, ua: string, en: string): Localized => ({ ru, ua, en });

export type WorkCategory = 'characters' | 'hardSurface' | 'creatures' | 'studies';

export interface Work {
  slug: string;
  image: string;
  category: WorkCategory;
  tag: Localized;
  badge: string;
  badgeTone: 'green' | 'peach';
  hover: string;
  title: Localized;
  desc: Localized;
}

export interface Model {
  slug: string;
  image: string;
  badge: Localized;
  formats: string[];
  title: Localized;
  desc: Localized;
  buyUrl: string;
  /** Цена из Sanity; у заглушек не задана */
  price?: number;
  /** Видео-превью из Sanity */
  video?: string;
}

export interface Article {
  slug: string;
  image: string;
  tag: Localized;
  tone: 'green' | 'peach' | 'violet';
  date: Localized;
  title: Localized;
  desc: Localized;
}

export const works: Work[] = [
  {
    slug: 'sci-fi-mech-pilot',
    image: img.work1,
    category: 'characters',
    tag: L('Персонаж', 'Персонаж', 'Character'),
    badge: 'Poly: 34.2k',
    badgeTone: 'green',
    hover: 'FORMAT: .ZTL / .FBX',
    title: L('Sci-Fi Mech Pilot', 'Sci-Fi Mech Pilot', 'Sci-Fi Mech Pilot'),
    desc: L(
      'Полноростовой цифровой макет, подготовленный к риггингу и симуляции одежды.',
      'Повнозростовий цифровий макет, підготовлений до ріґінгу та симуляції одягу.',
      'Full-body digital production maquette prepared for rigging & cloth simulation.',
    ),
  },
  {
    slug: 'cybernetic-quadruped',
    image: img.work2,
    category: 'hardSurface',
    tag: L('Хард-сёрфейс', 'Хард-серфейс', 'Hard Surface'),
    badge: 'Poly: 52.8k',
    badgeTone: 'green',
    hover: 'RIG: PRE-BAKED',
    title: L('Cybernetic Quadruped', 'Cybernetic Quadruped', 'Cybernetic Quadruped'),
    desc: L(
      'SubD-топология и неразрушающий булев-воркфлоу в Blender.',
      'SubD-топологія та неруйнівний булів воркфлоу в Blender.',
      'SubD topology with non-destructive boolean workflow in Blender.',
    ),
  },
  {
    slug: 'mythological-beast',
    image: img.work3,
    category: 'creatures',
    tag: L('Существо', 'Істота', 'Creature'),
    badge: 'ZBrush Clay',
    badgeTone: 'peach',
    hover: 'PASS: REDWAX_HQ',
    title: L('Mythological Beast', 'Mythological Beast', 'Mythological Beast'),
    desc: L(
      'Высокочастотная вторичная и третичная детализация органической кожи через альфы.',
      'Високочастотна вторинна й третинна деталізація органічної шкіри через альфи.',
      'High-frequency secondary & tertiary organic alpha skin detailing.',
    ),
  },
  {
    slug: 'cyberpunk-helmet',
    image: img.work4,
    category: 'hardSurface',
    tag: L('Хард-сёрфейс', 'Хард-серфейс', 'Hard Surface'),
    badge: 'SubD Lv.3',
    badgeTone: 'green',
    hover: 'TEX: 4K UDIM',
    title: L('Cyberpunk Helmet', 'Cyberpunk Helmet', 'Cyberpunk Helmet'),
    desc: L(
      'Точные индустриальные фаски и настройка веса бевела.',
      'Точні індустріальні фаски та налаштування ваги бевела.',
      'Precision industrial chamfers and bevel weight control setup.',
    ),
  },
  {
    slug: 'stylized-sorceress',
    image: img.work5,
    category: 'characters',
    tag: L('Персонаж', 'Персонаж', 'Character'),
    badge: 'Game-Ready',
    badgeTone: 'green',
    hover: 'LOD0: 18.5k',
    title: L('Stylized Sorceress', 'Stylized Sorceress', 'Stylized Sorceress'),
    desc: L(
      'Стилизованная топология под реалтайм-шейдеры от мобильных до ПК.',
      'Стилізована топологія під реалтайм-шейдери від мобільних до ПК.',
      'Real-time mobile to PC shader-compatible stylized topology profile.',
    ),
  },
  {
    slug: 'anatomical-torso-study',
    image: img.work6,
    category: 'studies',
    tag: L('Анатомия', 'Анатомія', 'Anatomy'),
    badge: 'Dynamesh',
    badgeTone: 'peach',
    hover: 'STUDY #14',
    title: L('Anatomical Torso Study', 'Anatomical Torso Study', 'Anatomical Torso Study'),
    desc: L(
      'Классический экорше: костные ориентиры и напряжение мышц, референс.',
      'Класичний екорше: кісткові орієнтири та напруга мʼязів, референс.',
      'Classical écorché bone landmarks and muscle tension reference piece.',
    ),
  },
];

export const models: Model[] = [
  {
    slug: 'modular-drone-rig',
    image: img.model1,
    badge: L('24.5k полигонов', '24.5k полігонів', '24.5k Polys'),
    formats: ['.FBX', '.OBJ', '.BLEND'],
    title: L('Modular Drone Rig', 'Modular Drone Rig', 'Modular Drone Rig'),
    desc: L(
      'Квад-топология, UV-развёртка и набор PBR-текстур 4K.',
      'Квад-топологія, UV-розгортка та набір PBR-текстур 4K.',
      'Quad-topology UV mapped with 4K PBR texture set.',
    ),
    buyUrl: SITE.cults,
  },
  {
    slug: 'golem-sculpt-base',
    image: img.model2,
    badge: L('Квад-топология', 'Квад-топологія', 'Quad-Topology'),
    formats: ['.ZTL', '.FBX', '.OBJ'],
    title: L('Golem Sculpt Base', 'Golem Sculpt Base', 'Golem Sculpt Base'),
    desc: L(
      'Несколько уровней SubD для быстрого концепта.',
      'Кілька рівнів SubD для швидкого концепту.',
      'Multi-resolution SubD levels included for fast concepting.',
    ),
    buyUrl: SITE.cults,
  },
  {
    slug: 'sci-fi-weapon-kit-vol1',
    image: img.model3,
    badge: L('Текстуры 4K PBR', 'Текстури 4K PBR', '4K PBR Textures'),
    formats: ['.FBX', '.OBJ', '.BLEND'],
    title: L('Sci-Fi Weapon Kit Vol.1', 'Sci-Fi Weapon Kit Vol.1', 'Sci-Fi Weapon Kit Vol.1'),
    desc: L(
      'Сменные рейлы и оптимизированные игровые LOD.',
      'Змінні рейки та оптимізовані ігрові LOD.',
      'Interchangeable rail attachments and optimized game lods.',
    ),
    buyUrl: SITE.cults,
  },
  {
    slug: 'human-anatomy-study',
    image: img.model4,
    badge: L('Анатомия, экорше', 'Анатомія, екорше', 'Anatomy Ecorche'),
    formats: ['.ZTL', '.FBX', '.OBJ'],
    title: L('Human Anatomy Study', 'Human Anatomy Study', 'Human Anatomy Study'),
    desc: L(
      'Анатомическая точность проверена, подходит как референс для художников по персонажам.',
      'Анатомічна точність перевірена, підходить як референс для художників із персонажів.',
      'Medical accuracy reviewed for character artist reference.',
    ),
    buyUrl: SITE.cults,
  },
];

export const articles: Article[] = [
  {
    slug: 'edge-flow-retopology',
    image: img.article1,
    tag: L('Урок • 8 мин', 'Урок • 8 хв', 'Tutorial • 8 min read'),
    tone: 'green',
    date: L('ОКТЯБРЬ 2024', 'ЖОВТЕНЬ 2024', 'OCTOBER 2024'),
    title: L(
      'Эдж-флоу и ретопология для продакшн-анимации',
      'Едж-флоу та ретопологія для продакшн-анімації',
      'Mastering Edge Flow & Retopology for Production Animation',
    ),
    desc: L(
      'Как избегать полюсов в зонах деформации, расставлять их на лицевых ригах и убирать защемление треугольников при сильной мимике.',
      'Як уникати полюсів у зонах деформації, розставляти їх на лицьових ріґах і прибирати защемлення трикутників при сильній міміці.',
      'How to avoid poles in deformation areas, control pole placement on facial rigs, and dramatically reduce triangle pinching during extreme expressions.',
    ),
  },
  {
    slug: 'creature-design-breakdown',
    image: img.article2,
    tag: L('Разбор • 12 мин', 'Розбір • 12 хв', 'Breakdown • 12 min read'),
    tone: 'peach',
    date: L('СЕНТЯБРЬ 2024', 'ВЕРЕСЕНЬ 2024', 'SEPTEMBER 2024'),
    title: L(
      'Разбор существа: от ZSphere до финального рендера 4K',
      'Розбір істоти: від ZSphere до фінального рендера 4K',
      'Creature Design Breakdown: From ZSphere to Final 4K Render',
    ),
    desc: L(
      'Подробный проход: набросок силуэта, основные массы, свои альфы и шейдеры подповерхностного рассеивания в Arnold.',
      'Докладний прохід: начерк силуету, основні маси, власні альфи та шейдери підповерхневого розсіювання в Arnold.',
      'A detailed walk-through covering silhouette drafting, primary mass articulation, custom alpha sculpting, and Arnold subsurface scattering shader networks.',
    ),
  },
  {
    slug: 'high-impact-3d-portfolio',
    image: img.article3,
    tag: L('Процесс и карьера • 6 мин', 'Процес і кар’єра • 6 хв', 'Process & Career • 6 min read'),
    tone: 'violet',
    date: L('АВГУСТ 2024', 'СЕРПЕНЬ 2024', 'AUGUST 2024'),
    title: L(
      'Как собрать 3D-портфолио, которое приносит работу в студии',
      'Як зібрати 3D-портфоліо, яке приносить роботу в студіях',
      'How to Build a High-Impact 3D Portfolio That Lands Studio Work',
    ),
    desc: L(
      'На что на самом деле смотрят арт-директора: почему 3 законченных ассета с брейкдауном стабильно бьют 15 недоделанных скетчей.',
      'На що насправді дивляться арт-директори: чому 3 завершені асети з брейкдауном стабільно перемагають 15 недороблених скетчів.',
      'What art directors actually scrutinize: why 3 finished, production-ready assets with breakdown turntables consistently beat 15 unfinished sketches.',
    ),
  },
];

export const toolkit = [
  { name: 'ZBrush', dot: 'bg-tertiary-container' },
  { name: 'Blender', dot: 'bg-primary-container' },
  { name: 'Autodesk Maya', dot: 'bg-outline' },
  { name: 'Substance 3D Painter', dot: 'bg-tertiary' },
  { name: 'Unreal Engine 5', dot: 'bg-secondary-container' },
];
