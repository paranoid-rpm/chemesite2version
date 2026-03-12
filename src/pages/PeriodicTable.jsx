import { useState } from 'react'
import { ELEMENTS } from '../data/elements'

// Правильная раскладка: col и row для каждого элемента
const CATEGORY_COLORS = {
  'щелочной металл': '#1a1a1a',
  'щёлочноземельный металл': '#2d2d2d',
  'переходный металл': '#3a3a3a',
  'металлоид': '#484848',
  'неметалл': '#555',
  'галоген': '#626262',
  'благородный газ': '#707070',
  'лантаноид': '#3d3d3d',
  'актиноид': '#4a4a4a',
  'постпереходный металл': '#575757',
}

const CATEGORY_LABELS = {
  'щелочной металл': 'Щелочной металл',
  'щёлочноземельный металл': 'Щёл.-зем. металл',
  'переходный металл': 'Переходный металл',
  'металлоид': 'Металлоид',
  'неметалл': 'Неметалл',
  'галоген': 'Галоген',
  'благородный газ': 'Благ. газ',
  'лантаноид': 'Лантаноид',
  'актиноид': 'Актиноид',
  'постпереходный металл': 'Пост. металл',
}

function ElementCell({ el, onClick, dimmed }) {
  const bg = CATEGORY_COLORS[el.category] || '#333'
  return (
    <button
      onClick={() => onClick(el)}
      title={`${el.name} (${el.symbol})`}
      style={{
        width: '100%', height: '100%',
        background: bg,
        color: '#f0f0f0',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 3,
        padding: '2px 1px',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'transform 0.12s ease, opacity 0.2s ease',
        opacity: dimmed ? 0.1 : 1,
        lineHeight: 1.2,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}
      onMouseEnter={e => { if (!dimmed) { e.currentTarget.style.transform = 'scale(1.2)'; e.currentTarget.style.zIndex = 20; e.currentTarget.style.position = 'relative' } }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.zIndex = 1 }}
    >
      <div style={{ fontSize: 7, opacity: 0.55 }}>{el.number}</div>
      <div style={{ fontSize: 11, fontWeight: 700 }}>{el.symbol}</div>
      <div style={{ fontSize: 6.5, opacity: 0.5, maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{el.name}</div>
    </button>
  )
}

export default function PeriodicTable() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const categories = [...new Set(ELEMENTS.map(e => e.category))]

  const matchSearch = (e) => !search ||
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.symbol.toLowerCase().includes(search.toLowerCase()) ||
    String(e.number).includes(search)

  const matchFilter = (e) => filter === 'all' || e.category === filter

  const isVisible = (e) => matchSearch(e) && matchFilter(e)

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
      <div style={{ padding: '48px 0 24px' }} className="fade-up">
        <p className="section-label" style={{ marginBottom: 12 }}>Интерактивная</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em' }}>Таблица Менделеева</h1>
        <p style={{ color: 'var(--text2)', marginTop: 8, fontSize: '0.875rem' }}>Нажми на любой элемент, чтобы увидеть подробную информацию.</p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 10, marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Поиск: название, символ или номер..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: '7px 14px', borderRadius: 8,
            border: '1px solid var(--border)', background: 'var(--bg2)',
            color: 'var(--text)', fontSize: '0.825rem', outline: 'none', width: 280,
          }}
        />
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          <button className="btn" onClick={() => setFilter('all')}
            style={{ fontSize: '0.72rem', padding: '4px 10px', background: filter === 'all' ? 'var(--text)' : 'var(--bg2)', color: filter === 'all' ? 'var(--bg)' : 'var(--text)' }}>
            Все
          </button>
          {categories.map(c => (
            <button key={c} className="btn" onClick={() => setFilter(f => f === c ? 'all' : c)}
              style={{ fontSize: '0.7rem', padding: '4px 10px', background: filter === c ? 'var(--text)' : 'var(--bg2)', color: filter === c ? 'var(--bg)' : 'var(--text2)' }}>
              {CATEGORY_LABELS[c] || c}
            </button>
          ))}
        </div>
      </div>

      {/* Table — CSS grid с фиксированными размерами */}
      <div style={{ overflowX: 'auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(18, 44px)',
          gridTemplateRows: 'repeat(10, 48px)',
          gap: '2px',
          minWidth: 828,
        }}>
          {ELEMENTS.map(el => (
            <div
              key={el.number}
              style={{
                gridColumn: el.col,
                gridRow: el.row,
              }}
            >
              <ElementCell el={el} onClick={setSelected} dimmed={!isVisible(el)} />
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
        {categories.map(c => (
          <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: CATEGORY_COLORS[c] || '#555' }} />
            <span style={{ fontSize: '0.7rem', color: 'var(--text2)' }}>{CATEGORY_LABELS[c] || c}</span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100, padding: '1rem', backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.2s ease',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'var(--bg)', border: '1px solid var(--border)',
            borderRadius: 16, padding: '2.5rem', maxWidth: 460, width: '100%',
            animation: 'fadeUp 0.25s ease',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text3)', marginBottom: 4 }}>№ {selected.number}</div>
                <div style={{ fontSize: '4rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>{selected.symbol}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 4 }}>{selected.name}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{
                background: 'none', border: '1px solid var(--border)', borderRadius: 8,
                width: 32, height: 32, cursor: 'pointer', color: 'var(--text2)',
                fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>&times;</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: '1.25rem' }}>
              {[
                ['Атомная масса', selected.mass],
                ['Период', selected.period],
                ['Группа', selected.group],
                ['Фаза', selected.phase],
                ['Категория', CATEGORY_LABELS[selected.category] || selected.category],
                ['Открыт', selected.discovered < 0 ? `${Math.abs(selected.discovered)} до н.э.` : selected.discovered],
                ['Конфигурация', selected.config],
              ].map(([k, v]) => (
                <div key={k} style={{ background: 'var(--bg2)', borderRadius: 8, padding: '0.6rem 0.875rem' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text3)', marginBottom: 2 }}>{k}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
            {selected.description && (
              <p style={{ color: 'var(--text2)', fontSize: '0.85rem', lineHeight: 1.65 }}>{selected.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
