import Button from '../Button'
import './SmallerBanners.scss'

export default function SmallerBanners() {
  return (
    <section className="smaller-banners">
      <div className="smaller-banners__left">
        <article className="smaller-banners__wide">
          <div className="smaller-banners__wide-bg">
            <img src="/images/playstation-35858b.png" alt="PlayStation 5" width={360} height={343} />
          </div>
          <div className="smaller-banners__wide-content">
            <h3 className="smaller-banners__wide-title">Playstation <span className="smaller-banners__title-accent">5</span></h3>
            <p className="smaller-banners__wide-text">
              Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.
            </p>
          </div>
        </article>
        <div className="smaller-banners__squares">
          <article className="smaller-banners__square smaller-banners__square--airpods">
            <div className="smaller-banners__square-image">
              <img src="/images/airpods-max-71b78d.png" alt="AirPods Max" />
            </div>
            <div className="smaller-banners__square-content">
              <h3 className="smaller-banners__square-title">Apple<br />AirPods <span className="smaller-banners__title-accent">Max</span></h3>
              <p className="smaller-banners__square-text">Computational audio. Listen, it&apos;s powerful</p>
            </div>
          </article>
          <article className="smaller-banners__square smaller-banners__square--dark smaller-banners__square--vision">
            <div className="smaller-banners__square-image">
              <img src="/images/vision-pro-5e8529.png" alt="Vision Pro" />
            </div>
            <div className="smaller-banners__square-content">
              <h3 className="smaller-banners__square-title">Apple<br />Vision <span className="smaller-banners__title-accent">Pro</span></h3>
              <p className="smaller-banners__square-text">An immersive way to experience entertainment</p>
            </div>
          </article>
        </div>
      </div>
      <article className="smaller-banners__big">
        <div className="smaller-banners__big-content">
          <div className="smaller-banners__big-text">
            <h3 className="smaller-banners__big-title">Macbook <span className="smaller-banners__title-accent">Air</span></h3>
            <p className="smaller-banners__big-desc">
              The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.
            </p>
          </div>
          <div className="smaller-banners__big-btn">
            <Button variant="black-stroke" to="/catalog">Shop Now</Button>
          </div>
        </div>
        <div className="smaller-banners__big-image">
          <img src="/images/macbook-pro-42fce2.png" alt="MacBook Air" width={292} height={502} />
        </div>
      </article>
    </section>
  )
}
