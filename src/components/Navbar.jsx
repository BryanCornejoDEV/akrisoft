import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Logo = () => (
  <Link to="/" className="nav-logo" aria-label="Akrisoft home">
    <img src="/Logo.png" alt="Akrisoft" height="64" />
  </Link>
)

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <Logo />
          
          {/* Desktop Nav */}
          <nav className="nav-links" aria-label="Principal">
            <NavLink to="/agendar-demo" className={({isActive})=> isActive? 'active': undefined}>Agenda una demo</NavLink>
            <NavLink to="/planes" className={({isActive})=> isActive? 'active': undefined}>Planes</NavLink>
            <NavLink to="/software" className={({isActive})=> isActive? 'active': undefined}>Software</NavLink>
            <NavLink to="/contacto" className={({isActive})=> isActive? 'active': undefined}>Contacto</NavLink>

            <div className="dropdown" onMouseLeave={()=>setDropdownOpen(false)}>
              <button 
                className="dropdown-trigger" 
                onMouseEnter={()=>setDropdownOpen(true)} 
                onClick={()=>setDropdownOpen(v=>!v)} 
                aria-haspopup="menu" 
                aria-expanded={dropdownOpen}
              >
                Partners ▾
              </button>
              <div className={`dropdown-menu ${dropdownOpen ? 'open' : ''}`} role="menu">
                <a href="https://dataphe.com/" target='_blank' role="menuitem">DATA PHE</a>
                <a href="https://www.aeinformatica.net/" target='_blank' role="menuitem">AE INFORMÁTICA</a>
                <a href="https://taasint.com/" target='_blank' role="menuitem">TAAS INTERNATIONAL</a>
              </div>
            </div>
          </nav>

          <div className="nav-cta">
            <a className="btn-outline" href="https://app.akrisoft.com/login" target='_blank' aria-label="Iniciar sesión">Iniciar sesión</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div 
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`} 
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Nav Drawer */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
          <span style={{fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--ak-secondary)'}}>Menú</span>
          <button 
            onClick={closeMobileMenu}
            style={{background: 'none', border: 'none', fontSize: '1.5rem', padding: '0.5rem', cursor: 'pointer'}}
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>
        
        <NavLink to="/agendar-demo" onClick={closeMobileMenu} className={({isActive})=> isActive? 'active': undefined}>Agenda una demo</NavLink>
        <NavLink to="/planes" onClick={closeMobileMenu} className={({isActive})=> isActive? 'active': undefined}>Planes</NavLink>
        <NavLink to="/software" onClick={closeMobileMenu} className={({isActive})=> isActive? 'active': undefined}>Software</NavLink>
        <NavLink to="/contacto" onClick={closeMobileMenu} className={({isActive})=> isActive? 'active': undefined}>Contacto</NavLink>
        <a href="https://app.akrisoft.com/login" target='_blank' className="btn-primary" style={{textAlign: 'center', marginTop: '1rem'}}>Iniciar sesión</a>
      </div>
    </>
  )
}
