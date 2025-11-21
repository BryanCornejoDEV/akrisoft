import { useMemo } from 'react'

export default function AgendarDemoCalendario(){
  const today = useMemo(()=> new Date(), [])
  const month = today.toLocaleString('es-MX', { month: 'long', year: 'numeric'})
  const days = useMemo(()=>{
    const d = []
    const tmp = new Date(today.getFullYear(), today.getMonth(), 1)
    while(tmp.getMonth() === today.getMonth()){
      d.push(new Date(tmp))
      tmp.setDate(tmp.getDate()+1)
    }
    return d
  },[today])

  return (
    <div className="calendar">
      <div className="calendar-header">{month}</div>
      <div className="calendar-grid">
        {['L','M','M','J','V','S','D'].map(h=> <div key={h} className="calendar-cell head">{h}</div>)}
        {days.map((d) => (
          <button key={d.toISOString()} className="calendar-cell" type="button">
            {d.getDate()}
          </button>
        ))}
      </div>
    </div>
  )
}
