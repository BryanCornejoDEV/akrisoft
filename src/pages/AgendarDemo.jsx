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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [meetLink, setMeetLink] = useState('')
  const [calendarEventLink, setCalendarEventLink] = useState('')

  const computeInitialDate = () => {
    const d = new Date()
    // If today is Sunday (0), move to Monday
    if (d.getDay() === 0) {
      d.setDate(d.getDate() + 1)
    }
    return d
  }

  const [selectedDate, setSelectedDate] = useState(computeInitialDate())
  const [selectedTime, setSelectedTime] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    empresa: '',
    cargo: '',
    invitados: []
  })

  const generateTimesForDate = (date, stepMinutes = 30) => {
    if (!date) return []
    const day = new Date(date).getDay() // 0 Domingo, 6 Sábado

    // Domingo: no disponible
    if (day === 0) return []

    let startHour = 8
    let endHour = 16 // inclusive end (4pm)

    // Sábado: 8am - 11am
    if (day === 6) {
      endHour = 11
    }

    const times = []
    const d = new Date()
    d.setHours(startHour, 0, 0, 0)
    const end = new Date()
    end.setHours(endHour, 0, 0, 0)

    while (d <= end) {
      times.push(d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
      d.setTime(d.getTime() + stepMinutes * 60000)
    }

    return times
  }

  const [availableTimes, setAvailableTimes] = useState(() => generateTimesForDate(selectedDate))

  const handleDateChange = (nextDate) => {
    setSelectedDate(nextDate)
    setSelectedTime(null)
    setAvailableTimes(generateTimesForDate(nextDate))
  }

  const formatDate = (date) => {
    if (!date) return ''
    // Capitalize first letter of weekday
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    const dateString = date.toLocaleDateString('es-MX', options)
    return dateString.charAt(0).toUpperCase() + dateString.slice(1)
  }

  const parseTimeLabelTo24h = (label) => {
    if (!label) return null
    // Ej: "08:30 AM" (en-US)
    const match = String(label).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
    if (!match) return null
    let hours = Number(match[1])
    const minutes = Number(match[2])
    const meridiem = match[3].toUpperCase()
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return null
    if (meridiem === 'PM' && hours !== 12) hours += 12
    if (meridiem === 'AM' && hours === 12) hours = 0
    return { hours, minutes }
  }

  const buildStartEnd = () => {
    if (!selectedDate || !selectedTime) return null
    const parsed = parseTimeLabelTo24h(selectedTime)
    if (!parsed) return null
    const start = new Date(selectedDate)
    start.setHours(parsed.hours, parsed.minutes, 0, 0)
    const end = new Date(start)
    end.setMinutes(end.getMinutes() + 30)
    return { start, end }
  }

  const parseInvitados = (raw) => {
    if (!raw) return []
    if (Array.isArray(raw)) return raw.filter(Boolean).map(s=>String(s).trim()).filter(s => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))
    return String(raw)
      .split(/[;,\n\t\s]+/)
      .map(s => s.trim())
      .filter(Boolean)
      .filter(s => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))
  }

  const submitSchedule = async () => {
    setSubmitError('')
    setMeetLink('')
    setCalendarEventLink('')

    const apiBaseUrl = import.meta.env.APP_URL
    const apiKey = import.meta.env.LANDING_API_KEY
    const toEmail = import.meta.env.LANDING_TO_EMAIL
    const schedulePath = import.meta.env.LANDING_SCHEDULE_DEMO_PATH || '/api/landing/schedule-demo'

    if (!apiBaseUrl) throw new Error('Falta configurar APP_URL (por ejemplo http://localhost:8000).')
    if (!apiKey) throw new Error('Falta configurar LANDING_API_KEY.')
    if (!toEmail) throw new Error('Falta configurar LANDING_TO_EMAIL.')

    const range = buildStartEnd()
    if (!range) throw new Error('Fecha u hora inválida.')

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const invitados = parseInvitados(formData.invitados)
    const fullName = `${formData.nombre} ${formData.apellidos}`.trim()
    const formatted = `${formatDate(selectedDate)} ${selectedTime}`
    const subject = `Agendar Demo - ${formData.empresa || 'Sin empresa'} - ${formatted}`
    const message = [
      'Solicitud de Demo (Landing)',
      '',
      `Fecha/Hora: ${formatted}`,
      `Zona horaria: ${timeZone}`,
      '',
      `Nombre: ${fullName}`,
      `Correo: ${formData.correo}`,
      `Teléfono: ${formData.telefono}`,
      `Empresa: ${formData.empresa || '-'}`,
      `Cargo: ${formData.cargo || '-'}`,
      `Invitados: ${invitados.length ? invitados.join(', ') : '-'}`,
    ].join('\n')

    const payload = {
      subject,
      name: fullName,
      email: formData.correo,
      company: formData.empresa,
      phone: formData.telefono,
      position: formData.cargo,
      message,
      to_email: toEmail,

      // Envío ambas variantes por compatibilidad con distintos backends
      start_at: range.start.toISOString(),
      end_at: range.end.toISOString(),
      starts_at: range.start.toISOString(),
      ends_at: range.end.toISOString(),
      // Compatibilidad: algunos backends esperan 'timezone' y 'guests'
      time_zone: timeZone,
      timezone: timeZone,

      // 'guests' será solo los invitados añadidos (sin el organizador)
      guests: invitados,

      attendees: [formData.correo, ...invitados].filter(Boolean),
    }

    const endpoint = new URL(schedulePath, apiBaseUrl).toString()
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(text || `Error HTTP ${res.status}`)
    }

    const contentType = res.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const data = await res.json().catch(() => null)
      const meet = data?.meetLink || data?.meet_link || data?.hangoutLink || data?.conferenceLink
      const cal = data?.calendarEventLink || data?.calendar_event_link || data?.eventLink || data?.htmlLink
      if (meet) setMeetLink(meet)
      if (cal) setCalendarEventLink(cal)
    }
  }

  const handleNext = () => {
    if (step === 1) {
      if (selectedDate && selectedTime) {
        setStep(2)
      } else {
        alert('Por favor selecciona una fecha y una hora.')
      }
    } else if (step === 2) {
      // Validar formulario
      if (!(formData.nombre && formData.correo && formData.apellidos && formData.telefono)) {
        alert('Por favor completa los campos obligatorios (*)')
        return
      }

      setIsSubmitting(true)
      submitSchedule()
        .then(() => setStep(3))
        .catch((err) => {
          setSubmitError(`No se pudo agendar la demo. ${err instanceof Error ? err.message : ''}`.trim())
        })
        .finally(() => setIsSubmitting(false))
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
                {availableTimes.length === 0 ? (
                  <p style={{color: '#666'}}>No hay horarios disponibles para este día.</p>
                ) : (
                  availableTimes.map(time => (
                    <button 
                      key={time} 
                      className={`time-btn ${selectedTime === time ? 'selected' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))
                )}
              </div>
            </div>
            
            <div>
              <AgendarDemoCalendario 
                selectedDate={selectedDate} 
                onDateChange={handleDateChange} 
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
            {submitError ? (
              <p style={{ marginTop: '1rem', marginBottom: 0, textAlign: 'center' }} role="alert">{submitError}</p>
            ) : null}
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
              {meetLink ? (
                <p style={{ marginTop: '0.75rem' }}>
                  Enlace de Google Meet: <a href={meetLink} target="_blank" rel="noreferrer">{meetLink}</a>
                </p>
              ) : null}
              {calendarEventLink ? (
                <p style={{ marginTop: '0.25rem' }}>
                  Evento en Google Calendar: <a href={calendarEventLink} target="_blank" rel="noreferrer">Abrir</a>
                </p>
              ) : null}
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
            disabled={isSubmitting}
          >
            {step === 1 ? 'Siguiente' : (isSubmitting ? 'Enviando…' : 'Enviar')}
          </button>
        </div>
      )}
    </section>
  )
}
