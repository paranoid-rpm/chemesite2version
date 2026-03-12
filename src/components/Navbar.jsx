import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/theory', label: 'Theory' },
  { to: '/periodic', label: 'Periodic Table' },
  { to: '/lab', label: 'Laboratory' },
  { to: '/quiz', label: 'Quiz' },
]

export default function Navbar() {
  const { dark, toggle } = useTheme()

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <nav
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', height: 56 }}
        className="flex items-center justify-between"
      >
        {/* Logo */}
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.03em', color: 'var(--text)' }}>
            Chem<span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 400 }}>.guide</span>
          </span>
        </NavLink>

        {/* Links */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: 2, listStyle: 'none', margin: 0, padding: 0 }}>
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                style={({ isActive }) => ({
                  display: 'block',
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--text)' : 'var(--text2)',
                  background: isActive ? 'var(--bg2)' : 'transparent',
                  textDecoration: 'none',
                  border: isActive ? '1px solid var(--border)' : '1px solid transparent',
                  transition: 'all 0.15s ease',
                })}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          style={{
            width: 36, height: 36,
            borderRadius: 8,
            border: '1px solid var(--border)',
            background: 'var(--bg2)',
            color: 'var(--text)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem',
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 500,
            transition: 'all 0.15s ease',
          }}
        >
          {dark ? 'L' : 'D'}
        </button>
      </nav>
    </header>
  )
}
