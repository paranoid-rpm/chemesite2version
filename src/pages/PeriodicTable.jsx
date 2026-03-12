import { useState } from 'react'
import { ELEMENTS } from '../data/elements'

const GROUP_COLORS = {
  'щелочной металл': 'bg-red-100 dark:bg-red-900/40 border-red-300 dark:border-red-700',
  'щёлочноземельный металл': 'bg-orange-100 dark:bg-orange-900/40 border-orange-300 dark:border-orange-700',
  'переходный металл': 'bg-yellow-100 dark:bg-yellow-900/40 border-yellow-300 dark:border-yellow-700',
  'металлоид': 'bg-lime-100 dark:bg-lime-900/40 border-lime-300 dark:border-lime-700',
  'неметалл': 'bg-green-100 dark:bg-green-900/40 border-green-300 dark:border-green-700',
  'галоген': 'bg-teal-100 dark:bg-teal-900/40 border-teal-300 dark:border-teal-700',
  'благородный газ': 'bg-cyan-100 dark:bg-cyan-900/40 border-cyan-300 dark:border-cyan-700',
  'лантаноид': 'bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700',
  'актиноид': 'bg-purple-100 dark:bg-purple-900/40 border-purple-300 dark:border-purple-700',
  'постпереходный металл': 'bg-pink-100 dark:bg-pink-900/40 border-pink-300 dark:border-pink-700',
}

function ElementCard({ el, onClick }) {
  const color = GROUP_COLORS[el.category] || 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700'
  return (
    <button
      onClick={() => onClick(el)}
      className={`border rounded-lg p-1 text-center cursor-pointer hover:scale-110 hover:z-10 transition-transform duration-150 ${color}`}
      style={{ gridColumn: el.col, gridRow: el.row }}
      title={el.name}
    >
      <div className="text-[9px] text-gray-500 dark:text-gray-400">{el.number}</div>
      <div className="text-sm font-bold leading-none">{el.symbol}</div>
      <div className="text-[8px] truncate text-gray-600 dark:text-gray-300">{el.name}</div>
    </button>
  )
}

export default function PeriodicTable() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('все')

  const categories = ['все', ...new Set(ELEMENTS.map(e => e.category))]
  const filtered = filter === 'все' ? ELEMENTS : ELEMENTS.filter(e => e.category === filter)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">🧬 Таблица Менделеева</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Кликни на элемент, чтобы узнать о нём подробнее.</p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
              filter === c
                ? 'bg-indigo-500 text-white border-indigo-500'
                : 'border-gray-300 dark:border-gray-700 hover:border-indigo-400'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Table grid */}
      <div
        className="overflow-x-auto"
      >
        <div
          className="grid gap-0.5"
          style={{ gridTemplateColumns: 'repeat(18, minmax(40px, 1fr))', gridTemplateRows: 'repeat(10, 52px)' }}
        >
          {filtered.map(el => (
            <ElementCard key={el.number} el={el} onClick={setSelected} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-7xl font-black text-indigo-500">{selected.symbol}</span>
                <p className="text-2xl font-semibold mt-1">{selected.name}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ['Номер', selected.number],
                ['Масса', selected.mass],
                ['Период', selected.period],
                ['Группа', selected.group],
                ['Фаза', selected.phase],
                ['Категория', selected.category],
                ['Год открытия', selected.discovered],
                ['Конфигурация', selected.config],
              ].map(([k, v]) => (
                <div key={k} className="bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2">
                  <div className="text-xs text-gray-500">{k}</div>
                  <div className="font-medium">{v}</div>
                </div>
              ))}
            </div>
            {selected.description && (
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{selected.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
