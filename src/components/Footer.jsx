export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-art" aria-hidden>
        <img src="/LogoBlanco.png" alt="Decoración"/>
      </div>
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="/DatapheLogo.png" alt="DATA PHE" className="footer-logo" />
          <div className="footer-text">
            <p className="legal">© 2024 DATA PHE, S.A. DE C.V. Todos los derechos reservados.</p>
            <p className="legal">DATA PHE, AKRISOFT, son marcas comerciales registradas de DATA PHE. Los términos y condiciones, las funciones, el soporte, los precios y las opciones de servicio pueden cambiar sin previo aviso.</p>
            <p className="legal">Al acceder a esta página y usarla, aceptas los Términos y condiciones.</p>
          </div>
          <div className="footer-social" aria-label="Redes sociales">
            <a aria-label="Instagram" href="#" className="social-item"><img src="/Instagram.png" alt="Instagram" /></a>
            <a aria-label="Facebook" href="#" className="social-item"><img src="/Facebook.png" alt="Facebook" /></a>
            <a aria-label="LinkedIn" href="#" className="social-item"><img src="/LinkedIn.png" alt="LinkedIn" /></a>
            <a aria-label="TikTok" href="#" className="social-item"><img src="/Tiktok.png" alt="TikTok" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
