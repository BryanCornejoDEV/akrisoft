export default function SoftwareSpecs(){
  return (
    <section className="software-specs">
      <div className="container specs-top">
        <div className="spec-box">
          <h3>Software de contabilidad perfecto</h3>
          <p>Simplifica el seguimiento de recibos, ingresos, transacciones bancarias y más con el software de contabilidad número uno para PyMES.</p>
          <div className="spec-icon" aria-hidden>
            <img src="/Contabilidad.png" alt="Contabilidad" />
          </div>
        </div>
        <div className="spec-box">
          <h3>Tenga confianza desde el primer día</h3>
            <p>Ya sea que tu negocio esté comenzando o subiendo al siguiente nivel, Akrisoft tiene las herramientas, características y recursos para prepararte para el éxito.</p>
          <div className="spec-icon" aria-hidden>
            <img src="/Confianza.png" alt="Confianza" />
          </div>
        </div>
      </div>
      <div className="container specs-flex">
        <div className="specs-logo" aria-hidden>
          <img src="/LogoCircular.png" alt="Akrisoft" />
        </div>
        <div className="specs-info">
          <h3 className="specs-title">Explora soluciones flexibles con Akrisoft</h3>
          
          <div className="specs-grid-list">
            <div className="specs-item">
              <div className="specs-dot"></div>
              <div>
                <h4>Facturación Electrónica</h4>
                <p>Akrisoft emite y gestiona comprobantes de facturación electrónica compliant con la normativa local, firma digital y almacenamiento seguro.</p>
              </div>
            </div>
            
            <div className="specs-item">
              <div className="specs-dot"></div>
              <div>
                <h4>Sistema Contable</h4>
                <p>La arquitectura de la contabilidad se encuentra integrada en tiempo real, permitiendo automatizar asientos, conciliaciones y obtener informes fiscales y gerenciales.</p>
              </div>
            </div>

            <div className="specs-item">
              <div className="specs-dot"></div>
              <div>
                <h4>API Rest</h4>
                <p>Orquesta e integra procesos de negocio y aplicaciones con nuestra API abierta y segura. Tokens y webhooks.</p>
              </div>
            </div>
          </div>

          <button className="btn-primary specs-btn" onClick={()=>window.location.href='/software'}>Más información</button>
        </div>
      </div>
    </section>
  )
}
