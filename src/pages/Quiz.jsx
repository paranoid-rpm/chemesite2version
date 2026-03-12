import { useState } from 'react'

const QUESTIONS = [
  { q: 'Сколько протонов в атоме кислорода?', options: ['6', '7', '8', '9'], answer: 2 },
  { q: 'Какой тип связи в молекуле NaCl?', options: ['Ковалентная полярная', 'Ионная', 'Металлическая', 'Водородная'], answer: 1 },
  { q: 'pH нейтрального раствора равен:', options: ['0', '7', '14', '1'], answer: 1 },
  { q: 'Реакция A + B → AB называется:', options: ['Разложение', 'Замещение', 'Соединение', 'Обмен'], answer: 2 },
  { q: 'Какой газ выделяется при реакции Na с водой?', options: ['O₂', 'CO₂', 'H₂', 'N₂'], answer: 2 },
  { q: 'Формула серной кислоты:', options: ['HCl', 'HNO₃', 'H₃PO₄', 'H₂SO₄'], answer: 3 },
  { q: 'В периодической таблице период — это:', options: ['Вертикальный столбец', 'Горизонтальный ряд', 'Блок f-элементов', 'Группа металлов'], answer: 1 },
  { q: 'Число Авогадро приблизительно равно:', options: ['6.02×10²³', '3.14×10¹⁰', '9.8×10²', '1.67×10⁻²⁷'], answer: 0 },
  { q: 'Окислитель в ОВР:', options: ['Отдаёт электроны', 'Принимает электроны', 'Не меняет степень окисления', 'Является катализатором'], answer: 1 },
  { q: 'Алканы — это углеводороды с формулой:', options: ['CₙH₂ₙ', 'CₙH₂ₙ₋₂', 'CₙH₂ₙ₊₂', 'CₙHₙ'], answer: 2 },
  { q: 'Какой индикатор краснеет в кислоте?', options: ['Фенолфталеин', 'Лакмус', 'Метиловый оранжевый', 'Бромтимоловый синий'], answer: 1 },
  { q: 'Молярная масса воды (H₂O):', options: ['16 г/моль', '18 г/моль', '20 г/моль', '10 г/моль'], answer: 1 },
]

const LEVELS = [
  { id: 'easy', label: '🟢 Лёгкий', count: 5 },
  { id: 'medium', label: '🟡 Средний', count: 8 },
  { id: 'hard', label: '🔴 Сложный', count: 12 },
]

export default function Quiz() {
  const [level, setLevel] = useState(null)
  const [questions, setQuestions] = useState([])
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const start = (lvl) => {
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, lvl.count)
    setQuestions(shuffled)
    setLevel(lvl)
    setIdx(0)
    setSelected(null)
    setScore(0)
    setDone(false)
  }

  const choose = (i) => {
    if (selected !== null) return
    setSelected(i)
    if (i === questions[idx].answer) setScore(s => s + 1)
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true)
      else { setIdx(i => i + 1); setSelected(null) }
    }, 900)
  }

  const pct = Math.round((score / (questions.length || 1)) * 100)
  const medal = pct >= 90 ? '🏆' : pct >= 70 ? '👍' : pct >= 50 ? '📚' : '💪'

  if (!level) return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">🧠 Квиз</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Выбери уровень сложности и проверь знания.</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 max-w-xl">
        {LEVELS.map(l => (
          <button key={l.id} onClick={() => start(l)} className="card hover:border-indigo-400 border-2 border-transparent text-center space-y-1">
            <div className="text-2xl">{l.label.split(' ')[0]}</div>
            <div className="font-semibold">{l.label.split(' ')[1]}</div>
            <div className="text-xs text-gray-500">{l.count} вопросов</div>
          </button>
        ))}
      </div>
    </div>
  )

  if (done) return (
    <div className="space-y-6 max-w-md mx-auto text-center py-12">
      <div className="text-7xl">{medal}</div>
      <h2 className="text-3xl font-bold">{score}/{questions.length}</h2>
      <p className="text-gray-500">{pct}% правильных ответов</p>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <div className="bg-indigo-500 h-3 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <button onClick={() => setLevel(null)} className="btn-primary">Сыграть ещё раз</button>
    </div>
  )

  const q = questions[idx]
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Вопрос {idx + 1} / {questions.length}</span>
        <span>✅ {score}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
        <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${((idx) / questions.length) * 100}%` }} />
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold leading-snug">{q.q}</h2>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {q.options.map((opt, i) => {
          let cls = 'card border-2 text-left cursor-pointer '
          if (selected !== null) {
            if (i === q.answer) cls += 'border-green-500 bg-green-50 dark:bg-green-900/20'
            else if (i === selected) cls += 'border-red-500 bg-red-50 dark:bg-red-900/20'
            else cls += 'border-transparent opacity-50'
          } else {
            cls += 'border-transparent hover:border-indigo-400'
          }
          return <button key={i} onClick={() => choose(i)} className={cls}>{opt}</button>
        })}
      </div>
    </div>
  )
}
