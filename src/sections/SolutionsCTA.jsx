export default function SolutionsCTA(){
  return (
    <section className="section">
      <div className="container grid grid-2">
        <div className="card">
          <h3>Software de contabilidad perfecto</h3>
          <p>Simplifica el seguimiento de ingresos, egresos y transacciones bancarias con el software de contabilidad número uno para PyMES.</p>
        </div>
        <div className="card">
          <h3>Tenga confianza desde el primer día</h3>
          <p>Ya sea que estés comenzando o escalando, Akrisoft ofrece las funciones, recursos y acompañamiento que necesitas.</p>
        </div>
      </div>
      <div className="container cta-banner">
        <div className="cta-media" aria-hidden>
          <img src="/LogoCircular.png" alt="Akrisoft" height="80" />
        </div>
        <div className="cta-copy">
          <h3>Explora soluciones flexibles con Akrisoft</h3>
          <ul>
            <li>Facturación electrónica</li>
            <li>Sistema contable</li>
            <li>API REST</li>
          </ul>
        </div>
          <div>
          <button className="btn-primary" onClick={() => window.location.href="/software"}>Más información</button>
        </div>
      </div>
    </section>
  )
}
