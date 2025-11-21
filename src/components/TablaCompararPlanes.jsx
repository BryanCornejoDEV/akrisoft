import { planes, featureMatrix } from '../data/planesData.js'

const icon = ok => ok ? <span className="chk" aria-label="Incluido">✓</span> : <span className="dash" aria-hidden>—</span>

export default function TablaCompararPlanes(){
  return (
    <div className="table-wrap plan-compare">
      <table className="table compare-table">
        <thead>
          <tr>
            <th>Características</th>
            {planes.map(p=> <th key={p.id}>Plan {p.nombre}</th>)}
          </tr>
        </thead>
        <tbody>
          {featureMatrix.map(f => (
            <tr key={f.key}>
              <td>{f.label}</td>
              {planes.map(p => {
                if(f.type === 'value') return <td key={p.id}>{p.usuarios}</td>
                if(f.type === 'number') return <td key={p.id}>{p.transacciones}</td>
                if(f.type === 'currency') return <td key={p.id}>${p.valorTransaccion.toFixed(2)}</td>
                if(f.type === 'bool') return <td key={p.id}>{icon(p.modulos[f.key])}</td>
                return <td key={p.id}>—</td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
