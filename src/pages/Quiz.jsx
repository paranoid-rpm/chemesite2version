import { useState } from 'react'

const QUESTIONS = [
  { q: 'How many protons does oxygen have?', options: ['6', '7', '8', '9'], answer: 2 },
  { q: 'What type of bond is in NaCl?', options: ['Nonpolar covalent', 'Ionic', 'Metallic', 'Hydrogen'], answer: 1 },
  { q: 'pH of a neutral solution at 25\u00b0C:', options: ['0', '7', '14', '1'], answer: 1 },
  { q: 'A + B \u2192 AB is called:', options: ['Decomposition', 'Displacement', 'Combination', 'Exchange'], answer: 2 },
  { q: 'Which gas is released when Na reacts with H\u2082O?', options: ['O\u2082', 'CO\u2082', 'H\u2082', 'N\u2082'], answer: 2 },
  { q: 'Molecular formula of sulfuric acid:', options: ['HCl', 'HNO\u2083', 'H\u2083PO\u2084', 'H\u2082SO\u2084'], answer: 3 },
  { q: 'In the periodic table, a period is:', options: ['Vertical column', 'Horizontal row', 'f-block', 'Metal group'], answer: 1 },
  { q: 'Avogadro\u2019s number is approximately:', options: ['6.02\u00d710\u00b2\u00b3', '3.14\u00d710\u00b9\u2070', '9.8\u00d710\u00b2', '1.67\u00d710\u207b\u00b2\u2077'], answer: 0 },
  { q: 'In a redox reaction, the oxidizing agent:', options: ['Loses electrons', 'Gains electrons', 'Is a catalyst', 'Changes pH only'], answer: 1 },
  { q: 'General formula for alkanes:', options: ['C\u2099H\u2082\u2099', 'C\u2099H\u2082\u2099\u208b\u2082', 'C\u2099H\u2082\u2099\u208a\u2082', 'C\u2099H\u2099'], answer: 2 },
  { q: 'Which indicator turns red in acid?', options: ['Phenolphthalein', 'Litmus', 'Methyl orange', 'Bromothymol blue'], answer: 1 },
  { q: 'Molar mass of water (H\u2082O):', options: ['16 g/mol', '18 g/mol', '20 g/mol', '10 g/mol'], answer: 1 },
  { q: 'Electronegativity increases towards:', options: ['Bottom-left', 'Bottom-right', 'Top-left', 'Top-right'], answer: 3 },
  { q: 'What is the charge of an electron?', options: ['+1', '0', '\u22121', '+2'], answer: 2 },
  { q: 'Which is a strong acid?', options: ['CH\u2083COOH', 'HF', 'H\u2082CO\u2083', 'HCl'], answer: 3 },
  { q: 'Le Chatelier\u2019s principle applies to:', options: ['Rate only', 'Equilibrium systems', 'Acids only', 'Ionic compounds'], answer: 1 },
  { q: 'Hybridization in ethylene (C\u2082H\u2084):', options: ['sp', 'sp\u00b2', 'sp\u00b3', 'sp\u00b3d'], answer: 1 },
  { q: 'Functional group \u2013COOH is:', options: ['Alcohol', 'Ether', 'Carboxylic acid', 'Amine'], answer: 2 },
  { q: 'Which has the highest electronegativity?', options: ['O', 'N', 'F', 'Cl'], answer: 2 },
  { q: 'A buffer solution resists changes in:', options: ['Temperature', 'Pressure', 'pH', 'Concentration'], answer: 2 },
  { q: 'Standard electrode potential is measured vs.:', options: ['Ag electrode', 'SHE', 'Cu electrode', 'Calomel'], answer: 1 },
  { q: 'Markovnikov\u2019s rule applies to:', options: ['Substitution', 'Elimination', 'Addition to alkenes', 'Combustion'], answer: 2 },
  { q: '\u0394G\u00b0 = \u2212nFE\u00b0 relates to:', options: ['Kinetics', 'Thermodynamics / electrochemistry', 'Nuclear chemistry', 'Spectroscopy'], answer: 1 },
  { q: 'Isotopes differ in number of:', options: ['Protons', 'Electrons', 'Neutrons', 'Quarks'], answer: 2 },
]

const LEVELS = [
  { id: 'easy', label: 'Basic', count: 6, desc: 'Core concepts' },
  { id: 'medium', label: 'Intermediate', count: 12, desc: 'Deeper understanding' },
  { id: 'hard', label: 'Advanced', count: 20, desc: 'Full coverage' },
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
      else { setIdx(n => n + 1); setSelected(null) }
    }, 1000)
  }

  const pct = Math.round((score / (questions.length || 1)) * 100)

  if (!level) return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
      <div style={{ padding: '48px 0 40px' }} className="fade-up">
        <p className="section-label" style={{ marginBottom: 12 }}>Self-assessment</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em' }}>Quiz</h1>
        <p style={{ color: 'var(--text2)', marginTop: 8, fontSize: '0.9rem' }}>Select difficulty level to begin.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', background: 'var(--border)', maxWidth: 640 }}>
        {LEVELS.map((l, i) => (
          <button
            key={l.id}
            onClick={() => start(l)}
            className={`fade-up delay-${i + 1}`}
            style={{
              background: 'var(--bg)',
              border: 'none',
              padding: '2rem 1.5rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background 0.2s ease',
              color: 'var(--text)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}
          >
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--text3)', marginBottom: 8 }}>0{i + 1}</div>
            <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 4 }}>{l.label}</div>
            <div style={{ color: 'var(--text3)', fontSize: '0.8rem', marginBottom: 8 }}>{l.desc}</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text2)' }}>{l.count} questions</div>
          </button>
        ))}
      </div>
    </div>
  )

  if (done) return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '80px 1.5rem', textAlign: 'center' }} className="fade-up">
      <p className="section-label" style={{ marginBottom: 16 }}>Result</p>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '4rem', fontWeight: 700, letterSpacing: '-0.04em' }}>
        {score}<span style={{ color: 'var(--text3)' }}>/{questions.length}</span>
      </div>
      <div style={{ color: 'var(--text2)', marginTop: 8, fontSize: '0.9rem' }}>{pct}% correct</div>
      <div style={{ margin: '2rem auto', height: 2, background: 'var(--border)', maxWidth: 320, borderRadius: 99, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: 'var(--text)', borderRadius: 99, width: `${pct}%`, transition: 'width 1s ease' }} />
      </div>
      <p style={{ color: 'var(--text2)', fontSize: '0.85rem', marginBottom: '2rem' }}>
        {pct >= 90 ? 'Excellent. Thorough understanding demonstrated.' : pct >= 70 ? 'Good performance. Review weak areas.' : pct >= 50 ? 'Fair. Revisit the theory sections.' : 'Needs work. Start with the Theory module.'}
      </p>
      <button onClick={() => setLevel(null)} className="btn btn-primary">Try again</button>
    </div>
  )

  const q = questions[idx]
  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text3)' }}>{idx + 1} / {questions.length}</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text3)' }}>Score: {score}</span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: 'var(--border)', borderRadius: 99, marginBottom: '2.5rem' }}>
        <div style={{ height: '100%', background: 'var(--text)', borderRadius: 99, width: `${(idx / questions.length) * 100}%`, transition: 'width 0.4s ease' }} />
      </div>

      <div key={idx} className="fade-up">
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '2rem', lineHeight: 1.4 }}>{q.q}</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {q.options.map((opt, i) => {
            let bg = 'var(--bg2)'
            let border = 'var(--border)'
            let color = 'var(--text)'

            if (selected !== null) {
              if (i === q.answer) { bg = 'var(--text)'; color = 'var(--bg)'; border = 'var(--text)' }
              else if (i === selected) { border = 'var(--text3)'; color = 'var(--text3)'; bg = 'var(--bg2)' }
              else { color = 'var(--text3)'; bg = 'var(--bg)' }
            }

            return (
              <button
                key={i}
                onClick={() => choose(i)}
                style={{
                  textAlign: 'left',
                  padding: '1rem 1.25rem',
                  borderRadius: 10,
                  border: `1px solid ${border}`,
                  background: bg,
                  color,
                  cursor: selected !== null ? 'default' : 'pointer',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { if (selected === null) e.currentTarget.style.borderColor = 'var(--text)' }}
                onMouseLeave={e => { if (selected === null) e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: selected !== null && i === q.answer ? 'var(--bg)' : 'var(--text3)', minWidth: 20 }}>
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
