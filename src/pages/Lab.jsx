import { useState, useRef } from 'react'

const REAGENTS = [
  { id: 'HCl',      label: 'HCl',      name: 'Соляная кислота' },
  { id: 'NaOH',     label: 'NaOH',     name: 'Гидроксид натрия' },
  { id: 'H2SO4',    label: 'H₂SO₄',    name: 'Серная кислота' },
  { id: 'BaCl2',    label: 'BaCl₂',    name: 'Хлорид бария' },
  { id: 'Na',       label: 'Na',       name: 'Натрий' },
  { id: 'H2O',      label: 'H₂O',      name: 'Вода' },
  { id: 'CuSO4',    label: 'CuSO₄',    name: 'Сульфат меди' },
  { id: 'Fe',       label: 'Fe',       name: 'Железо' },
  { id: 'AgNO3',    label: 'AgNO₃',    name: 'Нитрат серебра' },
  { id: 'CO2',      label: 'CO₂',      name: 'Углекислый газ' },
  { id: 'Ca(OH)2',  label: 'Ca(OH)₂',  name: 'Известковая вода' },
  { id: 'Zn',       label: 'Zn',       name: 'Цинк' },
  { id: 'C',        label: 'C',        name: 'Уголь' },
  { id: 'O2',       label: 'O₂',       name: 'Кислород' },
  { id: 'CH4',      label: 'CH₄',      name: 'Метан' },
  { id: 'KMnO4',    label: 'KMnO₄',    name: 'Перманганат калия' },
]

const CONDITIONS = [
  { id: 'burner',   label: 'Горелка', desc: 'Нагрев' },
  { id: 'catalyst', label: 'Cat',     desc: 'Катализатор' },
  { id: 'light',    label: 'hν',      desc: 'УФ-свет' },
  { id: 'pressure', label: 'P',       desc: 'Давление' },
]

const REACTIONS = [
  { a:'HCl',     b:'NaOH',     cond:null,       res:'NaCl + H₂O',              type:'Нейтрализация', effect:'heat',        desc:'HCl + NaOH → NaCl + H₂O. Тепловыделяющая реакция. pH раствора ≈ 7.' },
  { a:'H2SO4',   b:'BaCl2',    cond:null,       res:'BaSO₄↓ + 2HCl',          type:'Осадок',        effect:'precipitate', desc:'Белый нерастворимый осадок BaSO₄. Качественная реакция на SO₄²⁻.' },
  { a:'Na',      b:'H2O',      cond:null,       res:'NaOH + H₂↑',             type:'Бурная',        effect:'explosion',   desc:'2Na + 2H₂O → 2NaOH + H₂↑. Натрий бурно реагирует с водой, выделяется H₂.' },
  { a:'CuSO4',   b:'Fe',       cond:null,       res:'FeSO₄ + Cu↓',            type:'Замещение',    effect:'precipitate', desc:'Железо вытесняет медь. На поверхности железа осаждается медь.' },
  { a:'AgNO3',   b:'HCl',      cond:null,       res:'AgCl↓ + HNO₃',          type:'Осадок',        effect:'precipitate', desc:'Творожистый белый осадок AgCl. Качественная реакция на Cl⁻.' },
  { a:'CO2',     b:'Ca(OH)2',  cond:null,       res:'CaCO₃↓ + H₂O',          type:'Осадок',        effect:'precipitate', desc:'Помутнение известковой воды. Белый осадок CaCO₃.' },
  { a:'Zn',      b:'HCl',      cond:null,       res:'ZnCl₂ + H₂↑',           type:'Выделение H₂', effect:'bubbles',     desc:'Цинк растворяется в соляной кислоте, выделяется H₂.' },
  { a:'H2SO4',   b:'NaOH',     cond:null,       res:'Na₂SO₄ + H₂O',           type:'Нейтрализация', effect:'heat',        desc:'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. Сильное тепловыделение.' },
  { a:'C',       b:'O2',       cond:'burner',   res:'CO₂',                    type:'Горение',      effect:'explosion',   desc:'C + O₂ → CO₂. Горение угля. Требует поджига.' },
  { a:'CH4',     b:'O2',       cond:'burner',   res:'CO₂ + H₂O',              type:'Горение',      effect:'explosion',   desc:'CH₄ + 2O₂ → CO₂ + 2H₂O. Сжигание метана.' },
  { a:'KMnO4',   b:'H2SO4',    cond:'burner',   res:'K₂SO₄ + MnSO₄ + O₂↑',  type:'Разложение',  effect:'bubbles',     desc:'Разложение KMnO₄ при нагревании. Выделяется O₂.' },
  { a:'Zn',      b:'H2SO4',    cond:'catalyst', res:'ZnSO₄ + H₂↑',           type:'Замещение',    effect:'bubbles',     desc:'Zn + H₂SO₄ → ZnSO₄ + H₂↑. Катализатор ускоряет реакцию.' },
  { a:'AgNO3',   b:'H2O',      cond:'light',    res:'Ag↓ + HNO₃ + O₂↑',   type:'Фотореакция',  effect:'precipitate', desc:'Разложение AgNO₃ под действием света. Осаждается металлическое серебро.' },
  { a:'Na',      b:'O2',       cond:'burner',   res:'Na₂O₂',                  type:'Горение',      effect:'explosion',   desc:'2Na + O₂ → Na₂O₂. Горение натрия в кислороде.' },
]

// SVG горелка
function BurnerSVG({ on }) {
  return (
    <svg width="52" height="68" viewBox="0 0 52 68" fill="none">
      <rect x="11" y="46" width="30" height="18" rx="3" stroke="var(--text)" strokeWidth="1.2" fill="var(--bg2)" />
      <rect x="19" y="34" width="14" height="14" rx="2" stroke="var(--text)" strokeWidth="1.2" fill="var(--bg2)" />
      <ellipse cx="26" cy="34" rx="11" ry="4" stroke="var(--text)" strokeWidth="1.2" fill="var(--bg2)" />
      {on && (
        <g style={{ animation: 'fadeIn 0.25s ease' }}>
          <path d="M26 32 Q21 22 26 13 Q31 22 26 32" fill="rgba(251,191,36,0.9)" />
          <path d="M26 29 Q23 22 26 17 Q29 22 26 29" fill="rgba(255,255,255,0.7)" />
          <path d="M20 30 Q15 20 20 11 Q23 19 20 30" fill="rgba(251,150,36,0.6)" />
          <path d="M32 30 Q37 20 32 11 Q29 19 32 30" fill="rgba(251,150,36,0.6)" />
        </g>
      )}
      <text x="26" y="60" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono" fill="var(--text3)">горелка</text>
    </svg>
  )
}

function CondIcon({ id, on }) {
  if (id === 'burner') return <BurnerSVG on={on} />
  if (id === 'light') return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="10" stroke="var(--text)" strokeWidth="1.5" fill="var(--bg2)" />
      <circle cx="26" cy="26" r="5" fill={on ? 'rgba(200,200,255,0.95)' : 'var(--text3)'} />
      {[0,45,90,135,180,225,270,315].map((a,i)=>(
        <line key={i} x1={26+Math.cos(a*Math.PI/180)*13} y1={26+Math.sin(a*Math.PI/180)*13}
          x2={26+Math.cos(a*Math.PI/180)*18} y2={26+Math.sin(a*Math.PI/180)*18}
          stroke={on ? 'rgba(180,180,255,0.9)' : 'var(--text3)'} strokeWidth="1.5" />
      ))}
      <text x="26" y="47" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono" fill="var(--text3)">UV</text>
    </svg>
  )
  if (id === 'catalyst') return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect x="8" y="22" width="36" height="12" rx="6" stroke="var(--text)" strokeWidth="1.5" fill="var(--bg2)" />
      {[14,22,30,38].map((x,i)=>(
        <circle key={i} cx={x} cy="28" r="3.5"
          fill={on ? 'var(--text)' : 'var(--bg2)'} stroke="var(--text)" strokeWidth="1" />
      ))}
      <text x="26" y="47" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono" fill="var(--text3)">cat</text>
    </svg>
  )
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="16" stroke="var(--text)" strokeWidth="1.5" fill="var(--bg2)" />
      <text x="26" y="31" textAnchor="middle" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono"
        fill={on ? 'var(--text)' : 'var(--text3)'}>P</text>
      <text x="26" y="47" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono" fill="var(--text3)">давление</text>
    </svg>
  )
}

function Flask({ effect, active, burnerOn }) {
  const liq = {
    none:        'transparent',
    heat:        'rgba(200,200,200,0.12)',
    precipitate: 'rgba(180,180,180,0.18)',
    bubbles:     'rgba(160,210,255,0.15)',
    explosion:   'rgba(250,200,50,0.2)',
  }[effect] || 'transparent'

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
      <svg width="110" height="128" viewBox="0 0 110 128" fill="none">
        <defs>
          <clipPath id="fc">
            <path d="M38 8 L38 50 L6 108 Q4 124 22 124 L88 124 Q106 124 104 108 L72 50 L72 8 Z" />
          </clipPath>
        </defs>
        {/* Стенки */}
        <path d="M38 8 L38 50 L6 108 Q4 124 22 124 L88 124 Q106 124 104 108 L72 50 L72 8 Z"
          fill="var(--bg)" stroke="var(--text)" strokeWidth="1.8" strokeLinejoin="round" />
        <line x1="36" y1="6" x2="74" y2="6" stroke="var(--text)" strokeWidth="1.8" />
        {/* Жидкость */}
        {active && (
          <rect x="0" y="72" width="110" height="56" fill={liq} clipPath="url(#fc)"
            style={{ transition: 'fill 0.5s ease' }} />
        )}
        {/* Пузырьки */}
        {active && effect === 'bubbles' && [28,44,58,72].map((x,i)=>(
          <circle key={i} cx={x} cy={85+i*7} r={2.5} fill="rgba(120,180,255,0.75)"
            clipPath="url(#fc)"
            style={{ animation:`fadeUp 1.2s ease ${i*0.22}s infinite` }} />
        ))}
        {/* Осадок */}
        {active && effect === 'precipitate' && (
          <rect x="18" y="112" width="74" height="8" rx="2" fill="rgba(220,220,220,0.85)"
            clipPath="url(#fc)" style={{ animation:'fadeIn 0.9s ease both' }} />
        )}
        {/* Кольца нагрева */}
        {active && effect === 'heat' && [16,26].map((r,i)=>(
          <circle key={i} cx="55" cy="100" r={r} stroke="rgba(200,200,200,0.25)" strokeWidth="1" fill="none"
            clipPath="url(#fc)"
            style={{ animation:`ping 2s ease ${i*0.35}s infinite` }} />
        ))}
        {/* Взрыв */}
        {active && effect === 'explosion' && [
          [55,88],[38,95],[72,95],[45,108],[65,108]
        ].map(([cx,cy],i)=>(
          <circle key={i} cx={cx} cy={cy} r={4} fill="rgba(251,191,36,0.8)"
            clipPath="url(#fc)"
            style={{ animation:`fadeIn 0.3s ease ${i*0.06}s both` }} />
        ))}
      </svg>
      {burnerOn && (
        <div style={{ marginTop:-4 }}><BurnerSVG on={active} /></div>
      )}
    </div>
  )
}

export default function Lab() {
  // Используем ref для передачи данных при драг — без JSON, без dataTransfer
  const dragData = useRef(null)

  const [dropped, setDropped]     = useState([])
  const [condition, setCondition] = useState(null)
  const [reaction, setReaction]   = useState(null)
  const [animating, setAnimating] = useState(false)
  const [overFlask, setOverFlask] = useState(false)
  const [overCond,  setOverCond]  = useState(false)

  // ---------- helpers ----------
  const tryReact = (reagents, cond) => {
    setAnimating(true)
    setTimeout(() => {
      const match = REACTIONS.find(r =>
        ((r.a === reagents[0] && r.b === reagents[1]) ||
         (r.a === reagents[1] && r.b === reagents[0])) &&
        r.cond === cond
      )
      if (!match) {
        // Проверяем, нужно ли условие
        const needsCond = REACTIONS.find(r =>
          ((r.a === reagents[0] && r.b === reagents[1]) ||
           (r.a === reagents[1] && r.b === reagents[0])) &&
          r.cond !== null
        )
        if (needsCond && !cond) {
          const c = CONDITIONS.find(c => c.id === needsCond.cond)
          setReaction({ res:'Недостаточно условий', type:'', effect:'none',
            desc:`Добавьте условие: «${c?.desc || needsCond.cond}» — перетащи из панели справа или нажми на него.` })
        } else {
          setReaction({ res:'Реакция не идёт', type:'', effect:'none',
            desc:'Эти вещества не реагируют друг с другом при данных условиях.' })
        }
      } else {
        setReaction(match)
      }
      setAnimating(false)
    }, 700)
  }

  const reset = () => { setDropped([]); setReaction(null); setAnimating(false); setCondition(null) }

  // ---------- drag handlers ----------
  const onDragStartReagent = (e, id) => {
    dragData.current = { kind: 'reagent', id }
    e.dataTransfer.effectAllowed = 'copy'
    // Firefox требует setData
    e.dataTransfer.setData('text/plain', id)
  }

  const onDragStartCondition = (e, id) => {
    dragData.current = { kind: 'condition', id }
    e.dataTransfer.effectAllowed = 'copy'
    e.dataTransfer.setData('text/plain', id)
  }

  const onDropFlask = (e) => {
    e.preventDefault()
    setOverFlask(false)
    const d = dragData.current
    if (!d || d.kind !== 'reagent') return
    if (dropped.includes(d.id) || dropped.length >= 2) return
    const next = [...dropped, d.id]
    setDropped(next)
    dragData.current = null
    if (next.length === 2) tryReact(next, condition)
  }

  const onDropCondArea = (e) => {
    e.preventDefault()
    setOverCond(false)
    const d = dragData.current
    if (!d || d.kind !== 'condition') return
    const newCond = condition === d.id ? null : d.id
    setCondition(newCond)
    dragData.current = null
    if (dropped.length === 2) tryReact(dropped, newCond)
  }

  const toggleCondition = (id) => {
    const newCond = condition === id ? null : id
    setCondition(newCond)
    if (dropped.length === 2) tryReact(dropped, newCond)
  }

  const groupedRxns = REACTIONS.reduce((acc, r) => {
    const k = r.cond || 'none'
    if (!acc[k]) acc[k] = []
    acc[k].push(r)
    return acc
  }, {})

  const condLabels = { none:'Без условий', burner:'Усл: горелка', catalyst:'Усл: катализатор', light:'Усл: свет' }

  return (
    <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 1.5rem' }}>
      <div style={{ padding:'48px 0 32px' }} className="fade-up">
        <p className="section-label" style={{ marginBottom:12 }}>Интерактивная</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em' }}>Лаборатория</h1>
        <p style={{ color:'var(--text2)', marginTop:8, fontSize:'0.875rem' }}>
          Перетащи реагенты в колбу. Для некоторых реакций добавь условие справа.
        </p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'180px 1fr 96px', gap:'2rem', paddingBottom:'4rem' }}>

        {/* ===== РЕАГЕНТЫ ===== */}
        <div style={{ position:'sticky', top:72, height:'fit-content' }}>
          <div className="section-label" style={{ marginBottom:8 }}>Реагенты</div>
          <div style={{ fontSize:'0.62rem', color:'var(--text3)', marginBottom:8, fontFamily:'JetBrains Mono,monospace' }}>перетащи в колбу</div>
          {REAGENTS.map(r => {
            const used = dropped.includes(r.id)
            const disabled = used || dropped.length >= 2
            return (
              <div key={r.id}
                draggable={!disabled}
                onDragStart={!disabled ? (e) => onDragStartReagent(e, r.id) : undefined}
                style={{
                  marginBottom:3, padding:'6px 10px', borderRadius:8,
                  border:'1px solid var(--border)',
                  background: used ? 'transparent' : 'var(--bg2)',
                  color: disabled ? 'var(--text3)' : 'var(--text)',
                  cursor: disabled ? 'not-allowed' : 'grab',
                  opacity: used ? 0.3 : 1,
                  display:'flex', gap:8, alignItems:'center',
                  transition:'all 0.15s ease', userSelect:'none',
                  WebkitUserDrag: disabled ? 'none' : 'element',
                }}
              >
                <span style={{ fontFamily:'JetBrains Mono,monospace', fontWeight:700, fontSize:'0.78rem', minWidth:44 }}>{r.label}</span>
                <span style={{ fontSize:'0.63rem', color:'var(--text2)' }}>{r.name}</span>
              </div>
            )
          })}
        </div>

        {/* ===== РАБОЧАЯ ЗОНА ===== */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>

          {/* Колба */}
          <div
            onDragOver={e => { e.preventDefault(); setOverFlask(true) }}
            onDragLeave={() => setOverFlask(false)}
            onDrop={onDropFlask}
            style={{
              minHeight:340, borderRadius:16, padding:'2rem',
              border:`1.5px dashed ${overFlask ? 'var(--text)' : 'var(--border)'}`,
              background: overFlask ? 'var(--bg2)' : 'transparent',
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              gap:'1rem', transition:'all 0.2s ease', position:'relative',
            }}
          >
            {/* Реагенты в колбе */}
            {dropped.length > 0 && (
              <div style={{ position:'absolute', top:'1.2rem', display:'flex', alignItems:'center', gap:8 }}>
                {dropped.map((id, i) => (
                  <div key={id} style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{
                      fontFamily:'JetBrains Mono,monospace', fontWeight:700, fontSize:'0.88rem',
                      padding:'3px 10px', border:'1px solid var(--border)', borderRadius:8, background:'var(--bg2)'
                    }}>{id}</span>
                    {i === 0 && dropped.length === 2 && <span style={{ color:'var(--text3)' }}>+</span>}
                  </div>
                ))}
                {condition && (
                  <span style={{ fontSize:'0.68rem', color:'var(--text3)', padding:'2px 8px', border:'1px solid var(--border)', borderRadius:99 }}>
                    [{CONDITIONS.find(c => c.id === condition)?.desc}]
                  </span>
                )}
              </div>
            )}

            {/* Сама колба */}
            <div style={{ marginTop: dropped.length > 0 ? 40 : 0, transition:'margin 0.3s ease' }}>
              {animating ? (
                <div style={{ width:110, height:196, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'0.7rem', color:'var(--text3)',
                    animation:'fadeIn 0.4s ease infinite alternate' }}>реакция...</span>
                </div>
              ) : (
                <Flask
                  effect={reaction?.effect || 'none'}
                  active={dropped.length === 2}
                  burnerOn={condition === 'burner'}
                />
              )}
            </div>

            {dropped.length === 0 && (
              <p style={{ color:'var(--text3)', fontSize:'0.72rem', fontFamily:'JetBrains Mono,monospace',
                position:'absolute', bottom:'1.2rem' }}>← перетащи два реагента сюда</p>
            )}
          </div>

          {/* Результат */}
          {reaction && !animating && (
            <div className="card fade-up" style={{ borderLeft:'3px solid var(--text)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.75rem' }}>
                <div>
                  <div style={{ fontFamily:'JetBrains Mono,monospace', fontWeight:600, fontSize:'0.9rem', marginBottom:6 }}>
                    {dropped[0]} + {dropped[1]}
                    {condition ? ` —[${CONDITIONS.find(c=>c.id===condition)?.desc}]→ ` : ' → '}
                    {reaction.res}
                  </div>
                  {reaction.type && (
                    <span style={{ fontSize:'0.68rem', padding:'2px 8px', border:'1px solid var(--border)', borderRadius:99, color:'var(--text2)', fontFamily:'JetBrains Mono,monospace' }}>{reaction.type}</span>
                  )}
                </div>
                <button onClick={reset} className="btn" style={{ fontSize:'0.72rem', padding:'4px 10px', flexShrink:0 }}>Очистить</button>
              </div>
              <p style={{ color:'var(--text2)', fontSize:'0.875rem', lineHeight:1.7 }}>{reaction.desc}</p>
            </div>
          )}

          {dropped.length > 0 && !reaction && !animating && (
            <div style={{ display:'flex', justifyContent:'flex-end' }}>
              <button onClick={reset} className="btn" style={{ fontSize:'0.75rem' }}>Очистить колбу</button>
            </div>
          )}

          {/* Индекс реакций */}
          <div>
            <div className="section-label" style={{ marginBottom:10 }}>Индекс реакций</div>
            {Object.entries(groupedRxns).map(([g, rxns]) => (
              <div key={g} style={{ marginBottom:'1.25rem' }}>
                <div style={{ fontSize:'0.65rem', color:'var(--text3)', fontFamily:'JetBrains Mono,monospace',
                  marginBottom:6, letterSpacing:'0.06em', textTransform:'uppercase' }}>{condLabels[g] || g}</div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))', gap:5 }}>
                  {rxns.map((r,i) => (
                    <button key={i}
                      onClick={() => {
                        setDropped([r.a, r.b]); setCondition(r.cond)
                        setAnimating(true)
                        setTimeout(() => { setReaction(r); setAnimating(false) }, 600)
                      }}
                      style={{ textAlign:'left', padding:'8px 12px', borderRadius:8, border:'1px solid var(--border)',
                        background:'var(--bg2)', cursor:'pointer', color:'var(--text)', transition:'all 0.15s ease' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor='var(--text)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
                    >
                      <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'0.75rem', fontWeight:500 }}>{r.a} + {r.b} → {r.res}</div>
                      <div style={{ fontSize:'0.63rem', color:'var(--text3)', marginTop:2 }}>{r.type}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== УСЛОВИЯ ===== */}
        <div style={{ position:'sticky', top:72, height:'fit-content' }}>
          <div className="section-label" style={{ marginBottom:8 }}>Условия</div>
          <div style={{ fontSize:'0.6rem', color:'var(--text3)', marginBottom:8, fontFamily:'JetBrains Mono,monospace' }}>клик или drag</div>

          {CONDITIONS.map(c => (
            <div key={c.id}
              draggable
              onDragStart={e => onDragStartCondition(e, c.id)}
              onClick={() => toggleCondition(c.id)}
              style={{
                marginBottom:8, padding:'8px 6px', borderRadius:10, textAlign:'center',
                border:`1.5px solid ${condition === c.id ? 'var(--text)' : 'var(--border)'}`,
                background: condition === c.id ? 'var(--bg2)' : 'transparent',
                cursor:'pointer', userSelect:'none', transition:'all 0.15s ease',
              }}
            >
              <CondIcon id={c.id} on={condition === c.id} />
            </div>
          ))}

          {/* Зона сброса условия */}
          <div
            onDragOver={e => { e.preventDefault(); setOverCond(true) }}
            onDragLeave={() => setOverCond(false)}
            onDrop={onDropCondArea}
            style={{
              marginTop:6, minHeight:52, borderRadius:10, padding:'8px 6px',
              border:`1px dashed ${overCond ? 'var(--text)' : 'var(--border)'}`,
              background: overCond ? 'var(--bg2)' : 'transparent',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'all 0.2s ease',
            }}
          >
            <span style={{ fontSize:'0.58rem', color:'var(--text3)', fontFamily:'JetBrains Mono,monospace', textAlign:'center', lineHeight:1.5 }}>
              {condition
                ? `✓ ${CONDITIONS.find(c=>c.id===condition)?.desc}`
                : 'drop\nусловие'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
