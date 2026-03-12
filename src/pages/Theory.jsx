const topics = [
  { id: 'atom', title: '1. Строение атома', emoji: '⚛️', content: 'Атом состоит из ядра (протоны и нейтроны) и электронов на орбиталях. Заряд ядра = порядковый номер элемента. Электроны располагаются по уровням: 2, 8, 18...' },
  { id: 'periodic', title: '2. Периодический закон', emoji: '📊', content: 'Свойства элементов периодически повторяются с ростом заряда ядра. Период — горизонтальный ряд, группа — вертикальный столбец. В группе схожие химические свойства.' },
  { id: 'bond', title: '3. Химическая связь', emoji: '🔗', content: 'Ковалентная (общие электроны), ионная (перенос электронов), металлическая (электронный газ), водородная (межмолекулярная). Электроотрицательность определяет тип связи.' },
  { id: 'classes', title: '4. Классы веществ', emoji: '🧪', content: 'Оксиды, кислоты, основания, соли — четыре основных класса. Кислоты содержат H⁺, основания — OH⁻. Реакция нейтрализации: кислота + основание → соль + вода.' },
  { id: 'reactions', title: '5. Типы реакций', emoji: '⚡', content: 'Соединение (A+B→AB), разложение (AB→A+B), замещение (A+BC→AC+B), обмен (AB+CD→AD+CB). Также экзотермические и эндотермические реакции.' },
  { id: 'solutions', title: '6. Растворы и pH', emoji: '💧', content: 'pH — мера кислотности. pH < 7 — кислая среда, pH = 7 — нейтральная, pH > 7 — щелочная. Молярная концентрация C = n/V (моль/л). Массовая доля ω = m(в-ва)/m(р-ра).' },
  { id: 'redox', title: '7. ОВР', emoji: '⚖️', content: 'Окислительно-восстановительные реакции — перенос электронов. Окислитель принимает e⁻ (восстанавливается), восстановитель отдаёт e⁻ (окисляется). Метод электронного баланса.' },
  { id: 'organic', title: '8. Органическая химия', emoji: '🌿', content: 'Основа — углерод. Алканы (CₙH₂ₙ₊₂), алкены (CₙH₂ₙ), алкины (CₙH₂ₙ₋₂), арены. Функциональные группы: -OH (спирты), -COOH (кислоты), -NH₂ (амины).' },
]

export default function Theory() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">📚 Теория</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Основные разделы общей химии — кратко и по делу.</p>
      </div>

      {/* TOC */}
      <nav className="card flex flex-wrap gap-2">
        {topics.map(t => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className="text-sm px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-600 transition-colors"
          >
            {t.title}
          </a>
        ))}
      </nav>

      {/* Topics */}
      <div className="space-y-6">
        {topics.map(t => (
          <div key={t.id} id={t.id} className="card scroll-mt-20">
            <h2 className="text-xl font-semibold mb-3">{t.emoji} {t.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
