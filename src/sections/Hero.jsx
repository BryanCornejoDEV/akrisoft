export default function Hero(){
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <h1>Sistema contable para PyMES: tu éxito a tu alcance</h1>
          <p>Organiza y registra las transacciones financieras para simplificar la gestión contable: facturación, compras, inventarios y bancos.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => window.location.href="/agendar-demo"}>Agendar demo</button>
            <button className="btn-outline" onClick={() => window.location.href="/planes"}>Ver planes</button>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-circle" />
        </div>
      </div>
    </section>
  )
}
