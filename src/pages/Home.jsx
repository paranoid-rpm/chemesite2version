import { Link } from 'react-router-dom'

const sections = [
  {
    to: '/theory',
    emoji: '📚',
    title: 'Теория',
    desc: 'Строение атома, реакции, связи, органика — всё по порядку и понятно.',
    color: 'from-blue-500/10 to-indigo-500/10',
    border: 'hover:border-indigo-400',
  },
  {
    to: '/periodic',
    emoji: '🧬',
    title: 'Таблица Менделеева',
    desc: 'Все 118 элементов. Кликни на любой — увидишь полную карточку с данными.',
    color: 'from-emerald-500/10 to-teal-500/10',
    border: 'hover:border-emerald-400',
  },
  {
    to: '/lab',
    emoji: '⚗️',
    title: 'Лаборатория',
    desc: 'Смешивай реагенты виртуально и наблюдай за реакциями с анимацией.',
    color: 'from-orange-500/10 to-amber-500/10',
    border: 'hover:border-orange-400',
  },
  {
    to: '/quiz',
    emoji: '🧠',
    title: 'Квиз',
    desc: 'Проверь знания. Несколько уровней сложности, таймер и статистика.',
    color: 'from-purple-500/10 to-pink-500/10',
    border: 'hover:border-purple-400',
  },
]

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center py-16 space-y-4">
        <h1 className="text-5xl font-bold tracking-tight">
          Общая <span className="text-indigo-500">химия</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Интерактивный справочник для любого уровня — от школьника до студента.
        </p>
        <Link to="/theory" className="btn-primary inline-block mt-4">
          Начать изучение →
        </Link>
      </section>

      {/* Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {sections.map(({ to, emoji, title, desc, color, border }) => (
          <Link
            key={to}
            to={to}
            className={`card bg-gradient-to-br ${color} border-2 border-transparent ${border} group`}
          >
            <div className="text-4xl mb-3">{emoji}</div>
            <h2 className="text-xl font-semibold mb-1 group-hover:text-indigo-500 transition-colors">{title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
          </Link>
        ))}
      </section>
    </div>
  )
}
