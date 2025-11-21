import { useState } from 'react'

export default function AgendarDemoFormulario(){
  const [form, setForm] = useState({ nombre:'', email:'', empresa:'', notas:'' })
  const submit = (e)=>{
    e.preventDefault()
    alert(`¡Listo! Enviaremos la invitación a ${form.email}`)
  }
  return (
    <form className="form" onSubmit={submit}>
      <div className="form-row">
        <label>Nombre
          <input required value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} />
        </label>
        <label>Email
          <input type="email" required value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        </label>
      </div>
      <label>Empresa
        <input value={form.empresa} onChange={e=>setForm({...form, empresa:e.target.value})} />
      </label>
      <label>Notas
        <textarea rows={4} value={form.notas} onChange={e=>setForm({...form, notas:e.target.value})} />
      </label>
      <button className="btn-primary" type="submit">Confirmar demo</button>
    </form>
  )
}
