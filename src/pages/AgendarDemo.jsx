import AgendarDemoCalendario from '../components/agendar/AgendarDemoCalendario.jsx'
import AgendarDemoPicker from '../components/agendar/AgendarDemoPicker.jsx'
import AgendarDemoFormulario from '../components/agendar/AgendarDemoFormulario.jsx'

export default function AgendarDemo(){
  return (
    <section className="section">
      <div className="container grid grid-2">
        <div>
          <h1>Agendar demo</h1>
          <p>Selecciona la fecha y hora que más te convenga.</p>
          <AgendarDemoCalendario />
          <div style={{marginTop:16}}>
            <AgendarDemoPicker />
          </div>
        </div>
        <div>
          <h2>Datos de contacto</h2>
          <AgendarDemoFormulario />
        </div>
      </div>
    </section>
  )
}
