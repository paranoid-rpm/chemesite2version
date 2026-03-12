import { useState } from 'react'

const REACTIONS = [
  { a: 'HCl', b: 'NaOH', result: 'NaCl + H₂O', type: 'нейтрализация', color: 'bg-blue-100 dark:bg-blue-900/30', emoji: '💧', desc: 'Кислота реагирует со щёлочью. Выделяется тепло, раствор становится нейтральным.' },
  { a: 'H₂SO₄', b: 'BaCl₂', result: 'BaSO₄↓ + 2HCl', type: 'обмен', color: 'bg-gray-100 dark:bg-gray-800', emoji: '🌨️', desc: 'Образуется белый осадок сульфата бария, нерастворимый в воде.' },
  { a: 'Na', b: 'H₂O', result: 'NaOH + H₂↑', type: 'замещение', color: 'bg-yellow-100 dark:bg-yellow-900/30', emoji: '💥', desc: 'Натрий бурно реагирует с водой. Выделяется водород, реакция экзотермическая.' },
  { a: 'CuSO₄', b: 'Fe', result: 'FeSO₄ + Cu↓', type: 'замещение', color: 'bg-orange-100 dark:bg-orange-900/30', emoji: '🟤', desc: 'Железо вытесняет медь из раствора. На поверхности железа осаждается красная медь.' },
  { a: 'CO₂', b: 'NaOH', result: 'Na₂CO₃ + H₂O', type: 'соединение', color: 'bg-green-100 dark:bg-green-900/30', emoji: '🌿', desc: 'Углекислый газ поглощается щёлочью с образованием соды.' },
  { a: 'AgNO₃', b: 'HCl', result: 'AgCl↓ + HNO₃', type: 'обмен', color: 'bg-purple-100 dark:bg-purple-900/30', emoji: '⚪', desc: 'Качественная реакция на хлорид-ион. Творожистый белый осадок хлорида серебра.' },
  { a: 'Zn', b: 'HCl', result: 'ZnCl₂ + H₂↑', type: 'замещение', color: 'bg-cyan-100 dark:bg-cyan-900/30', emoji: '🫧', desc: 'Цинк растворяется в кислоте с выделением водорода — характерное шипение.' },
  { a: 'Ca(OH)₂', b: 'CO₂', result: 'CaCO₃↓ + H₂O', type: 'соединение', color: 'bg-lime-100 dark:bg-lime-900/30', emoji: '🥛', desc: 'Помутнение известковой воды — качественная реакция на CO₂.' },
]

const reagents = [...new Set(REACTIONS.flatMap(r => [r.a, r.b]))]

export default function Lab() {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [reaction, setReaction] = useState(null)
  const [animating, setAnimating] = useState(false)

  const mix = () => {
    const found = REACTIONS.find(r => (r.a === a && r.b === b) || (r.a === b && r.b === a))
    setAnimating(true)
    setTimeout(() => {
      setReaction(found || null)
      setAnimating(false)
    }, 600)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">⚗️ Лаборатория</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Выбери два реагента и посмотри что произойдёт.</p>
      </div>

      <div className="card max-w-lg mx-auto space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {[['Реагент A', a, setA], ['Реагент B', b, setB]].map(([label, val, setter]) => (
            <div key={label}>
              <label className="text-sm text-gray-500 mb-1 block">{label}</label>
              <select
                value={val}
                onChange={e => { setter(e.target.value); setReaction(null) }}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">— выбери —</option>
                {reagents.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          ))}
        </div>

        <button
          onClick={mix}
          disabled={!a || !b}
          className="w-full btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {animating ? '⏳ Реакция...' : '🧪 Смешать'}
        </button>

        {!animating && reaction && (
          <div className={`rounded-xl p-5 space-y-2 ${reaction.color} border border-transparent transition-all`}>
            <div className="text-3xl">{reaction.emoji}</div>
            <div className="font-mono font-semibold text-lg">{a} + {b} → {reaction.result}</div>
            <span className="inline-block text-xs px-2 py-0.5 bg-white/50 dark:bg-black/20 rounded-full">{reaction.type}</span>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{reaction.desc}</p>
          </div>
        )}

        {!animating && a && b && !reaction && (
          <div className="text-center text-gray-400 py-4">😕 Реакция между этими веществами не найдена</div>
        )}
      </div>

      {/* All reactions list */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Все реакции в базе</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {REACTIONS.map((r, i) => (
            <button
              key={i}
              onClick={() => { setA(r.a); setB(r.b); setReaction(r) }}
              className={`card text-left text-sm hover:border-indigo-400 ${r.color}`}
            >
              <div className="font-mono font-semibold">{r.a} + {r.b} → {r.result}</div>
              <div className="text-xs text-gray-500 mt-1">{r.type}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
