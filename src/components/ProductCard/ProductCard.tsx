import { Link } from 'react-router-dom'
import Button from '../Button'
import './ProductCard.scss'

interface ProductCardProps {
  id?: string
  title: string
  price: string
  oldPrice?: string
  image: string
  liked?: boolean
}

export default function ProductCard({ id, title, price, oldPrice, image, liked = false }: ProductCardProps) {
  const card = (
    <article className="product-card">
      <div className="product-card__top">
        {liked ? (
          <button type="button" className="product-card__like" aria-label="Unlike" onClick={(e) => e.stopPropagation()}>
            <svg width="29" height="26" viewBox="0 0 29 26"><path d="M14.5 25.5C14.5 25.5 2 17 2 8.5C2 4 5 1 9 1C11.5 1 13.5 2.5 14.5 4C15.5 2.5 17.5 1 20 1C24 1 27 4 27 8.5C27 17 14.5 25.5 14.5 25.5Z" fill="#FF0000" stroke="#FF0000" strokeWidth="1.4" /></svg>
          </button>
        ) : (
          <button type="button" className="product-card__like product-card__like--outline" aria-label="Like" onClick={(e) => e.stopPropagation()}>
            <svg width="29" height="26" viewBox="0 0 29 26"><path d="M14.5 25.5C14.5 25.5 2 17 2 8.5C2 4 5 1 9 1C11.5 1 13.5 2.5 14.5 4C15.5 2.5 17.5 1 20 1C24 1 27 4 27 8.5C27 17 14.5 25.5 14.5 25.5Z" stroke="rgba(144,144,144,0.77)" strokeWidth="1.4" fill="none" /></svg>
          </button>
        )}
      </div>
      <div className="product-card__image">
        <img src={image} alt={title} width={160} height={160} />
      </div>
      <div className="product-card__info">
        <h3 className="product-card__title">{title}</h3>
        <div className="product-card__prices">
          <span className="product-card__price">{price}</span>
          {oldPrice && <span className="product-card__old-price">{oldPrice}</span>}
        </div>
      </div>
      <Button variant="fill-small" size="small" className="product-card__btn">Buy Now</Button>
    </article>
  );

  if (id) {
    return <Link to={`/product/${id}`} className="product-card__link">{card}</Link>
  }
  return card
}
