import { useState } from 'react'

export default function FormularioContacto(){
  const [form, setForm] = useState({ asunto:'', nombre:'', email:'',empresa:'',mensaje:'' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const submit = async (e)=>{
    e.preventDefault()
    setErrorMessage('')

    const apiBaseUrl = import.meta.env.APP_URL
    const apiKey = import.meta.env.LANDING_API_KEY
    const toEmail = import.meta.env.LANDING_TO_EMAIL

    if (!apiBaseUrl) {
      setErrorMessage('Falta configurar APP_URL (por ejemplo http://localhost:8000).')
      return
    }
    if (!apiKey) {
      setErrorMessage('Falta configurar LANDING_API_KEY.')
      return
    }
    if (!toEmail) {
      setErrorMessage('Falta configurar LANDING_TO_EMAIL.')
      return
    }

    const endpoint = new URL('/api/landing/contact', apiBaseUrl).toString()

    const nameForAlert = form.nombre

    const payload = {
      subject: form.asunto,
      name: form.nombre,
      email: form.email,
      company: form.empresa,
      message: form.mensaje,
      to_email: toEmail,

      // Compatibilidad
      asunto: form.asunto,
      nombre: form.nombre,
      empresa: form.empresa,
      mensaje: form.mensaje,
    }

    setIsSubmitting(true)
    try {
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

      setForm({ asunto:'', nombre:'', email:'',empresa:'',mensaje:'' })
      alert(`Gracias ${nameForAlert}, te contactaremos en ${form.email}.`)
    } catch (err) {
      setErrorMessage(`No se pudo enviar el formulario. ${err instanceof Error ? err.message : ''}`.trim())
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="planes-cards-wrapper" style={{backgroundColor: 'transparent'}}>
    <form className="form" onSubmit={submit}>
      <div className="form-row">
        <label>Asunto
          <input required value={form.asunto} onChange={e=>setForm({...form, asunto:e.target.value})} />
        </label>
        <label>Nombre
          <input required value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} />
        </label>
        <label>Email
          <input type="email" required value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        </label>
        <label>Empresa (opcional)
          <input value={form.empresa} onChange={e=>setForm({...form, empresa:e.target.value})} />
        </label>
      </div>
      <label>Mensaje
        <textarea rows={5} style={{resize: "none"}} required value={form.mensaje} onChange={e=>setForm({...form, mensaje:e.target.value})} />
      </label>
      {errorMessage ? (
        <p style={{ marginTop: 10, marginBottom: 0 }} role="alert">{errorMessage}</p>
      ) : null}
      <button className="btn-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando…' : 'Enviar'}
      </button>
    </form>
    </div>
  )
}
