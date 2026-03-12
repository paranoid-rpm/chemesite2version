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
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight">
          ⚗️ <span className="text-indigo-500">Хим</span>Сайт
        </span>

        <ul className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  isActive
                    ? 'px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-medium text-sm'
                    : 'btn-ghost text-sm'
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          onClick={toggle}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xl"
          aria-label="Переключить тему"
        >
          {dark ? '☀️' : '🌙'}
        </button>
      </nav>
    </header>
  )
}
