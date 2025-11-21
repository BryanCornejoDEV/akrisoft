import { Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import Index from './pages/Index.jsx'
import Planes from './pages/Planes.jsx'
import Software from './pages/Software.jsx'
import Contacto from './pages/Contacto.jsx'
import Formulario from './pages/Formulario.jsx'
import AgendarDemo from './pages/AgendarDemo.jsx'

function App() {
  return (
    <div className="app-root">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/software" element={<Software />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/agendar-demo" element={<AgendarDemo />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
