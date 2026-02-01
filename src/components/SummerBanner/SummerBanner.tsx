import Button from '../Button'
import './SummerBanner.scss'

export default function SummerBanner() {
  return (
    <section className="summer-banner">
      <div className="summer-banner__content">
        <div className="summer-banner__text">
          <h2 className="summer-banner__title">Big <span className="summer-banner__title-accent">Summer</span> Sale</h2>
          <p className="summer-banner__desc">Commodo fames vitae vitae leo mauris in. Eu consequat.</p>
        </div>
        <Button variant="white-stroke">Shop Now</Button>
      </div>
    </section>
  )
}
