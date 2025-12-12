export default function AgendarDemoFormulario({ formData, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    onChange({ ...formData, [name]: value })
  }

  return (
    <div className="form-container">
      {/* El título y fecha se manejan mejor desde el padre para consistencia o se pasan como props */}
      
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
          <input 
            className="form-input" 
            name="invitados" 
            placeholder="Agrega un correo..." 
            value={formData.invitados || ''} 
            onChange={handleChange} 
          />
        </div>
      </div>
    </div>
  )
}
