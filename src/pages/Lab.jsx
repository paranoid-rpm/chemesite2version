import { useState } from 'react'

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
]

const REACTIONS = [
  { a: 'HCl', b: 'NaOH', result: 'NaCl + H₂O', type: 'Нейтрализация', effect: 'heat',
    desc: 'Кислота реагирует со щёлочью. Выделяется тепло, раствор становится нейтральным (pH ≈ 7). HCl + NaOH → NaCl + H₂O' },
  { a: 'H2SO4', b: 'BaCl2', result: 'BaSO₄↓ + 2HCl', type: 'Осадок', effect: 'precipitate',
    desc: 'Образуется белый нерастворимый осадок сульфата бария. Качественная реакция на SO₄²⁻.' },
  { a: 'Na', b: 'H2O', result: 'NaOH + H₂↑', type: 'Бурная реакция', effect: 'explosion',
    desc: 'Натрий бурно реагирует с водой. Выделяется водород. Сильно экзотермическая. 2Na + 2H₂O → 2NaOH + H₂↑' },
  { a: 'CuSO4', b: 'Fe', result: 'FeSO₄ + Cu↓', type: 'Замещение', effect: 'precipitate',
    desc: 'Железо вытесняет медь. На поверхности железа осаждается красная медь. Fe стоит выше Cu в ряду активности.' },
  { a: 'AgNO3', b: 'HCl', result: 'AgCl↓ + HNO₃', type: 'Осадок', effect: 'precipitate',
    desc: 'Творожистый белый осадок AgCl. Качественная реакция на хлорид-ион.' },
  { a: 'CO2', b: 'Ca(OH)2', result: 'CaCO₃↓ + H₂O', type: 'Осадок', effect: 'precipitate',
    desc: 'Помутнение известковой воды. Белый осадок CaCO₃. Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O' },
  { a: 'Zn', b: 'HCl', result: 'ZnCl₂ + H₂↑', type: 'Выделение газа', effect: 'bubbles',
    desc: 'Цинк растворяется в кислоте с выделением водорода. Zn + 2HCl → ZnCl₂ + H₂↑' },
  { a: 'Na', b: 'HCl', result: 'NaCl + H₂↑', type: 'Бурная реакция', effect: 'explosion',
    desc: 'Натрий вытесняет водород из кислоты. Бурная экзотермическая реакция.' },
  { a: 'H2SO4', b: 'NaOH', result: 'Na₂SO₄ + H₂O', type: 'Нейтрализация', effect: 'heat',
    desc: 'Серная кислота + щёлочь. Сильный разогрев. H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O' },
]

function FlaskSVG({ effect, active }) {
  return (
    <svg width="110" height="130" viewBox="0 0 110 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="flask">
          <path d="M38 8 L38 52 L5 108 Q3 122 20 124 L90 124 Q107 122 105 108 L72 52 L72 8 Z" />
        </clipPath>
      </defs>
      {/* колба */}
      <path d="M38 8 L38 52 L5 108 Q3 122 20 124 L90 124 Q107 122 105 108 L72 52 L72 8 Z"
        fill="var(--bg2)" stroke="var(--text)" strokeWidth="1.5" strokeLinejoin="round" />
      {/* горлышко */}
      <line x1="36" y1="6" x2="74" y2="6" stroke="var(--text)" strokeWidth="1.5" />
      {/* жидкость */}
      {active && (
        <rect x="0" y="75" width="110" height="55"
          fill={effect === 'explosion' ? 'rgba(250,200,50,0.25)' : effect === 'precipitate' ? 'rgba(180,180,180,0.2)' : 'rgba(160,160,255,0.15)'}
          clipPath="url(#flask)" style={{ transition: 'fill 0.6s ease' }}
        />
      )}
      {/* пузырьки */}
      {active && effect === 'bubbles' && [30,45,58,70].map((x, i) => (
        <circle key={i} cx={x} cy={85 + i * 7} r={2.5}
          fill="rgba(150,200,255,0.7)"
          style={{ animation: `fadeUp 1s ease infinite`, animationDelay: `${i * 0.2}s` }}
          clipPath="url(#flask)"
        />
      ))}
      {/* осадок */}
      {active && effect === 'precipitate' && (
        <line x1="20" y1="116" x2="90" y2="116" stroke="rgba(210,210,210,0.9)" strokeWidth="5" strokeLinecap="round"
          clipPath="url(#flask)" style={{ animation: 'fadeIn 0.8s ease both' }}
        />
      )}
      {/* нагрев */}
      {active && effect === 'heat' && [14,22].map((r, i) => (
        <circle key={i} cx="55" cy="95" r={r}
          stroke="rgba(200,200,200,0.25)" strokeWidth="1" fill="none"
          style={{ animation: `ping 1.8s ease infinite`, animationDelay: `${i * 0.3}s` }}
          clipPath="url(#flask)"
        />
      ))}
      {/* взрыв */}
      {active && effect === 'explosion' && [0,45,90,135,180,225,270,315].map((angle, i) => {
        const r = angle * Math.PI / 180
        return <circle key={i} cx={55 + Math.cos(r) * 22} cy={90 + Math.sin(r) * 18} r={3}
          fill="rgba(250,190,40,0.7)" clipPath="url(#flask)"
          style={{ animation: `fadeIn 0.4s ease ${i * 0.04}s both` }}
        />
      })}
    </svg>
  )
}

export default function Lab() {
  const [dropped, setDropped] = useState([])
  const [reaction, setReaction] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [draggingId, setDraggingId] = useState(null)
  const [over, setOver] = useState(false)

  const handleDragStart = (e, id) => {
    if (dropped.includes(id) || dropped.length >= 2) { e.preventDefault(); return }
    setDraggingId(id)
    e.dataTransfer.setData('text/plain', id)
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setOver(false)
    const id = e.dataTransfer.getData('text/plain')
    if (!id || dropped.includes(id) || dropped.length >= 2) return
    const next = [...dropped, id]
    setDropped(next)
    if (next.length === 2) {
      setAnimating(true)
      setTimeout(() => {
        const found = REACTIONS.find(r => (r.a === next[0] && r.b === next[1]) || (r.a === next[1] && r.b === next[0]))
        setReaction(found || { result: 'Реакция не идёт', type: '', effect: 'none', desc: 'Эти вещества не реагируют друг с другом при обычных условиях.' })
        setAnimating(false)
      }, 900)
    }
  }

  const reset = () => { setDropped([]); setReaction(null); setAnimating(false) }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
      <div style={{ padding: '48px 0 32px' }} className="fade-up">
        <p className="section-label" style={{ marginBottom: 12 }}>Интерактивная</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em' }}>Лаборатория</h1>
        <p style={{ color: 'var(--text2)', marginTop: 8, fontSize: '0.875rem' }}>
          Перетащи два реагента в колбу и наблюдай за реакцией.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '210px 1fr', gap: '2.5rem', paddingBottom: '4rem' }}>

        {/* Полка реагентов */}
        <div style={{ position: 'sticky', top: 72, height: 'fit-content' }}>
          <div className="section-label" style={{ marginBottom: 10 }}>Реагенты</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {REAGENTS.map(r => {
              const used = dropped.includes(r.id)
              const disabled = used || dropped.length >= 2
              return (
                <div
                  key={r.id}
                  draggable={!disabled}
                  onDragStart={e => handleDragStart(e, r.id)}
                  onDragEnd={() => setDraggingId(null)}
                  style={{
                    padding: '7px 11px', borderRadius: 8,
                    border: '1px solid var(--border)',
                    background: draggingId === r.id ? 'var(--text)' : used ? 'transparent' : 'var(--bg2)',
                    color: draggingId === r.id ? 'var(--bg)' : used ? 'var(--text3)' : 'var(--text)',
                    cursor: disabled ? 'not-allowed' : 'grab',
                    opacity: used ? 0.35 : 1,
                    display: 'flex', gap: 10, alignItems: 'center',
                    transition: 'all 0.15s ease',
                    userSelect: 'none',
                  }}
                >
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: '0.82rem', minWidth: 54 }}>{r.label}</span>
                  <span style={{ fontSize: '0.68rem', color: used ? 'var(--text3)' : 'var(--text2)' }}>{r.name}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Рабочая зона */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Зона сброса */}
          <div
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setOver(true) }}
            onDragLeave={() => setOver(false)}
            style={{
              minHeight: 300,
              border: `1px dashed ${over ? 'var(--text)' : 'var(--border)'}`,
              borderRadius: 16,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '1.5rem', padding: '2rem',
              background: over ? 'var(--bg2)' : 'transparent',
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
          >
            {/* Сброшенные реагенты */}
            {dropped.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'absolute', top: '1.25rem' }}>
                {dropped.map((id, i) => (
                  <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: '0.95rem',
                      padding: '4px 12px', border: '1px solid var(--border)',
                      borderRadius: 8, background: 'var(--bg2)',
                    }}>{id}</span>
                    {i === 0 && dropped.length === 2 && <span style={{ color: 'var(--text3)', fontSize: '1.25rem', fontWeight: 300 }}>+</span>}
                  </div>
                ))}
              </div>
            )}

            {/* Колба */}
            <div style={{ marginTop: dropped.length > 0 ? '3rem' : 0, transition: 'margin 0.3s ease' }}>
              {animating ? (
                <div style={{ width: 110, height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--text3)', animation: 'fadeIn 0.4s ease infinite alternate' }}>реакция...</span>
                </div>
              ) : (
                <FlaskSVG effect={reaction?.effect || 'none'} active={dropped.length === 2 && !animating} />
              )}
            </div>

            {dropped.length === 0 && (
              <p style={{ color: 'var(--text3)', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace', position: 'absolute', bottom: '1.25rem' }}>
                перетащи два реагента сюда
              </p>
            )}
          </div>

          {/* Результат */}
          {reaction && !animating && (
            <div className="card fade-up" style={{ borderLeft: '3px solid var(--text)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: '0.95rem', marginBottom: 6 }}>
                    {dropped[0]} + {dropped[1]} → {reaction.result}
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
          <div style={{ marginTop: '0.5rem' }}>
            <div className="section-label" style={{ marginBottom: 10 }}>Доступные реакции</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 6 }}>
              {REACTIONS.map((r, i) => (
                <button key={i} onClick={() => {
                  setDropped([r.a, r.b]); setAnimating(true)
                  setTimeout(() => { setReaction(r); setAnimating(false) }, 600)
                }}
                  style={{
                    textAlign: 'left', padding: '9px 13px', borderRadius: 8,
                    border: '1px solid var(--border)', background: 'var(--bg2)',
                    cursor: 'pointer', color: 'var(--text)', transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', fontWeight: 500 }}>{r.a} + {r.b} → {r.result}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text3)', marginTop: 2 }}>{r.type}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
