import { planes } from '../data/planesData.js'
import { useNavigate } from 'react-router-dom'

const formatCurrency = v => `$${v.toFixed(2)}`

export default function PlanesCards(){
  const navigate = useNavigate()

  return (
    <div className="planes-cards-wrapper">
      <div className="planes-cards">
        {planes.map(p=> (
          <article key={p.id} className="plan-card">
            <header className="plan-head">
              <h3 className="plan-title">Plan {p.nombre}</h3>
              <div className="plan-price">{formatCurrency(p.precioMensual)}<span className="period"> /mes</span></div>
              <div className="plan-sub">Pago anual {formatCurrency(p.precioAnual)}</div>
            </header>
            <ul className="plan-features">
              <li><strong>Usuarios:</strong> {p.usuarios}</li>
              <li><strong>Transacciones permitidas:</strong> {p.transacciones}</li>
              <li><strong>Valor por transacción:</strong> ${p.valorTransaccion.toFixed(2)}</li>
              {p.incluye.map(i => <li key={i}>{i}</li>)}
            </ul>
            <div className="plan-actions">
              <button className="btn-primary" onClick={() => navigate("/agendar-demo")}>Obtener plan</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
