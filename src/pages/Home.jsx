import { Link } from 'react-router-dom'

const sections = [
  {
    to: '/theory',
    label: '01',
    title: 'Theory',
    subtitle: 'Foundations',
    desc: 'Atomic structure, chemical bonding, reaction types, solutions, redox, and organic chemistry — structured and concise.',
  },
  {
    to: '/periodic',
    label: '02',
    title: 'Periodic Table',
    subtitle: 'All 118 elements',
    desc: 'Complete interactive table with element cards: configuration, properties, discovery year, and category filters.',
  },
  {
    to: '/lab',
    label: '03',
    title: 'Laboratory',
    subtitle: 'Virtual reactions',
    desc: 'Drag reagents into the flask. Observe reactions with real equations, effect types, and product descriptions.',
  },
  {
    to: '/quiz',
    label: '04',
    title: 'Quiz',
    subtitle: 'Test your knowledge',
    desc: 'Three difficulty levels. Progress tracking. Instant feedback on every answer.',
  },
]

export default function Home() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>

      {/* Hero */}
      <section style={{ padding: '96px 0 80px', borderBottom: '1px solid var(--border)' }} className="fade-up">
        <p className="section-label" style={{ marginBottom: '1.5rem' }}>Interactive chemistry guide</p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.04em', maxWidth: 640, lineHeight: 1.1 }}>
          General<br />
          Chemistry
        </h1>
        <p style={{ color: 'var(--text2)', marginTop: '1.5rem', maxWidth: 480, fontSize: '1rem', lineHeight: 1.7 }}>
          A rigorous, interactive reference for students and anyone curious about the fundamentals of chemistry.
          Theory, periodic table, virtual lab, and quizzes — all in one place.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: '2rem', flexWrap: 'wrap' }}>
          <Link to="/theory" className="btn btn-primary" style={{ textDecoration: 'none' }}>Start with Theory</Link>
          <Link to="/periodic" className="btn" style={{ textDecoration: 'none' }}>Periodic Table</Link>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '40px 0', borderBottom: '1px solid var(--border)', display: 'flex', gap: '3rem', flexWrap: 'wrap' }} className="fade-up delay-1">
        {[
          ['118', 'elements in the table'],
          ['8', 'theory chapters'],
          ['9+', 'laboratory reactions'],
          ['36', 'quiz questions'],
        ].map(([n, l]) => (
          <div key={l}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.75rem', fontWeight: 500, letterSpacing: '-0.04em' }}>{n}</div>
            <div style={{ color: 'var(--text3)', fontSize: '0.8rem', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </section>

      {/* Sections grid */}
      <section style={{ padding: '60px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', background: 'var(--border)' }}>
          {sections.map(({ to, label, title, subtitle, desc }, i) => (
            <Link
              key={to}
              to={to}
              style={{ textDecoration: 'none', color: 'inherit' }}
              className={`fade-up delay-${i + 1}`}
            >
              <div
                style={{ background: 'var(--bg)', padding: '2rem', height: '100%', transition: 'background 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text3)' }}>{label}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text3)' }}>&rarr;</span>
                </div>
                <div className="section-label" style={{ marginBottom: '0.4rem' }}>{subtitle}</div>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{title}</h2>
                <p style={{ color: 'var(--text2)', fontSize: '0.85rem', lineHeight: 1.65 }}>{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <footer style={{ padding: '2rem 0', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text3)' }}>Chem.guide — v2.0</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>General Chemistry Reference</span>
      </footer>
    </div>
  )
}
