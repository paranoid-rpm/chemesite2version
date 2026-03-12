import { useState, useRef } from 'react'

const REAGENTS = [
  { id: 'HCl', label: 'HCl', name: 'Hydrochloric acid' },
  { id: 'NaOH', label: 'NaOH', name: 'Sodium hydroxide' },
  { id: 'H2SO4', label: 'H₂SO₄', name: 'Sulfuric acid' },
  { id: 'BaCl2', label: 'BaCl₂', name: 'Barium chloride' },
  { id: 'Na', label: 'Na', name: 'Sodium (metal)' },
  { id: 'H2O', label: 'H₂O', name: 'Water' },
  { id: 'CuSO4', label: 'CuSO₄', name: 'Copper(II) sulfate' },
  { id: 'Fe', label: 'Fe', name: 'Iron' },
  { id: 'AgNO3', label: 'AgNO₃', name: 'Silver nitrate' },
  { id: 'CO2', label: 'CO₂', name: 'Carbon dioxide' },
  { id: 'Ca(OH)2', label: 'Ca(OH)₂', name: 'Calcium hydroxide' },
  { id: 'Zn', label: 'Zn', name: 'Zinc' },
]

const REACTIONS = [
  { a: 'HCl', b: 'NaOH', result: 'NaCl + H₂O', type: 'Neutralization', effect: 'heat', desc: 'Acid reacts with base. Heat is released. Solution becomes neutral (pH ≈ 7). HCl + NaOH → NaCl + H₂O' },
  { a: 'H2SO4', b: 'BaCl2', result: 'BaSO₄↓ + 2HCl', type: 'Precipitation', effect: 'precipitate', desc: 'Dense white precipitate of barium sulfate forms. BaSO₄ is insoluble in water — diagnostic test for SO₄²⁻.' },
  { a: 'Na', b: 'H2O', result: 'NaOH + H₂↑', type: 'Displacement', effect: 'explosion', desc: 'Sodium reacts vigorously with water. Hydrogen gas is released. Strongly exothermic. 2Na + 2H₂O → 2NaOH + H₂↑' },
  { a: 'CuSO4', b: 'Fe', result: 'FeSO₄ + Cu↓', type: 'Displacement', effect: 'precipitate', desc: 'Iron displaces copper. Red copper deposits on iron surface. Fe is above Cu in the activity series. CuSO₄ + Fe → FeSO₄ + Cu↓' },
  { a: 'AgNO3', b: 'HCl', result: 'AgCl↓ + HNO₃', type: 'Precipitation', effect: 'precipitate', desc: 'Curdy white AgCl precipitate forms instantly. Qualitative test for chloride ions. AgNO₃ + HCl → AgCl↓ + HNO₃' },
  { a: 'CO2', b: 'Ca(OH)2', result: 'CaCO₃↓ + H₂O', type: 'Precipitation', effect: 'precipitate', desc: 'Limewater turns milky. White CaCO₃ precipitate. Test for CO₂. Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O' },
  { a: 'Zn', b: 'HCl', result: 'ZnCl₂ + H₂↑', type: 'Gas evolution', effect: 'bubbles', desc: 'Zinc dissolves in hydrochloric acid with characteristic bubbling. Hydrogen gas is released. Zn + 2HCl → ZnCl₂ + H₂↑' },
  { a: 'Na', b: 'HCl', result: 'NaCl + H₂↑', type: 'Displacement', effect: 'explosion', desc: 'Sodium displaces hydrogen from acid. Vigorous, exothermic. Na + HCl → NaCl + ½H₂↑' },
  { a: 'H2SO4', b: 'NaOH', result: 'Na₂SO₄ + H₂O', type: 'Neutralization', effect: 'heat', desc: 'Strong acid-base neutralization. Highly exothermic. H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O' },
]

function FlaskSVG({ effect, active }) {
  return (
    <svg width="120" height="140" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Flask body */}
      <path
        d="M45 10 L45 55 L10 115 Q8 130 25 132 L95 132 Q112 130 110 115 L75 55 L75 10 Z"
        fill="var(--bg2)"
        stroke="var(--text)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Flask neck */}
      <rect x="40" y="6" width="40" height="6" rx="2" fill="var(--text)" opacity="0.15" />
      <line x1="40" y1="8" x2="80" y2="8" stroke="var(--text)" strokeWidth="1.5" />

      {/* Liquid */}
      {active && (
        <clipPath id="flaskClip">
          <path d="M45 10 L45 55 L10 115 Q8 130 25 132 L95 132 Q112 130 110 115 L75 55 L75 10 Z" />
        </clipPath>
      )}
      {active && (
        <rect
          x="5" y="80" width="110" height="60"
          fill={effect === 'explosion' ? 'rgba(251,191,36,0.3)' : effect === 'precipitate' ? 'rgba(180,180,180,0.25)' : effect === 'heat' ? 'rgba(200,200,200,0.2)' : 'rgba(150,200,255,0.2)'}
          clipPath="url(#flaskClip)"
          style={{ transition: 'all 0.6s ease' }}
        />
      )}

      {/* Bubbles for gas effect */}
      {active && effect === 'bubbles' && (
        <>
          {[35, 50, 65, 75].map((x, i) => (
            <circle key={i} cx={x} cy={90 + i * 8} r={2.5}
              fill="rgba(150,200,255,0.7)"
              style={{ animation: `fadeUp ${0.8 + i * 0.2}s ease infinite`, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </>
      )}

      {/* Precipitate line */}
      {active && effect === 'precipitate' && (
        <line x1="25" y1="122" x2="95" y2="122" stroke="rgba(200,200,200,0.8)" strokeWidth="4" strokeLinecap="round"
          style={{ animation: 'fadeIn 0.8s ease both' }}
        />
      )}

      {/* Heat rings */}
      {active && effect === 'heat' && (
        <>
          <circle cx="60" cy="100" r="12" stroke="rgba(200,200,200,0.3)" strokeWidth="1" fill="none"
            style={{ animation: 'ping 1.5s ease infinite' }}
          />
          <circle cx="60" cy="100" r="20" stroke="rgba(200,200,200,0.15)" strokeWidth="1" fill="none"
            style={{ animation: 'ping 1.5s ease infinite', animationDelay: '0.3s' }}
          />
        </>
      )}

      {/* Explosion */}
      {active && effect === 'explosion' && (
        <>
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = angle * Math.PI / 180
            const x = 60 + Math.cos(rad) * 25
            const y = 95 + Math.sin(rad) * 20
            return <circle key={i} cx={x} cy={y} r="2" fill="rgba(251,191,36,0.6)"
              style={{ animation: `fadeIn 0.3s ease ${i * 0.05}s both` }} />
          })}
        </>
      )}
    </svg>
  )
}

export default function Lab() {
  const [dropped, setDropped] = useState([])
  const [reaction, setReaction] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [draggingId, setDraggingId] = useState(null)
  const [draggingOver, setDraggingOver] = useState(false)

  const handleDragStart = (e, id) => {
    if (dropped.includes(id) || dropped.length >= 2) return
    setDraggingId(id)
    e.dataTransfer.setData('reagentId', id)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDraggingOver(false)
    const id = e.dataTransfer.getData('reagentId')
    if (!id || dropped.includes(id) || dropped.length >= 2) return
    const next = [...dropped, id]
    setDropped(next)
    if (next.length === 2) {
      setAnimating(true)
      setTimeout(() => {
        const found = REACTIONS.find(r => (r.a === next[0] && r.b === next[1]) || (r.a === next[1] && r.b === next[0]))
        setReaction(found || { result: 'No reaction', type: '', effect: 'none', desc: 'These substances do not react under standard conditions.' })
        setAnimating(false)
      }, 900)
    }
  }

  const reset = () => { setDropped([]); setReaction(null); setAnimating(false) }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
      <div style={{ padding: '48px 0 32px' }} className="fade-up">
        <p className="section-label" style={{ marginBottom: 12 }}>Interactive</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em' }}>Laboratory</h1>
        <p style={{ color: 'var(--text2)', marginTop: 8, fontSize: '0.875rem' }}>Drag two reagents into the reaction vessel to observe the result.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '2.5rem', paddingBottom: '4rem' }}>

        {/* Reagent shelf */}
        <div style={{ position: 'sticky', top: 72, height: 'fit-content' }}>
          <div className="section-label" style={{ marginBottom: 12 }}>Reagents</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {REAGENTS.map(r => {
              const used = dropped.includes(r.id)
              return (
                <div
                  key={r.id}
                  draggable={!used && dropped.length < 2}
                  onDragStart={e => handleDragStart(e, r.id)}
                  onDragEnd={() => setDraggingId(null)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid var(--border)',
                    background: used ? 'var(--bg)' : draggingId === r.id ? 'var(--text)' : 'var(--bg2)',
                    color: used ? 'var(--text3)' : draggingId === r.id ? 'var(--bg)' : 'var(--text)',
                    cursor: used || dropped.length >= 2 ? 'not-allowed' : 'grab',
                    opacity: used ? 0.4 : 1,
                    display: 'flex', gap: 10, alignItems: 'center',
                    transition: 'all 0.15s ease',
                    userSelect: 'none',
                  }}
                >
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: '0.85rem', minWidth: 52 }}>{r.label}</span>
                  <span style={{ fontSize: '0.7rem', color: used ? 'var(--text3)' : 'var(--text2)' }}>{r.name}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Workspace */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* Drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setDraggingOver(true) }}
            onDragLeave={() => setDraggingOver(false)}
            style={{
              minHeight: 280,
              border: `1px dashed ${draggingOver ? 'var(--text)' : 'var(--border)'}`,
              borderRadius: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              padding: '2rem',
              background: draggingOver ? 'var(--bg2)' : 'transparent',
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
          >
            {/* Dropped reagent labels */}
            {dropped.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'absolute', top: '1.5rem' }}>
                {dropped.map((id, i) => (
                  <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: '1.1rem', padding: '4px 12px', border: '1px solid var(--border)', borderRadius: 8, background: 'var(--bg2)' }}>{id}</span>
                    {i === 0 && dropped.length === 2 && <span style={{ color: 'var(--text3)', fontWeight: 300, fontSize: '1.5rem' }}>+</span>}
                  </div>
                ))}
              </div>
            )}

            {/* Flask */}
            <div style={{ marginTop: dropped.length > 0 ? '3rem' : 0, transition: 'all 0.3s ease' }}>
              {animating ? (
                <div style={{ width: 120, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text3)', animation: 'fadeIn 0.3s ease infinite alternate' }}>reacting...</div>
                </div>
              ) : (
                <FlaskSVG effect={reaction?.effect || 'none'} active={dropped.length === 2 && !animating} />
              )}
            </div>

            {dropped.length === 0 && (
              <p style={{ color: 'var(--text3)', fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace' }}>drag two reagents here</p>
            )}
          </div>

          {/* Result */}
          {reaction && !animating && (
            <div className="card fade-up" style={{ borderLeft: '3px solid var(--text)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: '1rem', marginBottom: 4 }}>
                    {dropped[0]} + {dropped[1]} → {reaction.result}
                  </div>
                  {reaction.type && (
                    <span style={{ fontSize: '0.7rem', padding: '2px 8px', border: '1px solid var(--border)', borderRadius: 99, color: 'var(--text2)', fontFamily: 'JetBrains Mono, monospace' }}>{reaction.type}</span>
                  )}
                </div>
                <button onClick={reset} className="btn" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>Clear</button>
              </div>
              <p style={{ color: 'var(--text2)', fontSize: '0.875rem', lineHeight: 1.7, marginTop: '0.5rem' }}>{reaction.desc}</p>
            </div>
          )}

          {dropped.length > 0 && !reaction && !animating && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={reset} className="btn" style={{ fontSize: '0.75rem' }}>Clear flask</button>
            </div>
          )}

          {/* Reaction index */}
          <div style={{ marginTop: '1rem' }}>
            <div className="section-label" style={{ marginBottom: 12 }}>Reaction Index</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 8 }}>
              {REACTIONS.map((r, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDropped([r.a, r.b])
                    setAnimating(true)
                    setTimeout(() => { setReaction(r); setAnimating(false) }, 600)
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1px solid var(--border)',
                    background: 'var(--bg2)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    color: 'var(--text)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
                >
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', fontWeight: 500 }}>{r.a} + {r.b} → {r.result}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text3)', marginTop: 2 }}>{r.type}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
