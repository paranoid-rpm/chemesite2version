import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const links = [
  { to: '/', label: 'Главная' },
  { to: '/theory', label: 'Теория' },
  { to: '/periodic', label: 'Таблица' },
  { to: '/lab', label: 'Лаборатория' },
  { to: '/quiz', label: 'Квиз' },
]

export default function Navbar() {
  const { dark, toggle } = useTheme()

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
    }}>
      <nav style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', height: 56 }}
        className="flex items-center justify-between">
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.03em', color: 'var(--text)' }}>
            Хим<span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 400 }}>.guide</span>
          </span>
        </NavLink>

        <ul style={{ display: 'flex', alignItems: 'center', gap: 2, listStyle: 'none', margin: 0, padding: 0 }}>
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'}
                style={({ isActive }) => ({
                  display: 'block', padding: '6px 14px', borderRadius: 8,
                  fontSize: '0.8rem', fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--text)' : 'var(--text2)',
                  background: isActive ? 'var(--bg2)' : 'transparent',
                  textDecoration: 'none',
                  border: isActive ? '1px solid var(--border)' : '1px solid transparent',
                  transition: 'all 0.15s ease',
                })}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button onClick={toggle} style={{
          width: 36, height: 36, borderRadius: 8,
          border: '1px solid var(--border)', background: 'var(--bg2)',
          color: 'var(--text)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 500,
          transition: 'all 0.15s ease',
        }}>
          {dark ? 'С' : 'Т'}
        </button>
      </nav>
    </header>
  )
}
