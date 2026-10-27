// Временные данные блога из макета. Форма совпадает с будущими записями Sanity (поля по языкам); потом заменить запросом.
// Тексты, цифры и лайки — плейсхолдеры из макета. Порядок в массиве = порядок «Сначала новые» и соседей по теме.
import type { Lang, Localized } from '../i18n';
import { blogImages as img } from './mockBlogImages';
import { articles as homeArticles } from './home';

const L = (ru: string, ua: string, en: string): Localized => ({ ru, ua, en });
const same = (v: string): Localized => ({ ru: v, ua: v, en: v });

export type BlogCategory = 'tutorials' | 'breakdowns' | 'process';

export type Block =
  | { type: 'p'; text: Localized; lead?: boolean }
  | { type: 'tip'; label: Localized; text: Localized }
  | { type: 'figure'; image: string; alt: Localized; bar: string; status?: Localized; stamp: string; caption: Localized; ref: string }
  | { type: 'cards'; items: { code: string; icon: string; title: Localized; text: Localized }[] }
  | { type: 'quote'; text: Localized }
  | { type: 'steps'; items: { title: Localized; text: Localized }[] }
  | { type: 'compare'; title: Localized; sub: string; a: { image: string; alt: Localized; label: string; note: string }; b: { image: string; alt: Localized; label: string; note: string }; footnote: Localized }
  | { type: 'checklist'; items: { title: Localized; text: Localized }[] };

export interface ArticleSection {
  kicker: Localized;
  heading: Localized;
  blocks: Block[];
}

export interface ArticleBody {
  badge: Localized;
  hud: { poly: string; subd: string; poles: string; toolchain: string[] };
  hero: { image: string; alt: Localized };
  sections: ArticleSection[];
  tags: string[];
}

export interface BlogPost {
  slug: string;
  category: BlogCategory;
  image: string;
  /** ISO-дата, формат под язык делает formatDate */
  date: string;
  readMin: number;
  likes: number;
  /** Подпись внизу картинки карточки */
  topic: Localized;
  /** Короткий чип рядом со ссылкой «Читать» */
  chip: string;
  title: Localized;
  desc: Localized;
  featured?: boolean;
  /** Плашка «проверено» (в макете PEER REVIEWED) */
  peer?: boolean;
  views?: number;
  /** Файлы к статье: пока плейсхолдер из макета, ссылку подставит Sanity */
  download?: { size: string; md5: string; href: string };
  /** Полный текст. Без него страница статьи покажет шапку и лид-абзац. */
  article?: ArticleBody;
}

const locales: Record<Lang, string> = { ru: 'ru-RU', ua: 'uk-UA', en: 'en-US' };
export const formatDate = (iso: string, lang: Lang, month: 'short' | 'long' = 'short'): string =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString(locales[lang], { day: '2-digit', month, year: 'numeric', timeZone: 'UTC' }).replace(/\s?г\.|\s?р\./, '').toUpperCase();

const featuredArticle: ArticleBody = {
  badge: same('SUB-D HARD SURFACE'),
  hud: { poly: '342.1K QUADS', subd: 'LEVEL 2 CATMULL-CLARK', poles: 'MAX N-5 ISOLATED', toolchain: ['ZBrush 2024', 'Blender 4.2', 'Marmoset Toolbag 5'] },
  hero: {
    image: img.hero,
    alt: L(
      'Хард-серфейс модель Razorback-04 с плотной квад-топологией вокруг булевых отверстий на тёмном фоне вьюпорта',
      'Хард-серфейс модель Razorback-04 зі щільною квад-топологією навколо булевих отворів на темному тлі вʼюпорта',
      'Hard-surface model Razorback-04 with dense quad topology wrapped around boolean cutouts on a dark viewport background',
    ),
  },
  tags: ['SubD', 'Topology', 'HardSurface', 'Blender4', 'ZBrush'],
  sections: [
    {
      kicker: L('ОБЪЁМЫ ПЕРЕСЕЧЕНИЙ', 'ОБʼЄМИ ПЕРЕТИНІВ', 'INTERSECTION VOLUMETRICS'),
      heading: L('Дилемма недеструктивных булевых операций', 'Дилема недеструктивних булевих операцій', 'The Non-Destructive Boolean Dilemma'),
      blocks: [
        {
          type: 'p',
          lead: true,
          text: L(
            'Булевы операции — самый быстрый способ вырезать форму, будь то хиро-техника для Unreal Engine 5 или макет для офлайн-рендера. Но в момент, когда вы применяете цилиндрический вырез к изогнутой поверхности, долг по топологии начинает расти.',
            'Булеві операції — найшвидший спосіб вирізати форму, чи то хіро-техніка для Unreal Engine 5, чи макет для офлайн-рендера. Але в мить, коли ви застосовуєте циліндричний виріз до вигнутої поверхні, борг за топологією починає рости.',
            'Boolean operations are the fastest way to cut a form, whether it is a hero vehicle for Unreal Engine 5 or a maquette for an offline renderer. But the moment you commit a cylindrical cutter across a curved surface, your topological debt starts to compound.',
          ),
        },
        {
          type: 'p',
          text: L(
            'ZRemesher, Quad Remesher и воксельный ремеш Blender отлично подходят для блокинга. Но перед сабдивом (Catmull-Clark, уровень 2+) они почти всегда оставляют неровные полюса и треугольники вдоль напряжённого края.',
            'ZRemesher, Quad Remesher і воксельний ремеш Blender чудово підходять для блокінгу. Але перед сабдівом (Catmull-Clark, рівень 2+) вони майже завжди залишають нерівні полюси й трикутники вздовж напруженого краю.',
            'ZRemesher, Quad Remesher and Blender voxel remesh are great for blocking. But before Catmull-Clark level 2+ subdivision they almost always leave irregular poles and triangle collapses along the high-tension edge.',
          ),
        },
        {
          type: 'tip',
          label: L('СОВЕТ ПО ПАЙПЛАЙНУ', 'ПОРАДА ПО ПАЙПЛАЙНУ', 'PRO PIPELINE TIP'),
          text: L(
            'Держите живые вырезающие объекты в отдельной коллекции Blender до применения булева. Пересобирать границу с нуля в разы дольше, чем перестраивать уже выровненные рёбра.',
            'Тримайте живі вирізні обʼєкти в окремій колекції Blender до застосування булева. Перебудовувати межу з нуля в рази довше, ніж переробляти вже вирівняні ребра.',
            'Keep live cutter objects in a dedicated Blender collection before applying the boolean. Rebuilding a boundary from scratch takes far longer than rerouting edges that are already aligned.',
          ),
        },
      ],
    },
    {
      kicker: L('АНАЛИЗ И ДИАГНОСТИКА', 'АНАЛІЗ І ДІАГНОСТИКА', 'ANALYSIS & DIAGNOSTICS'),
      heading: L('Диагностика защемлений и натяжения рёбер', 'Діагностика защемлень і натягу ребер', 'Diagnosing Pinching & Edge Tension'),
      blocks: [
        {
          type: 'p',
          text: L(
            'Защемление — не каприз, а следствие неравномерного распределения нормалей у соседних граней. Если у одной вершины шесть рёбер, а у соседних три-четыре, кривизна резко сжимается в этой точке.',
            'Защемлення — не примха, а наслідок нерівномірного розподілу нормалей у сусідніх граней. Якщо в однієї вершини шість ребер, а в сусідніх три-чотири, кривина різко стискається в цій точці.',
            'Pinching is not a whim, it is the result of uneven normal distribution across adjacent faces. If one vertex connects six edges while its neighbours connect three or four, curvature contracts sharply at that point.',
          ),
        },
        {
          type: 'figure',
          image: img.diagram,
          alt: L(
            'Зебра-матcап на пересечении цилиндров: волнистые линии показывают защемление рядом с исправленной квад-сеткой',
            'Зебра-матcап на перетині циліндрів: хвилясті лінії показують защемлення поряд із виправленою квад-сіткою',
            'Zebra matcap on a cylinder intersection: wavy lines show pinching next to the corrected quad layout',
          ),
          bar: 'INSPECTION PASS // ZEBRA_CURVATURE_ANALYSIS',
          status: L('ВЫСОКОЕ НАТЯЖЕНИЕ', 'ВИСОКИЙ НАТЯГ', 'HIGH TENSION DETECTED'),
          stamp: 'DIAGNOSTIC MODE: ANISOTROPIC SHADER',
          caption: L(
            'Рис. 1.1: зебра-матcап показывает напряжение вокруг цилиндрических булевых отверстий.',
            'Рис. 1.1: зебра-матcап показує напруження навколо циліндричних булевих отворів.',
            'Fig 1.1: zebra matcap inspection showing tension pinching around cylindrical boolean apertures.',
          ),
          ref: '01.1B',
        },
        {
          type: 'p',
          text: L(
            'При запекании нормалей такие вершины дают радиальные вмятины и тёмные муаровые линии под жёстким светом. Три самых опасных сценария:',
            'Під час запікання нормалей такі вершини дають радіальні вм’ятини й темні муарові лінії під жорстким світлом. Три найнебезпечніші сценарії:',
            'During normal-map bakes such vertices produce radial dimples and dark moiré lines under harsh light. The three most dangerous failure modes:',
          ),
        },
        {
          type: 'cards',
          items: [
            {
              code: 'FAIL_MODE_01',
              icon: 'warning',
              title: L('Звёздные полюса на фасках', 'Зіркові полюси на фасках', 'Star Poles on Fillets'),
              text: L(
                'Полюс на 5–6 рёбер прямо в скруглении гарантированно даст вмятину после сабдива.',
                'Полюс на 5–6 ребер просто в заокругленні гарантовано дасть вм’ятину після сабдіва.',
                'A 5- or 6-way pole placed inside a transition bevel guarantees dimpling after subdivision.',
              ),
            },
            {
              code: 'FAIL_MODE_02',
              icon: 'texture',
              title: L('Неравные пролёты рёбер', 'Нерівні прольоти ребер', 'Unequal Edge Spans'),
              text: L(
                'Плотный кластер булевых вырезов, упирающийся в широкие вытянутые грани, ломает анизотропный свет.',
                'Щільний кластер булевих вирізів, що впирається в широкі витягнуті грані, ламає анізотропне світло.',
                'A dense cluster of boolean cuts running into wide, stretched faces distorts anisotropic lighting.',
              ),
            },
            {
              code: 'FAIL_MODE_03',
              icon: 'view_in_ar',
              title: L('Преждевременный Sub-D', 'Передчасний Sub-D', 'Premature Sub-D'),
              text: L(
                'Сабдив до изоляции граничных петель тянет внешнюю кривизну в отверстие и сминает цилиндр.',
                'Сабдів до ізоляції граничних петель тягне зовнішню кривину у отвір і зминає циліндр.',
                'Subdividing before the boundary loops are isolated pulls outer curvature into the opening and collapses the cylinder.',
              ),
            },
          ],
        },
      ],
    },
    {
      kicker: L('МЕТОД ПЕРЕСТРОЙКИ', 'МЕТОД ПЕРЕБУДОВИ', 'REROUTING METHODOLOGY'),
      heading: L('Пошагово: ромбовидные квады и поток', 'Покроково: ромбовидні квади й потік', 'Step-by-Step Rerouting: Diamond Quads & Flow'),
      blocks: [
        {
          type: 'p',
          text: L(
            'Решение — изолировать каждое отверстие замкнутым кольцом («удерживающим забором»), чтобы натяжение сабдива гасло до того, как дойдёт до основной поверхности.',
            'Рішення — ізолювати кожен отвір замкненим кільцем («утримувальним парканом»), щоб натяг сабдіва гаснув до того, як дійде до основної поверхні.',
            'The fix is to wrap every opening in an isolated boundary ring (a “holding fence”) so subdivision tension dies out before it reaches the primary surface.',
          ),
        },
        {
          type: 'quote',
          text: L(
            'Чистая сетка — это не эстетика ради эстетики. Это разница между ассетом, который предсказуемо деформируется под киношным светом, и ассетом, который ломает движок рендера.',
            'Чиста сітка — це не естетика заради естетики. Це різниця між асетом, який передбачувано деформується під кіношним світлом, і асетом, який ламає рушій рендера.',
            'A clean mesh is not aesthetic obsession. It is the difference between an asset that deforms predictably under cinematic lighting and one that breaks the renderer.',
          ),
        },
        {
          type: 'p',
          text: L(
            'Если нужно убрать лишнюю плотность, используйте схему ромбовидного квада: две входящие параллельные петли сводятся в пару квадов под 45°, треугольники исчезают, а поток уходит на 90° от напряжённой кривизны.',
            'Якщо потрібно прибрати зайву щільність, використовуйте схему ромбовидного квада: дві вхідні паралельні петлі зводяться в пару квадів під 45°, трикутники зникають, а потік відходить на 90° від напруженої кривини.',
            'To drop extra density, use the diamond-quad redirection: collapse two incoming parallel loops into a 45° quad pair, which removes triangles and turns the flow 90° away from the high-stress curvature.',
          ),
        },
        {
          type: 'steps',
          items: [
            {
              title: L('Выделите рельс пересечения', 'Виділіть рейку перетину', 'Isolate the Intersection Rail'),
              text: L(
                'Пустите инсет-петлю вокруг шва на равном расстоянии 1,5–3 мм. Это буферная зона, которая впитает сглаживание фаски.',
                'Пустіть інсет-петлю навколо шва на рівній відстані 1,5–3 мм. Це буферна зона, що увібере згладжування фаски.',
                'Run an inset loop around the seam at a uniform 1.5–3.0 mm. It forms a buffer zone that absorbs the bevel smoothing.',
              ),
            },
            {
              title: L('Сдвиньте полюса на плоскости', 'Зсуньте полюси на площини', 'Snap Poles to Planar Regions'),
              text: L(
                'Edge Slide в Blender или Point Stitch в ZModeler: уведите неизбежные полюса со скругления на плоские грани, где нормали не плывут.',
                'Edge Slide у Blender або Point Stitch у ZModeler: відведіть неминучі полюси зі заокруглення на пласкі грані, де нормалі не пливуть.',
                'Use Edge Slide in Blender or Point Stitch in ZModeler to move unavoidable poles off the fillet onto flat coplanar faces where normals cannot warp.',
              ),
            },
            {
              title: L('Выровняйте пролёты', 'Вирівняйте прольоти', 'Equalize Span Relaxation'),
              text: L(
                'LoopTools Space по окружным петлям даёт равномерное натяжение без ухода от исходного радиуса цилиндра.',
                'LoopTools Space по окружних петлях дає рівномірний натяг без відходу від вихідного радіуса циліндра.',
                'LoopTools Space across the circumferential loops evens out edge tension without drifting from the original cylinder radius.',
              ),
            },
          ],
        },
      ],
    },
    {
      kicker: L('СРАВНЕНИЕ ЛУКДЕВА', 'ПОРІВНЯННЯ ЛУКДЕВУ', 'LOOKDEV COMPARISON'),
      heading: L('Глина против текстур при проверке поверхности', 'Глина проти текстур під час перевірки поверхні', 'Clay vs Textured Surface Inspection'),
      blocks: [
        {
          type: 'p',
          text: L(
            'Не проверяйте топологию на текстурированном превью. Альбедо, грязь и шум шероховатости прячут дефекты геометрии, которые потом всплывут в кадре. Сравните чистую глину и финальный ассет:',
            'Не перевіряйте топологію на текстурованому превʼю. Альбедо, бруд і шум шорсткості ховають дефекти геометрії, які потім спливуть у кадрі. Порівняйте чисту глину й фінальний асет:',
            'Never judge topology on a textured preview. Albedo, grunge and roughness noise hide geometry flaws that resurface in the final camera pass. Compare the raw clay with the finished asset:',
          ),
        },
        {
          type: 'compare',
          title: L('ГЛИНА против PBR', 'ГЛИНА проти PBR', 'CLAY CONTINUITY vs PBR PRODUCTION'),
          sub: 'PASS: ACEScg // BAKE: 4096x4096 16-BIT',
          a: {
            image: img.clay,
            alt: L('Крупный план глиняного рендера шарнира с ровными бликами по скруглениям', 'Великий план глиняного рендера шарніра з рівними відблисками по заокругленнях', 'Close-up clay render of a hinge joint with even highlights over the fillets'),
            label: 'PASS_A: UNTEXTURED MATTE CLAY',
            note: '✓ ZERO PINCH DETECTED',
          },
          b: {
            image: img.pbr,
            alt: L('Тот же шарнир в финальном PBR-рендере с потёртой краской и анодированным титаном', 'Той самий шарнір у фінальному PBR-рендері зі потертою фарбою й анодованим титаном', 'The same hinge in a final PBR render with worn paint and anodized titanium'),
            label: 'PASS_B: FINAL LOOKDEV PBR',
            note: 'MARMOSET 5 ENGINE',
          },
          footnote: L(
            'Блики идут непрерывно через отверстие, без микродрожи.',
            'Відблиски йдуть безперервно крізь отвір, без мікродрижання.',
            'Highlights flow continuously through the opening without micro-jitter.',
          ),
        },
      ],
    },
    {
      kicker: L('ИТОГИ ДЛЯ ПРОДАКШНА', 'ПІДСУМКИ ДЛЯ ПРОДАКШНУ', 'PRODUCTION DELIVERABLES'),
      heading: L('Выводы и чек-лист перед сдачей', 'Висновки й чек-лист перед здачею', 'Key Takeaways & Production Checklist'),
      blocks: [
        {
          type: 'p',
          text: L(
            'Перед тем как отдать меш в репозиторий студии или выложить на маркетплейс, пройдите четыре пункта:',
            'Перед тим як віддати меш у репозиторій студії або виставити на маркетплейс, пройдіть чотири пункти:',
            'Before checking a mesh into a studio repository or packaging it for the marketplace, run through these four points:',
          ),
        },
        {
          type: 'checklist',
          items: [
            {
              title: L('Ни одного n-гона на изогнутой поверхности', 'Жодного n-гона на вигнутій поверхні', 'Zero N-Gons on Curved Surfaces'),
              text: L('Select by Trait → Faces by Sides: на кривых поверхностях только четырёхугольники.', 'Select by Trait → Faces by Sides: на кривих поверхнях лише чотирикутники.', 'Select by Trait → Faces by Sides: curved surfaces must be strictly quads.'),
            },
            {
              title: L('Граничные петли на месте', 'Граничні петлі на місці', 'Boundary Loop Buffering Confirmed'),
              text: L('У каждого острого выреза есть удерживающая петля до встречи с основной геометрией.', 'У кожного гострого вирізу є утримувальна петля до зустрічі з основною геометрією.', 'Every sharp cut has at least one holding loop before it meets the primary geometry.'),
            },
            {
              title: L('Стресс-тест глянцевым матcапом', 'Стрес-тест глянцевим матcапом', 'High-Gloss Matcap Stress Test'),
              text: L('Крутите красно-хромовый матcап на 360°. Если блик дрожит на пересечениях, расслабьте шаг рёбер.', 'Крутіть червоно-хромовий матcап на 360°. Якщо відблиск тремтить на перетинах, послабте крок ребер.', 'Rotate a red/chrome matcap 360°. If the specular band wobbles at intersections, relax the edge spacing.'),
            },
            {
              title: L('Бюджет полигонов соблюдён', 'Бюджет полігонів дотримано', 'Polycount Budget Conformance'),
              text: L('Проверьте ассет на плотности LOD0: без лишних компланарных петель.', 'Перевірте асет на щільності LOD0: без зайвих компланарних петель.', 'Inspect the asset at target LOD0 density with no redundant coplanar loops.'),
            },
          ],
        },
      ],
    },
  ],
};

const posts: BlogPost[] = [
  {
    slug: 'zero-pinch-boolean-cleanup',
    category: 'breakdowns',
    image: img.featured,
    date: '2024-10-24',
    readMin: 14,
    likes: 512,
    topic: L('ХАРД-СЕРФЕЙС // ПАЙПЛАЙН', 'ХАРД-СЕРФЕЙС // ПАЙПЛАЙН', 'HARD SURFACE // PIPELINE'),
    chip: 'SUB-D',
    featured: true,
    peer: true,
    views: 4892,
    download: { size: '1.4 GB', md5: 'a9f83...c821', href: '#' },
    title: L(
      'Сложная квад-топология в хард-серфейс Sub-D: чистка булевых без защемлений',
      'Складна квад-топологія в хард-серфейс Sub-D: чистка булевих без защемлень',
      'Mastering Complex Quad Topology in Hard-Surface Sub-D: Zero-Pinch Boolean Cleanup',
    ),
    desc: L(
      'Пошаговый разбор: как превратить пересечения булевых операций в чистую квад-сетку без защемлений, артефактов натяжения и лишних удерживающих петель.',
      'Покроковий розбір: як перетворити перетини булевих операцій на чисту квад-сітку без защемлень, артефактів натягу й зайвих утримувальних петель.',
      'A step-by-step masterclass on resolving compound boolean intersections into clean all-quad flow without pinching, tension artifacts, or excessive support loops.',
    ),
    article: featuredArticle,
  },
  {
    slug: 'anatomy-landmarks-scapula-clavicle',
    category: 'tutorials',
    image: img.anatomy,
    date: '2024-10-18',
    readMin: 9,
    likes: 342,
    topic: L('АНАТОМИЯ, ЭКОРШЕ', 'АНАТОМІЯ, ЕКОРШЕ', 'ANATOMY ECORCHE'),
    chip: 'ZBRUSH 2024',
    title: L(
      'Анатомические ориентиры для скульпторов: ритм лопатки и ключицы',
      'Анатомічні орієнтири для скульпторів: ритм лопатки та ключиці',
      'Anatomy Landmarks for Character Sculptors: Scapula & Clavicle Rhythm',
    ),
    desc: L(
      'Костные ориентиры, распределение подкожного жира и динамика крепления мышц для убедительных органических силуэтов.',
      'Кісткові орієнтири, розподіл підшкірного жиру та динаміка кріплення мʼязів для переконливих органічних силуетів.',
      'Understanding bony landmarks, subcutaneous adipose distribution, and dynamic muscle insertions for believable organic silhouettes.',
    ),
  },
  {
    slug: 'razorback-04-kinematic-rigging',
    category: 'breakdowns',
    image: img.razorback,
    date: '2024-10-11',
    readMin: 16,
    likes: 289,
    topic: L('КИНЕМАТИКА // РИГ', 'КІНЕМАТИКА // РИГ', 'KINEMATICS // RIG'),
    chip: 'BLENDER // RIG',
    title: L(
      'Киберквадрупед Razorback-04: полный кинематический риг в Blender',
      'Кіберквадрупед Razorback-04: повний кінематичний риг у Blender',
      'Cybernetic Quadruped Razorback-04: Full Kinematic Rigging in Blender',
    ),
    desc: L(
      'Гидравлические амортизаторы, поршни и свои IK-ограничители для экспорта в игровой движок без пересечений меша.',
      'Гідравлічні амортизатори, поршні та власні IK-обмежувачі для експорту в ігровий рушій без перетинів мешу.',
      'Rigging hydraulic dampers, piston articulation, and custom IK constraints for real-time game engine export without mesh interpenetration.',
    ),
  },
  {
    slug: 'zbrush-dynamesh-to-4k-udim',
    category: 'process',
    image: img.lookdev,
    date: '2024-09-29',
    readMin: 11,
    likes: 198,
    topic: L('ЛУКДЕВ И UDIM', 'ЛУКДЕВ І UDIM', 'LOOKDEV & UDIM'),
    chip: 'MARMOSET 5',
    title: L(
      'От 42M Dynamesh в ZBrush до текстур 4K UDIM: мой лукдев-процесс',
      'Від 42M Dynamesh у ZBrush до текстур 4K UDIM: мій лукдев-процес',
      'From 42M ZBrush Dynamesh to 4K UDIM Textures: My Lookdev Workflow',
    ),
    desc: L(
      'Как я запекаю хай-в-лоу в Marmoset Toolbag 5, работаю с 16-битными картами смещения и цветом ACEScg.',
      'Як я запікаю хай-в-лоу у Marmoset Toolbag 5, працюю з 16-бітними картами зміщення й кольором ACEScg.',
      'How I handle high-to-low baking in Marmoset Toolbag 5, 16-bit displacement maps, and ACEScg color management.',
    ),
  },
  {
    slug: 'exr-displacement-unreal-nanite',
    category: 'tutorials',
    image: img.nanite,
    date: '2024-09-20',
    readMin: 8,
    likes: 215,
    topic: L('UNREAL ENGINE 5.4', 'UNREAL ENGINE 5.4', 'UNREAL ENGINE 5.4'),
    chip: 'NANITE',
    title: L(
      '32-битные EXR-карты смещения в Unreal Engine 5.4 Nanite без магии',
      '32-бітні EXR-карти зміщення в Unreal Engine 5.4 Nanite без магії',
      'Demystifying 32-bit EXR Displacement Maps in Unreal Engine 5.4 Nanite',
    ),
    desc: L(
      'Микропоры кожи и микрофаски без раздутого VRAM и разрывов силуэта при смещении.',
      'Мікропори шкіри й мікрофаски без роздутого VRAM і розривів силуету під час зміщення.',
      'Achieving microscopic skin pores and micro-bevel fidelity without ballooning VRAM consumption or silhouette displacement tearing.',
    ),
  },
  {
    slug: 'gorgon-queen-snake-hair-curves',
    category: 'breakdowns',
    image: img.gorgon,
    date: '2024-09-12',
    readMin: 13,
    likes: 421,
    topic: L('КИСТИ CURVE IMM', 'ПЕНЗЛІ CURVE IMM', 'CURVE IMM BRUSHES'),
    chip: 'CREATURE ART',
    title: L(
      'Скульпт Королевы Горгон: процедурные змеи-волосы и микрочешуя',
      'Скульпт Королеви Горгон: процедурні змії-волосся і мікролуска',
      'Sculpting the Gorgon Queen: Procedural Snake Hair Curves & Micro-Scales',
    ),
    desc: L(
      'Свои кисти Curve IMM и процедурные VDM-штампы для сложного органического монстра.',
      'Власні пензлі Curve IMM і процедурні VDM-штампи для складного органічного монстра.',
      'Building custom curve IMM brushes and procedural VDM displacement stamps for complex organic monster design.',
    ),
  },
  {
    slug: 'why-juniors-fail-aaa-art-tests',
    category: 'process',
    image: img.audit,
    date: '2024-08-28',
    readMin: 7,
    likes: 680,
    topic: L('СТАНДАРТЫ AAA', 'СТАНДАРТИ AAA', 'AAA INDUSTRY STANDARDS'),
    chip: 'CAREER',
    title: L(
      'Почему большинство джунов проваливает арт-тесты AAA (и как это исправить)',
      'Чому більшість джунів провалює арт-тести AAA (і як це виправити)',
      'Why 90% of Junior 3D Artists Fail AAA Art Tests (And How to Fix It)',
    ),
    desc: L(
      'Типичные красные флаги в портфолио: плохая плотность текселей в UV, кривые петли и небрежный свет в презентации.',
      'Типові червоні прапорці в портфоліо: погана щільність текселів в UV, криві петлі й недбале світло в презентації.',
      'Common red flags in technical portfolio submissions: bad UV packing texel density, unoptimized edge loops, and sloppy presentation lighting.',
    ),
  },
  {
    slug: 'marvelous-designer-cloth-for-mechs',
    category: 'tutorials',
    image: img.cloth,
    date: '2024-08-19',
    readMin: 10,
    likes: 174,
    topic: L('СИМУЛЯЦИЯ ТКАНИ', 'СИМУЛЯЦІЯ ТКАНИНИ', 'CLOTH SIM'),
    chip: 'MARVELOUS',
    title: L(
      'Симуляция ткани в Marvelous Designer для хард-серфейс мехов',
      'Симуляція тканини в Marvelous Designer для хард-серфейс мехів',
      'Cloth Simulation with Marvelous Designer for Hard-Surface Mechs',
    ),
    desc: L(
      'Как совместить плотные баллистические обмотки с жёсткой титановой бронёй: давление, швы, детали.',
      'Як поєднати щільні балістичні обмотки з жорсткою титановою бронею: тиск, шви, деталі.',
      'Blending tailored heavy ballistic fabric wraps with rigid titanium armor plating, pressure simulation, and seam detailing.',
    ),
  },
  {
    slug: 'custom-matcaps-topology-audits',
    category: 'process',
    image: img.matcap,
    date: '2024-08-04',
    readMin: 6,
    likes: 153,
    topic: L('МАТКАП-ШЕЙДЕРЫ', 'МАТКАП-ШЕЙДЕРИ', 'MATCAP SHADERS'),
    chip: 'SHADERS',
    title: L(
      'Свои матcапы и пресеты света для быстрого аудита топологии',
      'Власні матcапи й пресети світла для швидкого аудиту топології',
      'Creating Custom Matcaps & Studio Lighting Presets for Fast Topology Audits',
    ),
    desc: L(
      'Матcапы, чувствительные к кривизне, и контрастные зебра-шейдеры в Blender и ZBrush.',
      'Матcапи, чутливі до кривини, й контрастні зебра-шейдери в Blender і ZBrush.',
      'A deep dive into building curvature-sensitive matcaps and high-contrast zebra stripe shaders in Blender and ZBrush.',
    ),
  },
  {
    slug: 'modular-sci-fi-weapon-kit',
    category: 'breakdowns',
    image: img.weapon,
    date: '2024-07-26',
    readMin: 12,
    likes: 267,
    topic: L('ПЛОТНОСТЬ ТЕКСЕЛЕЙ', 'ЩІЛЬНІСТЬ ТЕКСЕЛІВ', 'TEXEL DENSITY'),
    chip: 'WEAPONS',
    title: L(
      'Модульный sci-fi набор оружия: 18 сменных деталей на одной UV-развёртке',
      'Модульний sci-fi набір зброї: 18 змінних деталей на одній UV-розгортці',
      'Modular Sci-Fi Weapon Kit: 18 Swappable Attachments on One UV Sheet',
    ),
    desc: L(
      'Максимум плотности текселей: зеркальные UV 0–1, трим-листы и weighted normal для оружия от первого лица.',
      'Максимум щільності текселів: дзеркальні UV 0–1, трим-листи й weighted normal для зброї від першої особи.',
      'Maximizing texel density with 0-1 mirror mapping, trim sheets, and weighted normal shading for first-person weapons.',
    ),
  },
];

// Три статьи с главной: у них тоже должна открываться страница (карточки на главной ведут на /blog/<slug>).
const homePosts: BlogPost[] = homeArticles.map((a, i) => ({
  slug: a.slug,
  category: (['tutorials', 'breakdowns', 'process'] as const)[i % 3],
  image: a.image,
  date: ['2024-10-05', '2024-09-05', '2024-08-12'][i % 3],
  readMin: [8, 12, 6][i % 3],
  likes: [96, 134, 58][i % 3],
  topic: a.tag,
  chip: 'BLOG',
  title: a.title,
  desc: a.desc,
}));

/** Новые сверху. */
export const blogPosts: BlogPost[] = [...posts, ...homePosts].sort((x, y) => (x.date < y.date ? 1 : -1));
export const featuredPost = blogPosts.find((p) => p.featured) ?? blogPosts[0];
export const blogCategories: BlogCategory[] = ['tutorials', 'breakdowns', 'process'];
