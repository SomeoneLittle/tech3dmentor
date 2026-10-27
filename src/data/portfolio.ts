// Временные данные портфолио из макета. Форма совпадает с будущими записями Sanity (поля по языкам); потом заменить запросом.
// Порядок в массиве = порядок «Новые» и соседей prev/next. Блок `detail` необязателен: без него страница работы покажет упрощённый вид.
import type { Localized } from '../i18n';
import { portfolioImages as img } from './mockPortfolioImages';

const L = (ru: string, ua: string, en: string): Localized => ({ ru, ua, en });
const same = (v: string): Localized => ({ ru: v, ua: v, en: v });

export type PortfolioCategory = 'characters' | 'hardSurface' | 'sculpting' | 'environment';
export type StatTone = 'default' | 'primary' | 'green' | 'peach' | 'orange';

export interface Stat {
  text: string;
  tone: StatTone;
}

export interface GalleryTile {
  image: string;
  size: 'wide' | 'tall' | 'std';
  cam: string;
  title: Localized;
  caption: Localized;
  captionTone: 'plain' | 'green' | 'orange';
}

export interface WorkDetail {
  meshId: string;
  unit: string;
  accent: string;
  subd: string;
  quads: string;
  renderLine: string;
  resLine: string;
  status: Localized;
  componentCount: string;
  /** Ракурсы: первый — основной кадр вьюпорта. Режимы Beauty / Clay / Wire берут кадры 0 / 1 / 2. */
  views: { image: string; label: string; sub: string; alt: Localized }[];
  brief: {
    heading: Localized;
    paragraphs: Localized[];
    highlights: { icon: string; tone: 'green' | 'primary' | 'orange'; title: Localized; text: Localized }[];
    note: { tag: Localized; text: Localized };
  };
  specs: {
    classification: Localized;
    polycount: string;
    subdivision: Localized;
    textures: Localized;
    bakes: string;
    license: Localized;
    revision: string;
  };
  topology: { quads: number; tris: number; ngons: number; score: string };
  gallery: GalleryTile[];
}

export interface PortfolioWork {
  slug: string;
  image: string;
  category: PortfolioCategory;
  sub: Localized;
  title: Localized;
  desc: Localized;
  tools: string[];
  /** Подпись «камеры» и бейдж в шапке карточки */
  cam: string;
  camBadge: string;
  matcap?: { label: string; swatch: string };
  stats: Stat[];
  /** Для сортировки по полигонажу */
  polys: number;
  year?: number;
  featured?: boolean;
  likes?: number;
  /** Короткое видео-превью для карточки списка (в Sanity — файл) */
  video?: string;
  /** Ссылка на PDF с техническим разбором (поле появится в Sanity) */
  pdf?: string;
  detail?: WorkDetail;
}

export const portfolioWorks: PortfolioWork[] = [
  {
    slug: 'gorgon-queen-bust',
    image: img.gorgon,
    category: 'characters',
    sub: L('Органика', 'Органіка', 'Organic'),
    title: same('Gorgon Queen Bust'),
    desc: L(
      'Тест многослойного шейдинга кожи: микроморщины, поры, карты подповерхностного рассеивания и рукотворная анатомия змей.',
      'Тест багатошарового шейдингу шкіри: мікрозморшки, пори, карти підповерхневого розсіювання та рукотворна анатомія змій.',
      'Multi-layered skin shading test incorporating micro-wrinkle pores, subsurface dispersion maps, and hand-sculpted serpent anatomy.',
    ),
    tools: ['ZBrush', 'Substance', 'Blender'],
    cam: 'CAM_CHAR_BUST_01',
    camBadge: '60 FPS',
    matcap: { label: 'PBR MATCAP', swatch: 'bg-gradient-to-tr from-primary-container via-surface-bright to-tertiary-container' },
    stats: [
      { text: 'POLY: 64.2k', tone: 'default' },
      { text: 'SUBD: LV.3', tone: 'primary' },
    ],
    polys: 64200,
    featured: true,
    video: '/videos/gorgon-queen-bust.mp4',
  },
  {
    slug: 'cybernetic-quadruped',
    image: img.razorback,
    category: 'hardSurface',
    sub: L('Sci-Fi', 'Sci-Fi', 'Sci-Fi'),
    title: same('Cybernetic Quadruped'),
    desc: L(
      'SubD-топология и неразрушающий булев-воркфлоу в Blender для бронированного четвероногого меха.',
      'SubD-топологія та неруйнівний булів воркфлоу в Blender для броньованого чотириногого меха.',
      'SubD topology with non-destructive boolean workflow in Blender for an armored quadruped mech.',
    ),
    tools: ['Blender', 'ZBrush', 'Substance 3D'],
    cam: 'CAM_QUAD_RECON_04',
    camBadge: 'RIG: PRE-BAKED',
    stats: [
      { text: 'POLY: 52.8k', tone: 'default' },
      { text: 'QUADS: 99.4%', tone: 'green' },
    ],
    polys: 52800,
    year: 2024,
    featured: true,
    likes: 342,
    detail: {
      meshId: 'HB-8092_PROD',
      unit: 'UNIT 04-A // HEAVY RECON RIG',
      accent: '// RAZORBACK-04',
      subd: 'SUBD: LV.3',
      quads: 'QUADS: 99.4%',
      renderLine: 'RENDER PIPELINE: LIVE CYCLES / METAL',
      resLine: 'RES: 3840 x 2160 UHD // COLOR: ACEScg',
      status: L('ФИНАЛЬНАЯ ГЕОМЕТРИЯ УТВЕРЖДЕНА', 'ФІНАЛЬНА ГЕОМЕТРІЯ ЗАТВЕРДЖЕНА', 'HIGH-RES MASTER GEOMETRY APPROVED'),
      componentCount: '312',
      views: [
        {
          image: img.razorback,
          label: '[01] FRONT 3/4',
          sub: 'PRIMARY',
          alt: L(
            'Рендер бронированного кибернетического четвероногого меха Razorback-04 в трёхчетвертном ракурсе',
            'Рендер броньованого кібернетичного чотириногого меха Razorback-04 у триквартному ракурсі',
            'Beauty render of the armored cybernetic quadruped mech Razorback-04 in a three-quarter stance',
          ),
        },
        {
          image: img.razorbackView2,
          label: '[02] CLAY PASS',
          sub: 'MATCAP',
          alt: L('Глиняный маткап Razorback-04', 'Глиняний маткап Razorback-04', 'Clay matcap pass of Razorback-04'),
        },
        {
          image: img.razorbackView3,
          label: '[03] WIRE EDGE',
          sub: 'TOPOLOGY',
          alt: L('Сетка Razorback-04: петли вокруг суставов', 'Сітка Razorback-04: петлі навколо суглобів', 'Wireframe of Razorback-04 showing loops around the joints'),
        },
        {
          image: img.razorbackView4,
          label: '[04] HEAD CRANIAL',
          sub: 'MACRO',
          alt: L('Макро головы-сенсора Razorback-04', 'Макро голови-сенсора Razorback-04', 'Macro of the Razorback-04 optical sensor head'),
        },
        {
          image: img.razorbackView5,
          label: '[05] CHASSIS REAR',
          sub: 'POWERPACK',
          alt: L('Вид сзади: бустеры и силовой блок', 'Вигляд ззаду: бустери та силовий блок', 'Rear chassis view with boosters and power pack'),
        },
      ],
      brief: {
        heading: L('Инженерная кинематика', 'Інженерна кінематика', 'Engineered mechanical kinematics'),
        paragraphs: [
          L(
            'Razorback-04 задумывался как автономная патрульная платформа для тяжёлой горной местности. Дизайн соединяет скелетную морфологию кошачьих с грубой военной техникой. Каждый цилиндр, крепление поршня и шарнир смоделированы с рабочими зазорами, так что геометрия не пересекается во всём диапазоне движения конечностей.',
            'Razorback-04 задумувався як автономна патрульна платформа для важкої гірської місцевості. Дизайн поєднує скелетну морфологію котячих із грубою військовою технікою. Кожен циліндр, кріплення поршня та шарнір змодельовані з робочими зазорами, тож геометрія не перетинається в усьому діапазоні руху кінцівок.',
            'Razorback-04 was conceived as an autonomous patrol and reconnaissance platform for severe mountainous terrain. The design fuses feline skeletal morphology with brutalist military hardware. Every cylinder, piston anchor, and joint gimbal is modeled with functional clearance, so geometry never interpenetrates through the full range of limb movement.',
          ),
          L(
            'Неразрушающие булевы операции в Blender плюс мелкая детализация поверхности в ZBrush. Напряжение рёбер подобрано так, чтобы блики оставались чёткими при жёстком студийном свете, а квад-ретопология даёт чистую деформацию в узлах нагрузки.',
            'Неруйнівні булеві операції в Blender плюс дрібна деталізація поверхні в ZBrush. Напруга ребер підібрана так, щоб відблиски лишалися чіткими за жорсткого студійного світла, а квад-ретопологія дає чисту деформацію у вузлах навантаження.',
            'A non-destructive boolean workflow in Blender combined with fine surface detailing in ZBrush. Edge tension is tuned to keep specular highlights crisp under hard studio light, and quad-dominant retopology keeps deformation clean at high-stress pivots.',
          ),
        ],
        highlights: [
          {
            icon: 'account_tree',
            tone: 'green',
            title: L('ПАРАМЕТРИЧЕСКИЙ СТЕК', 'ПАРАМЕТРИЧНИЙ СТЕК', 'PARAMETRIC STACK'),
            text: L(
              'Вся иерархия модификаторов сохранена: бевелы правятся без потерь, LOD собираются сразу.',
              'Уся ієрархія модифікаторів збережена: бевели правляться без втрат, LOD збираються одразу.',
              'Full modifier hierarchy preserved for non-destructive bevel adjustments and instant LOD compilation.',
            ),
          },
          {
            icon: 'texture',
            tone: 'primary',
            title: L('4× 4K UDIM', '4× 4K UDIM', '4x 4K UDIM LAYOUT'),
            text: L(
              'Острова UV с единой плотностью текселей (~10.2 px/см): текстуры не тянутся на сочленениях.',
              'Острови UV з єдиною щільністю текселів (~10.2 px/см): текстури не тягнуться на зчленуваннях.',
              'Optimized UV islands with unified texel density (~10.2 px/cm) preventing texture stretching at articulation seams.',
            ),
          },
          {
            icon: 'precision_manufacturing',
            tone: 'orange',
            title: L('ГОТОВ К РИГУ', 'ГОТОВИЙ ДО РИГУ', 'RIG-READY JOINTS'),
            text: L(
              'Оси вращения выставлены на всех шарнирах и амортизаторах: аниматор берёт модель сразу.',
              'Осі обертання виставлені на всіх шарнірах і амортизаторах: аніматор бере модель одразу.',
              'Pre-aligned rotational axes on all hinges, dampers, and suspension tie-rods for immediate animator handoff.',
            ),
          },
        ],
        note: {
          tag: L('КЕЙС ИЗ КУРСА // МОДУЛЬ 06', 'КЕЙС З КУРСУ // МОДУЛЬ 06', 'CURRICULUM CASE STUDY // MODULE 06'),
          text: L(
            'Эта работа — основной разбор в треке менторства «Hard Surface»: круглые булевы вырезы на кривых поверхностях без защемлений.',
            'Ця робота — основний розбір у треку менторства «Hard Surface»: круглі булеві вирізи на кривих поверхнях без защемлень.',
            'This asset is the primary masterclass demo in the Hard Surface mentorship track: circular boolean cutouts on curved surfaces without pinching.',
          ),
        },
      },
      specs: {
        classification: L('Хард-сёрфейс / риггинг-мех', 'Хард-серфейс / ріггінг-мех', 'Hard Surface / Rigged Mech'),
        polycount: '52.8k Polys / 104.2k Tris',
        subdivision: L('Catmull-Clark, ур. 2–3', 'Catmull-Clark, рів. 2–3', 'Catmull-Clark Lv.2 to Lv.3'),
        textures: L('4× 4K UDIM (PBR Metallic/Roughness)', '4× 4K UDIM (PBR Metallic/Roughness)', '4x 4K UDIMs (PBR Metallic/Roughness)'),
        bakes: 'Normal, Curvature, AO, Thickness, ID',
        license: L('Продакшн-ассет по NDA клиента', 'Продакшн-асет за NDA клієнта', 'Client NDA Production Asset'),
        revision: 'REV: 02.4_FINAL',
      },
      topology: { quads: 90, tris: 8, ngons: 0, score: '98.6%' },
      gallery: [
        {
          image: img.razorbackGallery1,
          size: 'wide',
          cam: 'CAM_MACRO_01 // SUSPENSION HYDRAULICS',
          title: L('Подвеска и гидравлика шасси', 'Підвіска та гідравліка шасі', 'Chassis suspension & piston hydraulics'),
          caption: L('Ход поршня проверен на сдвигах развала до 45°.', 'Хід поршня перевірено на зсувах розвалу до 45°.', 'Kinematic piston stroke tested against 45-degree camber shifts.'),
          captionTone: 'plain',
        },
        {
          image: img.razorbackGallery2,
          size: 'tall',
          cam: 'CAM_STRESS_04',
          title: L('Стресс-тест сочленения конечности', 'Стрес-тест зчленування кінцівки', 'Limb articulation stress test'),
          caption: L('МАКС. СГИБ: 165° // БЕЗ КОЛЛИЗИЙ', 'МАКС. ЗГИН: 165° // БЕЗ КОЛІЗІЙ', 'MAX FLEXION: 165° // ZERO COLLISION'),
          captionTone: 'green',
        },
        {
          image: img.razorbackGallery3,
          size: 'std',
          cam: 'TANGENT_NORMALS // 16-BIT',
          title: L('Нормали мелкой детализации', 'Нормалі дрібної деталізації', 'Micro-detail surface normals'),
          caption: L('Мелкие детали запечены в карту 4K.', 'Дрібні деталі запечені в карту 4K.', 'Non-destructive floaters baked to 4K map.'),
          captionTone: 'plain',
        },
        {
          image: img.razorbackGallery4,
          size: 'std',
          cam: 'MATCAP_CLAY_RED_02',
          title: L('Глиняный маткап, другой ракурс', 'Глиняний маткап, інший ракурс', 'Matcap clay angle view'),
          caption: L('Проверка непрерывности поверхности.', 'Перевірка безперервності поверхні.', 'Pure surface continuity audit.'),
          captionTone: 'plain',
        },
        {
          image: img.razorbackGallery5,
          size: 'std',
          cam: 'SKIN_MATRIX // 3 VARIANTS',
          title: L('Варианты раскраски', 'Варіанти розфарбування', 'Colorway variant exploration'),
          caption: L('TACTICAL / INDUSTRIAL / STEALTH', 'TACTICAL / INDUSTRIAL / STEALTH', 'TACTICAL / INDUSTRIAL / STEALTH'),
          captionTone: 'orange',
        },
      ],
    },
  },
  {
    slug: 'cerberus-maquette',
    image: img.cerberus,
    category: 'sculpting',
    sub: L('Анатомия', 'Анатомія', 'Anatomy'),
    title: same('Cerberus Maquette'),
    desc: L(
      'Сравнительный этюд мышц четвероногой собаки, созданный вживую на стриме менторства №24, с рабочими сухожилиями.',
      'Порівняльний етюд мʼязів чотириногого пса, створений наживо на стрімі менторства №24, з робочими сухожилками.',
      'Comparative quadrupedal canine muscle study modeled live during Mentorship Stream #24 with functional tendons.',
    ),
    tools: ['ZBrush', 'KeyShot'],
    cam: 'CAM_ANAT_PERSP_08',
    camBadge: 'DYNA_512',
    matcap: { label: 'RED WAX', swatch: 'bg-orange-700' },
    stats: [
      { text: 'POLY: 3.8M DYN', tone: 'default' },
      { text: 'RAW SCULPT', tone: 'peach' },
    ],
    polys: 3800000,
  },
  {
    slug: 'mk-vii-exoskeleton',
    image: img.exoskeleton,
    category: 'hardSurface',
    sub: L('Sci-Fi', 'Sci-Fi', 'Sci-Fi'),
    title: same('MK-VII Exoskeleton'),
    desc: L(
      'Боевой каркас для продакшна: модульные веса бевела и неразрушающие булевы операции.',
      'Бойовий каркас для продакшну: модульні ваги бевела та неруйнівні булеві операції.',
      'Production-ready combat rig engineered with modular bevel weight topologies and non-destructive modifier booleans.',
    ),
    tools: ['Maya', 'Substance 3D'],
    cam: 'CAM_TECH_ISO_04',
    camBadge: 'FOV 35mm',
    matcap: { label: 'CLAY SHADER', swatch: 'bg-slate-300' },
    stats: [
      { text: 'POLY: 112.8k', tone: 'default' },
      { text: 'QUADS: 99.2%', tone: 'green' },
    ],
    polys: 112800,
    year: 2024,
  },
  {
    slug: 'bio-mechanical-drone',
    image: img.drone,
    category: 'hardSurface',
    sub: L('Транспорт', 'Транспорт', 'Vehicle'),
    title: same('Bio-Mechanical Drone'),
    desc: L(
      'Автономный разведчик с чистым эдж-флоу для механической артикуляции и игровых LOD.',
      'Автономний розвідник із чистим едж-флоу для механічної артикуляції та ігрових LOD.',
      'Autonomous scouting unit designed with clean edge loop flow for mechanical articulation and real-time game LODs.',
    ),
    tools: ['Blender', 'Substance'],
    cam: 'CAM_DRONE_FRONT',
    camBadge: '4K UDIM',
    stats: [
      { text: 'POLY: 34.1k', tone: 'default' },
      { text: 'SUBD: LV.2', tone: 'green' },
    ],
    polys: 34100,
  },
  {
    slug: 'stylized-eldritch-oracle',
    image: img.oracle,
    category: 'characters',
    sub: L('Фэнтези', 'Фентезі', 'Fantasy'),
    title: same('Stylized Eldritch Oracle'),
    desc: L(
      'Тест пайплайна персонажа: стилизованные кривые анатомии и фотореалистичная микрошероховатость ткани.',
      'Тест пайплайна персонажа: стилізовані криві анатомії та фотореалістична мікрошорсткість тканини.',
      'Character pipeline benchmark combining stylized anatomy curves with photoreal micro-roughness textiles.',
    ),
    tools: ['ZBrush', 'Unreal 5'],
    cam: 'CAM_CREATURE_HERO',
    camBadge: 'UE5 READY',
    matcap: { label: 'NORMAL PASS', swatch: 'bg-violet-600' },
    stats: [
      { text: 'POLY: 52.4k', tone: 'default' },
      { text: 'RIG: GAME OPTIMIZED', tone: 'primary' },
    ],
    polys: 52400,
    year: 2023,
  },
  {
    slug: 'dynamesh-anatomy-study-04',
    image: img.torso,
    category: 'sculpting',
    sub: L('Академический', 'Академічний', 'Academic'),
    title: same('Dynamesh Anatomy Study #04'),
    desc: L(
      'Подробный разбор анатомии: вращение лопатки, начало и прикрепление передней зубчатой мышцы, натяжение кожи.',
      'Докладний розбір анатомії: обертання лопатки, початок і прикріплення переднього зубчастого мʼяза, натяг шкіри.',
      'Deep anatomical breakdown focusing on scapular rotation, serratus anterior origin insertions, and natural skin tension.',
    ),
    tools: ['ZBrush', 'Blender'],
    cam: 'CAM_STUDY_ECORCHE',
    camBadge: 'ANAT_04',
    stats: [
      { text: 'POLY: 1.2M', tone: 'default' },
      { text: 'SUBD: BASE', tone: 'peach' },
    ],
    polys: 1200000,
  },
  {
    slug: 'modular-mech-cockpit',
    image: img.cockpit,
    category: 'environment',
    sub: L('Модульный', 'Модульний', 'Modular'),
    title: same('Modular Mech Cockpit'),
    desc: L(
      'Модульный набор со снапами, трим-листами, запечёнными цветами вершин и шейдерами светящихся экранов.',
      'Модульний набір зі снапами, трим-листами, запеченими кольорами вершин та шейдерами екранів, що світяться.',
      'Snappable modular kit with trim-sheets, baked vertex colors, and emissive screen shader blueprints.',
    ),
    tools: ['Maya', 'UE5'],
    cam: 'CAM_ENV_COCKPIT_INT',
    camBadge: 'TRIS: 88K',
    stats: [
      { text: 'NANITE READY', tone: 'default' },
      { text: 'LUMEN LIGHTING', tone: 'green' },
    ],
    polys: 88000,
  },
  {
    slug: 'immortal-demon-warlord',
    image: img.warlord,
    category: 'characters',
    sub: L('Тёмное фэнтези', 'Темне фентезі', 'Dark Fantasy'),
    title: same('Immortal Demon Warlord'),
    desc: L(
      'Кинематографичный ассет для промо-ролика о существе, с мульти-тайловыми картами displacement из Mari.',
      'Кінематографічний асет для промо-ролика про істоту, з мульти-тайловими картами displacement з Mari.',
      'Cinematic asset completed for promotional creature cinematic, utilizing Mari multi-tile displacement textures.',
    ),
    tools: ['ZBrush', 'Mari', 'Maya'],
    cam: 'CAM_WARLORD_PERS',
    camBadge: 'HI-POLY',
    stats: [
      { text: 'POLY: 78.5k', tone: 'default' },
      { text: 'DISP: 32-BIT EXR', tone: 'orange' },
    ],
    polys: 78500,
  },
  {
    slug: 'sub-d-combat-chassis',
    image: img.chassis,
    category: 'hardSurface',
    sub: L('Топология', 'Топологія', 'Topology'),
    title: same('Sub-D Combat Chassis'),
    desc: L(
      'Учебный кейс по топологии: сложные кривые пересечения с чистым натяжением рёбер и полюсами на своих местах.',
      'Навчальний кейс із топології: складні криві перетини з чистим натягом ребер і полюсами на своїх місцях.',
      'Topology masterclass test case resolving complex curved intersections with clean edge tension poles.',
    ),
    tools: ['Blender', 'KeyShot'],
    cam: 'CAM_HARD_SUBD',
    camBadge: '100% QUADS',
    stats: [
      { text: 'POLY: 45.2k', tone: 'default' },
      { text: 'PINCH: 0%', tone: 'green' },
    ],
    polys: 45200,
    year: 2024,
  },
  {
    slug: 'heavy-armor-rig',
    image: img.armor,
    category: 'characters',
    sub: L('Хард-сёрфейс', 'Хард-серфейс', 'Hard Surface'),
    title: same('Heavy Armor Rig'),
    desc: L(
      'Гибридный воркфлоу: симуляция ткани в Marvelous Designer и бронированные вставки с булевыми операциями.',
      'Гібридний воркфлоу: симуляція тканини в Marvelous Designer та броньовані вставки з булевими операціями.',
      'Hybrid workflow combining Marvelous Designer cloth simulation with hard-surface boolean armor inserts.',
    ),
    tools: ['ZBrush', 'Marvelous'],
    cam: 'CAM_RIG_HEAVY',
    camBadge: 'ACEScg',
    stats: [
      { text: 'POLY: 68.9k', tone: 'default' },
      { text: 'SUBD: LV.2', tone: 'primary' },
    ],
    polys: 68900,
  },
  {
    slug: 'pbr-hard-surface-drone',
    image: img.pbrDrone,
    category: 'hardSurface',
    sub: L('Проп', 'Проп', 'Prop'),
    title: same('PBR Hard-Surface Drone'),
    desc: L(
      'Игровой ассет: скульпт на 8 млн полигонов запечён в триангулированный LOD0 на 28k.',
      'Ігровий асет: скульпт на 8 млн полігонів запечений у тріангульований LOD0 на 28k.',
      'High-efficiency game asset baked from an 8-million poly ZBrush sculpt down to a 28k triangulated LOD0.',
    ),
    tools: ['Substance', 'Marmoset'],
    cam: 'CAM_PBR_DRONE',
    camBadge: '8K TEX',
    stats: [
      { text: 'POLY: 28.5k', tone: 'default' },
      { text: 'PBR UDIMS: 4', tone: 'green' },
    ],
    polys: 28500,
  },
  {
    slug: 'clay-torso-dynamic-study',
    image: img.clayTorso,
    category: 'sculpting',
    sub: L('Жест', 'Жест', 'Gesture'),
    title: same('Clay Torso Dynamic Study'),
    desc: L(
      '45-минутный спид-скульпт: распределение веса в контрапосте и объёмная деформация мышц под нагрузкой.',
      '45-хвилинний спід-скульпт: розподіл ваги в контрапості та обʼємна деформація мʼязів під навантаженням.',
      '45-minute speed sculpt exploring contrapposto weight distribution and volumetric muscle deformation under tension.',
    ),
    tools: ['ZBrush', 'Arnold'],
    cam: 'CAM_DYNAMIC_POSE',
    camBadge: 'SPEED_SCULPT',
    stats: [
      { text: 'POLY: 2.4M', tone: 'default' },
      { text: 'CLAY RAKE PASS', tone: 'primary' },
    ],
    polys: 2400000,
  },
];

export const getPortfolioWork = (slug: string) => portfolioWorks.find((w) => w.slug === slug);
