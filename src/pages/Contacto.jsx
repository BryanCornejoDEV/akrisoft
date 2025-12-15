import React, { useState, useEffect } from 'react';
import InfoContacto from '../components/InfoContacto.jsx'
import FormularioContacto from '../components/FormularioContacto.jsx'
import MapaContacto from '../components/MapaContacto.jsx'
import EmpresaForm from '../sections/EmpresaForm.jsx'

export default function Contacto(){
  const [isEmpresaFormOpen, setIsEmpresaFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();
    const timer = setTimeout(scrollToTop, 50);
    return () => clearTimeout(timer);
  }, [isEmpresaFormOpen, isLoading]);

  const handleCloseForm = () => {
    setIsEmpresaFormOpen(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="loader-container fade-in">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      {!isEmpresaFormOpen && (
        <section className="section fade-in">
          <div className="container grid grid-2">
            <div>
              <h1>Contacto</h1>
              <p style={{paddingBottom: 10}}>¿Deseas más información? Escríbenos y te contactaremos.</p>
              <FormularioContacto />
            </div>
            <div>
              <h2>Ubicación</h2>
              <MapaContacto />
              <InfoContacto />
            </div>
          </div>
        </section>
      )}
      <EmpresaForm 
        isOpen={isEmpresaFormOpen} 
        onOpen={() => setIsEmpresaFormOpen(true)} 
        onClose={handleCloseForm}
      />
    </>
  )
}
