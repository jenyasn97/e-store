import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '@/components/ProductCard'
import { useProducts } from '@/context/ProductsContext'
import { useFavorites } from '@/context/FavoritesContext'
import { getProductImageUrl } from '@/api/products'
import './FavoritesPage.scss'

export default function FavoritesPage() {
  const { products, loading, error } = useProducts()
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const favoriteProducts = products.filter((p) => favoriteIds.has(p.id))

  if (loading) {
    return (
      <div className="favorites-page">
        <div className="favorites-page__content favorites-page__loading">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="favorites-page">
        <div className="favorites-page__content favorites-page__error">{error}</div>
      </div>
    )
  }

  return (
    <div className="favorites-page favorites-page--enter">
      <div className="favorites-page__content">
        <nav className="favorites-page__breadcrumbs" aria-label="Breadcrumb">
          <span className="favorites-page__breadcrumb-item">
            <Link to="/" className="favorites-page__breadcrumb-link">Home</Link>
          </span>
          <span className="favorites-page__breadcrumb-sep" aria-hidden>›</span>
          <span className="favorites-page__breadcrumb-current">Favorites</span>
        </nav>

        <section className="favorites-page__main">
          <div className="favorites-page__products">
            <div className="favorites-page__products-top">
              <div className="favorites-page__products-count">
                <span className="favorites-page__products-count-label">Favorites:</span>
                <span className="favorites-page__products-count-value">{favoriteProducts.length}</span>
              </div>
            </div>

            {favoriteProducts.length > 0 ? (
              <div className="favorites-page__grid">
                {favoriteProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    price={p.price}
                    oldPrice={p.oldPrice}
                    image={getProductImageUrl(p.image)}
                    liked={isFavorite(p.id)}
                    onLikeToggle={() => toggleFavorite(p.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="favorites-page__empty">
                No favorite products yet. Add items by clicking the heart on product cards.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
