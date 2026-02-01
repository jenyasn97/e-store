import { useMemo } from 'react'
import ProductCard from '../ProductCard'
import { useProducts } from '@/context/ProductsContext'
import { useFavorites } from '@/context/FavoritesContext'
import { getProductImageUrl } from '@/api/products'
import './DiscountProducts.scss'

export default function DiscountProducts() {
  const { products, loading, error } = useProducts()
  const { isFavorite, toggleFavorite } = useFavorites()

  const discountProducts = useMemo(() => {
    const withDiscount = products.filter(p => p.oldPrice && p.oldPrice.trim() !== '')
    return (withDiscount.length > 0 ? withDiscount : products).slice(0, 4)
  }, [products])

  if (loading) return <section className="discount-products"><div className="discount-products__loading">Loading...</div></section>
  if (error) return <section className="discount-products"><div className="discount-products__error">{error}</div></section>
  if (discountProducts.length === 0) return null

  return (
    <section className="discount-products">
      <h2 className="discount-products__title">Discounts up to -50%</h2>
      <div className="discount-products__row">
        {discountProducts.map((p) => <ProductCard key={p.id} id={p.id} title={p.title} price={p.price} oldPrice={p.oldPrice} image={getProductImageUrl(p.image)} liked={isFavorite(p.id)} onLikeToggle={() => toggleFavorite(p.id)} />)}
      </div>
    </section>
  )
}
