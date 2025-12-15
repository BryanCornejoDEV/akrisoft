import React from 'react';

export default function Page2({ formData, handleChange, prevStep, handleSubmit, errors }) {
  return (
    <div className="form-page fade-in">
      {/* 1. Módulos Imprescindibles */}
      <div className="form-group">
        <label className="form-label">¿Qué módulos son imprescindibles desde el inicio?</label>
        <div className="radio-grid">
          {['Inventario', 'Ventas', 'Compras', 'Producción', 'Finanzas', 'Reportes', 'Recursos Humanos'].map((opt) => (
            <label key={opt} className="radio-label">
              <input
                type="checkbox"
                name="modulosImprescindibles"
                value={opt}
                checked={formData.modulosImprescindibles.includes(opt)}
                onChange={handleChange}
              />
              {opt}
            </label>
          ))}
        </div>
        {errors.modulosImprescindibles && <span className="error-text">{errors.modulosImprescindibles}</span>}
      </div>

      {/* 2. Volumen Transacciones */}
      <div className="form-group">
        <label className="form-label">¿Qué volumen aproximado de transacciones mensuales maneja?</label>
        <div className="radio-row">
          {['< 100', '100 - 1,000', '1,001 - 10,000', '10,001 - 100,000', '+ 100,000'].map((opt) => (
            <label key={opt} className="radio-label">
              <input
                type="radio"
                name="transaccionesMensuales"
                value={opt}
                checked={formData.transaccionesMensuales === opt}
                onChange={handleChange}
              />
              {opt}
            </label>
          ))}
        </div>
        {errors.transaccionesMensuales && <span className="error-text">{errors.transaccionesMensuales}</span>}
      </div>

      {/* 3. Tiempo Tareas Manuales */}
      <div className="form-group">
        <label className="form-label">¿Cuánto tiempo dedican actualmente a tareas manuales que desean automatizar?</label>
        <div className="radio-row">
          {['< 5 h/semana', '5 - 15 h/semana', '15 - 40 h/semana', '> 40 h/semana'].map((opt) => (
            <label key={opt} className="radio-label">
              <input
                type="radio"
                name="tiempoTareasManuales"
                value={opt}
                checked={formData.tiempoTareasManuales === opt}
                onChange={handleChange}
              />
              {opt}
            </label>
          ))}
        </div>
        {errors.tiempoTareasManuales && <span className="error-text">{errors.tiempoTareasManuales}</span>}
      </div>

      {/* 4. Crecimiento */}
      <div className="form-group">
        <label className="form-label">¿Planean crecimiento o expansión en los próximos 12-24 meses?</label>
        <div className="radio-row">
          {['Si', 'No', 'No lo sé'].map((opt) => (
            <label key={opt} className="radio-label">
              <input
                type="radio"
                name="crecimientoExpansion"
                value={opt}
                checked={formData.crecimientoExpansion === opt}
                onChange={handleChange}
              />
              {opt}
            </label>
          ))}
        </div>
        {errors.crecimientoExpansion && <span className="error-text">{errors.crecimientoExpansion}</span>}
        <div className="sub-input">
            <label className="sub-label">Indique previsión</label>
            <input
            type="text"
            name="crecimientoPrevision"
            className="form-input-text"
            value={formData.crecimientoPrevision}
            onChange={handleChange}
            />
        </div>
      </div>

      {/* 5. Formación */}
      <div className="form-group">
        <label className="form-label">¿Requieren formación para usuarios? ¿Cuántas sesiones/usuarios estimados?</label>
        <div className="radio-row">
          {['Si, básica', 'Si, avanzada', 'No'].map((opt) => (
            <label key={opt} className="radio-label">
              <input
                type="radio"
                name="formacionUsuarios"
                value={opt}
                checked={formData.formacionUsuarios === opt}
                onChange={handleChange}
              />
              {opt}
            </label>
          ))}
        </div>
        {errors.formacionUsuarios && <span className="error-text">{errors.formacionUsuarios}</span>}
        <div className="sub-input">
            <label className="sub-label">Indique estimación</label>
            <input
            type="text"
            name="formacionEstimacion"
            className="form-input-text"
            value={formData.formacionEstimacion}
            onChange={handleChange}
            />
        </div>
      </div>

      <div className="form-navigation">
        <button type="button" className="btn-secondary" onClick={prevStep}>Atrás</button>
        <button type="submit" className="btn-primary">Enviar</button>
      </div>
    </div>
  );
}
