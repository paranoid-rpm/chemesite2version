import { useState } from 'react'

const QUESTIONS = [
  { q: 'Сколько протонов в атоме кислорода?', options: ['6', '7', '8', '9'], answer: 2 },
  { q: 'Какой тип связи в молекуле NaCl?', options: ['Неполярная ковалентная', 'Ионная', 'Металлическая', 'Водородная'], answer: 1 },
  { q: 'pH нейтрального раствора при 25°C:', options: ['0', '7', '14', '1'], answer: 1 },
  { q: 'Реакция A + B → AB называется:', options: ['Разложение', 'Замещение', 'Соединение', 'Обмен'], answer: 2 },
  { q: 'Какой газ выделяется при реакции Na с водой?', options: ['O₂', 'CO₂', 'H₂', 'N₂'], answer: 2 },
  { q: 'Формула серной кислоты:', options: ['HCl', 'HNO₃', 'H₃PO₄', 'H₂SO₄'], answer: 3 },
  { q: 'В периодической таблице период — это:', options: ['Вертикальный столбец', 'Горизонтальный ряд', 'Блок f-элементов', 'Группа металлов'], answer: 1 },
  { q: 'Число Авогадро приблизительно равно:', options: ['6.02×10²³', '3.14×10¹⁰', '9.8×10²', '1.67×10⁻²⁷'], answer: 0 },
  { q: 'Окислитель в ОВР:', options: ['Отдаёт электроны', 'Принимает электроны', 'Не меняет СО', 'Катализатор'], answer: 1 },
  { q: 'Алканы — общая формула:', options: ['CₙH₂ₙ', 'CₙH₂ₙ₋₂', 'CₙH₂ₙ₊₂', 'CₙHₙ'], answer: 2 },
  { q: 'Какой индикатор краснеет в кислоте?', options: ['Фенолфталеин', 'Лакмус', 'Метиловый оранжевый', 'Бромтимоловый синий'], answer: 1 },
  { q: 'Молярная масса воды (H₂O):', options: ['16 г/моль', '18 г/моль', '20 г/моль', '10 г/моль'], answer: 1 },
  { q: 'Электроотрицательность растёт в направлении:', options: ['Низ и лево', 'Низ и право', 'Вверх и лево', 'Вверх и право'], answer: 3 },
  { q: 'Какой заряд имеет электрон?', options: ['+1', '0', '−1', '+2'], answer: 2 },
  { q: 'Какая из кислот является сильной?', options: ['CH₃COOH', 'HF', 'H₂CO₃', 'HCl'], answer: 3 },
  { q: 'Принцип Ле Шателье относится к:', options: ['Скорости реакции', 'Системам в равновесии', 'Только к кислотам', 'Ионным соединениям'], answer: 1 },
  { q: 'Гибридизация в этилене (C₂H₄):', options: ['sp', 'sp²', 'sp³', 'sp³d'], answer: 1 },
  { q: 'Функциональная группа –COOH называется:', options: ['Спирт', 'Ефир', 'Карбоновая кислота', 'Амин'], answer: 2 },
  { q: 'Буферный раствор сопротивляется изменению:', options: ['Температуры', 'Давления', 'pH', 'Концентрации'], answer: 2 },
  { q: 'Изотопы отличаются по числу:', options: ['Протонов', 'Электронов', 'Нейтронов', 'Кварков'], answer: 2 },
]

const LEVELS = [
  { id: 'easy', label: 'Начальный', count: 6, desc: 'Базовые понятия' },
  { id: 'medium', label: 'Средний', count: 12, desc: 'Глубже в тему' },
  { id: 'hard', label: 'Продвинутый', count: 20, desc: 'Полное покрытие' },
]

export default function Quiz() {
  const [level, setLevel] = useState(null)
  const [questions, setQuestions] = useState([])
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const start = (lvl) => {
    setQuestions([...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, lvl.count))
    setLevel(lvl); setIdx(0); setSelected(null); setScore(0); setDone(false)
  }

  const choose = (i) => {
    if (selected !== null) return
    setSelected(i)
    if (i === questions[idx].answer) setScore(s => s + 1)
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true)
      else { setIdx(n => n + 1); setSelected(null) }
    }, 1000)
  }

  const pct = Math.round((score / (questions.length || 1)) * 100)

  if (!level) return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
      <div style={{ padding: '48px 0 40px' }} className="fade-up">
        <p className="section-label" style={{ marginBottom: 12 }}>Самопроверка</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em' }}>Квиз</h1>
        <p style={{ color: 'var(--text2)', marginTop: 8, fontSize: '0.9rem' }}>Выберите уровень сложности.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', background: 'var(--border)', maxWidth: 560 }}>
        {LEVELS.map((l, i) => (
          <button key={l.id} onClick={() => start(l)} className={`fade-up delay-${i + 1}`}
            style={{ background: 'var(--bg)', border: 'none', padding: '2rem 1.5rem', cursor: 'pointer', textAlign: 'left', color: 'var(--text)', transition: 'background 0.2s ease' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}
          >
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--text3)', marginBottom: 8 }}>0{i + 1}</div>
            <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 4 }}>{l.label}</div>
            <div style={{ color: 'var(--text3)', fontSize: '0.78rem', marginBottom: 8 }}>{l.desc}</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--text2)' }}>{l.count} вопросов</div>
          </button>
        ))}
      </div>
    </div>
  )

  if (done) return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '80px 1.5rem', textAlign: 'center' }} className="fade-up">
      <p className="section-label" style={{ marginBottom: 16 }}>Результат</p>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '4rem', fontWeight: 700, letterSpacing: '-0.04em' }}>
        {score}<span style={{ color: 'var(--text3)' }}>/{questions.length}</span>
      </div>
      <div style={{ color: 'var(--text2)', marginTop: 8, fontSize: '0.9rem' }}>{pct}% правильных ответов</div>
      <div style={{ margin: '2rem auto', height: 2, background: 'var(--border)', maxWidth: 320, borderRadius: 99 }}>
        <div style={{ height: '100%', background: 'var(--text)', borderRadius: 99, width: `${pct}%`, transition: 'width 1s ease' }} />
      </div>
      <p style={{ color: 'var(--text2)', fontSize: '0.85rem', marginBottom: '2rem' }}>
        {pct >= 90 ? 'Отлично. Глубокое понимание материала.' : pct >= 70 ? 'Хорошо. Повтори слабые места.' : pct >= 50 ? 'Удовлетворительно. Вернись к теории.' : 'Нужно больше практики. Начни с раздела Теория.'}
      </p>
      <button onClick={() => setLevel(null)} className="btn btn-primary">Попробовать снова</button>
    </div>
  )

  const q = questions[idx]
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text3)' }}>{idx + 1} / {questions.length}</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text3)' }}>Счёт: {score}</span>
      </div>
      <div style={{ height: 2, background: 'var(--border)', borderRadius: 99, marginBottom: '2.5rem' }}>
        <div style={{ height: '100%', background: 'var(--text)', borderRadius: 99, width: `${(idx / questions.length) * 100}%`, transition: 'width 0.4s ease' }} />
      </div>
      <div key={idx} className="fade-up">
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '2rem', lineHeight: 1.45 }}>{q.q}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {q.options.map((opt, i) => {
            let bg = 'var(--bg2)', border = 'var(--border)', color = 'var(--text)'
            if (selected !== null) {
              if (i === q.answer) { bg = 'var(--text)'; color = 'var(--bg)'; border = 'var(--text)' }
              else if (i === selected) { color = 'var(--text3)'; border = 'var(--text3)' }
              else { color = 'var(--text3)'; bg = 'var(--bg)' }
            }
            return (
              <button key={i} onClick={() => choose(i)} style={{
                textAlign: 'left', padding: '0.875rem 1.25rem', borderRadius: 10,
                border: `1px solid ${border}`, background: bg, color,
                cursor: selected !== null ? 'default' : 'pointer',
                fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 12,
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { if (selected === null) e.currentTarget.style.borderColor = 'var(--text)' }}
                onMouseLeave={e => { if (selected === null) e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: selected !== null && i === q.answer ? 'var(--bg)' : 'var(--text3)', minWidth: 18 }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
