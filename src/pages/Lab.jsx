import { useState, useRef } from 'react'

const REAGENTS = [
  { id: 'HCl', label: 'HCl', name: 'Соляная кислота', color: '#fde68a', emoji: '🟡' },
  { id: 'NaOH', label: 'NaOH', name: 'Гидроксид натрия', color: '#bbf7d0', emoji: '🟢' },
  { id: 'H2SO4', label: 'H₂SO₄', name: 'Серная кислота', color: '#fca5a5', emoji: '🔴' },
  { id: 'BaCl2', label: 'BaCl₂', name: 'Хлорид бария', color: '#e9d5ff', emoji: '🟣' },
  { id: 'Na', label: 'Na', name: 'Натрий', color: '#fed7aa', emoji: '🟠' },
  { id: 'H2O', label: 'H₂O', name: 'Вода', color: '#bae6fd', emoji: '🟦' },
  { id: 'CuSO4', label: 'CuSO₄', name: 'Сульфат меди', color: '#a5f3fc', emoji: '🟦' },
  { id: 'Fe', label: 'Fe', name: 'Железо', color: '#d1d5db', emoji: '⚪' },
  { id: 'AgNO3', label: 'AgNO₃', name: 'Нитрат серебра', color: '#f3f4f6', emoji: '⚪' },
  { id: 'CO2', label: 'CO₂', name: 'Углекислый газ', color: '#e5e7eb', emoji: '💨' },
  { id: 'Ca(OH)2', label: 'Ca(OH)₂', name: 'Известковая вода', color: '#fef9c3', emoji: '🟡' },
  { id: 'Zn', label: 'Zn', name: 'Цинк', color: '#e0e7ff', emoji: '🟣' },
]

const REACTIONS = [
  {
    a: 'HCl', b: 'NaOH',
    result: 'NaCl + H₂O',
    type: 'Нейтрализация',
    effect: 'heat',
    resultColor: '#dbeafe',
    desc: 'Кислота реагирует со щёлочью. Выделяется тепло, раствор становится нейтральным.',
    emoji: '🌪️',
  },
  {
    a: 'H2SO4', b: 'BaCl2',
    result: 'BaSO₄↓ + 2HCl',
    type: 'Осадок',
    effect: 'precipitate',
    resultColor: '#f1f5f9',
    desc: 'Образуется белый нерастворимый осадок сульфата бария.',
    emoji: '🌨️',
  },
  {
    a: 'Na', b: 'H2O',
    result: 'NaOH + H₂↑',
    type: 'Бурная реакция',
    effect: 'explosion',
    resultColor: '#fef3c7',
    desc: 'Натрий бурно реагирует с водой. Выделяется водород, реакция экзотермическая.',
    emoji: '💥',
  },
  {
    a: 'CuSO4', b: 'Fe',
    result: 'FeSO₄ + Cu↓',
    type: 'Замещение',
    effect: 'precipitate',
    resultColor: '#fcd34d',
    desc: 'Железо вытесняет медь. На поверхности железа осаждается красная медь.',
    emoji: '🟤',
  },
  {
    a: 'AgNO3', b: 'HCl',
    result: 'AgCl↓ + HNO₃',
    type: 'Осадок',
    effect: 'precipitate',
    resultColor: '#f8fafc',
    desc: 'Творожистый белый осадок хлорида серебра. Качественная реакция на Cl⁻.',
    emoji: '⚪',
  },
  {
    a: 'CO2', b: 'Ca(OH)2',
    result: 'CaCO₃↓ + H₂O',
    type: 'Осадок',
    effect: 'precipitate',
    resultColor: '#f0fdf4',
    desc: 'Помутнение известковой воды. Белый осадок карбоната кальция.',
    emoji: '🥛',
  },
  {
    a: 'Zn', b: 'HCl',
    result: 'ZnCl₂ + H₂↑',
    type: 'Газ',
    effect: 'bubbles',
    resultColor: '#f0f9ff',
    desc: 'Цинк растворяется в кислоте с выделением водорода.',
    emoji: '🫧',
  },
  {
    a: 'Na', b: 'HCl',
    result: 'NaCl + H₂↑',
    type: 'Бурная реакция',
    effect: 'explosion',
    resultColor: '#fff7ed',
    desc: 'Натрий вытесняет водород из кислоты. Бурная реакция с выделением тепла.',
    emoji: '💥',
  },
  {
    a: 'H2SO4', b: 'NaOH',
    result: 'Na₂SO₄ + H₂O',
    type: 'Нейтрализация',
    effect: 'heat',
    resultColor: '#eff6ff',
    desc: 'Серная кислота нейтрализуется щёлочью. Сильный разогрев, pH стремится к 7.',
    emoji: '🌪️',
  },
]

function Bubble({ style }) {
  return (
    <div
      className="absolute rounded-full bg-white/40 animate-bounce"
      style={style}
    />
  )
}

function FlaskAnimation({ effect, color }) {
  const bubbles = Array.from({ length: 8 }, (_, i) => ({
    width: `${6 + Math.random() * 10}px`,
    height: `${6 + Math.random() * 10}px`,
    left: `${10 + i * 10}%`,
    bottom: `${10 + Math.random() * 40}%`,
    animationDelay: `${i * 0.15}s`,
    animationDuration: `${0.6 + Math.random() * 0.6}s`,
  }))

  return (
    <div
      className="relative w-28 h-28 rounded-full flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-700"
      style={{ background: color }}
    >
      {effect === 'bubbles' && bubbles.map((s, i) => <Bubble key={i} style={s} />)}
      {effect === 'explosion' && (
        <div className="absolute inset-0 animate-ping rounded-full bg-orange-300/40" />
      )}
      {effect === 'precipitate' && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/60 rounded-full blur-sm animate-pulse" />
      )}
      {effect === 'heat' && (
        <div className="absolute inset-0 rounded-full animate-pulse bg-yellow-200/30" />
      )}
      <span className="text-4xl z-10 select-none">⚗️</span>
    </div>
  )
}

export default function Lab() {
  const [dropped, setDropped] = useState([])
  const [reaction, setReaction] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [shake, setShake] = useState(false)
  const [draggingId, setDraggingId] = useState(null)
  const [draggingOver, setDraggingOver] = useState(false)
  const dropZoneRef = useRef(null)

  const flaskColor = reaction
    ? reaction.resultColor
    : dropped.length === 0
    ? 'rgba(99,102,241,0.08)'
    : dropped.length === 1
    ? REAGENTS.find(r => r.id === dropped[0])?.color || '#e0e7ff'
    : '#d1fae5'

  const handleDragStart = (e, id) => {
    setDraggingId(id)
    e.dataTransfer.setData('reagentId', id)
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDraggingOver(false)
    const id = e.dataTransfer.getData('reagentId')
    if (!id) return
    if (dropped.includes(id)) return
    if (dropped.length >= 2) return

    const next = [...dropped, id]
    setDropped(next)

    if (next.length === 2) {
      setAnimating(true)
      setTimeout(() => {
        const found = REACTIONS.find(
          r => (r.a === next[0] && r.b === next[1]) || (r.a === next[1] && r.b === next[0])
        )
        setReaction(found || { result: 'Нет реакции', type: '', effect: 'none', resultColor: '#f3f4f6', desc: 'Эти вещества не реагируют друг с другом.', emoji: '🤔' })
        setAnimating(false)
      }, 800)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDraggingOver(true)
  }

  const handleDragLeave = () => setDraggingOver(false)

  const reset = () => {
    setDropped([])
    setReaction(null)
    setAnimating(false)
    setShake(false)
  }

  const handleFlaskClick = () => {
    if (dropped.length === 2 && reaction) {
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">⚗️ Лаборатория</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Перетащивай реагенты в колбу и наблюдай за реакцией.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Reagent panel */}
        <div className="lg:w-72 shrink-0">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Реагенты</h2>
          <div className="grid grid-cols-3 lg:grid-cols-2 gap-2">
            {REAGENTS.map(r => (
              <div
                key={r.id}
                draggable
                onDragStart={e => handleDragStart(e, r.id)}
                onDragEnd={() => setDraggingId(null)}
                className={`
                  card p-2 text-center cursor-grab active:cursor-grabbing select-none
                  border-2 transition-all duration-150
                  ${draggingId === r.id ? 'opacity-50 scale-95' : 'hover:border-indigo-400 hover:scale-105'}
                  ${dropped.includes(r.id) ? 'opacity-40 cursor-not-allowed' : ''}
                `}
                style={{ borderColor: dropped.includes(r.id) ? '#6366f1' : undefined }}
                title={r.name}
              >
                <div className="text-lg">{r.emoji}</div>
                <div className="font-mono font-bold text-sm">{r.label}</div>
                <div className="text-[10px] text-gray-400 truncate">{r.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Lab workspace */}
        <div className="flex-1 flex flex-col items-center gap-6">

          {/* Drop zone */}
          <div
            ref={dropZoneRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`
              w-full min-h-[260px] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-6 transition-all duration-200 relative
              ${draggingOver
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 scale-[1.01]'
                : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50'
              }
            `}
          >
            {/* Dropped reagents */}
            <div className="flex items-center gap-4">
              {dropped.map((id, i) => {
                const r = REAGENTS.find(x => x.id === id)
                return (
                  <div key={id} className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-md font-mono font-bold text-gray-700"
                      style={{ background: r?.color }}
                    >
                      {r?.label}
                    </div>
                    {i === 0 && dropped.length === 2 && (
                      <span className="text-2xl text-gray-400">+</span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Flask */}
            <div
              onClick={handleFlaskClick}
              className={`cursor-pointer transition-transform ${shake ? 'animate-bounce' : ''}`}
            >
              {animating ? (
                <div className="w-28 h-28 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center animate-pulse">
                  <span className="text-4xl">⏳</span>
                </div>
              ) : (
                <FlaskAnimation
                  effect={reaction?.effect || 'none'}
                  color={flaskColor}
                />
              )}
            </div>

            {dropped.length === 0 && (
              <p className="text-gray-400 text-sm absolute bottom-4">
                ↑ Перетащивай два реагента сюда
              </p>
            )}
          </div>

          {/* Result card */}
          {reaction && !animating && (
            <div
              className="w-full card border-2 space-y-3 transition-all duration-500"
              style={{ borderColor: reaction.effect === 'explosion' ? '#f97316' : '#6366f1' }}
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl">{reaction.emoji}</span>
                <div>
                  <div className="font-mono font-bold text-lg">
                    {dropped[0]} + {dropped[1]} → {reaction.result}
                  </div>
                  {reaction.type && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                      {reaction.type}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{reaction.desc}</p>
            </div>
          )}

          {dropped.length > 0 && (
            <button onClick={reset} className="btn-ghost text-sm">
              🗑️ Очистить колбу
            </button>
          )}
        </div>
      </div>

      {/* Hint table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">📖 Все доступные реакции</h2>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {REACTIONS.map((r, i) => (
            <button
              key={i}
              onClick={() => {
                setDropped([r.a, r.b])
                setAnimating(true)
                setTimeout(() => { setReaction(r); setAnimating(false) }, 600)
              }}
              className="card text-left text-sm hover:border-indigo-400 border-2 border-transparent"
            >
              <div className="flex items-center gap-2 mb-1">
                <span>{r.emoji}</span>
                <span className="font-mono font-semibold">{r.a} + {r.b}</span>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">{r.type} → {r.result}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
