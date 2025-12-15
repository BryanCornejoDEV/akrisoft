import { useNavigate } from 'react-router-dom'

const cards = [
  {
    title: 'Facturación Electrónica Automatizada',
    bullets: [
      'Generación, envío y recepción automática de comprobantes conforme a la normativa.',
      'Validación y timbrado ante autoridades fiscales.',
      'Emisión automática de facturas, boletas y notas de crédito/débito.',
      'Conservación y búsqueda de XML/PDF relacionados.',
      'Control de series, folios y numeración fiscal.'
    ]
  },
  {
    title: 'Sistema Contable integral',
    bullets: [
      'Contabilidad integrada en tiempo real que soporta libros y reportes fiscales.',
      'Plan contable configurable y multiempresa.',
      'Asientos automáticos desde ventas, compras, bancos y nómina.',
      'Conciliación bancaria y control de centros de costo.',
      'Reportes: balance, P&L, mayor auxiliar, estados tributarios.'
    ]
  },
  {
    title: 'API abierta y segura',
    bullets: [
      'API REST/GraphQL para integrar y orquestar procesos.',
      'Endpoints para facturación, contabilidad, clientes, productos y conciliación.',
      'Autenticación por OAuth2 / API keys y control de roles.',
      'Documentación interactiva (OpenAPI) y sandbox para pruebas.',
      'Webhooks firmados y trazabilidad completa.'
    ]
  }
]

export default function SoftwareCards(){
  const navigate = useNavigate()

  return (
    <div className="software-cards-section">
      <div className="software-cards-bg" aria-hidden />
      <div className="container software-cards-grid">
        {cards.map(c => (
          <article key={c.title} className="software-card">
            <h3>{c.title}</h3>
            <ul className="software-card-list">
              {c.bullets.map(b => <li key={b}>{b}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <div className="software-cards-cta">
        <button className="btn-primary" onClick={() => navigate("/planes")}>Ver planes</button>
      </div>
    </div>
  )
}
