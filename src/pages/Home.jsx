import { Link } from 'react-router-dom'

const sections = [
  {
    to: '/theory',
    label: '01',
    title: 'Теория',
    subtitle: 'Основы',
    desc: 'Строение атома, химическая связь, типы реакций, растворы, ОВР и органическая химия — структурированно и по делу.',
  },
  {
    to: '/periodic',
    label: '02',
    title: 'Таблица Менделеева',
    subtitle: 'Все 118 элементов',
    desc: 'Интерактивная таблица с карточками: конфигурация, свойства, год открытия, фильтры по категориям.',
  },
  {
    to: '/lab',
    label: '03',
    title: 'Лаборатория',
    subtitle: 'Виртуальные реакции',
    desc: 'Перетаскивай реагенты в колбу и наблюдай за реакцией: уравнение, тип, описание продуктов.',
  },
  {
    to: '/quiz',
    label: '04',
    title: 'Квиз',
    subtitle: 'Проверь знания',
    desc: 'Три уровня сложности. Отслеживание прогресса. Мгновенная обратная связь на каждый ответ.',
  },
]

export default function Home() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
      <section style={{ padding: '96px 0 80px', borderBottom: '1px solid var(--border)' }} className="fade-up">
        <p className="section-label" style={{ marginBottom: '1.5rem' }}>Интерактивный справочник</p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.04em', maxWidth: 640, lineHeight: 1.1 }}>
          Общая<br />химия
        </h1>
        <p style={{ color: 'var(--text2)', marginTop: '1.5rem', maxWidth: 480, fontSize: '1rem', lineHeight: 1.7 }}>
          Интерактивный справочник для любого уровня — от школьника до студента.
          Теория, таблица Менделеева, виртуальная лаборатория и тесты — всё в одном месте.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: '2rem', flexWrap: 'wrap' }}>
          <Link to="/theory" className="btn btn-primary" style={{ textDecoration: 'none' }}>Начать с теории</Link>
          <Link to="/periodic" className="btn" style={{ textDecoration: 'none' }}>Таблица Менделеева</Link>
        </div>
      </section>

      <section style={{ padding: '40px 0', borderBottom: '1px solid var(--border)', display: 'flex', gap: '3rem', flexWrap: 'wrap' }} className="fade-up delay-1">
        {[['118', 'элементов в таблице'], ['8', 'глав теории'], ['9+', 'реакций в лаборатории'], ['24', 'вопроса в квизе']].map(([n, l]) => (
          <div key={l}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.75rem', fontWeight: 500, letterSpacing: '-0.04em' }}>{n}</div>
            <div style={{ color: 'var(--text3)', fontSize: '0.8rem', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </section>

      <section style={{ padding: '60px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', background: 'var(--border)' }}>
          {sections.map(({ to, label, title, subtitle, desc }, i) => (
            <Link key={to} to={to} style={{ textDecoration: 'none', color: 'inherit' }} className={`fade-up delay-${i + 1}`}>
              <div
                style={{ background: 'var(--bg)', padding: '2rem', height: '100%', transition: 'background 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
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

      <footer style={{ padding: '2rem 0', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text3)' }}>Хим.guide — v2.0</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>Справочник по общей химии</span>
      </footer>
    </div>
  )
}
