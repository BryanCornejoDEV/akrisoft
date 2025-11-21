export default function Features(){
  const features = [
    { title: 'Contabilidad', desc: 'Operaciones diarias, cierres contables, estados financieros y más.' },
    { title: 'Caja', desc: 'Recepción de pagos, egresos y conciliaciones rápidas.' },
    { title: 'Compras', desc: 'Órdenes, recepciones y cuentas por pagar.' },
    { title: 'Ventas', desc: 'Cotizaciones, pedidos, facturación y cuentas por cobrar.' },
    { title: 'Activo Fijo', desc: 'Altas, bajas, depreciación y reportes.' },
    { title: 'Inventarios', desc: 'Entradas, salidas y kardex en tiempo real.' },
  ]
  return (
    <section className="section features">
      <div className="container">
        <h2 className="section-title features-title">Funciones para todo tipo de negocio</h2>

        <div className="features-media">
          <img src="/AkriSistema.png" alt="Akrisoft en distintos dispositivos" />
        </div>

        <div className="grid grid-3 features-grid">
          {features.map((f)=> (
            <article key={f.title} className="card feature-card">
              <div className="feature-icon" aria-hidden />
              <div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
