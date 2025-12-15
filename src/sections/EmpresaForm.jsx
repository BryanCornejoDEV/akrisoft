import React, { useState, useEffect } from 'react';
import Page1 from '../components/formularioEmpresa/Page1';
import Page2 from '../components/formularioEmpresa/Page2';

export default function EmpresaForm({ isOpen, onOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
        console.log('Form Data Submitted:', formData);
        alert('Formulario enviado con éxito (Demo)');
        onClose(); 
        setStep(1);
        setFormData({
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
              handleSubmit={handleSubmit}
              errors={errors}
            />
          )}
        </form>
      </div>
    </div>
  );
}
