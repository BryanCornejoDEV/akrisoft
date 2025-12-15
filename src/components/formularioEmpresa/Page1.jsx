import React from 'react';

export default function Page1({ formData, handleChange, nextStep, errors }) {
  return (
    <div className="form-page fade-in">
      {/* 1. Industria */}
      <div className="form-group">
        <label className="form-label">¿En qué industria opera la compañía?</label>
        <div className="radio-grid">
          {['Producción', 'Distribución', 'Retail', 'Servicios', 'Tecnología', 'Salud', 'Educación'].map((opt) => (
            <label key={opt} className="radio-label">
              <input
                type="radio"
                name="industria"
                value={opt}
                checked={formData.industria === opt}
                onChange={handleChange}
              />
              {opt}
            </label>
          ))}
          <label className="radio-label">
            <input
              type="radio"
              name="industria"
              value="Otro"
              checked={formData.industria === 'Otro'}
              onChange={handleChange}
            />
            Otro (especifique)
          </label>
        </div>
        {formData.industria === 'Otro' && (
          <input
            type="text"
            name="industriaOtro"
            className="form-input-text"
            value={formData.industriaOtro}
            onChange={handleChange}
            placeholder="Especifique su industria"
          />
        )}
        {errors.industria && <span className="error-text">{errors.industria}</span>}
        {errors.industriaOtro && <span className="error-text">{errors.industriaOtro}</span>}
      </div>

      {/* 2. Tamaño Empresa */}
      <div className="form-group">
        <label className="form-label">¿Cuál es el tamaño de la empresa por número de empleados?</label>
        <div className="radio-row">
          {['1 - 10', '11 - 50', '51 - 200', '201 - 500', '501 - 1000', '+ 1000'].map((opt) => (
            <label key={opt} className="radio-label">
              <input
                type="radio"
                name="tamanoEmpresa"
                value={opt}
                checked={formData.tamanoEmpresa === opt}
                onChange={handleChange}
              />
              {opt}
            </label>
          ))}
        </div>
        {errors.tamanoEmpresa && <span className="error-text">{errors.tamanoEmpresa}</span>}
      </div>

      {/* 3. Personas Dependen */}
      <div className="form-group">
        <label className="form-label">¿Cuántas personas dependen del sistema para su trabajo diario?</label>
        <div className="radio-row">
          {['1 - 5', '6 - 10', '11 - 25', '26 - 50', '+ 50'].map((opt) => (
            <label key={opt} className="radio-label">
              <input
                type="radio"
                name="personasDependen"
                value={opt}
                checked={formData.personasDependen === opt}
                onChange={handleChange}
              />
              {opt}
            </label>
          ))}
        </div>
        {errors.personasDependen && <span className="error-text">{errors.personasDependen}</span>}
      </div>

      {/* 4. Objetivo Principal */}
      <div className="form-group">
        <label className="form-label">¿Cuál es el principal objetivo que busca resolver con Akrisoft?</label>
        <div className="radio-grid">
          {[
            'Gestión de inventarios',
            'Facturación y contabilidad',
            'CRM',
            'Reportes y BI',
            'Logística y distribución',
            'Producción',
            'Cumplimiento normativo'
          ].map((opt) => (
            <label key={opt} className="radio-label">
              <input
                type="radio"
                name="objetivoPrincipal"
                value={opt}
                checked={formData.objetivoPrincipal === opt}
                onChange={handleChange}
              />
              {opt}
            </label>
          ))}
          <label className="radio-label">
            <input
              type="radio"
              name="objetivoPrincipal"
              value="Otro"
              checked={formData.objetivoPrincipal === 'Otro'}
              onChange={handleChange}
            />
            Otro (especifique)
          </label>
        </div>
        {formData.objetivoPrincipal === 'Otro' && (
          <input
            type="text"
            name="objetivoOtro"
            className="form-input-text"
            value={formData.objetivoOtro}
            onChange={handleChange}
            placeholder="Especifique su objetivo"
          />
        )}
        {errors.objetivoPrincipal && <span className="error-text">{errors.objetivoPrincipal}</span>}
        {errors.objetivoOtro && <span className="error-text">{errors.objetivoOtro}</span>}
      </div>

      {/* 5. Sistema Actual */}
      <div className="form-group">
        <label className="form-label">¿Utilizan actualmente algún sistema (ERP, CRM, contabilidad)?</label>
        <div className="radio-row">
          <label className="radio-label">
            <input
              type="radio"
              name="sistemaActual"
              value="Si"
              checked={formData.sistemaActual === 'Si'}
              onChange={handleChange}
            />
            Si
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="sistemaActual"
              value="No"
              checked={formData.sistemaActual === 'No'}
              onChange={handleChange}
            />
            No
          </label>
        </div>
        {formData.sistemaActual === 'Si' && (
          <div className="sub-input">
             <label className="sub-label">Indique cuál</label>
             <input
                type="text"
                name="sistemaActualCual"
                className="form-input-text"
                value={formData.sistemaActualCual}
                onChange={handleChange}
              />
             {errors.sistemaActualCual && <span className="error-text">{errors.sistemaActualCual}</span>}
          </div>
        )}
        {errors.sistemaActual && <span className="error-text">{errors.sistemaActual}</span>}
      </div>

      <div className="form-navigation">
        <button type="button" className="btn-secondary" disabled>Atrás</button>
        <button type="button" className="btn-primary" onClick={nextStep}>Siguiente</button>
      </div>
    </div>
  );
}
