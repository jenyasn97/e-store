import ProductCard from '../ProductCard'
import './DiscountProducts.scss'

const products = [
  { id: 'd1', title: 'Apple iPhone 14 Pro 512GB Gold (MQ233)', price: '$1437', image: '/images/product-iphone-gold.png' },
  { id: 'd2', title: 'AirPods Max Silver Starlight Aluminium', price: '$549', image: '/images/product-airpods.png' },
  { id: 'd3', title: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium', price: '$399', image: '/images/product-watch.png' },
  { id: 'd4', title: 'Apple iPhone 14 Pro 1TB Gold (MQ2V3)', price: '$1499', image: '/images/product-iphone-1tb.png' },
]

export default function DiscountProducts() {
  return (
    <section className="discount-products">
      <h2 className="discount-products__title">Discounts up to -50%</h2>
      <div className="discount-products__row">
        {products.map((p) => <ProductCard key={p.id} title={p.title} price={p.price} image={p.image} />)}
      </div>
    </section>
  )
}
