import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'

import Navbar from './components/Navbar.jsx'
import Layout from './components/Layout.jsx'

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
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/planes" element={<Layout><Planes /></Layout>} />
            <Route path="/software" element={<Layout><Software /></Layout>} />
            <Route path="/contacto" element={<Layout><Contacto /></Layout>} />
            <Route path="/formulario" element={<Layout><Formulario /></Layout>} />
            <Route path="/agendar-demo" element={<Layout><AgendarDemo /></Layout>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
