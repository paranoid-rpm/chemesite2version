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
      <div className="min-h-screen">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/theory" element={<Theory />} />
            <Route path="/periodic" element={<PeriodicTable />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  )
}
