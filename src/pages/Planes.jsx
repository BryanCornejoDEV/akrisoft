import PlanesCards from '../components/PlanesCards.jsx'
import TablaCompararPlanes from '../components/TablaCompararPlanes.jsx'
import PlanesHero from '../sections/PlanesHero.jsx'

export default function Planes(){
  return (
    <>
      <PlanesHero />
      <section className="section planes-section">
        <div className="container">
          <h1 className="planes-title">Encuentra el plan que más se ajuste a tu negocio</h1>
          <PlanesCards />
          <h2 className="compare-title">Compara planes</h2>
          <TablaCompararPlanes />
          <p className="planes-footnote">* Estos costos no incluyen los honorarios por el proceso de certificación como emisor de comprobantes electrónicos ante la DGII y parametrización del sistema.</p>
        </div>
      </section>
    </>
  )
}
