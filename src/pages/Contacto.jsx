import FormularioContacto from '../components/FormularioContacto.jsx'
import MapaContacto from '../components/MapaContacto.jsx'

export default function Contacto(){
  return (
    <section className="section">
      <div className="container grid grid-2">
        <div>
          <h1>Contacto</h1>
          <p>¿Deseas más información? Escríbenos y te contactaremos.</p>
          <FormularioContacto />
        </div>
        <div>
          <h2>Ubicación</h2>
          <MapaContacto />
        </div>
      </div>
    </section>
  )
}
