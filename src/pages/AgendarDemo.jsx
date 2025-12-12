import { useState } from 'react'
import AgendarDemoCalendario from '../components/agendar/AgendarDemoCalendario.jsx'
import AgendarDemoFormulario from '../components/agendar/AgendarDemoFormulario.jsx'
import '../AgendarDemo.css'

// Imágenes desde public
const DatapheLogo = '/DatapheLogo2.png'
const Logo = '/Logo.png'
const CorreoIcon = '/Correo.png'

export default function AgendarDemo() {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    empresa: '',
    cargo: '',
    invitados: ''
  })

  const generateTimes = (startHour = 8, endHour = 18, stepMinutes = 30) => {
    const times = []
    const d = new Date()
    d.setHours(startHour, 0, 0, 0)
    while (d.getHours() < endHour || (d.getHours() === endHour && d.getMinutes() === 0)) {
      // Mostrar en formato AM/PM
      times.push(d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
      d.setTime(d.getTime() + stepMinutes * 60000)
    }
    return times
  }

  const availableTimes = generateTimes(8, 18, 30)

  const formatDate = (date) => {
    if (!date) return ''
    // Capitalize first letter of weekday
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    const dateString = date.toLocaleDateString('es-MX', options)
    return dateString.charAt(0).toUpperCase() + dateString.slice(1)
  }

  const handleNext = () => {
    if (step === 1) {
      if (selectedDate && selectedTime) {
        setStep(2)
      } else {
        alert('Por favor selecciona una fecha y una hora.')
      }
    } else if (step === 2) {
      // Validar formulario si es necesario
      if (formData.nombre && formData.correo && formData.apellidos && formData.telefono) {
        setStep(3)
      } else {
        alert('Por favor completa los campos obligatorios (*)')
      }
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <section className="agendar-demo-container">
      {/* Stepper */}
      <div className="stepper">
        <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
          <div className="step-circle"></div>
          <span>Elige tu hora</span>
        </div>
        <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
        <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
          <div className="step-circle"></div>
          <span>Tu información</span>
        </div>
      </div>

      {/* Logos */}
      <div className="logos-container">
        <img src={DatapheLogo} alt="Dataphe" className="logo-img" />
        <img src={Logo} alt="Akrisoft" className="logo-img" />
      </div>

      {/* Main Card */}
      <div className="demo-card">
        {step === 1 && (
          <div className="step1-layout">
            <div className="time-selection">
              <h3>Agenda una reunión para Demo</h3>
              <p style={{marginBottom: '1rem'}}>¿En qué horario puedes?</p>
              <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '1rem'}}>
                Horarios disponibles para el <strong>{selectedDate.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
              </p>
              
              <div className="time-list">
                {availableTimes.map(time => (
                  <button 
                    key={time} 
                    className={`time-btn ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <AgendarDemoCalendario 
                selectedDate={selectedDate} 
                onDateChange={setSelectedDate} 
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{textAlign: 'center', marginBottom: '1rem'}}>
              <h2>Tu información</h2>
              <p style={{color: '#666'}}>
                {formatDate(selectedDate)} {selectedTime}
              </p>
            </div>
            <AgendarDemoFormulario formData={formData} onChange={setFormData} />
          </div>
        )}

        {step === 3 && (
          <div className="success-container">
            <h3>¡Se ha agendado su reunión exitosamente!</h3>
            <img src={CorreoIcon} alt="Success" className="success-icon" />
            <div className="success-details">
              <p>Recibirá un correo de invitación para su reunión agendada en la siguiente fecha:</p>
              <p className="success-date">
                {formatDate(selectedDate)} {selectedTime}
              </p>
            </div>
            <button className="btn btn-primary-AD" onClick={() => window.location.reload()}>
              Aceptar
            </button>
          </div>
        )}
      </div>

      {/* Actions Buttons (Outside Card for Step 1 & 2) */}
      {step < 3 && (
        <div className="actions">
          <button 
            className="btn btn-secondary-AD" 
            onClick={handleBack}
            disabled={step === 1}
            style={{opacity: step === 1 ? 0.5 : 1, cursor: step === 1 ? 'not-allowed' : 'pointer'}}
          >
            Atrás
          </button>
          
          <button 
            className={`btn ${step === 2 ? 'btn-dark' : 'btn-primary-AD'}`} 
            onClick={handleNext}
          >
            {step === 1 ? 'Siguiente' : 'Enviar'}
          </button>
        </div>
      )}
    </section>
  )
}
