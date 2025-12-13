export default function MapaContacto({ query = 'AUDICCA' }){
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
  return (
    <div className="mapa">
      <iframe
        title="Ubicación Akrisoft"
        src={src}
        style={{border:0, width:'100%', height:'320px'}}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
