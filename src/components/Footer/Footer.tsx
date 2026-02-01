import './Footer.scss'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__info">
        <div className="footer__logo-block">
          <img src="/images/logo-footer.svg" alt="E-Store" width={65} height={23} />
          <p className="footer__about">We are a residential interior design firm located in Portland. Our boutique-studio offers more than</p>
        </div>
        <nav className="footer__nav">
          <div className="footer__section">
            <h4 className="footer__section-title">Services</h4>
            <a href="/bonus" className="footer__link">Bonus program</a>
            <a href="/gift-cards" className="footer__link">Gift cards</a>
            <a href="/credit" className="footer__link">Credit and payment</a>
            <a href="/contracts" className="footer__link">Service contracts</a>
            <a href="/non-cash" className="footer__link">Non-cash account</a>
            <a href="/payment" className="footer__link">Payment</a>
          </div>
          <div className="footer__section">
            <h4 className="footer__section-title">Assistance to the buyer</h4>
            <a href="/find-order" className="footer__link">Find an order</a>
            <a href="/delivery" className="footer__link">Terms of delivery</a>
            <a href="/exchange" className="footer__link">Exchange and return of goods</a>
            <a href="/guarantee" className="footer__link">Guarantee</a>
            <a href="/faq" className="footer__link">Frequently asked questions</a>
            <a href="/terms" className="footer__link">Terms of use of the site</a>
          </div>
        </nav>
      </div>
      <div className="footer__social">
        <img src="/images/social-icons.svg" alt="Social media" width={173} height={16} />
      </div>
    </footer>
  )
}
