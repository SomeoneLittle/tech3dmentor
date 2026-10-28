// Временные данные маркетплейса из макета. Форма совпадает с будущими записями Sanity (модель: название, описание, категория, теги,
// формат файлов, полигонаж, превью, цена, ссылка на покупку, статус). Цены, лайки и счётчики — плейсхолдеры из макета.
// Порядок в массиве = порядок «Новые». Блок `detail` необязателен: без него карточка модели покажет упрощённый вид.
import type { Localized } from '../i18n';
import { marketImages as img } from './mockMarketplaceImages';
import { fetchSanityModels } from '../lib/sanity-models';

const L = (ru: string, ua: string, en: string): Localized => ({ ru, ua, en });
const same = (v: string): Localized => ({ ru: v, ua: v, en: v });

export type MarketCategory = 'characters' | 'hardSurface' | 'anatomy' | 'creatures' | 'props' | 'brushes' | 'resources' | 'prints';
export type PolyTier = 'low' | 'mid' | 'high';
export type ModelStatus = 'active' | 'soon' | 'sold';

const staticTags = ['QuadsOnly', 'RigReady', 'UDIM', 'SubD', 'PBR_Textures', 'GameReady'];
const staticFormats = ['.FBX', '.BLEND', '.ZTL', '.OBJ', '.GLB'];

export interface ModelDetail {
  accent: string;
  topologyCheck: string;
  tris: string;
  verts: string;
  udims: string;
  build: string;
  checksum: string;
  version: string;
  views: { image: string; label: string; sub: string; alt: Localized }[];
  perks: Localized[];
  brief: {
    heading: Localized;
    paragraphs: Localized[];
    modules: { icon: string; tone: 'primary' | 'peach'; title: Localized; text: Localized }[];
  };
  specs: {
    formats: string;
    polycount: string;
    vertices: string;
    textures: Localized;
    rig: Localized;
    uv: Localized;
    software: string;
    certification: Localized;
  };
}

export interface MarketModel {
  slug: string;
  image: string;
  category: MarketCategory;
  /** Вторая часть «КАТЕГОРИЯ // ПОДТИП» */
  sub: Localized;
  title: Localized;
  desc: Localized;
  formats: string[];
  /** Дополнительные чипы под названием (текстуры, риг и т.п.) */
  extras: string[];
  tags: string[];
  /** Для фильтра и сортировки по полигонажу */
  polys: number;
  polyLabel: string;
  /** Подсвечивать полигонаж оранжевым (тяжёлые SubD-модели) */
  polyHeavy?: boolean;
  /** Плашка внизу превью (из Sanity приходит на трёх языках) */
  feature: string | Localized;
  featureTone: 'green' | 'primary';
  /** Плашка слева сверху: TURNTABLE READY и т.п. (если не новинка) */
  badge?: string;
  isNew?: boolean;
  price: number;
  likes: number;
  status: ModelStatus;
  buyUrl: string;
  detail?: ModelDetail;
  /** Дополнительные кадры (из Sanity) */
  gallery?: string[];
  /** Свои пункты блока характеристик (из Sanity): название + значение */
  specs?: { label: Localized; value: Localized }[];
  fromSanity?: boolean;
}

const buy = 'https://3dcults.com';

export const polyTier = (polys: number): PolyTier => (polys < 15000 ? 'low' : polys <= 60000 ? 'mid' : 'high');

const placeholderModels: MarketModel[] = [
  {
    slug: 'modular-drone-rig-v4',
    image: img.drone,
    category: 'props',
    sub: L('Транспорт // Хард-сёрфейс', 'Транспорт // Хард-серфейс', 'Vehicles // Hard-Surface'),
    title: same('Modular Drone Rig v4'),
    desc: L(
      'Модульный дрон с четырьмя двигателями, чистой квад-топологией и набором PBR-текстур 4K.',
      'Модульний дрон із чотирма двигунами, чистою квад-топологією та набором PBR-текстур 4K.',
      'Modular quad-thruster drone with clean quad topology and a 4K PBR texture set.',
    ),
    formats: ['.FBX', '.BLEND'],
    extras: ['4K UDIM'],
    tags: ['QuadsOnly', 'RigReady', 'UDIM', 'PBR_Textures', 'GameReady'],
    polys: 24500,
    polyLabel: '24.5k',
    feature: '100% QUADS • RIGGED',
    featureTone: 'green',
    badge: 'TURNTABLE READY',
    price: 38,
    likes: 212,
    status: 'active',
    buyUrl: buy,
  },
  {
    slug: 'golem-sculpt-base',
    image: img.golem,
    category: 'creatures',
    sub: L('Существа // Базовый меш', 'Істоти // Базовий меш', 'Creatures // Basemesh'),
    title: same('Golem Sculpt Base'),
    desc: L(
      'Каменный голем для скульптинга: несколько уровней SubD, готов к ZTool и Dynamesh.',
      'Кам’яний голем для скульптингу: кілька рівнів SubD, готовий до ZTool і Dynamesh.',
      'Stone golem sculpting base with multi-resolution SubD levels, ready for ZTool and Dynamesh.',
    ),
    formats: ['.ZTL', '.OBJ'],
    extras: ['SUBD 5'],
    tags: ['QuadsOnly', 'SubD'],
    polys: 85000,
    polyLabel: '85.0k',
    feature: 'ZTOOL + DYNAMESH',
    featureTone: 'primary',
    isNew: true,
    price: 45,
    likes: 164,
    status: 'active',
    buyUrl: buy,
  },
  {
    slug: 'sci-fi-weapon-kit-vol-1',
    image: img.weaponKit,
    category: 'hardSurface',
    sub: L('Хард-сёрфейс // Набор', 'Хард-серфейс // Набір', 'Hard Surface // Kit'),
    title: same('Sci-Fi Weapon Kit Vol. 1'),
    desc: L(
      'Сменные модули оружия, оптимизированные игровые LOD и PBR-текстуры.',
      'Змінні модулі зброї, оптимізовані ігрові LOD та PBR-текстури.',
      'Interchangeable weapon modules with optimized game LODs and PBR textures.',
    ),
    formats: ['.FBX', '.GLB'],
    extras: ['UNREAL/UNITY'],
    tags: ['QuadsOnly', 'PBR_Textures', 'GameReady'],
    polys: 18200,
    polyLabel: '18.2k',
    feature: 'GAME READY • PBR',
    featureTone: 'green',
    price: 29,
    likes: 187,
    status: 'active',
    buyUrl: buy,
  },
  {
    slug: 'human-anatomy-ecorche',
    image: img.ecorche,
    category: 'anatomy',
    sub: L('Анатомия // Этюд', 'Анатомія // Етюд', 'Anatomy // Study'),
    title: same('Human Anatomy Ecorche'),
    desc: L(
      'Экорше с мышцами, сухожилиями и костными ориентирами. Референс для художников по персонажам.',
      'Екорше з мʼязами, сухожилками та кістковими орієнтирами. Референс для художників із персонажів.',
      'Écorché with muscles, tendons and bone landmarks. A reference piece for character artists.',
    ),
    formats: ['.ZTL', '.BLEND'],
    extras: ['ANATOMY LABELS'],
    tags: ['SubD'],
    polys: 1200000,
    polyLabel: '1.2M SubD',
    polyHeavy: true,
    feature: 'SUB-D LVL 6 RAW',
    featureTone: 'green',
    badge: 'ACADEMIC SPEC',
    price: 65,
    likes: 301,
    status: 'active',
    buyUrl: buy,
  },
  {
    slug: 'cybernetic-quadruped-razorback',
    image: img.razorback,
    category: 'hardSurface',
    sub: L('Мех // С ригом', 'Мех // З ріґом', 'Mech // Rigged'),
    title: same('Cybernetic Quadruped Razorback'),
    desc: L(
      'Модульный четвероногий боевой робот. Хард-сёрфейс топология под Unreal Engine 5 Nanite, SubD-рендер и кинематические игровые риги.',
      'Модульний чотириногий бойовий робот. Хард-серфейс топологія під Unreal Engine 5 Nanite, SubD-рендер та кінематичні ігрові ріґи.',
      'Next-gen modular robotic assault quadruped. Hard-surface topology tuned for Unreal Engine 5 Nanite, sub-d rendering workflows, and kinematic game rigs.',
    ),
    formats: ['.FBX', '.BLEND'],
    extras: ['CONTROL RIG'],
    tags: ['QuadsOnly', 'RigReady', 'UDIM', 'SubD', 'PBR_Textures', 'GameReady', 'BlenderCycles', 'SciFiMech', 'IK_Controls', 'CleanBake'],
    polys: 52800,
    polyLabel: '52.8k',
    feature: 'RIGGED + IK CONTROLS',
    featureTone: 'green',
    isNew: true,
    price: 55,
    likes: 428,
    status: 'active',
    buyUrl: buy,
    detail: {
      accent: 'Quadruped',
      topologyCheck: '100% QUADS // CLEAN_EDGEFLOW',
      tris: '104,240',
      verts: '54,120',
      udims: '4',
      build: 'BUILD 1024-B',
      checksum: '0x9F41C2B',
      version: 'V1.2 RIG PATCH',
      views: [
        { image: img.razorbackMain, label: '[3D VIEW]', sub: 'PBR', alt: same('Cybernetic Quadruped Razorback, studio render') },
        { image: img.razorbackClay, label: 'CLAY PASS', sub: 'MATCAP', alt: same('Cybernetic Quadruped Razorback, clay matcap') },
        { image: img.razorbackWire, label: 'WIREFRAME', sub: 'TOPOLOGY', alt: same('Cybernetic Quadruped Razorback, wireframe topology') },
        { image: img.razorbackUv, label: 'UV UDIMS', sub: '4K', alt: same('Cybernetic Quadruped Razorback, UDIM layout') },
        { image: img.razorbackRig, label: 'RIG POSE', sub: 'IK/FK', alt: same('Cybernetic Quadruped Razorback, rig pose') },
      ],
      perks: [
        L('ZIP-архив сразу после покупки (.FBX, .BLEND, .ZTL, .OBJ, .GLB)', 'ZIP-архів одразу після покупки (.FBX, .BLEND, .ZTL, .OBJ, .GLB)', 'Instant .ZIP archive (.FBX, .BLEND, .ZTL, .OBJ, .GLB)'),
        L('Чистая квад-топология (0 N-gon, непрерывный поток рёбер)', 'Чиста квад-топологія (0 N-gon, безперервний потік ребер)', 'Clean all-quad topology (0 N-gons, continuous flow)'),
        L('PBR-текстуры 4K UDIM (Albedo, Normal, Rough, Metal, AO)', 'PBR-текстури 4K UDIM (Albedo, Normal, Rough, Metal, AO)', '4K UDIM PBR textures (Albedo, Normal, Rough, Metal, AO)'),
        L('IK/FK-скелет четвероногого со встроенными контролами Blender', 'IK/FK-скелет чотириногого з вбудованими контролами Blender', 'IK/FK quadruped skeleton with Blender controls built in'),
      ],
      brief: {
        heading: L('Сделан для реалтайма и продвинутого ригинга', 'Зроблений для реалтайму та просунутого ріґінгу', 'Architected for real-time renders & advanced rigging'),
        paragraphs: [
          L(
            'Cybernetic Quadruped Razorback — боевой мех, спроектированный, отскульптенный и оптимизированный по топологии для киноанимации и реалтайма в Unreal Engine 5.2+ и Unity HDRP. Каждая панель, поршень и гидравлическое соединение сделаны с продуманными допусками, чтобы не было клиппинга при агрессивной анимации шага.',
            'Cybernetic Quadruped Razorback — бойовий мех, спроєктований, відскульптений та оптимізований за топологією для кіноанімації та реалтайму в Unreal Engine 5.2+ і Unity HDRP. Кожна панель, поршень і гідравлічне зʼєднання зроблені з продуманими допусками, щоб не було кліпінгу при агресивній анімації кроку.',
            'The Cybernetic Quadruped Razorback is an industrial combat mech conceptualized, sculpted, and topology-optimized for film cinematics and real-time execution in modern engines like Unreal Engine 5.2+ and Unity HDRP. Each panel, piston, and hydraulic connection was crafted with deliberate mechanical tolerances to eliminate clipping artifacts during aggressive quadruped gait animation cycles.',
          ),
          L(
            'Все меши сгруппированы по единой схеме имён (GEO_Chassis_Main, GEO_Limb_FL_Hydraulic). Пивоты стоят в суставах, поэтому модель сразу можно проверять в анимации прямо в DCC или заменять детали по модулям.',
            'Усі меші згруповані за єдиною схемою імен (GEO_Chassis_Main, GEO_Limb_FL_Hydraulic). Півоти стоять у суглобах, тому модель одразу можна перевіряти в анімації просто в DCC або замінювати деталі по модулях.',
            'All meshes are grouped logically with standardized naming conventions (GEO_Chassis_Main, GEO_Limb_FL_Hydraulic). Pivot points are centered at anatomical joint hinges, enabling immediate animation testing directly inside standard DCC tools or modular mechanical replacement.',
          ),
        ],
        modules: [
          {
            icon: 'precision_manufacturing',
            tone: 'primary',
            title: L('Риг и инверсная кинематика', 'Ріґ та інверсна кінематика', 'Rigging & Inverse Kinematics'),
            text: L(
              'Кастомный риг в Blender с переключаемым FK/IK на лапах, гибкостью позвоночника и реактивным демпфированием гидравлики. Скин на 64 деформирующих кости с аккуратными весами у суставов.',
              'Кастомний ріґ у Blender з перемикним FK/IK на лапах, гнучкістю хребта та реактивним демпфуванням гідравліки. Скін на 64 деформівні кістки з акуратними вагами біля суглобів.',
              'Features a custom Blender control rig with toggleable FK/IK quadruped limbs, spine flex, and reactive hydraulic damping. Skinned to 64 deform bones with carefully smoothed vertex weights around joints.',
            ),
          },
          {
            icon: 'texture',
            tone: 'peach',
            title: L('Текстуры 4K PBR UDIM', 'Текстури 4K PBR UDIM', '4K PBR UDIM Texture Sets'),
            text: L(
              'Запечено в Substance 3D Painter с мастера ZBrush на 42M полигонов. В комплекте 8-bit PNG и 16-bit TIFF displacement на 4 UDIM-тайла с единой плотностью текселя 10.2 px/cm.',
              'Запечено в Substance 3D Painter з майстра ZBrush на 42M полігонів. У комплекті 8-bit PNG і 16-bit TIFF displacement на 4 UDIM-тайли з єдиною щільністю текселя 10.2 px/cm.',
              'Bake-tested in Substance 3D Painter from a 42M polygon ZBrush master. Includes 8-bit PNG and 16-bit TIFF displacement options across 4 primary UDIM tiles with consistent 10.2 px/cm texel density.',
            ),
          },
        ],
      },
      specs: {
        formats: '.FBX • .BLEND (v4.2+) • .ZTL (2024) • .OBJ • .GLB / glTF 2.0',
        polycount: '52,800 Quads // 104,240 Tris // 0 N-Gons',
        vertices: '54,120',
        textures: L('4 набора 4K UDIM (8-bit PNG и 16-bit TIFF Linear)', '4 набори 4K UDIM (8-bit PNG і 16-bit TIFF Linear)', '4x 4K UDIM Sets (8-bit PNG & 16-bit TIFF Linear)'),
        rig: L('Да // полный IK/FK скелет четвероногого (64 кости)', 'Так // повний IK/FK скелет чотириногого (64 кістки)', 'Yes // Full IK/FK Quadruped Skeleton (64 Joints)'),
        uv: L('Развёрнуто, без перекрытий, 10.2 px/cm', 'Розгорнуто, без перекриттів, 10.2 px/cm', 'Unwrapped, Non-overlapping, 10.2 px/cm'),
        software: 'Blender 3.6+, ZBrush 2023+, Maya 2024, Unreal Engine 5.2+, Unity 2022+',
        certification: L('Production Ready (100% квады)', 'Production Ready (100% квади)', 'Production Ready (100% Quads)'),
      },
    },
  },
  {
    slug: 'stylized-sorceress-basemesh',
    image: img.sorceress,
    category: 'characters',
    sub: L('Персонажи // Стилизация', 'Персонажі // Стилізація', 'Characters // Stylized'),
    title: same('Stylized Sorceress Basemesh'),
    desc: L(
      'Стилизованный женский базовый меш с чистым эдж-флоу и лицом, готовым под блендшейпы.',
      'Стилізований жіночий базовий меш із чистим едж-флоу та обличчям, готовим під блендшейпи.',
      'Stylized female basemesh with clean edge flow and facial topology ready for blendshapes.',
    ),
    formats: ['.OBJ', '.BLEND'],
    extras: ['ARKit Compliant'],
    tags: ['QuadsOnly', 'RigReady'],
    polys: 38500,
    polyLabel: '38.5k',
    feature: '52 FACIAL BLENDSHAPES',
    featureTone: 'green',
    price: 42,
    likes: 255,
    status: 'active',
    buyUrl: buy,
  },
  {
    slug: 'gorgon-queen-high-poly',
    image: img.gorgon,
    category: 'creatures',
    sub: L('Существа // Макет', 'Істоти // Макет', 'Creatures // Maquette'),
    title: same('Gorgon Queen High-Poly'),
    desc: L(
      'Мифическая королева-горгона: змеиные пряди, органическая чешуя, детальная скульптура.',
      'Міфічна королева-горгона: зміїні пасма, органічна луска, деталізована скульптура.',
      'Mythic Gorgon queen with serpent hair coils and organic scale skin displacement.',
    ),
    formats: ['.ZTL', '.OBJ'],
    extras: ['SERPENT HAIR'],
    tags: ['SubD'],
    polys: 64200,
    polyLabel: '64.2k',
    feature: 'BRONZE PATINA SHADER',
    featureTone: 'green',
    price: 49,
    likes: 176,
    status: 'active',
    buyUrl: buy,
  },
  {
    slug: 'tactical-mech-cockpit-kit',
    image: img.cockpit,
    category: 'hardSurface',
    sub: L('Окружение // Хард-сёрфейс', 'Оточення // Хард-серфейс', 'Environment // Hard Surface'),
    title: same('Tactical Mech Cockpit Kit'),
    desc: L(
      'Модульный набор кабины меха: панели, кресло, приборные блоки.',
      'Модульний набір кабіни меха: панелі, крісло, приладові блоки.',
      'Modular mech cockpit kit: panels, seat and instrument clusters.',
    ),
    formats: ['.FBX', '.BLEND'],
    extras: ['MODULAR'],
    tags: ['QuadsOnly', 'PBR_Textures', 'GameReady'],
    polys: 88000,
    polyLabel: '88.0k',
    feature: 'MODULAR PIECES',
    featureTone: 'green',
    price: 58,
    likes: 98,
    status: 'active',
    buyUrl: buy,
  },
  {
    slug: 'sub-d-combat-chassis',
    image: img.chassis,
    category: 'hardSurface',
    sub: L('Хард-сёрфейс // Прототип', 'Хард-серфейс // Прототип', 'Hard Surface // Prototype'),
    title: same('Sub-D Combat Chassis'),
    desc: L(
      'Боевое шасси-прототип под SubD с гидравликой и шарнирными узлами.',
      'Бойове шасі-прототип під SubD з гідравлікою та шарнірними вузлами.',
      'Combat chassis prototype for SubD workflows with hydraulics and robotic joints.',
    ),
    formats: ['.BLEND', '.FBX'],
    extras: ['SUBD 3'],
    tags: ['QuadsOnly', 'SubD'],
    polys: 45200,
    polyLabel: '45.2k',
    feature: 'SUB-D READY',
    featureTone: 'primary',
    isNew: true,
    price: 34,
    likes: 83,
    status: 'active',
    buyUrl: buy,
  },
  {
    slug: 'male-athletic-torso-study',
    image: img.torso,
    category: 'anatomy',
    sub: L('Анатомия // Торс', 'Анатомія // Торс', 'Anatomy // Torso'),
    title: same('Male Athletic Torso Study'),
    desc: L(
      'Мужской атлетичный торс: анатомические массы и поверхностные формы для изучения.',
      'Чоловічий атлетичний торс: анатомічні маси та поверхневі форми для вивчення.',
      'Male athletic torso study with anatomical masses and surface forms for practice.',
    ),
    formats: ['.ZTL', '.OBJ'],
    extras: ['STUDY'],
    tags: ['SubD'],
    polys: 120000,
    polyLabel: '120k',
    polyHeavy: true,
    feature: 'SCULPT STUDY',
    featureTone: 'green',
    price: 25,
    likes: 142,
    status: 'active',
    buyUrl: buy,
  },
  {
    slug: 'pbr-recon-drone-alpha',
    image: img.recon,
    category: 'props',
    sub: L('Транспорт // Для игр', 'Транспорт // Для ігор', 'Vehicles // Game-Ready'),
    title: same('PBR Recon Drone Alpha'),
    desc: L(
      'Лёгкий разведывательный дрон со складными крыльями и инфракрасной турелью.',
      'Легкий розвідувальний дрон зі складними крилами та інфрачервоною турелью.',
      'Lightweight recon stealth drone with folding wings and an infrared optical turret.',
    ),
    formats: ['.GLB', '.FBX'],
    extras: ['PBR'],
    tags: ['QuadsOnly', 'PBR_Textures', 'GameReady'],
    polys: 28500,
    polyLabel: '28.5k',
    feature: 'GAME READY • PBR',
    featureTone: 'green',
    price: 32,
    likes: 121,
    status: 'active',
    buyUrl: buy,
  },
  {
    slug: 'immortal-warlord-armor-set',
    image: img.armor,
    category: 'characters',
    sub: L('Персонажи // Экипировка', 'Персонажі // Спорядження', 'Characters // Gear'),
    title: same('Immortal Warlord Armor Set'),
    desc: L(
      'Комплект брони бессмертного полководца, разделённый на сабтулы.',
      'Комплект броні безсмертного полководця, розділений на сабтули.',
      'Immortal warlord armor set split into separated subtools.',
    ),
    formats: ['.ZTL', '.BLEND'],
    extras: ['SEPARATED SUBTOOLS'],
    tags: ['SubD'],
    polys: 78500,
    polyLabel: '78.5k',
    feature: 'MODULAR PIECES (9x)',
    featureTone: 'green',
    price: 52,
    likes: 109,
    status: 'active',
    buyUrl: buy,
  },
];

// Модели из Sanity идут первыми, затем заглушки из макета (если slug не совпал)
const sanityModels = await fetchSanityModels();
const sanitySlugs = new Set(sanityModels.map((m) => m.slug));
export const marketModels: MarketModel[] = [...sanityModels, ...placeholderModels.filter((m) => !sanitySlugs.has(m.slug))];

// Фильтры по тегам и форматам: список заглушек + то, что встречается в Sanity
const unique = (list: string[]) => [...new Set(list)];
export const marketTags: string[] = unique([...staticTags, ...sanityModels.flatMap((m) => m.tags)]);
export const marketFormats: string[] = unique([...staticFormats, ...sanityModels.flatMap((m) => m.formats)]);

export const priceBounds = {
  min: Math.min(...marketModels.map((m) => m.price)),
  max: Math.max(...marketModels.map((m) => m.price)),
};
