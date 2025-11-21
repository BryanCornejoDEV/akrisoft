import { useState } from 'react'

export default function AgendarDemoPicker(){
  const [date, setDate] = useState('')
  const [time, setTime] = useState('10:00')
  return (
    <div className="picker">
      <label>Fecha
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
      </label>
      <label>Hora
        <input type="time" value={time} onChange={e=>setTime(e.target.value)} />
      </label>
    </div>
  )
}
