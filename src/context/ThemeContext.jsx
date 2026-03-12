import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const getSystemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') return 'dark'
    if (saved === 'light') return 'light'
    return 'system'
  })

  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') return true
    if (saved === 'light') return false
    return getSystemDark()
  })

  // Слушаем изменения системной темы
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => {
      if (mode === 'system') setDark(e.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [mode])

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [dark])

  const toggle = () => {
    if (mode === 'system') {
      // system → light
      setMode('light'); setDark(false); localStorage.setItem('theme', 'light')
    } else if (mode === 'light') {
      // light → dark
      setMode('dark'); setDark(true); localStorage.setItem('theme', 'dark')
    } else {
      // dark → system
      setMode('system'); setDark(getSystemDark()); localStorage.removeItem('theme')
    }
  }

  return (
    <ThemeContext.Provider value={{ dark, mode, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
