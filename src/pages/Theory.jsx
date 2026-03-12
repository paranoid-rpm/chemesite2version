import { useState } from 'react'

// SVG-иллюстрации для каждого раздела
function AtomIllustration() {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.85 }}>
      {/* Ядро */}
      <circle cx="90" cy="90" r="10" fill="var(--text)" />
      {/* Орбиты */}
      <ellipse cx="90" cy="90" rx="40" ry="15" stroke="var(--text)" strokeWidth="1" fill="none" opacity="0.4" />
      <ellipse cx="90" cy="90" rx="40" ry="15" stroke="var(--text)" strokeWidth="1" fill="none" opacity="0.4" transform="rotate(60 90 90)" />
      <ellipse cx="90" cy="90" rx="40" ry="15" stroke="var(--text)" strokeWidth="1" fill="none" opacity="0.4" transform="rotate(120 90 90)" />
      {/* Электроны */}
      <circle cx="130" cy="90" r="4" fill="var(--text)" opacity="0.8" />
      <circle cx="70" cy="57" r="4" fill="var(--text)" opacity="0.8" />
      <circle cx="70" cy="123" r="4" fill="var(--text)" opacity="0.8" />
    </svg>
  )
}

function BondIllustration() {
  return (
    <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.85 }}>
      {/* Атом 1 */}
      <circle cx="50" cy="50" r="22" stroke="var(--text)" strokeWidth="1.5" fill="var(--bg2)" />
      <text x="50" y="55" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text)" fontFamily="JetBrains Mono">H</text>
      {/* Атом 2 */}
      <circle cx="150" cy="50" r="22" stroke="var(--text)" strokeWidth="1.5" fill="var(--bg2)" />
      <text x="150" y="55" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text)" fontFamily="JetBrains Mono">H</text>
      {/* Ковалентная связь */}
      <line x1="72" y1="46" x2="128" y2="46" stroke="var(--text)" strokeWidth="1.5" />
      <line x1="72" y1="54" x2="128" y2="54" stroke="var(--text)" strokeWidth="1.5" />
      {/* Электроны связи */}
      <circle cx="100" cy="50" r="3" fill="var(--text)" />
    </svg>
  )
}

function ReactionIllustration() {
  return (
    <svg width="260" height="80" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.85 }}>
      <circle cx="30" cy="40" r="18" stroke="var(--text)" strokeWidth="1.2" fill="var(--bg2)" />
      <text x="30" y="45" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text)" fontFamily="JetBrains Mono">Na</text>
      <text x="60" y="45" textAnchor="middle" fontSize="14" fill="var(--text3)" fontFamily="Inter">+</text>
      <circle cx="90" cy="40" r="18" stroke="var(--text)" strokeWidth="1.2" fill="var(--bg2)" />
      <text x="90" y="45" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text)" fontFamily="JetBrains Mono">Cl</text>
      {/* Стрелка */}
      <line x1="118" y1="40" x2="142" y2="40" stroke="var(--text)" strokeWidth="1.5" />
      <polygon points="142,36 150,40 142,44" fill="var(--text)" />
      {/* Продукт */}
      <rect x="155" y="22" width="85" height="36" rx="8" stroke="var(--text)" strokeWidth="1.2" fill="var(--bg2)" />
      <text x="197" y="45" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text)" fontFamily="JetBrains Mono">NaCl</text>
    </svg>
  )
}

function PHIllustration() {
  const vals = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
  return (
    <svg width="300" height="60" viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.9 }}>
      {vals.map((v, i) => {
        const x = 10 + i * 19
        const gray = v < 7 ? 40 + v * 18 : v === 7 ? 180 : 255 - (v - 7) * 18
        return (
          <g key={v}>
            <rect x={x} y={10} width={16} height={20} rx={2}
              fill={`rgb(${gray},${gray},${gray})`} opacity="0.7" />
            <text x={x + 8} y={48} textAnchor="middle" fontSize="8" fill="var(--text3)" fontFamily="JetBrains Mono">{v}</text>
          </g>
        )
      })}
      <text x="10" y="8" fontSize="7" fill="var(--text3)" fontFamily="Inter">кислота</text>
      <text x="232" y="8" fontSize="7" fill="var(--text3)" fontFamily="Inter">щёлочь</text>
      <text x="133" y="8" fontSize="7" fill="var(--text3)" fontFamily="Inter">pH7</text>
    </svg>
  )
}

function RedoxIllustration() {
  return (
    <svg width="240" height="80" viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.85 }}>
      {/* Окислитель */}
      <rect x="5" y="20" width="70" height="40" rx="8" stroke="var(--text)" strokeWidth="1.2" fill="var(--bg2)" />
      <text x="40" y="36" textAnchor="middle" fontSize="9" fill="var(--text3)" fontFamily="Inter">восст-ль</text>
      <text x="40" y="52" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text)" fontFamily="JetBrains Mono">Fe²⁺</text>
      {/* Стрелка электрона */}
      <path d="M80 35 Q120 10 160 35" stroke="var(--text)" strokeWidth="1.2" fill="none" strokeDasharray="4 2" />
      <polygon points="157,31 165,35 157,39" fill="var(--text)" />
      <text x="120" y="18" textAnchor="middle" fontSize="8" fill="var(--text3)" fontFamily="JetBrains Mono">e⁻</text>
      {/* Восстановитель */}
      <rect x="165" y="20" width="70" height="40" rx="8" stroke="var(--text)" strokeWidth="1.2" fill="var(--bg2)" />
      <text x="200" y="36" textAnchor="middle" fontSize="9" fill="var(--text3)" fontFamily="Inter">окисл-ль</text>
      <text x="200" y="52" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text)" fontFamily="JetBrains Mono">MnO₄⁻</text>
    </svg>
  )
}

function OrganicIllustration() {
  return (
    <svg width="220" height="80" viewBox="0 0 220 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.85 }}>
      {/* Бензольное кольцо */}
      {[0,1,2,3,4,5].map(i => {
        const a1 = (i * 60 - 90) * Math.PI / 180
        const a2 = ((i+1) * 60 - 90) * Math.PI / 180
        const r = 28
        return <line key={i}
          x1={50 + Math.cos(a1)*r} y1={40 + Math.sin(a1)*r}
          x2={50 + Math.cos(a2)*r} y2={40 + Math.sin(a2)*r}
          stroke="var(--text)" strokeWidth="1.5" />
      })}
      <circle cx="50" cy="40" r="15" stroke="var(--text)" strokeWidth="1" fill="none" strokeDasharray="3 2" opacity="0.5" />
      <text x="50" y="44" textAnchor="middle" fontSize="8" fill="var(--text3)" fontFamily="Inter">C₆H₆</text>
      {/* Этанол */}
      <text x="110" y="30" fontSize="10" fontWeight="600" fill="var(--text)" fontFamily="JetBrains Mono">CH₃</text>
      <line x1="148" y1="28" x2="160" y2="28" stroke="var(--text)" strokeWidth="1.5" />
      <text x="162" y="30" fontSize="10" fontWeight="600" fill="var(--text)" fontFamily="JetBrains Mono">CH₂</text>
      <line x1="198" y1="28" x2="210" y2="28" stroke="var(--text)" strokeWidth="1.5" />
      <text x="110" y="52" fontSize="9" fill="var(--text3)" fontFamily="Inter">алкан</text>
      <text x="162" y="52" fontSize="9" fill="var(--text3)" fontFamily="Inter">алкен</text>
      <text x="112" y="70" fontSize="8" fill="var(--text3)" fontFamily="JetBrains Mono">CₙH₂ₙ₊₂</text>
    </svg>
  )
}

const TOPICS = [
  {
    id: 'atom', index: '01', title: 'Строение атома',
    illustration: <AtomIllustration />,
    sections: [
      { heading: 'Ядро атома',
        body: 'Атом состоит из плотного ядра, содержащего протоны и нейтроны, окружённого электронами, занимающими дискретные энергетические уровни (оболочки). Число протонов определяет атомный номер Z, который однозначно идентифицирует элемент. Массовое число A равно суммарному числу протонов и нейтронов (нуклонов).' },
      { heading: 'Электронная конфигурация',
        body: 'Электроны заполняют орбитали по трём принципам: принцип Ауфбау (сначала заполняются орбитали с наименьшей энергией), принцип Паули (два электрона в одном атоме не могут иметь одинаковый набор квантовых чисел), правило Хунда (максимальное число неспаренных электронов в подоболочке). Порядок заполнения: 1s 2s 2p 3s 3p 4s 3d 4p...' },
      { heading: 'Квантовые числа',
        body: 'Каждый электрон описывается четырьмя квантовыми числами: n (главное — размер оболочки), l (орбитальное — форма подоболочки: s=0, p=1, d=2, f=3), mₗ (магнитное — ориентация орбитали), mₛ (спин: +½ или −½). Принцип запрета Паули: никакие два электрона в атоме не могут иметь одинаковый набор всех четырёх квантовых чисел.',
        formula: 'n = 1, 2, 3...   l = 0...(n−1)   mₗ = −l...+l   mₛ = ±½' },
      { heading: 'Изотопы и атомная масса',
        body: 'Изотопы — атомы одного элемента с разным числом нейтронов. Атомная масса в таблице Менделеева — средневзвешенное значение по всем природным изотопам. Пример: хлор имеет два изотопа — ³⁵Cl (75,77%) и ³⁷Cl (24,23%), средняя масса = 35,45 а.е.м.' },
    ]
  },
  {
    id: 'periodic', index: '02', title: 'Периодический закон',
    illustration: null,
    sections: [
      { heading: 'Закон Менделеева',
        body: 'Физические и химические свойства элементов являются периодической функцией их атомного номера. Элементы расположены в порядке возрастания Z. Горизонтальные ряды называются периодами (7 штук); вертикальные столбцы — группами (18 штук). Элементы одной группы имеют схожую конфигурацию валентных электронов и химическое поведение.' },
      { heading: 'Периодические закономерности',
        body: 'Атомный радиус уменьшается вдоль периода (больше протонов притягивают электроны ближе) и увеличивается вниз по группе (добавляются электронные оболочки). Энергия ионизации возрастает вдоль периода и убывает вниз по группе. Электроотрицательность (шкала Полинга) максимальна у фтора (3,98) и в целом растёт к правому верхнему углу таблицы.' },
      { heading: 'Электроотрицательность и тип связи',
        body: 'ΔЭО < 0,5: неполярная ковалентная. 0,5 ≤ ΔЭО < 1,7: полярная ковалентная. ΔЭО ≥ 1,7: ионная. Металлическая связь — валентные электроны образуют делокализованное «электронное море». Значения: F=3,98; O=3,44; N=3,04; Cl=3,16; C=2,55; H=2,20; Na=0,93.',
        formula: 'ΔЭО < 0.5 → неполярная   |   0.5–1.7 → полярная   |   > 1.7 → ионная' },
    ]
  },
  {
    id: 'bond', index: '03', title: 'Химическая связь',
    illustration: <BondIllustration />,
    sections: [
      { heading: 'Ковалентная связь',
        body: 'Образуется обобщением электронных пар между атомами неметаллов. Одинарная связь — 2 электрона (порядок 1), двойная — 4 (порядок 2), тройная — 6 (порядок 3). Больший порядок = меньшая длина связи и большая энергия. Пример: N₂ имеет тройную связь (энергия 945 кДж/моль).' },
      { heading: 'Ионная связь',
        body: 'Образуется электростатическим притяжением разноимённо заряженных ионов. Возникает при ΔЭО ≥ 1,7. Металлы отдают электроны, образуя катионы (Na⁺, Ca²⁺); неметаллы принимают, образуя анионы (Cl⁻, O²⁻). Ионные соединения образуют кристаллические решётки с высокими температурами плавления.' },
      { heading: 'Металлическая связь',
        body: 'Атомы металлов отдают валентные электроны в делокализованное «электронное море», окружающее положительные ионы. Этим объясняются электрическая и тепловая проводимость, ковкость и пластичность металлов. Сплавы изменяют эти свойства за счёт введения других элементов.' },
      { heading: 'Межмолекулярные силы',
        body: 'Водородная связь (N–H···O, O–H···N и др.) — сильнейшая из межмолекулярных сил (до 40 кДж/моль). Диполь-дипольные силы действуют между полярными молекулами. Силы дисперсии Лондона (ван-дер-ваальсовы) действуют на все молекулы и усиливаются с ростом молярной массы.' },
    ]
  },
  {
    id: 'classes', index: '04', title: 'Классы веществ',
    illustration: null,
    sections: [
      { heading: 'Оксиды',
        body: 'Бинарные соединения кислорода с другим элементом. Основные оксиды (оксиды металлов): реагируют с водой → основание; с кислотой → соль + вода. Пример: Na₂O + H₂O → 2NaOH. Кислотные оксиды (оксиды неметаллов): + H₂O → кислота. Пример: SO₃ + H₂O → H₂SO₄. Амфотерные (Al₂O₃, ZnO) реагируют и с теми, и с другими.',
        formula: 'Основной оксид + H₂O → щёлочь   |   Кислотный оксид + H₂O → кислота' },
      { heading: 'Кислоты',
        body: 'По Аррениусу: вещества, диссоциирующие в воде с выделением ионов H⁺. Сильные кислоты (HCl, H₂SO₄, HNO₃, HBr, HI, HClO₄) диссоциируют полностью. Слабые (CH₃COOH, HF, H₂CO₃) — частично. Степень диссоциации и значение Ka определяют силу кислоты. Многоосновные кислоты отдают несколько протонов.' },
      { heading: 'Основания',
        body: 'По Аррениусу: вещества, диссоциирующие с выделением ионов OH⁻. Сильные: NaOH, KOH, Ca(OH)₂. Слабые: NH₃·H₂O. Определение Брёнстеда-Лоури: основание — любой акцептор протонов. Нейтрализация: кислота + основание → соль + вода.',
        formula: 'HCl + NaOH → NaCl + H₂O' },
      { heading: 'Соли',
        body: 'Ионные соединения, образованные при нейтрализации. Средние соли: NaCl, Na₂SO₄. Кислые (содержат H): NaHCO₃, NaHSO₄. Основные (содержат OH): Mg(OH)Cl. Правила растворимости: все нитраты растворимы; хлориды растворимы, кроме AgCl, PbCl₂, Hg₂Cl₂; сульфаты растворимы, кроме BaSO₄, PbSO₄.' },
    ]
  },
  {
    id: 'reactions', index: '05', title: 'Химические реакции',
    illustration: <ReactionIllustration />,
    sections: [
      { heading: 'Типы реакций',
        body: 'Соединение: A + B → AB. Разложение: AB → A + B. Замещение: A + BC → AC + B (происходит, только если A активнее B). Обмен (метатезис): AB + CD → AD + CB. Горение: топливо + O₂ → CO₂ + H₂O (ΔH < 0).' },
      { heading: 'Термохимия',
        body: 'Экзотермические реакции выделяют теплоту (ΔH < 0), эндотермические поглощают (ΔH > 0). Закон Гесса: суммарное изменение энтальпии не зависит от пути реакции. Стандартная энтальпия образования ΔH°f — изменение энтальпии при образовании 1 моль вещества из простых веществ в стандартных условиях.',
        formula: 'ΔH°реакции = ΣΔH°f(продуктов) − ΣΔH°f(реагентов)' },
      { heading: 'Скорость реакции',
        body: 'Скорость зависит от: концентрации (выше → быстрее), температуры (уравнение Аррениуса: k = A·e^(−Ea/RT)), площади поверхности, катализатора. Энергия активации Ea — минимальная энергия для начала реакции. Катализатор снижает Ea, не расходуясь.',
        formula: 'v = k[A]ᵐ[B]ⁿ   |   k = A·e^(−Eₐ/RT)' },
      { heading: 'Химическое равновесие',
        body: 'При равновесии скорости прямой и обратной реакций равны. Константа равновесия Kc = [продукты]/[реагенты] (концентрации при равновесии). Kc > 1: равновесие смещено к продуктам. Kc < 1: к реагентам. Принцип Ле Шателье: система в состоянии равновесия смещается, чтобы скомпенсировать внешнее воздействие.',
        formula: 'aA + bB ⇌ cC + dD   →   Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ' },
    ]
  },
  {
    id: 'solutions', index: '06', title: 'Растворы и pH',
    illustration: <PHIllustration />,
    sections: [
      { heading: 'Единицы концентрации',
        body: 'Молярность C = n/V (моль/л). Моляльность b = n/mрастворителя (моль/кг). Массовая доля ω = m(растворённого)/m(раствора). Молярная доля χ = n(компонента)/n(общее). При разбавлении: C₁V₁ = C₂V₂.',
        formula: 'C = n / V   |   ω = m(в-ва) / m(раствора) × 100%' },
      { heading: 'Шкала pH',
        body: 'pH = −lg[H⁺]. При 25°C Kw = [H⁺][OH⁻] = 10⁻¹⁴, поэтому pH + pOH = 14. pH < 7: кислая среда. pH = 7: нейтральная. pH > 7: щелочная. Каждая единица pH соответствует 10-кратному изменению [H⁺]. pH крови = 7,35–7,45. Желудочный сок ≈ 1,5–3,5. Морская вода ≈ 8,1.',
        formula: 'pH = −lg[H⁺]   |   pH + pOH = 14   |   Kw = 10⁻¹⁴' },
      { heading: 'Буферные растворы',
        body: 'Буфер сопротивляется изменению pH при добавлении кислоты или щёлочи. Состоит из слабой кислоты и её конъюгированного основания. Уравнение Гендерсона-Хассельбаха: pH = pKa + lg([A⁻]/[HA]). Биологические буферы: карбонатный (CO₂/HCO₃⁻), фосфатный (H₂PO₄⁻/HPO₄²⁻), гемоглобин.',
        formula: 'pH = pKₐ + lg([A⁻] / [HA])' },
    ]
  },
  {
    id: 'redox', index: '07', title: 'ОВР',
    illustration: <RedoxIllustration />,
    sections: [
      { heading: 'Степени окисления',
        body: 'Правила: для простого вещества = 0; для одноатомного иона = заряду; O обычно −2 (кроме пероксидов −1, OF₂ +2); H обычно +1 (кроме гидридов металлов −1); сумма СО в нейтральной молекуле = 0. Окисление = повышение СО (потеря e⁻). Восстановление = понижение СО (приобретение e⁻). ОВР: «окислитель» принимает e⁻, «восстановитель» отдаёт.' },
      { heading: 'Метод полуреакций',
        body: 'Разделить на полуреакции окисления и восстановления. Уравнять атомы (O — с помощью H₂O, H — с помощью H⁺). Уравнять заряды с помощью e⁻. Умножить для уравнивания числа электронов. Сложить полуреакции. В щелочной среде добавить OH⁻ для нейтрализации H⁺.',
        formula: 'MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺  (в кислой среде)' },
      { heading: 'Электрохимия',
        body: 'Гальванические элементы преобразуют химическую энергию в электрическую. Электролизные ячейки используют электрическую энергию для несамопроизвольных реакций. Стандартный электродный потенциал E° — мера склонности к восстановлению относительно СВЭ. Уравнение Нернста: E = E° − (RT/nF)·ln(Q).',
        formula: 'E°яч. = E°катода − E°анода   |   ΔG° = −nFE°' },
    ]
  },
  {
    id: 'organic', index: '08', title: 'Органическая химия',
    illustration: <OrganicIllustration />,
    sections: [
      { heading: 'Углеводороды',
        body: 'Алканы CₙH₂ₙ₊₂: только одинарные связи, гибридизация sp³. Алкены CₙH₂ₙ: одна двойная связь, sp². Алкины CₙH₂ₙ₋₂: одна тройная, sp. Арены: бензольное кольцо с делокализованными π-электронами. Номенклатура ИЮПАК: найти главную цепь, нумеровать от ближайшего заместителя, называть заместители как префиксы.',
        formula: 'Алканы: CₙH₂ₙ₊₂   Алкены: CₙH₂ₙ   Алкины: CₙH₂ₙ₋₂' },
      { heading: 'Функциональные группы',
        body: 'Спирты (–OH): полярные, водородные связи, высокие tкип. Альдегиды (–CHO) и кетоны (C=O): карбонильная группа. Карбоновые кислоты (–COOH): кислотные, Ka~10⁻⁵. Сложные эфиры (–COO–): образуются из кислоты + спирта + H⁺. Амины (–NH₂): основные, неподелённая пара N. Амиды (–CONH₂): устойчивы, образуют белки (пептидные связи).' },
      { heading: 'Механизмы реакций',
        body: 'Замещение (SN1/SN2): алкилгалогениды реагируют с нуклеофилами. Присоединение: алкены реагируют с H₂, HX, X₂, H₂O. Отщепление (E1/E2): образование двойной связи из алкилгалогенида + основание. Правило Марковникова: H присоединяется к атому C с бо́льшим числом H.',
        formula: 'Спирт (первичный) → Альдегид → Карбоновая кислота' },
    ]
  },
]

export default function Theory() {
  const [active, setActive] = useState(TOPICS[0].id)
  const topic = TOPICS.find(t => t.id === active)
  const currentIdx = TOPICS.findIndex(t => t.id === active)

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
      <div style={{ padding: '48px 0 32px' }} className="fade-up">
        <p className="section-label" style={{ marginBottom: 12 }}>Справочник</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em' }}>Теория</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '3rem', paddingBottom: '4rem' }}>

        {/* Боковое меню */}
        <nav style={{ position: 'sticky', top: 72, height: 'fit-content' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {TOPICS.map(t => (
              <li key={t.id}>
                <button onClick={() => setActive(t.id)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '8px 12px',
                    borderRadius: 8, border: 'none', cursor: 'pointer',
                    display: 'flex', gap: 12, alignItems: 'baseline',
                    background: active === t.id ? 'var(--bg2)' : 'transparent',
                    color: active === t.id ? 'var(--text)' : 'var(--text2)',
                    fontWeight: active === t.id ? 600 : 400, fontSize: '0.85rem',
                    transition: 'all 0.15s ease',
                    borderLeft: active === t.id ? '2px solid var(--text)' : '2px solid transparent',
                  }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--text3)' }}>{t.index}</span>
                  {t.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Контент */}
        <div key={active} className="fade-up">
          {/* Заголовок + иллюстрация */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', gap: '2rem' }}>
            <div>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text3)' }}>{topic.index}</span>
              <h2 style={{ fontSize: '1.75rem', marginTop: 6 }}>{topic.title}</h2>
            </div>
            {topic.illustration && (
              <div style={{ flexShrink: 0, padding: '1rem', background: 'var(--bg2)', borderRadius: 12, border: '1px solid var(--border)' }}>
                {topic.illustration}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {topic.sections.map((s, i) => (
              <div key={i} style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>{s.heading}</h3>
                <p style={{ color: 'var(--text2)', lineHeight: 1.75, fontSize: '0.925rem' }}>{s.body}</p>
                {s.formula && (
                  <div style={{
                    marginTop: '1rem', padding: '0.75rem 1.25rem',
                    background: 'var(--bg2)', borderLeft: '3px solid var(--text)',
                    borderRadius: '0 8px 8px 0',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem',
                    color: 'var(--text)', letterSpacing: '-0.01em',
                  }}>
                    {s.formula}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Навигация */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
            {currentIdx > 0 ? (
              <button className="btn" onClick={() => setActive(TOPICS[currentIdx - 1].id)}>
                &larr; {TOPICS[currentIdx - 1].title}
              </button>
            ) : <span />}
            {currentIdx < TOPICS.length - 1 && (
              <button className="btn btn-primary" onClick={() => setActive(TOPICS[currentIdx + 1].id)}>
                {TOPICS[currentIdx + 1].title} &rarr;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
