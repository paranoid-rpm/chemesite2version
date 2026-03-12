import { useState } from 'react'

// Реагенты
const REAGENTS = [
  { id: 'HCl', label: 'HCl', name: 'Соляная кислота' },
  { id: 'NaOH', label: 'NaOH', name: 'Гидроксид натрия' },
  { id: 'H2SO4', label: 'H₂SO₄', name: 'Серная кислота' },
  { id: 'BaCl2', label: 'BaCl₂', name: 'Хлорид бария' },
  { id: 'Na', label: 'Na', name: 'Натрий (металл)' },
  { id: 'H2O', label: 'H₂O', name: 'Вода' },
  { id: 'CuSO4', label: 'CuSO₄', name: 'Сульфат меди' },
  { id: 'Fe', label: 'Fe', name: 'Железо' },
  { id: 'AgNO3', label: 'AgNO₃', name: 'Нитрат серебра' },
  { id: 'CO2', label: 'CO₂', name: 'Углекислый газ' },
  { id: 'Ca(OH)2', label: 'Ca(OH)₂', name: 'Известковая вода' },
  { id: 'Zn', label: 'Zn', name: 'Цинк' },
  { id: 'C', label: 'C', name: 'Уголь' },
  { id: 'O2', label: 'O₂', name: 'Кислород' },
  { id: 'CH4', label: 'CH₄', name: 'Метан' },
  { id: 'KMnO4', label: 'KMnO₄', name: 'Перманганат калия' },
]

// Условия проведения реакций
const CONDITIONS = [
  { id: 'burner', label: 'Горелка', desc: 'Нагрев' },
  { id: 'catalyst', label: 'Cat', desc: 'Катализатор' },
  { id: 'light', label: 'hν', desc: 'УФ-свет' },
  { id: 'pressure', label: 'P', desc: 'Давление' },
]

// База реакций с условиями
// condition: нужное условие | null = без условий
const REACTIONS = [
  { a: 'HCl', b: 'NaOH', condition: null, result: 'NaCl + H₂O', type: 'Нейтрализация', effect: 'heat',
    desc: 'Кислота + щёлочь. Тепло выделяется. pH раствора ≈ 7. HCl + NaOH → NaCl + H₂O' },
  { a: 'H2SO4', b: 'BaCl2', condition: null, result: 'BaSO₄↓ + 2HCl', type: 'Осадок', effect: 'precipitate',
    desc: 'Белый нерастворимый осадок BaSO₄. Качественная реакция на SO₄²⁻.' },
  { a: 'Na', b: 'H2O', condition: null, result: 'NaOH + H₂↑', type: 'Бурная', effect: 'explosion',
    desc: 'Натрий бурно реагирует с водой. H₂ выделяется, сильно экзотермическая. 2Na + 2H₂O → 2NaOH + H₂↑' },
  { a: 'CuSO4', b: 'Fe', condition: null, result: 'FeSO₄ + Cu↓', type: 'Замещение', effect: 'precipitate',
    desc: 'Железо вытесняет медь. На поверхности железа осаждается медь.' },
  { a: 'AgNO3', b: 'HCl', condition: null, result: 'AgCl↓ + HNO₃', type: 'Осадок', effect: 'precipitate',
    desc: 'Творожистый белый осадок AgCl. Качественная реакция на Cl⁻.' },
  { a: 'CO2', b: 'Ca(OH)2', condition: null, result: 'CaCO₃↓ + H₂O', type: 'Осадок', effect: 'precipitate',
    desc: 'Помутнение известковой воды. Белый осадок CaCO₃.' },
  { a: 'Zn', b: 'HCl', condition: null, result: 'ZnCl₂ + H₂↑', type: 'Выделение газа', effect: 'bubbles',
    desc: 'Цинк растворяется в кислоте, выделяется H₂.' },
  { a: 'H2SO4', b: 'NaOH', condition: null, result: 'Na₂SO₄ + H₂O', type: 'Нейтрализация', effect: 'heat',
    desc: 'Серная кислота + щёлочь. Сильное тепловыделение.' },
  // Реакции, требующие условий
  { a: 'C', b: 'O2', condition: 'burner', result: 'CO₂', type: 'Горение', effect: 'explosion',
    desc: 'Горение угля в кислороде. Требует поджига: если убрать горелку — горение прекращается. C + O₂ → CO₂' },
  { a: 'CH4', b: 'O2', condition: 'burner', result: 'CO₂ + H₂O', type: 'Горение', effect: 'explosion',
    desc: 'Сжигание метана. Нужен поджиг. CH₄ + 2O₂ → CO₂ + 2H₂O' },
  { a: 'KMnO4', b: 'H2SO4', condition: 'burner', result: 'K₂SO₄ + MnSO₄ + O₂↑', type: 'Разложение', effect: 'bubbles',
    desc: 'Разложение KMnO₄ при нагревании с H₂SO₄. Выделяется кислород.' },
  { a: 'Zn', b: 'H2SO4', condition: 'catalyst', result: 'ZnSO₄ + H₂↑', type: 'Замещение', effect: 'bubbles',
    desc: 'Цинк в серной кислоте (разбавленной). Нагрев ускоряет реакцию. Zn + H₂SO₄ → ZnSO₄ + H₂↑' },
  { a: 'AgNO3', b: 'H2O', condition: 'light', result: 'Ag↓ + HNO₃ + O₂↑', type: 'Фотореакция', effect: 'precipitate',
    desc: 'Разложение AgNO₃ под действием света. Осаждается металлическое серебро.' },
  { a: 'Na', b: 'O2', condition: 'burner', result: 'Na₂O₂', type: 'Горение', effect: 'explosion',
    desc: 'Горение натрия в кислороде. Образуется пероксид натрия. 2Na + O₂ → Na₂O₂' },
]

// Горелка SVG
function BurnerSVG({ active }) {
  return (
    <svg width="48" height="72" viewBox="0 0 48 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Основание */}
      <rect x="10" y="50" width="28" height="18" rx="3" fill="var(--text)" opacity="0.15" stroke="var(--text)" strokeWidth="1.2" />
      <rect x="18" y="36" width="12" height="16" rx="2" fill="var(--text)" opacity="0.2" stroke="var(--text)" strokeWidth="1.2" />
      {/* Головка */}
      <ellipse cx="24" cy="36" rx="10" ry="4" fill="var(--text)" opacity="0.3" stroke="var(--text)" strokeWidth="1.2" />
      {/* Пламя */}
      {active && (
        <>
          <path d="M24 34 Q20 25 24 18 Q28 25 24 34" fill="rgba(251,191,36,0.8)" style={{ animation: 'fadeIn 0.3s ease infinite alternate' }} />
          <path d="M24 30 Q22 24 24 20 Q26 24 24 30" fill="rgba(255,255,255,0.6)" />
          <path d="M20 32 Q16 24 20 16 Q22 22 20 32" fill="rgba(251,191,36,0.5)" style={{ animation: 'fadeIn 0.4s ease infinite alternate', animationDelay: '0.1s' }} />
          <path d="M28 32 Q32 24 28 16 Q26 22 28 32" fill="rgba(251,191,36,0.5)" style={{ animation: 'fadeIn 0.4s ease infinite alternate', animationDelay: '0.2s' }} />
        </>
      )}
    </svg>
  )
}

// Лампа UV SVG
function LightSVG({ active }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="10" fill="var(--bg2)" stroke="var(--text)" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="5" fill={active ? 'rgba(200,200,255,0.9)' : 'var(--text)'} opacity={active ? 1 : 0.3}
        style={active ? { animation: 'ping 1.2s ease infinite' } : {}} />
      {[0,45,90,135,180,225,270,315].map((a, i) => (
        <line key={i}
          x1={24 + Math.cos(a * Math.PI / 180) * 13}
          y1={24 + Math.sin(a * Math.PI / 180) * 13}
          x2={24 + Math.cos(a * Math.PI / 180) * 17}
          y2={24 + Math.sin(a * Math.PI / 180) * 17}
          stroke={active ? 'rgba(180,180,255,0.8)' : 'var(--text)'} strokeWidth="1.5" opacity={active ? 1 : 0.3}
        />
      ))}
    </svg>
  )
}

// Катализатор SVG
function CatalystSVG({ active }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="20" width="32" height="12" rx="6" fill="var(--bg2)" stroke="var(--text)" strokeWidth="1.5" />
      {[14, 20, 28, 34].map((x, i) => (
        <circle key={i} cx={x} cy="26" r="3"
          fill={active ? 'var(--text)' : 'var(--bg2)'}
          stroke="var(--text)" strokeWidth="1"
          style={active ? { animation: `fadeIn 0.3s ease ${i * 0.1}s both` } : {}}
        />
      ))}
      {active && (
        <>
          <line x1="14" y1="19" x2="14" y2="14" stroke="var(--text)" strokeWidth="1" opacity="0.5" />
          <line x1="24" y1="19" x2="24" y2="12" stroke="var(--text)" strokeWidth="1" opacity="0.5" />
          <line x1="34" y1="19" x2="34" y2="14" stroke="var(--text)" strokeWidth="1" opacity="0.5" />
        </>
      )}
      <text x="24" y="44" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono" fill="var(--text3)">cat</text>
    </svg>
  )
}

// Давление SVG
function PressureSVG({ active }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="16" fill="var(--bg2)" stroke="var(--text)" strokeWidth="1.5" />
      {active && (
        <circle cx="24" cy="24" r="10" fill="none" stroke="var(--text)" strokeWidth="1" opacity="0.5"
          style={{ animation: 'ping 1.5s ease infinite' }} />
      )}
      <text x="24" y="28" textAnchor="middle" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono"
        fill={active ? 'var(--text)' : 'var(--text3)'}>P</text>
    </svg>
  )
}

const CONDITION_SVG = {
  burner: BurnerSVG,
  light: LightSVG,
  catalyst: CatalystSVG,
  pressure: PressureSVG,
}

// Колба SVG
function FlaskSVG({ effect, active, hasBurner }) {
  return (
    <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width="110" height="130" viewBox="0 0 110 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="flask">
            <path d="M38 8 L38 52 L5 108 Q3 122 20 124 L90 124 Q107 122 105 108 L72 52 L72 8 Z" />
          </clipPath>
        </defs>
        <path d="M38 8 L38 52 L5 108 Q3 122 20 124 L90 124 Q107 122 105 108 L72 52 L72 8 Z"
          fill="var(--bg2)" stroke="var(--text)" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="36" y1="6" x2="74" y2="6" stroke="var(--text)" strokeWidth="1.5" />
        {active && (
          <rect x="0" y="75" width="110" height="55"
            fill={effect === 'explosion' ? 'rgba(250,200,50,0.25)' : effect === 'precipitate' ? 'rgba(180,180,180,0.2)' : 'rgba(160,160,255,0.15)'}
            clipPath="url(#flask)" style={{ transition: 'fill 0.6s ease' }} />
        )}
        {active && effect === 'bubbles' && [30,45,58,70].map((x, i) => (
          <circle key={i} cx={x} cy={85 + i * 7} r={2.5}
            fill="rgba(150,200,255,0.7)"
            style={{ animation: `fadeUp 1s ease infinite`, animationDelay: `${i * 0.2}s` }}
            clipPath="url(#flask)"
          />
        ))}
        {active && effect === 'precipitate' && (
          <line x1="20" y1="116" x2="90" y2="116" stroke="rgba(210,210,210,0.9)" strokeWidth="5" strokeLinecap="round"
            clipPath="url(#flask)" style={{ animation: 'fadeIn 0.8s ease both' }} />
        )}
        {active && effect === 'heat' && [14,22].map((r, i) => (
          <circle key={i} cx="55" cy="95" r={r}
            stroke="rgba(200,200,200,0.25)" strokeWidth="1" fill="none"
            style={{ animation: `ping 1.8s ease infinite`, animationDelay: `${i * 0.3}s` }}
            clipPath="url(#flask)"
          />
        ))}
        {active && effect === 'explosion' && [0,45,90,135,180,225,270,315].map((angle, i) => (
          <circle key={i}
            cx={55 + Math.cos(angle * Math.PI / 180) * 22}
            cy={90 + Math.sin(angle * Math.PI / 180) * 18}
            r={3} fill="rgba(250,190,40,0.7)" clipPath="url(#flask)"
            style={{ animation: `fadeIn 0.4s ease ${i * 0.04}s both` }}
          />
        ))}
      </svg>
      {/* Горелка под колбой */}
      {hasBurner && (
        <div style={{ marginTop: -6, animation: 'fadeIn 0.3s ease' }}>
          <BurnerSVG active={active} />
        </div>
      )}
    </div>
  )
}

export default function Lab() {
  const [dropped, setDropped] = useState([])
  const [condition, setCondition] = useState(null)
  const [reaction, setReaction] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [draggingId, setDraggingId] = useState(null)
  const [over, setOver] = useState(false)
  const [condOver, setCondOver] = useState(false)

  const handleDragStart = (e, id, type = 'reagent') => {
    if (type === 'reagent' && (dropped.includes(id) || dropped.length >= 2)) { e.preventDefault(); return }
    setDraggingId(id)
    e.dataTransfer.setData('text/plain', JSON.stringify({ id, type }))
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleDropFlask = (e) => {
    e.preventDefault()
    setOver(false)
    try {
      const { id, type } = JSON.parse(e.dataTransfer.getData('text/plain'))
      if (type === 'reagent') {
        if (!id || dropped.includes(id) || dropped.length >= 2) return
        const next = [...dropped, id]
        setDropped(next)
        if (next.length === 2) tryReact(next, condition)
      }
    } catch {}
  }

  const handleDropCondition = (e) => {
    e.preventDefault()
    setCondOver(false)
    try {
      const { id, type } = JSON.parse(e.dataTransfer.getData('text/plain'))
      if (type === 'condition') {
        setCondition(prev => prev === id ? null : id)
        if (dropped.length === 2) tryReact(dropped, id === condition ? null : id)
      }
    } catch {}
  }

  const tryReact = (reagents, cond) => {
    setAnimating(true)
    setTimeout(() => {
      const found = REACTIONS.find(r =>
        ((r.a === reagents[0] && r.b === reagents[1]) || (r.a === reagents[1] && r.b === reagents[0])) &&
        r.condition === cond
      )
      // Если нужно условие, но его нет
      const needsCond = REACTIONS.find(r =>
        ((r.a === reagents[0] && r.b === reagents[1]) || (r.a === reagents[1] && r.b === reagents[0])) &&
        r.condition !== null
      )
      if (!found && needsCond && !cond) {
        setReaction({ result: 'Недостаточно условий', type: '', effect: 'none',
          desc: `Для этой реакции нужно добавить условие: ${needsCond.condition === 'burner' ? 'горелка' : needsCond.condition}.` })
      } else {
        setReaction(found || { result: 'Реакция не идёт', type: '', effect: 'none', desc: 'Эти вещества не реагируют друг с другом при данных условиях.' })
      }
      setAnimating(false)
    }, 800)
  }

  const reset = () => { setDropped([]); setReaction(null); setAnimating(false); setCondition(null) }

  const groupedReactions = REACTIONS.reduce((acc, r) => {
    const key = r.condition || 'Без условий'
    if (!acc[key]) acc[key] = []
    acc[key].push(r)
    return acc
  }, {})

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
      <div style={{ padding: '48px 0 32px' }} className="fade-up">
        <p className="section-label" style={{ marginBottom: 12 }}>Интерактивная</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em' }}>Лаборатория</h1>
        <p style={{ color: 'var(--text2)', marginTop: 8, fontSize: '0.875rem' }}>
          Перетащи реагенты в колбу и условия в подставку. Некоторые реакции требуют условий.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '190px 1fr 100px', gap: '2rem', paddingBottom: '4rem' }}>

        {/* Полка реагентов */}
        <div style={{ position: 'sticky', top: 72, height: 'fit-content' }}>
          <div className="section-label" style={{ marginBottom: 10 }}>Реагенты</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {REAGENTS.map(r => {
              const used = dropped.includes(r.id)
              const disabled = used || dropped.length >= 2
              return (
                <div key={r.id}
                  draggable={!disabled}
                  onDragStart={e => handleDragStart(e, r.id, 'reagent')}
                  onDragEnd={() => setDraggingId(null)}
                  style={{
                    padding: '6px 10px', borderRadius: 8,
                    border: '1px solid var(--border)',
                    background: draggingId === r.id ? 'var(--text)' : used ? 'transparent' : 'var(--bg2)',
                    color: draggingId === r.id ? 'var(--bg)' : used ? 'var(--text3)' : 'var(--text)',
                    cursor: disabled ? 'not-allowed' : 'grab',
                    opacity: used ? 0.3 : 1,
                    display: 'flex', gap: 8, alignItems: 'center',
                    transition: 'all 0.15s ease', userSelect: 'none',
                  }}
                >
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '0.78rem', minWidth: 48 }}>{r.label}</span>
                  <span style={{ fontSize: '0.65rem', color: used ? 'var(--text3)' : 'var(--text2)' }}>{r.name}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Рабочая зона */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Зона сброса реагентов */}
          <div
            onDrop={handleDropFlask}
            onDragOver={e => { e.preventDefault(); setOver(true) }}
            onDragLeave={() => setOver(false)}
            style={{
              minHeight: 340,
              border: `1px dashed ${over ? 'var(--text)' : 'var(--border)'}`,
              borderRadius: 16,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '1rem', padding: '2rem',
              background: over ? 'var(--bg2)' : 'transparent',
              transition: 'all 0.2s ease', position: 'relative',
            }}
          >
            {dropped.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'absolute', top: '1.25rem' }}>
                {dropped.map((id, i) => (
                  <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '0.9rem', padding: '3px 10px', border: '1px solid var(--border)', borderRadius: 8, background: 'var(--bg2)' }}>{id}</span>
                    {i === 0 && dropped.length === 2 && <span style={{ color: 'var(--text3)', fontSize: '1.1rem' }}>+</span>}
                  </div>
                ))}
                {condition && (
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--text3)', padding: '2px 8px', border: '1px solid var(--border)', borderRadius: 99 }}>
                    {CONDITIONS.find(c => c.id === condition)?.desc}
                  </span>
                )}
              </div>
            )}

            {animating ? (
              <div style={{ width: 110, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--text3)', animation: 'fadeIn 0.4s ease infinite alternate' }}>реакция...</span>
              </div>
            ) : (
              <div style={{ marginTop: dropped.length > 0 ? '2.5rem' : 0, transition: 'margin 0.3s ease' }}>
                <FlaskSVG
                  effect={reaction?.effect || 'none'}
                  active={dropped.length === 2 && !animating}
                  hasBurner={condition === 'burner'}
                />
              </div>
            )}

            {dropped.length === 0 && (
              <p style={{ color: 'var(--text3)', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', position: 'absolute', bottom: '1.25rem' }}>
                перетащи два реагента сюда
              </p>
            )}
          </div>

          {/* Результат */}
          {reaction && !animating && (
            <div className="card fade-up" style={{ borderLeft: '3px solid var(--text)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: '0.9rem', marginBottom: 6 }}>
                    {dropped[0]} + {dropped[1]}
                    {condition ? ` —[${CONDITIONS.find(c => c.id === condition)?.desc}]→ ` : ' → '}
                    {reaction.result}
                  </div>
                  {reaction.type && (
                    <span style={{ fontSize: '0.68rem', padding: '2px 8px', border: '1px solid var(--border)', borderRadius: 99, color: 'var(--text2)', fontFamily: 'JetBrains Mono, monospace' }}>{reaction.type}</span>
                  )}
                </div>
                <button onClick={reset} className="btn" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>Очистить</button>
              </div>
              <p style={{ color: 'var(--text2)', fontSize: '0.875rem', lineHeight: 1.7 }}>{reaction.desc}</p>
            </div>
          )}

          {dropped.length > 0 && !reaction && !animating && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={reset} className="btn" style={{ fontSize: '0.75rem' }}>Очистить колбу</button>
            </div>
          )}

          {/* Индекс реакций */}
          <div>
            <div className="section-label" style={{ marginBottom: 10 }}>Индекс реакций</div>
            {Object.entries(groupedReactions).map(([group, rxns]) => (
              <div key={group} style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text3)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {group === 'Без условий' ? 'Без условий' :
                    group === 'burner' ? 'Усл: горелка' :
                    group === 'catalyst' ? 'Усл: катализатор' :
                    group === 'light' ? 'Усл: свет' : group}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 5 }}>
                  {rxns.map((r, i) => (
                    <button key={i} onClick={() => {
                      setDropped([r.a, r.b])
                      setCondition(r.condition)
                      setAnimating(true)
                      setTimeout(() => { setReaction(r); setAnimating(false) }, 600)
                    }}
                      style={{ textAlign: 'left', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg2)', cursor: 'pointer', color: 'var(--text)', transition: 'all 0.15s ease' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                    >
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', fontWeight: 500 }}>{r.a} + {r.b} → {r.result}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text3)', marginTop: 2 }}>{r.type}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Панель условий */}
        <div style={{ position: 'sticky', top: 72, height: 'fit-content' }}>
          <div className="section-label" style={{ marginBottom: 10 }}>Условия</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CONDITIONS.map(c => {
              const SvgComp = CONDITION_SVG[c.id]
              const isActive = condition === c.id
              return (
                <div
                  key={c.id}
                  draggable
                  onDragStart={e => handleDragStart(e, c.id, 'condition')}
                  onDragEnd={() => setDraggingId(null)}
                  onClick={() => {
                    const newCond = isActive ? null : c.id
                    setCondition(newCond)
                    if (dropped.length === 2) tryReact(dropped, newCond)
                  }}
                  style={{
                    padding: '8px', borderRadius: 10,
                    border: `1px solid ${isActive ? 'var(--text)' : 'var(--border)'}`,
                    background: isActive ? 'var(--bg2)' : 'transparent',
                    cursor: 'pointer', textAlign: 'center',
                    transition: 'all 0.15s ease', userSelect: 'none',
                  }}
                >
                  <SvgComp active={isActive} />
                  <div style={{ fontSize: '0.65rem', color: isActive ? 'var(--text)' : 'var(--text3)', marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>{c.desc}</div>
                </div>
              )
            })}
          </div>

          {/* Зона сброса условий */}
          <div
            onDrop={handleDropCondition}
            onDragOver={e => { e.preventDefault(); setCondOver(true) }}
            onDragLeave={() => setCondOver(false)}
            style={{
              marginTop: 12, padding: '8px', borderRadius: 10, minHeight: 60,
              border: `1px dashed ${condOver ? 'var(--text)' : 'var(--border)'}`,
              background: condOver ? 'var(--bg2)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ fontSize: '0.6rem', color: 'var(--text3)', fontFamily: 'JetBrains Mono, monospace', textAlign: 'center' }}>
              {condition ? `усл: ${CONDITIONS.find(c => c.id === condition)?.desc}` : 'перетащи\nусловие'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
