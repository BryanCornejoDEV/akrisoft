import React, { useState } from 'react'

export default function AgendarDemoFormulario({ formData, onChange }) {
  const [emailInput, setEmailInput] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    onChange({ ...formData, [name]: value })
  }

  const normalizeInvitados = (inv) => {
    if (!inv) return []
    if (Array.isArray(inv)) return inv
    // string -> split by separators
    return String(inv).split(/[;,\n\t\s]+/).map(s => s.trim()).filter(Boolean)
  }

  const invitados = normalizeInvitados(formData.invitados)

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const addEmail = (raw) => {
    const email = String(raw).trim()
    if (!email) return
    if (!isValidEmail(email)) {
      // ignore invalid emails silently
      return
    }
    if (invitados.includes(email)) return
    const next = [...invitados, email]
    onChange({ ...formData, invitados: next })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',' ) {
      e.preventDefault()
      addEmail(emailInput)
      setEmailInput('')
    }
  }

  const handleBlur = () => {
    if (emailInput) {
      addEmail(emailInput)
      setEmailInput('')
    }
  }

  const removeEmail = (email) => {
    const next = invitados.filter(i => i !== email)
    onChange({ ...formData, invitados: next })
  }

  return (
    <div className="form-container">
      <div className="form-grid">
        <div className="form-group">
          <label>Nombre *</label>
          <input 
            className="form-input" 
            name="nombre" 
            value={formData.nombre || ''} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Apellidos *</label>
          <input 
            className="form-input" 
            name="apellidos" 
            value={formData.apellidos || ''} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Correo *</label>
          <input 
            className="form-input" 
            type="email" 
            name="correo" 
            value={formData.correo || ''} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Número de teléfono *</label>
          <input 
            className="form-input" 
            type="tel" 
            name="telefono" 
            value={formData.telefono || ''} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Nombre de la empresa</label>
          <input 
            className="form-input" 
            name="empresa" 
            value={formData.empresa || ''} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Cargo</label>
          <input 
            className="form-input" 
            name="cargo" 
            value={formData.cargo || ''} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group full-width">
          <label>Agregar invitados</label>
          <div className="chips-input" style={{border: '1px solid #ddd', padding: '6px', borderRadius: 6, display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center'}}>
            {invitados.map(email => (
              <div key={email} className="chip" style={{background: '#eef', padding: '6px 8px', borderRadius: 16, display: 'inline-flex', alignItems: 'center', gap: 8}}>
                <span style={{fontSize: 13}}>{email}</span>
                <button type="button" onClick={() => removeEmail(email)} aria-label={`Eliminar ${email}`} style={{background: 'transparent', border: 'none', cursor: 'pointer'}}>✕</button>
              </div>
            ))}
            <input
              className="form-input"
              style={{flex: 1, minWidth: 160, border: 'none', outline: 'none', padding: 6}}
              name="invitados_input"
              placeholder="Agrega un correo y presiona Enter"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
