import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Theory from './pages/Theory'
import PeriodicTable from './pages/PeriodicTable'
import Lab from './pages/Lab'
import Quiz from './pages/Quiz'

export default function App() {
  return (
    <ThemeProvider>
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', transition: 'background 0.3s, color 0.3s' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/theory" element={<Theory />} />
          <Route path="/periodic" element={<PeriodicTable />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}
