import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

const Logo = () => (
  <Link to="/" className="nav-logo" aria-label="Akrisoft home">
    <img src="/Logo.png" alt="Akrisoft" height="64" />
  </Link>
)

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Logo />
        <nav className="nav-links" aria-label="Principal">
          <NavLink to="/agendar-demo" className={({isActive})=> isActive? 'active': undefined}>Agenda una demo</NavLink>
          <NavLink to="/planes" className={({isActive})=> isActive? 'active': undefined}>Planes</NavLink>
          <NavLink to="/software" className={({isActive})=> isActive? 'active': undefined}>Software</NavLink>
          <NavLink to="/contacto" className={({isActive})=> isActive? 'active': undefined}>Contacto</NavLink>

          <div className="dropdown" onMouseLeave={()=>setOpen(false)}>
            <button className="dropdown-trigger" onMouseEnter={()=>setOpen(true)} onClick={()=>setOpen(v=>!v)} aria-haspopup="menu" aria-expanded={open}>Partners ▾</button>
            {open && (
              <div className="dropdown-menu" role="menu">
                <a href="https://dataphe.com/" target='_blank' role="menuitem">DATA PHE</a>
                <a href="https://www.aeinformatica.net/" target='_blank' role="menuitem">AE INFORMÁTICA</a>
                <a href="https://taasint.com/" target='_blank' role="menuitem">TAAS INTERNATIONAL</a>
              </div>
            )}
          </div>
        </nav>

        <div className="nav-cta">
          <a className="btn-outline" href="https://app.akrisoft.com/login" target='_blank' aria-label="Iniciar sesión">Iniciar sesión</a>
        </div>
      </div>
    </header>
  )
}
