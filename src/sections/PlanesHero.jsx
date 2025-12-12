import { useNavigate } from 'react-router-dom'

export default function PlanesHero(){
  const navigate = useNavigate()

  return (
    <header className="planes-hero">
      <div className="planes-hero-inner container">
        <div className="planes-hero-copy">
          <h1 className="planes-hero-title">Precios de Akrisoft</h1>
          <p className="planes-hero-sub">Busca el plan que mejor se adapte a tu negocio — compara características, precios y servicios adicionales.</p>

          <div className="planes-hero-actions">
            <button className="btn-outline" onClick={() => navigate('/agendar-demo')}>Solicitar demo</button>
            <button className="btn-primary" onClick={() => navigate('/contacto')}>Contactar</button>
          </div>

          <nav className="planes-hero-tabs" aria-label="Secciones de planes">
            <a className="tab active" href="#precios">Precios</a>
            <a className="tab" href="#comparar">Comparar planes</a>
            <a className="tab" href="#guia">Guía de licencias</a>
            <a className="tab" href="#introduccion">Introducción</a>
          </nav>
        </div>
      </div>
    </header>
  )
}
