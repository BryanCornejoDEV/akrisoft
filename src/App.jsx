import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'

import Navbar from './components/Navbar.jsx'
import PageTransition from './components/PageTransition.jsx'

import Index from './pages/Index.jsx'
import Planes from './pages/Planes.jsx'
import Software from './pages/Software.jsx'
import Contacto from './pages/Contacto.jsx'
import Formulario from './pages/Formulario.jsx'
import AgendarDemo from './pages/AgendarDemo.jsx'

function App() {
  const location = useLocation()

  return (
    <div className="app-root">
      <Navbar />

      <main>
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Index /></PageTransition>} />
            <Route path="/planes" element={<PageTransition><Planes /></PageTransition>} />
            <Route path="/software" element={<PageTransition><Software /></PageTransition>} />
            <Route path="/contacto" element={<PageTransition><Contacto /></PageTransition>} />
            <Route path="/formulario" element={<PageTransition><Formulario /></PageTransition>} />
            <Route path="/agendar-demo" element={<PageTransition><AgendarDemo /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
