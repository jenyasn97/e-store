import Button from '../Button'
import './Banner.scss'

export default function Banner() {
  return (
    <section className="banner">
      <div className="banner__content">
        <div className="banner__titles">
          <span className="banner__subtitle">Pro.Beyond.</span>
          <h1 className="banner__title">IPhone 14 <span className="banner__title-accent">Pro</span></h1>
        </div>
        <p className="banner__description">
          Created to change everything for the better. For everyone
        </p>
        <Button variant="white-stroke" className="banner__btn" to="/catalog">Shop Now</Button>
      </div>
      <div className="banner__image">
        <img src="/images/iphone-banner.svg" alt="iPhone 14 Pro" width={406} height={632} />
      </div>
    </section>
  )
}
