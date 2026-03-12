import { useState } from 'react'
import { ELEMENTS } from '../data/elements'

const CATEGORY_COLORS = {
  'щелочной металл': '#1a1a1a',
  'щёлочноземельный металл': '#2d2d2d',
  'переходный металл': '#3a3a3a',
  'металлоид': '#484848',
  'неметалл': '#555555',
  'галоген': '#626262',
  'благородный газ': '#707070',
  'лантаноид': '#3d3d3d',
  'актиноид': '#4a4a4a',
  'постпереходный метамл': '#575757',
}

function ElementCell({ el, onClick }) {
  const bg = CATEGORY_COLORS[el.category] || '#333'
  return (
    <button
      onClick={() => onClick(el)}
      title={el.name}
      style={{
        gridColumn: el.col,
        gridRow: el.row,
        background: bg,
        color: '#f5f5f5',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 4,
        padding: '2px',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease',
        lineHeight: 1.2,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.18)'
        e.currentTarget.style.zIndex = 10
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.zIndex = 1
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ fontSize: 8, opacity: 0.6, lineHeight: 1.4 }}>{el.number}</div>
      <div style={{ fontSize: 11, fontWeight: 700 }}>{el.symbol}</div>
      <div style={{ fontSize: 7, opacity: 0.5, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{el.name}</div>
    </button>
  )
}

export default function PeriodicTable() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const categories = [...new Set(ELEMENTS.map(e => e.category))]

  const filtered = ELEMENTS.filter(e => {
    const matchFilter = filter === 'all' || e.category === filter
    const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.symbol.toLowerCase().includes(search.toLowerCase()) || String(e.number).includes(search)
    return matchFilter && matchSearch
  })

  const filteredIds = new Set(filtered.map(e => e.number))

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
      <div style={{ padding: '48px 0 32px' }} className="fade-up">
        <p className="section-label" style={{ marginBottom: 12 }}>Interactive</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em' }}>Periodic Table</h1>
        <p style={{ color: 'var(--text2)', marginTop: 8, fontSize: '0.875rem' }}>Click any element for full details.</p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search element, symbol, or number..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: '7px 14px',
            borderRadius: 8,
            border: '1px solid var(--border)',
            background: 'var(--bg2)',
            color: 'var(--text)',
            fontSize: '0.85rem',
            outline: 'none',
            width: 260,
            fontFamily: 'Inter, sans-serif',
          }}
        />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button
            className="btn"
            style={{ fontSize: '0.75rem', padding: '5px 12px', background: filter === 'all' ? 'var(--text)' : 'var(--bg2)', color: filter === 'all' ? 'var(--bg)' : 'var(--text)' }}
            onClick={() => setFilter('all')}
          >All</button>
          {categories.map(c => (
            <button
              key={c}
              className="btn"
              style={{ fontSize: '0.7rem', padding: '5px 10px', background: filter === c ? 'var(--text)' : 'var(--bg2)', color: filter === c ? 'var(--bg)' : 'var(--text2)' }}
              onClick={() => setFilter(f => f === c ? 'all' : c)}
            >{c}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', paddingBottom: '1rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(18, minmax(42px, 1fr))',
          gridTemplateRows: 'repeat(10, 52px)',
          gap: 2,
        }}>
          {ELEMENTS.map(el => (
            <div
              key={el.number}
              style={{ gridColumn: el.col, gridRow: el.row, opacity: filteredIds.has(el.number) ? 1 : 0.1, transition: 'opacity 0.3s ease' }}
            >
              <ElementCell el={el} onClick={setSelected} />
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        {categories.map(c => (
          <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: CATEGORY_COLORS[c] || '#555', border: '1px solid var(--border)' }} />
            <span style={{ fontSize: '0.7rem', color: 'var(--text2)' }}>{c}</span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 100, padding: '1rem',
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              padding: '2.5rem',
              maxWidth: 440,
              width: '100%',
              animation: 'fadeUp 0.25s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text3)', marginBottom: 4 }}>No. {selected.number}</div>
                <div style={{ fontSize: '4rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>{selected.symbol}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 4 }}>{selected.name}</div>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', color: 'var(--text2)', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >×</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: '1.25rem' }}>
              {[
                ['Atomic mass', selected.mass],
                ['Period', selected.period],
                ['Group', selected.group],
                ['Phase', selected.phase],
                ['Category', selected.category],
                ['Discovered', selected.discovered < 0 ? `${Math.abs(selected.discovered)} BC` : selected.discovered],
                ['Configuration', selected.config],
              ].map(([k, v]) => (
                <div key={k} style={{ background: 'var(--bg2)', borderRadius: 8, padding: '0.6rem 0.875rem' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text3)', marginBottom: 2 }}>{k}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', fontWeight: 500 }}>{v}</div>
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
