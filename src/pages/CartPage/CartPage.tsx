import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import './CartPage.scss'

export default function CartPage() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="cart-page">
      <div className="cart-page__content">
        <nav className="cart-page__breadcrumbs" aria-label="Breadcrumb">
          <Link to="/" className="cart-page__breadcrumb-link">Home</Link>
          <span className="cart-page__breadcrumb-sep">›</span>
          <span className="cart-page__breadcrumb-current">Cart</span>
        </nav>
        <div className="cart-page__empty">
          <h2>Your cart is empty</h2>
          <Link to="/catalog" className="cart-page__link">Continue shopping</Link>
        </div>
      </div>
    </div>
  )
}
