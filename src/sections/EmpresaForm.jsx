import React, { useState, useEffect } from 'react';
import Page1 from '../components/formularioEmpresa/Page1';
import Page2 from '../components/formularioEmpresa/Page2';

export default function EmpresaForm({ isOpen, onOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Scroll to top when step changes or when form opens
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();
    // Fallback for some browsers or timing issues
    const timer = setTimeout(scrollToTop, 50);
    return () => clearTimeout(timer);
  }, [step, isOpen]);

  const [formData, setFormData] = useState({
    nombreEmpresa: '',
    email: '',
    nombreCompleto: '',
    industria: '',
    industriaOtro: '',
    tamanoEmpresa: '',
    personasDependen: '',
    objetivoPrincipal: '',
    objetivoOtro: '',
    sistemaActual: '',
    sistemaActualCual: '',
    modulosImprescindibles: [], 
    transaccionesMensuales: '',
    tiempoTareasManuales: '',
    crecimientoExpansion: '',
    crecimientoPrevision: '',
    formacionUsuarios: '',
    formacionEstimacion: ''
  });

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.nombreEmpresa) newErrors.nombreEmpresa = 'Indique el nombre de la empresa';
    if (!formData.nombreCompleto) newErrors.nombreCompleto = 'Indique su nombre completo';
    if (!formData.email) newErrors.email = 'Indique un email';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Indique un email válido';

    if (!formData.industria) newErrors.industria = 'Seleccione una industria';
    if (formData.industria === 'Otro' && !formData.industriaOtro) newErrors.industriaOtro = 'Especifique la industria';
    
    if (!formData.tamanoEmpresa) newErrors.tamanoEmpresa = 'Seleccione el tamaño de la empresa';
    if (!formData.personasDependen) newErrors.personasDependen = 'Seleccione el número de personas';
    
    if (!formData.objetivoPrincipal) newErrors.objetivoPrincipal = 'Seleccione un objetivo';
    if (formData.objetivoPrincipal === 'Otro' && !formData.objetivoOtro) newErrors.objetivoOtro = 'Especifique el objetivo';
    
    if (!formData.sistemaActual) newErrors.sistemaActual = 'Seleccione una opción';
    if (formData.sistemaActual === 'Si' && !formData.sistemaActualCual) newErrors.sistemaActualCual = 'Indique cuál sistema';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (formData.modulosImprescindibles.length === 0) newErrors.modulosImprescindibles = 'Seleccione al menos un módulo';
    if (!formData.transaccionesMensuales) newErrors.transaccionesMensuales = 'Seleccione el volumen de transacciones';
    if (!formData.tiempoTareasManuales) newErrors.tiempoTareasManuales = 'Seleccione el tiempo dedicado';
    if (!formData.crecimientoExpansion) newErrors.crecimientoExpansion = 'Seleccione una opción';
    if (!formData.formacionUsuarios) newErrors.formacionUsuarios = 'Seleccione una opción';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Clear error when user modifies field
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }));
    }

    if (type === 'checkbox') {
        setFormData(prev => {
            const current = prev[name] || [];
            const newValue = checked 
                ? [...current, value] 
                : current.filter(item => item !== value);
            
            // Clear error for array field if it has items
            if (name === 'modulosImprescindibles' && newValue.length > 0 && errors.modulosImprescindibles) {
                 setErrors(prev => ({ ...prev, modulosImprescindibles: null }));
            }
            return { ...prev, [name]: newValue };
        });
    } else {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }
  };

  const nextStep = () => {
    if (validateStep1()) {
        setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const resetForm = () => {
    setStep(1);
    setErrors({});
    setSubmitError('');
    setFormData({
      nombreEmpresa: '',
      email: '',
      nombreCompleto: '',
      industria: '',
      industriaOtro: '',
      tamanoEmpresa: '',
      personasDependen: '',
      objetivoPrincipal: '',
      objetivoOtro: '',
      sistemaActual: '',
      sistemaActualCual: '',
      modulosImprescindibles: [],
      transaccionesMensuales: '',
      tiempoTareasManuales: '',
      crecimientoExpansion: '',
      crecimientoPrevision: '',
      formacionUsuarios: '',
      formacionEstimacion: ''
    });
  };

  const buildEmpresaSummary = () => {
    const industria = formData.industria === 'Otro' ? `${formData.industria} - ${formData.industriaOtro}` : formData.industria;
    const objetivo = formData.objetivoPrincipal === 'Otro' ? `${formData.objetivoPrincipal} - ${formData.objetivoOtro}` : formData.objetivoPrincipal;
    const sistema = formData.sistemaActual === 'Si' ? `Sí (${formData.sistemaActualCual})` : formData.sistemaActual;
    const modulos = (formData.modulosImprescindibles || []).join(', ');

    return [
      'Formulario Empresa',
      '',
      `Empresa: ${formData.nombreEmpresa}`,
      `Nombre completo: ${formData.nombreCompleto}`,
      `Email: ${formData.email}`,
      '',
      `Industria: ${industria}`,
      `Tamaño empresa (empleados): ${formData.tamanoEmpresa}`,
      `Personas que dependen del sistema: ${formData.personasDependen}`,
      `Objetivo principal: ${objetivo}`,
      `Sistema actual: ${sistema}`,
      '',
      `Módulos imprescindibles: ${modulos}`,
      `Transacciones mensuales: ${formData.transaccionesMensuales}`,
      `Tiempo en tareas manuales: ${formData.tiempoTareasManuales}`,
      `Crecimiento/expansión: ${formData.crecimientoExpansion}`,
      `Previsión crecimiento: ${formData.crecimientoPrevision || '-'}`,
      `Formación usuarios: ${formData.formacionUsuarios}`,
      `Estimación formación: ${formData.formacionEstimacion || '-'}`,
    ].join('\n');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateStep2()) return;

    const apiBaseUrl = import.meta.env.APP_URL;
    const apiKey = import.meta.env.LANDING_API_KEY;
    const toEmail = import.meta.env.LANDING_TO_EMAIL;

    if (!apiBaseUrl) {
      setSubmitError('Falta configurar APP_URL (por ejemplo http://localhost:8000).');
      return;
    }
    if (!apiKey) {
      setSubmitError('Falta configurar LANDING_API_KEY.');
      return;
    }
    if (!toEmail) {
      setSubmitError('Falta configurar LANDING_TO_EMAIL.');
      return;
    }

    const endpoint = new URL('/api/landing/contact', apiBaseUrl).toString();
    const industriaSubject = formData.industria === 'Otro' ? formData.industriaOtro : formData.industria;
    const empresaSubject = formData.nombreEmpresa || 'Empresa';

    const payload = {
      subject: `Formulario Empresa - ${empresaSubject} - ${industriaSubject || 'Sin industria'}`,
      name: formData.nombreCompleto,
      email: formData.email,
      company: formData.nombreEmpresa,
      message: buildEmpresaSummary(),
      to_email: toEmail,

      // Datos extra por si el backend los quiere guardar
      empresa_form: formData,
    };

    setIsSubmitting(true);
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
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Error HTTP ${res.status}`);
      }

      alert('Formulario enviado con éxito');
      onClose();
      resetForm();
    } catch (err) {
      setSubmitError(`No se pudo enviar el formulario. ${err instanceof Error ? err.message : ''}`.trim());
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="empresa-cta-section fade-in">
        <div className="empresa-cta-container">
            <h2 className="cta-title">¿Necesitas asesoría? <span className="cta-highlight">¡Cuéntanos sobre tu empresa!</span></h2>
            <p className="cta-subtitle">Llena el siguiente formulario para poder asesorarte de la mejor manera:</p>
            <button className="btn-primary cta-button" onClick={() => {
              window.scrollTo(0, 0);
              onOpen();
            }}>Formulario</button>
        </div>
      </div>
    );
  }

  return (
    <div className="empresa-form-section fade-in">
      <div className="empresa-form-container">
        <h2 className="form-title">¡Cuéntanos sobre tu empresa!</h2>

        {submitError ? (
          <p style={{ marginTop: 10, marginBottom: 0 }} role="alert">{submitError}</p>
        ) : null}
        
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <Page1 
              formData={formData} 
              handleChange={handleChange} 
              nextStep={nextStep}
              errors={errors}
            />
          )}
          
          {step === 2 && (
            <Page2 
              formData={formData} 
              handleChange={handleChange} 
              prevStep={prevStep} 
              errors={errors}
              isSubmitting={isSubmitting}
            />
          )}
        </form>
      </div>
    </div>
  );
}
