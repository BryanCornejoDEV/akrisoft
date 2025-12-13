import { useState } from 'react'

export default function FormularioContacto(){
  const [form, setForm] = useState({ asunto:'', nombre:'', email:'',empresa:'',mensaje:'' })
  const submit = (e)=>{
    e.preventDefault()
    alert(`Gracias ${form.nombre}, te contactaremos en ${form.email}.`)
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
      <button className="btn-primary" type="submit">Enviar</button>
    </form>
    </div>
  )
}
