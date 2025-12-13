import { useMemo, useState, useEffect } from 'react'

export default function AgendarDemoCalendario({ selectedDate, onDateChange }) {
  const today = useMemo(() => new Date(), [])
  const initial = selectedDate ? new Date(selectedDate) : today
  const [currentMonth, setCurrentMonth] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1))

  useEffect(() => {
    if (selectedDate) {
      const sd = new Date(selectedDate)
      setCurrentMonth(new Date(sd.getFullYear(), sd.getMonth(), 1))
    }
  }, [selectedDate])

  const monthName = currentMonth.toLocaleString('es-MX', { month: 'long', year: 'numeric' })
  const formattedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1)

  const days = useMemo(() => {
    const list = []
    const firstDay = new Date(currentMonth)
    // getDay(): 0 = Domingo, 1 = Lunes. Queremos empezar en Lunes.
    let startDay = firstDay.getDay()
    if (startDay === 0) startDay = 7

    // Leading empty slots
    for (let i = 1; i < startDay; i++) list.push(null)

    const tmp = new Date(currentMonth)
    while (tmp.getMonth() === currentMonth.getMonth()) {
      list.push(new Date(tmp))
      tmp.setDate(tmp.getDate() + 1)
    }

    // Trailing empties to complete weeks
    while (list.length % 7 !== 0) list.push(null)

    return list
  }, [currentMonth])

  const isSameDay = (d1, d2) => {
    return d1 && d2 && d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()
  }

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))

  // minDate: hoy a medianoche
  const minDate = useMemo(() => {
    const m = new Date()
    m.setHours(0, 0, 0, 0)
    return m
  }, [])

  const isBeforeMin = (d) => {
    if (!d) return false
    const nd = new Date(d)
    nd.setHours(0, 0, 0, 0)
    return nd < minDate
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button type="button" onClick={prevMonth} aria-label="Mes anterior">‹</button>
          <div className="calendar-title">Agendar con DATAPHE<br/>{formattedMonth}</div>
          <button type="button" onClick={nextMonth} aria-label="Mes siguiente">›</button>
        </div>
      </div>
      <div className="calendar-grid">
        {['LUN.', 'MAR.', 'MIÉ.', 'JUE.', 'VIE.', 'SÁB.', 'DOM.'].map(h => (
          <div key={h} className="calendar-cell head">{h}</div>
        ))}
        {days.map((d, i) => {
          if (!d) return <div key={`empty-${i}`} className="calendar-cell" />

          const isSelected = isSameDay(d, selectedDate)
          const isSunday = d.getDay && d.getDay() === 0
          const past = isBeforeMin(d)

          if (isSunday || past) {
            return (
              <div
                key={d.toISOString()}
                className={`calendar-cell disabled`}
                aria-disabled="true"
              >
                {d.getDate()}
              </div>
            )
          }

          return (
            <button
              key={d.toISOString()}
              className={`calendar-cell ${isSelected ? 'selected' : ''}`}
              type="button"
              onClick={() => {
                // doble chequeo: no permitir seleccionar días pasados
                if (!isBeforeMin(d)) onDateChange(new Date(d))
              }}
            >
              {d.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
