export default function MapaContacto(){
  return (
    <div className="mapa">
      <iframe
        title="Ubicación Akrisoft"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-99.2%2C19.3%2C-99.0%2C19.6&layer=mapnik"
        style={{border:0, width:'100%', height:'320px'}}
        loading="lazy"
      />
    </div>
  )
}
