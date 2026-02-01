import { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Button from '@/components/Button'
import ProductCard from '@/components/ProductCard'
import { useProducts } from '@/context/ProductsContext'
import { getProductImageUrl } from '@/api/products'
import './ProductDetailsPage.scss'

/* Figma node 120-683: Product Details Page. Цвета, шрифты, отступы из globalVars. */

const VISIBLE_COMMENTS = 3

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { products: allProducts, loading, error } = useProducts()
  const [activeMemory, setActiveMemory] = useState(0)
  const [activeColor, setActiveColor] = useState(0)
  const [detailsExpanded, setDetailsExpanded] = useState(false)
  const [reviewsExpanded, setReviewsExpanded] = useState(false)

  const product = useMemo(() => {
    return allProducts.find(p => p.id === id) || allProducts[0]
  }, [id, allProducts])

  const relatedProducts = useMemo(() => {
    return allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4)
  }, [product, allProducts])

  const breadcrumbs = [{ label: 'Home', path: '/' }, ...product.breadcrumbs]
  const colors = product.colors || ['#1D1D1F']
  const memoryOptions = product.storageOptions || product.sizeOptions || []
  const specs = product.specs || {}
  const specsEntries = Object.entries(specs).slice(0, 6)
  const comments = product.comments ?? []
  const visibleComments = reviewsExpanded ? comments : comments.slice(0, VISIBLE_COMMENTS)
  const hasHiddenComments = comments.length > VISIBLE_COMMENTS

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [id])

  if (loading) {
    return (
      <div className="product-details-page">
        <div className="product-details-page__content product-details-page__loading">Loading...</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="product-details-page">
        <div className="product-details-page__content product-details-page__error">{error || 'Product not found'}</div>
      </div>
    )
  }

  return (
    <div className="product-details-page product-details-page--enter">
      <div className="product-details-page__content">
        <nav className="product-details-page__breadcrumbs" aria-label="Breadcrumb">
          {breadcrumbs.map((b, i) => (
            <span key={b.label} className="product-details-page__breadcrumb-item">
              {i > 0 && <span className="product-details-page__breadcrumb-sep" aria-hidden>›</span>}
              <Link to={b.path} className="product-details-page__breadcrumb-link">{b.label}</Link>
            </span>
          ))}
          <span className="product-details-page__breadcrumb-item">
            <span className="product-details-page__breadcrumb-sep" aria-hidden>›</span>
            <span className="product-details-page__breadcrumb-current">{product.title}</span>
          </span>
        </nav>

        <section className="product-details-page__main">
          <div className="product-details-page__images">
            <div className="product-details-page__image-main">
              <img src={getProductImageUrl(product.image)} alt={product.title} width={413} height={516} />
            </div>
          </div>
          <div className="product-details-page__info">
            <div className="product-details-page__content-block">
              <h1 className="product-details-page__title">{product.title}</h1>
              <div className="product-details-page__price-block">
                <span className="product-details-page__price">{product.price}</span>
                {product.oldPrice && (
                  <span className="product-details-page__price-old">{product.oldPrice}</span>
                )}
              </div>

              <div className="product-details-page__field">
                <span className="product-details-page__label">Select color :</span>
                <div className="product-details-page__colors">
                  {colors.map((c, i) => (
                    <button
                      key={c}
                      type="button"
                      className={`product-details-page__color ${activeColor === i ? 'product-details-page__color--active' : ''}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setActiveColor(i)}
                      aria-label={`Color ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {memoryOptions.length > 0 && (
                <div className="product-details-page__memory">
                  {memoryOptions.map((opt, i) => (
                    <button
                      key={opt}
                      type="button"
                      className={`product-details-page__memory-tab ${activeMemory === i ? 'product-details-page__memory-tab--active' : ''}`}
                      onClick={() => setActiveMemory(i)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              <div className="product-details-page__details-grid">
                {specsEntries.map(([key, spec]) => (
                  <div key={key} className="product-details-page__detail">
                    <span className="product-details-page__detail-label">{spec.label}</span>
                    <span className="product-details-page__detail-value">{spec.value}</span>
                  </div>
                ))}
              </div>

              <p className="product-details-page__desc">{product.description}</p>
            </div>

            <div className="product-details-page__buttons">
              <Button variant="black-stroke" size="default" className="product-details-page__btn">Add to Wishlist</Button>
              <Button variant="fill-small" size="default" className="product-details-page__btn product-details-page__btn--fill">Add to Card</Button>
            </div>

            <div className="product-details-page__features">
              <div className="product-details-page__feature">
                <div className="product-details-page__feature-icon" aria-hidden>🚚</div>
                <span>Free Delivery<br />1-2 day</span>
              </div>
              <div className="product-details-page__feature">
                <div className="product-details-page__feature-icon" aria-hidden>📦</div>
                <span>In Stock<br />Today</span>
              </div>
              <div className="product-details-page__feature">
                <div className="product-details-page__feature-icon" aria-hidden>✓</div>
                <span>Guaranteed<br />1 year</span>
              </div>
            </div>
          </div>
        </section>

        <section className="product-details-page__details-section">
          <div className="product-details-page__details-card">
            <h2 className="product-details-page__section-title">Details</h2>
            <p className="product-details-page__details-text">{product.fullDescription || product.description}</p>
            <div className="product-details-page__details-specs">
              {Object.entries(specs).slice(0, 4).map(([key, spec]) => (
                <div key={key} className="product-details-page__spec-row">
                  <span className="product-details-page__spec-label">{spec.label}</span>
                  <span className="product-details-page__spec-value">{spec.value}</span>
                </div>
              ))}
              {Object.keys(specs).length > 4 && (
                <div className={`product-details-page__details-specs-extra ${detailsExpanded ? 'product-details-page__details-specs-extra--open' : ''}`}>
                  <div className="product-details-page__details-specs-extra-inner">
                    {Object.entries(specs).slice(4).map(([key, spec]) => (
                      <div key={key} className="product-details-page__spec-row">
                        <span className="product-details-page__spec-label">{spec.label}</span>
                        <span className="product-details-page__spec-value">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {Object.keys(specs).length > 4 && (
              <button
                type="button"
                className={`product-details-page__toggle ${detailsExpanded ? 'product-details-page__toggle--open' : ''}`}
                onClick={() => setDetailsExpanded(!detailsExpanded)}
              >
                {detailsExpanded ? 'View Less' : 'View More'}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}
          </div>
        </section>

        <section className="product-details-page__reviews">
          <div className="product-details-page__reviews-top">
            <h2 className="product-details-page__section-title">Reviews</h2>
            <div className="product-details-page__rating-block">
              <div className="product-details-page__rating-score">{product.rating}</div>
              <span className="product-details-page__rating-count">of {product.reviewsCount} reviews</span>
              <div className="product-details-page__stars" aria-label={`${product.rating} out of 5 stars`}>{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</div>
            </div>
            <div className="product-details-page__rating-bars">
              {['Excellent', 'Good', 'Average', 'Below Average', 'Poor'].map((label, i) => (
                <div key={label} className="product-details-page__rating-row">
                  <span className="product-details-page__rating-label">{label}</span>
                  <div className="product-details-page__rating-bar-wrap">
                    <div className="product-details-page__rating-bar" style={{ width: i === 0 ? '80%' : i === 1 ? '15%' : '5%' }} />
                  </div>
                  <span className="product-details-page__rating-num">{i === 0 ? 100 : i === 1 ? 20 : 5}</span>
                </div>
              ))}
            </div>
            <div className="product-details-page__comment-field">
              <input type="text" placeholder="Leave Comment" className="product-details-page__comment-input" aria-label="Leave a comment" />
            </div>
          </div>
          <div className="product-details-page__reviews-list">
            {visibleComments.length > 0 ? (
              visibleComments.map((r, i) => (
                <article key={i} className="product-details-page__review">
                  <div className="product-details-page__review-avatar" />
                  <div className="product-details-page__review-content">
                    <div className="product-details-page__review-header">
                      <span className="product-details-page__review-author">{r.author}</span>
                      <span className="product-details-page__review-stars" aria-label={`${r.rating} stars`}>{'★'.repeat(r.rating)}</span>
                    </div>
                    <p className="product-details-page__review-text">{r.text}</p>
                  </div>
                </article>
              ))
            ) : (
              <p className="product-details-page__reviews-empty">No reviews yet. Be the first to leave a comment!</p>
            )}
            {hasHiddenComments && (
              <button
                type="button"
                className={`product-details-page__toggle ${reviewsExpanded ? 'product-details-page__toggle--open' : ''}`}
                onClick={() => setReviewsExpanded(!reviewsExpanded)}
              >
                {reviewsExpanded ? 'View Less' : `View More (${comments.length - VISIBLE_COMMENTS} more)`}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}
          </div>
        </section>

        <section className="product-details-page__related">
          <h2 className="product-details-page__related-title">Related Products</h2>
          <div className="product-details-page__related-row">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} id={p.id} title={p.title} price={p.price} oldPrice={p.oldPrice} image={getProductImageUrl(p.image)} liked={p.liked} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
