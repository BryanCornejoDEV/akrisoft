import { useState } from 'react'

export default function AgendarDemoPicker(){
  const [date, setDate] = useState('')
  const [time, setTime] = useState('10:00')
  return (
    <div className="picker" style={{display:'flex', flexDirection:'column', gap:8, alignItems:'center'}}>
      <label style={{width:'100%', textAlign:'center'}}>Fecha
        <input className="form-input" style={{marginTop:8}} type="date" value={date} onChange={e=>setDate(e.target.value)} />
      </label>
      <label style={{width:'100%', textAlign:'center'}}>Hora
        <input className="form-input" style={{marginTop:8}} type="time" value={time} onChange={e=>setTime(e.target.value)} />
      </label>
    </div>
  )
}
